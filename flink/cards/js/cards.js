/** Flink Learning Cards — concept + code (no external links) */
window.FLINK_CARDS = [
  {
    id: "STARTER-001",
    nameEn: "WHAT IS FLINK",
    nameKo: "플링크란?",
    rarity: "N",
    type: "STARTER",
    attrs: ["Intro"],
    atk: "상태 계산",
    def: "분산 스케일",
    effect:
      "Bounded/Unbounded 스트림 위에서 상태를 유지하며 계산하는 분산 엔진. 배치·스트림을 한 런타임으로 처리한다.",
    flavor: "강이든 호수든 같은 엔진.",
    visual: "flow",
    snippet: "Source → Op → Sink",
    detail:
      "Flink는 끝이 있는(bounded) 데이터와 끝이 없을 수 있는(unbounded) 스트림 모두에서 상태 있는(stateful) 연산을 수행한다. 프로그램은 Source → Operator(s) → Sink 형태의 데이터플로 그래프가 되고, 클러스터에 병렬 배포된다. Kafka 실시간 파이프라인·배치 ETL·이벤트 드리븐 앱을 같은 모델로 작성할 수 있다.",
    code: `// 개념적 데이터플로
Source  →  map/filter/keyBy/window  →  Sink
          (상태·시간·체크포인트 가능)

// 한 줄 요약
// "스트림을 따라 흐르며 상태를 기억하고,
//  장애 나도 정확히 이어서 처리"`,
    lang: "text",
  },
  {
    id: "STARTER-002",
    nameEn: "BOUNDED VS UNBOUNDED",
    nameKo: "유한 vs 무한",
    rarity: "N",
    type: "STARTER",
    attrs: ["Batch", "Stream"],
    atk: "배치",
    def: "연속 처리",
    effect:
      "Bounded = 끝이 있음(배치 사고). Unbounded = 끝나지 않을 수 있음(도착 즉시 처리). 설계 패러다임이 갈린다.",
    flavor: "끝이 보이면 배치.",
    visual: "bounded",
    snippet: "finite | infinite",
    detail:
      "Bounded 스트림은 파일 한 장, 하루치 로그처럼 끝이 정해져 있어 전체를 모은 뒤 정렬·전역 집계가 가능하다. Unbounded는 센서·클릭·거래처럼 계속 들어오므로, 윈도우·워터마크·상태로 '지금까지'를 정의해야 한다. Flink는 둘 다 DataStream/Table/SQL로 다루며, 같은 잡이 배치 모드로도 돌 수 있다.",
    code: `// Bounded  (배치 느낌)
env.readTextFile("sales-2026-08.csv")
   .map(...)
   .print();  // 파일 끝나면 잡 종료

// Unbounded (스트림)
env.fromSource(kafkaSource, ...)
   .keyBy(e -> e.userId)
   .window(TumblingEventTimeWindows.of(Time.minutes(5)))
   .sum("amount");  // 계속 실행`,
    lang: "java",
  },
  {
    id: "STARTER-003",
    nameEn: "SOURCE → SINK",
    nameKo: "소스와 싱크",
    rarity: "N",
    type: "STARTER",
    attrs: ["Dataflow"],
    atk: "입력",
    def: "출력",
    effect:
      "모든 잡은 Source에서 시작해 Sink로 끝난다. 중간은 변환 Operator. 커넥터로 외부 시스템과 연결한다.",
    flavor: "강물의 입구와 출구.",
    visual: "pipeline",
    snippet: "Kafka → Flink → DB",
    detail:
      "Source는 데이터를 읽어 스트림으로 만들고, Operator는 map/filter/join/window 등으로 변환하며, Sink는 Kafka·JDBC·파일·Print 등으로 내보낸다. 프로덕션에서는 보통 Kafka(또는 메시지 큐) → Flink → Kafka/DB/창고 패턴이 많다. Source/Sink 선택과 병렬도·시맨틱스(at-least/exactly-once)가 파이프라인 품질을 좌우한다.",
    code: `DataStream<String> lines = env
  .fromSource(kafkaSource, WatermarkStrategy.noWatermarks(), "kafka");

DataStream<Order> orders = lines
  .map(new OrderParser())
  .filter(o -> o.amount > 0);

orders.sinkTo(kafkaSink);   // 또는
// orders.addSink(jdbcSink);`,
    lang: "java",
  },
  {
    id: "STARTER-004",
    nameEn: "FLINK SQL",
    nameKo: "Flink SQL",
    rarity: "N",
    type: "STARTER",
    attrs: ["SQL"],
    atk: "선언적",
    def: "빠른 시작",
    effect:
      "가장 높은 추상화. CREATE TABLE + INSERT INTO 로 스트리밍 파이프라인을 SQL로 작성한다.",
    flavor: "한 줄 쿼리가 파이프라인.",
    visual: "sql",
    snippet: "INSERT INTO ... SELECT",
    detail:
      "SQL Client 또는 TableEnvironment에서 테이블을 정의하고 연속 쿼리를 돌린다. 소스/싱크는 WITH 커넥터 옵션으로 붙인다. 윈도우 집계, 조인, CDC 패턴도 SQL로 표현 가능하다. 프로토타입·분석·표준 ETL에 특히 강하다.",
    code: `CREATE TABLE orders (
  order_id BIGINT,
  user_id  BIGINT,
  amount   DECIMAL(10,2),
  ts       TIMESTAMP(3),
  WATERMARK FOR ts AS ts - INTERVAL '5' SECOND
) WITH (
  'connector' = 'kafka',
  'topic' = 'orders',
  'format' = 'json'
);

INSERT INTO user_spend
SELECT user_id, SUM(amount), TUMBLE_END(ts, INTERVAL '1' HOUR)
FROM orders
GROUP BY user_id, TUMBLE(ts, INTERVAL '1' HOUR);`,
    lang: "sql",
  },
  {
    id: "STARTER-005",
    nameEn: "TABLE API",
    nameKo: "테이블 API",
    rarity: "R",
    type: "STARTER",
    attrs: ["Table"],
    atk: "관계형 DSL",
    def: "옵티마이저",
    effect:
      "테이블 중심 선언적 API. select/join/groupBy. DataStream과 상호 변환 가능. 실행 전 최적화된다.",
    flavor: "무엇을 할지 말하면 엔진이 어떻게를.",
    visual: "table",
    snippet: "table.select(...)",
    detail:
      "Table API는 동적 테이블(스트림을 테이블처럼) 위에서 관계 연산을 쓴다. SQL과 의미가 비슷하지만 타입 세이프한 코드로 조합한다. fromDataStream / toDataStream 으로 DataStream과 섞을 수 있어, 무거운 부분은 ProcessFunction, 나머지는 Table로 나누는 패턴이 흔하다.",
    code: `Table orders = tableEnv.from("orders");

Table result = orders
  .filter($("amount").isGreater(0))
  .groupBy($("user_id"))
  .select(
    $("user_id"),
    $("amount").sum().as("total")
  );

tableEnv.toDataStream(result).print();`,
    lang: "java",
  },
  {
    id: "STARTER-006",
    nameEn: "DATASTREAM API",
    nameKo: "데이터스트림 API",
    rarity: "R",
    type: "STARTER",
    attrs: ["Core"],
    atk: "명령형",
    def: "이벤트 단위",
    effect:
      "Core API. map·keyBy·window·process. 상태·시간을 코드로 세밀하게 제어할 때 사용한다.",
    flavor: "손맛 나는 스트림 코딩.",
    visual: "stream",
    snippet: "stream.keyBy(...).window(...)",
    detail:
      "DataStream API는 이벤트 하나씩(또는 윈도우 단위) 변환 파이프라인을 체이닝한다. 타입은 POJO/Tuple/Row 등. 병렬도, 워터마크, 상태 백엔드, 사이드 아웃을 코드 레벨로 잡기 좋다. SQL/Table로 부족한 커스텀 로직은 여기 또는 ProcessFunction으로 내린다.",
    code: `DataStream<Event> events = env.fromSource(...);

events
  .keyBy(Event::getUserId)
  .window(TumblingEventTimeWindows.of(Time.minutes(5)))
  .reduce((a, b) -> a.merge(b))
  .map(new EnrichmentMap())
  .sinkTo(sink);`,
    lang: "java",
  },
  {
    id: "CORE-007",
    nameEn: "PARALLEL DATAFLOW",
    nameKo: "병렬 데이터플로",
    rarity: "R",
    type: "CORE",
    attrs: ["Parallelism"],
    atk: "파티션",
    def: "서브태스크",
    effect:
      "연산자마다 서브태스크 수(병렬도)를 둔다. 스트림은 파티션으로 나뉘어 동시에 흐른다.",
    flavor: "나누면 빠르다.",
    visual: "parallel",
    snippet: "setParallelism(n)",
    detail:
      "실행 시 각 operator는 N개의 병렬 인스턴스(subtask)로 뜬다. N이 그 연산자의 parallelism이다. 잡 기본 병렬도와 연산자별 오버라이드를 쓸 수 있다. 너무 크면 셔플·오버헤드, 너무 작으면 CPU 낭비. 병목 연산자 병렬도를 먼저 올리는 것이 기본 튜닝이다.",
    code: `env.setParallelism(4);          // 잡 기본

stream
  .map(new Parse()).setParallelism(2)
  .keyBy(e -> e.key)
  .window(...)
  .aggregate(new Agg()).setParallelism(8)
  .print().setParallelism(1);  // sink는 1`,
    lang: "java",
  },
  {
    id: "CORE-008",
    nameEn: "FORWARD / REBALANCE",
    nameKo: "전달 vs 재분배",
    rarity: "R",
    type: "CORE",
    attrs: ["Exchange"],
    atk: "순서 보존",
    def: "셔플",
    effect:
      "One-to-one(forward)은 파티션·순서 유지. keyBy/rebalance/broadcast는 재분배(redistribute).",
    flavor: "같은 줄 vs 섞기.",
    visual: "exchange",
    snippet: "forward | keyBy | rebalance",
    detail:
      "Source→map 처럼 체이닝·forward면 같은 파티션에서 순서가 유지된다. keyBy는 키 해시로 네트워크 셔플이 난다. rebalance는 라운드로빈, broadcast는 모든 다운스트림에 복제. 재분배 구간을 건너면 '전역 순서'는 깨지고, 쌍(송신-수신 서브태스크) 단위 순서만 남는다.",
    code: `// forward (파티션 유지, 체인 가능)
src.map(new A()).map(new B());

// keyBy → 네트워크 셔플
.map(new A())
.keyBy(e -> e.userId)   // redistribute
.window(...);

// 균등 재분배
.rebalance().map(new Heavy());`,
    lang: "java",
  },
  {
    id: "CORE-009",
    nameEn: "KEYBY",
    nameKo: "키바이",
    rarity: "R",
    type: "CORE",
    attrs: ["Key"],
    atk: "키 파티션",
    def: "그룹 처리",
    effect:
      "같은 키 이벤트는 같은 서브태스크로. 키드 상태·윈도우·집계의 전제 조건이다
    flavor: "같은 열쇠 → 같은 문.",
    visual: "keyby",
    snippet: "keyBy(e -> e.userId)",
    detail:
      "keyBy는 키 셀렉터로 파티션을 나눈다. 이후 KeyedStream에서 ValueState, 윈도우, 타이머를 키 단위로 쓸 수 있다. 핫 키(특정 키 트래픽 폭주)가 있으면 해당 서브태스크만 과부하 난다. 키 설계· salting·사전 집계가 실무 이슈다.",
    code: `// Java
stream.keyBy(event -> event.getUserId());

// 키드 상태 사용 예 (ProcessFunction 내부)
ValueStateDescriptor<Long> desc =
  new ValueStateDescriptor<>("count", Long.class);
ValueState<Long> count = getRuntimeContext().getState(desc);

Long c = count.value();
count.update(c == null ? 1L : c + 1);`,
    lang: "java",
  },
  {
    id: "CORE-010",
    nameEn: "EVENT TIME",
    nameKo: "이벤트 타임",
    rarity: "SR",
    type: "CORE",
    attrs: ["Time"],
    atk: "발생 시각",
    def: "결정적 결과",
    effect:
      "이벤트에 찍힌 시간으로 윈도우·순서를 판단. 지연 도착해도 같은 코드·같은 결과 재현이 목표.",
    flavor: "처리한 때가 아니라 일어난 때.",
    visual: "eventtime",
    snippet: "Timestamp + Watermark",
    detail:
      "Processing time은 연산자 머신 시계라 쉽지만 재처리·지연에 결과가 흔들린다. Event time은 레코드 타임스탬프 기준이라 백필·재실행에 유리하다. 타임스탬프 할당 + Watermark 전략이 필수다. 분석·정확 집계·금융/이커머스 이벤트 상관에 거의 기본값으로 쓴다.",
    code: `WatermarkStrategy<Event> wm = WatermarkStrategy
  .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
  .withTimestampAssigner(
    (event, ts) -> event.getEventTimeMillis()
  );

DataStream<Event> s = env.fromSource(source, wm, "src");

s.keyBy(Event::getKey)
 .window(TumblingEventTimeWindows.of(Time.minutes(1)))
 .sum("value");`,
    lang: "java",
  },
  {
    id: "CORE-011",
    nameEn: "PROCESSING TIME",
    nameKo: "프로세싱 타임",
    rarity: "R",
    type: "CORE",
    attrs: ["Time"],
    atk: "벽시계",
    def: "저지연·단순",
    effect:
      "처리 순간의 시계. 구현 단순·빠름. 정확 재현이 필요 없는 대시보드·알림에 적합.",
    flavor: "지금 시계를 믿는다.",
    visual: "proctime",
    snippet: "TimeCharacteristic / proc time",
    detail:
      "워터마크 없이도 윈도우를 열 수 있어 입문에 쉽다. 다만 소스 지연, 백프레셔, 재시작 시 결과가 달라진다. '대략 최근 1분 트래픽' 모니터링에는 충분하고, '그 1분에 실제로 발생한 금액'에는 Event Time이 맞다.",
    code: `// 프로세싱 타임 윈도우
stream
  .keyBy(e -> e.key)
  .window(TumblingProcessingTimeWindows.of(Time.minutes(1)))
  .sum("count");

// 타이머도 프로세싱 타임으로
// ctx.timerService().registerProcessingTimeTimer(t);`,
    lang: "java",
  },
  {
    id: "CORE-012",
    nameEn: "WATERMARK",
    nameKo: "워터마크",
    rarity: "UR",
    type: "CORE",
    attrs: ["Time", "Boss"],
    atk: "진행 신호",
    def: "윈도우 닫기",
    effect:
      "「이 이벤트 타임 이전은 대체로 도착 완료」라는 마커. 윈도우 종료·이벤트 타임 타이머를 유발한다.",
    flavor: "시간에 찍는 완료 도장.",
    visual: "watermark",
    snippet: "W(t) ≥ end → close",
    detail:
      "워터마크 W(t)는 't 이전 이벤트는 더 안 올 것'이라는 휴리스틱이다. 윈도우 [start, end)는 W ≥ end일 때 닫힌다. 너무 공격적이면 늦은 이벤트 손실, 너무 느리면 지연 증가. forBoundedOutOfOrderness, monotony, idle 소스 처리 등을 상황에 맞게 고른다. allowedLateness로 늦은 업데이트를 허용할 수도 있다.",
    code: `// 최대 5초 늦게 와도 허용하는 WM
WatermarkStrategy
  .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
  .withTimestampAssigner((e, t) -> e.ts);

// 윈도우 end=10:00:00 이면
// watermark ≥ 10:00:00 일 때 결과 방출

// 늦은 데이터 추가 허용
.window(...)
.allowedLateness(Time.seconds(10))
.sideOutputLateData(lateTag);`,
    lang: "java",
  },
  {
    id: "CORE-013",
    nameEn: "KEYED STATE",
    nameKo: "키드 스테이트",
    rarity: "SR",
    type: "CORE",
    attrs: ["State"],
    atk: "로컬 기억",
    def: "키 샤딩",
    effect:
      "keyBy 이후 키별 상태를 서브태스크 로컬에 보관. Value/List/Map State. 고처리량의 핵심.",
    flavor: "금고는 내 옆에.",
    visual: "state",
    snippet: "ValueState<T>",
    detail:
      "상태 연산자의 병렬 인스턴스는 키 공간을 나눠 가진 샤딩 KV처럼 동작한다. 상태는 힙 또는 RocksDB 등 백엔드에 있고 체크포인트로 스냅샷된다. 항상 현재 키 컨텍스트에서만 읽고 쓴다. TTL로 만료, 디스크 백엔드로 대용량을 버틴다.",
    code: `public class CountFn
    extends KeyedProcessFunction<String, Event, String> {

  private ValueState<Long> cnt;

  @Override
  public void open(Configuration conf) {
    cnt = getRuntimeContext().getState(
      new ValueStateDescriptor<>("cnt", Long.class));
  }

  @Override
  public void processElement(Event e, Context ctx, Collector<String> out)
      throws Exception {
    long n = cnt.value() == null ? 0 : cnt.value();
    cnt.update(n + 1);
    out.collect(e.getKey() + " → " + (n + 1));
  }
}`,
    lang: "java",
  },
  {
    id: "CORE-014",
    nameEn: "CHECKPOINT",
    nameKo: "체크포인트",
    rarity: "SR",
    type: "CORE",
    attrs: ["FaultTolerance"],
    atk: "스냅샷",
    def: "자동 복구",
    effect:
      "분산 상태 + 소스 오프셋을 주기적으로 비동기 스냅샷. 실패 시 롤백 후 재개.",
    flavor: "흐르는 강의 사진.",
    visual: "checkpoint",
    snippet: "enableCheckpointing(ms)",
    detail:
      "Checkpoint barrier가 소스에서 흘러 연산자 상태를 정렬된 스냅샷으로 맞춘다(Chandy-Lamport 계열). 처리와 겹쳐 비동기로 찍어 처리량을 유지한다. 간격·타임아웃·스토리지(HDFS/S3/…)·exactly-once vs at-least-once를 설정한다. 장애 시 마지막 성공 체크포인트로 상태를 되돌리고 소스를 리와인드한다.",
    code: `env.enableCheckpointing(60_000); // 60s

CheckpointConfig cfg = env.getCheckpointConfig();
cfg.setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);
cfg.setMinPauseBetweenCheckpoints(30_000);
cfg.setCheckpointTimeout(120_000);
cfg.setTolerableCheckpointFailureNumber(3);

// state.backend, checkpoint storage 는
// flink-conf 또는 코드로 지정`,
    lang: "java",
  },
  {
    id: "CORE-015",
    nameEn: "SAVEPOINT",
    nameKo: "세이브포인트",
    rarity: "UR",
    type: "CORE",
    attrs: ["Ops"],
    atk: "운영 스냅샷",
    def: "마이그레이션",
    effect:
      "운영자가 트리거하는 일관 스냅샷. 버전 업·재스케일·이관용. Checkpoint≠Savepoint.",
    flavor: "수동 세이브 슬롯.",
    visual: "savepoint",
    snippet: "flink savepoint <jobId>",
    detail:
      "Checkpoint는 자동 장애 복구용(짧은 수명, 덮어쓰기). Savepoint는 의도를 담은 운영 스냅샷으로, 스키마/토폴로지 변경·블루그린·클러스터 이전에 쓴다. uid를 연산자에 고정해 두어야 상태 매칭이 안전하다. 재개: flink run -s savepointPath ...",
    code: `# 트리거
./bin/flink savepoint <jobId> [targetDir]

# 세이브포인트에서 재개
./bin/flink run -s hdfs:///sp/savepoint-xxx \\
  -c com.example.Job my-job.jar

// 코드: 상태 호환을 위해 uid 고정
stream.map(...).uid("parse-map")
      .keyBy(...)
      .process(...).uid("count-process");`,
    lang: "bash",
  },
  {
    id: "CORE-016",
    nameEn: "EXACTLY-ONCE",
    nameKo: "정확히 한 번",
    rarity: "LR",
    type: "CORE",
    attrs: ["Semantics", "Boss"],
    atk: "정확성",
    def: "장애 무관",
    effect:
      "스냅샷 + 재생으로 상태 관점 효과가 한 번만 반영된 것처럼. 엔드투엔드는 싱크 협조 필요.",
    flavor: "장부는 한 줄만.",
    visual: "exactly",
    snippet: "checkpoint + transactional sink",
    detail:
      "Flink 내부 상태 exactly-once는 체크포인트 정렬로 보장한다. 외부 싱크까지 end-to-end로 가려면 Kafka transactional sink, two-phase commit sink 등 커넥터 지원이 필요하다. at-least-once는 중복 가능·구현 단순. 요구 정확도와 지연·복잡도 트레이드오프를 명시적으로 고른다.",
    code: `env.enableCheckpointing(10_000);
env.getCheckpointConfig()
   .setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);

// Kafka sink 예: 트랜잭션 보장 설정
KafkaSink<String> sink = KafkaSink.<String>builder()
  .setBootstrapServers("...")
  .setRecordSerializer(...)
  .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
  .setTransactionalIdPrefix("flink-tx-")
  .build();`,
    lang: "java",
  },
  {
    id: "CORE-017",
    nameEn: "WINDOW",
    nameKo: "윈도우",
    rarity: "R",
    type: "CORE",
    attrs: ["Analytics"],
    atk: "구간 집계",
    def: "무한→유한",
    effect:
      "Tumbling(겹침 없음)·Sliding(겹침)·Session(비활성 간격). Event Time과 함께 쓴다.",
    flavor: "무한을 창으로 자른다.",
    visual: "window",
    snippet: "Tumble / Slide / Session",
    detail:
      "Unbounded 스트림을 집계하려면 시간·개수 버킷이 필요하다. Tumbling: 고정 크기 비겹침. Sliding: 크기+슬라이드. Session: gap 동안 이벤트 없으면 닫힘. Global/Count window도 있다. 키드 윈도우가 일반적이고, 결과는 윈도우 끝(+워터마크)에 방출된다.",
    code: `// 5분 텀블링 (event time)
.keyBy(e -> e.userId)
.window(TumblingEventTimeWindows.of(Time.minutes(5)))
.aggregate(new SumAgg());

// 10분 윈도우, 1분마다 결과 (슬라이딩)
.window(SlidingEventTimeWindows
  .of(Time.minutes(10), Time.minutes(1)));

// 세션: 30초 침묵이면 세션 종료
.window(EventTimeSessionWindows
  .withGap(Time.seconds(30)));`,
    lang: "java",
  },
  {
    id: "CORE-018",
    nameEn: "PROCESS FUNCTION",
    nameKo: "프로세스 함수",
    rarity: "UR",
    type: "API",
    attrs: ["LowLevel"],
    atk: "자유 처리",
    def: "타이머+상태",
    effect:
      "최저 추상화. 요소 처리·상태·이벤트/프로세싱 타이머·사이드 아웃을 한곳에서.",
    flavor: "맨손 커스텀 로직.",
    visual: "process",
    snippet: "processElement + onTimer",
    detail:
      "KeyedProcessFunction 등이 대표다. 단순 map/reduce로 못 하는 타임아웃 세션, 복합 패턴, 지연 알림을 구현한다. 타이머는 키 단위로 등록·콜백된다. 남용하면 코드가 커지므로, 가능하면 윈도우/SQL을 쓰고 꼭 필요할 때만 Process로 내린다.",
    code: `public class TimeoutFn
    extends KeyedProcessFunction<String, Event, Alert> {

  private ValueState<Long> lastSeen;

  public void processElement(Event e, Context ctx, Collector<Alert> out)
      throws Exception {
    lastSeen.update(e.getTs());
    long timeout = e.getTs() + 60_000;
    ctx.timerService().registerEventTimeTimer(timeout);
  }

  public void onTimer(long ts, OnTimerContext ctx, Collector<Alert> out)
      throws Exception {
    // 60s 내 후속 이벤트 없으면 알림
    out.collect(new Alert(ctx.getCurrentKey(), "timeout"));
  }
}`,
    lang: "java",
  },
  {
    id: "ARCH-019",
    nameEn: "JOBMANAGER",
    nameKo: "잡매니저",
    rarity: "UR",
    type: "ARCH",
    attrs: ["Runtime"],
    atk: "조율",
    def: "스케줄·복구",
    effect:
      "ResourceManager + Dispatcher + JobMaster. 스케줄링·체크포인트 조율·실패 복구 지휘.",
    flavor: "지휘자는 하나.",
    visual: "jm",
    snippet: "JM = RM + Dispatcher + JobMaster",
    detail:
      "Client는 그래프를 제출하고 빠질 수 있다(detached). JobManager가 실행을 지휘한다. ResourceManager는 슬롯 할당, Dispatcher는 REST 제출·WebUI·JobMaster 기동, JobMaster는 JobGraph 하나 실행. HA에서는 Leader/Standby JobManager를 둔다.",
    code: `// 개념 구조 (프로세스가 아닌 논리 부품)
JobManager
├─ ResourceManager  → Task Slot 관리
├─ Dispatcher       → 제출 REST / WebUI
└─ JobMaster(×N)    → 잡마다 1개 실행 관리

// 제출
./bin/flink run -d ./my-job.jar   # -d detached`,
    lang: "text",
  },
  {
    id: "ARCH-020",
    nameEn: "TASKMANAGER",
    nameKo: "태스크매니저",
    rarity: "R",
    type: "ARCH",
    attrs: ["Worker"],
    atk: "실행",
    def: "버퍼·교환",
    effect:
      "워커 JVM. 서브태스크 실행, 네트워크 버퍼로 스트림 교환. 슬롯으로 수용량 표현.",
    flavor: "전장의 일꾼.",
    visual: "tm",
    snippet: "TM × slots",
    detail:
      "TaskManager는 하나 이상 필요하며, 각각 여러 slot을 갖는다. 슬롯 수≈동시 태스크 수용(공유 정책에 따라 파이프라인 단위). TM 간/내부에서 레코드를 버퍼링·셔플한다. 메모리(프레임워크/태스크/네트워크/관리) 설정이 성능에 직결된다.",
    code: `# flink-conf.yaml 예시 개념
taskmanager.numberOfTaskSlots: 4
taskmanager.memory.process.size: 4096m

# 클러스터: JM 1 + TM N
# 필요 슬롯 ≈ 잡 max parallelism (slot sharing 시)`,
    lang: "yaml",
  },
  {
    id: "ARCH-021",
    nameEn: "TASK SLOT",
    nameKo: "태스크 슬롯",
    rarity: "R",
    type: "ARCH",
    attrs: ["Resource"],
    atk: "스케줄 단위",
    def: "메모리 몫",
    effect:
      "TM 자원의 고정 조각. managed memory를 나누며 CPU 격리는 하지 않는다.",
    flavor: "소켓 하나 = 자리 하나.",
    visual: "slot",
    snippet: "slots per TM",
    detail:
      "슬롯은 스케줄링 단위다. 기본적으로 같은 잡의 서로 다른 서브태스크가 슬롯을 공유(slot sharing)해, 필요 슬롯 수 = 잡의 최대 병렬도가 된다. 공유 없이 쓰면 슬롯 계산이 복잡해지고 유휴 자원이 생긴다.",
    code: `// slot sharing 그룹 (고급)
.map(...).slotSharingGroup("heavy");
// 같은 그룹만 슬롯 공유

// 실무 감각
// maxParallelism = 16, slot sharing on
// → 클러스터에 슬롯 16개면 이론상 기동 가능
// TM 4대 × slot 4 = 16`,
    lang: "java",
  },
  {
    id: "ARCH-022",
    nameEn: "OPERATOR CHAIN",
    nameKo: "오퍼레이터 체인",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Optimization"],
    atk: "스루풋",
    def: "저지연",
    effect:
      "연속 연산자를 한 스레드(Task)로 묶음. 핸드오버·직렬화 비용 감소.",
    flavor: "이어 붙이면 마찰↓.",
    visual: "chain",
    snippet: "map→filter 한 스레드",
    detail:
      "병렬도가 같고 forward 연결이며 체이닝 비활성 조건이 없으면 map-filter-map이 한 Task로 합쳐진다. 디버깅·슬롯 배치 때문에 끊을 때는 startNewChain / disableChaining. 체인이 길면 한 스레드가 너무 많은 일을 할 수 있어 프로파일 후 조정한다.",
    code: `stream
  .map(new A())          // ⎤
  .filter(new F())       // ⎬ 같은 chain (한 스레드)
  .map(new B())          // ⎦
  .keyBy(...)            // 셔플 → chain 끊김
  .map(new C())
  .startNewChain()       // 강제 새 chain
  .map(new D());

// env.disableOperatorChaining(); // 전역 off`,
    lang: "java",
  },
  {
    id: "ARCH-023",
    nameEn: "SESSION VS APP CLUSTER",
    nameKo: "세션 vs 앱 클러스터",
    rarity: "R",
    type: "ARCH",
    attrs: ["Deploy"],
    atk: "배포 모델",
    def: "수명·격리",
    effect:
      "Session: 장기 공용 클러스터에 다중 제출. Application: 앱 전용, 수명=앱.",
    flavor: "공용 서버실 vs 전용 함선.",
    visual: "cluster",
    snippet: "session | application",
    detail:
      "Session은 기동 비용이 싸 짧은 잡·인터랙티브에 유리하지만 자원 경쟁·장애 전파가 있다. Application Cluster는 main이 클러스터에서 돌고 앱 단위 격리·K8s 배포에 잘 맞다. (구 Job Cluster 모드는 deprecated 계열로 문서 확인.) 팀 표준 배포 모델을 하나로 정하는 것이 중요하다.",
    code: `# Session: 클러스터 먼저, 잡 여러 번 제출
./bin/start-cluster.sh
./bin/flink run job1.jar
./bin/flink run job2.jar

# Application (예: K8s / 스크립트 개념)
# 이미지·JAR에 엔트리 포함, 클러스터 수명 = 앱
# flink run-application -t kubernetes ...`,
    lang: "bash",
  },
  {
    id: "API-024",
    nameEn: "ABSTRACTION LEVELS",
    nameKo: "추상화 계층",
    rarity: "R",
    type: "API",
    attrs: ["Design"],
    atk: "선택",
    def: "표현력",
    effect:
      "SQL → Table → DataStream → ProcessFunction. 위로 간결, 아래로 제어.",
    flavor: "성채와 지하실 한 왕국.",
    visual: "layers",
    snippet: "SQL ⊃ Table ⊃ Stream ⊃ Process",
    detail:
      "가능하면 SQL/Table로 시작하고, 커넥터·커스텀 타이밍·복잡한 상태가 필요하면 DataStream/Process로 내린다. 계층을 섞을 수 있으므로 '전부 로우레벨'은 유지비 폭탄이다. 팀 컨벤션: 기본 SQL, 예외만 Java process.",
    code: `// 높은 추상화
tableEnv.executeSql("INSERT INTO ... SELECT ...");

// 중간
table.select($("a"), $("b").sum());

// 코어
stream.keyBy(...).window(...).aggregate(...);

// 최저
stream.keyBy(...).process(new KeyedProcessFunction<>(){...});`,
    lang: "java",
  },
  {
    id: "API-025",
    nameEn: "SIDE OUTPUT",
    nameKo: "사이드 아웃풋",
    rarity: "SR",
    type: "API",
    attrs: ["Stream"],
    atk: "분기",
    def: "늦은 데이터",
    effect:
      "본 스트림 외 태그된 부가 출력. 필터 분리·late event·독 메시지 처리에 사용.",
    flavor: "본선과 갓길.",
    visual: "side",
    snippet: "OutputTag + getSideOutput",
    detail:
      "ProcessFunction에서 ctx.output(tag, record)로 분기한다. 윈도우의 sideOutputLateData와 조합해 늦은 이벤트를 별도 파이프라인으로 보낼 수 있다. 메인 결과는 깨끗이, 예외 경로는 모니터링·재처리 큐로.",
    code: `OutputTag<Event> late =
  new OutputTag<>("late"){};

SingleOutputStreamOperator<Result> main = stream
  .keyBy(...)
  .window(...)
  .sideOutputLateData(late)
  .aggregate(...);

DataStream<Event> lateStream =
  main.getSideOutput(late);

lateStream.addSink(...); // DLQ/모니터링`,
    lang: "java",
  },
  {
    id: "OPS-026",
    nameEn: "BACKPRESSURE",
    nameKo: "백프레셔",
    rarity: "SR",
    type: "OPS",
    attrs: ["Perf"],
    atk: "과부하 신호",
    def: "속도 균형",
    effect:
      "하류가 느리면 상류가 느려진다. 병목·느린 sink·부족 자원의 증상.",
    flavor: "막히면 위부터 서행.",
    visual: "backpressure",
    snippet: "WebUI OK / LOW / HIGH",
    detail:
      "Flink는 네트워크 버퍼  crediting으로 배압을 전파한다. WebUI Backpressure 탭·메트릭으로 확인. 원인: 핫 키, 작은 병렬도, 외부 sink 지연, GC, 데이터 Skew. 처방: 병렬도·체인·비동기 I/O·재파티션·싱크 튜닝. 배압을 '끄는' 게 아니라 병목을 찾는 신호로 본다.",
    code: `// 점검 체크리스트 (코드/설정)
// 1) 병목 연산자 병렬도 상향
.map(heavy).setParallelism(16);

// 2) 핫 키 완화 — 키 살트
.keyBy(e -> e.userId + "_" + (e.hash % 8));

// 3) 블로킹 sink 지양, 배치 쓰기
// 4) checkpoint 간격·상태 크기 확인
// 5) TM 메모리 / GC 로그`,
    lang: "java",
  },
  {
    id: "OPS-027",
    nameEn: "STATE BACKEND",
    nameKo: "스테이트 백엔드",
    rarity: "SR",
    type: "OPS",
    attrs: ["State"],
    atk: "저장 구조",
    def: "힙 vs RocksDB",
    effect:
      "HashMapStateBackend(힙) vs EmbeddedRocksDB. 크기·지연 트레이드오프.",
    flavor: "기억의 창고 선택.",
    visual: "backend",
    snippet: "heap | rocksdb",
    detail:
      "상태가 작으면 힙 백엔드가 빠르다. 크면 RocksDB가 디스크에 두고 체크포인트 증분에도 유리한 편이다. 체크포인트 스토리지(영속 위치)와 백엔드(로컬 작업 상태 구조)를 헷갈리지 말 것. 직렬화 비용·TTL·상태 정리 운영이 뒤따른다.",
    code: `// 코드에서 지정 예 (버전별 API 상이 가능)
env.setStateBackend(new HashMapStateBackend());
// 또는 RocksDB
// env.setStateBackend(new EmbeddedRocksDBStateBackend(true));

// flink-conf.yaml 개념
// state.backend: rocksdb
// state.checkpoints.dir: s3://bucket/checkpoints`,
    lang: "java",
  },
  {
    id: "OPS-028",
    nameEn: "WATERMARK + LATE",
    nameKo: "늦은 이벤트",
    rarity: "UR",
    type: "OPS",
    attrs: ["Time"],
    atk: "정확 vs 지연",
    def: "실무 튜닝",
    effect:
      "out-of-orderness·allowedLateness·sideOutput로 늦은 데이터 정책을 정한다.",
    flavor: "늦어도 오는 손님.",
    visual: "late",
    snippet: "lateness policy",
    detail:
      "실무 스트림은 순서가 뒤섞인다. BoundedOutOfOrderness로 버퍼링 시간을 주고, 그래도 늦은 것은 드롭·사이드아웃·allowedLateness로 갱신. '비즈니스상 5분 늦은 결제'를 포함할지 SLA로 정한 뒤 수치를 코드에 박는다.",
    code: `WatermarkStrategy
  .<Event>forBoundedOutOfOrderness(Duration.ofMinutes(1))
  .withTimestampAssigner((e, t) -> e.ts)
  .withIdleness(Duration.ofMinutes(2)); // 유휴 파티션

.window(TumblingEventTimeWindows.of(Time.minutes(5)))
.allowedLateness(Time.minutes(2))
.sideOutputLateData(lateTag)
.aggregate(agg);`,
    lang: "java",
  },
  {
    id: "OPS-029",
    nameEn: "UID & STATE COMPAT",
    nameKo: "UID와 상태 호환",
    rarity: "SR",
    type: "OPS",
    attrs: ["Ops"],
    atk: "업그레이드",
    def: "세이브포인트",
    effect:
      "연산자 uid를 고정해야 세이브포인트 재개 시 상태가 올바른 노드에 복원된다.",
    flavor: "이름표 없는 짐은 분실.",
    visual: "uid",
    snippet: ".uid(\"fixed-id\")",
    detail:
      "토폴로지를 바꾸거나 병렬도를 바꿔 재개할 때, Flink는 uid(또는 uidHash)로 상태를 매칭한다. 자동 생성 id에 의존하면 리팩터 후 상태 유실·불일치가 난다. 프로덕션 잡은 주요 상태 연산자에 명시 uid + 문서화가 필수다.",
    code: `stream
  .map(new ParseFn()).name("parse").uid("parse-v1")
  .keyBy(Event::getKey)
  .process(new CountFn()).name("count").uid("count-v1")
  .sinkTo(sink).uid("sink-v1");

// 상태 스키마 변경 시 State Migration /
// 커스텀 시리얼라이저 호환 규칙을 따로 설계`,
    lang: "java",
  },
  {
    id: "OPS-030",
    nameEn: "HA JOBMANAGER",
    nameKo: "HA 잡매니저",
    rarity: "UR",
    type: "OPS",
    attrs: ["HA"],
    atk: "리더십",
    def: "SPOF 제거",
    effect:
      "JM 다중 기동, Leader + Standby. ZooKeeper/K8s 등으로 리더 선출.",
    flavor: "왕이 쓰러져도 왕국은.",
    visual: "ha",
    snippet: "high-availability: zookeeper",
    detail:
      "스트리밍 잡은 수개월 떠 있는 경우가 많아 JM 단일 장애점을 제거해야 한다. HA 메타데이터·리더 선출 저장소가 필요하다. TM·체크포인트 스토리지도 내구성 있게. K8s 운영 시 Flink Kubernetes HA 또는 ZK 중 스택에 맞게 선택.",
    code: `# flink-conf.yaml 개념
high-availability: zookeeper
high-availability.storageDir: hdfs:///flink/ha
high-availability.zookeeper.quorum: zk1:2181,zk2:2181

# 프로세스: JM 2+ / TM N
# Leader JM만 스케줄, Standby는 대기`,
    lang: "yaml",
  },
  {
    id: "CORE-031",
    nameEn: "WATERMARK IDLENESS",
    nameKo: "유휴 파티션",
    rarity: "SR",
    type: "CORE",
    attrs: ["Time"],
    atk: "진행 보장",
    def: "멈춘 워터마크",
    effect:
      "어떤 Kafka 파티션이 조용하면 워터마크가 안 나가 윈도우가 안 닫힐 수 있다. idleness 설정.",
    flavor: "조용한 물길이 전체를 막는다.",
    visual: "idle",
    snippet: "withIdleness(Duration)",
    detail:
      "이벤트 타임 진행은 모든 병렬 소스 파티션의 워터마크 최솟값에 묶인다. 트래픽 없는 파티션이 있으면 전역 WM이 정지 → 윈도우 지연. withIdleness로 '이 시간 동안 데이터 없으면 유휴'로 표시해 진행을 허용한다.",
    code: `WatermarkStrategy
  .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(10))
  .withIdleness(Duration.ofMinutes(1))
  .withTimestampAssigner((e, t) -> e.ts);`,
    lang: "java",
  },
  {
    id: "CORE-032",
    nameEn: "INCREMENTAL AGG",
    nameKo: "증분 집계",
    rarity: "R",
    type: "CORE",
    attrs: ["Window"],
    atk: "메모리 절약",
    def: "AggregateFunction",
    effect:
      "윈도우에 raw 이벤트를 쌓지 않고 중간 결과만 유지. reduce/aggregate 권장.",
    flavor: "다 쌓지 말고 요약만.",
    visual: "agg",
    snippet: "AggregateFunction",
    detail:
      "window.apply(WindowFunction)만 쓰면 윈도우 버퍼에 이벤트가 쌓여 메모리가 폭발할 수 있다. ReduceFunction / AggregateFunction으로 도착 즉시 증분 병합하면 상태 크기가 상수에 가깝다. 합·평균·카운트·스케치에 필수 습관.",
    code: `public class SumAgg
    implements AggregateFunction<Event, Long, Long> {
  public Long createAccumulator() { return 0L; }
  public Long add(Event e, Long acc) {
    return acc + e.getAmount();
  }
  public Long getResult(Long acc) { return acc; }
  public Long merge(Long a, Long b) { return a + b; }
}

stream.keyBy(...)
  .window(TumblingEventTimeWindows.of(Time.minutes(5)))
  .aggregate(new SumAgg());`,
    lang: "java",
  },
  {
    id: "STARTER-033",
    nameEn: "ANATOMY OF A JOB",
    nameKo: "잡의 해부",
    rarity: "N",
    type: "STARTER",
    attrs: ["Intro"],
    atk: "실행 환경",
    def: "그래프 제출",
    effect:
      "env 생성 → 소스·변환·싱크 정의 → execute. 로컬 또는 리모트 클러스터.",
    flavor: "main에서 그래프를 그린다.",
    visual: "job",
    snippet: "env.execute(name)",
    detail:
      "StreamExecutionEnvironment로 컨텍스트를 만들고 파이프라인을 선언한 뒤 execute가 JobGraph를 만들어 제출한다. 로컬 미니 클러스터로 단위 테스트하고, 패키징 후 클러스터에 올린다. 병렬도·체크포인트·타임베이스는 env 설정 단계에 모은다.",
    code: `public class MyJob {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();
    env.setParallelism(4);
    env.enableCheckpointing(60_000);

    DataStream<String> s = env.fromSource(...);
    s.map(...).sinkTo(...);

    env.execute("my-flink-job");
  }
}`,
    lang: "java",
  },
  {
    id: "STARTER-034",
    nameEn: "KAFKA + FLINK",
    nameKo: "카프카 연동",
    rarity: "R",
    type: "STARTER",
    attrs: ["Connector"],
    atk: "실무 소스",
    def: "표준 파이프",
    effect:
      "가장 흔한 소스/싱크. 오프셋·파티션·exactly-once 연동이 핵심 포인트.",
    flavor: "스트림의 고속도로.",
    visual: "kafka",
    snippet: "KafkaSource / KafkaSink",
    detail:
      "KafkaSource는 구독·오프셋 리셋·워터마크 연동을 설정한다. 체크포인트가 Kafka 오프셋을 상태의 일부로 저장한다. Sink는 at-least / exactly-once(트랜잭션) 선택. 파티션 수와 Flink 병렬도를 맞추는 것이 처리량 기본 공식이다.",
    code: `KafkaSource<String> source = KafkaSource.<String>builder()
  .setBootstrapServers("broker:9092")
  .setTopics("orders")
  .setGroupId("flink-orders")
  .setStartingOffsets(OffsetsInitializer.earliest())
  .setValueOnlyDeserializer(new SimpleStringSchema())
  .build();

env.fromSource(
  source,
  WatermarkStrategy.noWatermarks(),
  "kafka-orders"
);`,
    lang: "java",
  },
  {
    id: "CORE-035",
    nameEn: "TIMER SERVICE",
    nameKo: "타이머 서비스",
    rarity: "SR",
    type: "CORE",
    attrs: ["Time"],
    atk: "콜백",
    def: "키 단위 알람",
    effect:
      "Event/Processing time 타이머 등록 → onTimer. 타임아웃·세션·지연 발행.",
    flavor: "키마다 알람시계.",
    visual: "timer",
    snippet: "register*Timer",
    detail:
      "KeyedProcessFunction 안에서만 의미가 있다. 같은 키의 타이머는 정렬되어 콜백된다. 상태와 함께 쓰면 '마지막 이벤트 후 5분' 패턴이 단순해진다. 타이머도 체크포인트에 포함된다. 과다 등록 시 상태 비대화에 주의.",
    code: `long fire = ctx.timestamp() + Duration.ofMinutes(5).toMillis();
ctx.timerService().registerEventTimeTimer(fire);

// onTimer 에서
public void onTimer(long ts, OnTimerContext ctx, Collector<O> out) {
  // 워터마크가 ts를 지나 호출됨
  out.collect(...);
  // ctx.timerService().deleteEventTimeTimer(...);
}`,
    lang: "java",
  },
  {
    id: "OPS-036",
    nameEn: "METRICS & WEB UI",
    nameKo: "메트릭과 WebUI",
    rarity: "N",
    type: "OPS",
    attrs: ["Observability"],
    atk: "가시성",
    def: "운영 눈",
    effect:
      "Job/Task 메트릭, 체크포인트 통계, 백프레셔, 워터마크를 UI·Prometheus로 본다.",
    flavor: "안 보이면 못 고친다.",
    visual: "metrics",
    snippet: "Flink WebUI :8081",
    detail:
      "로컬/클러스터 WebUI에서 그래프, 병렬 서브태스크, 체크포인트 성공률·크기·시간, 예외 로그를 본다. 프로덕션은 Prometheus reporter + 대시보드 필수. '처리량·지연·체크포인트 실패·배압·워터마크 정체' 다섯 가지를 기본 알람으로 둔다.",
    code: `# flink-conf.yaml 개념
metrics.reporter.prom.factory.class: \\
  org.apache.flink.metrics.prometheus.PrometheusReporterFactory
metrics.reporter.prom.port: 9249

// 커스텀 메트릭
Counter c = getRuntimeContext()
  .getMetricGroup().counter("bad_records");
c.inc();`,
    lang: "yaml",
  },
  {
    id: "CORE-037",
    nameEn: "TWO STREAM JOIN",
    nameKo: "스트림 조인",
    rarity: "UR",
    type: "CORE",
    attrs: ["Join"],
    atk: "상관",
    def: "시간 창",
    effect:
      "interval join·window join으로 두 스트림을 키+시간 조건으로 결합.",
    flavor: "두 강이 만나는 구간.",
    visual: "join",
    snippet: "intervalJoin",
    detail:
      "무제한 조인은 상태가 무한히 커질 수 있어 시간 범위를 강제한다. interval join: 키 같고 상대 타임스탬프가 [t-a, t+b] 안에 있을 때. SQL에서도 interval join·temporal join이 있다. 상태 TTL·워터마크 정렬이 성패를 가른다.",
    code: `orders
  .keyBy(Order::getId)
  .intervalJoin(payments.keyBy(Pay::getOrderId))
  .between(Time.minutes(-5), Time.minutes(10))
  .process(new ProcessJoinFunction<Order, Pay, Paid>() {
    public void processElement(Order o, Pay p,
        Context ctx, Collector<Paid> out) {
      out.collect(new Paid(o, p));
    }
  });`,
    lang: "java",
  },
  {
    id: "OPS-038",
    nameEn: "PRODUCTION CHECKLIST",
    nameKo: "프로덕션 체크",
    rarity: "SR",
    type: "OPS",
    attrs: ["Checklist"],
    atk: "안정성",
    def: "출격 전",
    effect:
      "체크포인트·HA·관측·uid·리소스·시맨틱스·재시작 전략을 배포 전에 고정한다.",
    flavor: "출격 전 점호.",
    visual: "check",
    snippet: "go-live list",
    detail:
      "최소 목록: (1) exactly/at-least 결정 (2) checkpoint 간격·스토리지 (3) state backend (4) JM HA (5) 연산자 uid (6) 병렬도·슬롯 (7) 메트릭·알람 (8) 재시작 전략 (9) savepoint 업그레이드 절차 (10) 스키마 호환. 이 열 줄이 없으면 아직 실험이다.",
    code: `env.setRestartStrategy(
  RestartStrategies.fixedDelayRestart(5, Time.of(10, SECONDS)));
env.enableCheckpointing(60_000);
// uid 전부 고정
// Kafka 보장 수준 = 제품 요구와 일치
// TM 메모리 > 상태 피크 + 네트워크 버퍼
// 알람: checkpoint failure, downtime, lag`,
    lang: "java",
  },
  {
    id: "API-039",
    nameEn: "ASYNC I/O",
    nameKo: "비동기 I/O",
    rarity: "UR",
    type: "API",
    attrs: ["Perf"],
    atk: "외부 조회",
    def: "배압 완화",
    effect:
      "외부 API/DB 조회를 비동기 클라이언트+타임아웃으로. 동기 map 지옥을 피한다.",
    flavor: "기다림을 겹친다.",
    visual: "async",
    snippet: "AsyncDataStream",
    detail:
      "enrichment에서 HTTP/Redis를 동기 호출하면 스레드가 막혀 처리량이 죽는다. AsyncFunction + 용량·타임아웃·재시도 정책. 순서 필요 시 ordered wait, 아니면 unordered. 실패는 사이드 아웃으로.",
    code: `DataStream<Enriched> out =
  AsyncDataStream.unorderedWait(
    stream,
    new AsyncDatabaseRequest(),
    2000,            // timeout ms
    TimeUnit.MILLISECONDS,
    100              // capacity
  );

// AsyncFunction 안에서 클라이언트 콜백으로
// resultFuture.complete(Collections.singleton(...));`,
    lang: "java",
  },
  {
    id: "CORE-040",
    nameEn: "CEP PATTERN",
    nameKo: "CEP 패턴",
    rarity: "UR",
    type: "CORE",
    attrs: ["CEP"],
    atk: "시퀀스",
    def: "이벤트 규칙",
    effect:
      "Complex Event Processing. A 다음 B, 시간 안, 조건 필터로 패턴 탐지.",
    flavor: "패턴 사냥꾼.",
    visual: "cep",
    snippet: "Pattern.begin(...).next(...)",
    detail:
      "사기·침입·설비 이상처럼 '이벤트 시퀀스'를 선언적으로 찾을 때 CEP 라이브러리를 쓴다. 상태·시간이 내부적으로 쓰이며, 과도한 패턴은 비용이 크다. 단순 카운트/윈도우로 되면 CEP까지 가지 않는다.",
    code: `Pattern<Event, ?> p = Pattern
  .<Event>begin("start")
  .where(e -> e.getType().equals("LOGIN"))
  .next("fail")
  .where(e -> e.getType().equals("FAIL"))
  .times(3).within(Time.minutes(5));

PatternStream<Event> ps =
  CEP.pattern(stream.keyBy(Event::getUser), p);

ps.select(map -> new Alert(map.get("fail")));`,
    lang: "java",
  },
];
