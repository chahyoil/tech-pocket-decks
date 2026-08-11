/** Extra Flink learning cards (041+) — append to deck */
(function () {
  const extra = [
    {
      id: "CORE-041",
      nameEn: "OPERATOR STATE",
      nameKo: "오퍼레이터 스테이트",
      rarity: "SR",
      type: "CORE",
      attrs: ["State"],
      atk: "병렬 인스턴스 단위",
      def: "키 없음",
      effect:
        "keyBy 없이 서브태스크마다 갖는 상태. ListState 등으로 소스 오프셋·버퍼를 보관.",
      flavor: "열쇠 없이 내 자리의 메모.",
      visual: "opstate",
      snippet: "ListState / BroadcastState",
      detail:
        "Keyed State는 키 샤딩, Operator State는 병렬 인스턴스 단위다. Kafka 소스 파티션 오프셋, 버퍼링 등이 대표 예. 리스케일 시 상태를 인스턴스 간에 재분배하는 방식(Even-split 등)을 정의해야 한다. Broadcast State도 오퍼레이터 상태의 특수 형태다.",
      code: `// Operator state example (list)
public class BufferFn extends RichFlatMapFunction<In, Out>
    implements CheckpointedFunction {

  private transient ListState<In> buffer;

  public void initializeState(FunctionInitializationContext ctx) {
    buffer = ctx.getOperatorStateStore().getListState(
      new ListStateDescriptor<>("buf", TypeInformation.of(In.class)));
    if (ctx.isRestored()) {
      for (In x : buffer.get()) { /* restore */ }
    }
  }

  public void snapshotState(FunctionSnapshotContext ctx) {
    buffer.clear();
    buffer.addAll(pending);
  }
}`,
      lang: "java",
    },
    {
      id: "CORE-042",
      nameEn: "STATE TYPES",
      nameKo: "상태 타입",
      rarity: "R",
      type: "CORE",
      attrs: ["State"],
      atk: "Value/List/Map",
      def: "Reducing/Agg",
      effect:
        "ValueState, ListState, MapState, ReducingState, AggregatingState. 용도에 맞게 고른다.",
      flavor: "서랍 종류를 고르는 일.",
      visual: "statetypes",
      snippet: "ValueState | MapState | ...",
      detail:
        "ValueState: 키당 값 하나. ListState: 리스트 추가. MapState: 키-값 맵(내부 키). Reducing/AggregatingState: 추가 즉시 병합해 메모리를 아끼고 체크포인트 부담을 줄인다. 큰 컬렉션을 ValueState에 통째로 넣지 말 것.",
      code: `ValueState<Long> cnt = getRuntimeContext().getState(
  new ValueStateDescriptor<>("cnt", Long.class));

ListState<Event> recent = getRuntimeContext().getListState(
  new ListStateDescriptor<>("recent", Event.class));

MapState<String, Integer> scores = getRuntimeContext().getMapState(
  new MapStateDescriptor<>("scores", String.class, Integer.class));

// ReducingState: add 시 reduce로 병합
ReducingState<Long> sum = getRuntimeContext().getReducingState(
  new ReducingStateDescriptor<>("sum", Long::sum, Long.class));`,
      lang: "java",
    },
    {
      id: "CORE-043",
      nameEn: "STATE TTL",
      nameKo: "상태 TTL",
      rarity: "SR",
      type: "CORE",
      attrs: ["State"],
      atk: "자동 만료",
      def: "메모리 방어",
      effect:
        "StateTtlConfig로 키 상태 만료. 무한 키 증가·세션 잔존을 막는다.",
      flavor: "잊을 줄 아는 상태.",
      visual: "ttl",
      snippet: "StateTtlConfig",
      detail:
        "실무에서 키 카디널리티가 크면 상태가 무한히 자란다. TTL은 마지막 쓰기/읽기 기준으로 만료하고, 정리 방식(전체 스캔·콜백)을 고른다. 만료된 상태 접근 시 null. 비즈니스 보존 기간과 체크포인트 크기를 같이 설계한다.",
      code: `StateTtlConfig ttl = StateTtlConfig
  .newBuilder(Time.days(1))
  .setUpdateType(StateTtlConfig.UpdateType.OnCreateAndWrite)
  .setStateVisibility(
    StateTtlConfig.StateVisibility.NeverReturnExpired)
  .cleanupFullSnapshot()
  .build();

ValueStateDescriptor<Long> desc =
  new ValueStateDescriptor<>("cnt", Long.class);
desc.enableTimeToLive(ttl);`,
      lang: "java",
    },
    {
      id: "CORE-044",
      nameEn: "BROADCAST STATE",
      nameKo: "브로드캐스트 상태",
      rarity: "UR",
      type: "CORE",
      attrs: ["State", "Pattern"],
      atk: "규칙 배포",
      def: "전 병렬 공유",
      effect:
        "규칙·설정 스트림을 모든 태스크에 복제. 본 스트림과 connect 하여 조인성 처리.",
      flavor: "전 부대에 내리는 명령서.",
      visual: "broadcast",
      snippet: "broadcast(mapDesc)",
      detail:
        "차원 테이블·동적 규칙처럼 작은 데이터를 모든 병렬 인스턴스에 복제할 때 쓴다. BroadcastStream + KeyedBroadcastProcessFunction 조합이 일반적. 브로드캐스트 쪽 상태가 커지면 메모리 폭증하므로 규칙 크기·정리 정책을 엄격히 둔다.",
      code: `MapStateDescriptor<String, Rule> ruleDesc =
  new MapStateDescriptor<>("rules", String.class, Rule.class);

BroadcastStream<Rule> rules =
  ruleStream.broadcast(ruleDesc);

events.keyBy(Event::getKey)
  .connect(rules)
  .process(new KeyedBroadcastProcessFunction<...>() {
    public void processBroadcastElement(Rule r, Context ctx, Collector<O> out) {
      ctx.getBroadcastState(ruleDesc).put(r.getId(), r);
    }
    public void processElement(Event e, ReadOnlyContext ctx, Collector<O> out) {
      Rule r = ctx.getBroadcastState(ruleDesc).get(e.getRuleId());
      // apply rule
    }
  });`,
      lang: "java",
    },
    {
      id: "CORE-045",
      nameEn: "CONNECTED STREAMS",
      nameKo: "커넥티드 스트림",
      rarity: "SR",
      type: "CORE",
      attrs: ["Stream"],
      atk: "두 입력",
      def: "공유 상태",
      effect:
        "connect로 이형 스트림 두 개를 한 연산자에. CoProcess / CoFlatMap.",
      flavor: "두 선로가 한 역으로.",
      visual: "connect",
      snippet: "a.connect(b).process(...)",
      detail:
        "union은 같은 타입만. connect는 타입 A/B를 유지한 채 한 함수에서 양쪽 이벤트를 처리하고 상태를 공유한다. 조인·보강·제어 평면 결합에 쓰인다. 키드 connect면 키 정렬된 양쪽 입력을 받는다.",
      code: `DataStream<Order> orders = ...;
DataStream<Tip> tips = ...;

orders.keyBy(Order::getId)
  .connect(tips.keyBy(Tip::getOrderId))
  .process(new CoProcessFunction<Order, Tip, Result>() {
    public void processElement1(Order o, Context ctx, Collector<Result> out) { }
    public void processElement2(Tip t, Context ctx, Collector<Result> out) { }
  });`,
      lang: "java",
    },
    {
      id: "CORE-046",
      nameEn: "UNION",
      nameKo: "유니온",
      rarity: "N",
      type: "CORE",
      attrs: ["Stream"],
      atk: "동일 타입 합류",
      def: "단순 병합",
      effect:
        "같은 타입 스트림을 하나로. 순서 보장 없음. 셔플 없이 병렬 합류 가능.",
      flavor: "같은 그릇에 붓기.",
      visual: "union",
      snippet: "stream.union(other)",
      detail:
        "여러 소스에서 온 동일 스키마 이벤트를 한 파이프라인으로 넣을 때 사용. 워터마크는 각 입력의 최소 진행에 영향받으므로 유휴 파티션·입력별 WM 전략을 신경 쓴다.",
      code: `DataStream<Event> all = clicks
  .union(views)
  .union(purchases);

// 타입이 다르면 map으로 맞춘 뒤 union
DataStream<Event> a = typeA.map(this::toEvent);
DataStream<Event> b = typeB.map(this::toEvent);
DataStream<Event> merged = a.union(b);`,
      lang: "java",
    },
    {
      id: "CORE-047",
      nameEn: "WINDOW ASSIGNER",
      nameKo: "윈도우 종류",
      rarity: "R",
      type: "CORE",
      attrs: ["Window"],
      atk: "Tumble/Slide/Session",
      def: "Global/Count",
      effect:
        "시간 텀블·슬라이드·세션, 카운트 윈도우, 글로벌. Assigner가 버킷을 정한다.",
      flavor: "자르는 칼의 형태.",
      visual: "winassign",
      snippet: "Tumbling* / Sliding* / Session*",
      detail:
        "Tumbling: 겹침 없는 고정 구간. Sliding: size+slide로 겹침. Session: gap 기반 동적. Count: 개수. Global: 키당 하나(트리거로 방출). Event/Processing time 버전을 구분해서 고른다.",
      code: `// Event time tumbling 5m
.window(TumblingEventTimeWindows.of(Time.minutes(5)))

// Sliding 10m window every 1m
.window(SlidingEventTimeWindows.of(
  Time.minutes(10), Time.minutes(1)))

// Session gap 30s
.window(EventTimeSessionWindows.withGap(Time.seconds(30)))

// Count window
.countWindow(100)
.countWindow(100, 10); // sliding count`,
      lang: "java",
    },
    {
      id: "CORE-048",
      nameEn: "PROCESS WINDOW FN",
      nameKo: "윈도우 프로세스",
      rarity: "SR",
      type: "CORE",
      attrs: ["Window"],
      atk: "전체 요소 접근",
      def: "메타데이터",
      effect:
        "ProcessWindowFunction으로 윈도우 메타+요소 iterable. 증분 agg와 조합 권장.",
      flavor: "창을 열고 전부 훑기.",
      visual: "procwin",
      snippet: "ProcessWindowFunction",
      detail:
        "순수 ProcessWindowFunction만 쓰면 윈도우 버퍼가 커진다. aggregate/reduce + ProcessWindowFunction 조합으로 증분 결과는 유지하고, 마지막에 키·윈도우 시간 메타만 붙이는 패턴이 표준이다.",
      code: `stream.keyBy(e -> e.user)
  .window(TumblingEventTimeWindows.of(Time.minutes(5)))
  .aggregate(new SumAgg(), new ProcessWindowFunction<Long, Out, String, TimeWindow>() {
    public void process(String key, Context ctx,
        Iterable<Long> agg, Collector<Out> out) {
      long sum = agg.iterator().next();
      out.collect(new Out(key, sum,
        ctx.window().getStart(), ctx.window().getEnd()));
    }
  });`,
      lang: "java",
    },
    {
      id: "CORE-049",
      nameEn: "TRIGGER & EVICTOR",
      nameKo: "트리거와 이빅터",
      rarity: "UR",
      type: "CORE",
      attrs: ["Window"],
      atk: "방출 조건",
      def: "요소 제거",
      effect:
        "Trigger가 언제 계산·방출할지, Evictor가 방출 전후 요소를 버릴지 결정.",
      flavor: "방아쇠와 청소부.",
      visual: "trigger",
      snippet: ".trigger(...).evictor(...)",
      detail:
        "기본 시간 윈도우는 EventTimeTrigger 등. 커스텀 트리거로 early fire, count 조건을 섞을 수 있다. Evictor는 예: 상위 N개만 남기기. 잘못 쓰면 의미 없는 중간 결과·상태 비대화가 나니 기본값으로 충분한지 먼저 본다.",
      code: `stream.keyBy(...)
  .window(TumblingEventTimeWindows.of(Time.minutes(5)))
  .trigger(CountTrigger.of(100)) // 예: 개수 기반
  .evictor(CountEvictor.of(1000))
  .aggregate(new SumAgg());

// ContinuousEventTimeTrigger: 주기 early result`,
      lang: "java",
    },
    {
      id: "CORE-050",
      nameEn: "ALLOWED LATENESS",
      nameKo: "허용 지연",
      rarity: "SR",
      type: "CORE",
      attrs: ["Time", "Window"],
      atk: "늦은 갱신",
      def: "상태 유지 연장",
      effect:
        "워터마크 지난 뒤에도 윈도우 상태를 잠시 유지해 늦은 이벤트로 재계산.",
      flavor: "문 닫고도 잠깐 열어두기.",
      visual: "lateness",
      snippet: "allowedLateness(Time)",
      detail:
        "기본은 워터마크가 end를 지나면 윈도우를 버린다. allowedLateness 동안은 늦은 요소가 들어오면 결과를 다시 보낸다(업데이트). 다운스트림이 중복/정정에 대비해야 한다. 너무 길면 상태 유지 비용 증가.",
      code: `stream.keyBy(e -> e.key)
  .window(TumblingEventTimeWindows.of(Time.minutes(5)))
  .allowedLateness(Time.minutes(1))
  .sideOutputLateData(lateTag)
  .aggregate(new SumAgg());

DataStream<Event> late = result.getSideOutput(lateTag);`,
      lang: "java",
    },
    {
      id: "API-051",
      nameEn: "RICH FUNCTION",
      nameKo: "리치 함수",
      rarity: "R",
      type: "API",
      attrs: ["API"],
      atk: "open/close",
      def: "런타임 컨텍스트",
      effect:
        "RichMap/FlatMap 등. open에서 상태·연결 초기화, getRuntimeContext 접근.",
      flavor: "생명주기가 있는 함수.",
      visual: "rich",
      snippet: "RichMapFunction",
      detail:
        "일반 lambda map은 상태가 없다. Rich* 는 open/close, RuntimeContext(상태, 메트릭, 병렬 인덱스)를 제공한다. 외부 클라이언트는 open에서 생성, close에서 해제. 직렬화 가능한 필드만 생성자에 둘 것.",
      code: `public class Enrich extends RichMapFunction<Event, Event> {
  private transient Connection conn;
  private ValueState<Long> last;

  public void open(Configuration conf) {
    conn = connectDb();
    last = getRuntimeContext().getState(
      new ValueStateDescriptor<>("last", Long.class));
  }

  public Event map(Event e) throws Exception {
    // use conn + last
    return e;
  }

  public void close() { if (conn != null) conn.close(); }
}`,
      lang: "java",
    },
    {
      id: "API-052",
      nameEn: "FLATMAP FILTER MAP",
      nameKo: "기본 변환",
      rarity: "N",
      type: "API",
      attrs: ["API"],
      atk: "1:1 / 1:N / 0:1",
      def: "파이프라인 기초",
      effect:
        "map 변환, flatMap 0..N 출력, filter 조건 통과. 모든 잡의 기본 벽돌.",
      flavor: "가장 많이 쓰는 세 도구.",
      visual: "basicops",
      snippet: "map / flatMap / filter",
      detail:
        "filter로 노이즈 제거, map으로 파싱·프로젝션, flatMap으로 분할·옵션 출력. 체이닝되어 한 스레드에서 돌 수 있다. 무거운 파싱은 병렬도를 명시하고, 실패 레코드는 사이드 아웃으로 빼는 편이 안전하다.",
      code: `stream
  .filter(line -> !line.isBlank())
  .map(line -> parse(line))
  .flatMap((Event e, Collector<Item> out) -> {
    for (Item i : e.getItems()) out.collect(i);
  })
  .filter(item -> item.price > 0);`,
      lang: "java",
    },
    {
      id: "API-053",
      nameEn: "TYPES & SERIALIZATION",
      nameKo: "타입과 직렬화",
      rarity: "SR",
      type: "API",
      attrs: ["Types"],
      atk: "POJO/Avro",
      def: "성능·호환",
      effect:
        "TypeInformation. POJO·Tuple·Row·Avro. Kryo 폴백은 피하고 스키마를 명시.",
      flavor: "파이프 안의 포장 방식.",
      visual: "serde",
      snippet: "TypeInformation / POJO",
      detail:
        "Flink는 타입 추출로 serializer를 고른다. public 필드/게터 있는 POJO가 안전. Generic은 Kryo로 떨어져 느리고 호환이 나쁘다. 프로덕션은 Avro/Protobuf 등 스키마 기반 권장. 상태 마이그레이션에도 직렬화 선택이 영향 크다.",
      code: `// explicit type
DataStream<Event> s = env.fromSource(...)
  .returns(Event.class);

// Row / RowTypeInfo for Table interop
// Avro
DataStream<User> users = ...
  .returns(new AvroTypeInfo<>(User.class));

// avoid raw Kryo for state if possible
env.getConfig().disableGenericTypes(); // 강제 검열용`,
      lang: "java",
    },
    {
      id: "API-054",
      nameEn: "NAME & UID",
      nameKo: "네임과 UID",
      rarity: "R",
      type: "API",
      attrs: ["Ops"],
      atk: "가독성",
      def: "상태 정체성",
      effect:
        "name은 UI 표시, uid는 상태 복원 키. 프로덕션 상태 연산자는 uid 필수.",
      flavor: "이름표와 주민번호.",
      visual: "uid",
      snippet: ".name().uid()",
      detail:
        "name만 바꾸면 UI 라벨만 바뀐다. uid를 바꾸면 세이브포인트에서 상태를 못 찾는다. 리팩터 시 uid 고정 목록을 문서로 관리하고, 의도적 상태 폐기일 때만 uid를 바꾼다.",
      code: `stream
  .map(new Parse()).name("parse-json").uid("parse-v1")
  .filter(e -> e.ok).name("filter-ok").uid("filter-ok-v1")
  .keyBy(Event::getUser)
  .process(new CountFn()).name("count").uid("count-v1");`,
      lang: "java",
    },
    {
      id: "SQL-055",
      nameEn: "SQL WINDOWS",
      nameKo: "SQL 윈도우",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "Window"],
      atk: "TUMBLE/HOP/SESSION",
      def: "선언적 집계",
      effect:
        "SQL에서 TUMBLE, HOP(슬라이딩), SESSION 윈도우 집계. TVF 문법 권장.",
      flavor: "쿼리로 자르는 시간.",
      visual: "sqlwin",
      snippet: "TUMBLE / HOP / SESSION",
      detail:
        "구식 GROUP BY TUMBLE(ts, ...) 와 최신 Window TVF(테이블 값 함수) 문법이 있다. WATERMARK 정의가 선행되어야 event time 윈도우가 의미 있다. 결과 시간에 window_start/end를 함께 남긴다.",
      code: `-- Window TVF style
SELECT user_id,
       window_start, window_end,
       SUM(amount) AS total
FROM TABLE(
  TUMBLE(TABLE orders, DESCRIPTOR(ts), INTERVAL '5' MINUTES)
)
GROUP BY user_id, window_start, window_end;

-- HOP: size 10m, slide 1m
-- SESSION: gap INTERVAL '30' SECOND`,
      lang: "sql",
    },
    {
      id: "SQL-056",
      nameEn: "DYNAMIC TABLES",
      nameKo: "동적 테이블",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Table"],
      atk: "스트림=테이블",
      def: "changelog",
      effect:
        "스트림을 계속 바뀌는 테이블로 해석. 쿼리 결과는 changelog 스트림.",
      flavor: "흐르는 표.",
      visual: "dynamic",
      snippet: "stream ↔ table",
      detail:
        "Append-only 소스도 집계 쿼리를 거치면 retract/upsert changelog가 된다. 싱크 커넥터가 changelog 모드를 지원해야 한다. toChangelogStream / toDataStream 변환 시 모드를 명시한다.",
      code: `Table orders = tableEnv.from("orders");
Table sum = orders
  .groupBy($("user_id"))
  .select($("user_id"), $("amount").sum().as("total"));

// changelog stream out
DataStream<Row> changelog =
  tableEnv.toChangelogStream(sum);

// or upsert to sink via SQL
// INSERT INTO user_totals SELECT ...`,
      lang: "java",
    },
    {
      id: "SQL-057",
      nameEn: "TEMPORAL JOIN",
      nameKo: "템포럴 조인",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Join"],
      atk: "시점 조인",
      def: "버전 테이블",
      effect:
        "이벤트 시각 기준 버전드 테이블과 조인. 환율·가격 이력에 강함.",
      flavor: "그 순간의 진실.",
      visual: "temporal",
      snippet: "FOR SYSTEM_TIME AS OF",
      detail:
        "Lookup join(현재 차원 조회)과 Temporal join(이벤트 타임 시점 버전)을 구분한다. 버전 테이블은 PRIMARY KEY + 시간 속성이 필요하다. 실무 환율·요금제·상품 마스터 이력에 자주 등장한다.",
      code: `SELECT o.order_id, o.amount * r.rate AS amount_krw
FROM orders AS o
JOIN rates_history FOR SYSTEM_TIME AS OF o.ts AS r
  ON o.currency = r.currency;

-- Lookup join (JDBC/Redis dimension)
-- LEFT JOIN dim FOR SYSTEM_TIME AS OF o.proctime`,
      lang: "sql",
    },
    {
      id: "SQL-058",
      nameEn: "LOOKUP JOIN",
      nameKo: "룩업 조인",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Join"],
      atk: "차원 조회",
      def: "외부 테이블",
      effect:
        "처리 시점에 외부 JDBC/HBase 등에서 키 조회. 캐시 옵션 중요.",
      flavor: "지나며 사전을 펼친다.",
      visual: "lookup",
      snippet: "FOR SYSTEM_TIME AS OF proctime",
      detail:
        "스트림 레코드마다 외부 저장소를 치면 병목이 된다. lookup cache, async lookup, partial cache 만료를 설정한다. 차원 갱신 지연과 일관성 요구를 문서화할 것.",
      code: `CREATE TABLE dim_user (
  user_id BIGINT,
  tier STRING,
  PRIMARY KEY (user_id) NOT ENFORCED
) WITH (
  'connector' = 'jdbc',
  'url' = 'jdbc:mysql://...',
  'table-name' = 'users',
  'lookup.cache.max-rows' = '10000',
  'lookup.cache.ttl' = '10 min'
);

SELECT o.*, d.tier
FROM orders AS o
LEFT JOIN dim_user FOR SYSTEM_TIME AS OF o.proc_time AS d
  ON o.user_id = d.user_id;`,
      lang: "sql",
    },
    {
      id: "SQL-059",
      nameEn: "CDC INGEST",
      nameKo: "CDC 수집",
      rarity: "UR",
      type: "STARTER",
      attrs: ["CDC", "Connector"],
      atk: "DB 변경 스트림",
      def: "upsert 파이프",
      effect:
        "Debezium/Flink CDC로 binlog를 changelog 스트림으로. 실시간 동기화.",
      flavor: "DB가 말하는 속삭임.",
      visual: "cdc",
      snippet: "mysql-cdc / postgres-cdc",
      detail:
        "배치 덤프 대신 변경 이벤트(+I/-U/+U/-D)를 흘려 다운스트림 창고·검색·캐시를 갱신한다. PK, 워터마크, exactly-once 싱크 조합이 핵심. 스키마 변경( DDL ) 정책도 미리 정한다.",
      code: `CREATE TABLE mysql_orders (
  id BIGINT,
  user_id BIGINT,
  amount DECIMAL(10,2),
  PRIMARY KEY (id) NOT ENFORCED
) WITH (
  'connector' = 'mysql-cdc',
  'hostname' = 'localhost',
  'port' = '3306',
  'username' = 'flink',
  'password' = '...',
  'database-name' = 'shop',
  'table-name' = 'orders'
);

INSERT INTO lake_orders SELECT * FROM mysql_orders;`,
      lang: "sql",
    },
    {
      id: "OPS-060",
      nameEn: "RESTART STRATEGY",
      nameKo: "재시작 전략",
      rarity: "R",
      type: "OPS",
      attrs: ["FaultTolerance"],
      atk: "실패 후 동작",
      def: "고정/실패율",
      effect:
        "fixed-delay, failure-rate, none, exponential-delay. 잡 안정성 정책.",
      flavor: "넘어지면 몇 번 일어날지.",
      visual: "restart",
      snippet: "setRestartStrategy",
      detail:
        "스트리밍은 보통 fixed-delay 또는 failure-rate. 무한 재시도는 장애를 숨긴다. 체크포인트가 있어야 의미 있는 복구. 독성 메시지면 재시작 루프에 빠지므로 사이드아웃·폐기 정책이 필요.",
      code: `env.setRestartStrategy(
  RestartStrategies.fixedDelayRestart(
    5,                    // attempts
    Time.of(10, TimeUnit.SECONDS)
  )
);

// failure rate: 5 failures in 5 minutes, wait 30s
env.setRestartStrategy(
  RestartStrategies.failureRateRestart(
    5, Time.of(5, TimeUnit.MINUTES),
    Time.of(30, TimeUnit.SECONDS)
  )
);`,
      lang: "java",
    },
    {
      id: "OPS-061",
      nameEn: "UNALIGNED CHECKPOINT",
      nameKo: "언얼라인드 체크포인트",
      rarity: "UR",
      type: "OPS",
      attrs: ["Checkpoint"],
      atk: "배압 속 스냅샷",
      def: "장벽 타임아웃 완화",
      effect:
        "배압으로 aligned barrier가 막힐 때 버퍼 데이터까지 스냅샷에 포함.",
      flavor: "막힌 강에도 사진을.",
      visual: "unaligned",
      snippet: "enableUnalignedCheckpoints",
      detail:
        "Aligned checkpoint는 인플라이트 데이터를 비운 뒤 스냅샷해 단순하지만 배압 시 오래 걸린다. Unaligned는 채널 버퍼를 상태에 넣어 완료를 빠르게 한다. 상태 크기 증가·복구 복잡도 트레이드오프. 장시간 checkpoint 실패 알람이 있을 때 검토.",
      code: `env.enableCheckpointing(60_000);
env.getCheckpointConfig().enableUnalignedCheckpoints();
// optional: aligned timeout 후 전환
env.getCheckpointConfig()
  .setAlignedCheckpointTimeout(Duration.ofSeconds(30));`,
      lang: "java",
    },
    {
      id: "OPS-062",
      nameEn: "INCREMENTAL CP",
      nameKo: "증분 체크포인트",
      rarity: "SR",
      type: "OPS",
      attrs: ["Checkpoint", "RocksDB"],
      atk: "델타 업로드",
      def: "대형 상태",
      effect:
        "RocksDB에서 변경된 SST만 업로드. 거대 상태 잡의 필수 옵션.",
      flavor: "통째가 아니라 바뀐 페이지만.",
      visual: "incp",
      snippet: "incremental = true",
      detail:
        "풀 스냅샷마다 전체를 올리면 네트워크·스토리지가 폭발한다. RocksDB 증분 체크포인트는 변경 파일만 보낸다. 백엔드·체크포인트 스토리지(S3/HDFS) 설정과 함께 켠다. 로컬 디스크 성능도 좌우한다.",
      code: `// RocksDB + incremental
env.setStateBackend(
  new EmbeddedRocksDBStateBackend(true) // incremental
);
env.getCheckpointConfig().setCheckpointStorage(
  "s3://bucket/flink/checkpoints"
);

// flink-conf.yaml
// state.backend: rocksdb
// state.backend.incremental: true`,
      lang: "java",
    },
    {
      id: "OPS-063",
      nameEn: "MANAGED MEMORY",
      nameKo: "관리 메모리",
      rarity: "SR",
      type: "OPS",
      attrs: ["Resource"],
      atk: "RocksDB/배치",
      def: "슬롯 몫",
      effect:
        "TM 메모리 모델: framework/task/network/managed. RocksDB는 managed 사용.",
      flavor: "조각난 메모리 지도.",
      visual: "memory",
      snippet: "taskmanager.memory.*",
      detail:
        "Flink 1.10+ 통합 메모리 모델. process size를 정하면 비율로 나뉜다. RocksDB 상태·배치 소팅 등이 managed memory를 쓴다. OOM이면 task heap vs managed vs network 중 어디가 센지 메트릭으로 본다.",
      code: `# flink-conf.yaml
taskmanager.memory.process.size: 4096m
taskmanager.memory.flink.size: 3072m
# or fine tune:
# taskmanager.memory.managed.fraction: 0.4
# taskmanager.memory.network.max: 512m

# 슬롯 수 늘리면 슬롯당 managed가 줄어듦`,
      lang: "yaml",
    },
    {
      id: "OPS-064",
      nameEn: "NETWORK BUFFER",
      nameKo: "네트워크 버퍼",
      rarity: "SR",
      type: "OPS",
      attrs: ["Perf"],
      atk: "셔플 파이프",
      def: "배압 경로",
      effect:
        "크레딧 기반 흐름제어. 버퍼 부족은 처리량·배압에 직결.",
      flavor: "파이프 굵기와 물통.",
      visual: "netbuf",
      snippet: "network memory / buffers",
      detail:
        "업스트림은 다운스트림 credit만큼만 보낸다. 네트워크 세그먼트가 부족하면 셔플이 헐떡인다. 병렬도·채널 수 증가 시 네트워크 메모리를 같이 키운다. 버퍼 디블로팅 등 최신 개선도 버전별로 확인.",
      code: `# flink-conf.yaml
taskmanager.memory.network.fraction: 0.1
taskmanager.memory.network.min: 64m
taskmanager.memory.network.max: 1g

# 진단: backpressure, output queue length,
# netty buffers 메트릭`,
      lang: "yaml",
    },
    {
      id: "OPS-065",
      nameEn: "K8S DEPLOYMENT",
      nameKo: "쿠버네티스 배포",
      rarity: "R",
      type: "OPS",
      attrs: ["Deploy"],
      atk: "Application mode",
      def: "Operator",
      effect:
        "Native K8s / Flink Kubernetes Operator. 앱 모드 배포가 주류.",
      flavor: "클러스터 위의 전용 함대.",
      visual: "k8s",
      snippet: "flink run-application -t kubernetes",
      detail:
        "Session 클러스터 공유도 가능하지만 운영 격리는 Application/Operator CRD가 편하다. 체크포인트 PVC/S3, HA configmap/ZK, 리소스 request/limit, 이미지 버전 고정이 필수 체크리스트.",
      code: `# concept
flink run-application -t kubernetes \\
  -Dkubernetes.cluster-id=my-job \\
  -Dkubernetes.container.image=my-flink:1.19 \\
  -c com.example.Job \\
  local:///opt/flink/usrlib/job.jar

# FlinkOperator: FlinkDeployment CR
# spec.job.jarURI / parallelism / state backend`,
      lang: "bash",
    },
    {
      id: "OPS-066",
      nameEn: "FLINK CLI",
      nameKo: "Flink CLI",
      rarity: "N",
      type: "OPS",
      attrs: ["Ops"],
      atk: "제출·취소",
      def: "세이브포인트",
      effect:
        "run, list, cancel, savepoint, stop. 운영 기본 리모콘.",
      flavor: "터미널 속 관제탑.",
      visual: "cli",
      snippet: "flink run | savepoint | cancel",
      detail:
        "배포 파이프라인에서 CLI 또는 REST를 쓴다. stop with savepoint로 우아한 종료. -s 로 세이브포인트에서 재개. 잡 ID는 list/WebUI에서 확인.",
      code: `./bin/flink run -d -c com.example.Job app.jar
./bin/flink list
./bin/flink savepoint <jobId> s3://sp/
./bin/flink stop -p s3://sp/ <jobId>
./bin/flink cancel <jobId>
./bin/flink run -s s3://sp/savepoint-xxx -c com.example.Job app.jar`,
      lang: "bash",
    },
    {
      id: "OPS-067",
      nameEn: "REST API",
      nameKo: "REST API",
      rarity: "R",
      type: "OPS",
      attrs: ["Ops"],
      atk: "자동화",
      def: "관측·제어",
      effect:
        "잡 제출, 상태 조회, 메트릭, 세이브포인트 트리거를 HTTP로.",
      flavor: "UI 뒤에 있는 진짜 손.",
      visual: "rest",
      snippet: "/v1/jobs",
      detail:
        "CI/CD·오토픽스가 REST를 친다. JobManager REST 포트 보호(인증·네트워크 정책) 필수. 공식 OpenAPI/문서로 엔드포인트를 확인한다.",
      code: `# examples
curl http://jm:8081/v1/jobs
curl http://jm:8081/v1/jobs/<jobId>
curl -X POST http://jm:8081/v1/jobs/<jobId>/savepoints \\
  -d '{"cancel-job": false}'

# upload jar + run via /jars/* endpoints`,
      lang: "bash",
    },
    {
      id: "OPS-068",
      nameEn: "WATERMARK ALIGNMENT",
      nameKo: "워터마크 정렬",
      rarity: "UR",
      type: "OPS",
      attrs: ["Time"],
      atk: "소스 간 균형",
      def: "빠른 소스 대기",
      effect:
        "너무 앞선 소스 파티션을 멈춰 느린 쪽과 워터마크 격차를 제한.",
      flavor: "빠른 주자를 잠시 붙잡기.",
      visual: "wmalign",
      snippet: "withWatermarkAlignment",
      detail:
        "일부 파티션만 폭주하면 전역 WM은 느린 쪽에 묶이지만, 빠른 쪽은 상태를 과하게 쌓을 수 있다. alignment로 max drift를 제한한다. 지연 vs 상태 크기 트레이드오프.",
      code: `WatermarkStrategy
  .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
  .withWatermarkAlignment(
    "orders-group",
    Duration.ofSeconds(30),  // max drift
    Duration.ofSeconds(5)    // update interval
  )
  .withTimestampAssigner((e, t) -> e.ts);`,
      lang: "java",
    },
    {
      id: "OPS-069",
      nameEn: "HOT KEYS",
      nameKo: "핫 키",
      rarity: "SR",
      type: "OPS",
      attrs: ["Perf"],
      atk: "치우침",
      def: "병목 서브태스크",
      effect:
        "소수 키에 트래픽 집중. 한 서브태스크만 과열. 살트·2단계 집계로 완화.",
      flavor: "인기남의 창구 줄.",
      visual: "hotkey",
      snippet: "key salt / local agg",
      detail:
        "keyBy 후 특정 키(대형 고객·바이럴 아이템)가 한 파티션을 녹인다. 사전 로컬 집계, 키에 랜덤 접미사 후 재집계, 규칙 기반 분리 파이프라인이 해법. 메트릭으로 per-subtask records를 본다.",
      code: `// two-phase aggregation
stream
  .keyBy(e -> e.itemId + "#" + (ThreadLocalRandom.current().nextInt(8)))
  .window(TumblingEventTimeWindows.of(Time.minutes(1)))
  .sum("cnt")
  .keyBy(e -> e.itemId.split("#")[0])
  .window(TumblingEventTimeWindows.of(Time.minutes(1)))
  .sum("cnt");`,
      lang: "java",
    },
    {
      id: "OPS-070",
      nameEn: "END-TO-END EXACTLY ONCE",
      nameKo: "종단 정확히 한 번",
      rarity: "LR",
      type: "OPS",
      attrs: ["Semantics"],
      atk: "싱크 트랜잭션",
      def: "외부 일관성",
      effect:
        "내부 상태 EO + 트랜잭션 싱크(Kafka 등) + 체크포인트 완료 커밋.",
      flavor: "끝까지 한 줄 장부.",
      visual: "e2e",
      snippet: "TwoPhaseCommitSink / Kafka TX",
      detail:
        "Flink 상태 EO만으로 외부 DB 중복 insert가 사라지진 않는다. 싱크가 체크포인트 완료 시 커밋하는 2PC 프로토콜을 구현해야 한다. Kafka transactional sink가 대표. JDBC는 upsert idemp키로 타협하기도 한다.",
      code: `KafkaSink<String> sink = KafkaSink.<String>builder()
  .setBootstrapServers("broker:9092")
  .setRecordSerializer(
    KafkaRecordSerializationSchema.builder()
      .setTopic("out")
      .setValueSerializationSchema(new SimpleStringSchema())
      .build())
  .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
  .setTransactionalIdPrefix("flink-e2e-")
  .build();

env.enableCheckpointing(10_000);
stream.sinkTo(sink);`,
      lang: "java",
    },
    {
      id: "STARTER-071",
      nameEn: "LOCAL DEV",
      nameKo: "로컬 개발",
      rarity: "N",
      type: "STARTER",
      attrs: ["Dev"],
      atk: "빠른 피드백",
      def: "MiniCluster",
      effect:
        "IDE에서 getExecutionEnvironment. 테스트는 MiniCluster / test harness.",
      flavor: "책상 위 미니 클러스터.",
      visual: "local",
      snippet: "env.execute / MiniCluster",
      detail:
        "로컬은 병렬도를 낮추고 프린트 싱크로 확인. 단위 테스트는 KeyedOneInputStreamOperatorTestHarness 또는 flink-test-utils MiniCluster. 프로덕션 conf와 로컬 conf 차이를 의식한다.",
      code: `StreamExecutionEnvironment env =
  StreamExecutionEnvironment.getExecutionEnvironment();
env.setParallelism(2);
env.setRuntimeMode(RuntimeExecutionMode.STREAMING);

// JUnit: MiniClusterWithClientResource (test-utils)
// operator test harness for ProcessFunction unit tests`,
      lang: "java",
    },
    {
      id: "STARTER-072",
      nameEn: "RUNTIME MODE",
      nameKo: "런타임 모드",
      rarity: "R",
      type: "STARTER",
      attrs: ["Batch", "Stream"],
      atk: "STREAMING/BATCH",
      def: "AUTOMATIC",
      effect:
        "같은 API로 배치·스트리밍 실행 모드 전환. 유한 소스면 배치 최적화 가능.",
      flavor: "스위치 하나로 배치 느낌.",
      visual: "rtmode",
      snippet: "RuntimeExecutionMode",
      detail:
        "BATCH 모드는 스케줄·셔플·회복 전략이 배치에 맞게 바뀐다. 유한 소스+배치 모드로 효율적 ETL. 스트리밍 소스는 STREAMING. AUTOMATIC은 소스 유계 여부로 추정.",
      code: `env.setRuntimeMode(RuntimeExecutionMode.BATCH);
// or STREAMING / AUTOMATIC

// SQL
// SET 'execution.runtime-mode' = 'batch';`,
      lang: "java",
    },
    {
      id: "STARTER-073",
      nameEn: "PYFLINK",
      nameKo: "PyFlink",
      rarity: "R",
      type: "STARTER",
      attrs: ["Python"],
      atk: "파이썬 API",
      def: "Table/DataStream",
      effect:
        "Python으로 Table/DataStream 작성. UDF는 프로세스 간 통신 비용 주의.",
      flavor: "뱀 혀로 쓰는 플링크.",
      visual: "pyflink",
      snippet: "StreamExecutionEnvironment",
      detail:
        "데이터 엔지니어가 SQL/Table 위주로 쓰기 좋다. 대량 Python UDF는 직렬화· GIL 유사 비용이 커질 수 있어 Java/Scala UDF나 SQL 내장 함수를 우선한다.",
      code: `from pyflink.datastream import StreamExecutionEnvironment
from pyflink.table import StreamTableEnvironment

env = StreamExecutionEnvironment.get_execution_environment()
t_env = StreamTableEnvironment.create(env)

t_env.execute_sql("""
  CREATE TABLE orders (...) WITH (...)
""")
t_env.execute_sql("""
  INSERT INTO out SELECT user_id, SUM(amount)
  FROM orders GROUP BY user_id
""")`,
      lang: "python",
    },
    {
      id: "CORE-074",
      nameEn: "WATERMARK STRATEGY API",
      nameKo: "워터마크 API",
      rarity: "R",
      type: "CORE",
      attrs: ["Time"],
      atk: "할당+생성",
      def: "소스에서",
      effect:
        "TimestampAssigner + WatermarkGenerator. forMonotonous / forBoundedOutOfOrderness.",
      flavor: "시간 찍고 파도 그리기.",
      visual: "wmstrategy",
      snippet: "WatermarkStrategy.*",
      detail:
        "모노토닉: 지연 거의 없을 때. Bounded out-of-orderness: 최대 지연 추정. 커스텀 Generator로 특수 규칙. 소스에 붙이는 것이 현대 API. 연산자 중간 assignTimestamps 패턴은 레거시.",
      code: `WatermarkStrategy<Event> ws = WatermarkStrategy
  .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(3))
  .withTimestampAssigner((e, recordTs) -> e.getTs())
  .withIdleness(Duration.ofSeconds(30));

env.fromSource(source, ws, "src");

// monotonous timestamps
// WatermarkStrategy.forMonotonousTimestamps()`,
      lang: "java",
    },
    {
      id: "CORE-075",
      nameEn: "SIDE OUTPUTS DEEP",
      nameKo: "사이드아웃 활용",
      rarity: "R",
      type: "CORE",
      attrs: ["Stream"],
      atk: "독 메시지",
      def: "분기 파이프",
      effect:
        "파싱 실패·규칙 위반·late 를 본선에서 분리. DLQ 토픽으로.",
      flavor: "불량품 레인.",
      visual: "side",
      snippet: "OutputTag + ctx.output",
      detail:
        "메인 경로 SLA를 守り 예외 경로는 별도 알림·재처리. ProcessFunction에서 태그별로 output. 타입 안전 OutputTag 익명 서브클래스 관용구를 쓴다.",
      code: `OutputTag<String> bad =
  new OutputTag<>("bad-json"){};

SingleOutputStreamOperator<Event> parsed = lines.process(
  new ProcessFunction<String, Event>() {
    public void processElement(String v, Context ctx, Collector<Event> out) {
      try { out.collect(parse(v)); }
      catch (Exception e) { ctx.output(bad, v); }
    }
  });

parsed.getSideOutput(bad).sinkTo(dlqSink);
parsed.sinkTo(mainSink);`,
      lang: "java",
    },
    {
      id: "CORE-076",
      nameEn: "INTERVAL JOIN DEEP",
      nameKo: "인터벌 조인 상세",
      rarity: "SR",
      type: "CORE",
      attrs: ["Join"],
      atk: "시간 범위 조인",
      def: "상태 상한",
      effect:
        "between(lower, upper)로 상대 시간 창. 키가 같고 시간이 창 안.",
      flavor: "서로의 시간 이웃.",
      visual: "join",
      snippet: "intervalJoin.between",
      detail:
        "무제한 조인 상태를 피하려고 시간 bound가 필수다. 양쪽 워터마크가 진행해야 상태가 정리된다. 비대칭 창(예: 결제 -5m ~ +1h) 비즈니스 규칙을 그대로 코드로 옮긴다.",
      code: `left.keyBy(L::getKey)
  .intervalJoin(right.keyBy(R::getKey))
  .between(Time.minutes(-5), Time.hours(1))
  .process(new ProcessJoinFunction<L, R, Out>() {
    public void processElement(L l, R r, Context ctx, Collector<Out> out) {
      out.collect(match(l, r));
    }
  });`,
      lang: "java",
    },
    {
      id: "ARCH-077",
      nameEn: "JOBGRAPH & TASK",
      nameKo: "잡그래프와 태스크",
      rarity: "R",
      type: "ARCH",
      attrs: ["Runtime"],
      atk: "논리→물리",
      def: "체인 단위 실행",
      effect:
        "논리 그래프가 체이닝 후 Task로 스케줄. 슬롯에 배치.",
      flavor: "설계도에서 작업 지시서로.",
      visual: "jobgraph",
      snippet: "StreamGraph → JobGraph → Tasks",
      detail:
        "사용자 API → StreamGraph → 최적화/체이닝 → JobGraph → 스케줄러가 ExecutionGraph/Task 배포. UI에서 보는 박스가 대략 이 계층을 반영한다. 병렬도는 vertex별 서브태스크 수.",
      code: `// mental model
// DataStream API
//   -> StreamGraph (operators)
//   -> JobGraph (job vertices, chained)
//   -> ExecutionGraph (parallel subtasks)
//   -> physical Tasks on TaskManagers`,
      lang: "text",
    },
    {
      id: "ARCH-078",
      nameEn: "SLOT SHARING GROUP",
      nameKo: "슬롯 셰어링 그룹",
      rarity: "SR",
      type: "ARCH",
      attrs: ["Resource"],
      atk: "배치 격리",
      def: "자원 그룹",
      effect:
        "기본은 같은 그룹으로 파이프라인 공유. 그룹을 나누면 슬롯 격리.",
      flavor: "같은 방 / 다른 방.",
      visual: "ssg",
      snippet: "slotSharingGroup(name)",
      detail:
        "CPU 헤비 연산과 소스를 분리하거나, 메모리 헤비 단계를 격리할 때 그룹을 나눈다. 그룹을 늘리면 필요 슬롯 수가 증가한다. 기본 공유가 자원 효율에 유리한 경우가 많다.",
      code: `stream
  .map(new Light()).slotSharingGroup("default")
  .keyBy(...)
  .process(new Heavy()).slotSharingGroup("heavy")
  .map(new Light2()).slotSharingGroup("default");`,
      lang: "java",
    },
    {
      id: "ARCH-079",
      nameEn: "MAX PARALLELISM",
      nameKo: "최대 병렬도",
      rarity: "SR",
      type: "ARCH",
      attrs: ["State"],
      atk: "키 그룹",
      def: "리스케일 한계",
      effect:
        "maxParallelism이 키 그룹 수 상한. 세이브포인트 후 스케일 범위 결정.",
      flavor: "키 세계의 지도 축척.",
      visual: "maxp",
      snippet: "setMaxParallelism",
      detail:
        "실제 parallelism ≤ maxParallelism. 키 그룹 라우팅에 쓰이므로 나중에 크게 스케일하려면 초기에 maxParallelism을 여유 있게(예: 1024+) 잡는다. 너무 크면 오버헤드. 운영 중 변경은 제한적.",
      code: `env.setMaxParallelism(1024);
env.setParallelism(32);

// operator level
stream.keyBy(...).process(...).setParallelism(64);
// still <= maxParallelism`,
      lang: "java",
    },
    {
      id: "OPS-080",
      nameEn: "SAVEPOINT STOP",
      nameKo: "스톱 위드 세이브",
      rarity: "R",
      type: "OPS",
      attrs: ["Ops"],
      atk: "우아한 종료",
      def: "재개 가능",
      effect:
        "stop -p 로 세이브포인트 후 종료. 배포 교체 표준 절차.",
      flavor: "저장하고 로그아웃.",
      visual: "savepoint",
      snippet: "flink stop -p",
      detail:
        "cancel은 세이브 없이 끊을 수 있다. 업그레이드는 stop with savepoint → 새 잡 run -s. drain 옵션은 소스 종료 후 파이프 비우기에 가깝다(버전/모드 확인).",
      code: `./bin/flink stop -p s3://bucket/sp/ <jobId>
./bin/flink run -s s3://bucket/sp/savepoint-xxx \\
  -d -c com.example.Job new.jar

# REST: POST /jobs/:id/stop with drain/savepoint params`,
      lang: "bash",
    },
    {
      id: "OPS-081",
      nameEn: "CHECKPOINT VS SP",
      nameKo: "CP vs SP 비교",
      rarity: "R",
      type: "OPS",
      attrs: ["State"],
      atk: "자동 vs 수동",
      def: "수명·용도",
      effect:
        "Checkpoint=자동 복구, 짧은 수명. Savepoint=운영자 트리거, 장기 보관·이주.",
      flavor: "자동 저장 / 수동 세이브.",
      visual: "cpsp",
      snippet: "recovery vs ops",
      detail:
        "둘 다 일관 스냅샷 계열이지만 포맷·메타·보존 정책이 다르다. SP는 버전 업·블루그린, CP는 장애 복구. 프로덕션은 둘 다 스토리지 내구성과 권한 관리 필요.",
      code: `// Checkpoint: env.enableCheckpointing(...)
//   automatic, retain config optional

// Savepoint: flink savepoint / stop -p
//   operator-triggered, portable ops artifact

// NEVER delete checkpoint storage blindly
// while jobs are running`,
      lang: "text",
    },
    {
      id: "OPS-082",
      nameEn: "ROCKSDB TUNING",
      nameKo: "RocksDB 튜닝",
      rarity: "UR",
      type: "OPS",
      attrs: ["State", "Perf"],
      atk: "블록 캐시",
      def: "쓰기 버퍼",
      effect:
        "블록 캐시·라이트버퍼·디렉터리 로컬 SSD. 거대 상태 잡 성능 핵심.",
      flavor: "상태 엔진 오일 교환.",
      visual: "rocks",
      snippet: "rocksdb options",
      detail:
        "managed memory에 RocksDB를 맡기는 설정이 기본 추세. 로컬 SSD 경로, 백그라운드 컴팩션, bloom filter 등이 latency에 영향. 튜닝 전 메트릭(state size, cp duration, rocksdb*)을 본다.",
      code: `# flink-conf.yaml (conceptual)
state.backend: rocksdb
state.backend.incremental: true
state.backend.rocksdb.memory.managed: true
state.backend.rocksdb.localdir: /data/flink/rocksdb

# watch: checkpoint duration, state size,
# rocksdb block cache hit ratio`,
      lang: "yaml",
    },
    {
      id: "SQL-083",
      nameEn: "SQL CONNECTORS",
      nameKo: "SQL 커넥터",
      rarity: "N",
      type: "STARTER",
      attrs: ["SQL", "Connector"],
      atk: "WITH 옵션",
      def: "소스/싱크",
      effect:
        "CREATE TABLE ... WITH (connector=...). Kafka, filesystem, jdbc, upsert-kafka 등.",
      flavor: "표 정의가 곧 연결.",
      visual: "sqlconn",
      snippet: "'connector' = 'kafka'",
      detail:
        "포맷(json/avro/csv), 스캔 모드, PK, 워터마크 DDL을 한곳에 모은다. 싱크는 모드(append/upsert)와 PK가 맞아야 한다. 커넥터 버전과 Flink 버전 호환표를 확인.",
      code: `CREATE TABLE topic_out (
  user_id BIGINT,
  total DECIMAL(12,2),
  PRIMARY KEY (user_id) NOT ENFORCED
) WITH (
  'connector' = 'upsert-kafka',
  'topic' = 'user-total',
  'properties.bootstrap.servers' = 'b:9092',
  'key.format' = 'json',
  'value.format' = 'json'
);`,
      lang: "sql",
    },
    {
      id: "SQL-084",
      nameEn: "UPSERT KAFKA",
      nameKo: "업서트 카프카",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Kafka"],
      atk: "changelog 싱크",
      def: "PK 컴팩션",
      effect:
        "업데이트/삭제를 Kafka 로그 컴팩션 토픽으로. 집계 결과 외부화.",
      flavor: "마지막 값만 남는 토픽.",
      visual: "upsertk",
      snippet: "upsert-kafka",
      detail:
        "append-only kafka sink는 retract를 표현하기 어렵다. upsert-kafka는 키 기준 최신 값. 토픽 cleanup.policy=compact 필요. 다운스트림도 키 의미를 이해해야 한다.",
      code: `-- source changelog -> upsert sink
INSERT INTO user_total_upsert
SELECT user_id, SUM(amount) AS total
FROM orders
GROUP BY user_id;`,
      lang: "sql",
    },
    {
      id: "CORE-085",
      nameEn: "LATE FIRE SEMANTICS",
      nameKo: "늦은 방출 의미",
      rarity: "UR",
      type: "CORE",
      attrs: ["Window", "Time"],
      atk: "다중 결과",
      def: "정정 이벤트",
      effect:
        "allowedLateness 중 재계산은 같은 윈도우에 여러 결과를 보낼 수 있음.",
      flavor: "수정본이 따라온다.",
      visual: "latefire",
      snippet: "retraction / updates",
      detail:
        "다운스트림이 append-only면 중복 합산 위험. upsert 싱크·버전 필드·최종 확정 지연(대기) 중 선택. Table/SQL retract 스트림이 이 문제를 명시적으로 다룬다.",
      code: `// DataStream: late updates re-emit aggregate
// Downstream choices:
// 1) idempotent upsert by (key, window_end)
// 2) wait longer watermark (less late)
// 3) side output late and handle manually

.window(...)
.allowedLateness(Time.minutes(2))
.aggregate(agg);`,
      lang: "java",
    },
    {
      id: "OPS-086",
      nameEn: "SAVEPOINTS PORTABILITY",
      nameKo: "세이브포인트 이식",
      rarity: "SR",
      type: "OPS",
      attrs: ["Ops"],
      atk: "스키마 진화",
      def: "토폴로지 변경",
      effect:
        "uid 매칭, 시리얼라이저 호환, 허용되는 그래프 변경 범위 안에서만 안전.",
      flavor: "이삿짐 라벨 붙이기.",
      visual: "portability",
      snippet: "uid + serializer compat",
      detail:
        "연산자 추가/제거/병렬도 변경 가능 범위가 있다. 상태 타입 변경은 TypeSerializer 스냅샷 호환 규칙을 따른다. 큰 변경은 상태 폐기 또는 재처리(replay)가 더 싸기도 수 있다.",
      code: `// checklist before upgrade
// 1) all stateful ops have stable uid
// 2) POJO/Avro schema backward compatible
// 3) try restore on staging with production SP copy
// 4) plan rollback SP
// 5) document dropped operators (state discarded)`,
      lang: "text",
    },
    {
      id: "OPS-087",
      nameEn: "SOURCE WATERMARKS",
      nameKo: "소스 워터마크",
      rarity: "R",
      type: "OPS",
      attrs: ["Time", "Source"],
      atk: "파티션 WM",
      def: "유휴·정렬",
      effect:
        "Kafka 파티션별 타임스탬프. 빈 파티션 idleness, 정렬, 타임스탬프 추출.",
      flavor: "샘에서부터 시계를.",
      visual: "srcwm",
      snippet: "fromSource(..., wm, name)",
      detail:
        "현대 Flink는 소스에서 WatermarkStrategy를 붙인다. 파티션 타임스탬프 추출기가 잘못되면 전체가 틀린다. 프로듀서 시계 스큐·이벤트 지연 SLA를 전략 파라미터에 반영.",
      code: `KafkaSource<Event> source = KafkaSource.<Event>builder()
  .setTopics("events")
  .setValueOnlyDeserializer(new EventSerde())
  .build();

env.fromSource(
  source,
  WatermarkStrategy
    .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(10))
    .withIdleness(Duration.ofMinutes(1))
    .withTimestampAssigner((e, t) -> e.ts),
  "kafka"
);`,
      lang: "java",
    },
    {
      id: "STARTER-088",
      nameEn: "FILE SOURCE SINK",
      nameKo: "파일 소스/싱크",
      rarity: "N",
      type: "STARTER",
      attrs: ["Connector"],
      atk: "배치 경계",
      def: "컴팩트 파일",
      effect:
        "FileSource/FileSink. 스트리밍은 버킷·롤링 정책, 배치는 유한 읽기.",
      flavor: "폴더가 곧 토픽.",
      visual: "files",
      snippet: "FileSource / FileSink",
      detail:
        "스트리밍 파일 싱크는 part file 롤링(크기·시간)·버킷(날짜). exactly-once는 커밋 전 pending 파일 rename 패턴. 소형 파일 문제는 컴팩션/롤링 튜닝.",
      code: `FileSink<String> sink = FileSink
  .forRowFormat(new Path("s3://bucket/out"),
    new SimpleStringEncoder<String>("UTF-8"))
  .withRollingPolicy(
    DefaultRollingPolicy.builder()
      .withMaxPartSize(MemorySize.ofMebiBytes(128))
      .withRolloverInterval(Duration.ofMinutes(10))
      .build())
  .build();

stream.sinkTo(sink);`,
      lang: "java",
    },
    {
      id: "OPS-089",
      nameEn: "OBSERVABILITY SET",
      nameKo: "관측 세트",
      rarity: "R",
      type: "OPS",
      attrs: ["Observability"],
      atk: "5대 신호",
      def: "알람",
      effect:
        "lag, throughput, checkpoint fail, backpressure, watermark stall.",
      flavor: "다섯 개의 계기판.",
      visual: "obs",
      snippet: "5 golden signals",
      detail:
        "이 다섯이 안정되면 대부분 잡을 버틸 수 있다. Kafka consumer lag, records/s, last checkpoint duration/failure, backpressure level, current watermark vs wall clock. 대시보드·페이지 알람을 미리 달고 배포한다.",
      code: `# alert ideas
# - checkpoint failure streak > N
# - watermark delay > SLA
# - busy time backpressure HIGH > 5m
# - in records dropped / restart count
# - JM/TM CPU memory saturation

// custom counter
getRuntimeContext().getMetricGroup()
  .counter("parse_errors").inc();`,
      lang: "text",
    },
    {
      id: "CORE-090",
      nameEn: "EXACTLY ONCE RECAP",
      nameKo: "정확히 한 번 총정리",
      rarity: "LR",
      type: "CORE",
      attrs: ["Boss", "Semantics"],
      atk: "상태+재생",
      def: "외부 2PC",
      effect:
        "내부: checkpoint barrier 정렬. 외부: transactional sink. 요구 수준을 명시.",
      flavor: "최종 보스 복습.",
      visual: "exactly",
      snippet: "state EO + sink EO",
      detail:
        "용어를 혼동하지 말 것. at-least-once는 중복 가능. exactly-once state는 장애 후 상태 일관성. end-to-end는 외부 시스템까지. 비즈니스가 멱등하면 at-least+멱등 싱크가 더 단순할 수 있다. 선택지를 문서에 박아라.",
      code: `// Level 1: at-least-once processing
// Level 2: exactly-once state (checkpoint EXACTLY_ONCE)
// Level 3: end-to-end (Kafka TX / 2PC sink)

env.enableCheckpointing(10_000);
env.getCheckpointConfig()
  .setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);
// + transactional sink configuration`,
      lang: "java",
    },
  ];

  window.FLINK_CARDS = (window.FLINK_CARDS || []).concat(extra);
})();
