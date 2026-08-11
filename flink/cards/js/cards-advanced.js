/** Advanced Flink cards — deep internals, SQL advanced, production hard mode */
(function () {
  const advanced = [
    {
      id: "ADV-091",
      nameEn: "CHECKPOINT BARRIER",
      nameKo: "체크포인트 배리어",
      rarity: "UR",
      type: "CORE",
      attrs: ["Checkpoint", "Internals"],
      atk: "정렬 스냅샷",
      def: "일관성 컷",
      effect:
        "소스에서 n번째 체크포인트 배리어가 흐른다. 연산자는 모든 입력 배리어를 맞춘 뒤 상태를 스냅샷한다(aligned).",
      flavor: "강에 띄운 일렬의 깃발.",
      visual: "barrier",
      snippet: "barrier n → snapshot n",
      detail:
        "배리어는 데이터 채널을 따라 흐르는 특수 레코드다. Aligned 모드에서 연산자는 한 입력으로 배리어가 오면 그 입력을 막고(backpressure), 나머지 입력 배리어가 올 때까지 기다린 뒤 상태를 찍고 배리어를 다운스트림으로 보낸다. 이 정렬이 '같은 논리적 시점'의 분산 상태를 만든다. 배압이 심하면 배리어가 늦게 도착해 체크포인트 시간이 길어진다. Unaligned는 이 대기를 줄이기 위해 인플라이트 버퍼까지 스냅샷에 넣는다.",
      code: `// conceptual pipeline
Source --barrier(n)--> OpA --barrier(n)--> OpB --> ...
// OpA algorithm (aligned):
// 1) receive barrier(n) on input i -> block i
// 2) when all inputs got barrier(n):
//      snapshot operator/keyed state
//      forward barrier(n) downstream
// 3) unblock inputs
//
// Exactly-once state relies on this cut of the stream.`,
      lang: "text",
    },
    {
      id: "ADV-092",
      nameEn: "2PC SINK PROTOCOL",
      nameKo: "2PC 싱크 프로토콜",
      rarity: "LR",
      type: "OPS",
      attrs: ["Semantics", "Internals"],
      atk: "pre-commit",
      def: "commit on CP success",
      effect:
        "TwoPhaseCommitSinkFunction: 트랜잭션 pre-commit 후 체크포인트 완료 시 commit, 실패 시 abort.",
      flavor: "준비 완료 후에만 확정.",
      visual: "twopc",
      snippet: "begin → preCommit → commit",
      detail:
        "엔드투엔드 exactly-once의 핵심은 외부 시스템에 쓰는 행위와 Flink 체크포인트를 원자적으로 묶는 것이다. 연산자는 데이터를 트랜잭션/스테이징에 쓰고(pre-commit), JobManager가 체크포인트 성공을 알리면 commit, 아니면 abort. Kafka transactional producer, 파일 pending→final rename 이 패턴이다. pre-commit 상태도 체크포인트에 들어가야 복구 후 commit/abort를 결정할 수 있다.",
      code: `// TwoPhaseCommitSinkFunction lifecycle (concept)
beginTransaction()
  write(records) into txn / pending files
preCommit(txn)          // flush, prepare
// --- checkpoint succeeds ---
commit(txn)             // make visible
// --- or recovery without success ---
abort(txn)

// KafkaSink DeliveryGuarantee.EXACTLY_ONCE
// uses transactionalIdPrefix + checkpoint notify`,
      lang: "text",
    },
    {
      id: "ADV-093",
      nameEn: "KAFKA OFFSET vs CP",
      nameKo: "오프셋 vs 체크포인트",
      rarity: "UR",
      type: "OPS",
      attrs: ["Kafka", "Semantics"],
      atk: "오프셋은 상태",
      def: "커밋 분리",
      effect:
        "Flink는 Kafka 오프셋을 operator state로 체크포인트한다. consumer group commit만 믿으면 EO가 아니다.",
      flavor: "카프카 장부와 플링크 장부.",
      visual: "koffset",
      snippet: "offsets in Flink state",
      detail:
        "레거시 커밋-후-처리나 enable.auto.commit=true 는 at-least/중복·유실 위험이 있다. 현대 소스는 체크포인트에 오프셋을 저장하고, 복구 시 그 오프셋부터 재읽는다. 외부 group offset은 모니터링용으로만 쓰거나 명시 설정 시에만 커밋한다. 소스 리셋 전략(earliest/latest/group)과 세이브포인트 재개 시 오프셋 정책을 분리해서 이해해야 한다.",
      code: `// offsets committed as part of checkpointed state
// NOT the same as Kafka auto-commit

KafkaSource.<T>builder()
  .setStartingOffsets(OffsetsInitializer.earliest())
  // recovery uses Flink operator state when restoring
  .build();

// sinking EO still needs transactional sink separately
// source EO state != end-to-end EO`,
      lang: "java",
    },
    {
      id: "ADV-094",
      nameEn: "CHANGELOG STATE BACKEND",
      nameKo: "체인지로그 스테이트",
      rarity: "LR",
      type: "OPS",
      attrs: ["State", "Checkpoint"],
      atk: "상태 변경 로그",
      def: "빠른 CP",
      effect:
        "상태 변경을 체인지로그로 지속. 머티리얼라이즈 주기와 함께 체크포인트 부담을 줄인다.",
      flavor: "스냅샷 대신 일기장.",
      visual: "changelog",
      snippet: "state.backend.changelog",
      detail:
        "거대 RocksDB 상태에서 체크포인트 시간이 길면 이중 기록(체인지로그)으로 변경분만 빠르게 내구성 있게 남기는 방식이 있다. 버전·설정 키가 릴리즈마다 다를 수 있으니 사용 버전 문서를 기준으로 켠다. 디스크/네트워크 비용과 복구 시간 재계산이 필요하다. 증분 체크포인트와 목적이 겹치지만 계층이 다르다.",
      code: `# conceptual flink-conf (check your version docs)
# state.backend.changelog.enabled: true
# state.backend.changelog.storage: filesystem
# dstl.dfs.base-path: s3://bucket/dstl

# measure before/after:
# - checkpoint duration
# - recovery time
# - network to durable storage`,
      lang: "yaml",
    },
    {
      id: "ADV-095",
      nameEn: "LOCAL RECOVERY",
      nameKo: "로컬 리커버리",
      rarity: "UR",
      type: "OPS",
      attrs: ["Checkpoint", "Perf"],
      atk: "로컬 디스크 복구",
      def: "네트워크 절약",
      effect:
        "TM 로컬에 상태 복제본을 남겨 같은 자리 재시작 시 원격 스토리지 다운로드를 피한다.",
      flavor: "집 근처 백업 USB.",
      visual: "localrec",
      snippet: "state.backend.local-recovery",
      detail:
        "체크포인트 본본체는 S3/HDFS 등 원격에 두고, 로컬 디스크에 secondary copy를 둔다. 팟이 같은 노드에 다시 스케줄되면 복구가 빠르다. K8s에서 노드 이동이 잦으면 이득이 줄어든다. 디스크 용량·정리 정책을 함께 설계한다.",
      code: `# flink-conf.yaml
state.backend.local-recovery: true
# ensure TM local disk path sized for state
taskmanager.local.state.rootdirs: /data/flink/local-state

# works best with sticky scheduling / local SSD nodes`,
      lang: "yaml",
    },
    {
      id: "ADV-096",
      nameEn: "STATE PROCESSOR API",
      nameKo: "스테이트 프로세서 API",
      rarity: "UR",
      type: "OPS",
      attrs: ["State", "Ops"],
      atk: "오프라인 상태 수술",
      def: "읽기/변환/쓰기",
      effect:
        "세이브포인트/체크포인트를 배치 잡으로 읽어 상태를 검사·수정·마이그레이션한다.",
      flavor: "수술대 위의 세이브파일.",
      visual: "stateproc",
      snippet: "SavepointReader / Writer",
      detail:
        "프로덕션 상태가 꼬였거나 스키마를 바꿔야 하는데 온라인 마이그레이션이 불가능할 때 사용한다. 기존 uid/operator 상태를 읽고 새 토폴로지용 세이브포인트를 쓴다. 위험 작업이므로 복사본으로 검증 후 적용. 버전 호환·TypeInformation 일치가 필수.",
      code: `// conceptual (DataSet/DataStream batch APIs evolved by version)
// Savepoint.load(env, path, stateBackend)
//   .readKeyedState("uid", reader)
//   . ... transform ...
// SavepointWriter write new savepoint

// use cases:
// - remove bad keys
// - schema convert
// - split/merge operator state
// - bootstrap state from external store`,
      lang: "text",
    },
    {
      id: "ADV-097",
      nameEn: "TYPE SERIALIZER EVOLUTION",
      nameKo: "시리얼라이저 진화",
      rarity: "UR",
      type: "OPS",
      attrs: ["State", "SerDe"],
      atk: "스키마 호환",
      def: "상태 마이그레이션",
      effect:
        "TypeSerializerSnapshot으로 상태 바이트를 새 스키마로 마이그레이션. 필드 추가/삭제 규칙을 지킨다.",
      flavor: "옛 상자를 새 상자로.",
      visual: "serevo",
      snippet: "TypeSerializerSnapshot",
      detail:
        "POJO에 필드 추가 정도는 기본 호환이 되는 경우가 많지만, 타입 변경·의미 변경은 커스텀 마이그레이션이 필요하다. Avro schema evolution, protobuf 호환 모드를 상태에도 적용한다. 세이브포인트 복원 테스트 없이 프로덕션 업그레이드 금지.",
      code: `// when restoring:
// Flink loads previous TypeSerializerSnapshot
// and asks current serializer to migrate if compatible

// practical rules
// - add optional fields with defaults: usually OK
// - rename fields: often BREAKS POJO serializers
// - change int->long: needs migration strategy
// - prefer Avro/Protobuf for long-lived state

// always: restore prod savepoint on staging first`,
      lang: "text",
    },
    {
      id: "ADV-098",
      nameEn: "MAX PARALLELISM & KEY GROUPS",
      nameKo: "키 그룹 심화",
      rarity: "UR",
      type: "ARCH",
      attrs: ["State", "Internals"],
      atk: "키→그룹→서브태스크",
      def: "리스케일 단위",
      effect:
        "키는 maxParallelism개의 키 그룹으로 해시. 서브태스크는 그룹 범위를 담당. 스케일 시 그룹 재할당.",
      flavor: "우편번호 구역 재획정.",
      visual: "keygroups",
      snippet: "keyGroupIndex = hash % maxP",
      detail:
        "실제 parallelism이 32여도 maxParallelism이 128이면 키 공간은 128 그룹이다. 스케일 아웃 시 그룹을 더 잘게 나눈다. maxParallelism을 나중에 키우기는 일반적으로 불가에 가깝다(상태 재작성 수준). 초기부터 여유 있게 잡되, 과도하면 메타 오버헤드. 핫 키는 그룹 안에서도 한 키 문제라 살트가 별개 이슈.",
      code: `env.setMaxParallelism(512); // choose early
env.setParallelism(32);

// rescale 32 -> 64: key groups redistributed
// cannot exceed maxParallelism

// inspect: keyGroup range per subtask in logs/UI`,
      lang: "java",
    },
    {
      id: "ADV-099",
      nameEn: "MAILBOX MODEL",
      nameKo: "메일박스 모델",
      rarity: "UR",
      type: "ARCH",
      attrs: ["Internals"],
      atk: "단일 스레드 태스크",
      def: "이벤트 루프",
      effect:
        "태스크 스레드는 메일박스로 레코드·타이머·배리어를 직렬 처리. 동시성 버그를 줄인다.",
      flavor: "한 사람이 편지함 순찰.",
      visual: "mailbox",
      snippet: "mailbox loop",
      detail:
        "Flink 태스크는 기본적으로 한 스레드가 입력을 돌려가며 처리한다(체인 포함). 타이머 콜백, 워터마크, 체크포인트 배리어도 같은 루프에서 직렬화되어 상태 경쟁이 없다. 블로킹 콜을 태스크 스레드에서 하면 전체가 멈춘다 → Async I/O / 별도 클라이언트 스레드 + 콜백 설계. yield/mailbox executor 확장 포인트가 버전에 존재.",
      code: `// single task thread processes:
// - input records
// - watermarks
// - timers
// - checkpoint barriers
// sequentially

// anti-pattern:
public void map(Event e) {
  httpClient.executeBlocking(e); // blocks mailbox!
}

// better: AsyncDataStream / async client + future complete`,
      lang: "text",
    },
    {
      id: "ADV-100",
      nameEn: "CREDIT FLOW CONTROL",
      nameKo: "크레딧 흐름 제어",
      rarity: "UR",
      type: "ARCH",
      attrs: ["Network", "Internals"],
      atk: "송신 한도",
      def: "배압 전파",
      effect:
        "수신 측 free buffer credit를 송신 측에 알린다. credit 없으면 못 보냄 = 배압.",
      flavor: "받을 그릇만큼만 보낸다.",
      visual: "credit",
      snippet: "credit-based flow control",
      detail:
        "TCP만으로 부족해 Flink 네트워크 스택이 논리적 크레딧을 쓴다. 다운스트림이 소비가 느리면 credit이 고갈되고 업스트림 output이 막힌다. WebUI backpressure는 이 현상의 관측이다. 네트워크 메모리 부족 시 credit 체계 전체가 헐떡인다. exclusive/floating buffers 설정이 채널 수·병렬도와 맞물린다.",
      code: `# related knobs (names vary by version)
taskmanager.memory.network.fraction: 0.1
taskmanager.network.memory.buffers-per-channel: ...
taskmanager.network.memory.floating-buffers-per-gate: ...

# diagnose
# - backpressure HIGH on upstream vertices
# - outPoolUsage / credit metrics
# - slow sink or hot key subtask`,
      lang: "yaml",
    },
    {
      id: "ADV-101",
      nameEn: "BUFFER DEBLOATING",
      nameKo: "버퍼 디블로팅",
      rarity: "SR",
      type: "OPS",
      attrs: ["Network", "Perf"],
      atk: "동적 버퍼",
      def: "지연 감소",
      effect:
        "처리량에 맞춰 인플라이트 버퍼를 줄여 체크포인트·지연을 개선하는 메커니즘.",
      flavor: "물길을 필요만큼만.",
      visual: "debloat",
      snippet: "buffer debloating",
      detail:
        "버퍼를 많이 두면 처리량은 버틸 수 있지만 파이프라인에 데이터가 쌓여 정렬 체크포인트와 엔드투엔드 지연이 나빠진다. debloating은 목표 시간에 맞게 버퍼를 동적으로 줄인다. 버전별 기본 켜짐 여부·설정 키를 확인하고, 튜닝 전후로 checkpoint duration과 latency를 같이 본다.",
      code: `# conceptual
# taskmanager.network.memory.buffer-debloat.enabled: true
# target total time over network path

# evaluate with
# - end-to-end latency histograms
# - checkpoint alignment time
# - throughput under backpressure`,
      lang: "yaml",
    },
    {
      id: "ADV-102",
      nameEn: "ADAPTIVE SCHEDULER",
      nameKo: "어댑티브 스케줄러",
      rarity: "SR",
      type: "OPS",
      attrs: ["Deploy", "Scheduler"],
      atk: "가용 자원 적응",
      def: "리액티브 스케일",
      effect:
        "가능한 슬롯에 맞춰 병렬도를 조정. Reactive mode와 함께 탄력 운영.",
      flavor: "자리에 맞춰 대열 재편.",
      visual: "adaptive",
      snippet: "adaptive / reactive mode",
      detail:
        "고정 병렬도 대신 클러스터에 남는 자원만큼 스케일한다. 비용 효율·K8s autoscaling과 궁합. 상태 있는 잡은 리스케일 시 키 그룹 재배치 비용이 든다. 최소/최대 병렬도 경계를 명시하고, 세이브포인트 기반 리스케일과 차이를 이해한다.",
      code: `# flink-conf conceptual
jobmanager.scheduler: adaptive
# reactive mode execution
# scheduler-mode: reactive

// still respect maxParallelism for stateful jobs
env.setMaxParallelism(1024);`,
      lang: "yaml",
    },
    {
      id: "ADV-103",
      nameEn: "SPECULATIVE EXECUTION",
      nameKo: "스펙큘레이티브 실행",
      rarity: "SR",
      type: "OPS",
      attrs: ["Batch", "Perf"],
      atk: "느린 태스크 복제",
      def: "배치 꼬리 지연",
      effect:
        "배치에서 느린 서브태스크를 복제 실행해 먼저 끝나는 쪽을 채택. 스트리밍과 무관.",
      flavor: "느린 일꾼 옆에 한 명 더.",
      visual: "speculative",
      snippet: "speculative execution",
      detail:
        "스트리밍 장기 잡이 아니라 배치 모드 꼬리 지연(straggler) 완화용. 핫스팟 노드·일시 GC에 강하다. 중복 실행 자원 비용이 있다. 스트리밍 배압 해결책으로 착각하지 말 것.",
      code: `# batch only conceptual config
# execution.batch.speculative.enabled: true

env.setRuntimeMode(RuntimeExecutionMode.BATCH);`,
      lang: "yaml",
    },
    {
      id: "ADV-104",
      nameEn: "HYBRID / BLOCKING SHUFFLE",
      nameKo: "하이브리드 셔플",
      rarity: "UR",
      type: "ARCH",
      attrs: ["Batch", "Shuffle"],
      atk: "디스크 셔플",
      def: "배치 연결",
      effect:
        "배치 구간에서 블로킹 셔플로 결과를 디스크에 두고 다운스트림이 읽는다. 하이브리드는 메모리+디스크.",
      flavor: "파이프가 아니라 화물 창고.",
      visual: "shuffle",
      snippet: "blocking shuffle",
      detail:
        "스트리밍 파이프라인 셔플은 메모리 네트워크 버퍼 중심. 배치는 스테이지 경계에서 전체 입력이 준비될 수 있다. Flink 배치 성능은 셔플 서비스·디스크·압축에 크게 좌우. 스트리밍 잡에 배치 셔플 기대를 가져오지 말 것.",
      code: `// STREAMING: pipelined shuffle edges
// BATCH: may use blocking edges between stages

env.setRuntimeMode(RuntimeExecutionMode.BATCH);
// configure shuffle memory / compression per version docs`,
      lang: "text",
    },
    {
      id: "ADV-105",
      nameEn: "CUSTOM WATERMARK GENERATOR",
      nameKo: "커스텀 워터마크",
      rarity: "UR",
      type: "CORE",
      attrs: ["Time", "Advanced"],
      atk: "도메인 규칙",
      def: "생성 전략",
      effect:
        "WatermarkGenerator로 이벤트/주기적 호출에서 WM을 직접 방출. 특수 스큐 처리.",
      flavor: "파도를 손으로 그린다.",
      visual: "customwm",
      snippet: "WatermarkGenerator",
      detail:
        "forBoundedOutOfOrderness로 부족할 때(다중 소스 스큐, 특수 하트비트 이벤트, 업무 시간 규칙) 커스텀 생성기를 쓴다. onEvent/onPeriodicEmit 계약, 출력 단조 증가, idle 처리를 직접 책임진다. 잘못 만들면 윈도우가 영원히 안 닫히거나 너무 빨리 닫힌다. 단위 테스트 필수.",
      code: `public class HeartbeatWm implements WatermarkGenerator<Event> {
  private long maxTs = Long.MIN_VALUE + 1;
  public void onEvent(Event e, long recordTs, WatermarkOutput out) {
    if (e.isHeartbeat()) {
      out.emitWatermark(new Watermark(e.getTs()));
    } else {
      maxTs = Math.max(maxTs, e.getTs());
    }
  }
  public void onPeriodicEmit(WatermarkOutput out) {
    out.emitWatermark(new Watermark(maxTs - 1));
  }
}

WatermarkStrategy
  .forGenerator(ctx -> new HeartbeatWm())
  .withTimestampAssigner((e, t) -> e.getTs());`,
      lang: "java",
    },
    {
      id: "ADV-106",
      nameEn: "DUAL INPUT WATERMARKS",
      nameKo: "다중 입력 워터마크",
      rarity: "UR",
      type: "CORE",
      attrs: ["Time", "Join"],
      atk: "min 진행",
      def: "조인 상태 정리",
      effect:
        "connect/join 연산자의 이벤트 타임은 입력 워터마크의 최소값으로 진행. 한쪽이 멈추면 전체 정체.",
      flavor: "가장 느린 시계가 왕.",
      visual: "dualwm",
      snippet: "wm = min(wm_left, wm_right)",
      detail:
        "인터벌 조인·코프로세스에서 상태 만료·타이머가 양쪽 WM에 묶인다. 한쪽 토픽이 한산하면 idleness 없으면 조인 상태가 폭증한다. 소스별 idleness·alignment·입력 존재 보장을 설계 단계에 넣는다.",
      code: `// CoProcess / interval join event time
// effective watermark = min across inputs

// mitigations
// - withIdleness on quiet sources
// - watermark alignment across partitions
// - bounded state via interval join windows
// - metrics: current watermark per input`,
      lang: "text",
    },
    {
      id: "ADV-107",
      nameEn: "TIMER INTERNALS",
      nameKo: "타이머 내부",
      rarity: "SR",
      type: "CORE",
      attrs: ["Time", "State"],
      atk: "키드 우선순위 큐",
      def: "체크포인트 포함",
      effect:
        "이벤트/프로세싱 타이머는 키별 힙·RocksDB 타이머 서비스에 저장. 복구 후에도 남는다.",
      flavor: "키마다 알람 서랍.",
      visual: "timerint",
      snippet: "InternalTimerService",
      detail:
        "registerEventTimeTimer는 워터마크가 timestamp를 지날 때 onTimer. 동일 시각 다수 타이머, 삭제, 중복 등록 비용을 이해해야 한다. 키 카디널리티×타이머 수는 상태 크기다. RocksDB 타이머 성능 이슈가 있으면 설계를 윈도우 API로 단순화하는 편이 나을 때가 많다.",
      code: `// register
ctx.timerService().registerEventTimeTimer(t);
// delete
ctx.timerService().deleteEventTimeTimer(t);
// query time
long ct = ctx.timerService().currentWatermark();

// onTimer runs on mailbox thread
// keep it short; no blocking I/O`,
      lang: "java",
    },
    {
      id: "ADV-108",
      nameEn: "WINDOW MERGING",
      nameKo: "윈도우 머지",
      rarity: "UR",
      type: "CORE",
      attrs: ["Window", "Internals"],
      atk: "세션 병합",
      def: "상태 합치기",
      effect:
        "Session window는 겹치면 병합. MergingWindowAssigner + 상태 merge.",
      flavor: "겹치는 방을 하나로.",
      visual: "mergewin",
      snippet: "MergingWindowAssigner",
      detail:
        "세션 갭보다 가까운 이벤트가 오면 창이 합쳐지고 aggregate 상태도 merge된다. AggregateFunction.merge / Reduce merge 구현이 틀리면 결과가  silently 잘못된다. 커스텀 머징 윈도우는 고난이도. 세션 결과의 window_start/end가 동적으로 바뀌는 것을 다운스트림이 이해해야 한다.",
      code: `// Session windows merge when gaps small
.window(EventTimeSessionWindows.withGap(Time.minutes(5)))
.aggregate(new AggregateFunction<E, Acc, R>() {
  public Acc merge(Acc a, Acc b) {
    // MUST correctly merge partials
    return Acc.merge(a, b);
  }
  // createAccumulator / add / getResult ...
});`,
      lang: "java",
    },
    {
      id: "ADV-109",
      nameEn: "MINIBATCH AGG SQL",
      nameKo: "미니배치 집계",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Perf"],
      atk: "마이크로 배치",
      def: "상태 접근 감소",
      effect:
        "SQL 스트리밍 집계를 짧은 배치로 묶어 상태 읽기/쓰기 횟수를 줄인다.",
      flavor: "한 알씩 말고 한 줌씩.",
      visual: "minibatch",
      snippet: "table.exec.mini-batch",
      detail:
        "레코드마다 상태 스토어를 치면 RocksDB 잡이 죽는다. mini-batch는 허용 지연을 대가로 처리량을 올린다. 결과 방출 주기가 느려질 수 있다. local-global / split distinct 등 다른 최적화와 함께 문서 권장 조합을 따른다.",
      code: `-- Flink SQL config (conceptual)
SET 'table.exec.mini-batch.enabled' = 'true';
SET 'table.exec.mini-batch.allow-latency' = '2s';
SET 'table.exec.mini-batch.size' = '5000';

-- good for high-QPS group by aggregations
SELECT user_id, COUNT(*) FROM events GROUP BY user_id;`,
      lang: "sql",
    },
    {
      id: "ADV-110",
      nameEn: "LOCAL-GLOBAL AGG",
      nameKo: "로컬-글로벌 집계",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Perf"],
      atk: "2단계 집계",
      def: "셔플 감소",
      effect:
        "업스트림 로컬 partial agg 후 키 셔플+글로벌 최종 집계. 핫 키·네트워크 완화.",
      flavor: "조별 합산 후 전체 합산.",
      visual: "localglobal",
      snippet: "local-global aggregation",
      detail:
        "DataStream 2-phase sum 패턴의 SQL 플래너 버전. distinct count 등 더 복잡한 분해도 있다. 플래너 힌트/설정으로 켜지며, 설명(EXPLAIN)으로 플랜에 local/global이 생겼는지 확인한다.",
      code: `SET 'table.optimizer.agg-phase-strategy' = 'TWO_PHASE';
-- or version-specific local-global flags

EXPLAIN SELECT item_id, COUNT(*)
FROM clicks GROUP BY item_id;
-- expect partial + final aggregate stages`,
      lang: "sql",
    },
    {
      id: "ADV-111",
      nameEn: "SQL TOP-N",
      nameKo: "SQL TOP-N",
      rarity: "SR",
      type: "API",
      attrs: ["SQL"],
      atk: "랭킹",
      def: "ROW_NUMBER",
      effect:
        "ROW_NUMBER 윈도우 함수 + 필터로 실시간 Top-N. 상태 = 키 그룹 상위권.",
      flavor: "실시간 순위표.",
      visual: "topn",
      snippet: "ROW_NUMBER() OVER (...)",
      detail:
        "카테고리별 상위 N 상품·유저 랭킹에 사용. OVER 파티션·정렬 키 설계가 상태 크기를 결정. 업데이트 changelog로 순위 변동이 흘러간다. upsert 싱크와 잘 맞는다.",
      code: `SELECT * FROM (
  SELECT category, product_id, sales,
    ROW_NUMBER() OVER (
      PARTITION BY category
      ORDER BY sales DESC
    ) AS rn
  FROM product_sales
) t WHERE rn <= 5;`,
      lang: "sql",
    },
    {
      id: "ADV-112",
      nameEn: "SQL DEDUP",
      nameKo: "SQL 중복 제거",
      rarity: "SR",
      type: "API",
      attrs: ["SQL"],
      atk: "첫/마지막 행",
      def: "키 최신값",
      effect:
        "ROW_NUMBER로 키별 최초/최종 이벤트만 통과. 정확히 한 번 입력이 아닐 때 방어.",
      flavor: "같은 키의 대표 하나만.",
      visual: "dedup",
      snippet: "WHERE rn = 1",
      detail:
        "업스트림 중복 프로듀서·at-least-once 소스 대비. keep first vs keep last 선택. 상태 TTL로 키 만료를 두지 않으면 무한 성장. 윈도우 안 dedup과 글로벌 dedup을 구분.",
      code: `SELECT order_id, user_id, amount, ts
FROM (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY order_id ORDER BY ts DESC
  ) AS rn
  FROM orders_raw
) t WHERE rn = 1; -- keep latest per order_id`,
      lang: "sql",
    },
    {
      id: "ADV-113",
      nameEn: "MATCH_RECOGNIZE",
      nameKo: "매치 레코그나이즈",
      rarity: "LR",
      type: "API",
      attrs: ["SQL", "CEP"],
      atk: "SQL 패턴",
      def: "행 패턴 매칭",
      effect:
        "SQL 표준 행 패턴. CEP 대안. DEFINE/PATTERN/MEASURES.",
      flavor: "SQL로 쓰는 시퀀스 사냥.",
      visual: "matchrec",
      snippet: "MATCH_RECOGNIZE (...)",
      detail:
        "로그인 실패 3회, 가격 급등 패턴 등을 SQL로. 상태는 패턴 길이·파티션 수에 민감. CEP API 대비 선언적이지만 디버깅이 어렵다. EXPLAIN·소량 재현 테스트 권장.",
      code: `SELECT * FROM events
MATCH_RECOGNIZE (
  PARTITION BY user_id
  ORDER BY ts
  MEASURES
    FIRST(A.ts) AS start_ts,
    LAST(C.ts) AS end_ts
  PATTERN (A B{2,})
  DEFINE
    A AS A.action = 'LOGIN',
    B AS B.action = 'FAIL'
) MR;`,
      lang: "sql",
    },
    {
      id: "ADV-114",
      nameEn: "REGULAR JOIN SQL",
      nameKo: "레귤러 조인 위험",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Join"],
      atk: "무한 상태",
      def: "시간 경계 없음",
      effect:
        "시간 조건 없는 스트리밍 regular join은 양쪽 상태를 무한정 보유할 수 있다.",
      flavor: "끝이 없는 보관 창고.",
      visual: "regjoin",
      snippet: "JOIN without time bound",
      detail:
        "배치 감각의 JOIN을 스트리밍에 그대로 가져오면 상태 폭발. interval join, temporal join, lookup join, window 있는 dual stream join을 선택. 정 필요하면 상태 TTL·범위 필터로 상한을 강제하고 알람을 단다.",
      code: `-- dangerous in streaming if both sides unbounded
SELECT * FROM a JOIN b ON a.id = b.id;

-- safer patterns
-- interval / FOR SYSTEM_TIME AS OF / lookup join
-- or windowed join TVF`,
      lang: "sql",
    },
    {
      id: "ADV-115",
      nameEn: "RETRACT vs UPSERT",
      nameKo: "리트랙트 vs 업서트",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Changelog"],
      atk: "-D/+I 메시지",
      def: "PK 갱신",
      effect:
        "집계 changelog는 retract 스트림 또는 upsert 메시지. 싱크 모드가 맞아야 한다.",
      flavor: "취소 후 재기록 vs 덮어쓰기.",
      visual: "retract",
      snippet: "+I -U +U -D",
      detail:
        "Flink SQL은 업데이트 논리를 changelog 플래그로 표현한다. retract는 이전 값 취소+신규 값, upsert는 키 기준 최신값. append-only 카프카에 upsert를 그대로 쓰면 해석이 깨진다. upsert-kafka / jdbc upsert / 창고 merge 문을 맞춘다.",
      code: `// toChangelogStream kinds:
// - INSERT only (append)
// - retract stream
// - upsert stream with unique key

// sink must understand the kind
// EXPLAIN / debug changelog rows in trial job`,
      lang: "text",
    },
    {
      id: "ADV-116",
      nameEn: "PLANNER & EXPLAIN",
      nameKo: "플래너와 EXPLAIN",
      rarity: "R",
      type: "API",
      attrs: ["SQL"],
      atk: "실행 계획",
      def: "최적화 확인",
      effect:
        "EXPLAIN으로 물리 플랜·exchange·agg 분해를 확인. 힌트/설정 검증 도구.",
      flavor: "쿼리의 X-ray.",
      visual: "explain",
      snippet: "EXPLAIN SELECT ...",
      detail:
        "성능 문제는 먼저 플랜을 본다. 불필요한 shuffle, 1-phase agg, 잘못된 join 타입, changelog 모드가 보인다. 버전마다 플랜 표기가 다르니 팀 위키에 읽는 법을 남긴다.",
      code: `EXPLAIN ESTIMATED_COST, CHANGELOG_MODE, JSON_EXECUTION_PLAN
SELECT user_id, SUM(amount)
FROM orders
GROUP BY user_id;

-- look for:
-- stream-exec-exchange
-- local/global aggregate
-- changelog mode UPSERT/RETRACT`,
      lang: "sql",
    },
    {
      id: "ADV-117",
      nameEn: "CODEGEN UDF COST",
      nameKo: "코드젠과 UDF 비용",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Perf"],
      atk: "생성 코드",
      def: "UDF 장벽",
      effect:
        "Table/SQL은 코드 생성으로 타이트 루프. 무거운 Python/스칼라 UDF는 파이프라인을 끊는다.",
      flavor: "조립 라인 중간의 수작업.",
      visual: "codegen",
      snippet: "code generation vs UDF",
      detail:
        "가능하면 내장 함수·표현식. Java SCALAR UDF도 객체 할당을 줄인다. Python UDF는 프로세스 분리 직렬화가 비싸다. 벡터화/Pandas UDF 옵션이 있으면 배치 단위로. 프로파일 없이 UDF 추가는 금지에 가깝다.",
      code: `-- prefer built-ins
SELECT UPPER(name), amount * rate FROM t;

-- if UDF needed: Java, keep it pure & light
-- Python: consider Table API vectorized UDFs
-- measure: operator busy time after deploy`,
      lang: "sql",
    },
    {
      id: "ADV-118",
      nameEn: "LATENCY MARKERS",
      nameKo: "레이턴시 마커",
      rarity: "R",
      type: "OPS",
      attrs: ["Observability"],
      atk: "경로 지연 추정",
      def: "대략치",
      effect:
        "주기적 latency marker로 대략적 엔드투엔드 지연 히스토그램. 절대 정확도는 아님.",
      flavor: " Dilute 된 측량 부표.",
      visual: "latency",
      snippet: "metrics.latency.*",
      detail:
        "배리어와 다른 특수 마커. 구간별 지연 파악에 도움. 너무 자주 보내면 오버헤드. 진짜 SLA 측정은 이벤트 타임 스탬프와 싱크 완료 시각을 비즈니스 메트릭으로 심는 편이 낫다.",
      code: `# flink-conf conceptual
metrics.latency.interval: 30000
metrics.latency.granularity: operator

// better product metric:
// sink_time - event_time histogram in your sink`,
      lang: "yaml",
    },
    {
      id: "ADV-119",
      nameEn: "BACKPRESSURE DEBUG",
      nameKo: "배압 디버깅",
      rarity: "SR",
      type: "OPS",
      attrs: ["Perf", "Ops"],
      atk: "병목 추적",
      def: "원인 분류",
      effect:
        "WebUI busy/backpressured 시간 비율로 병목 연산자 확정 후 원인 분기.",
      flavor: "막힌 지점의 탐정.",
      visual: "bpdebug",
      snippet: "OK / LOW / HIGH",
      detail:
        "HIGH backpressure on vertex V means V's downstream is slow OR V itself outputs slowly into full buffers. 흔히: 싱크 I/O, 핫 키 서브태스크, 과도한 상태 접근, GC, 외부 lookup. 서브태스크 단위 메트릭을 보고 치우침을 확인. 병렬도 맹목적 증가는 핫 키에 무효.",
      code: `// checklist
// 1) which vertex HIGH?
// 2) skew across subtasks?
// 3) sink latency / timeouts?
// 4) rocksdb state size & read amp?
// 5) external HTTP/DB in path?
// 6) checkpoint alignment long?
// fix: rewrite hot path, async i/o, reshard, local agg`,
      lang: "text",
    },
    {
      id: "ADV-120",
      nameEn: "ROCKSDB READ AMP",
      nameKo: "RocksDB 읽기 증폭",
      rarity: "LR",
      type: "OPS",
      attrs: ["State", "Perf"],
      atk: "멀티 레벨 조회",
      def: "디스크 폭풍",
      effect:
        "상태 포인트 룩업이 여러 SST 레벨을 건드릴 수 있다. 캐시 미스 시 처리량 급락.",
      flavor: "서랍을 층층이 열어보기.",
      visual: "readamp",
      snippet: "block cache hit ratio",
      detail:
        "ValueState get이 싸 보여도 RocksDB면 디스크일 수 있다. 키 설계(지역성), 블록 캐시, bloom filter, 병합 빈도, TTL 정리, 불필요한 상태 읽기 제거가 핵심. 상태를 매 이벤트 두 번 읽지 않게 알고리즘을 바꾼다. 메트릭 없이 튜닝 금지.",
      code: `// anti-pattern
Long a = stateA.value();
Long b = stateB.value();
Long c = stateC.value();
// every event -> 3 potentially cold reads

// better: single MapState / combined value
// or cache in local variable within processElement
// enable managed memory & watch hit ratios`,
      lang: "java",
    },
    {
      id: "ADV-121",
      nameEn: "INCREMENTAL CP CLEANUP",
      nameKo: "증분 CP 정리",
      rarity: "SR",
      type: "OPS",
      attrs: ["Checkpoint"],
      atk: "공유 파일",
      def: "GC 스토리지",
      effect:
        "증분 체크포인트는 SST 파일을 공유 참조. 함부로 폴더 삭제하면 복구 불능.",
      flavor: "레고 블록을 여러 작품이 공유.",
      visual: "cpclean",
      snippet: "shared state files",
      detail:
        "체크포인트 디렉터리를 수동 rm 하면 안 된다. Flink의 discarded checkpoint cleanup과 스토리지 라이프사이클 정책을 이해한 뒤 TTL을 적용. 장기 세이브포인트는 별도 경로·보존. 백업 복원 리허설 필수.",
      code: `# let Flink manage retention
state.checkpoints.num-retained: 3

# savepoints: separate durable path
// DO NOT apply aggressive S3 lifecycle
// on checkpoint prefix without understanding refs

# disaster test: restore oldest retained CP/SP quarterly`,
      lang: "yaml",
    },
    {
      id: "ADV-122",
      nameEn: "CLASSLOADING ISOLATION",
      nameKo: "클래스 로딩",
      rarity: "SR",
      type: "OPS",
      attrs: ["Deploy"],
      atk: "유저 코드 분리",
      def: "의존성 충돌",
      effect:
        "child-first/parent-first 클래스 로더. 유저 JAR과 Flink 코어 충돌을 관리.",
      flavor: "플러그인 상자 뚜껑.",
      visual: "classload",
      snippet: "classloader.resolve-order",
      detail:
        "Guava, Netty, Kafka client 버전 충돌이 단골이다. shade(relocation), provided scope, parent-first 예외 패키지 설정을 사용. 로컬에선 되는데 클러스터만 실패하면 클래스패스 문제부터 의심.",
      code: `# flink-conf
classloader.resolve-order: child-first
# classloader.parent-first-patterns.additional: ...

// Maven: shade plugin relocate conflicting libs
// keep flink-*.jar as provided`,
      lang: "yaml",
    },
    {
      id: "ADV-123",
      nameEn: "USER JAR & FAT JAR",
      nameKo: "유저 JAR 전략",
      rarity: "R",
      type: "OPS",
      attrs: ["Deploy"],
      atk: "아티팩트",
      def: "의존성 포장",
      effect:
        "thin jar+lib vs fat jar. 플러그인 디렉터리 커넥터와 역할 분리.",
      flavor: "짐 싸는 법.",
      visual: "jar",
      snippet: "fat jar vs plugins/",
      detail:
        "Kafka 커넥터 등은 lib/plugins에 두고 앱 JAR은 가볍게. fat jar는 운영 단순하지만 충돌·크기 문제. CI에서 단일 아티팩트 해시·SBOM을 남긴다.",
      code: `# layout example
/opt/flink/lib/          # flink core
/opt/flink/plugins/kafka/ # connectors
/opt/flink/usrlib/job.jar # your code

# build: maven-shade only your packages
# do not shade flink-streaming-java`,
      lang: "text",
    },
    {
      id: "ADV-124",
      nameEn: "JM FAILOVER HA",
      nameKo: "JM 페일오버",
      rarity: "UR",
      type: "OPS",
      attrs: ["HA"],
      atk: "리더 이관",
      def: "잡 복구",
      effect:
        "HA 메타데이터 스토리지에서 새 리더 JM이 잡을 인수. 실행 중 잡은 체크포인트 기반 재시작.",
      flavor: "지휘관 교대.",
      visual: "jmfo",
      snippet: "leader election + meta store",
      detail:
        "ZK/K8s HA 서비스 + durable HA storageDir. 리더만 스케줄. 장애 시 태스크 취소 후 최신 체크포인트로 재배치. HA 스토리지 유실 = 잡 메타 유실 가능. 체크포인트 스토리지와 HA 스토리지를 둘 다 내구성 있게.",
      code: `high-availability: kubernetes # or zookeeper
high-availability.storageDir: s3://bucket/flink/ha
# ensure checkpoints also on durable storage
state.checkpoints.dir: s3://bucket/flink/checkpoints`,
      lang: "yaml",
    },
    {
      id: "ADV-125",
      nameEn: "TASK CANCELLATION",
      nameKo: "태스크 취소",
      rarity: "R",
      type: "OPS",
      attrs: ["Ops"],
      atk: "중단 협력",
      def: "타임아웃",
      effect:
        "취소는 협력적. 블로킹 유저 코드는 cancel timeout 후 강제. 리소스 누수 주의.",
      flavor: "중단 요청 vs 강제 종료.",
      visual: "cancel",
      snippet: "task cancellation timeout",
      detail:
        "외부 I/O 대기 중이면 스레드가 cancel에 안 반응할 수 있다. interrupt 처리·타임아웃 소켓·Async I/O를 사용. 강제 kill 시 트랜잭션 싱크 정리 이슈 가능. 종료 경로를 테스트한다.",
      code: `# flink-conf
task.cancellation.timeout: 180000

// user code: honor interrupts
// use clients with timeouts
// clean up in close()/cancel()`,
      lang: "yaml",
    },
    {
      id: "ADV-126",
      nameEn: "SLOT COLOCATION",
      nameKo: "코로케이션 그룹",
      rarity: "SR",
      type: "ARCH",
      attrs: ["Resource"],
      atk: "강제 동거",
      def: "배치 제약",
      effect:
        "Iteration 등에서 서브태스크를 같은 슬롯에 강제. 일반 잡에서는 드묾.",
      flavor: "한 방 배정 강제.",
      visual: "coloc",
      snippet: "coLocationGroup",
      detail:
        "slot sharing group과 다른 개념. 반복(iteration) 헤드-테일 배치에 사용. 현대 스트리밍 ETL에서는 거의 안 건드리지만, 스케줄 제약으로 슬롯 파편화가 생길 수 있음을 알아둔다.",
      code: `// advanced graph API / iterations
// stream... (rarely needed for typical ETL)

// prefer understanding slot sharing groups first
.map(...).slotSharingGroup("a");`,
      lang: "java",
    },
    {
      id: "ADV-127",
      nameEn: "CHAINING RULES DEEP",
      nameKo: "체이닝 규칙 심화",
      rarity: "SR",
      type: "ARCH",
      attrs: ["Optimization"],
      atk: "조건 충족 시 융합",
      def: "스레드 경계",
      effect:
        "동일 병렬도·forward 연결·체이닝 허용 시에만 한 스레드. disable/startNewChain으로 제어.",
      flavor: "용접할 곳과 자를 곳.",
      visual: "chainrules",
      snippet: "forward + same p + chainable",
      detail:
        "keyBy/rebalance/rescale 뒤에는 체인 끊김. 슬롯 셰어링 그룹이 달라도 영향. 디버깅 시 체인을 끊어 메트릭을 분리. 너무 긴 체인은 한 스레드에 CPU를 몰아 배압 원인을 가린다.",
      code: `stream
  .map(new A())          // chain
  .filter(new F())       // chain
  .map(new B()).startNewChain()
  .map(new C())
  .keyBy(E::getK)        // breaks chain (network)
  .map(new D());

env.disableOperatorChaining(); // nuclear option`,
      lang: "java",
    },
    {
      id: "ADV-128",
      nameEn: "RESCALE PARTITIONING",
      nameKo: "리스케일 파티셔닝",
      rarity: "R",
      type: "CORE",
      attrs: ["Exchange"],
      atk: "소수 재분배",
      def: "forward 유사",
      effect:
        "rescale은 소수 채널만 연결해 rebalance보다 가벼운 재분배. 병렬도 변경 구간.",
      flavor: "전면 셔플 대신 부분 섞기.",
      visual: "rescale",
      snippet: ".rescale()",
      detail:
        "upstream p=2 → downstream p=4 처럼 배수 관계에서 효율적. 완전한 균등이 보장되지 않을 수 있다. rebalance는 라운드로빈 전면 연결. 트래픽 패턴에 따라 선택.",
      code: `stream
  .map(new HeavyParse()).setParallelism(4)
  .rescale()
  .map(new Light()).setParallelism(12);

// vs
.rebalance(); // full round-robin redistribution`,
      lang: "java",
    },
    {
      id: "ADV-129",
      nameEn: "BROADCAST STATE BOOTSTRAP",
      nameKo: "브로드캐스트 부트스트랩",
      rarity: "SR",
      type: "CORE",
      attrs: ["State"],
      atk: "초기 규칙 적재",
      def: "레이스 방지",
      effect:
        "규칙 스트림이 늦으면 본 이벤트가 빈 규칙으로 처리됨. 부트스트랩·워터마크·가드 필요.",
      flavor: "명령 전에 도착한 병사.",
      visual: "bcboot",
      snippet: "bootstrap rules first",
      detail:
        "시작 시 차원 테이블 스냅샷을 먼저 방송하거나, 규칙 버전 워터마크 전까지 본 스트림을 버퍼/드롭. 체크포인트 후 재시작 시 broadcast state 복원 순서를 검증. 규칙 삭제·tombstone 프로토콜을 명시.",
      code: `// patterns
// 1) source rules from compact topic (latest per key)
// 2) hold main stream until BroadcastState non-empty
// 3) include ruleVersion in output for audit
// 4) TTL / explicit delete events for rules`,
      lang: "text",
    },
    {
      id: "ADV-130",
      nameEn: "SIDE OUTPUT TYPING",
      nameKo: "사이드아웃 타이핑",
      rarity: "R",
      type: "API",
      attrs: ["API"],
      atk: "OutputTag 관용구",
      def: "제네릭 보존",
      effect:
        "new OutputTag<>(\"x\"){} 익명 서브클래스로 제네릭 타입 보존. 생략 시 타입 문제.",
      flavor: "이름표에 타입을 못 박기.",
      visual: "side",
      snippet: "new OutputTag<>(){}",
      detail:
        "Java 제네릭 소거 때문에 OutputTag에 타입 정보가 필요하다. 익명 클래스 관용구가 표준. 여러 태그를 한 ProcessFunction에서 쓸 때 태그별 스트림 타입을 명확히.",
      code: `OutputTag<Event> late = new OutputTag<>("late") {};
OutputTag<String> bad = new OutputTag<>("bad") {};

// ctx.output(late, event);
// ctx.output(bad, raw);

// main.getSideOutput(late) -> DataStream<Event>`,
      lang: "java",
    },
    {
      id: "ADV-131",
      nameEn: "WINDOW JOIN",
      nameKo: "윈도우 조인",
      rarity: "SR",
      type: "CORE",
      attrs: ["Join", "Window"],
      atk: "동일 창 조인",
      def: "시간 버킷 매칭",
      effect:
        "같은 윈도우에 떨어진 양쪽 요소를 조인. interval join과 语义 다름.",
      flavor: "같은 칸에 들어온 짝.",
      visual: "winjoin",
      snippet: "join(...).where.equalTo.window",
      detail:
        "Window join은 동일 assigner 창 단위. Interval join은 상대 시간 오프셋. 비즈니스가 '같은 5분 버킷'이면 window, '이벤트 전후 10분'이면 interval. SQL TVF join과 매핑해 이해.",
      code: `a.join(b)
  .where(A::getKey).equalTo(B::getKey)
  .window(TumblingEventTimeWindows.of(Time.minutes(5)))
  .apply((left, right) -> combine(left, right));

// prefer intervalJoin when matching by relative time`,
      lang: "java",
    },
    {
      id: "ADV-132",
      nameEn: "ASYNC RETRY STRATEGY",
      nameKo: "Async 재시도",
      rarity: "SR",
      type: "API",
      attrs: ["Async", "Perf"],
      atk: "일시 오류",
      def: "용량·타임아웃",
      effect:
        "AsyncFunction 실패 재시도·타임아웃·용량 제한. 장애 증폭 방지.",
      flavor: "두드리다 포기하는 법.",
      visual: "asyncretry",
      snippet: "capacity + timeout + retry",
      detail:
        "외부 서비스 500을 무한 재시도하면 메일박스가 아닌 비동기 큐가 폭발하고 배압이 꼬인다. capacity로 인플라이트 상한, timeout으로 실패 확정, 재시도는 지수 백오프+지터. 독성 입력은 사이드아웃.",
      code: `AsyncDataStream.unorderedWait(
  stream,
  new AsyncDatabaseRequest(), // implement retries inside carefully
  2, TimeUnit.SECONDS,        // timeout
  100                         // capacity
);

// on permanent failure: side output / drop metric`,
      lang: "java",
    },
    {
      id: "ADV-133",
      nameEn: "END-TO-END LATENCY SLA",
      nameKo: "E2E 지연 SLA",
      rarity: "SR",
      type: "OPS",
      attrs: ["Observability", "Time"],
      atk: "비즈니스 시계",
      def: "이벤트→가시성",
      effect:
        "event_time과 sink_visible_time 차이로 SLA 측정. 워터마크 지연과 분리.",
      flavor: "손님이 느낀 대기 시간.",
      visual: "e2esla",
      snippet: "sink_ts - event_ts",
      detail:
        "워터마크 지연, 처리 지연, 싱크 커밋 지연을 분해한다. allowedLateness·mini-batch·체크포인트 간격이 SLA에 직접 영향. 대시보드에 p50/p95/p99를 키/토픽별로.",
      code: `// at sink
long e2e = sinkWallNow - event.getEventTime();
histogram.update(e2e);

// also track:
// - fetch delay: processTime - eventTime (approx)
// - watermark lag: wall - currentWatermark
// - checkpoint duration`,
      lang: "java",
    },
    {
      id: "ADV-134",
      nameEn: "SAVEPOINT COMPAT MATRIX",
      nameKo: "세이브포인트 호환",
      rarity: "UR",
      type: "OPS",
      attrs: ["Ops", "Upgrade"],
      atk: "버전 행렬",
      def: "업그레이드 경로",
      effect:
        "Flink 메이저/마이너 간 세이브포인트 호환은 공식 표 따름. 건너뛰기 위험.",
      flavor: "버전 사다리 한 칸씩.",
      visual: "compat",
      snippet: "version upgrade path",
      detail:
        "커넥터·상태 백엔드·세리얼라이저 버전이 얽힌다. 권장: 스테이징에서 프로덕션 SP 복원 리허설 → canary → 전체. 불가 시 재처리 파이프라인(리플레이) 플랜 B. 릴리즈 노트 breaking changes를 체크리스트화.",
      code: `// upgrade runbook
// 1) read release notes (state/API/connectors)
// 2) build new job with same uids
// 3) take SP from old job
// 4) restore on staging cluster new version
// 5) validate output vs shadow traffic
// 6) production switch with SP
// 7) keep old binaries + SP for rollback window`,
      lang: "text",
    },
    {
      id: "ADV-135",
      nameEn: "EXACTLY-ONCE TRADEOFFS",
      nameKo: "EO 트레이드오프",
      rarity: "LR",
      type: "CORE",
      attrs: ["Semantics", "Boss"],
      atk: "정확성 비용",
      def: "지연·복잡도",
      effect:
        "EO는 공짜가 아니다. 체크포인트 정렬, 트랜잭션 싱크, 상태 크기, 운영 복잡도.",
      flavor: "완벽의 세금.",
      visual: "eotrade",
      snippet: "correctness vs cost",
      detail:
        "비즈니스가 멱등 키로 충분하면 at-least-once + upsert가 더 단순·빠를 수 있다. 금융 원장·중복 과금 불가 영역만 EO end-to-end를 강제. 팀 전체 용어 정의(상태 EO vs E2E EO)를 문서 첫 장에 쓴다.",
      code: `// Decision tree
// Need no lost/duplicate side effects externally?
//   yes -> E2E EO (txn sink + CP EXACTLY_ONCE)
//   no but state must not double count?
//   yes -> state EO + idempotent sink
//   no -> at-least-once simpler

// Always: measure checkpoint duration under EO`,
      lang: "text",
    },
    {
      id: "ADV-136",
      nameEn: "UNALIGNED + HEADERS",
      nameKo: "언얼라인드 한계",
      rarity: "UR",
      type: "OPS",
      attrs: ["Checkpoint"],
      atk: "버퍼 포함 비용",
      def: "언제 켤까",
      effect:
        "배압 시 CP 시간 개선. 상태 비대·복구 복잡. 타임아웃 후 전환 전략이 안전.",
      flavor: "막힐 때만 비상 모드.",
      visual: "unaligned",
      snippet: "aligned timeout → unaligned",
      detail:
        "항상 unaligned가 정답은 아니다. 평소 aligned, 정렬이 길어지면 전환하는 하이브리드가 운영적으로 안전할 수 있다. 버전 기본값 확인. 문제 재현 환경에서 켠 뒤 체크포인트 크기 증가를 관찰.",
      code: `cfg.enableUnalignedCheckpoints();
cfg.setAlignedCheckpointTimeout(Duration.ofSeconds(30));
// if alignment finishes < 30s: aligned path
// else: unaligned with in-flight data`,
      lang: "java",
    },
    {
      id: "ADV-137",
      nameEn: "FINE-GRAINED RESOURCES",
      nameKo: "세분 자원 관리",
      rarity: "UR",
      type: "OPS",
      attrs: ["Resource"],
      atk: "CPU/메모리 명세",
      def: "정교 스케줄",
      effect:
        "슬롯 균등 분할 대신 연산자별 자원 스펙을 주는 파인 그레인 모드(버전에 따라).",
      flavor: "방마다 다른 전기 용량.",
      visual: "fingrain",
      snippet: "fine-grained resource mgmt",
      detail:
        "헤비 연산자에 더 많은 메모리/CPU를 명시. 설정의 복잡도가 올라간다. 대부분의 팀은 슬롯+병렬도 튜닝으로 시작. 대규모 멀티테넌트에서 검토.",
      code: `# see version docs:
# fine-grained resource management
# externalized resource specs for operators
// start simple: slot size + parallelism first`,
      lang: "text",
    },
    {
      id: "ADV-138",
      nameEn: "DATASTREAM V2 INTUITION",
      nameKo: "DataStream V2 직관",
      rarity: "SR",
      type: "API",
      attrs: ["API", "Future"],
      atk: "새 추상화",
      def: "진화 중",
      effect:
        "문서의 DataStream V2는 API 현대화를 목표. 기존 V1 개념(상태·시간)은 동일 계열.",
      flavor: "같은 강, 새 뱃길.",
      visual: "dsv2",
      snippet: "DataStream API V2",
      detail:
        "학습 우선순위는 상태·워터마크·체크포인트·SQL이 먼저. V2는 프로젝트 버전에 존재 여부와 마이그레이션 가이드를 확인. 개념 카드의 런타임 지식은 이식 가능하다.",
      code: `// practical advice
// 1) master V1 mental model (state/time/CP)
// 2) read your Flink version's V2 overview
// 3) don't rewrite production blindly
// 4) new jobs: follow team standard API`,
      lang: "text",
    },
    {
      id: "ADV-139",
      nameEn: "PROCESS TABLE FUNCTION",
      nameKo: "PTF (SQL)",
      rarity: "LR",
      type: "API",
      attrs: ["SQL", "Advanced"],
      atk: "테이블 값 프로세스",
      def: "고급 UDF",
      effect:
        "Process Table Function으로 테이블 입력을 절차적으로 처리(버전 기능). 윈도우/세션 커스텀에 가깝다.",
      flavor: "SQL 안의 프로세스 함수.",
      visual: "ptf",
      snippet: "PROCESS TABLE FUNCTION",
      detail:
        "일반 UDF로 부족한 파티션 단위 절차 로직을 SQL 엔진에 붙인다. 버전·안정화 상태를 문서에서 확인. 남용 시 플래너 최적화 이점을 잃는다. 가능하면 창 TVF·내장 연산 우선.",
      code: `-- conceptual (check version support)
-- CREATE FUNCTION my_ptf AS '...'
-- SELECT * FROM my_ptf(TABLE events PARTITION BY user_id ...);

// prefer built-in window TVFs when enough`,
      lang: "sql",
    },
    {
      id: "ADV-140",
      nameEn: "PRODUCTION WAR ROOM",
      nameKo: "장애 워룸 체크",
      rarity: "LR",
      type: "OPS",
      attrs: ["Ops", "Boss"],
      atk: "우선순위 대응",
      def: "복구 런북",
      effect:
        "증상→가설→메트릭→조치 순서. 재시작 남발 금지. 데이터 손실/중복 영향부터.",
      flavor: "불 끄기 전에 가스 밸브.",
      visual: "warroom",
      snippet: "triage runbook",
      detail:
        "1) 사용자 영향(지연/중복/유실) 2) 체크포인트 성공 여부 3) 배압 지점 4) 워터마크 정체 5) 소스 lag 6) 싱크 에러 7) 최근 배포/스케일. 조치: 스케일, 핫픽스, SP 롤백, 독성 파티션 차단. 사후 타임라인·재발 방지 항목 필수.",
      code: `// war room first 15 minutes
// [ ] impact statement
// [ ] last successful checkpoint
// [ ] watermark lag chart
// [ ] backpressure vertex
// [ ] kafka lag
// [ ] restart count / exceptions
// [ ] recent config change?
// then: mitigate -> fix -> postmortem`,
      lang: "text",
    },
  ];

  window.FLINK_CARDS = (window.FLINK_CARDS || []).concat(advanced);
})();
