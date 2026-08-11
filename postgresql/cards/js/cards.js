/** PostgreSQL 18 learning deck — concept + detail + runnable examples. */
const pgCard = (id, type, chapter, level, nameEn, nameKo, content) => ({
  id,
  type,
  chapter,
  level,
  nameEn,
  nameKo,
  lang: "sql",
  ...content,
});

window.POSTGRES_CARDS = [
  // 01 · STARTER (1–6)
  pgCard("STARTER-001", "STARTER", "GETTING STARTED", "FOUNDATION", "WHAT IS POSTGRESQL?", "PostgreSQL이란?", {
    visual: "postgres", icon: "PG", attrs: ["ORDBMS", "Open Source"], atk: "SQL + 객체 확장", def: "트랜잭션 무결성",
    effect: "표준 SQL을 중심으로 타입·함수·연산자·인덱스 방식까지 확장할 수 있는 오픈 소스 객체-관계형 DBMS.",
    flavor: "관계형의 단단함 위에 확장성을 쌓는다.",
    detail: "PostgreSQL은 관계형 테이블과 SQL을 기본으로 하면서 JSONB, 배열, 범위, 사용자 정의 타입 같은 객체-관계형 기능을 제공한다. 외래 키·트리거·뷰·트랜잭션·MVCC가 내장되어 있고 extension으로 기능을 추가할 수 있다. 단순 저장소보다 데이터 규칙과 검색 전략을 함께 표현하는 엔진으로 이해하면 좋다.",
    code: `CREATE TABLE events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kind text NOT NULL,
  payload jsonb NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX events_payload_gin
ON events USING gin (payload);`,
  }),
  pgCard("STARTER-002", "STARTER", "GETTING STARTED", "FOUNDATION", "CLIENT / SERVER", "클라이언트·서버 구조", {
    visual: "client-server", icon: "C/S", attrs: ["Process", "Connection"], atk: "클라이언트 요청", def: "연결별 백엔드",
    effect: "클라이언트가 SQL을 보내면 postgres 서버가 연결을 받고, 해당 세션의 백엔드 프로세스가 쿼리를 실행한다.",
    flavor: "한 서버, 여러 세션, 각자의 작업 공간.",
    detail: "PostgreSQL은 클라이언트/서버 모델을 사용한다. 서버는 데이터 파일과 연결을 관리하고 psql, 웹 서버, GUI 같은 클라이언트는 같은 호스트 또는 TCP/IP 네트워크를 통해 접속한다. 전통적인 프로세스 모델에서는 연결마다 백엔드 프로세스가 생기므로 접속 수가 크면 커넥션 풀을 함께 고려한다.",
    code: `-- 현재 세션의 백엔드 PID
SELECT pg_backend_pid();

-- 접속 중인 세션과 상태
SELECT pid, usename, state, query
FROM pg_stat_activity
WHERE datname = current_database();`,
  }),
  pgCard("STARTER-003", "STARTER", "GETTING STARTED", "FOUNDATION", "CLUSTER → SCHEMA", "클러스터·DB·스키마", {
    snippet: `server cluster
 ├─ database: app
 │   ├─ schema: public
 │   └─ schema: billing
 └─ database: analytics`, icon: "DB", attrs: ["Database", "Schema"], atk: "이름 공간 분리", def: "DB 간 직접 조인 불가",
    effect: "한 서버 클러스터가 여러 데이터베이스를 관리하고, 각 데이터베이스 안에서 스키마가 테이블과 객체의 이름 공간을 나눈다.",
    flavor: "서버는 건물, DB는 층, 스키마는 방.",
    detail: "PostgreSQL 클러스터는 하나의 서버 인스턴스가 관리하는 데이터베이스 모음이다. 연결은 특정 데이터베이스 하나를 대상으로 하며 일반 SQL로 다른 데이터베이스의 테이블을 직접 조인하지 않는다. 스키마는 같은 데이터베이스 안에서 객체 이름 충돌을 막고 권한과 업무 영역을 분리한다. search_path가 한정되지 않으면 예상치 못한 객체가 선택될 수 있다.",
    code: `CREATE DATABASE app_db;

-- app_db에 접속한 뒤
CREATE SCHEMA billing;
CREATE TABLE billing.invoices (
  invoice_id bigint PRIMARY KEY,
  amount numeric(12, 2) NOT NULL
);

SET search_path TO billing, public;`,
  }),
  pgCard("STARTER-004", "STARTER", "GETTING STARTED", "PRACTICE", "PSQL TOOLBELT", "psql 기본 도구", {
    snippet: `\l        databases
\c app    connect
\dt       tables
\d users  describe
\x auto   expanded`, icon: "CLI", attrs: ["psql", "Meta Command"], atk: "빠른 탐색", def: "세미콜론 구분",
    effect: "psql은 SQL 실행뿐 아니라 데이터베이스·테이블 탐색, 파일 실행, 결과 형식 전환을 제공하는 기본 CLI다.",
    flavor: "관리 화면보다 먼저 익혀둘 데이터베이스 셸.",
    detail: "역슬래시로 시작하는 psql 메타 명령은 서버로 보내는 SQL이 아니라 클라이언트가 처리한다. SQL 문은 세미콜론으로 끝나며 \i로 파일을 실행하고 \timing으로 실행 시간을 볼 수 있다. 자동화에는 사람이 읽는 표보다 오류 처리와 종료 코드가 중요하므로 ON_ERROR_STOP을 켜는 습관이 유용하다.",
    code: `\l
\c app_db
\dn
\dt billing.*
\d+ billing.invoices
\timing on

-- 스크립트에서 첫 오류에 중단
\set ON_ERROR_STOP on
\i migrations/001_init.sql`, lang: "psql",
  }),
  pgCard("STARTER-005", "STARTER", "GETTING STARTED", "PRACTICE", "CREATE TABLE", "테이블과 제약조건", {
    visual: "table", icon: "DDL", attrs: ["DDL", "Constraint"], atk: "열 이름 + 타입", def: "데이터 규칙",
    effect: "CREATE TABLE은 저장 모양뿐 아니라 NOT NULL·CHECK·UNIQUE·FOREIGN KEY 같은 데이터 규칙까지 선언한다.",
    flavor: "좋은 스키마는 잘못된 데이터를 입구에서 막는다.",
    detail: "데이터 타입은 저장 형식과 허용 연산을 결정하고 제약조건은 모든 클라이언트에 동일한 무결성을 강제한다. PRIMARY KEY는 행을 식별하며 UNIQUE, NOT NULL, CHECK는 값의 유효성을 보장한다. 참조 관계는 FOREIGN KEY로 표현해 존재하지 않는 부모를 가리키는 행을 막는다.",
    code: `CREATE TABLE accounts (
  account_id bigint GENERATED ALWAYS AS IDENTITY,
  email text NOT NULL,
  balance numeric(14, 2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  CONSTRAINT accounts_pk PRIMARY KEY (account_id),
  CONSTRAINT accounts_email_uk UNIQUE (email),
  CONSTRAINT balance_nonnegative CHECK (balance >= 0),
  CONSTRAINT status_allowed CHECK (status IN ('active','locked'))
);`,
  }),
  pgCard("STARTER-006", "STARTER", "GETTING STARTED", "PRACTICE", "DML + RETURNING", "데이터 변경과 RETURNING", {
    snippet: `INSERT ─┐
UPDATE ─┼─ RETURNING id, ...
DELETE ─┘`, icon: "DML", attrs: ["CRUD", "Returning"], atk: "한 번에 변경+조회", def: "WHERE 누락 주의",
    effect: "INSERT·UPDATE·DELETE 뒤 RETURNING을 붙이면 변경된 행을 별도 SELECT 없이 바로 돌려받을 수 있다.",
    flavor: "바꾼 값을 같은 문장에서 확인한다.",
    detail: "DML은 데이터를 생성·수정·삭제한다. UPDATE와 DELETE에서 WHERE가 빠지면 모든 행이 대상이 되므로 영향 행 수를 확인해야 한다. RETURNING은 생성된 identity, 적용된 기본값, 실제 수정 후 값을 즉시 반환해 왕복과 경쟁 조건을 줄인다.",
    code: `INSERT INTO accounts (email)
VALUES ('learner@example.com')
RETURNING account_id, status, created_at;

UPDATE accounts
SET status = 'locked'
WHERE account_id = 42
RETURNING account_id, status;

DELETE FROM sessions
WHERE expires_at < now()
RETURNING session_id;`,
  }),

  // 02 · SQL (7–14)
  pgCard("SQL-007", "SQL", "QUERYING", "CORE", "SELECT PIPELINE", "SELECT 논리 처리 순서", {
    snippet: `FROM / JOIN
   ↓ WHERE
   ↓ GROUP BY / HAVING
   ↓ SELECT
   ↓ ORDER BY / LIMIT`, icon: "SEL", attrs: ["Query", "Order"], atk: "행을 단계별 변환", def: "별칭 사용 시점",
    effect: "SELECT 문은 작성 순서와 다른 논리 순서로 처리되며, 각 단계가 다음 단계의 입력 행을 만든다.",
    flavor: "먼저 모으고, 거르고, 묶고, 마지막에 보여준다.",
    detail: "FROM이 입력 행을 만들고 WHERE가 개별 행을 거른 뒤 GROUP BY와 HAVING이 그룹을 다룬다. SELECT 목록은 그 이후 계산되고 ORDER BY와 LIMIT가 결과를 정렬·제한한다. 이 순서를 알면 WHERE에서 SELECT 별칭을 바로 쓸 수 없는 이유와 집계 전후 필터 차이를 이해할 수 있다.",
    code: `SELECT customer_id,
       sum(total_amount) AS revenue
FROM orders
WHERE ordered_at >= current_date - 30
GROUP BY customer_id
HAVING sum(total_amount) >= 1000
ORDER BY revenue DESC
LIMIT 10;`,
  }),
  pgCard("SQL-008", "SQL", "QUERYING", "CORE", "JOIN", "JOIN으로 관계 결합", {
    snippet: `customers  1 ─── N  orders
     INNER: 매칭만
      LEFT: 왼쪽 모두`, icon: "JOIN", attrs: ["Inner", "Outer"], atk: "관계 결합", def: "행 폭증 주의",
    effect: "JOIN은 키 관계를 따라 여러 테이블의 행을 결합한다. INNER와 OUTER의 보존 규칙을 구분해야 한다.",
    flavor: "테이블을 나눠 저장하고, 필요할 때 관계로 다시 잇는다.",
    detail: "INNER JOIN은 조건이 맞는 행만 반환하고 LEFT JOIN은 왼쪽 행을 모두 보존하며 매칭이 없으면 오른쪽 열을 NULL로 채운다. 조인 조건이 빠지거나 다대다 관계를 예상하지 못하면 결과 행 수가 폭증한다. 외부 조인의 오른쪽 테이블 필터를 WHERE에 쓰면 의도치 않게 INNER JOIN처럼 바뀔 수 있다.",
    code: `SELECT c.customer_id,
       c.name,
       count(o.order_id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
  ON o.customer_id = c.customer_id
 AND o.status = 'paid'
GROUP BY c.customer_id, c.name;`,
  }),
  pgCard("SQL-009", "SQL", "QUERYING", "CORE", "AGGREGATE", "GROUP BY와 HAVING", {
    snippet: `rows → groups → one row/group
WHERE  : 묶기 전
HAVING : 묶은 후`, icon: "AGG", attrs: ["Group", "Having"], atk: "요약 통계", def: "비그룹 열 제한",
    effect: "집계 함수는 여러 행을 요약하고 GROUP BY는 같은 키의 행을 그룹으로 만든다. HAVING은 그룹 결과를 필터링한다.",
    flavor: "행을 보고 싶으면 SELECT, 집단을 보고 싶으면 GROUP.",
    detail: "count, sum, avg, min, max 같은 집계 함수는 입력 행 집합을 하나의 값으로 줄인다. GROUP BY를 쓰면 그룹마다 결과 행 하나가 만들어지며 SELECT에는 그룹 키 또는 집계식만 직접 둘 수 있다. WHERE는 집계 전에 행을 줄여 성능과 의미에 영향을 주고 HAVING은 계산된 그룹을 거른다.",
    code: `SELECT date_trunc('day', ordered_at) AS day,
       count(*) AS orders,
       sum(total_amount) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY date_trunc('day', ordered_at)
HAVING sum(total_amount) > 10000
ORDER BY day;`,
  }),
  pgCard("SQL-010", "SQL", "QUERYING", "ADVANCED", "WINDOW FUNCTION", "윈도우 함수", {
    snippet: `PARTITION BY customer
ORDER BY ordered_at
rows stay rows
sum(...) OVER (...)`, icon: "WIN", attrs: ["Window", "Rank"], atk: "행 유지형 분석", def: "정렬 비용",
    effect: "윈도우 함수는 행을 그룹당 하나로 줄이지 않고 현재 행 주변의 파티션을 대상으로 순위·누계·이동 값을 계산한다.",
    flavor: "행은 그대로, 시야만 주변으로 넓힌다.",
    detail: "GROUP BY와 달리 윈도우 함수는 원래 행을 유지한다. PARTITION BY는 계산 그룹을, ORDER BY는 그룹 안의 순서를 정하고 프레임은 현재 행에서 어디까지 볼지 정한다. row_number, rank, lag, lead, 누적 sum이 대표적이며 여러 윈도우가 큰 정렬을 요구할 수 있다.",
    code: `SELECT customer_id,
       ordered_at,
       total_amount,
       row_number() OVER (
         PARTITION BY customer_id ORDER BY ordered_at
       ) AS order_no,
       sum(total_amount) OVER (
         PARTITION BY customer_id ORDER BY ordered_at
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM orders;`,
  }),
  pgCard("SQL-011", "SQL", "QUERYING", "ADVANCED", "CTE / WITH", "CTE와 재귀 쿼리", {
    snippet: `WITH base AS (...),
     totals AS (...)
SELECT ... FROM totals;

WITH RECURSIVE tree AS (...)`, icon: "CTE", attrs: ["With", "Recursive"], atk: "단계별 가독성", def: "물질화 판단",
    effect: "WITH는 복잡한 쿼리를 이름 붙인 단계로 분해하고 WITH RECURSIVE는 계층·그래프를 반복 탐색한다.",
    flavor: "긴 쿼리를 사고 과정의 이름으로 나눈다.",
    detail: "CTE는 주 쿼리에서 참조할 임시 결과 이름을 만든다. 재귀 CTE는 비재귀 시작 행과 재귀 항을 UNION으로 연결해 조직도나 카테고리 트리를 순회한다. PostgreSQL은 조건에 따라 CTE를 주 쿼리에 접거나 물질화할 수 있으므로 MATERIALIZED와 NOT MATERIALIZED는 계획을 보고 선택한다.",
    code: `WITH RECURSIVE category_tree AS (
  SELECT category_id, parent_id, name, 0 AS depth
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  SELECT c.category_id, c.parent_id, c.name, t.depth + 1
  FROM categories c
  JOIN category_tree t ON c.parent_id = t.category_id
)
SELECT * FROM category_tree ORDER BY depth, name;`,
  }),
  pgCard("SQL-012", "SQL", "DATA CHANGES", "PRACTICE", "UPSERT", "INSERT ON CONFLICT", {
    snippet: `INSERT
  ├─ no conflict → INSERT
  └─ unique conflict
       ├─ DO NOTHING
       └─ DO UPDATE`, icon: "UPS", attrs: ["Conflict", "Atomic"], atk: "삽입·갱신 원자화", def: "고유 인덱스 필요",
    effect: "ON CONFLICT는 고유 제약 충돌 시 무시하거나 기존 행을 갱신해 애플리케이션의 조회-후-삽입 경쟁을 없앤다.",
    flavor: "먼저 확인하지 말고 충돌 규칙을 선언한다.",
    detail: "존재 여부를 SELECT한 뒤 INSERT하면 두 세션이 동시에 없다고 판단하는 경쟁 조건이 생긴다. UPSERT는 unique index 또는 exclusion constraint가 감지한 충돌을 한 문장 안에서 처리한다. excluded는 삽입하려던 새 값을 가리키고 WHERE를 붙이면 조건부 갱신도 가능하다.",
    code: `INSERT INTO daily_counters (day, hits)
VALUES (current_date, 1)
ON CONFLICT (day)
DO UPDATE
SET hits = daily_counters.hits + EXCLUDED.hits,
    updated_at = now()
RETURNING day, hits;`,
  }),
  pgCard("SQL-013", "SQL", "QUERYING", "CORE", "EXISTS", "EXISTS와 상관 서브쿼리", {
    snippet: `customer row
   ↓ correlated key
EXISTS (matching order?)
   ↓ true / false`, icon: "EX", attrs: ["Subquery", "Semi Join"], atk: "존재 여부 검사", def: "상관 조건 확인",
    effect: "EXISTS는 서브쿼리가 행을 하나라도 반환하는지만 검사해 부모 행의 포함 여부를 표현한다.",
    flavor: "값 전체가 아니라 존재한다는 사실만 묻는다.",
    detail: "EXISTS 안의 SELECT 목록은 보통 중요하지 않고 행 존재 여부만 결과에 영향을 준다. 부모 쿼리의 열을 참조하는 상관 서브쿼리는 각 부모 행과의 관계를 표현하며 플래너가 semi join으로 바꿀 수 있다. NOT IN은 NULL 때문에 뜻밖의 UNKNOWN이 될 수 있어 부재 검사는 NOT EXISTS가 더 명확한 경우가 많다.",
    code: `SELECT c.customer_id, c.name
FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.customer_id
    AND o.status = 'unpaid'
);

-- 주문이 없는 고객
SELECT * FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.customer_id
);`,
  }),
  pgCard("SQL-014", "SQL", "QUERYING", "ADVANCED", "VIEW / MATERIALIZED VIEW", "뷰와 물질화 뷰", {
    snippet: `VIEW = saved query

MATERIALIZED VIEW
 = stored result
 + REFRESH`, icon: "VIEW", attrs: ["Abstraction", "Cache"], atk: "복잡성 캡슐화", def: "신선도 관리",
    effect: "일반 뷰는 저장된 쿼리이고 물질화 뷰는 결과를 물리적으로 저장해 읽기를 빠르게 하는 대신 갱신이 필요하다.",
    flavor: "계산을 감추거나, 계산 결과를 저장하거나.",
    detail: "VIEW는 조회할 때 기반 쿼리를 실행하므로 항상 현재 데이터를 반영하고 권한·인터페이스 경계를 만들기 좋다. MATERIALIZED VIEW는 결과를 저장해 무거운 집계를 빠르게 읽지만 REFRESH 전까지 오래된 데이터를 보여준다. CONCURRENTLY 갱신에는 물질화 뷰의 모든 행을 식별하는 적절한 unique index가 필요하다.",
    code: `CREATE MATERIALIZED VIEW daily_sales AS
SELECT ordered_at::date AS day,
       count(*) AS orders,
       sum(total_amount) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY ordered_at::date;

CREATE UNIQUE INDEX daily_sales_day_idx ON daily_sales (day);
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;`,
  }),

  // 03 · DATA (15–20)
  pgCard("DATA-015", "DATA", "DATA MODELING", "FOUNDATION", "CHOOSE TYPES", "데이터 타입 선택", {
    snippet: `meaning first
money → numeric(14,2)
id    → bigint / uuid
time  → timestamptz
flags → boolean`, icon: "TYPE", attrs: ["Type", "Semantics"], atk: "도메인 의미 표현", def: "암시적 변환 비용",
    effect: "타입은 바이트 크기보다 값의 의미, 허용 연산, 비교 규칙과 검증 범위를 결정하는 스키마의 핵심이다.",
    flavor: "문자열 하나로 다 담을 수 있지만, 아무것도 보장하지 못한다.",
    detail: "integer, numeric, text, date/time, boolean 외에도 PostgreSQL은 UUID, inet, JSONB, array, range 같은 풍부한 기본 타입을 제공한다. 실제 의미와 가장 가까운 타입을 고르면 검증과 연산자를 재사용할 수 있다. 서로 다른 타입의 비교와 캐스팅은 인덱스 사용과 정확성에 영향을 줄 수 있으므로 경계에서 명시적으로 변환한다.",
    code: `CREATE TABLE devices (
  device_id uuid PRIMARY KEY,
  address inet NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  firmware_version text NOT NULL,
  registered_at timestamptz NOT NULL DEFAULT now()
);`,
  }),
  pgCard("DATA-016", "DATA", "DATA MODELING", "CORE", "NUMERIC PRECISION", "정확한 수와 부동소수점", {
    snippet: `numeric → exact, slower
real / double → approximate, fast

0.1 + 0.2
money? use numeric`, icon: "NUM", attrs: ["Numeric", "Precision"], atk: "정확한 십진 계산", def: "CPU·저장 비용",
    effect: "numeric은 정확한 십진 계산을 제공하고 real·double precision은 빠르지만 근사 오차가 있다.",
    flavor: "돈은 근사값이 아니라 장부다.",
    detail: "numeric(p,s)는 정밀도와 소수 자릿수를 제한하며 금융처럼 반올림과 정확성이 중요한 값에 적합하다. 부동소수점은 매우 넓은 범위와 빠른 계산이 장점이지만 이진 표현으로 일부 십진 값을 정확히 담지 못한다. 금액의 통화 규칙과 반올림 시점을 명확히 하고 표시 문자열이 아닌 숫자로 저장한다.",
    code: `CREATE TABLE invoice_lines (
  quantity numeric(12, 3) NOT NULL CHECK (quantity > 0),
  unit_price numeric(14, 2) NOT NULL CHECK (unit_price >= 0),
  line_total numeric(16, 2)
    GENERATED ALWAYS AS (round(quantity * unit_price, 2)) STORED
);

SELECT 0.1::numeric + 0.2::numeric; -- 0.3`,
  }),
  pgCard("DATA-017", "DATA", "DATA MODELING", "CORE", "TIMESTAMPTZ", "시간대와 timestamptz", {
    snippet: `input: 2026-08-11 09:00+09
          ↓ normalize
instant in time
          ↓ display
session TimeZone`, icon: "TIME", attrs: ["Time Zone", "UTC"], atk: "절대 시각 보존", def: "표시 시간대 분리",
    effect: "timestamptz는 특정 순간을 저장하고 세션 TimeZone에 맞춰 표시한다. timestamp는 시간대 없는 벽시계 값이다.",
    flavor: "저장할 것은 순간, 보여줄 것은 지역 시간.",
    detail: "timestamptz는 입력 오프셋을 고려해 절대 시각으로 저장하고 출력할 때 세션 시간대로 변환한다. 회의 시작처럼 세계적으로 같은 순간은 timestamptz가 적합하고 매일 09:00 영업 시작처럼 지역 규칙 자체가 값이면 date, time, 지역 식별자를 함께 모델링해야 한다. 애플리케이션과 DB 세션의 TimeZone을 명시해 해석 차이를 막는다.",
    code: `SET TIME ZONE 'Asia/Seoul';
SELECT '2026-08-11 09:00+09'::timestamptz;

SET TIME ZONE 'UTC';
SELECT '2026-08-11 09:00+09'::timestamptz;

CREATE TABLE appointments (
  starts_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);`,
  }),
  pgCard("DATA-018", "DATA", "DATA MODELING", "ADVANCED", "JSONB", "JSONB 문서", {
    snippet: `json  = original text
jsonb = parsed binary
       + operators
       + GIN index`, icon: "JSON", attrs: ["JSONB", "GIN"], atk: "유연한 속성", def: "스키마 규칙 약화",
    effect: "JSONB는 JSON을 분해된 이진 형태로 저장해 포함·경로 연산과 GIN 인덱싱을 지원한다.",
    flavor: "유연함은 강점이지만, 핵심 관계까지 숨기지는 말자.",
    detail: "json은 입력 텍스트를 보존하고 jsonb는 파싱 비용을 쓰는 대신 처리와 인덱싱에 유리하다. 자주 필터링·조인·제약해야 하는 핵심 속성은 일반 열로 두고 변화가 잦은 부가 속성에 JSONB를 쓰는 혼합 모델이 실용적이다. 문서 업데이트도 행 전체의 새 버전을 만들 수 있으므로 거대한 문서와 잦은 부분 수정은 주의한다.",
    code: `CREATE TABLE products (
  product_id bigint PRIMARY KEY,
  name text NOT NULL,
  attributes jsonb NOT NULL DEFAULT '{}'
);

CREATE INDEX products_attrs_gin
ON products USING gin (attributes);

SELECT product_id, attributes ->> 'color' AS color
FROM products
WHERE attributes @> '{"color":"blue"}';`,
  }),
  pgCard("DATA-019", "DATA", "DATA MODELING", "ADVANCED", "ARRAY / RANGE", "배열과 범위 타입", {
    snippet: `tags text[]
period tstzrange

@> contains
&& overlaps
ANY(array)`, icon: "RNG", attrs: ["Array", "Range"], atk: "다값·구간 표현", def: "정규화 판단",
    effect: "배열은 같은 타입의 값 목록을, range는 시작과 끝이 있는 구간 및 겹침·포함 관계를 표현한다.",
    flavor: "구간은 두 열보다 하나의 범위로 말할 때 강해진다.",
    detail: "배열은 작은 태그 목록처럼 행에 자연스럽게 속하는 다값에 편리하지만 개별 요소가 독립 엔터티라면 관계 테이블이 낫다. range는 경계 포함 여부와 무한 범위를 지원하며 기간 중복 검사에 강하다. exclusion constraint와 GiST를 결합하면 같은 자원의 예약 시간이 겹치는 것을 데이터베이스에서 막을 수 있다.",
    code: `CREATE TABLE room_bookings (
  room_id bigint NOT NULL,
  during tstzrange NOT NULL,
  EXCLUDE USING gist (
    room_id WITH =,
    during WITH &&
  )
);

SELECT * FROM room_bookings
WHERE during @> now();`,
  }),
  pgCard("DATA-020", "DATA", "DATA MODELING", "ADVANCED", "PARTITIONING", "선언적 파티셔닝", {
    snippet: `events (partitioned)
 ├─ events_2026_07
 ├─ events_2026_08  ← prune
 └─ events_2026_09`, icon: "PART", attrs: ["Range", "Pruning"], atk: "큰 테이블 분할", def: "파티션 수 관리",
    effect: "파티셔닝은 한 논리 테이블의 행을 키 규칙에 따라 물리 파티션으로 나누고 불필요한 파티션을 계획에서 제거한다.",
    flavor: "큰 테이블을 날짜별 서랍으로 나누되, 사용자는 한 테이블로 본다.",
    detail: "RANGE, LIST, HASH 파티셔닝을 지원한다. 파티션 프루닝은 조건과 파티션 키를 이용해 읽지 않을 자식을 제외하고 오래된 데이터 삭제는 파티션 detach/drop으로 빠르게 처리할 수 있다. 파티션은 모든 느린 쿼리를 해결하지 않으며 너무 많은 파티션은 계획 시간과 관리 비용을 키운다. 실제 조회와 보존 정책에 맞는 키를 선택한다.",
    code: `CREATE TABLE events (
  event_id bigint GENERATED ALWAYS AS IDENTITY,
  occurred_at timestamptz NOT NULL,
  payload jsonb NOT NULL
) PARTITION BY RANGE (occurred_at);

CREATE TABLE events_2026_08 PARTITION OF events
FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');

CREATE INDEX ON events_2026_08 (occurred_at);`,
  }),

  // 04 · TX (21–28)
  pgCard("TX-021", "TX", "TRANSACTIONS", "CORE", "TRANSACTION", "트랜잭션", {
    visual: "transaction", icon: "TX", attrs: ["Atomic", "Commit"], atk: "BEGIN → COMMIT", def: "실패 시 ROLLBACK",
    effect: "서로 관련된 여러 SQL 문을 하나의 전부-아니면-전무 작업으로 묶어 중간 실패와 불완전한 공개를 막는다.",
    flavor: "송금은 두 번의 수정이 아니라 하나의 사건이다.",
    detail: "트랜잭션의 변경은 COMMIT될 때 하나의 단위로 공개되고 오류나 조건 위반이면 ROLLBACK으로 취소한다. PostgreSQL은 BEGIN이 없는 개별 SQL도 각각 암묵적 트랜잭션으로 처리한다. 트랜잭션은 비즈니스 무결성에 필요한 만큼만 짧게 유지하고 외부 API 대기나 사용자 입력을 안에 넣지 않는다.",
    code: `BEGIN;

UPDATE accounts SET balance = balance - 100
WHERE account_id = 1 AND balance >= 100;

UPDATE accounts SET balance = balance + 100
WHERE account_id = 2;

COMMIT;
-- 실패하거나 영향 행 수가 예상과 다르면 ROLLBACK;`,
  }),
  pgCard("TX-022", "TX", "CONCURRENCY", "CORE", "MVCC SNAPSHOT", "다중 버전 동시성 제어", {
    visual: "mvcc", icon: "MV", attrs: ["Snapshot", "Version"], atk: "일관된 스냅샷", def: "행 버전 정리 필요",
    effect: "MVCC는 행의 여러 버전을 이용해 각 SQL 문에 일관된 스냅샷을 제공하고 읽기와 쓰기의 잠금 충돌을 줄인다.",
    flavor: "같은 행을 보되, 각 세션은 자기 시간에서 본다.",
    detail: "UPDATE는 기존 행을 즉시 덮어쓰기보다 새 버전을 만들고 스냅샷은 자신에게 보이는 버전을 선택한다. 일반 SELECT는 UPDATE를 막지 않고 UPDATE도 SELECT를 막지 않는다. 오래된 버전은 어떤 활성 스냅샷에도 필요 없어진 뒤 VACUUM이 재사용 가능하게 만들며 긴 트랜잭션은 이 정리를 늦출 수 있다.",
    code: `-- 세션 A
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE account_id = 1; -- 1000

-- 세션 B
UPDATE accounts SET balance = 900 WHERE account_id = 1;
COMMIT;

-- 세션 A는 같은 스냅샷에서 여전히 1000
SELECT balance FROM accounts WHERE account_id = 1;
COMMIT;`,
  }),
  pgCard("TX-023", "TX", "CONCURRENCY", "CORE", "READ COMMITTED", "Read Committed", {
    snippet: `default isolation
statement 1 → snapshot A
statement 2 → snapshot B
no dirty reads`, icon: "RC", attrs: ["Default", "Statement Snapshot"], atk: "높은 동시성", def: "문장마다 값 변화 가능",
    effect: "기본 격리 수준 Read Committed에서는 각 SQL 문이 시작할 때 새 스냅샷을 얻어 같은 트랜잭션의 연속 SELECT가 다른 결과를 볼 수 있다.",
    flavor: "한 문장 안에서는 일관되지만, 다음 문장은 새 현재를 본다.",
    detail: "커밋되지 않은 변경은 보이지 않지만 다른 트랜잭션이 커밋하면 다음 문장은 그 결과를 볼 수 있다. 단순한 단일 행 변경에는 빠르고 적합하지만 여러 문장에 걸쳐 같은 조회 결과를 전제로 한 비즈니스 규칙은 깨질 수 있다. UPDATE가 경쟁 행을 만나면 선행 트랜잭션을 기다린 뒤 최신 행에 WHERE 조건을 다시 평가한다.",
    code: `BEGIN; -- 기본 READ COMMITTED
SELECT balance FROM accounts WHERE account_id = 1; -- 1000

-- 다른 세션이 900으로 바꾸고 COMMIT

SELECT balance FROM accounts WHERE account_id = 1; -- 900 가능
COMMIT;

SHOW transaction_isolation;`,
  }),
  pgCard("TX-024", "TX", "CONCURRENCY", "ADVANCED", "REPEATABLE READ", "Repeatable Read", {
    snippet: `transaction starts
      ↓ one snapshot
SELECT A ───────── SELECT A
concurrent commits hidden`, icon: "RR", attrs: ["Stable View", "Retry"], atk: "트랜잭션 전체 스냅샷", def: "동시 수정 실패 가능",
    effect: "Repeatable Read는 트랜잭션의 첫 데이터 문장 시점 스냅샷을 유지해 연속 조회가 같은 데이터 보기를 사용한다.",
    flavor: "트랜잭션 동안 세상을 한 장의 사진으로 고정한다.",
    detail: "PostgreSQL의 Repeatable Read는 nonrepeatable read뿐 아니라 phantom read도 막지만 serialization anomaly는 가능하다. 시작 후 다른 트랜잭션이 바꾼 행을 수정하려 하면 직렬화 실패로 현재 트랜잭션이 취소될 수 있다. 애플리케이션은 오류를 잡아 전체 트랜잭션을 처음부터 재시도해야 한다.",
    code: `BEGIN ISOLATION LEVEL REPEATABLE READ;

SELECT count(*) FROM orders WHERE status = 'open';
-- 다른 세션이 open 주문을 추가하고 COMMIT
SELECT count(*) FROM orders WHERE status = 'open';
-- 첫 SELECT와 같은 스냅샷

COMMIT;
-- SQLSTATE 40001 발생 시 전체 트랜잭션 재시도`,
  }),
  pgCard("TX-025", "TX", "CONCURRENCY", "ADVANCED", "SERIALIZABLE", "Serializable과 재시도", {
    snippet: `concurrent transactions
        ↓ dependency check
serial order possible?
 yes → COMMIT
 no  → 40001 retry`, icon: "SER", attrs: ["SSI", "Retry"], atk: "가장 강한 격리", def: "모니터링·재시도 비용",
    effect: "Serializable은 성공한 동시 트랜잭션 결과가 어떤 직렬 실행 순서와 같도록 보장하고 불가능한 조합을 중단시킨다.",
    flavor: "잘못된 동시 결과 대신 한 트랜잭션을 다시 한다.",
    detail: "PostgreSQL은 Serializable Snapshot Isolation로 읽기/쓰기 의존성을 추적해 직렬화 이상을 감지한다. 단순히 모든 작업을 순서대로 잠그는 방식은 아니므로 동시성은 유지되지만 SQLSTATE 40001이 발생할 수 있다. 재시도는 마지막 문장이 아니라 트랜잭션 전체를 새 스냅샷에서 다시 실행해야 하며 부수 효과는 커밋 뒤에 수행한다.",
    code: `BEGIN ISOLATION LEVEL SERIALIZABLE;

SELECT sum(amount) INTO ...
FROM ledger
WHERE account_id = 42;

INSERT INTO audit_summary(account_id, total)
VALUES (42, ...);

COMMIT;
-- could not serialize access (40001) → 전체 재시도`,
  }),
  pgCard("TX-026", "TX", "CONCURRENCY", "PRACTICE", "ROW LOCK", "행 잠금과 작업 큐", {
    snippet: `SELECT ... FOR UPDATE
  ├─ wait
  ├─ NOWAIT → fail fast
  └─ SKIP LOCKED → next job`, icon: "LOCK", attrs: ["For Update", "Skip Locked"], atk: "경쟁 행 독점", def: "대기·처리량 저하",
    effect: "SELECT FOR UPDATE는 선택한 행을 잠가 다른 트랜잭션의 경쟁 변경을 대기시키며 NOWAIT와 SKIP LOCKED로 대기 전략을 고른다.",
    flavor: "읽고 바꿀 행이라면, 읽는 순간부터 차례를 잡는다.",
    detail: "행 잠금은 같은 행을 수정하거나 잠그는 트랜잭션끼리 충돌하지만 일반 SELECT는 막지 않는다. SKIP LOCKED는 잠긴 작업을 건너뛰어 여러 워커가 큐를 나눠 처리할 때 유용하나 전체적으로 일관된 조회 결과를 주지는 않는다. 잠금은 COMMIT 또는 ROLLBACK까지 유지되므로 트랜잭션을 짧게 한다.",
    code: `BEGIN;

SELECT job_id, payload
FROM jobs
WHERE status = 'ready'
ORDER BY created_at
FOR UPDATE SKIP LOCKED
LIMIT 1;

UPDATE jobs SET status = 'running'
WHERE job_id = :job_id;

COMMIT;`,
  }),
  pgCard("TX-027", "TX", "CONCURRENCY", "ADVANCED", "DEADLOCK", "데드락", {
    snippet: `TX A: lock row 1 → waits row 2
         ↑              ↓
TX B: waits row 1 ← lock row 2

cycle → one aborted`, icon: "DL", attrs: ["Cycle", "Ordering"], atk: "자동 감지", def: "한 트랜잭션 취소",
    effect: "서로 상대가 가진 잠금을 기다리는 순환이 생기면 PostgreSQL이 감지해 한 트랜잭션을 중단한다.",
    flavor: "잠금 순서를 통일하면 기다림의 원을 끊을 수 있다.",
    detail: "데드락은 단순한 긴 대기가 아니라 기다림 그래프의 순환이다. 서버는 deadlock_timeout 이후 검사해 한 참여자를 abort시키므로 애플리케이션은 실패를 처리해야 한다. 가장 좋은 예방은 모든 코드 경로가 자원을 같은 순서로 잠그고 한 번에 필요한 행을 정렬해 선택하며 트랜잭션 범위를 줄이는 것이다.",
    code: `-- 두 계정을 항상 작은 ID부터 잠근다
SELECT account_id
FROM accounts
WHERE account_id IN (:from_id, :to_id)
ORDER BY account_id
FOR UPDATE;

-- 이후 잔액 변경
UPDATE accounts SET balance = balance - :amount
WHERE account_id = :from_id;
UPDATE accounts SET balance = balance + :amount
WHERE account_id = :to_id;`,
  }),
  pgCard("TX-028", "TX", "MAINTENANCE", "CORE", "VACUUM", "VACUUM과 Autovacuum", {
    snippet: `UPDATE / DELETE
   ↓ dead tuples
VACUUM
   ├─ reusable space
   ├─ visibility map
   └─ XID freeze`, icon: "VAC", attrs: ["MVCC", "Autovacuum"], atk: "죽은 행 공간 재사용", def: "I/O와 튜닝",
    effect: "VACUUM은 더 이상 보이지 않는 행 버전을 정리해 공간을 재사용하고 visibility map과 XID 동결 상태를 유지한다.",
    flavor: "MVCC가 만든 과거를 안전한 시점에 청소한다.",
    detail: "일반 VACUUM은 테이블 파일을 보통 운영체제에 반환하지 않고 내부 재사용 가능 공간으로 표시하며 운영 쿼리와 병행할 수 있다. VACUUM FULL은 파일을 다시 써서 축소하지만 ACCESS EXCLUSIVE 잠금과 추가 공간이 필요하다. Autovacuum은 변경량에 따라 VACUUM과 ANALYZE를 자동 실행하며 꺼두기보다 바쁜 테이블별 임계값을 조정하는 편이 안전하다.",
    code: `VACUUM (VERBOSE, ANALYZE) orders;

SELECT relname,
       n_live_tup,
       n_dead_tup,
       last_autovacuum,
       autovacuum_count
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- VACUUM FULL은 일상 작업이 아니다`,
  }),

  // 05 · INDEX (29–34)
  pgCard("INDEX-029", "INDEX", "QUERY PERFORMANCE", "CORE", "EXPLAIN", "실행 계획 읽기", {
    visual: "index", icon: "PLAN", attrs: ["Planner", "Analyze"], atk: "계획·실측 비교", def: "ANALYZE는 실제 실행",
    effect: "EXPLAIN은 플래너가 고른 노드와 예상 비용·행 수를 보여주고 ANALYZE는 쿼리를 실제 실행해 실측치를 추가한다.",
    flavor: "느린 SQL은 추측하지 말고 계획과 실제 행 수를 비교한다.",
    detail: "플래너는 통계와 비용 파라미터로 Seq Scan, Index Scan, Join, Sort 등의 조합을 선택한다. 핵심은 가장 시간이 큰 노드뿐 아니라 estimated rows와 actual rows의 차이를 찾는 것이다. EXPLAIN ANALYZE는 데이터 변경문도 실제 실행하므로 필요하면 BEGIN 안에서 실행 후 ROLLBACK한다. BUFFERS는 캐시·디스크 페이지 접근을 보여준다.",
    code: `EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT o.order_id, c.name
FROM orders o
JOIN customers c USING (customer_id)
WHERE o.ordered_at >= now() - interval '7 days'
  AND o.status = 'paid';

-- estimated rows와 actual rows 차이가 크면
ANALYZE orders;`,
  }),
  pgCard("INDEX-030", "INDEX", "INDEXES", "CORE", "B-TREE", "B-tree 인덱스", {
    snippet: `          [50]
       /        \
   [10..40]   [60..90]

=  <  <=  >=  >  ORDER BY`, icon: "BT", attrs: ["B-tree", "Range"], atk: "동등·범위·정렬", def: "쓰기마다 유지 비용",
    effect: "기본 B-tree 인덱스는 정렬된 구조로 동등 비교, 범위 조건, 정렬, 접두 패턴 검색에 널리 사용된다.",
    flavor: "가장 먼저 떠올릴 기본 인덱스, 모든 쿼리의 자동 답은 아니다.",
    detail: "CREATE INDEX의 기본 방식은 B-tree다. 선택도가 높은 조건은 적은 페이지를 따라가 빠르게 찾지만 테이블의 큰 비율을 읽는 쿼리는 Seq Scan이 더 저렴할 수 있다. 인덱스는 INSERT와 키 열 UPDATE 때 유지되며 공간을 차지하므로 실제 쿼리 패턴과 계획으로 효용을 확인한다.",
    code: `CREATE INDEX orders_customer_created_idx
ON orders (customer_id, ordered_at DESC);

SELECT order_id, ordered_at, total_amount
FROM orders
WHERE customer_id = 42
  AND ordered_at >= current_date - 30
ORDER BY ordered_at DESC
LIMIT 20;`,
  }),
  pgCard("INDEX-031", "INDEX", "INDEXES", "ADVANCED", "MULTICOLUMN INDEX", "복합 인덱스", {
    snippet: `INDEX (a, b, c)

a = ?                 ✓
a = ? AND b > ?       ✓
b = ?                 △

leading columns matter`, icon: "MULTI", attrs: ["Composite", "Leading"], atk: "필터+정렬 결합", def: "열 순서 중요",
    effect: "복합 B-tree는 선두 열 조건이 탐색 범위를 좁히며 열 순서는 자주 함께 쓰는 동등 조건·범위·정렬에 맞춘다.",
    flavor: "인덱스 열은 목록이 아니라 탐색 순서다.",
    detail: "(a,b,c) 인덱스는 일반적으로 a의 동등 조건부터 가장 효율적으로 범위를 제한한다. 첫 범위 조건 뒤 열은 인덱스에서 검사될 수 있어도 스캔 구간을 크게 줄이지 못할 수 있다. 모든 조합을 위한 거대한 복합 인덱스보다 실제 핵심 쿼리를 기준으로 설계하고 INCLUDE로 반환 열만 덧붙이는 방법도 고려한다.",
    code: `CREATE INDEX orders_lookup_idx
ON orders (customer_id, status, ordered_at DESC)
INCLUDE (total_amount);

SELECT ordered_at, total_amount
FROM orders
WHERE customer_id = 42
  AND status = 'paid'
ORDER BY ordered_at DESC
LIMIT 10;`,
  }),
  pgCard("INDEX-032", "INDEX", "INDEXES", "ADVANCED", "PARTIAL / EXPRESSION", "부분·표현식 인덱스", {
    snippet: `partial: WHERE status = 'open'
expression: lower(email)

smaller + query-specific`, icon: "PX", attrs: ["Partial", "Expression"], atk: "핵심 행·계산값 최적화", def: "쿼리 식 일치 필요",
    effect: "부분 인덱스는 조건에 맞는 행만 저장하고 표현식 인덱스는 계산 결과를 키로 저장한다.",
    flavor: "모든 데이터를 색인하지 말고, 실제 찾는 형태를 색인한다.",
    detail: "부분 인덱스는 드문 상태나 활성 데이터만 대상으로 크기와 쓰기 비용을 줄인다. 플래너가 쿼리 조건이 인덱스 predicate를 함의한다고 판단할 수 있어야 사용된다. 표현식 인덱스는 lower(email) 같은 함수 결과 검색을 빠르게 하고 unique로 대소문자 무시 고유성도 강제할 수 있지만 변경 때 계산 비용이 든다.",
    code: `CREATE INDEX jobs_ready_idx
ON jobs (created_at)
WHERE status = 'ready';

CREATE UNIQUE INDEX users_email_ci_uk
ON users (lower(email));

SELECT user_id
FROM users
WHERE lower(email) = lower('Learner@Example.com');`,
  }),
  pgCard("INDEX-033", "INDEX", "INDEXES", "ADVANCED", "GIN", "GIN 역색인", {
    snippet: `term / key → matching rows

"blue" → [1, 8, 42]
"sale" → [3, 8, 19]

JSONB · array · full text`, icon: "GIN", attrs: ["Inverted", "Containment"], atk: "다값 내부 검색", def: "쓰기·빌드 비용",
    effect: "GIN은 문서·배열 안의 여러 구성 요소에서 해당 값을 포함한 행 목록을 찾아 JSONB, 배열, 전문 검색에 적합하다.",
    flavor: "행에서 값을 찾지 않고, 값에서 행 목록을 찾는다.",
    detail: "B-tree가 행마다 정렬 가능한 키를 다루는 데 강하다면 GIN은 한 행의 여러 키나 토큰을 역색인한다. jsonb의 포함 연산 @>, 배열 포함, tsvector 전문 검색이 대표적이다. 읽기에는 강하지만 항목 수가 많아 인덱스 생성과 쓰기 비용이 크므로 필요한 연산자 클래스와 쿼리를 기준으로 선택한다.",
    code: `CREATE INDEX products_attrs_gin
ON products USING gin (attributes jsonb_path_ops);

SELECT product_id, name
FROM products
WHERE attributes @> '{"color":"blue","size":"M"}';

CREATE INDEX articles_search_gin
ON articles USING gin (to_tsvector('simple', title || ' ' || body));`,
  }),
  pgCard("INDEX-034", "INDEX", "INDEXES", "ADVANCED", "BRIN", "BRIN 블록 범위 인덱스", {
    snippet: `heap pages
[1..128]  min 2026-01 / max 2026-02
[129..]   min 2026-02 / max 2026-03

tiny summaries, lossy scan`, icon: "BRIN", attrs: ["Block Range", "Huge Table"], atk: "매우 작은 인덱스", def: "물리 순서 상관성 필요",
    effect: "BRIN은 연속한 테이블 블록의 최소·최대 같은 요약을 저장해 물리 순서와 값이 상관된 초대형 테이블을 작게 색인한다.",
    flavor: "모든 행의 위치 대신, 이 블록에 있을 가능성만 기록한다.",
    detail: "시간 순으로 append되는 로그처럼 값과 물리 위치가 잘 정렬된 테이블에서 BRIN은 B-tree보다 훨씬 작은 크기로 많은 블록을 건너뛸 수 있다. 요약이 손실형이라 후보 블록 안의 행은 다시 검사한다. 상관성이 낮거나 결과가 매우 선택적인 일반 OLTP 조회에는 B-tree가 더 적합할 수 있다.",
    code: `CREATE INDEX events_occurred_brin
ON events USING brin (occurred_at)
WITH (pages_per_range = 64);

SELECT count(*)
FROM events
WHERE occurred_at >= '2026-08-01'
  AND occurred_at <  '2026-09-01';

SELECT brin_summarize_new_values('events_occurred_brin');`,
  }),

  // 06 · OPS (35–40)
  pgCard("OPS-035", "OPS", "SECURITY", "CORE", "ROLE / PRIVILEGE", "역할과 최소 권한", {
    snippet: `login role → group role → privileges

app_user → app_readwrite
analyst  → app_readonly

GRANT, REVOKE`, icon: "ROLE", attrs: ["Role", "Grant"], atk: "최소 권한", def: "소유권·기본 권한 관리",
    effect: "PostgreSQL 역할은 사용자와 그룹을 통합한 개념이며 객체 권한을 역할에 부여하고 로그인 역할을 멤버로 만든다.",
    flavor: "사람에게 테이블 권한을 직접 주지 말고 역할을 설계한다.",
    detail: "LOGIN 속성이 있는 역할은 접속할 수 있고 그렇지 않은 역할은 권한 묶음으로 쓰기 좋다. 객체 소유자는 강한 권한을 가지므로 애플리케이션 런타임 역할과 마이그레이션 소유 역할을 분리한다. 새로 생성될 객체의 권한은 ALTER DEFAULT PRIVILEGES로 별도 설정하며 public에 불필요한 권한이 없는지 확인한다.",
    code: `CREATE ROLE app_readonly;
GRANT USAGE ON SCHEMA app TO app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA app TO app_readonly;

CREATE ROLE analyst LOGIN PASSWORD 'use-a-secret-manager';
GRANT app_readonly TO analyst;

ALTER DEFAULT PRIVILEGES IN SCHEMA app
GRANT SELECT ON TABLES TO app_readonly;`,
  }),
  pgCard("OPS-036", "OPS", "SECURITY", "CORE", "PG_HBA.CONF", "클라이언트 인증 규칙", {
    snippet: `connection attempt
  ↓ first matching hba line
TYPE DB USER ADDRESS METHOD
host app app 10.0.0.0/8 scram`, icon: "HBA", attrs: ["Auth", "SCRAM"], atk: "접속 출처·방식 제어", def: "첫 매칭 규칙",
    effect: "pg_hba.conf는 연결 유형, 데이터베이스, 사용자, 주소에 따라 인증 방법을 정하며 위에서 처음 일치한 한 줄만 적용한다.",
    flavor: "가장 구체적인 문을 위에 두고, 넓은 문은 아래에 둔다.",
    detail: "host 규칙은 TCP/IP, local은 Unix 소켓 연결을 다룬다. 규칙은 fallback 목록이 아니므로 첫 일치가 실패해도 다음 줄로 가지 않는다. 비밀번호 인증은 SCRAM-SHA-256을 우선하고 네트워크 경계와 TLS 요구를 함께 설계한다. 파일 변경 뒤 reload하고 pg_hba_file_rules 뷰로 문법 오류를 확인할 수 있다.",
    code: `# TYPE    DATABASE  USER      ADDRESS       METHOD
hostssl   app_db    app_user  10.20.0.0/16  scram-sha-256
hostssl   all       dba       10.10.1.0/24  scram-sha-256
local     all       postgres                peer

-- 적용과 검사
SELECT pg_reload_conf();
SELECT line_number, type, database, user_name, address, auth_method, error
FROM pg_hba_file_rules;`, lang: "conf + sql",
  }),
  pgCard("OPS-037", "OPS", "RELIABILITY", "CORE", "WAL / CHECKPOINT", "WAL과 체크포인트", {
    snippet: `change
  ↓ WAL record flushed first
COMMIT acknowledged
  ↓ later
dirty pages → data files

checkpoint = recovery start point`, icon: "WAL", attrs: ["Durability", "Recovery"], atk: "장애 후 재생", def: "쓰기·보관량 관리",
    effect: "Write-Ahead Logging은 데이터 페이지보다 변경 로그를 먼저 영구 기록해 장애 후 WAL 재생으로 일관된 상태를 복구한다.",
    flavor: "데이터를 쓰기 전에, 무엇을 바꿀지 먼저 기록한다.",
    detail: "커밋은 필요한 WAL이 안정 저장소에 기록된 뒤 성공으로 보고될 수 있고 실제 데이터 페이지 쓰기는 뒤따를 수 있다. 체크포인트는 모든 이전 변경이 데이터 파일에 반영된 복구 기준점을 만든다. 너무 잦으면 쓰기 I/O가 몰리고 너무 드물면 WAL 공간과 복구 시간이 늘어 checkpoint_timeout, max_wal_size와 관측 지표를 함께 조정한다.",
    code: `SELECT pg_current_wal_lsn();

SELECT checkpoints_timed,
       checkpoints_req,
       checkpoint_write_time,
       checkpoint_sync_time,
       buffers_checkpoint
FROM pg_stat_checkpointer;

CHECKPOINT; -- 운영에서 습관적으로 실행하지 않는다`,
  }),
  pgCard("OPS-038", "OPS", "BACKUP & RECOVERY", "CORE", "BACKUP / PITR", "백업과 시점 복구", {
    snippet: `base backup + WAL archive
          ↓ restore
replay WAL ──────┤ target time
                 stop

restore test = real backup`, icon: "BKP", attrs: ["Base Backup", "PITR"], atk: "원하는 시점 복구", def: "WAL 연속성 필수",
    effect: "논리 백업은 객체와 데이터를 SQL 형태로 옮기고 물리 기본 백업과 WAL 보관은 클러스터를 특정 시점으로 복구한다.",
    flavor: "백업의 성공 기준은 생성이 아니라 복원이다.",
    detail: "pg_dump는 데이터베이스 단위의 선택적 이관과 버전 이동에 유용하고 pg_basebackup은 클러스터의 물리 사본을 만든다. PITR은 기본 백업 이후의 연속된 WAL을 재생해 장애나 실수 직전 시점에 멈춘다. RPO와 RTO를 정하고 정기적으로 별도 환경에서 복원·검증하지 않은 백업은 신뢰할 수 없다.",
    code: `# 논리 백업과 복원
pg_dump -Fc -d app_db -f app_db.dump
createdb app_restore
pg_restore -d app_restore app_db.dump

# 물리 기본 백업
pg_basebackup -D /backup/base -Fp -Xs -P

# 복구 설정 예
restore_command = 'cp /archive/%f %p'
recovery_target_time = '2026-08-11 12:34:00+09'`, lang: "shell + conf",
  }),
  pgCard("OPS-039", "OPS", "HIGH AVAILABILITY", "ADVANCED", "REPLICATION", "물리·논리 복제", {
    snippet: `physical streaming
primary ─WAL→ standby

logical replication
publisher ─rows→ subscriber`, icon: "REPL", attrs: ["Streaming", "Logical"], atk: "HA·읽기 분산·이관", def: "지연·충돌·DDL 관리",
    effect: "물리 스트리밍 복제는 WAL을 재생해 동일 클러스터 사본을 만들고 논리 복제는 publication의 행 변경을 subscriber에 적용한다.",
    flavor: "같은 바이트를 복제할지, 선택한 데이터 변경을 복제할지.",
    detail: "물리 복제는 전체 인스턴스 수준 HA와 읽기 전용 standby에 적합하고 주·대기 서버 버전과 저장 구조 제약을 받는다. 논리 복제는 테이블 단위 선택, 버전 간 이관, 데이터 배포에 유용하지만 스키마 정의와 시퀀스 상태가 자동으로 모두 동기화되는 것은 아니다. 둘 다 복제 지연, WAL 보존, failover 절차를 관측하고 반복 훈련해야 한다.",
    code: `-- publisher
CREATE PUBLICATION app_pub
FOR TABLE customers, orders;

-- subscriber
CREATE SUBSCRIPTION app_sub
CONNECTION 'host=primary dbname=app user=repl password=...'
PUBLICATION app_pub;

-- 물리 복제 지연 관측 (primary)
SELECT application_name, state, sync_state,
       pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS replay_lag_bytes
FROM pg_stat_replication;`,
  }),
  pgCard("OPS-040", "OPS", "OBSERVABILITY", "CORE", "PG_STAT_*", "세션과 성능 모니터링", {
    snippet: `pg_stat_activity → sessions / waits
pg_stat_database → DB totals
pg_stat_user_tables → table activity
pg_stat_user_indexes → index usage`, icon: "STAT", attrs: ["Monitoring", "Wait Event"], atk: "현재 병목 가시화", def: "누적값·스냅샷 해석",
    effect: "통계 뷰는 세션 상태, 대기 이벤트, 테이블·인덱스 활동, 체크포인트와 복제 상태를 관찰하는 운영의 출발점이다.",
    flavor: "CPU가 높다는 사실보다, 무엇을 기다리는지 먼저 본다.",
    detail: "pg_stat_activity에서 active 쿼리, idle in transaction, wait_event를 보고 pg_locks와 결합해 차단 관계를 찾는다. 통계는 누적 카운터가 많아 절대값보다 시간 구간의 변화율과 기준선을 비교해야 한다. 느린 쿼리 분석에는 pg_stat_statements 확장이 유용하며 queryid별 호출 수와 총·평균 실행 시간을 제공한다.",
    code: `SELECT pid,
       now() - query_start AS runtime,
       state,
       wait_event_type,
       wait_event,
       left(query, 100) AS query
FROM pg_stat_activity
WHERE datname = current_database()
  AND pid <> pg_backend_pid()
ORDER BY runtime DESC;

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;`,
  }),

  // 07 · ADVANCED SQL (41–48)
  pgCard("SQL-041", "SQL", "ADVANCED QUERYING", "ADVANCED", "DISTINCT ON", "그룹별 최신 한 행", {
    snippet: `DISTINCT ON (customer_id)
ORDER BY customer_id,
         ordered_at DESC

→ latest row per customer`, icon: "D1", attrs: ["Distinct On", "Top-1"], atk: "그룹별 대표 행", def: "ORDER BY 결합 필수",
    effect: "PostgreSQL의 DISTINCT ON은 지정한 키마다 정렬상 첫 행 하나를 남겨 그룹별 최신·최대 행 조회를 간결하게 만든다.",
    flavor: "그룹을 접되, 어떤 한 장을 남길지 정렬로 결정한다.",
    detail: "DISTINCT ON 표현식은 ORDER BY의 왼쪽 표현식과 맞아야 하며 그 뒤 정렬 열이 그룹에서 어떤 행을 선택할지 결정한다. 정렬이 없으면 선택 행은 예측할 수 없다. 적절한 (그룹 키, 정렬 키 DESC) 인덱스와 결합하면 최신 상태 조회에 강하지만 모든 DBMS에 있는 표준 문법은 아니다.",
    code: `SELECT DISTINCT ON (customer_id)
       customer_id,
       order_id,
       ordered_at,
       status
FROM orders
ORDER BY customer_id, ordered_at DESC, order_id DESC;

CREATE INDEX orders_latest_idx
ON orders (customer_id, ordered_at DESC, order_id DESC);`,
  }),
  pgCard("SQL-042", "SQL", "ADVANCED QUERYING", "ADVANCED", "KEYSET PAGINATION", "키셋 페이지네이션", {
    snippet: `OFFSET 100000 → skip 100000

WHERE (time,id) < (:time,:id)
ORDER BY time DESC, id DESC
LIMIT 20`, icon: "PAGE", attrs: ["Cursor", "Row Compare"], atk: "깊은 페이지 일정 비용", def: "임의 페이지 이동 어려움",
    effect: "키셋 페이지네이션은 마지막 정렬 키 이후 행을 조건으로 찾아 큰 OFFSET의 스캔 비용과 동시 변경 흔들림을 줄인다.",
    flavor: "몇 장을 건너뛸지보다, 마지막으로 본 행 다음을 묻는다.",
    detail: "OFFSET은 앞 행을 결과에서 버려도 서버가 찾아야 하므로 페이지가 깊어질수록 느려진다. 유일하고 안정적인 정렬을 만들기 위해 시간과 PK 같은 tie-breaker를 함께 사용한다. 커서에는 마지막 키 값을 담고 같은 복합 인덱스 순서로 조회한다.",
    code: `SELECT order_id, ordered_at, total_amount
FROM orders
WHERE (ordered_at, order_id)
    < (:last_ordered_at, :last_order_id)
ORDER BY ordered_at DESC, order_id DESC
LIMIT 20;

CREATE INDEX orders_feed_idx
ON orders (ordered_at DESC, order_id DESC);`,
  }),
  pgCard("SQL-043", "SQL", "ADVANCED QUERYING", "ADVANCED", "LATERAL", "LATERAL 조인", {
    snippet: `for each customer c
   ↓ pass c.id
LATERAL subquery
   ORDER BY time DESC
   LIMIT 3`, icon: "LAT", attrs: ["Lateral", "Per-row"], atk: "행별 서브쿼리", def: "반복 실행 비용",
    effect: "LATERAL은 FROM의 앞 항목 열을 뒤 서브쿼리에서 참조하게 해 각 부모별 상위 N개나 집합 반환 함수 결과를 결합한다.",
    flavor: "왼쪽의 한 행을 오른쪽 쿼리의 입력값으로 보낸다.",
    detail: "일반 FROM 서브쿼리는 형제 항목을 볼 수 없지만 LATERAL은 왼쪽 행마다 평가되며 그 값을 사용할 수 있다. LEFT JOIN LATERAL ... ON true는 결과가 없는 부모도 보존한다. 부모 행이 많으면 반복 비용이 커질 수 있으므로 자식 검색 인덱스가 중요하다.",
    code: `SELECT c.customer_id, recent.order_id, recent.ordered_at
FROM customers c
LEFT JOIN LATERAL (
  SELECT o.order_id, o.ordered_at
  FROM orders o
  WHERE o.customer_id = c.customer_id
  ORDER BY o.ordered_at DESC
  LIMIT 3
) AS recent ON true;`,
  }),
  pgCard("SQL-044", "SQL", "ANALYTICS", "ADVANCED", "GROUPING SETS", "ROLLUP·CUBE·GROUPING SETS", {
    snippet: `detail  (region, product)
subtotal(region)
total   ()

one scan → multiple levels`, icon: "CUBE", attrs: ["Rollup", "Cube"], atk: "다단계 집계", def: "결과 행·해석 복잡도",
    effect: "GROUPING SETS는 한 쿼리에서 여러 GROUP BY 수준을 계산하고 ROLLUP과 CUBE는 계층 소계와 모든 조합을 생성한다.",
    flavor: "상세·소계·총계를 같은 스캔에서 만든다.",
    detail: "ROLLUP(a,b)는 (a,b), (a), () 수준을 만들고 CUBE는 가능한 모든 부분집합을 만든다. 집계가 만든 NULL과 실제 데이터 NULL을 구분하려면 GROUPING 함수를 사용한다. 차원이 많을수록 CUBE 결과가 급증하므로 필요한 수준만 GROUPING SETS로 명시하는 편이 안전하다.",
    code: `SELECT region,
       product_category,
       sum(revenue) AS revenue,
       GROUPING(region) AS is_all_regions,
       GROUPING(product_category) AS is_all_products
FROM sales
GROUP BY GROUPING SETS (
  (region, product_category),
  (region),
  ()
);`,
  }),
  pgCard("SQL-045", "SQL", "DATA CHANGES", "ADVANCED", "MERGE", "조건부 MERGE", {
    snippet: `source JOIN target
  MATCHED → UPDATE / DELETE
  NOT MATCHED → INSERT
  NOT MATCHED BY SOURCE → ...`, icon: "MRG", attrs: ["Merge", "Conditional DML"], atk: "소스 기반 동기화", def: "동시 고유 충돌 주의",
    effect: "MERGE는 소스와 대상의 매칭 상태와 조건에 따라 INSERT·UPDATE·DELETE 동작을 한 문장에 기술한다.",
    flavor: "행마다 매칭 상태를 분류하고 첫 번째 맞는 행동을 실행한다.",
    detail: "MERGE는 각 후보 변경 행에 대해 WHEN 절을 순서대로 평가하고 첫 번째 참 조건의 동작을 수행한다. UPSERT보다 여러 동작과 소스 기반 동기화에 유연하지만 동시 삽입 충돌을 자동으로 재평가해 항상 insert-or-update를 보장하는 것은 아니다. 조인 조건이 대상 한 행과 여러 번 매칭되지 않도록 소스를 정제한다.",
    code: `MERGE INTO inventory AS t
USING staging_inventory AS s
ON t.sku = s.sku
WHEN MATCHED AND s.deleted THEN
  DELETE
WHEN MATCHED THEN
  UPDATE SET quantity = s.quantity, updated_at = now()
WHEN NOT MATCHED THEN
  INSERT (sku, quantity) VALUES (s.sku, s.quantity);`,
  }),
  pgCard("SQL-046", "SQL", "BULK DATA", "PRACTICE", "COPY", "COPY 대량 입출력", {
    snippet: `file / STDIN
     ⇅ COPY
 PostgreSQL table

\copy = client-side file`, icon: "COPY", attrs: ["Bulk", "CSV"], atk: "고속 대량 적재", def: "검증·오류 처리 설계",
    effect: "COPY는 테이블과 파일 또는 표준 입출력 사이에서 행을 스트리밍해 반복 INSERT보다 효율적으로 대량 데이터를 이동한다.",
    flavor: "한 행씩 왕복하지 말고 데이터 흐름을 연다.",
    detail: "서버 COPY의 파일 경로는 DB 서버 기준이며 권한이 필요하고 psql의 \copy는 클라이언트 파일을 STDIN/STDOUT으로 전달한다. CSV 옵션, NULL 표현, 인코딩을 명시하고 staging 테이블에 먼저 적재한 뒤 검증·변환·병합하는 패턴이 안전하다. COPY도 트랜잭션 안에서 실행할 수 있다.",
    code: `CREATE TEMP TABLE staging_orders
(LIKE orders INCLUDING DEFAULTS);

\copy staging_orders(customer_id,total_amount,ordered_at)
FROM 'orders.csv'
WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

INSERT INTO orders(customer_id,total_amount,ordered_at)
SELECT customer_id,total_amount,ordered_at
FROM staging_orders
WHERE total_amount >= 0;`, lang: "psql + sql",
  }),
  pgCard("SQL-047", "SQL", "SEARCH", "ADVANCED", "FULL TEXT SEARCH", "전문 검색", {
    snippet: `document → to_tsvector
query    → websearch_to_tsquery
             ↓ @@
rank + headline`, icon: "FTS", attrs: ["tsvector", "tsquery"], atk: "언어 기반 토큰 검색", def: "사전·구성 선택",
    effect: "전문 검색은 문서를 정규화된 lexeme 벡터로 만들고 tsquery와 매칭해 단순 LIKE보다 언어적인 검색을 제공한다.",
    flavor: "문자열 포함이 아니라 단어의 검색 형태를 비교한다.",
    detail: "to_tsvector는 문서를 파싱·정규화하고 tsquery는 AND, OR, NOT과 접두 검색을 표현한다. GIN 인덱스로 @@ 매칭을 가속하며 ts_rank와 ts_headline으로 순위와 강조를 만들 수 있다. 언어 설정과 사전은 stemming과 stop word 처리에 직접 영향을 준다.",
    code: `ALTER TABLE articles ADD COLUMN search tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('simple', coalesce(title,'')), 'A') ||
  setweight(to_tsvector('simple', coalesce(body,'')),  'B')
) STORED;

CREATE INDEX articles_search_gin ON articles USING gin(search);

SELECT title, ts_rank(search, q) AS rank
FROM articles, websearch_to_tsquery('simple', :term) q
WHERE search @@ q ORDER BY rank DESC;`,
  }),
  pgCard("SQL-048", "SQL", "QUERY COMPOSITION", "ADVANCED", "SET OPERATIONS", "UNION·INTERSECT·EXCEPT", {
    snippet: `A UNION B      A ∪ B
A INTERSECT B  A ∩ B
A EXCEPT B     A − B

ALL keeps duplicates`, icon: "SET", attrs: ["Union", "Except"], atk: "결과 집합 결합", def: "중복 제거 비용",
    effect: "집합 연산은 열 수와 호환 타입이 같은 두 쿼리 결과를 합치거나 공통·차집합으로 만든다.",
    flavor: "테이블 관계뿐 아니라 쿼리 결과끼리도 집합 연산한다.",
    detail: "UNION은 기본적으로 중복을 제거하고 UNION ALL은 그대로 이어 붙여 더 빠르다. INTERSECT는 양쪽에 있는 행, EXCEPT는 왼쪽에만 있는 행을 반환한다. 연산자 결합 우선순위와 LIMIT 적용 범위를 명확히 하려면 괄호를 사용하고 중복 제거가 필요하지 않으면 ALL을 선택한다.",
    code: `-- 현재 고객과 과거 고객의 이메일 전체
SELECT email FROM active_customers
UNION ALL
SELECT email FROM archived_customers;

-- 가입했지만 주문한 적 없는 고객
SELECT customer_id FROM customers
EXCEPT
SELECT customer_id FROM orders;`,
  }),

  // 08 · SERVER PROGRAMMING (49–56)
  pgCard("PROGRAM-049", "PROGRAM", "SERVER PROGRAMMING", "CORE", "SQL FUNCTION", "SQL 함수", {
    snippet: `CREATE FUNCTION f(args)
RETURNS TABLE (...)
LANGUAGE sql
STABLE
AS $$ query $$`, icon: "FN", attrs: ["Function", "Set Returning"], atk: "재사용 가능한 DB 로직", def: "권한·search_path 주의",
    effect: "SQL 함수는 매개변수와 반환 타입을 가진 쿼리 단위를 만들고 스칼라·복합 행·행 집합을 반환할 수 있다.",
    flavor: "데이터 가까이에 두되, 계약과 비용을 분명히 한다.",
    detail: "단순 SQL 함수는 플래너가 인라이닝할 수 있어 재사용성과 성능을 함께 얻기도 한다. RETURNS TABLE과 SETOF는 FROM에서 테이블처럼 사용할 수 있다. SECURITY DEFINER는 호출자보다 강한 권한으로 실행될 수 있으므로 고정된 안전한 search_path와 최소 소유 권한이 필수다.",
    code: `CREATE FUNCTION recent_orders(p_customer_id bigint, p_limit int DEFAULT 10)
RETURNS TABLE(order_id bigint, ordered_at timestamptz, amount numeric)
LANGUAGE sql
STABLE
AS $$
  SELECT o.order_id, o.ordered_at, o.total_amount
  FROM orders o
  WHERE o.customer_id = p_customer_id
  ORDER BY o.ordered_at DESC
  LIMIT p_limit
$$;`,
  }),
  pgCard("PROGRAM-050", "PROGRAM", "SERVER PROGRAMMING", "ADVANCED", "PL/PGSQL", "PL/pgSQL 제어 흐름", {
    snippet: `DECLARE variables
BEGIN
  IF / CASE
  LOOP
  SELECT INTO
  EXCEPTION
END`, icon: "PL", attrs: ["Procedure", "Control Flow"], atk: "절차적 서버 로직", def: "숨은 복잡성·테스트",
    effect: "PL/pgSQL은 변수, 조건, 반복, 동적 SQL, 예외 처리를 제공해 여러 SQL 단계를 서버 함수·프로시저로 묶는다.",
    flavor: "SQL로 표현하기 어려운 흐름만 절차형으로 보완한다.",
    detail: "집합 기반 SQL로 해결할 수 있는 작업을 행 단위 루프로 바꾸면 성능이 나빠질 수 있다. SELECT INTO STRICT는 정확히 한 행을 요구하고 FOUND로 영향 여부를 확인한다. EXCEPTION 블록은 하위 트랜잭션 비용이 있으므로 정상 분기 수단으로 남용하지 않고 동적 식별자는 format의 %I, 값은 USING으로 안전하게 처리한다.",
    code: `CREATE FUNCTION lock_account(p_id bigint)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE current_status text;
BEGIN
  SELECT status INTO STRICT current_status
  FROM accounts WHERE account_id = p_id FOR UPDATE;

  IF current_status <> 'locked' THEN
    UPDATE accounts SET status = 'locked' WHERE account_id = p_id;
  END IF;
END
$$;`,
  }),
  pgCard("PROGRAM-051", "PROGRAM", "SERVER PROGRAMMING", "ADVANCED", "VOLATILITY", "IMMUTABLE·STABLE·VOLATILE", {
    snippet: `IMMUTABLE: same args → same forever
STABLE: same within statement
VOLATILE: may change every call

planner trust contract`, icon: "VOL", attrs: ["Planner", "Snapshot"], atk: "최적화 가능성 선언", def: "잘못 표기 시 오답",
    effect: "함수 변동성 표시는 결과가 언제 바뀔 수 있는지 플래너와 약속해 상수 접기, 호출 횟수, 인덱스 사용에 영향을 준다.",
    flavor: "속도 힌트가 아니라 함수 의미에 대한 계약이다.",
    detail: "IMMUTABLE은 같은 입력이면 영원히 같은 결과여야 하며 인덱스 표현식에 사용할 수 있다. STABLE은 한 SQL 문 안에서 같은 결과를 기대하며 데이터 조회 함수에 흔하다. VOLATILE은 기본값으로 호출마다 변할 수 있고 데이터 변경도 가능하다. 실제보다 강하게 표시하면 준비된 계획이나 인덱스에서 오래된 결과를 재사용해 틀린 답을 낼 수 있다.",
    code: `CREATE FUNCTION normalize_email(text)
RETURNS text
LANGUAGE sql
IMMUTABLE PARALLEL SAFE
RETURN lower(trim($1));

CREATE UNIQUE INDEX users_email_normalized_uk
ON users (normalize_email(email));

-- now()는 STABLE, clock_timestamp()는 VOLATILE`,
  }),
  pgCard("PROGRAM-052", "PROGRAM", "SERVER PROGRAMMING", "ADVANCED", "TRIGGER", "트리거", {
    snippet: `INSERT / UPDATE / DELETE
        ↓ BEFORE / AFTER
  FOR EACH ROW / STATEMENT
        ↓ trigger function`, icon: "TRG", attrs: ["Trigger", "Transition"], atk: "변경에 자동 반응", def: "숨은 부작용·재귀",
    effect: "트리거는 테이블 변경 전후 또는 문장 단위에 자동 실행되어 값 보정, 감사, 파생 작업을 구현한다.",
    flavor: "자동화는 강력하지만 호출 지점이 SQL 밖에 숨는다.",
    detail: "BEFORE ROW 트리거는 NEW를 바꾸거나 행 처리를 건너뛸 수 있고 AFTER 트리거는 최종 변경을 기반으로 후속 작업에 적합하다. statement trigger와 transition table은 대량 변경 전체를 집합으로 다룬다. 제약조건으로 표현 가능한 규칙은 제약을 우선하고 트리거 체인, 실행 순서, 복제 환경을 문서화한다.",
    code: `CREATE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := clock_timestamp();
  RETURN NEW;
END
$$;

CREATE TRIGGER accounts_set_updated_at
BEFORE UPDATE ON accounts
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();`,
  }),
  pgCard("PROGRAM-053", "PROGRAM", "SECURITY", "ADVANCED", "ROW LEVEL SECURITY", "행 수준 보안 RLS", {
    snippet: `SELECT * FROM documents
        ↓ policy
tenant_id = current_setting(...)
        ↓
only allowed rows`, icon: "RLS", attrs: ["Policy", "Tenant"], atk: "행 단위 접근 통제", def: "소유자·우회 권한 주의",
    effect: "RLS 정책은 역할과 명령별로 어떤 기존 행을 볼 수 있고 어떤 새 행을 만들 수 있는지 서버에서 제한한다.",
    flavor: "WHERE를 잊어도 경계가 남도록 데이터 옆에 정책을 둔다.",
    detail: "USING은 조회·수정 대상 기존 행을, WITH CHECK는 INSERT·UPDATE가 만든 새 행을 검증한다. RLS를 켜고 적용 정책이 없으면 기본 거부다. 테이블 소유자와 BYPASSRLS 역할은 보통 우회하므로 런타임 역할을 분리하고 FORCE ROW LEVEL SECURITY 필요성을 검토한다. 세션 tenant 값은 신뢰할 수 있는 서버 코드만 설정해야 한다.",
    code: `ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON documents
USING (
  tenant_id = current_setting('app.tenant_id')::bigint
)
WITH CHECK (
  tenant_id = current_setting('app.tenant_id')::bigint
);

SET LOCAL app.tenant_id = '42';`,
  }),
  pgCard("PROGRAM-054", "PROGRAM", "DATA DEFINITION", "ADVANCED", "GENERATED COLUMN", "생성 열과 도메인", {
    snippet: `base columns → expression → generated

domain = base type + reusable constraint

derived value + reusable meaning`, icon: "GEN", attrs: ["Generated", "Domain"], atk: "파생·도메인 규칙 재사용", def: "불변식 제약",
    effect: "생성 열은 다른 열에서 항상 계산되고 도메인은 기본 타입에 재사용 가능한 제약과 의미를 부여한다.",
    flavor: "반복 계산은 열로, 반복 규칙은 도메인으로 이름 붙인다.",
    detail: "PostgreSQL 18은 virtual과 stored generated column을 제공한다. 생성식은 현재 행과 immutable 함수만 사용하며 직접 값을 쓸 수 없다. 도메인은 여러 테이블에 같은 형식·검증을 재사용하지만 NULL과 제약 의미를 신중히 설계하고 도메인 제약 변경이 기존 데이터 검증에 미치는 영향을 고려한다.",
    code: `CREATE DOMAIN email_address AS text
CHECK (VALUE = lower(VALUE) AND position('@' IN VALUE) > 1);

CREATE TABLE order_lines (
  email email_address NOT NULL,
  quantity numeric(12,3) NOT NULL,
  unit_price numeric(14,2) NOT NULL,
  total numeric(16,2)
    GENERATED ALWAYS AS (round(quantity * unit_price, 2)) STORED
);`,
  }),
  pgCard("PROGRAM-055", "PROGRAM", "EXTENSIBILITY", "ADVANCED", "EXTENSION / FDW", "확장과 외부 데이터 래퍼", {
    snippet: `CREATE EXTENSION
 functions · types · operators · indexes

FDW
remote source ↔ foreign table`, icon: "EXT", attrs: ["Extension", "FDW"], atk: "엔진 기능 확장", def: "신뢰·버전·푸시다운",
    effect: "extension은 관련 객체를 패키지로 설치·업데이트하고 FDW는 외부 데이터 소스를 로컬 foreign table처럼 연결한다.",
    flavor: "PostgreSQL의 경계는 테이블에서 끝나지 않는다.",
    detail: "확장은 함수, 타입, 연산자, 인덱스 방식까지 서버 안에 추가할 수 있어 설치 코드를 신뢰해야 한다. 버전 업 전 호환성과 백업 복원 경로를 확인한다. postgres_fdw는 원격 PostgreSQL 쿼리를 가능한 만큼 pushdown하지만 네트워크 비용, 원격 통계, 분산 트랜잭션 한계를 숨기지는 않는다.",
    code: `CREATE EXTENSION postgres_fdw;

CREATE SERVER analytics_remote
FOREIGN DATA WRAPPER postgres_fdw
OPTIONS (host 'analytics-db', dbname 'warehouse');

CREATE USER MAPPING FOR app_user
SERVER analytics_remote OPTIONS (user 'reader', password '...');

IMPORT FOREIGN SCHEMA public LIMIT TO (daily_metrics)
FROM SERVER analytics_remote INTO external;`,
  }),
  pgCard("PROGRAM-056", "PROGRAM", "EVENTS", "ADVANCED", "LISTEN / NOTIFY", "비동기 알림", {
    snippet: `session A: LISTEN orders

TX B: NOTIFY orders, payload
      COMMIT
        ↓
session A receives`, icon: "NTF", attrs: ["Notify", "Async"], atk: "가벼운 변경 신호", def: "영속 큐가 아님",
    effect: "LISTEN/NOTIFY는 채널을 구독한 세션에 커밋 후 작은 payload 알림을 보내 폴링을 줄인다.",
    flavor: "데이터는 테이블에, 알림은 다시 읽으라는 신호로.",
    detail: "NOTIFY는 트랜잭션이 커밋되어야 전달되고 동일 트랜잭션의 같은 채널·payload 알림은 접힐 수 있다. 메시지는 영속 로그가 아니며 수신자가 끊겨 있으면 재전달되지 않는다. 따라서 payload에 전체 업무 데이터를 넣기보다 ID를 보내고 소비자가 테이블에서 상태를 다시 읽는 패턴이 안전하다.",
    code: `-- 소비자 연결
LISTEN order_events;

-- 생산자 트랜잭션
BEGIN;
INSERT INTO orders(customer_id, total_amount)
VALUES (42, 120.00)
RETURNING order_id;
SELECT pg_notify('order_events', '{"order_id":123}');
COMMIT;

-- 영속 처리가 필요하면 outbox 테이블을 함께 사용`,
  }),

  // 09 · INTERNALS & PLANNER (57–68)
  pgCard("INTERNAL-057", "INTERNAL", "PHYSICAL STORAGE", "INTERNAL", "HEAP PAGE", "힙·페이지·튜플", {
    snippet: `relation file
 └─ 8KB pages
     ├─ page header
     ├─ item pointers → tuples
     └─ free space`, icon: "HEAP", attrs: ["Page", "Tuple"], atk: "물리 저장 이해", def: "MVCC 버전 누적",
    effect: "일반 테이블은 정렬되지 않은 heap relation이며 고정 크기 페이지 안의 item pointer가 가변 길이 tuple 위치를 가리킨다.",
    flavor: "SQL의 행 아래에는 페이지와 포인터, 행 버전이 있다.",
    detail: "PostgreSQL 기본 블록은 보통 8KB이며 테이블 파일은 페이지 배열이다. 인덱스는 heap tuple의 물리 위치 CTID를 가리킨다. UPDATE로 새 tuple 버전이 다른 위치에 생길 수 있고 VACUUM이 죽은 버전을 정리한다. CTID는 진단에는 유용하지만 UPDATE·VACUUM 후 바뀔 수 있어 영구 키로 쓰면 안 된다.",
    code: `SELECT ctid, xmin, xmax, account_id, balance
FROM accounts
WHERE account_id = 42;

SELECT pg_relation_size('accounts') AS heap_bytes,
       pg_indexes_size('accounts') AS index_bytes,
       pg_total_relation_size('accounts') AS total_bytes;`,
  }),
  pgCard("INTERNAL-058", "INTERNAL", "MVCC INTERNALS", "INTERNAL", "TUPLE VISIBILITY", "xmin·xmax와 가시성", {
    snippet: `tuple header
xmin = creating XID
xmax = deleting/updating XID
hint bits + snapshot
        ↓ visible?`, icon: "XID", attrs: ["xmin", "Snapshot"], atk: "행 버전 가시성 판단", def: "XID wraparound",
    effect: "각 행 버전 헤더의 생성·종료 트랜잭션 정보와 스냅샷이 현재 세션에서 그 버전이 보이는지 결정한다.",
    flavor: "삭제는 즉시 사라짐이 아니라, 보이지 않게 되는 버전이다.",
    detail: "xmin은 tuple을 만든 XID, xmax는 삭제하거나 잠근 XID와 관련된다. 서버는 commit 상태와 현재 스냅샷을 함께 보아 가시성을 판단하고 hint bit로 반복 확인 비용을 줄인다. XID는 32비트 순환 공간이므로 VACUUM freeze가 오래된 행을 모든 미래 트랜잭션에 보이는 것으로 안전하게 표시한다.",
    code: `SELECT xmin, xmax, ctid, *
FROM accounts
WHERE account_id = 42;

SELECT datname,
       age(datfrozenxid) AS xid_age
FROM pg_database
ORDER BY xid_age DESC;

-- 시스템 열은 관찰용이며 업무 식별자로 사용하지 않는다`,
  }),
  pgCard("INTERNAL-059", "INTERNAL", "PHYSICAL STORAGE", "INTERNAL", "TOAST", "큰 값의 TOAST 저장", {
    snippet: `wide tuple > page target
      ↓ compress
      ↓ out-of-line chunks
main tuple holds pointer

text · jsonb · bytea`, icon: "TOAST", attrs: ["Compression", "Out-of-line"], atk: "큰 값 자동 처리", def: "부분 접근·갱신 비용",
    effect: "TOAST는 한 페이지에 넣기 어려운 가변 길이 값을 압축하거나 별도 TOAST 테이블의 작은 청크로 분리한다.",
    flavor: "큰 열은 본문 밖으로 접어 두고 행에는 참조를 남긴다.",
    detail: "PostgreSQL은 큰 text, bytea, jsonb 값을 자동으로 압축하거나 out-of-line 저장해 일반 행을 페이지에 맞춘다. 값이 필요할 때 detoast 비용이 들고 큰 문서의 작은 수정도 새 값을 만들 수 있다. SELECT *로 불필요한 큰 열을 읽지 않고 pg_column_size와 relation 크기로 실제 저장 특성을 확인한다.",
    code: `SELECT id,
       pg_column_size(payload) AS stored_bytes,
       octet_length(payload::text) AS logical_bytes
FROM events
ORDER BY stored_bytes DESC
LIMIT 20;

SELECT reltoastrelid::regclass AS toast_table
FROM pg_class
WHERE oid = 'events'::regclass;`,
  }),
  pgCard("INTERNAL-060", "INTERNAL", "MVCC INTERNALS", "INTERNAL", "HOT UPDATE", "Heap-Only Tuple 업데이트", {
    snippet: `indexed cols unchanged
 + same page has space
        ↓ HOT update
index entry → tuple chain
no new index entries`, icon: "HOT", attrs: ["Update", "Fillfactor"], atk: "인덱스 갱신 회피", def: "페이지 여유 공간 필요",
    effect: "HOT는 인덱스가 참조하는 열이 바뀌지 않고 같은 heap 페이지에 공간이 있을 때 새 인덱스 항목 없이 행 버전을 연결한다.",
    flavor: "인덱스 키를 건드리지 않으면 heap 안에서 버전을 이어 붙인다.",
    detail: "자주 갱신되는 비인덱스 열이 있고 페이지에 여유가 있으면 HOT가 쓰기 증폭과 index bloat를 줄인다. fillfactor를 낮추면 페이지에 업데이트 공간을 남길 수 있지만 테이블 크기는 커진다. pg_stat_user_tables의 n_tup_hot_upd 비율로 관찰하고 필요 없는 인덱스가 HOT 기회를 막는지 확인한다.",
    code: `ALTER TABLE sessions SET (fillfactor = 80);

SELECT relname,
       n_tup_upd,
       n_tup_hot_upd,
       round(100.0 * n_tup_hot_upd / nullif(n_tup_upd,0), 1) AS hot_pct
FROM pg_stat_user_tables
WHERE relname = 'sessions';

-- indexed column 변경은 HOT가 될 수 없다`,
  }),
  pgCard("INTERNAL-061", "INTERNAL", "INDEX INTERNALS", "INTERNAL", "VISIBILITY MAP", "Visibility map과 Index Only Scan", {
    snippet: `index entry
   ↓ VM all-visible?
 yes → return from index
 no  → heap fetch visibility check

VACUUM maintains VM`, icon: "VM", attrs: ["All Visible", "Covering"], atk: "heap 접근 회피", def: "최근 변경 페이지는 불리",
    effect: "visibility map의 all-visible 비트는 현재·미래 트랜잭션에 페이지의 모든 tuple이 보인다고 알려 index-only scan이 heap 확인을 건너뛰게 한다.",
    flavor: "인덱스에 값이 있어도, 보이는 행인지 증명해야 heap을 건너뛴다.",
    detail: "PostgreSQL 인덱스에는 MVCC 가시성 정보가 없으므로 일반 index scan은 heap tuple을 확인한다. VACUUM이 all-visible 페이지를 표시하면 covering index만으로 결과를 낼 수 있다. 갱신이 잦은 테이블은 비트가 자주 지워져 index-only 효과가 낮고 EXPLAIN의 Heap Fetches로 실제 이득을 확인한다.",
    code: `CREATE INDEX orders_cover_idx
ON orders (customer_id, ordered_at DESC)
INCLUDE (status, total_amount);

VACUUM (ANALYZE) orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT ordered_at, status, total_amount
FROM orders
WHERE customer_id = 42
ORDER BY ordered_at DESC LIMIT 20;`,
  }),
  pgCard("INTERNAL-062", "INTERNAL", "QUERY PLANNER", "INTERNAL", "PLANNER STATISTICS", "플래너 통계", {
    snippet: `ANALYZE sample
 ├─ null fraction
 ├─ n_distinct
 ├─ most common values
 └─ histogram bounds
      ↓ row estimate`, icon: "HIST", attrs: ["Analyze", "Selectivity"], atk: "행 수 추정", def: "표본·분포 변화 오차",
    effect: "ANALYZE가 수집한 값 분포 통계는 조건 선택도와 중간 결과 행 수를 추정해 조인 순서와 스캔 방식을 결정한다.",
    flavor: "플래너는 데이터를 전부 보지 않고 표본과 분포로 미래 행 수를 예측한다.",
    detail: "pg_stats는 null 비율, distinct 추정, MCV, histogram, 상관성 등을 보여준다. 예상 행 수가 크게 틀리면 잘못된 join과 메모리 크기 선택으로 이어진다. 데이터가 급변한 뒤 ANALYZE를 실행하고 치우친 중요 열은 ALTER COLUMN SET STATISTICS로 더 자세한 표본을 수집할 수 있다.",
    code: `ANALYZE orders;

SELECT attname, null_frac, n_distinct,
       most_common_vals, histogram_bounds, correlation
FROM pg_stats
WHERE schemaname = 'public'
  AND tablename = 'orders';

ALTER TABLE orders
ALTER COLUMN status SET STATISTICS 500;
ANALYZE orders(status);`,
  }),
  pgCard("INTERNAL-063", "INTERNAL", "QUERY PLANNER", "INTERNAL", "EXTENDED STATISTICS", "다변량 통계", {
    snippet: `city and postal_code correlated

independent estimate ✗
dependencies / mcv / ndistinct
extended stats ✓`, icon: "MSTAT", attrs: ["Dependencies", "MCV"], atk: "열 상관관계 추정", def: "명시 생성·ANALYZE 필요",
    effect: "확장 통계는 여러 열의 함수 종속, 공통 값 조합, distinct 조합 수를 수집해 독립성 가정의 오차를 줄인다.",
    flavor: "열마다 맞는 통계도 열 사이 관계를 모르면 틀릴 수 있다.",
    detail: "기본 플래너는 여러 조건의 선택도를 종종 독립으로 곱하지만 도시와 우편번호처럼 강하게 연결된 열은 큰 오차가 난다. CREATE STATISTICS로 dependencies, mcv, ndistinct를 지정하고 ANALYZE가 데이터를 채운다. 확장 통계는 인덱스가 아니라 행 수 추정의 입력이다.",
    code: `CREATE STATISTICS customers_geo_stats
(dependencies, mcv, ndistinct)
ON country_code, city, postal_code
FROM customers;

ANALYZE customers;

SELECT statistics_name, attnames, kinds
FROM pg_stats_ext
WHERE statistics_name = 'customers_geo_stats';`,
  }),
  pgCard("INTERNAL-064", "INTERNAL", "QUERY PLANNER", "INTERNAL", "JOIN ALGORITHMS", "Nested Loop·Hash·Merge Join", {
    snippet: `Nested Loop: outer × indexed inner
Hash Join: build hash → probe
Merge Join: sorted streams → merge

planner chooses by cost`, icon: "ALG", attrs: ["Join", "Cost"], atk: "상황별 결합 전략", def: "행 수 오차에 민감",
    effect: "플래너는 입력 크기, 정렬, 인덱스, 메모리와 비용을 비교해 nested loop, hash, merge join을 선택한다.",
    flavor: "좋은 조인 방식은 하나가 아니라 입력 모양마다 다르다.",
    detail: "Nested Loop는 바깥 행이 적고 안쪽 키 인덱스가 있을 때 강하다. Hash Join은 동등 조건에서 한 입력의 해시를 만들어 큰 집합을 결합하고 work_mem 부족 시 배치로 디스크를 쓴다. Merge Join은 정렬된 입력을 순차 병합해 범위와 큰 집합에 유리할 수 있다. 잘못된 행 추정은 잘못된 알고리즘 선택의 흔한 원인이다.",
    code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT o.order_id, c.segment
FROM orders o
JOIN customers c ON c.customer_id = o.customer_id
WHERE o.ordered_at >= current_date - 7;

-- 진단 실험용일 뿐 운영 해법으로 고정하지 않는다
SET LOCAL enable_hashjoin = off;
EXPLAIN ANALYZE SELECT ...;`,
  }),
  pgCard("INTERNAL-065", "INTERNAL", "QUERY EXECUTION", "INTERNAL", "PARALLEL QUERY", "병렬 쿼리", {
    snippet: `leader
  ├─ worker 1 scan/aggregate
  ├─ worker 2 scan/aggregate
  └─ worker 3 scan/aggregate
       ↓ Gather / Gather Merge`, icon: "PAR", attrs: ["Worker", "Gather"], atk: "여러 CPU 활용", def: "시작·통신 오버헤드",
    effect: "병렬 계획은 leader와 worker가 스캔·조인·집계를 나누고 Gather 계열 노드가 결과를 모아 큰 분석 쿼리를 가속한다.",
    flavor: "데이터가 충분히 클 때만 나누는 비용보다 얻는 이득이 커진다.",
    detail: "작은 OLTP 쿼리는 worker 시작과 데이터 전달 비용 때문에 병렬화 이득이 없다. 함수와 연산은 parallel safe로 표시되어야 하고 트랜잭션 상태와 쿼리 형태에 따라 병렬 계획이 제한된다. EXPLAIN에서 Workers Planned와 Workers Launched, 각 worker 실측을 확인한다.",
    code: `EXPLAIN (ANALYZE, VERBOSE)
SELECT customer_id, sum(total_amount)
FROM orders
WHERE ordered_at >= date '2026-01-01'
GROUP BY customer_id;

SHOW max_parallel_workers_per_gather;
SHOW max_parallel_workers;

-- 함수 선언 시 의미가 맞을 때만 PARALLEL SAFE`,
  }),
  pgCard("INTERNAL-066", "INTERNAL", "QUERY EXECUTION", "INTERNAL", "JIT", "JIT 컴파일", {
    snippet: `expensive plan
 expressions + tuple deforming
          ↓ LLVM compile
native machine code

compile cost ↔ execution savings`, icon: "JIT", attrs: ["LLVM", "Cost Threshold"], atk: "긴 CPU 쿼리 가속", def: "컴파일 지연",
    effect: "JIT는 비용이 큰 쿼리의 표현식 평가와 tuple 접근 코드를 실행 중 네이티브 코드로 컴파일한다.",
    flavor: "짧은 쿼리에는 준비 시간이 더 비싸고, 긴 계산에는 회수할 수 있다.",
    detail: "JIT 사용 여부는 실제 시간이 아니라 플래너의 총 비용과 jit_above_cost 같은 임계값으로 결정된다. 복잡한 분석에서 반복 CPU 연산을 줄일 수 있지만 OLTP 지연에는 컴파일 시간이 손해일 수 있다. EXPLAIN ANALYZE의 JIT 섹션에서 generation, inlining, optimization 시간을 확인한다.",
    code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT customer_id,
       sum(total_amount * exchange_rate)
FROM large_order_facts
GROUP BY customer_id;

SHOW jit;
SHOW jit_above_cost;

SET LOCAL jit = off; -- 비교 측정`,
  }),
  pgCard("INTERNAL-067", "INTERNAL", "QUERY PLANNER", "INTERNAL", "GENERIC / CUSTOM PLAN", "준비된 문의 계획 캐시", {
    snippet: `PREPARE q($1)
first runs → custom plans
      ↓ compare average cost
generic plan or custom plan

data skew matters`, icon: "PLAN", attrs: ["Prepare", "Plan Cache"], atk: "반복 계획 비용 절감", def: "매개변수 편향 오판",
    effect: "준비된 문은 반복 파싱 비용을 줄이고 PostgreSQL은 매개변수별 custom plan과 공통 generic plan 중 비용을 비교해 선택한다.",
    flavor: "평균에 좋은 계획이 모든 매개변수에 좋은 계획은 아니다.",
    detail: "상태값처럼 분포가 크게 치우친 열은 특정 값마다 최적 계획이 다를 수 있다. generic plan은 매개변수 실제 값을 모르므로 작은 집합과 큰 집합을 같은 방식으로 처리해 느려질 수 있다. EXPLAIN EXECUTE로 계획을 보고 plan_cache_mode 강제는 진단과 제한적 우회에 사용하며 통계와 쿼리 설계를 먼저 확인한다.",
    code: `PREPARE orders_by_status(text) AS
SELECT * FROM orders WHERE status = $1;

EXPLAIN (ANALYZE, BUFFERS)
EXECUTE orders_by_status('rare_error');

EXPLAIN (ANALYZE, BUFFERS)
EXECUTE orders_by_status('complete');

SET LOCAL plan_cache_mode = force_custom_plan;`,
  }),
  pgCard("INTERNAL-068", "INTERNAL", "SYSTEM CATALOGS", "INTERNAL", "PG_CATALOG", "시스템 카탈로그", {
    snippet: `SQL object metadata
pg_class   relations
pg_attribute columns
pg_type    types
pg_proc    functions
pg_namespace schemas`, icon: "CAT", attrs: ["Catalog", "OID"], atk: "메타데이터 질의", def: "내부 표현·버전 변화",
    effect: "PostgreSQL은 테이블·열·타입·함수·권한 메타데이터 자체를 pg_catalog의 관계로 저장하고 정보 스키마와 관리 뷰로 노출한다.",
    flavor: "데이터베이스 구조도 데이터베이스 안의 테이블로 기록된다.",
    detail: "pg_class의 relation OID와 relkind, pg_attribute의 열, pg_namespace의 스키마를 조인하면 객체 구조를 질의할 수 있다. regclass 캐스트는 이름과 OID 변환을 안전하게 돕는다. 가능하면 안정적이고 표준화된 information_schema나 전용 pg_* 뷰를 우선하고 내부 카탈로그 열은 버전 차이를 확인한다.",
    code: `SELECT n.nspname AS schema_name,
       c.relname,
       c.relkind,
       pg_size_pretty(pg_total_relation_size(c.oid)) AS size
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname NOT IN ('pg_catalog','information_schema')
  AND c.relkind IN ('r','p','m')
ORDER BY pg_total_relation_size(c.oid) DESC;`,
  }),

  // 10 · ADVANCED OPERATIONS (69–80)
  pgCard("OPS-069", "OPS", "CONNECTIONS", "ADVANCED", "CONNECTION POOL", "커넥션 풀", {
    snippet: `many app requests
       ↓ pool
few stable DB sessions

session / transaction pooling
state compatibility differs`, icon: "POOL", attrs: ["Pooling", "Backends"], atk: "연결 비용·동시성 제어", def: "세션 상태 제약",
    effect: "커넥션 풀은 많은 애플리케이션 요청을 제한된 PostgreSQL 백엔드 세션에 다중화해 연결 생성과 메모리 부담을 줄인다.",
    flavor: "max_connections를 늘리기 전에 실제로 동시에 일할 쿼리 수를 제한한다.",
    detail: "연결마다 백엔드 프로세스와 세션 상태가 생기므로 너무 많은 active query는 CPU와 메모리 경쟁을 키운다. transaction pooling은 효율적이지만 세션 prepared statement, temp table, session advisory lock 같은 상태와 호환되지 않을 수 있다. 풀 크기는 앱 인스턴스 수를 곱한 총합과 DB 처리 능력을 기준으로 정한다.",
    code: `SELECT state, count(*)
FROM pg_stat_activity
GROUP BY state
ORDER BY count(*) DESC;

SELECT count(*) FILTER (WHERE state = 'active') AS active,
       count(*) FILTER (WHERE wait_event IS NOT NULL) AS waiting,
       count(*) AS total
FROM pg_stat_activity;

SHOW max_connections;`,
  }),
  pgCard("OPS-070", "OPS", "MEMORY", "ADVANCED", "SHARED BUFFERS", "shared_buffers와 OS 캐시", {
    snippet: `PostgreSQL shared buffers
         ↕
OS page cache
         ↕
disk

database does not own all RAM`, icon: "BUF", attrs: ["Cache", "I/O"], atk: "공유 페이지 캐시", def: "OS 캐시와 중복·체크포인트 영향",
    effect: "shared_buffers는 PostgreSQL의 공유 페이지 캐시이며 서버는 운영체제 파일 캐시도 함께 사용하므로 RAM 전체를 할당하지 않는다.",
    flavor: "캐시는 하나가 아니며 큰 값이 자동으로 빠른 값은 아니다.",
    detail: "전용 서버의 시작점으로 메모리 약 25%가 자주 언급되지만 워크로드와 OS에 맞춰 측정해야 한다. 지나치게 크면 OS와 다른 프로세스 메모리를 압박하고 더 많은 dirty buffer가 체크포인트 패턴에 영향을 준다. cache hit 비율만으로 성능을 판단하지 말고 실제 I/O 지연과 working set을 함께 본다.",
    code: `SHOW shared_buffers;
SHOW effective_cache_size;

SELECT datname,
       blks_read,
       blks_hit,
       round(100.0 * blks_hit / nullif(blks_hit + blks_read, 0), 2)
         AS hit_pct
FROM pg_stat_database
WHERE datname = current_database();`,
  }),
  pgCard("OPS-071", "OPS", "MEMORY", "ADVANCED", "WORK_MEM", "work_mem과 임시 파일", {
    snippet: `each sort/hash node
 × nodes per query
 × concurrent queries
 = possible memory

overflow → temp files`, icon: "MEM", attrs: ["Sort", "Hash"], atk: "정렬·해시 메모리", def: "연산·세션별 배수 위험",
    effect: "work_mem은 쿼리 전체가 아니라 각 sort·hash 연산이 디스크로 spill하기 전 사용할 기본 메모리 한도다.",
    flavor: "설정값 하나가 아니라 동시 연산 수를 곱한 값이 실제 위험이다.",
    detail: "복잡한 쿼리는 여러 노드가 각각 work_mem을 쓰고 여러 세션이 동시에 실행하므로 전역 값을 크게 올리면 OOM 위험이 있다. EXPLAIN ANALYZE에서 Sort Method와 Disk, Hash Batches를 확인하고 무거운 배치 트랜잭션에 SET LOCAL로 제한적으로 높이는 방법이 안전하다. hash 연산은 hash_mem_multiplier도 영향을 받는다.",
    code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT customer_id, sum(total_amount)
FROM orders
GROUP BY customer_id
ORDER BY sum(total_amount) DESC;

BEGIN;
SET LOCAL work_mem = '128MB';
-- 검증된 분석 쿼리 실행
COMMIT;

SHOW hash_mem_multiplier;`,
  }),
  pgCard("OPS-072", "OPS", "MAINTENANCE", "ADVANCED", "AUTOVACUUM TUNING", "Autovacuum 임계값 튜닝", {
    snippet: `trigger changes ≈
threshold + scale_factor × reltuples

large table → scale term huge
hot table → per-table tuning`, icon: "AV", attrs: ["Scale Factor", "Freeze"], atk: "테이블별 청소 주기", def: "I/O·worker 경쟁",
    effect: "Autovacuum은 고정 threshold와 테이블 크기 비율을 조합해 동작하며 큰·활발한 테이블은 저장 옵션으로 더 공격적으로 조정할 수 있다.",
    flavor: "한 가지 전역 비율로 모든 크기와 변경률의 테이블을 돌볼 수 없다.",
    detail: "대형 테이블에서 기본 scale factor는 죽은 tuple이 너무 많이 쌓인 뒤 vacuum을 시작하게 할 수 있다. n_dead_tup, 수정률, vacuum duration, freeze age를 관측해 테이블별 scale_factor와 threshold를 조정한다. autovacuum은 XID wraparound 방어도 담당하므로 단순 비활성화는 해법이 아니다.",
    code: `ALTER TABLE high_churn_events SET (
  autovacuum_vacuum_scale_factor = 0.01,
  autovacuum_vacuum_threshold = 10000,
  autovacuum_analyze_scale_factor = 0.005
);

SELECT relname, n_dead_tup, last_autovacuum,
       autovacuum_count, vacuum_count
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;`,
  }),
  pgCard("OPS-073", "OPS", "SAFETY LIMITS", "ADVANCED", "TIMEOUTS", "쿼리·잠금·유휴 타임아웃", {
    snippet: `statement_timeout
lock_timeout
idle_in_transaction_session_timeout

bound waiting and forgotten work`, icon: "TO", attrs: ["Timeout", "Cancel"], atk: "무한 대기 방지", def: "업무별 값 설계",
    effect: "시간 제한은 오래 실행되는 문장, 잠금 대기, 열린 채 방치된 트랜잭션을 중단해 장애 전파와 MVCC 정체를 제한한다.",
    flavor: "끝날 것이라는 기대 대신 최대 기다림을 계약한다.",
    detail: "statement_timeout은 문장 실행 전체, lock_timeout은 잠금 획득 대기, idle_in_transaction_session_timeout은 트랜잭션을 연 채 명령이 없는 세션을 제한한다. 전역 값 하나보다 역할·DB·트랜잭션별 SLO에 맞춘 값이 좋다. 클라이언트 취소만 믿지 말고 서버 제한과 예외 처리를 함께 둔다.",
    code: `ALTER ROLE app_user SET statement_timeout = '5s';
ALTER ROLE app_user SET lock_timeout = '1s';
ALTER ROLE app_user
SET idle_in_transaction_session_timeout = '30s';

BEGIN;
SET LOCAL statement_timeout = '2min';
-- 승인된 배치 작업
COMMIT;`,
  }),
  pgCard("OPS-074", "OPS", "OBSERVABILITY", "ADVANCED", "QUERY LOGGING", "느린 쿼리 로깅과 auto_explain", {
    snippet: `log_min_duration_statement
          ↓ slow SQL
auto_explain
          ↓ plan for sampled slow SQL
pg_stat_statements
          ↓ aggregate history`, icon: "LOG", attrs: ["Logging", "Auto Explain"], atk: "재현 어려운 지연 포착", def: "로그량·민감정보",
    effect: "느린 쿼리 로그, auto_explain, pg_stat_statements를 조합하면 개별 사건과 누적 패턴, 당시 계획을 서로 보완해 볼 수 있다.",
    flavor: "한 번의 느림과 반복되는 총비용을 다른 렌즈로 본다.",
    detail: "log_min_duration_statement는 임계값 이상 문장을 기록하고 auto_explain은 실행 계획을 자동 로그할 수 있다. 과도한 로깅과 ANALYZE 옵션은 부하를 만들고 SQL·매개변수에 민감정보가 포함될 수 있다. pg_stat_statements는 정규화된 queryid별 누적 통계라 배포 전후 평균·persistence를 비교하는 데 유용하다.",
    code: `-- 세션 진단 예
LOAD 'auto_explain';
SET auto_explain.log_min_duration = '500ms';
SET auto_explain.log_analyze = on;
SET auto_explain.log_buffers = on;

SELECT queryid, calls, total_exec_time, mean_exec_time, rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;`,
  }),
  pgCard("OPS-075", "OPS", "LOCKS", "ADVANCED", "BLOCKING TREE", "잠금 차단 관계", {
    snippet: `blocked pid
   └─ pg_blocking_pids(pid)
          └─ blocker pid
                 └─ root blocker

cancel query or terminate session`, icon: "WAIT", attrs: ["Locks", "Blocking"], atk: "루트 차단자 식별", def: "강제 종료 위험",
    effect: "pg_stat_activity와 pg_blocking_pids를 이용하면 기다리는 세션이 어떤 PID에 막혔는지 추적해 루트 차단 원인을 찾을 수 있다.",
    flavor: "기다리는 쿼리를 죽이기 전에 누가 줄 맨 앞을 막는지 찾는다.",
    detail: "wait_event_type이 Lock인 세션의 blocker를 찾고 blocker의 트랜잭션 시작 시각, 상태, 쿼리를 확인한다. pg_cancel_backend는 현재 쿼리를 취소하고 pg_terminate_backend는 세션을 끊어 열린 트랜잭션을 롤백하므로 영향 범위를 이해한 뒤 사용한다. idle in transaction이 장시간 잠금을 보유하는 경우가 흔하다.",
    code: `SELECT a.pid AS blocked_pid,
       b.pid AS blocker_pid,
       now() - b.xact_start AS blocker_xact_age,
       b.state AS blocker_state,
       left(b.query, 100) AS blocker_query
FROM pg_stat_activity a
CROSS JOIN LATERAL unnest(pg_blocking_pids(a.pid)) p(pid)
JOIN pg_stat_activity b ON b.pid = p.pid;

SELECT pg_cancel_backend(:pid);`,
  }),
  pgCard("OPS-076", "OPS", "MAINTENANCE", "ADVANCED", "REINDEX CONCURRENTLY", "인덱스 재구축", {
    snippet: `bloated / invalid index
        ↓ REINDEX CONCURRENTLY
build new → validate → swap

more time/I/O, less write blocking`, icon: "REIDX", attrs: ["Reindex", "Concurrent"], atk: "손상·팽창 인덱스 복구", def: "추가 공간·긴 작업",
    effect: "REINDEX는 인덱스를 새로 만들고 CONCURRENTLY 옵션은 쓰기 차단을 줄이는 대신 더 많은 단계·시간·공간을 사용한다.",
    flavor: "서비스를 멈추지 않으려면 더 오래, 더 많은 공간으로 교체한다.",
    detail: "정기적으로 무조건 REINDEX하기보다 사용량, bloat 징후, 손상, 비효율을 근거로 실행한다. CONCURRENTLY도 짧은 잠금과 오래된 스냅샷 대기, 추가 디스크가 필요하며 실패 시 invalid index가 남을 수 있다. 큰 작업 전 여유 공간과 복제 지연을 확인하고 진행률 뷰를 모니터링한다.",
    code: `REINDEX INDEX CONCURRENTLY orders_lookup_idx;

SELECT pid, datname, relid::regclass, index_relid::regclass,
       command, phase,
       lockers_total, lockers_done,
       blocks_total, blocks_done
FROM pg_stat_progress_create_index;

SELECT indexrelid::regclass, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan;`,
  }),
  pgCard("OPS-077", "OPS", "REPLICATION", "ADVANCED", "REPLICATION SLOT", "복제 슬롯과 WAL 보존", {
    snippet: `consumer position
      ↓ replication slot
primary retains required WAL

consumer stopped too long
→ pg_wal can grow without bound`, icon: "SLOT", attrs: ["WAL Retention", "Consumer"], atk: "필요 WAL 보존", def: "디스크 고갈 위험",
    effect: "복제 슬롯은 standby나 논리 소비자가 아직 처리하지 않은 WAL을 primary가 제거하지 않도록 진행 위치를 보존한다.",
    flavor: "유실 방지 장치는 소비자가 멈추면 디스크 위험으로 바뀐다.",
    detail: "물리 슬롯은 standby, 논리 슬롯은 디코딩 소비자의 위치를 유지한다. 사용하지 않는 슬롯이나 중단된 소비자는 restart_lsn 뒤 WAL을 계속 붙잡아 pg_wal을 가득 채울 수 있다. retained bytes, active 상태, inactive_since를 감시하고 max_slot_wal_keep_size와 운영 삭제 절차를 마련한다.",
    code: `SELECT slot_name, slot_type, active,
       restart_lsn, confirmed_flush_lsn,
       pg_size_pretty(
         pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)
       ) AS retained_wal
FROM pg_replication_slots;

-- 소비 중단과 재생 불가능성을 확인한 뒤에만
SELECT pg_drop_replication_slot('unused_slot');`,
  }),
  pgCard("OPS-078", "OPS", "CDC", "ADVANCED", "LOGICAL DECODING", "논리 디코딩과 CDC", {
    snippet: `WAL physical changes
      ↓ output plugin
logical INSERT/UPDATE/DELETE
      ↓ connector / consumer
event stream`, icon: "CDC", attrs: ["Decoding", "WAL"], atk: "변경 이벤트 스트림", def: "슬롯·스키마·순서 운영",
    effect: "논리 디코딩은 WAL의 물리 변경을 테이블 행 수준 변경 스트림으로 변환해 CDC와 사용자 정의 복제에 사용한다.",
    flavor: "데이터베이스 변경 로그를 업무 이벤트로 읽되 둘을 같은 것으로 착각하지 않는다.",
    detail: "output plugin이 변경을 소비자 형식으로 변환하고 논리 슬롯이 처리 위치를 유지한다. UPDATE와 DELETE 식별에는 replica identity가 필요하며 PK가 없으면 REPLICA IDENTITY FULL이 비용을 늘릴 수 있다. DDL 의미, 스키마 진화, 재처리, 순서와 중복을 소비자가 명시적으로 다뤄야 한다.",
    code: `ALTER TABLE orders REPLICA IDENTITY USING INDEX orders_pkey;

SELECT *
FROM pg_create_logical_replication_slot('orders_cdc', 'pgoutput');

SELECT slot_name, confirmed_flush_lsn
FROM pg_replication_slots
WHERE slot_name = 'orders_cdc';

-- 보통 직접 호출보다 검증된 CDC 커넥터를 사용한다`,
  }),
  pgCard("OPS-079", "OPS", "HIGH AVAILABILITY", "ADVANCED", "FAILOVER / TIMELINE", "Failover와 타임라인", {
    snippet: `timeline 1: primary ───── X
                         fail
timeline 2: standby promote ───→

old primary must not rejoin as writer`, icon: "HA", attrs: ["Promotion", "Timeline"], atk: "장애 시 쓰기 복구", def: "split brain·데이터 손실",
    effect: "Failover는 standby를 새 primary로 승격하며 새로운 WAL timeline을 만들고 이전 primary의 동시 쓰기를 반드시 차단해야 한다.",
    flavor: "승격 명령보다 중요한 것은 단 하나의 쓰기 리더를 보장하는 절차다.",
    detail: "비동기 복제는 primary 장애 시 아직 전송·재생되지 않은 커밋을 잃을 수 있어 RPO가 0이 아닐 수 있다. 승격 전 fencing으로 이전 primary 접근을 차단하고 클라이언트 라우팅, 슬롯, 백업, 모니터링을 새 리더에 맞춘다. 장애가 끝난 뒤 이전 primary는 pg_rewind 또는 새 base backup으로 현재 timeline에 다시 합류시킨다.",
    code: `-- standby에서 승격
SELECT pg_promote(wait => true, wait_seconds => 60);

SELECT pg_is_in_recovery(); -- false면 primary
SELECT timeline_id
FROM pg_control_checkpoint();

-- 자동화 절차에 반드시 포함:
-- 1) old primary fencing
-- 2) client routing
-- 3) replica rebuild / pg_rewind
-- 4) backup policy 확인`,
  }),
  pgCard("OPS-080", "OPS", "SCHEMA CHANGE", "ADVANCED", "ZERO-DOWNTIME DDL", "온라인 스키마 변경", {
    snippet: `expand
 add nullable column / new table
 dual-compatible deploy
 backfill in batches
 validate
 contract old schema`, icon: "DDL+", attrs: ["Migration", "Lock"], atk: "호환 가능한 단계적 변경", def: "긴 잠금·테이블 rewrite",
    effect: "무중단 스키마 변경은 expand→backfill→validate→contract 단계로 앱 버전 간 호환성을 유지하고 긴 잠금과 전체 재작성을 피한다.",
    flavor: "한 번에 바꾸지 말고 구버전과 신버전이 공존할 시간을 설계한다.",
    detail: "DDL도 트랜잭션과 잠금을 사용하며 ALTER TABLE의 일부 동작은 ACCESS EXCLUSIVE를 요구한다. NOT VALID로 제약을 빠르게 추가한 뒤 별도로 VALIDATE하고 인덱스는 CONCURRENTLY 생성할 수 있다. 큰 UPDATE는 작은 배치로 나누고 배포 순서를 앱 읽기·쓰기 호환성에 맞춘다. 실행 전 실제 버전 문서와 복제·락 영향을 확인한다.",
    code: `-- 1. 빠르게 제약 등록, 기존 행 검사는 미룸
ALTER TABLE orders
ADD CONSTRAINT orders_amount_positive
CHECK (total_amount >= 0) NOT VALID;

-- 2. 온라인 검증
ALTER TABLE orders
VALIDATE CONSTRAINT orders_amount_positive;

-- 3. 쓰기 차단을 줄여 인덱스 생성
CREATE INDEX CONCURRENTLY orders_paid_idx
ON orders (ordered_at) WHERE status = 'paid';`,
  }),
];
