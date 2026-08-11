/** Specialist mix: SQL/Table planner + Kafka/CDC/Lakehouse + troubleshooting (80+) */
(function () {
  const cards = [
    // ===== SQL / Table planner & tuning =====
    {
      id: "SQL-141",
      nameEn: "TABLE PLANNER BASICS",
      nameKo: "테이블 플래너 기초",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "Planner"],
      atk: "논리→물리",
      def: "최적화 패스",
      effect: "SQL/Table은 논리 플랜 최적화 후 물리 실행 노드(StreamExec*)로 변환된다.",
      flavor: "쿼리가 로봇 팔로 조립되기 전.",
      visual: "planner",
      snippet: "parse → optimize → translate",
      detail:
        "파싱·검증 후 논리 계획(Logical) 최적화(필터 푸시다운, 프로젝션 정리 등), 이어서 스트리밍/배치 물리 계획으로 번역된다. 성능 이슈는 대부분 물리 플랜의 exchange·agg·join 형태를 보면 실마리가 나온다. EXPLAIN이 첫 도구다.",
      code: `-- always start here
EXPLAIN ESTIMATED_COST, CHANGELOG_MODE
SELECT user_id, SUM(amount) FROM orders GROUP BY user_id;

-- mental stages
-- SQL string -> validated relational tree
-- -> optimized logical plan
-- -> physical streaming/batch plan
-- -> DataStream/operators`,
      lang: "sql",
    },
    {
      id: "SQL-142",
      nameEn: "FILTER PUSHDOWN",
      nameKo: "필터 푸시다운",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "Opt"],
      atk: "조기 가지치기",
      def: "셔플 전 감소",
      effect: "WHERE를 소스·스캔 가까이로 내려 네트워크·상태 부담을 줄인다.",
      flavor: "무거운 짐 싸기 전에 버리기.",
      visual: "pushdown",
      snippet: "predicate pushdown",
      detail:
        "커넥터·포맷이 지원하면 파티션/필터를 소스에서 적용한다. 지원 못 하면 소스 직후 calc로라도 최대한 일찍. 조인 전에 필터를 못 내리면 상태 폭증. EXPLAIN에서 filter 위치를 확인.",
      code: `-- good: selective filter early
SELECT * FROM orders
WHERE status = 'PAID' AND dt = '2026-08-01';

-- connector options may enable partition prune
-- 'scan.partition.include' / filesystem partition keys`,
      lang: "sql",
    },
    {
      id: "SQL-143",
      nameEn: "PROJECTION PUSHDOWN",
      nameKo: "프로젝션 푸시다운",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "Opt"],
      atk: "컬럼 가지치기",
      def: "I/O 감소",
      effect: "SELECT에 필요한 컬럼만 읽어 직렬화·네트워크 비용을 줄인다.",
      flavor: "표 전체 말고 필요한 칸만.",
      visual: "proj",
      snippet: "column pruning",
      detail:
        "와이드 JSON을 SELECT * 하면 CPU/네트워크가 먼저 죽는다. 컬럼너 포맷(Parquet/ORC/Iceberg)에서 특히 효과가 크다. 중간 뷰도 필요한 컬럼만 노출.",
      code: `-- avoid
SELECT * FROM wide_events;

-- prefer
SELECT user_id, event_type, ts FROM wide_events
WHERE event_type = 'click';`,
      lang: "sql",
    },
    {
      id: "SQL-144",
      nameEn: "STREAM EXEC EXCHANGE",
      nameKo: "스트림 익스체인지",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Shuffle"],
      atk: "키 셔플",
      def: "네트워크 비용",
      effect: "GROUP BY/JOIN 키 변경 시 exchange(해시 분배)가 삽입된다. 플랜의 세금.",
      flavor: "쿼리 속 숨은 물류비.",
      visual: "exchange2",
      snippet: "StreamExecExchange",
      detail:
        "같은 키로 이어지는 연산은 exchange를 줄일 수 있다. 불필요한 distinct 키, 과도한 join 재분배는 처리량을 깎는다. EXPLAIN JSON에서 exchange 개수를 세어라.",
      code: `EXPLAIN JSON_EXECUTION_PLAN
SELECT a.user_id, SUM(b.amount)
FROM a JOIN b ON a.user_id = b.user_id
GROUP BY a.user_id;

-- count hash exchanges; each is a network shuffle`,
      lang: "sql",
    },
    {
      id: "SQL-145",
      nameEn: "IDLE STATE RETENTION",
      nameKo: "유휴 상태 보존",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "State"],
      atk: "SQL 상태 TTL",
      def: "무한 키 방어",
      effect: "table.exec.state.ttl 로 집계/조인 상태 유휴 만료. 스트리밍 SQL 필수 설정.",
      flavor: "SQL도 잊을 줄 알아야 한다.",
      visual: "sqltll",
      snippet: "table.exec.state.ttl",
      detail:
        "DataStream State TTL과 별개로 Table/SQL 상태 수명 설정이 있다. 너무 짧으면 결과 정확도 훼손, 너무 길면 RocksDB 폭발. 비즈니스 세션 길이와 맞춰라. 조인 상태와 집계 상태를 구분해 생각.",
      code: `SET 'table.exec.state.ttl' = '1 d';
-- older keys in group by / regular join may expire

-- verify state size metrics after change
-- pair with mini-batch for high QPS agg`,
      lang: "sql",
    },
    {
      id: "SQL-146",
      nameEn: "MINIBATCH DEEP",
      nameKo: "미니배치 심화",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Perf"],
      atk: "지연 교환 처리량",
      def: "allow-latency",
      effect: "allow-latency와 size가 방출 주기·상태 접근 횟수를 결정. SLA와 함께 튜닝.",
      flavor: "모을수록 빠르고, 늦다.",
      visual: "minibatch",
      snippet: "mini-batch latency/size",
      detail:
        "latency를 키우면 처리량↑ 지연↑. size는 상한 버퍼. 너무 크면 체크포인트/메모리 스파이크. 집계 외 일부 연산에만 의미. 켠 뒤 워터마크·결과 freshness 모니터링.",
      code: `SET 'table.exec.mini-batch.enabled' = 'true';
SET 'table.exec.mini-batch.allow-latency' = '1 s';
SET 'table.exec.mini-batch.size' = '2000';

-- tune with:
-- - output freshness SLA
-- - rocksdb write QPS
-- - checkpoint duration`,
      lang: "sql",
    },
    {
      id: "SQL-147",
      nameEn: "TWO PHASE AGG PLAN",
      nameKo: "2단계 집계 플랜",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Opt"],
      atk: "local+global",
      def: "핫 키 완화",
      effect: "부분 집계 후 최종 집계. 네트워크 바이트와 핫 키 부하를 줄인다.",
      flavor: "조별 합 → 전체 합.",
      visual: "localglobal",
      snippet: "TWO_PHASE agg",
      detail:
        "1-phase는 모든 raw를 키 소유 태스크로 보낸다. 2-phase는 업스트림에서 줄여 보낸다. distinct count 등은 특수 분해. EXPLAIN으로 local/global 노드 확인.",
      code: `SET 'table.optimizer.agg-phase-strategy' = 'TWO_PHASE';

EXPLAIN SELECT item_id, COUNT(*) cnt
FROM clicks GROUP BY item_id;

-- expect partial aggregation before exchange`,
      lang: "sql",
    },
    {
      id: "SQL-148",
      nameEn: "DISTINCT AGG SPLIT",
      nameKo: "디스팅트 집계 분해",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Opt"],
      atk: "COUNT DISTINCT",
      def: "고비용 분해",
      effect: "COUNT(DISTINCT)는 상태·CPU 폭탄. 플래너 split 최적화나 근사 알고리즘 검토.",
      flavor: "유니크 세는 일의 세금.",
      visual: "distinct",
      snippet: "split distinct aggregation",
      detail:
        "정확한 distinct는 키×유니크 집합 상태를 만든다. 설정으로 multi-distinct를 분해하거나, 하이퍼로그로그 등 근사를 제품이 허용하면 교체. 사전 필터·윈도우 범위로 카디널리티를 줄여라.",
      code: `-- expensive
SELECT camp_id, COUNT(DISTINCT user_id) FROM hits GROUP BY camp_id;

-- mitigations:
-- - narrower time window
-- - filter bots early
-- - approximate functions if allowed
-- - enable distinct split optimizer flags (version docs)`,
      lang: "sql",
    },
    {
      id: "SQL-149",
      nameEn: "SQL HINTS",
      nameKo: "SQL 힌트",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Opt"],
      atk: "플랜 개입",
      def: "조인 전략",
      effect: "/*+ ... */ 힌트로 조인 타입·브로드캐스트 등을 유도(버전별 지원).",
      flavor: "플래너에게 쪽지 남기기.",
      visual: "hint",
      snippet: "/*+ BROADCAST(d) */",
      detail:
        "통계가 없을 때 차원 테이블 브로드캐스트 조인 등을 강제. 힌트 남용은 버전 업 시 깨지기 쉽다. 힌트 전후 EXPLAIN을 저장해 리뷰.",
      code: `SELECT /*+ BROADCAST(dim) */ o.*, dim.tier
FROM orders o
JOIN dim_users FOR SYSTEM_TIME AS OF o.proctime AS dim
  ON o.user_id = dim.user_id;

-- verify plan changed; document why hint exists`,
      lang: "sql",
    },
    {
      id: "SQL-150",
      nameEn: "LOOKUP CACHE TUNING",
      nameKo: "룩업 캐시 튜닝",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Join"],
      atk: "히트율",
      def: "외부 부하",
      effect: "lookup.cache.max-rows/ttl이 차원 조인 QPS와 신선도를 가른다.",
      flavor: "사전을 책상 위에.",
      visual: "lookup",
      snippet: "lookup.cache.*",
      detail:
        "캐시 과소=외부 DB 과부하, 과대=메모리·오래된 차원. TTL을 비즈니스 허용 지연에 맞춘다. partial cache miss 메트릭을 본다. async lookup 지원 커넥터면 병목 완화.",
      code: `CREATE TABLE dim_user (
  user_id BIGINT,
  tier STRING,
  PRIMARY KEY (user_id) NOT ENFORCED
) WITH (
  'connector' = 'jdbc',
  'url' = 'jdbc:mysql://db:3306/shop',
  'table-name' = 'users',
  'lookup.cache.max-rows' = '50000',
  'lookup.cache.ttl' = '5 min'
);`,
      lang: "sql",
    },
    {
      id: "SQL-151",
      nameEn: "TEMPORAL JOIN VERSIONING",
      nameKo: "템포럴 버전 테이블",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Join"],
      atk: "시점 일치",
      def: "이력 요율",
      effect: "PRIMARY KEY + 시간 속성 버전 테이블과 이벤트 타임 조인.",
      flavor: "그 시각의 가격표.",
      visual: "temporal",
      snippet: "FOR SYSTEM_TIME AS OF",
      detail:
        "환율·요금·상품 속성 이력. 버전 테이블 changelog 품질이 핵심. 워터마크가 양쪽 정렬되지 않으면 틀린 버전을 붙이거나 지연된다. 테스트 데이터를 시간축으로 설계.",
      code: `CREATE TABLE rates (
  currency STRING,
  rate DECIMAL(10,4),
  update_time TIMESTAMP(3),
  WATERMARK FOR update_time AS update_time - INTERVAL '10' SECOND,
  PRIMARY KEY (currency) NOT ENFORCED
) WITH (...);

SELECT o.id, o.amount * r.rate
FROM orders o
JOIN rates FOR SYSTEM_TIME AS OF o.ts AS r
  ON o.currency = r.currency;`,
      lang: "sql",
    },
    {
      id: "SQL-152",
      nameEn: "INTERVAL JOIN SQL",
      nameKo: "SQL 인터벌 조인",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Join"],
      atk: "시간 창 조인",
      def: "상태 상한",
      effect: "l.time BETWEEN r.time - a AND r.time + b 형태로 상태 무한 성장을 막는다.",
      flavor: "서로 이웃한 시간만.",
      visual: "join",
      snippet: "time BETWEEN ... AND ...",
      detail:
        "정규 조인 대신 시간 bound를 반드시. 창이 넓을수록 상태↑. 워터마크 idle 없으면 정체. DataStream intervalJoin과 같은 문제의식.",
      code: `SELECT o.id, p.pay_id
FROM orders o, payments p
WHERE o.id = p.order_id
  AND o.ts BETWEEN p.ts - INTERVAL '5' MINUTE
               AND p.ts + INTERVAL '1' HOUR;`,
      lang: "sql",
    },
    {
      id: "SQL-153",
      nameEn: "WINDOW TVF TOPN",
      nameKo: "윈도우 TVF + TOPN",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Window"],
      atk: "창 안 랭킹",
      def: "실시간 리더보드",
      effect: "TUMBLE/HOP 결과 위 ROW_NUMBER로 창 단위 Top-N.",
      flavor: "5분마다 왕을 고른다.",
      visual: "topn",
      snippet: "window + ROW_NUMBER",
      detail:
        "글로벌 Top-N과 윈도우 Top-N 상태 특성이 다르다. 창이 닫히면 상태 정리 가능. 슬라이딩 창은 비용↑. upsert 키에 window_start 포함.",
      code: `WITH w AS (
  SELECT user_id, window_start, window_end, SUM(score) s
  FROM TABLE(TUMBLE(TABLE scores, DESCRIPTOR(ts), INTERVAL '5' MINUTES))
  GROUP BY user_id, window_start, window_end
)
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY window_start ORDER BY s DESC
  ) rn FROM w
) t WHERE rn <= 10;`,
      lang: "sql",
    },
    {
      id: "SQL-154",
      nameEn: "CUMULATE WINDOW",
      nameKo: "큐뮬레이트 윈도우",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Window"],
      atk: "누적 창",
      def: "점진 확대",
      effect: "하루 창을 10분 단위로 누적 방출. 대시보드 early result에 유용.",
      flavor: "하루가 조금씩 채워진다.",
      visual: "cumulate",
      snippet: "CUMULATE(...)",
      detail:
        "TUMBLE은 끝에서 한 번, CUMULATE는 최대 크기까지 step마다 누적 결과. 상태·방출 횟수가 많아질 수 있어 싱크 부하를 계산. 버전 지원 확인.",
      code: `SELECT window_start, window_end, SUM(amount)
FROM TABLE(
  CUMULATE(TABLE orders, DESCRIPTOR(ts),
    INTERVAL '10' MINUTES, INTERVAL '1' DAY)
)
GROUP BY window_start, window_end;`,
      lang: "sql",
    },
    {
      id: "SQL-155",
      nameEn: "GROUP WINDOW AGG LEGACY",
      nameKo: "레거시 그룹 윈도우",
      rarity: "N",
      type: "API",
      attrs: ["SQL", "Window"],
      atk: "TUMBLE(ts, size)",
      def: "구문법",
      effect: "구 GROUP BY TUMBLE 문법. 신규는 Window TVF 권장.",
      flavor: "옛 지도, 아직 길 위.",
      visual: "sqlwin",
      snippet: "GROUP BY TUMBLE(...)",
      detail:
        "레거시 코드베이스에 많음. TVF가 다중 윈도우 연산·정리에 유리. 마이그레이션 시 결과 타임존·워터마크 동등성 검증.",
      code: `-- legacy style
SELECT TUMBLE_START(ts, INTERVAL '5' MINUTE),
       COUNT(*)
FROM orders
GROUP BY TUMBLE(ts, INTERVAL '5' MINUTE);

-- prefer TABLE(TUMBLE(...)) TVF for new jobs`,
      lang: "sql",
    },
    {
      id: "SQL-156",
      nameEn: "OVER AGG WINDOWS",
      nameKo: "오버 집계",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Window"],
      atk: "행/범위 프레임",
      def: "러닝 합",
      effect: "OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE) 스트리밍 제한 있음.",
      flavor: "지나온 행의 누적.",
      visual: "overagg",
      snippet: "SUM(...) OVER (...)",
      detail:
        "배치 감각의 unbounded over는 스트리밍에서 상태가 위험. 제한된 PRECEDING 프레임을 사용. 지원 함수·제약은 버전 문서 확인.",
      code: `SELECT user_id, ts, amount,
  SUM(amount) OVER (
    PARTITION BY user_id ORDER BY ts
    RANGE BETWEEN INTERVAL '1' HOUR PRECEDING AND CURRENT ROW
  ) AS sum_1h
FROM payments;`,
      lang: "sql",
    },
    {
      id: "SQL-157",
      nameEn: "CHANGELOG MODE DEBUG",
      nameKo: "체인지로그 모드 디버그",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Changelog"],
      atk: "I/UA/UB/D",
      def: "싱크 정합",
      effect: "EXPLAIN CHANGELOG_MODE로 결과가 append/retract/upsert인지 확인.",
      flavor: "결과 행의 숨은 깃발.",
      visual: "retract",
      snippet: "CHANGELOG_MODE",
      detail:
        "집계·정규조인·TopN은 업데이트 스트림을 만든다. append-only 싱크에 꽂으면 중복·삭제 누락. upsert-kafka나 PK 싱크 필수인 플랜을 조기에 발견.",
      code: `EXPLAIN CHANGELOG_MODE
SELECT user_id, COUNT(*) c FROM orders GROUP BY user_id;

-- if UPSERT/RETRACT: pick matching sink
-- upsert-kafka / jdbc upsert / lake pk table`,
      lang: "sql",
    },
    {
      id: "SQL-158",
      nameEn: "SINK UPSERT MATERIALIZE",
      nameKo: "싱크 업서트 머티리얼라이즈",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Sink"],
      atk: "중복 키 정리",
      def: "버퍼 비용",
      effect: "sink.upsert-materialize 설정이 업스트림 키 불완전 시 추가 상태를 만든다.",
      flavor: "싱크 앞 정렬 버퍼.",
      visual: "materialize",
      snippet: "upsert-materialize",
      detail:
        "업스트림이 유니크 키를 보장 못 하면 싱크 앞에서 머티리얼라이즈해 올바른 retract/upsert를 만든다. 정확성↑ 상태·지연↑. 가능하면 업스트림에서 키 유니크를 보장해 NONE에 가깝게.",
      code: `-- table exec sink upsert materialize
-- AUTO | NONE | FORCE  (names by version)

-- prefer: ensure unique key before sink
-- SELECT ... GROUP BY pk  then upsert sink`,
      lang: "sql",
    },
    {
      id: "SQL-159",
      nameEn: "SQL TIME ZONE",
      nameKo: "SQL 타임존",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "Time"],
      atk: "창 경계",
      def: "로컬 vs UTC",
      effect: "table.local-time-zone이 윈도우 벽시계 해석에 영향. 글로벌 서비스는 UTC 고정 추천.",
      flavor: "자정의 위치.",
      visual: "tz",
      snippet: "table.local-time-zone",
      detail:
        "이벤트 타임 자체는 인스턴트, 창을 달력 기준으로 자르면 존이 개입. 팀 표준을 UTC로 두고 표시 계층에서 변환하는 편이 사고가 적다.",
      code: `SET 'table.local-time-zone' = 'UTC';
-- or 'Asia/Seoul' if business windows need local days

-- store timestamps as TIMESTAMP_LTZ when possible`,
      lang: "sql",
    },
    {
      id: "SQL-160",
      nameEn: "WATERMARK IN DDL",
      nameKo: "DDL 워터마크",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "Time"],
      atk: "테이블 시계",
      def: "지연 허용",
      effect: "CREATE TABLE WATERMARK FOR col AS expr. 소스 시간 모델의 입구.",
      flavor: "표 정의에 새긴 파도.",
      visual: "wmdll",
      snippet: "WATERMARK FOR ts AS ...",
      detail:
        "expr에서 지연을 빼는 패턴이 흔하다. 잘못된 컬럼/존/포맷이면 창이 안 닫힌다. 프로ctime 컬럼과 혼동 금지. 소스 idle과 함께 설계.",
      code: `CREATE TABLE orders (
  id BIGINT,
  ts TIMESTAMP(3),
  amount DECIMAL(10,2),
  WATERMARK FOR ts AS ts - INTERVAL '5' SECOND
) WITH (
  'connector' = 'kafka',
  'topic' = 'orders',
  'format' = 'json',
  'scan.startup.mode' = 'latest-offset'
);`,
      lang: "sql",
    },
    {
      id: "SQL-161",
      nameEn: "COMPUTED COLUMNS",
      nameKo: "계산 컬럼",
      rarity: "N",
      type: "API",
      attrs: ["SQL"],
      atk: "파생 필드",
      def: "DDL 정리",
      effect: "CREATE TABLE 계산 컬럼으로 proctime/메타 파싱 결과를 노출.",
      flavor: "표가 스스로 계산한다.",
      visual: "computed",
      snippet: "AS PROCTIME()",
      detail:
        "proc time 속성, JSON 필드 추출, 메타데이터 컬럼(timestamp)을 계산 컬럼으로. 룩업 조인 시간 속성 연결에 자주 사용.",
      code: `CREATE TABLE raw (
  payload STRING,
  proc_time AS PROCTIME(),
  event_time AS TO_TIMESTAMP_LTZ(
    CAST(JSON_VALUE(payload, '$.ts') AS BIGINT), 3),
  WATERMARK FOR event_time AS event_time - INTERVAL '3' SECOND
) WITH (...);`,
      lang: "sql",
    },
    {
      id: "SQL-162",
      nameEn: "METADATA COLUMNS",
      nameKo: "메타데이터 컬럼",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Connector"],
      atk: "offset/partition",
      def: "관측·키",
      effect: "Kafka offset, partition, timestamp를 컬럼으로 읽어 디버깅·멱등에 활용.",
      flavor: "봉투 바깥 주소.",
      visual: "metacols",
      snippet: "METADATA FROM 'offset'",
      detail:
        "장애 시 재처리 범위 특정, 멱등 키 구성, 파티션 치우침 분석에 유용. 커넥터별 지원 메타 키가 다름.",
      code: `CREATE TABLE k_orders (
  id BIGINT,
  amount DECIMAL(10,2),
  kafka_ts TIMESTAMP(3) METADATA FROM 'timestamp',
  part INT METADATA FROM 'partition',
  off BIGINT METADATA FROM 'offset'
) WITH (
  'connector' = 'kafka',
  'topic' = 'orders',
  'format' = 'json',
  'properties.bootstrap.servers' = 'b:9092'
);`,
      lang: "sql",
    },
    {
      id: "SQL-163",
      nameEn: "SQL CLIENT OPS",
      nameKo: "SQL Client 운영",
      rarity: "N",
      type: "STARTER",
      attrs: ["SQL", "Dev"],
      atk: "대화형",
      def: "배포 전 검증",
      effect: "SQL Client로 DDL/DML 시험. SET 구성·EXPLAIN·잡 제출.",
      flavor: "쿼리 실험실.",
      visual: "sqlclient",
      snippet: "sql-client.sh",
      detail:
        "로컬에서 커넥터 설정 검증 후 스크립트/JAR 배포. 운영 잡은 버전 고정 스크립트로. Client 세션 설정과 클러스터 기본 conf 차이를 의식.",
      code: `./bin/sql-client.sh
Flink SQL> SET 'table.exec.state.ttl' = '2 d';
Flink SQL> EXPLAIN SELECT ...;
Flink SQL> INSERT INTO sink SELECT ...;`,
      lang: "bash",
    },
    {
      id: "SQL-164",
      nameEn: "STATEMENT SET",
      nameKo: "스테이트먼트 셋",
      rarity: "R",
      type: "API",
      attrs: ["SQL"],
      atk: "다중 INSERT",
      def: "한 잡 묶기",
      effect: "여러 INSERT를 하나의 Flink 잡으로 묶어 소스를 공유.",
      flavor: "한 파이프 여러 출구.",
      visual: "stmtset",
      snippet: "EXECUTE STATEMENT SET",
      detail:
        "동일 소스를 여러 싱크에 팬아웃할 때 잡 폭증을 막는다. 실패 단위가 묶이므로 격리 필요도 고려. 리소스·체크포인트 하나로 관리.",
      code: `EXECUTE STATEMENT SET
BEGIN
  INSERT INTO sink_a SELECT ... FROM src;
  INSERT INTO sink_b SELECT ... FROM src;
END;`,
      lang: "sql",
    },
    {
      id: "SQL-165",
      nameEn: "DYNAMIC TABLE OPTIONS",
      nameKo: "동적 테이블 옵션",
      rarity: "R",
      type: "API",
      attrs: ["SQL"],
      atk: "쿼리 힌트 옵션",
      def: "일시 오버라이드",
      effect: "/*+ OPTIONS(...) */ 로 테이블 커넥터 옵션을 쿼리마다 덮어쓴다.",
      flavor: "이번 쿼리만 다른 설정.",
      visual: "dynopt",
      snippet: "/*+ OPTIONS('scan.startup.mode'='...') */",
      detail:
        "백필 시 earliest, 운영은 latest 같은 패턴. 실수하면 프로덕션 토픽을 처음부터 읽을 수 있어 위험. 권한·리뷰 필요.",
      code: `SELECT * FROM orders
/*+ OPTIONS('scan.startup.mode'='earliest-offset') */;

-- use carefully in shared prod clusters`,
      lang: "sql",
    },
    {
      id: "SQL-166",
      nameEn: "FUNCTION DDL UDF",
      nameKo: "함수 DDL",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "UDF"],
      atk: "CREATE FUNCTION",
      def: "임시/영구",
      effect: "TEMPORARY SYSTEM/ CATALOG 함수 등록. 클래스패스 일치 필수.",
      flavor: "엔진에 주문 도구 장착.",
      visual: "udfdll",
      snippet: "CREATE FUNCTION",
      detail:
        "클러스터 모든 TM에 클래스 필요. 임시 함수는 세션, 카탈로그 함수는 메타스토어. 버전 업 시 클래스 호환.",
      code: `CREATE TEMPORARY SYSTEM FUNCTION mask_email AS
  'com.example.MaskEmail';

SELECT mask_email(email) FROM users;`,
      lang: "sql",
    },
    {
      id: "SQL-167",
      nameEn: "CATALOG & DATABASE",
      nameKo: "카탈로그 구조",
      rarity: "N",
      type: "API",
      attrs: ["SQL"],
      atk: "메타 계층",
      def: "이름 공간",
      effect: "catalog.database.table 3단. Hive/JDBC/Filesystem 카탈로그 연동.",
      flavor: "도서관 분류 체계.",
      visual: "catalog",
      snippet: "catalog.db.table",
      detail:
        "다중 팀 환경에서 네이밍 규칙이 사고율 좌우. 카탈로그에 Iceberg/Paimon 테이블을 올려 배치·스트림 공유.",
      code: `CREATE CATALOG hive_cat WITH (
  'type' = 'hive',
  'hive-conf-dir' = '/etc/hive/conf'
);
USE CATALOG hive_cat;
USE shop_db;
SHOW TABLES;`,
      lang: "sql",
    },
    {
      id: "SQL-168",
      nameEn: "SQL JOB PARALLELISM",
      nameKo: "SQL 잡 병렬도",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "Perf"],
      atk: "전역/연산자",
      def: "리소스",
      effect: "pipeline.global-job 병렬도와 힌트/설정으로 연산자 병렬도 조절.",
      flavor: "쿼리에도 일꾼 수.",
      visual: "sqlpar",
      snippet: "parallelism.default",
      detail:
        "SQL만 쓴다고 병렬도가 자동 최적은 아님. 소스 파티션 수와 맞추고, 무거운 agg에 자원을 더 주는 전략. 너무 큰 병렬도는 셔플 폭발.",
      code: `SET 'parallelism.default' = '8';
-- some versions: operator-level via hints/config

-- align roughly with Kafka partitions for sources`,
      lang: "sql",
    },
    {
      id: "SQL-169",
      nameEn: "PLANNER STREAM vs BATCH",
      nameKo: "플래너 스트림/배치",
      rarity: "R",
      type: "API",
      attrs: ["SQL", "Planner"],
      atk: "실행 모드",
      def: "최적화 목표",
      effect: "동일 SQL도 스트림/배치 모드에서 플랜·연산이 달라진다.",
      flavor: "같은 악보, 다른 연주.",
      visual: "rtmode",
      snippet: "runtime-mode",
      detail:
        "배치 모드 유한 소스 가정이 정렬·조인 전략을 바꿈. 백필은 배치, 서빙은 스트림. 결과 동등성 테스트 필수.",
      code: `SET 'execution.runtime-mode' = 'batch';
-- rerun same INSERT for backfill

SET 'execution.runtime-mode' = 'streaming';
-- long-running serving job`,
      lang: "sql",
    },
    {
      id: "SQL-170",
      nameEn: "MULTIPLE INPUT FUSION",
      nameKo: "멀티플 인풋 융합",
      rarity: "UR",
      type: "API",
      attrs: ["SQL", "Opt"],
      atk: "연산 융합",
      def: "스케줄 효율",
      effect: "여러 입력을 한 연산자 체인으로 융합해 오버헤드를 줄이는 최적화(버전).",
      flavor: "조립 공정을 한 라인으로.",
      visual: "fusion",
      snippet: "multiple input",
      detail:
        "플래너/런타임 고급 최적화. 문제 재현 시 비활성화 플래그로 비교. 일반 튜닝은 exchange·state·mini-batch가 먼저.",
      code: `-- if suspicious plan weirdness:
-- check version docs for multiple-input / operator fusion toggles
-- A/B with flag off and compare throughput`,
      lang: "text",
    },

    // ===== Kafka =====
    {
      id: "KFK-171",
      nameEn: "KAFKA SOURCE STARTUP",
      nameKo: "카프카 소스 시작점",
      rarity: "R",
      type: "STARTER",
      attrs: ["Kafka", "Source"],
      atk: "earliest/latest/group",
      def: "재처리 범위",
      effect: "scan.startup.mode가 첫 기동 읽기 위치를 결정. 복구는 체크포인트 오프셋 우선.",
      flavor: "테이프 어디서 누를까.",
      visual: "kstart",
      snippet: "scan.startup.mode",
      detail:
        "latest는 실시간만, earliest는 토픽 전체(위험), timestamp/specific offsets는 백필. 운영 재시작은 Flink 상태 오프셋이 우선임을 팀에 교육.",
      code: `-- SQL
'scan.startup.mode' = 'latest-offset'
-- 'earliest-offset' | 'group-offsets' | 'timestamp'

// Java
OffsetsInitializer.latest();
OffsetsInitializer.earliest();
OffsetsInitializer.timestamp(ts);`,
      lang: "sql",
    },
    {
      id: "KFK-172",
      nameEn: "KAFKA PARTITION = PARALLELISM",
      nameKo: "파티션과 병렬도",
      rarity: "R",
      type: "OPS",
      attrs: ["Kafka", "Perf"],
      atk: "상한 처리량",
      def: "소스 스케일",
      effect: "소스 유효 병렬도는 대략 토픽 파티션 수. 파티션 16에 병렬 64는 낭비·치우침.",
      flavor: "수도꼭지 수 = 호스 수.",
      visual: "kpart",
      snippet: "partitions ≥ parallelism",
      detail:
        "키 치우치면 파티션 불균형. 프로듀서 키 설계와 함께 본다. 파티션 확장 후 컨슈머 재균형·재처리 계획.",
      code: `// rule of thumb
// sourceParallelism <= kafkaPartitions
// heavy decode: more TM CPU, not more source tasks than partitions

// fix skew: better keys / pre-aggregate / salt`,
      lang: "text",
    },
    {
      id: "KFK-173",
      nameEn: "KAFKA DESER ERROR",
      nameKo: "역직렬화 오류",
      rarity: "SR",
      type: "OPS",
      attrs: ["Kafka", "Troubleshoot"],
      atk: "독 메시지",
      def: "잡 다운",
      effect: "잘못된 JSON/Avro가 태스크를 반복 실패시킨다. 에러 핸들러·DLQ 필수.",
      flavor: "독이 든 편지 한 통.",
      visual: "desererr",
      snippet: "value.deserializer / error handler",
      detail:
        "기본 fail-fast는 워룸 단골. ignore/skip + 메트릭, 또는 사이드 토픽 DLQ. 스키마 레지스트리 호환 모드 확인. 샘플 오프셋 보존.",
      code: `// Java: wrap deserializer, side-output bad records
// SQL: connector error handling options vary by version
// 'value.fields-include' / format fail-on-missing ...

// always emit metric parse_errors
// alert on rate > threshold`,
      lang: "text",
    },
    {
      id: "KFK-174",
      nameEn: "KAFKA SINK ACKS",
      nameKo: "카프카 싱크 acks",
      rarity: "R",
      type: "OPS",
      attrs: ["Kafka", "Sink"],
      atk: "내구성",
      def: "지연",
      effect: "acks=all + ISR이 내구성, 지연 증가. EO 트랜잭션과 별개 축.",
      flavor: "영수증 몇 장까지 기다릴까.",
      visual: "acks",
      snippet: "acks=all",
      detail:
        "프로듀서 acks, linger, batch size가 처리량 튜닝 포인트. EO는 transactional id + checkpoint. at-least-once는 acks와 재시도로 절충.",
      code: `// KafkaSink builder properties
props.put(ProducerConfig.ACKS_CONFIG, "all");
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");
props.put(ProducerConfig.LINGER_MS_CONFIG, "20");
props.put(ProducerConfig.BATCH_SIZE_CONFIG, Integer.toString(64 * 1024));`,
      lang: "java",
    },
    {
      id: "KFK-175",
      nameEn: "TRANSACTIONAL KAFKA SINK",
      nameKo: "트랜잭션 카프카 싱크",
      rarity: "LR",
      type: "OPS",
      attrs: ["Kafka", "Semantics"],
      atk: "E2E EO",
      def: "트랜잭션 타임아웃",
      effect: "DeliveryGuarantee.EXACTLY_ONCE + transactionalIdPrefix. 트랜잭션 타임아웃>체크포인트 여유.",
      flavor: "봉투를 봉인한 뒤 배달.",
      visual: "e2e",
      snippet: "EXACTLY_ONCE + txn prefix",
      detail:
        "transaction.timeout.ms가 체크포인트 간격보다 짧으면 abort 폭풍. consumer isolation.level=read_committed 필요. 프리픽스 충돌 금지(잡마다 유니크).",
      code: `KafkaSink.<String>builder()
  .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
  .setTransactionalIdPrefix("orders-job-")
  .setBootstrapServers("b:9092")
  .setRecordSerializer(...)
  .build();

// broker: transaction.state.log.* sized properly`,
      lang: "java",
    },
    {
      id: "KFK-176",
      nameEn: "UPSERT KAFKA KEYING",
      nameKo: "업서트 카프카 키",
      rarity: "SR",
      type: "API",
      attrs: ["Kafka", "SQL"],
      atk: "PK = Kafka key",
      def: "컴팩션",
      effect: "업서트 키를 Kafka 메시지 키로 매핑. 토픽 compaction 필수.",
      flavor: "키 없는 덮어쓰기는 환상.",
      visual: "upsertk",
      snippet: "PRIMARY KEY → kafka key",
      detail:
        "cleanup.policy=compact, 키 스키마 안정성, tombstone(-D) 처리. 다운스트림이 컴팩션 토픽을 이해해야 함. 키 변경은 새 레코드로 남아 중복 논리 키 위험.",
      code: `CREATE TABLE user_stats (
  user_id BIGINT,
  total DECIMAL(12,2),
  PRIMARY KEY (user_id) NOT ENFORCED
) WITH (
  'connector' = 'upsert-kafka',
  'topic' = 'user-stats',
  'properties.bootstrap.servers' = 'b:9092',
  'key.format' = 'json',
  'value.format' = 'json'
);`,
      lang: "sql",
    },
    {
      id: "KFK-177",
      nameEn: "KAFKA LAG ALERT",
      nameKo: "카프카 랙 알람",
      rarity: "R",
      type: "OPS",
      attrs: ["Kafka", "Observability"],
      atk: "소비자 지연",
      def: "SLA",
      effect: "partition lag / records-behind를 알람. Flink busy와 함께 본다.",
      flavor: "밀린 편지 더미 높이.",
      visual: "klag",
      snippet: "consumer lag",
      detail:
        "lag만 보면 원인 모름. Flink 배압·체크포인트 실패·소스 병렬도·프로듀서 폭주를 같이. 파티션 max lag와 sum lag를 구분.",
      code: `# alert ideas
# - max(partition_lag) > threshold for 10m
# - lag growing slope positive while CPU low -> stuck
# - lag spike after deploy -> compare CP failures`,
      lang: "text",
    },
    {
      id: "KFK-178",
      nameEn: "REBALANCE STORM",
      nameKo: "리밸런스 스톰",
      rarity: "SR",
      type: "OPS",
      attrs: ["Kafka", "Troubleshoot"],
      atk: "할당 흔들림",
      def: "처리 공백",
      effect: "TM 재시작·세션 타임아웃으로 리밸런스 반복 시 처리 공백·중복 위험.",
      flavor: "의자가 계속 바뀌는 게임.",
      visual: "rebalance",
      snippet: "consumer rebalance",
      detail:
        "heartbeat/session timeout, 과도한 GC, 잦은 배포가 원인. Flink 소스 구현에 따라 리밸런스 모델이 다름. 안정 기동 후 lag 그래프가 톱니면 의심.",
      code: `// mitigate
// - fewer needless restarts
// - right TM memory (no long GC)
// - deploy rolling carefully
// - watch restart count + lag sawtooth`,
      lang: "text",
    },
    {
      id: "KFK-179",
      nameEn: "SCHEMA REGISTRY",
      nameKo: "스키마 레지스트리",
      rarity: "SR",
      type: "OPS",
      attrs: ["Kafka", "SerDe"],
      atk: "Avro/JSON Schema",
      def: "호환 규칙",
      effect: "Confluent/자체 레지스트리로 스키마 ID 관리. 호환 모드가 배포 안전장치.",
      flavor: "계약서 보관소.",
      visual: "schemareg",
      snippet: "schema.id in payload",
      detail:
        "BACKWARD/FORWARD/FULL 호환. Flink 상태 스키마와 별개로 토픽 스키마 진화 정책을 팀에 공지. 레지스트리 장애 시 소스 실패 가능 → 캐시/고가용.",
      code: `// avro + registry (conceptual)
// format = 'avro-confluent'
// 'url' = 'http://schema-registry:8081'

// CI: register schema before deploy
// reject incompatible changes in pipeline`,
      lang: "text",
    },
    {
      id: "KFK-180",
      nameEn: "KAFKA IDEMPOTENT PRODUCER",
      nameKo: "멱등 프로듀서",
      rarity: "R",
      type: "OPS",
      attrs: ["Kafka", "Semantics"],
      atk: "브로커 중복 억제",
      def: "EO 아님",
      effect: "enable.idempotence=true는 프로듀서 재시도 중복을 줄인다. 앱 수준 EO와 혼동 금지.",
      flavor: "우체국 중복 스탬프 방지.",
      visual: "idemp",
      snippet: "enable.idempotence",
      detail:
        "브로커 단 프로듀서 중복과 Flink 체크포인트 EO는 계층이 다름. 멱등 프로듀서+acks=all은 at-least 품질 향상. 트랜잭션 EO가 필요하면 별도.",
      code: `props.put("enable.idempotence", "true");
props.put("acks", "all");
// still not end-to-end EO without txn + checkpoint commit`,
      lang: "java",
    },
    {
      id: "KFK-181",
      nameEn: "MULTIPLE TOPICS SOURCE",
      nameKo: "멀티 토픽 소스",
      rarity: "R",
      type: "STARTER",
      attrs: ["Kafka"],
      atk: "구독 패턴",
      def: "워터마크 통합",
      effect: "토픽 리스트/정규식 구독. 파티션 idle·워터마크 최소값이 전체를 지배.",
      flavor: "여러 강이 한 하구로.",
      visual: "mtopic",
      snippet: "setTopics / topic pattern",
      detail:
        "한산한 토픽이 워터마크를 멈출 수 있다. idleness 필수. 스키마가 다르면 파싱 분기. 권한·ACL 누락 토픽이 기동 실패.",
      code: `KafkaSource.<String>builder()
  .setTopics("orders", "orders_retry")
  // .setTopicPattern(Pattern.compile("events-.*"))
  .setStartingOffsets(OffsetsInitializer.latest())
  .setValueOnlyDeserializer(new SimpleStringSchema())
  .build();`,
      lang: "java",
    },
    {
      id: "KFK-182",
      nameEn: "KAFKA RATE LIMIT",
      nameKo: "카프카 읽기 제한",
      rarity: "R",
      type: "OPS",
      attrs: ["Kafka", "Perf"],
      atk: "백필 보호",
      def: "다운스트림 보호",
      effect: "백필 시 소스 레이트 리밋으로 싱크/DB를 보호.",
      flavor: "수도 밸브 잠그기.",
      visual: "ratelimit",
      snippet: "rate limit / parallelism",
      detail:
        "earliest로 켜고 전체 속도로 재생하면 MySQL 룩업이 죽는다. 병렬도 낮추기, 중간 큐, 커넥터 rate limit(지원 시). 백필 전용 잡 분리.",
      code: `// practical backfill controls
env.setParallelism(2); // lower
// split historical vs realtime jobs
// protect JDBC with cache + smaller concurrency`,
      lang: "java",
    },

    // ===== CDC =====
    {
      id: "CDC-183",
      nameEn: "CDC BINLOG STREAM",
      nameKo: "CDC 빈로그 스트림",
      rarity: "SR",
      type: "STARTER",
      attrs: ["CDC"],
      atk: "+I -U +U -D",
      def: "DB→스트림",
      effect: "DB 변경을 changelog 이벤트로 읽어 실시간 동기화 파이프라인을 만든다.",
      flavor: "데이터베이스의 속삭임.",
      visual: "cdc",
      snippet: "mysql-cdc / postgres-cdc",
      detail:
        "스냅샷 단계+빈로그 단계. 스냅샷 동안 부하·락 정책을 확인. PK 필수에 가깝다. 타임존·decimal 정밀도 이슈 단골.",
      code: `CREATE TABLE orders_cdc (
  id BIGINT,
  user_id BIGINT,
  amount DECIMAL(10,2),
  PRIMARY KEY (id) NOT ENFORCED
) WITH (
  'connector' = 'mysql-cdc',
  'hostname' = 'db',
  'port' = '3306',
  'username' = 'flink',
  'password' = '...',
  'database-name' = 'shop',
  'table-name' = 'orders'
);`,
      lang: "sql",
    },
    {
      id: "CDC-184",
      nameEn: "CDC SNAPSHOT PHASE",
      nameKo: "CDC 스냅샷 단계",
      rarity: "SR",
      type: "OPS",
      attrs: ["CDC"],
      atk: "초기 적재",
      def: "컷오버",
      effect: "전체 스냅샷 후 빈로그로 전환. 스냅샷 병렬·청크 설정이 시간 좌우.",
      flavor: "사진 찍고 나서 실시간.",
      visual: "cdcsnap",
      snippet: "snapshot.mode / chunk",
      detail:
        "큰 테이블은 청크 스냅샷. 피크 시간 피하기. 스냅샷 실패 재시작 비용 큼. 모니터링 테이블 단위 progress.",
      code: `-- connector options conceptual
-- 'scan.startup.mode' = 'initial'
-- 'snapshot.chunk.size' = '...'
-- run off-peak; watch DB CPU/IO`,
      lang: "sql",
    },
    {
      id: "CDC-185",
      nameEn: "CDC SCHEMA CHANGE",
      nameKo: "CDC 스키마 변경",
      rarity: "UR",
      type: "OPS",
      attrs: ["CDC", "Schema"],
      atk: "DDL 전파",
      def: "호환 깨짐",
      effect: "ALTER TABLE이 파이프라인을 깨뜨릴 수 있다. 스키마 진화 정책을 미리 정한다.",
      flavor: "테이블이 탈바꿈할 때.",
      visual: "cdcddl",
      snippet: "schema evolution policy",
      detail:
        "컬럼 추가/타입 변경/PK 변경 대응 표. 일부 커넥터는 부분 DDL 전송. 다운스트림 Iceberg/Paimon 진화와 맞춤. 금지 DDL 목록을 DBA와 합의.",
      code: `// policy example
// ALLOW: add nullable column
// REVIEW: widen type
// FORBIDDEN: drop column used in PK sink
// procedure: expand -> dual write -> contract`,
      lang: "text",
    },
    {
      id: "CDC-186",
      nameEn: "CDC DEBEZIUM JSON",
      nameKo: "Debezium JSON 포맷",
      rarity: "R",
      type: "API",
      attrs: ["CDC", "Format"],
      atk: "envelope",
      def: "before/after",
      effect: "Debezium envelope의 before/after/op 필드를 파싱해 changelog로 변환.",
      flavor: "변경의 껍질 구조.",
      visual: "debezium",
      snippet: "op=c/u/d",
      detail:
        "Flink CDC 커넥터가 추상화하지만, 원시 Debezium 토픽을 읽을 때는 envelope 이해 필수. tombstone, heartbeat 토픽 처리.",
      code: `-- conceptual fields
-- op: c=create, u=update, d=delete, r=read(snapshot)
-- after: new image
-- before: old image
-- extract with JSON functions or format='debezium-json'`,
      lang: "text",
    },
    {
      id: "CDC-187",
      nameEn: "CDC TO UPSERT SINK",
      nameKo: "CDC→업서트 싱크",
      rarity: "SR",
      type: "API",
      attrs: ["CDC", "Sink"],
      atk: "PK 동기화",
      def: "검색/캐시/레이크",
      effect: "CDC changelog를 upsert-kafka/jdbc/lake PK 테이블로 내려 복제본 유지.",
      flavor: "원장의 거울.",
      visual: "cdcsink",
      snippet: "INSERT INTO upsert_sink SELECT *",
      detail:
        "PK 일치가 핵심. 부분 컬럼 복제 시 기본값. 삭제 전파 확인. 지연 SLA·정합 검증 잡(recon) 운영.",
      code: `INSERT INTO lake_orders
SELECT id, user_id, amount FROM orders_cdc;

-- recon job: compare counts/checksums daily
-- alert on lag of binlog position`,
      lang: "sql",
    },
    {
      id: "CDC-188",
      nameEn: "CDC BINLOG POSITION",
      nameKo: "빈로그 포지션",
      rarity: "SR",
      type: "OPS",
      attrs: ["CDC", "Ops"],
      atk: "복구 좌표",
      def: "체크포인트",
      effect: "빈로그 파일·포지션/GTID가 소스 상태에 저장. 백업 보존 기간보다 길면 복구 실패.",
      flavor: "책갈피가 책보다 오래.",
      visual: "binpos",
      snippet: "binlog filename + pos",
      detail:
        "MySQL binlog retention을 Flink 다운타임보다 길게. 장기 장애 후 스냅샷 재시작 전략. GTID 모드 일관성.",
      code: `# ops checklist
# - binlog_expire_logs_seconds > max tolerated downtime
# - monitor CDC delay metrics
# - document rebuild-from-snapshot runbook`,
      lang: "text",
    },
    {
      id: "CDC-189",
      nameEn: "CDC MULTI TABLE",
      nameKo: "CDC 멀티 테이블",
      rarity: "R",
      type: "OPS",
      attrs: ["CDC"],
      atk: "정규식 구독",
      def: "잡 설계",
      effect: "여러 테이블을 한 잡/여러 잡으로. 실패 격리 vs 자원 효율 트레이드오프.",
      flavor: "한 배에 실은 화물들.",
      visual: "multicdc",
      snippet: "table-name' = 'db\\..*'",
      detail:
        "한 잡에 몰면 운영 단순·장애 공통화. 테이블별 잡이면 격리. 라우팅 규칙·스키마 레지스트리 필요.",
      code: `-- conceptual
'database-name' = 'shop'
'table-name' = 'orders|users|payments'
-- or separate jobs per domain bounded context`,
      lang: "sql",
    },
    {
      id: "CDC-190",
      nameEn: "CDC TIMEZONE TRAP",
      nameKo: "CDC 타임존 함정",
      rarity: "SR",
      type: "OPS",
      attrs: ["CDC", "Troubleshoot"],
      atk: "시간 밀림",
      def: "조용한 버그",
      effect: "DB/커넥터/Flink TZ 불일치로 날짜 창·정산이 하루 밀린다.",
      flavor: "모두가 틀린 시계.",
      visual: "tztrap",
      snippet: "serverTimezone / LTZ",
      detail:
        "TIMESTAMP vs DATETIME, session time_zone, JDBC serverTimezone, Flink local-time-zone. 샘플 행으로 UTC 인스턴트 검증 테스트 필수.",
      code: `-- validate
SELECT id, ts, CAST(ts AS TIMESTAMP_LTZ(3)) FROM orders_cdc
LIMIT 20;
-- compare against DB SELECT UNIX_TIMESTAMP(...)`,
      lang: "sql",
    },

    // ===== Iceberg / Paimon / Lakehouse =====
    {
      id: "LAKE-191",
      nameEn: "LAKEHOUSE SINK INTRO",
      nameKo: "레이크하우스 싱크",
      rarity: "R",
      type: "STARTER",
      attrs: ["Iceberg", "Paimon"],
      atk: "테이블 포맷",
      def: "ACID 파일",
      effect: "Iceberg/Paimon 등 테이블 포맷으로 스트리밍 upsert/append를 파일 레이크에 반영.",
      flavor: "호수 위의 트랜잭션.",
      visual: "lake",
      snippet: "connector = iceberg/paimon",
      detail:
        "파켓 파일+메타데이터 트랜잭션. 소형 파일·컴팩션·스냅샷 만료가 운영 핵심. 배치 엔진(Spark/Trino)과 공유.",
      code: `-- conceptual
CREATE TABLE lake.db.orders (...) WITH (
  'connector' = 'iceberg', -- or 'paimon'
  'catalog-type' = '...',
  ...
);
INSERT INTO lake.db.orders SELECT ...;`,
      lang: "sql",
    },
    {
      id: "LAKE-192",
      nameEn: "ICEBERG STREAMING WRITE",
      nameKo: "Iceberg 스트리밍 쓰기",
      rarity: "SR",
      type: "OPS",
      attrs: ["Iceberg"],
      atk: "commit 주기",
      def: "스냅샷 폭증",
      effect: "커밋 간격·파일 롤링이 스냅샷 수와 리더 성능을 결정.",
      flavor: "사진 너무 자주 찍지 않기.",
      visual: "iceberg",
      snippet: "commit.interval / file size",
      detail:
        "너무 잦은 커밋=메타데이터 폭증. 너무 드묾=가시성 지연. 컴팩션 파이프라인 병행. Flink checkpoint와 commit 연동 이해.",
      code: `-- tune commit interval / target file size
-- monitor snapshots count
-- expire old snapshots with maintenance job`,
      lang: "text",
    },
    {
      id: "LAKE-193",
      nameEn: "ICEBERG UPSERT",
      nameKo: "Iceberg 업서트",
      rarity: "UR",
      type: "API",
      attrs: ["Iceberg", "CDC"],
      atk: "PK equality delete",
      def: "CDC 적재",
      effect: "equality delete / merge-on-read 등으로 CDC를 테이블에 반영(버전·모드).",
      flavor: "파일 위 수정 테이프.",
      visual: "iceupsert",
      snippet: "equality delete",
      detail:
        "Copy-on-write vs merge-on-read 트레이드오프. 리더 쿼리 엔진 지원 확인. 컴팩션이 성능을 좌우. Flink 쓰기 모드 문서 고정.",
      code: `-- CDC to Iceberg pattern
INSERT INTO iceberg_orders
SELECT * FROM mysql_orders_cdc;
-- ensure identifier fields configured
-- maintenance: compact + expire`,
      lang: "sql",
    },
    {
      id: "LAKE-194",
      nameEn: "PAIMON PRIMARY KEY TABLE",
      nameKo: "Paimon PK 테이블",
      rarity: "UR",
      type: "API",
      attrs: ["Paimon"],
      atk: "스트리밍 머지",
      def: "changelog 입출력",
      effect: "Paimon PK 테이블은 스트리밍 upsert에 최적화. 컴팩션·버킷 설계 핵심.",
      flavor: "호수 위 실시간 원장.",
      visual: "paimon",
      snippet: "bucket + primary key",
      detail:
        "버킷 수≈병렬도 감각. 키 분포 치우침 주의. changelog producer 모드로 다운스트림 Flink 재처리 가능. 운영 메트릭: compaction, file count.",
      code: `CREATE TABLE paimon_orders (
  id BIGINT,
  user_id BIGINT,
  amount DECIMAL(10,2),
  PRIMARY KEY (id) NOT ENFORCED
) WITH (
  'connector' = 'paimon',
  'path' = 's3://bucket/paimon/orders',
  'bucket' = '8'
);`,
      lang: "sql",
    },
    {
      id: "LAKE-195",
      nameEn: "PAIMON BUCKET DESIGN",
      nameKo: "Paimon 버킷 설계",
      rarity: "SR",
      type: "OPS",
      attrs: ["Paimon", "Perf"],
      atk: "버킷 수",
      def: "병렬·치우침",
      effect: "버킷이 곧 분산 단위. 너무 적으면 병목, 너무 많으면 소형 파일.",
      flavor: "서랍 개수의 미학.",
      visual: "bucket",
      snippet: "bucket = N",
      detail:
        "데이터 성장 예상에 맞춰 시작. 버킷 변경은 재적재 수준의 비용일 수 있음. 키 해시 균일성 검증.",
      code: `-- start with buckets ~ planned write parallelism
-- monitor per-bucket size skew
-- rebuild table if wrong long-term`,
      lang: "text",
    },
    {
      id: "LAKE-196",
      nameEn: "SMALL FILES PROBLEM",
      nameKo: "소형 파일 문제",
      rarity: "SR",
      type: "OPS",
      attrs: ["Lakehouse", "Troubleshoot"],
      atk: "파일 폭증",
      def: "쿼리 붕괴",
      effect: "스트리밍 쓰기가 작은 파일을 쏟아내면 리더 NameNode/목록 비용 폭발.",
      flavor: "모래알 파일의 습격.",
      visual: "smallfiles",
      snippet: "compaction / roll size",
      detail:
        "롤링 정책, 커밋 간격, 전용 컴팩션 잡. 체크포인트 너무 짧아도 소형 파일 악화 가능. 파일 수 알람.",
      code: `# symptoms
# - trino/spark planning slow
# - s3 LIST throttling
# - iceberg snapshot files huge
# fix: compact, larger targets, fewer commits`,
      lang: "text",
    },
    {
      id: "LAKE-197",
      nameEn: "SNAPSHOT EXPIRATION",
      nameKo: "스냅샷 만료",
      rarity: "R",
      type: "OPS",
      attrs: ["Lakehouse"],
      atk: "스토리지 GC",
      def: "시간여행 보존",
      effect: "오래된 스냅샷·고아 파일 만료. 보존 기간 vs 비용.",
      flavor: "앨범 정리.",
      visual: "snapexp",
      snippet: "expire snapshots",
      detail:
        "시간여행 쿼리 요구와 비용 균형. 만료 중 읽기 쿼리 영향 검토. 자동 유지보수 잡 스케줄.",
      code: `-- maintenance pseudo
-- CALL system.expire_snapshots(table => 'db.t', older_than => ...)
-- CALL system.remove_orphan_files(...)
-- schedule hourly/daily`,
      lang: "sql",
    },
    {
      id: "LAKE-198",
      nameEn: "FLINK + SPARK SHARE TABLE",
      nameKo: "Flink·Spark 공유 테이블",
      rarity: "R",
      type: "OPS",
      attrs: ["Lakehouse"],
      atk: "멀티 엔진",
      def: "스키마 계약",
      effect: "Flink가 쓰고 Spark/Trino가 읽거나 반대. 스키마·파티션 계약을 문서화.",
      flavor: "공동 명의 창고.",
      visual: "multiengine",
      snippet: "shared catalog",
      detail:
        "타입 매핑 미묘한 차이(timestamp, decimal). 파티션 진화. 동시 쓰기 규칙(단일 라이터 권장).",
      code: `// contract doc
// - owner team
// - primary writer: Flink job X
// - readers: Spark Y, Trino Z
// - schema change RFC process
// - freshness SLA`,
      lang: "text",
    },
    {
      id: "LAKE-199",
      nameEn: "PARTITION EVOLUTION",
      nameKo: "파티션 진화",
      rarity: "SR",
      type: "OPS",
      attrs: ["Lakehouse", "Schema"],
      atk: "파티션 키 변경",
      def: "호환",
      effect: "Iceberg 등은 파티션 스펙 진화 지원. 읽기 엔진 버전 확인.",
      flavor: "창고 선반 재배치.",
      visual: "partevo",
      snippet: "partition spec evolve",
      detail:
        "날짜 파티션→시간 파티션 등. 구 파일과 신 스펙 공존. 쿼리 필터가 푸시다운되는지 검증.",
      code: `-- use engine procedures to add partition field
-- backfill optional
-- validate EXPLAIN prune on old/new data`,
      lang: "text",
    },
    {
      id: "LAKE-200",
      nameEn: "LAKEHOUSE EXACTLY ONCE",
      nameKo: "레이크 EO 커밋",
      rarity: "LR",
      type: "OPS",
      attrs: ["Lakehouse", "Semantics"],
      atk: "CP와 커밋",
      def: "가시성",
      effect: "체크포인트 성공과 테이블 커밋을 묶어야 중복/유실 없는 레이크 적재.",
      flavor: "호수에도 2PC 정신.",
      visual: "lakecp",
      snippet: "commit on checkpoint",
      detail:
        "커넥터가 two-phase commit 패턴을 구현. 실패 재시작 시 커밋 idempotency. 커밋 지연=데이터 가시성 지연. 메트릭: commit success/fail.",
      code: `// ensure checkpointing on
env.enableCheckpointing(60_000);
// lake connector options: commit interval aligned with CP
// never disable CP in prod lake writers`,
      lang: "java",
    },

    // ===== Troubleshooting scenarios (mixed) =====
    {
      id: "TS-201",
      nameEn: "TS: WATERMARK STUCK",
      nameKo: "TS: 워터마크 정체",
      rarity: "UR",
      type: "OPS",
      attrs: ["Troubleshoot", "Time"],
      atk: "창 안 닫힘",
      def: "상태 폭증",
      effect: "증상: 윈도우 결과 없음/지연. 원인: idle 파티션, 잘못된 ts, 소스 정지.",
      flavor: "시간이 멈춘 공장.",
      visual: "tswm",
      snippet: "current watermark flatline",
      detail:
        "체크: 소스 레코드 유입, 파티션별 최대 ts, idleness 설정, 추출기 단위(ms/sec), 한산 토픽. 임시 조치: idle 추가. 근본: 프로듀서 시계/스키마.",
      code: `// debug
// 1) UI watermark value over time
// 2) log sample event timestamps
// 3) enable withIdleness
// 4) fix timestamp_assigner units (sec*1000)
// 5) drop broken partitions topic`,
      lang: "text",
    },
    {
      id: "TS-202",
      nameEn: "TS: CP FAIL LOOP",
      nameKo: "TS: 체크포인트 실패 루프",
      rarity: "UR",
      type: "OPS",
      attrs: ["Troubleshoot", "Checkpoint"],
      atk: "정렬 타임아웃",
      def: "잡 불안정",
      effect: "증상: CP 연속 실패, 재시작. 원인: 배압, S3 권한, 상태 과대, TM loss.",
      flavor: "저장 버튼이 먹통.",
      visual: "tscp",
      snippet: "checkpoint failure streak",
      detail:
        "실패 원인 메시지 분류(Timeout/Exception/Rejected). 배압이면 unaligned·병목 수정. 스토리지 5xx/권한. 상태 크기 급증이면 TTL/쿼리 수정. 연속 실패 시 배포 롤백.",
      code: `// triage
// - last failure message
// - alignment duration
// - state size trend
// - TM logs around failure
// - s3/hdfs errors
// actions: fix bottleneck, raise timeout carefully, enable unaligned, shrink state`,
      lang: "text",
    },
    {
      id: "TS-203",
      nameEn: "TS: HOT KEY MELTDOWN",
      nameKo: "TS: 핫 키 용융",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot", "Perf"],
      atk: "단일 서브태스크 100%",
      def: "전체 지연",
      effect: "한 키(대형 테넌트)가 파티션을 녹임. lag·배압·GC 동반.",
      flavor: "인기 창구 하나만 불이 남.",
      visual: "hotkey",
      snippet: "skewed subtask busy",
      detail:
        "UI에서 서브태스크 바쁜 시간 불균형. 살트 2단계 집계, 키 분리 파이프라인, 사전 필터. SQL이면 local-global. 긴급: 문제 키 사이드아웃 드롭(비즈니스 승인).",
      code: `// emergency salt
.keyBy(e -> e.tenantId + "#" + (e.hashCode() & 7))
// then unsalt aggregate
// SQL: two_phase agg / split hot tenant job`,
      lang: "java",
    },
    {
      id: "TS-204",
      nameEn: "TS: STATE EXPLOSION",
      nameKo: "TS: 상태 폭발",
      rarity: "UR",
      type: "OPS",
      attrs: ["Troubleshoot", "State"],
      atk: "RocksDB 디스크 full",
      def: "CP 거대",
      effect: "TTL 없음 regular join / distinct / 넓은 세션이 상태를 무한 성장.",
      flavor: "기억 과다 섭취.",
      visual: "stateboom",
      snippet: "state size ∞",
      detail:
        "어느 연산자 uid 상태가 큰지 메트릭. SQL state ttl, 조인 시간 bound, distinct 제거. 긴급 스케일 디스크. 장기: 쿼리 재설계.",
      code: `SET 'table.exec.state.ttl' = '12 h';
-- replace regular join with interval/temporal/lookup
-- add StateTtlConfig on DataStream states
-- expire lake snapshots separately`,
      lang: "sql",
    },
    {
      id: "TS-205",
      nameEn: "TS: SINK DB OVERLOAD",
      nameKo: "TS: 싱크 DB 과부하",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot", "Sink"],
      atk: "JDBC storm",
      def: "배압 전파",
      effect: "룩업/싱크가 DB를 때려 전체 파이프 배압. timeout·connection pool 고갈.",
      flavor: "호스가 DB를 관통.",
      visual: "dbstorm",
      snippet: "JDBC CPU 100%",
      detail:
        "캐시, 배치 쓰기, 병렬도 제한, async, 백필 분리. DB 쪽 rate limit. 회로차단 패턴.",
      code: `// reduce parallelism on JDBC sink node
// batch inserts / upsert
// lookup cache ttl
// separate realtime vs backfill
// circuit break: side output when error rate high`,
      lang: "text",
    },
    {
      id: "TS-206",
      nameEn: "TS: FULL RESTART STORM",
      nameKo: "TS: 재시작 폭풍",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot"],
      atk: "failure-rate",
      def: "기동 루프",
      effect: "기동 직후 예외→재시작 반복. 설정 오류·클래스·권한·독 메시지.",
      flavor: "문이 안 닫히는 엘리베이터.",
      visual: "restorm",
      snippet: "restart count ↑",
      detail:
        "첫 예외 스택이 진실. 이미지 태그, 시크릿, 토픽 ACL, 스키마. 로컬/스테이징에서 동일 conf 재현. 재시도 늘리기 전에 원인 제거.",
      code: `// look at TaskManager exception history
// disable restart temporarily to see stable error? careful
// fix config/code; don't mask with infinite restarts`,
      lang: "text",
    },
    {
      id: "TS-207",
      nameEn: "TS: SAVEPOINT RESTORE FAIL",
      nameKo: "TS: 세이브포인트 복원 실패",
      rarity: "UR",
      type: "OPS",
      attrs: ["Troubleshoot", "Ops"],
      atk: "uid 불일치",
      def: "배포 롤백",
      effect: "상태 매칭 실패, serializer 비호환, maxParallelism 위반.",
      flavor: "이삿짐 라벨이 다름.",
      visual: "sprestore",
      snippet: "Could not find operator",
      detail:
        "uid 변경 diff 확인. 허용 토폴로지 변경 범위. 스테이징 복원 리허설 부재가 원인인 경우 많음. 플랜 B: 상태 없이 재처리.",
      code: `// compare uids old vs new graph
// restore with -s path on staging first
// if incompatible: rebuild state via replay or State Processor API`,
      lang: "text",
    },
    {
      id: "TS-208",
      nameEn: "TS: LATE DATA SPIKE",
      nameKo: "TS: 늦은 데이터 폭주",
      rarity: "R",
      type: "OPS",
      attrs: ["Troubleshoot", "Time"],
      atk: "허용 지연 초과",
      def: "결과 누락",
      effect: "업스트림 장애 복구 후 늦은 이벤트 폭풍. sideOutput 폭증/드롭.",
      flavor: "뒤늦게 도착한 행렬.",
      visual: "latespike",
      snippet: "late events rate ↑",
      detail:
        "일시적으로 allowedLateness 확대 vs 재처리 잡. 비즈니스 재계산 배치. 프로듀서 시계 점프 조사.",
      code: `// temporary: increase out-of-orderness / lateness
// durable: backfill job for affected time range
// metric: late_count by source`,
      lang: "text",
    },
    {
      id: "TS-209",
      nameEn: "TS: SQL RESULT DUPLICATE",
      nameKo: "TS: SQL 결과 중복",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot", "SQL"],
      atk: "changelog 오해",
      def: "append 싱크",
      effect: "집계 업데이트를 append 토픽에 써 중복 합산. upsert 필요.",
      flavor: "수정본을 새 줄로 착각.",
      visual: "sqldup",
      snippet: "retract to append sink",
      detail:
        "EXPLAIN changelog mode. upsert-kafka/pk sink로 교체. 다운스트림 멱등 키. 이미 오염된 토픽 정리.",
      code: `EXPLAIN CHANGELOG_MODE SELECT user_id, COUNT(*) FROM t GROUP BY user_id;
-- UPSERT/RETRACT => do not use plain kafka append sink`,
      lang: "sql",
    },
    {
      id: "TS-210",
      nameEn: "TS: SLOW CHECKPOINT ONLY",
      nameKo: "TS: 체크포인트만 느림",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot", "Checkpoint"],
      atk: "정렬 vs 업로드",
      def: "처리량은 정상",
      effect: "배리어 정렬 지연 또는 상태 업로드 병목. 지표로 분해.",
      flavor: "일은 하는데 저장이 느림.",
      visual: "slowcp",
      snippet: "alignment vs sync duration",
      detail:
        "alignment long → 배압/언얼라인드. async mode upload long → 상태 크기·스토리지. incremental rocksdb 검토. 네트워크 throttle.",
      code: `// split metrics
// - checkpoint start delay
// - alignment duration
// - sync duration
// - async duration
// optimize the dominant stage only`,
      lang: "text",
    },
    {
      id: "TS-211",
      nameEn: "TS: OOM TASKMANAGER",
      nameKo: "TS: TM OOM",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot", "Memory"],
      atk: "힙/직접메모리",
      def: "킬 루프",
      effect: "힙 상태 과다, 네트워크 버퍼, RocksDB off-heap 설정 미스.",
      flavor: "기억 창고 붕괴.",
      visual: "oom",
      snippet: "Container killed OOM",
      detail:
        "어느 메모리 풀인지 확인. managed fraction, network, heap. 병렬도↓ 응급. 상태 TTL, 객체 재사용. 직접 메모리 리크 의심 시 버전 이슈 노트.",
      code: `# tune
taskmanager.memory.process.size: 4g
# reduce parallelism / split job
# enable rocksdb managed memory
# drop heap state backend for large state`,
      lang: "yaml",
    },
    {
      id: "TS-212",
      nameEn: "TS: CLOCK SKEW PRODUCERS",
      nameKo: "TS: 프로듀서 시계 스큐",
      rarity: "R",
      type: "OPS",
      attrs: ["Troubleshoot", "Time"],
      atk: "미래 타임스탬프",
      def: "WM 점프",
      effect: "일부 서버 시계가 미래/과거로 튀어 워터마크·창이 오동작.",
      flavor: "미래에서 온 클릭.",
      visual: "clockskew",
      snippet: "event_ts >> wall",
      detail:
        "가드: 비정상 ts 필터/사이드아웃. NTP. monotony 가정이 깨진 전략 수정. 메트릭: ts - wall histogram.",
      code: `// reject absurd timestamps
if (Math.abs(eventTs - wall) > Duration.ofHours(1).toMillis()) {
  ctx.output(badTs, e);
  return;
}`,
      lang: "java",
    },
    {
      id: "TS-213",
      nameEn: "TS: CDC DELAY HIGH",
      nameKo: "TS: CDC 지연 큼",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot", "CDC"],
      atk: "빈로그 밀림",
      def: "복제 지연",
      effect: "DB 부하·큰 트랜잭션·스냅샷·네트워크로 CDC lag 증가.",
      flavor: "원장 메아리 지연.",
      visual: "cdclag",
      snippet: "binlog lag minutes",
      detail:
        "DB 쪽 대형 트랜잭션 배치, Flink 배압, 싱크 병목 분해. 테이블 필터로 불필요 테이블 제거. 하드웨어 수직 확장 임시.",
      code: `// measure
// - source fetch delay
// - flink backpressure
// - sink commit lag
// drop unused tables from CDC set`,
      lang: "text",
    },
    {
      id: "TS-214",
      nameEn: "TS: LAKE COMPACTION LAG",
      nameKo: "TS: 레이크 컴팩션 지연",
      rarity: "R",
      type: "OPS",
      attrs: ["Troubleshoot", "Lakehouse"],
      atk: "읽기 성능 저하",
      def: "파일 수 ↑",
      effect: "쓰기 속도 > 컴팩션 속도. 쿼리 계획 시간 폭증.",
      flavor: "청소보다 빠른 쓰레기 투기.",
      visual: "compactlag",
      snippet: "files pending compact",
      detail:
        "컴팩션 병렬 증가, 쓰기 커밋 간격 완화, 전용 컴팩션 리소스 풀. 읽기 SLA 알람.",
      code: `# increase compaction parallelism
# reduce write commit frequency slightly
# isolate compaction cluster
# alert on file count / small file ratio`,
      lang: "text",
    },
    {
      id: "TS-215",
      nameEn: "TS: JOIN STATE SKEW SQL",
      nameKo: "TS: SQL 조인 상태 치우침",
      rarity: "UR",
      type: "OPS",
      attrs: ["Troubleshoot", "SQL"],
      atk: "정규 조인",
      def: "TTL 부재",
      effect: "스트리밍 regular join + 인기 키 = 특정 서브태스크 상태 폭주.",
      flavor: "조인 키가 저주.",
      visual: "joinskeew",
      snippet: "join state skew",
      detail:
        "interval/temporal/lookup으로 전환. state ttl. 핫 키 분리. EXPLAIN join 타입 확인.",
      code: `-- replace unbounded join
-- use temporal/lookup/interval
SET 'table.exec.state.ttl' = '6 h';`,
      lang: "sql",
    },
    {
      id: "TS-216",
      nameEn: "TS: JSON SERDE CPU",
      nameKo: "TS: JSON CPU 과다",
      rarity: "R",
      type: "OPS",
      attrs: ["Troubleshoot", "Perf"],
      atk: "파싱 비용",
      def: "처리량 천장",
      effect: "와이드 JSON 파싱이 CPU bound. 포맷·스키마·프로젝션 최적화.",
      flavor: "문자열 공장 화재.",
      visual: "jsoncpu",
      snippet: "decode CPU 100%",
      detail:
        "Avro/Protobuf 전환, 필요 필드만, 사전 필터 바이츠, 병렬도=CPU 코어 감각. 불필요 ObjectMapper 재생성 금지.",
      code: `// reuse ObjectMapper
// prefer binary formats
// prune fields in format config if supported
// move filter before heavy map`,
      lang: "text",
    },
    {
      id: "TS-217",
      nameEn: "TS: NETWORK BUFFER EXHAUST",
      nameKo: "TS: 네트워크 버퍼 고갈",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot", "Network"],
      atk: "크레딧 기근",
      def: "처리량 붕괴",
      effect: "병렬도·채널 수 대비 네트워크 메모리 부족.",
      flavor: "파이프에 물이 없다.",
      visual: "netbuf",
      snippet: "Insufficient network buffers",
      detail:
        "network memory 증설, 병렬도 조정, 불필요 셔플 감소(SQL exchange). 증상 로그 키워드로 검색.",
      code: `taskmanager.memory.network.fraction: 0.15
taskmanager.memory.network.max: 1g
// reduce shuffle edges / parallelism if needed`,
      lang: "yaml",
    },
    {
      id: "TS-218",
      nameEn: "TS: WRONG TIME ATTRIBUTE",
      nameKo: "TS: 시간 속성 오지정",
      rarity: "SR",
      type: "OPS",
      attrs: ["Troubleshoot", "SQL"],
      atk: "proc vs event",
      def: "창 의미 붕괴",
      effect: "프로ctime 창으로 비즈니스 집계 → 재처리 시 결과 변경.",
      flavor: "시계를 잘못 믿음.",
      visual: "timeattr",
      snippet: "proctime accident",
      detail:
        "DDL WATERMARK 유무 확인. 룩업 조인은 proctime, 분석 창은 event time. 테스트에 재처리 동등성 포함.",
      code: `-- bad for business analytics
GROUP BY TUMBLE(proctime(), INTERVAL '1' HOUR)

-- good
WATERMARK FOR ts AS ...
GROUP BY window TVF on ts`,
      lang: "sql",
    },
    {
      id: "TS-219",
      nameEn: "TS: CONNECTOR VERSION MISMATCH",
      nameKo: "TS: 커넥터 버전 불일치",
      rarity: "R",
      type: "OPS",
      attrs: ["Troubleshoot", "Deploy"],
      atk: "클래스/메서드 없음",
      def: "기동 실패",
      effect: "Flink 마이너와 커넥터 아티팩트 매트릭스 불일치.",
      flavor: "다른 치수의 레고.",
      visual: "vermis",
      snippet: "NoClassDefFoundError",
      detail:
        "공식 호환 표. 플러그인 디렉터리 중복 jar. shade 충돌. 이미지 빌드에 버전 pin.",
      code: `# pin versions in Dockerfile
# flink:1.19.x
# flink-sql-connector-kafka-3.x-for-1.19
# one kafka client version only`,
      lang: "text",
    },
    {
      id: "TS-220",
      nameEn: "TS: SILENT DATA LOSS",
      nameKo: "TS: 조용한 데이터 유실",
      rarity: "LR",
      type: "OPS",
      attrs: ["Troubleshoot", "Semantics"],
      atk: "at-most / drop",
      def: "신뢰 붕괴",
      effect: "워터마크 과공격, 필터 버그, 잘못된 startup mode, 싱크 덮어쓰기.",
      flavor: "없는 줄도 몰랐던 줄.",
      visual: "dataloss",
      snippet: "recon mismatch",
      detail:
        "엔드투엔드 카운트/해시 레콘. 소스 오프셋 vs 싱크 카운트. late drop 메트릭. 설정 변경 감사 로그. 유실 의심 시 즉시 재처리 범위 산정.",
      code: `// recon
// source_count(time_range) vs sink_count
// track dropped_late, filter_out, parse_errors
// freeze deploys until explained`,
      lang: "text",
    },
    {
      id: "SQL-221",
      nameEn: "SQL JOIN HINT MATRIX",
      nameKo: "조인 선택 매트릭스",
      rarity: "SR",
      type: "API",
      attrs: ["SQL", "Join"],
      atk: "패턴 선택",
      def: "상태 모델",
      effect: "lookup/temporal/interval/window/regular 중 요구에 맞는 조인만 고른다.",
      flavor: "조인 병기 선택.",
      visual: "joinmatrix",
      snippet: "choose join type",
      detail:
        "차원 최신=lookup, 이력 시점=temporal, 상대 시간=interval, 같은 버킷=window, regular는 위험 신호. 팀 위키에 매트릭스 고정.",
      code: `-- dim current: lookup join
-- dim history: temporal join
-- correlated in time: interval join
-- same tumble bucket: window join
-- unbounded regular: avoid in streaming`,
      lang: "sql",
    },
    {
      id: "KFK-222",
      nameEn: "KAFKA SOURCE WATERMARK IDLENESS",
      nameKo: "카프카 idle 워터마크",
      rarity: "SR",
      type: "CORE",
      attrs: ["Kafka", "Time"],
      atk: "한산 파티션",
      def: "전역 WM",
      effect: "트래픽 없는 파티션이 전역 워터마크를 붙잡는다. withIdleness 필수 습관.",
      flavor: "조용한 칸이 전체를 멈춤.",
      visual: "idle",
      snippet: "withIdleness",
      detail:
        "파티션 수 많은 토픽에서 특히. idle 시간을 비즈니스 최대 침묵 간격보다 길게. alignment와 함께 튜닝.",
      code: `WatermarkStrategy
  .<E>forBoundedOutOfOrderness(Duration.ofSeconds(5))
  .withIdleness(Duration.ofMinutes(1))
  .withTimestampAssigner((e,t)->e.ts);`,
      lang: "java",
    },
    {
      id: "CDC-223",
      nameEn: "CDC ORDERING KEYS",
      nameKo: "CDC 순서 키",
      rarity: "SR",
      type: "API",
      attrs: ["CDC"],
      atk: "PK 순서",
      def: "최종 일관성",
      effect: "동일 PK 변경 순서가 깨지면 구 버전이 신 버전을 덮을 수 있다.",
      flavor: "늦게 온 과거.",
      visual: "cdcord",
      snippet: "keyBy(pk) preserve",
      detail:
        "소스 병렬 처리 후 키 재분배 시 순서 보장 범위를 이해. 버전 필드/타임스탬프로 충돌 해소. upsert 싱크에서 last-write 규칙.",
      code: `// ensure per-PK ordering where required
// use DB transaction time / binlog pos as version
// sink: ignore older version numbers`,
      lang: "text",
    },
    {
      id: "LAKE-224",
      nameEn: "LAKE READ AUTH",
      nameKo: "레이크 읽기 권한",
      rarity: "N",
      type: "OPS",
      attrs: ["Lakehouse", "Security"],
      atk: "IAM/카탈로그",
      def: "접근 제어",
      effect: "S3 IAM, 카탈로그 ACL, 컬럼 마스킹 정책과 Flink 실행 롤을 맞춘다.",
      flavor: "창고 열쇠 관리.",
      visual: "lakeauth",
      snippet: "IAM role for TM",
      detail:
        "JM/TM 동일 롤 필요 여부, 임시 자격증명, 감사 로그. 최소 권한. 시크릿은 env/secret store.",
      code: `# TM service account -> s3 read/write paths only
# separate prod/dev buckets
# no static keys in SQL files`,
      lang: "text",
    },
    {
      id: "SQL-225",
      nameEn: "SQL END-TO-END TEST",
      nameKo: "SQL 엔드투엔드 테스트",
      rarity: "R",
      type: "OPS",
      attrs: ["SQL", "Dev"],
      atk: "미니 클러스터",
      def: "회귀 방지",
      effect: "테스트 소스→SQL→결과 assert. 워터마크·changelog까지 검증.",
      flavor: "쿼리의 단위 테스트 너머.",
      visual: "sqle2e",
      snippet: "MiniCluster + TableEnvironment",
      detail:
        "고정 입력 이벤트 타임. 기댓값 changelog 포함. 스키마 스냅샷 테스트. CI에서 커넥터는 testcontainers 선택.",
      code: `// TableEnvironment in tests
// tEnv.executeSql("CREATE TABLE ... WITH ('connector'='values')")
// tEnv.executeSql("INSERT INTO out SELECT ...")
// assert collected rows + kinds`,
      lang: "text",
    },
  ];

  window.FLINK_CARDS = (window.FLINK_CARDS || []).concat(cards);
})();
