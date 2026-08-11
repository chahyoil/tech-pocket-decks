/**
 * Redis Learning Cards — SAMPLE DECK (14/40)
 * 출처: redis.io/docs/latest (Data types / Persistence / Key eviction / Replication)
 * 외부 링크 없이 개념 + 명령어로만 구성.
 */
window.REDIS_CARDS = [
  /* ─────────────── STARTER ─────────────── */
  {
    id: "STARTER-001",
    nameEn: "WHAT IS REDIS",
    nameKo: "레디스란?",
    rarity: "N",
    type: "STARTER",
    attrs: ["Intro", "In-Memory"],
    atk: "μs 단위 응답",
    def: "자료구조 서버",
    effect:
      "단순 key-value 캐시가 아니라 '자료구조 서버'. 값 자체가 String·Hash·List·Set·ZSet·Stream이며 서버가 그 위의 연산을 원자적으로 실행한다.",
    flavor: "값을 저장하는 게 아니라, 자료구조를 저장한다.",
    visual: "memory",
    snippet: "RAM + 자료구조",
    detail:
      "일반적인 캐시는 값을 통째로 읽어 앱에서 고치고 다시 쓴다. Redis는 값이 자료구조라서 INCR·LPUSH·ZADD처럼 서버 안에서 부분 조작이 원자적으로 끝난다. 데이터는 메모리에 상주해 왕복 한 번이면 μs 단위로 응답하고, RDB/AOF로 디스크에 남길 수 있다. 캐시·세션·작업 큐·랭킹·레이트리밋·이벤트 로그를 한 서버로 커버하는 이유가 이 자료구조들이다.",
    code: `# 값이 곧 자료구조
SET    page:home "<html>..."      # String
HSET   user:1000 name "Yuna"      # Hash
LPUSH  jobs:email "{...}"         # List
ZADD   rank:daily 320 "player:7"  # Sorted Set
XADD   events * type "click"      # Stream

# 앱으로 가져와 고치지 않고 서버에서 원자 연산
INCR   page:home:views            # -> 1`,
    lang: "redis-cli",
  },
  {
    id: "STARTER-002",
    nameEn: "KEYS & EXPIRATION",
    nameKo: "키와 만료",
    rarity: "N",
    type: "STARTER",
    attrs: ["Key", "TTL"],
    atk: "TTL 자동 삭제",
    def: "네임스페이스 규칙",
    effect:
      "모든 데이터는 바이너리 세이프 키로 접근한다. TTL을 주면 만료된 키는 접근 시(passive)와 백그라운드 표본 검사(active) 두 경로로 지워진다.",
    flavor: "이름을 잘 짓는 것이 스키마 설계다.",
    visual: "ttl",
    snippet: "user:1000:profile",
    detail:
      "Redis에는 테이블이 없어서 키 이름이 곧 스키마다. object-type:id:field 관례(user:1000:profile)로 네임스페이스를 나눈다. 만료는 두 방식이 함께 돈다 — 키에 접근할 때 확인해 지우는 passive expiration, 백그라운드에서 TTL 있는 키를 표본 추출해 지우는 active expiration. SET에 EX/PX/NX를 붙이면 저장과 TTL 설정이 한 번에 원자적으로 끝난다. 운영 중 KEYS *는 단일 스레드를 O(N)으로 막으므로 반드시 SCAN 커서 순회를 쓴다.",
    code: `SET session:u1000 "token..." EX 3600   # 저장 + TTL 원자적
TTL     session:u1000                  # -> 3600 (초)
PERSIST session:u1000                  # TTL 제거 (영구)
EXPIRE  session:u1000 60 XX            # 기존 TTL 있을 때만

# ❌ 운영 금지: 단일 스레드를 O(N)으로 점유
KEYS  session:*
# ✅ 커서로 나눠서 순회
SCAN 0 MATCH "session:*" COUNT 100`,
    lang: "redis-cli",
  },

  {
    id: "STARTER-003",
    nameEn: "REDIS-CLI & KEYSPACE",
    nameKo: "CLI와 키 공간",
    rarity: "N",
    type: "STARTER",
    attrs: ["CLI", "Keyspace"],
    atk: "타입 · 인코딩 조회",
    def: "DB 0~15 분리",
    effect:
      "redis-cli 하나로 접속·조회·진단이 끝난다. TYPE과 OBJECT ENCODING으로 값이 실제 어떤 구조·표현으로 저장됐는지 확인한다.",
    flavor: "무엇이 들어있는지부터 보라.",
    visual: "cli",
    snippet: "redis-cli → TYPE · ENCODING",
    detail:
      "기본 포트는 6379, 데이터베이스는 0~15번 16개가 있고 SELECT로 전환한다. 다만 Cluster 모드에서는 0번만 쓸 수 있고, 멀티 DB는 격리가 아니라 같은 프로세스·같은 메모리를 공유하므로 실무에서는 키 프리픽스나 인스턴스 분리를 권장한다. TYPE은 자료구조를, OBJECT ENCODING은 내부 표현(listpack/intset/skiplist/hashtable)을 보여줘 메모리 튜닝의 출발점이 된다. MONITOR는 모든 명령을 실시간으로 흘려보여 디버깅에 유용하지만 처리량을 크게 떨어뜨리므로 운영에서는 짧게만 쓴다.",
    code: `redis-cli -h 127.0.0.1 -p 6379 -n 0

DBSIZE                  # 현재 DB 키 개수
TYPE  user:1000         # -> hash
OBJECT ENCODING user:1000   # -> listpack (작을 때)
TTL   session:u1        # -> -1(영구) / -2(없음)

redis-cli --stat        # 1초마다 요약
redis-cli --bigkeys     # 타입별 최대 키 탐색
MONITOR                 # 전 명령 실시간 (운영에선 잠깐만)`,
    lang: "redis-cli",
  },
  {
    id: "STARTER-004",
    nameEn: "RESP PROTOCOL",
    nameKo: "RESP 프로토콜",
    rarity: "R",
    type: "STARTER",
    attrs: ["RESP", "Client"],
    atk: "사람이 읽는 프로토콜",
    def: "RESP3 서버 push",
    effect:
      "클라이언트-서버 통신은 RESP라는 텍스트 기반 프로토콜. 단순해서 telnet으로도 대화가 되고 클라이언트 구현이 쉽다.",
    flavor: "단순함이 생태계를 만들었다.",
    visual: "resp",
    snippet: "+OK  :1  $5  *2  -ERR",
    detail:
      "명령은 벌크 문자열 배열로 전송되고, 응답은 첫 글자로 타입을 구분한다 — +단순 문자열, -에러, :정수, $벌크 문자열, *배열. Redis 6부터 RESP3가 추가돼 맵·집합·불리언·더블 같은 타입과, 서버가 요청 없이 먼저 보내는 push 메시지를 지원한다. 클라이언트 사이드 캐싱의 무효화 알림과 Pub/Sub을 일반 커넥션에서 함께 받을 수 있게 된 이유가 이 push다. HELLO 3으로 프로토콜을 승격한다. 커넥션 생성 비용 때문에 실무에서는 반드시 커넥션 풀을 쓴다.",
    code: `HELLO 3          # RESP3로 승격 (서버 정보 맵 반환)

# 클라이언트가 보내는 것: SET key val
*3\\r\\n$3\\r\\nSET\\r\\n$3\\r\\nkey\\r\\n$3\\r\\nval\\r\\n

# 서버 응답 타입
+OK\\r\\n           # 단순 문자열
:42\\r\\n           # 정수
$5\\r\\nhello\\r\\n   # 벌크 문자열
*0\\r\\n            # 빈 배열
-ERR unknown command\\r\\n`,
    lang: "text",
  },
  {
    id: "STARTER-005",
    nameEn: "WHEN NOT TO USE REDIS",
    nameKo: "쓰면 안 되는 경우",
    rarity: "SR",
    type: "STARTER",
    attrs: ["Anti-pattern", "BigKey"],
    atk: "메모리 = 비용",
    def: "빅키 · 핫키 회피",
    effect:
      "전부 메모리에 올라가고 명령은 한 스레드에서 돈다. 이 두 전제를 벗어나는 사용은 반드시 사고로 돌아온다.",
    flavor: "빠른 도구를 느리게 쓰는 법.",
    visual: "antipattern",
    snippet: "❌ BigKey  ❌ HotKey  ❌ ColdData",
    detail:
      "대표적 실패는 빅키와 핫키다. 원소 수백만의 리스트·해시는 조회·삭제·마이그레이션이 전부 O(N)이라 단일 스레드를 멈추고, 클러스터에서는 슬롯 단위로 옮기므로 리밸런싱까지 막는다. 핫키는 한 키에 트래픽이 몰려 샤딩을 해도 특정 노드만 포화되는 문제다. 복잡한 조인·애드혹 분석·거의 안 읽는 대용량 콜드 데이터는 관계형 DB나 객체 스토리지의 몫이다. Redis는 '작고 뜨겁고 자주 읽는 데이터'에 쓰고, 큰 값은 쪼개거나(user:1:part:2) 외부에 두고 포인터만 저장한다.",
    code: `# 빅키 찾기
redis-cli --bigkeys
MEMORY USAGE huge:list        # -> 402653184 (약 384MB)

# ❌ 한 방에 다 꺼내기 — 그동안 서버 정지
LRANGE huge:list 0 -1
HGETALL huge:hash

# ✅ 나눠서 · 백그라운드로
LRANGE huge:list 0 99
HSCAN  huge:hash 0 COUNT 100
UNLINK huge:list              # DEL은 동기 = 블로킹`,
    lang: "redis-cli",
  },

  /* ─────────────── TYPE ─────────────── */
  {
    id: "TYPE-001",
    nameEn: "STRINGS",
    nameKo: "문자열",
    rarity: "N",
    type: "TYPE",
    attrs: ["String", "Counter"],
    atk: "O(1) GET / SET",
    def: "값 최대 512MB",
    effect:
      "가장 기본 타입. 바이트 시퀀스라 텍스트·JSON·직렬화 객체·이미지까지 담는다. INCR 계열로 원자적 카운터가 된다.",
    flavor: "바이트면 무엇이든.",
    visual: "string",
    snippet: "key → bytes (≤512MB)",
    detail:
      "값 하나는 최대 512MB. INCR/INCRBY/DECR는 문자열을 정수로 해석해 원자적으로 증감하므로 조회수·재고·레이트리밋 카운터를 락 없이 구현한다. SET NX(없을 때만) + EX(만료)를 조합하면 분산 락의 기본형이 된다. 같은 문자열에 비트 연산을 얹으면 Bitmap(일별 접속자 플래그), 비트 구간을 나누면 Bitfield(여러 카운터 압축)로도 쓴다.",
    code: `SET  product:42:stock 100
INCRBY product:42:stock -1     # 원자적 재고 차감 -> 99

# 분산 락 기본형: 없을 때만 + 만료
SET lock:order:42 "owner-a" NX EX 10
# -> OK (획득) / nil (이미 누군가 보유)

MSET a 1 b 2 c 3               # 여러 키 한 번에
GETRANGE page:home 0 99        # 부분 조회`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-002",
    nameEn: "HASHES",
    nameKo: "해시",
    rarity: "R",
    type: "TYPE",
    attrs: ["Hash", "Object"],
    atk: "필드 단위 갱신",
    def: "작은 해시 메모리 절약",
    effect:
      "필드-값 쌍의 레코드 타입. 객체 하나를 키 하나에 담고 필요한 필드만 골라 읽고 쓴다.",
    flavor: "객체를 통째로 들었다 놓지 마라.",
    visual: "hash",
    snippet: "user:1000 { name, email }",
    detail:
      "JSON을 String에 통째로 넣으면 필드 하나 고치려고 전체를 읽고 쓰고 다시 저장해야 한다. Hash는 HSET/HGET으로 필드만 건드린다. HINCRBY로 필드 단위 원자 카운터도 가능하다. 원소가 적고 값이 짧은 해시는 내부적으로 listpack 인코딩으로 압축 저장돼 메모리도 크게 아낀다. Redis 7.4부터는 HEXPIRE로 필드마다 개별 TTL을 줄 수 있다.",
    code: `HSET user:1000 name "Yuna" email "y@ex.com" visits 0
HGET user:1000 name            # -> "Yuna"
HINCRBY user:1000 visits 1     # 필드 단위 원자 증가
HMGET user:1000 name email     # 필요한 필드만
HGETALL user:1000              # 전체 (필드 많으면 O(N) 주의)

HEXPIRE user:1000 60 FIELDS 1 visits   # 7.4+ 필드별 TTL`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-003",
    nameEn: "LISTS",
    nameKo: "리스트",
    rarity: "R",
    type: "TYPE",
    attrs: ["List", "Queue"],
    atk: "양끝 O(1) push/pop",
    def: "블로킹 큐 지원",
    effect:
      "삽입 순서를 유지하는 문자열 목록. 양쪽 끝 연산이 O(1)이라 큐·스택·최근 목록에 쓴다.",
    flavor: "머리와 꼬리는 싸고, 가운데는 비싸다.",
    visual: "list",
    snippet: "LPUSH → [ ][ ][ ] → RPOP",
    detail:
      "LPUSH/RPUSH로 넣고 LPOP/RPOP으로 꺼낸다. BLPOP/BRPOP은 원소가 생길 때까지 블로킹해 폴링 없는 작업 큐를 만든다. LMOVE로 '처리 중' 리스트에 옮겨두면 소비자가 도중에 죽어도 작업이 사라지지 않는 신뢰성 큐 패턴이 된다. LTRIM으로 최근 N개만 남기면 타임라인 캐시가 된다. 다만 인덱스 접근 LINDEX와 중간 삽입은 O(N)이라 랜덤 액세스 용도로는 부적합하다.",
    code: `LPUSH jobs "job:1"
BRPOP jobs 0                   # 생길 때까지 대기 (폴링 없음)

# 신뢰성 큐: 꺼내면서 동시에 '처리 중'으로 이동
LMOVE jobs jobs:processing RIGHT LEFT
# 완료 후: LREM jobs:processing 1 "job:1"

LPUSH  timeline:u1 "post:99"
LTRIM  timeline:u1 0 49        # 최근 50개만 유지`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-004",
    nameEn: "SETS",
    nameKo: "집합",
    rarity: "R",
    type: "TYPE",
    attrs: ["Set", "Unique"],
    atk: "O(1) 존재 확인",
    def: "중복 자동 제거",
    effect:
      "순서 없는 유니크 문자열 컬렉션. 추가·삭제·존재 확인이 원소 개수와 무관하게 O(1).",
    flavor: "누가 들어있는지만 알면 될 때.",
    visual: "set",
    snippet: "SINTER A B → 교집합",
    detail:
      "태그·방문자·권한처럼 '중복 없는 목록'에 쓴다. 진짜 강점은 집합 연산이다 — SINTER/SUNION/SDIFF로 교집합·합집합·차집합을 서버에서 계산하므로 'A와 B를 모두 팔로우한 사람' 같은 질의에 데이터를 앱으로 끌어올 필요가 없다. SRANDMEMBER/SPOP은 무작위 추첨에 쓴다. SMEMBERS는 O(N)이라 큰 집합은 SSCAN으로 나눠 순회한다.",
    code: `SADD  tags:post:1 "redis" "cache" "db"
SISMEMBER tags:post:1 "redis"   # -> 1  (O(1))
SCARD tags:post:1               # -> 3

# 서버에서 집합 연산
SINTER follows:alice follows:bob   # 둘 다 팔로우
SDIFF  follows:alice follows:bob   # alice만 팔로우

SPOP  event:entrants 3          # 무작위 3명 추첨`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-005",
    nameEn: "SORTED SETS",
    nameKo: "정렬 집합",
    rarity: "SR",
    type: "TYPE",
    attrs: ["ZSet", "Ranking"],
    atk: "O(log N) 순위 조회",
    def: "score 정렬 불변식",
    effect:
      "각 멤버가 score를 갖는 유니크 집합. 넣는 순간 정렬이 유지되어 순위·범위 조회가 로그 시간에 끝난다.",
    flavor: "정렬은 쓸 때 한 번, 읽을 때는 공짜.",
    visual: "zset",
    snippet: "ZADD → 항상 정렬됨",
    detail:
      "리더보드(ZREVRANGE로 상위 N, ZREVRANK로 내 순위), 우선순위 큐(score=우선도), 지연 큐(score=실행 시각)가 대표 용도다. score에 타임스탬프를 넣으면 슬라이딩 윈도우 레이트리밋이 된다 — 오래된 항목을 ZREMRANGEBYSCORE로 지우고 ZCARD로 남은 개수를 세면 끝. score가 같으면 멤버 사전순으로 정렬되므로 ZRANGEBYLEX로 범위 색인처럼 쓸 수도 있다.",
    code: `ZADD rank:daily 320 "player:7" 980 "player:3"
ZINCRBY  rank:daily 50 "player:7"     # 점수 원자 가산
ZREVRANGE rank:daily 0 9 WITHSCORES   # TOP 10
ZREVRANK  rank:daily "player:7"       # 내 순위 (0-based)

# 슬라이딩 윈도우 레이트리밋 (1분 60회)
ZREMRANGEBYSCORE rl:u1 0 <now-60000>
ZADD  rl:u1 <now> <uuid>
ZCARD rl:u1                           # > 60 이면 차단`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-006",
    nameEn: "STREAMS",
    nameKo: "스트림",
    rarity: "UR",
    type: "TYPE",
    attrs: ["Stream", "Log", "Consumer Group"],
    atk: "추가 전용 로그",
    def: "컨슈머 그룹 + ACK",
    effect:
      "시간순 append-only 로그. 엔트리마다 ID(ms-seq)와 필드-값을 갖고, 컨슈머 그룹으로 나눠 병렬 소비한다.",
    flavor: "Pub/Sub은 흘려보내고, Stream은 남긴다.",
    visual: "stream",
    snippet: "XADD → XREADGROUP → XACK",
    detail:
      "Pub/Sub은 그 순간 접속한 구독자에게만 전달하고 사라지지만, Stream은 데이터를 보존해 늦게 붙은 소비자도 과거를 읽는다. XGROUP으로 그룹을 만들고 XREADGROUP으로 받으면 그룹 내 소비자들에게 엔트리가 분배된다(Kafka 컨슈머 그룹과 같은 모델). 아직 XACK되지 않은 메시지는 PEL(Pending Entries List)에 남고, 죽은 소비자의 몫은 XAUTOCLAIM으로 회수한다. XADD MAXLEN으로 길이를 잘라 메모리를 관리한다.",
    code: `XADD events * type "click" user "1000"   # * = 자동 ID
XADD events MAXLEN ~ 10000 * type "view"  # 길이 제한

XGROUP CREATE events analytics 0
XREADGROUP GROUP analytics worker-1 COUNT 10 STREAMS events >
XACK events analytics 1712345678901-0     # 처리 완료 확인

XPENDING    events analytics              # 미확인 목록
XAUTOCLAIM  events analytics worker-2 60000 0   # 죽은 소비자 몫 회수`,
    lang: "redis-cli",
  },

  {
    id: "TYPE-007",
    nameEn: "BITMAPS",
    nameKo: "비트맵",
    rarity: "R",
    type: "TYPE",
    attrs: ["Bitmap", "String"],
    atk: "1인 = 1비트",
    def: "1억 명 ≈ 12MB",
    effect:
      "String 위에 얹은 비트 배열. 사용자 ID를 비트 오프셋으로 쓰면 '접속했는가' 같은 불리언 집합을 극단적으로 작게 담는다.",
    flavor: "참/거짓 하나에 1바이트는 사치다.",
    visual: "bitmap",
    snippet: "0 1 1 0 1 0 0 1 …",
    detail:
      "SETBIT/GETBIT로 개별 비트를 다루고, BITCOUNT로 켜진 비트 수(=해당 일자 접속자 수)를 센다. BITOP AND/OR로 여러 날의 비트맵을 합치면 '이틀 연속 접속자'나 '주간 1회 이상 접속자'가 한 명령으로 나온다. 사용자 1억 명이면 1억 비트 ≈ 12MB. 단 오프셋이 큰 비트를 하나 세우면 그 앞 구간이 전부 할당되므로 ID가 희소하면 오히려 낭비다 — 그럴 땐 Set이나 HyperLogLog가 낫다. BITFIELD를 쓰면 같은 문자열을 여러 개의 작은 정수 카운터로 쪼갤 수 있다.",
    code: `SETBIT visit:2026-08-11 1000 1     # user 1000 접속
GETBIT visit:2026-08-11 1000       # -> 1
BITCOUNT visit:2026-08-11          # 그날 접속자 수

# 이틀 연속 접속자
BITOP AND visit:both visit:2026-08-10 visit:2026-08-11
BITCOUNT visit:both

# 여러 카운터를 한 문자열에 압축
BITFIELD stats:42 INCRBY u8 0 1 GET u8 0`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-008",
    nameEn: "HYPERLOGLOG",
    nameKo: "하이퍼로그로그",
    rarity: "SR",
    type: "TYPE",
    attrs: ["HLL", "Cardinality"],
    atk: "키당 최대 12KB 고정",
    def: "표준오차 약 0.81%",
    effect:
      "집합의 '개수'만 근사로 세는 확률 자료구조. 원소를 저장하지 않으므로 몇 억 개를 세도 메모리가 늘지 않는다.",
    flavor: "누군지는 몰라도, 몇 명인지는 안다.",
    visual: "hll",
    snippet: "1억 UV → 12KB",
    detail:
      "순 방문자(UV) 집계가 전형적인 용도다. Set에 1억 개 ID를 담으면 GB 단위지만 HLL은 키당 최대 12KB로 끝난다. 대가는 두 가지다 — 결과가 근사라 표준 오차가 약 0.81%이고, '누가 들어있는지'는 조회할 수 없다(멤버십 질의 불가). 실무에서 가장 강력한 점은 PFMERGE다. 일별 HLL을 합치면 중복을 제거한 주간·월간 UV가 바로 나오므로, 원본 로그를 다시 훑을 필요가 없다.",
    code: `PFADD uv:2026-08-11 "user:1000" "user:1001"
PFCOUNT uv:2026-08-11              # -> 근사 카디널리티

# 주간 UV = 일별 HLL 병합 (중복 자동 제거)
PFMERGE uv:week uv:2026-08-05 uv:2026-08-06 uv:2026-08-07
PFCOUNT uv:week

# ❌ 불가능: 특정 유저가 들어있는지 조회
# 멤버십이 필요하면 Set 또는 Bloom 필터`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-009",
    nameEn: "GEOSPATIAL",
    nameKo: "지리 공간 인덱스",
    rarity: "R",
    type: "TYPE",
    attrs: ["Geo", "ZSet"],
    atk: "반경 · 사각형 검색",
    def: "실체는 정렬 집합",
    effect:
      "좌표를 저장하고 반경이나 사각형 범위로 검색한다. 내부적으로는 geohash를 score로 쓰는 Sorted Set이다.",
    flavor: "지도는 결국 하나의 숫자로 접힌다.",
    visual: "geo",
    snippet: "GEOSEARCH ... BYRADIUS 3 km",
    detail:
      "GEOADD로 경도·위도·멤버를 넣으면 좌표가 52비트 geohash 정수로 인코딩돼 score가 된다. 그래서 ZCARD·ZRANGE·ZREM 같은 정렬 집합 명령이 그대로 통한다(삭제 전용 GEODEL은 없고 ZREM을 쓴다). GEOSEARCH는 중심점에서 BYRADIUS(반경) 또는 BYBOX(사각형) 안의 멤버를 거리와 함께 정렬해 돌려준다. 주변 매장 찾기·기사 배차·지오펜싱이 대표 용도. geohash 특성상 결과는 근사이며, 극지방이나 날짜변경선 부근에서 오차가 커진다.",
    code: `GEOADD stores 127.0276 37.4979 "gangnam"
GEOADD stores 126.9780 37.5665 "cityhall"

GEODIST stores gangnam cityhall km      # -> 거리

# 내 위치 반경 3km 매장, 가까운 순 5개
GEOSEARCH stores FROMLONLAT 127.02 37.50
  BYRADIUS 3 km ASC COUNT 5 WITHDIST

ZREM stores "gangnam"                   # 삭제는 ZSet 명령`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-010",
    nameEn: "PROBABILISTIC TYPES",
    nameKo: "확률 자료구조",
    rarity: "SR",
    type: "TYPE",
    attrs: ["Bloom", "Cuckoo", "CMS", "Top-K"],
    atk: "메모리 수십 분의 1",
    def: "정해진 오차율",
    effect:
      "정확도를 조금 내주고 메모리를 극단적으로 줄이는 자료구조 묶음 — Bloom·Cuckoo 필터, Count-min sketch, t-digest, Top-K.",
    flavor: "'아마도 있다'로 충분한 순간이 있다.",
    visual: "bloom",
    snippet: "없음=확실 / 있음=아마도",
    detail:
      "Bloom 필터는 '없음'은 확실하고 '있음'은 확률적이다 — false positive는 있어도 false negative는 없다. 그래서 DB 조회 전에 '존재하지 않는 ID'를 걸러내는 방패로 쓴다. Cuckoo 필터는 비슷하면서 삭제를 지원한다. Count-min sketch는 스트림에서 항목별 등장 빈도를, Top-K는 상위 K개 항목을, t-digest는 백분위수(p50·p99)를 근사한다. 공통점은 원본을 저장하지 않고 요약만 유지한다는 것 — 그래서 데이터가 늘어도 메모리가 거의 고정이다.",
    code: `# Bloom: 오차율 1%, 예상 100만 건
BF.RESERVE seen:email 0.01 1000000
BF.ADD    seen:email "a@ex.com"
BF.EXISTS seen:email "b@ex.com"    # 0 = 확실히 없음

# 빈도 근사 / 상위 K개
CMS.INITBYPROB traffic 0.001 0.01
CMS.INCRBY traffic "/login" 1
TOPK.RESERVE hot 10 2000 7 0.925
TOPK.ADD hot "/login"
TOPK.LIST hot`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-011",
    nameEn: "VECTOR SETS",
    nameKo: "벡터 셋",
    rarity: "UR",
    type: "TYPE",
    attrs: ["Vector", "HNSW", "AI"],
    atk: "근사 최근접 검색",
    def: "속성 필터 결합",
    effect:
      "원소마다 임베딩 벡터를 붙인 정렬 집합의 확장. HNSW 그래프로 유사한 항목 상위 N개를 근사 검색한다.",
    flavor: "정렬 집합이 score를 가진다면, 이건 의미를 가진다.",
    visual: "vector",
    snippet: "VADD → VSIM (HNSW)",
    detail:
      "정렬 집합의 score 자리에 벡터가 들어간 형태다. VADD로 벡터를 넣고 VSIM으로 질의 벡터와 가까운 원소를 찾는다. 알고리즘이 HNSW(계층적 근접 그래프)라 결과는 정확한 최근접이 아니라 근사이며, 저장 시 양자화가 적용되므로 VEMB로 꺼낸 값은 넣은 값과 미세하게 다르다. VSETATTR로 원소에 JSON 속성을 붙이면 VSIM ... FILTER 로 유사도 검색과 조건 필터를 한 번에 거는 하이브리드 검색이 된다. RAG·추천·시맨틱 검색에 별도 벡터 DB 없이 대응하는 카드.",
    code: `VADD points VALUES 2 1.0 1.0 "pt:A"
VADD points VALUES 2 0.9 0.1 "pt:E"
VDIM  points                 # -> 2 (차원)
VCARD points                 # -> 원소 수

VSETATTR points "pt:A" '{"size":"large","price":18.99}'

# 유사도 + 속성 필터 (하이브리드 검색)
VSIM points VALUES 2 0.9 0.1
  FILTER '.size == "large" && .price > 10'
  WITHSCORES COUNT 4`,
    lang: "redis-cli",
  },

  /* ─────────────── ARCH ─────────────── */
  {
    id: "ARCH-001",
    nameEn: "SINGLE-THREADED LOOP",
    nameKo: "단일 스레드 이벤트 루프",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Atomicity", "Latency"],
    atk: "락 없는 원자성",
    def: "예측 가능한 지연",
    effect:
      "명령 실행은 하나의 이벤트 루프에서 한 번에 하나씩. 그래서 모든 명령이 원자적이고, 느린 명령 하나가 전체를 막는다.",
    flavor: "빠른 이유이자, 느려지는 이유.",
    visual: "eventloop",
    snippet: "1 thread · 1 command at a time",
    detail:
      "I/O 멀티플렉싱으로 수만 개 커넥션을 한 스레드가 처리한다. 명령이 겹쳐 실행되지 않으므로 INCR·LPUSH 같은 연산에 락이 필요 없다 — 원자성이 아키텍처에서 공짜로 나온다. 대가는 격리 실패다. KEYS *, 거대한 SMEMBERS, 무거운 Lua 스크립트는 실행되는 동안 다른 모든 클라이언트를 대기시킨다. 그래서 SCAN 계열과 배치 분할이 필수다. 삭제(UNLINK)와 영속화(fork한 자식 프로세스), 일부 네트워크 I/O는 메인 스레드 밖으로 뺀다.",
    code: `# 왜 락이 필요 없는가 — 두 클라이언트가 동시에 INCR 해도
# 실행 자체가 겹치지 않으므로 lost update가 없다
INCR counter    # client A
INCR counter    # client B  -> 항상 정확히 +2

# 느린 명령 한 방이 전체를 멈춘다 → 범인 찾기
SLOWLOG GET 10
CONFIG SET slowlog-log-slower-than 10000   # 10ms 이상 기록

DEL    big:key   # 동기 삭제 (블로킹)
UNLINK big:key   # 백그라운드 삭제 (권장)`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-002",
    nameEn: "REPLICATION",
    nameKo: "복제",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Replica", "HA"],
    atk: "읽기 스케일아웃",
    def: "비동기 · 유실 창 존재",
    effect:
      "리더-팔로워 구조. 복제는 기본 비동기이며 (replication ID, offset) 한 쌍이 데이터셋의 정확한 버전을 식별한다.",
    flavor: "빠른 대신, 마지막 몇 밀리초는 보장하지 않는다.",
    visual: "replication",
    snippet: "master → replica ×N",
    detail:
      "REPLICAOF로 붙으면 복제본은 PSYNC로 자기가 아는 replication ID와 offset을 보낸다. 마스터 백로그에 그 구간이 남아 있으면 부분 재동기화(끊긴 만큼만 전송), 아니면 전체 재동기화(마스터가 RDB를 만들어 보내고 그동안 버퍼한 명령 스트림을 이어서 재생)를 한다. 비동기이므로 장애 시 유실 창이 있다 — WAIT로 N개 복제본의 ACK를 기다리거나 min-replicas-to-write로 최소 복제본 수를 강제해 창을 좁힌다(강한 일관성이 되는 것은 아니다). 복제본은 기본 읽기 전용이며, 키 만료는 복제본이 스스로 판단하지 않고 마스터가 DEL을 전파한다.",
    code: `# 복제본 설정
replicaof 192.168.1.10 6379
replica-read-only yes           # 기본값

# 유실 창 좁히기 (best effort)
min-replicas-to-write 1
min-replicas-max-lag  10

# 클라이언트 측 동기 대기
WAIT 1 100     # 복제본 1대가 ACK할 때까지 최대 100ms

INFO replication   # role, offset, 연결된 복제본 확인`,
    lang: "conf",
  },

  {
    id: "ARCH-003",
    nameEn: "SENTINEL",
    nameKo: "센티널",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Sentinel", "Failover"],
    atk: "자동 페일오버",
    def: "쿼럼 합의",
    effect:
      "마스터를 감시하다 죽으면 복제본 하나를 승격시키는 감시 프로세스 묶음. 클라이언트에게 '지금 마스터가 누구인지'를 알려준다.",
    flavor: "죽는 것보다, 죽은 줄 모르는 게 무섭다.",
    visual: "sentinel",
    snippet: "SDOWN → ODOWN → 승격",
    detail:
      "Sentinel 자신을 3대 이상 홀수로 띄운다. 한 Sentinel이 응답 없음을 감지하면 주관적 다운(SDOWN), 설정한 쿼럼 수만큼의 Sentinel이 동의하면 객관적 다운(ODOWN)이 된다. 여기서 끝이 아니라 Sentinel 과반이 리더를 선출해야 실제 페일오버가 실행된다 — 쿼럼(감지 동의 수)과 과반(실행 권한)은 별개 개념이다. 클라이언트는 마스터 IP를 하드코딩하지 않고 Sentinel에 물어 현재 마스터를 받는다. 샤딩은 하지 않으므로 전체 데이터가 한 노드에 들어가야 하고, 넘치면 Cluster로 간다.",
    code: `# sentinel.conf — 3대 이상 홀수로 배치
sentinel monitor mymaster 192.168.1.10 6379 2
#                                          ↑ 쿼럼
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000

# 클라이언트는 Sentinel에게 물어본다
SENTINEL get-master-addr-by-name mymaster
SENTINEL replicas mymaster
SENTINEL failover mymaster      # 수동 전환(점검용)`,
    lang: "conf",
  },
  {
    id: "ARCH-004",
    nameEn: "CLUSTER & HASH SLOTS",
    nameKo: "클러스터와 해시 슬롯",
    rarity: "UR",
    type: "ARCH",
    attrs: ["Cluster", "Sharding"],
    atk: "16384 슬롯 분산",
    def: "노드 추가로 수평 확장",
    effect:
      "키를 16384개 해시 슬롯에 나누고 슬롯을 노드에 배분한다. 슬롯이 고정 단위라 재배치 대상이 명확하다.",
    flavor: "키가 아니라 슬롯이 이사한다.",
    visual: "cluster",
    snippet: "CRC16(key) mod 16384",
    detail:
      "슬롯 번호는 CRC16(key) mod 16384로 정해진다. 클라이언트가 엉뚱한 노드에 물으면 MOVED(영구 이동) 또는 ASK(마이그레이션 중 임시) 리다이렉트를 받는다 — 클러스터 지원 클라이언트는 슬롯 맵을 캐시해 대개 한 번에 맞는 노드로 간다. 결정적 제약은 다중 키 연산이다. MGET·트랜잭션·Lua는 대상 키들이 같은 슬롯에 있어야 하므로 해시 태그를 쓴다 — user:{1000}:profile과 user:{1000}:cart는 중괄호 안만 해싱되어 같은 슬롯에 떨어진다. 각 마스터에 복제본을 붙여야 노드 장애 시 자동 승격이 일어난다.",
    code: `CLUSTER INFO                 # cluster_state:ok
CLUSTER SLOTS                # 슬롯 ↔ 노드 매핑
CLUSTER KEYSLOT user:1000    # -> 이 키의 슬롯 번호

# 다른 노드 담당 키를 물으면
GET user:1000
# (error) MOVED 5798 192.168.1.12:6379

# 해시 태그로 같은 슬롯에 묶기
MSET user:{1000}:name "Yuna" user:{1000}:cart "[]"   # OK
MSET user:1000:name  "Yuna" user:1001:cart  "[]"     # CROSSSLOT 에러`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-005",
    nameEn: "PUB/SUB",
    nameKo: "발행 · 구독",
    rarity: "R",
    type: "ARCH",
    attrs: ["Pub/Sub", "Fanout"],
    atk: "즉시 브로드캐스트",
    def: "보관하지 않음",
    effect:
      "채널에 발행하면 그 순간 구독 중인 모두에게 전달된다. 저장하지 않으므로 접속하지 않은 구독자는 영원히 못 받는다.",
    flavor: "지나간 방송은 다시 들을 수 없다.",
    visual: "pubsub",
    snippet: "PUBLISH → 구독자 전원",
    detail:
      "SUBSCRIBE/PUBLISH가 기본이고 PSUBSCRIBE로 채널 패턴 구독도 된다. 메시지는 큐에 쌓이지 않고 ACK도 없는 fire-and-forget이라 실시간 알림·설정 변경 전파·채팅 브로드캐스트처럼 유실을 감수할 수 있는 곳에만 쓴다. 유실이 곤란하면 Stream을 쓴다. 또 하나의 함정은 느린 구독자다 — 못 읽고 쌓이면 서버 출력 버퍼가 부풀고 한계를 넘으면 연결이 끊긴다. 클러스터에서 일반 Pub/Sub은 전 노드로 전파돼 비용이 크므로, 7.0부터 해당 슬롯 노드에만 전파하는 샤드 Pub/Sub(SPUBLISH/SSUBSCRIBE)이 추가됐다.",
    code: `# 구독자 (이 커넥션은 구독 전용이 된다)
SUBSCRIBE  news:tech
PSUBSCRIBE news:*            # 패턴 구독

# 발행자
PUBLISH news:tech "redis 8.4 released"
# -> 수신한 구독자 수 반환 (0이면 아무도 못 받음)

# 클러스터: 슬롯 노드에만 전파 (7.0+)
SSUBSCRIBE orders:{shard1}
SPUBLISH   orders:{shard1} "..."`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-006",
    nameEn: "KEYSPACE NOTIFICATIONS",
    nameKo: "키 이벤트 알림",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Event", "Expired"],
    atk: "키 변경 이벤트 수신",
    def: "기본 비활성 (설정 필요)",
    effect:
      "키가 바뀌거나 만료될 때 Redis가 Pub/Sub 채널로 이벤트를 쏜다. 기본은 꺼져 있고 플래그로 켠다.",
    flavor: "만료를 '알림'으로 쓰되, '타이머'로 믿지는 마라.",
    visual: "notify",
    snippet: "__keyevent@0__:expired",
    detail:
      "notify-keyspace-events에 플래그를 조합해 켠다(K=keyspace, E=keyevent, x=expired, g=generic, $=string, A=거의 전부). 채널은 두 갈래다 — __keyspace@0__:mykey 는 '이 키에 무슨 일이 일어났나', __keyevent@0__:expired 는 '이 이벤트가 어느 키에서'를 알려준다. 주의점 둘. 전달 수단이 Pub/Sub이라 구독자가 끊겨 있던 동안의 이벤트는 유실된다. 그리고 expired 이벤트는 TTL이 끝난 순간이 아니라 키가 실제로 삭제되는 시점(접근되거나 액티브 만료 표본에 걸릴 때) 발생하므로 지연될 수 있다. 정확한 스케줄링에는 쓰지 않는다.",
    code: `CONFIG SET notify-keyspace-events "KEA"   # 전체
CONFIG SET notify-keyspace-events "Ex"    # 만료만

# 만료 이벤트 구독 (0 = DB 번호)
SUBSCRIBE __keyevent@0__:expired
# 1) "message" 2) "__keyevent@0__:expired" 3) "session:u1000"

# 특정 키의 모든 변경 구독
SUBSCRIBE __keyspace@0__:user:1000
# -> "hset", "expire", "del" ...`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-007",
    nameEn: "MEMORY ENCODINGS",
    nameKo: "메모리 인코딩",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Encoding", "listpack"],
    atk: "작으면 압축 표현",
    def: "임계값 넘으면 전환",
    effect:
      "같은 자료구조라도 원소 수와 값 길이가 작으면 메모리 효율이 높은 인코딩으로 저장된다. 임계값을 넘으면 되돌아오지 않는다.",
    flavor: "작게 유지하는 것이 가장 싼 최적화.",
    visual: "encoding",
    snippet: "listpack → hashtable (단방향)",
    detail:
      "작은 Hash·List·ZSet은 listpack(구 ziplist)이라는 연속 메모리 블록에 담기고, 정수만 든 Set은 intset으로 저장된다. hash-max-listpack-entries(기본 128)나 hash-max-listpack-value(기본 64) 같은 임계값을 넘는 순간 hashtable/skiplist로 전환되는데, 이 전환은 단방향이라 나중에 원소를 줄여도 압축 표현으로 돌아오지 않는다. 그래서 큰 해시 하나를 작은 해시 여러 개로 쪼개는 '해시 샤딩'이 메모리를 수 배 아끼는 고전 기법이다. 지금 무엇으로 저장돼 있는지는 OBJECT ENCODING으로 확인한다.",
    code: `HSET small:h f1 v1
OBJECT ENCODING small:h        # -> listpack (압축)

# 129번째 필드를 넣는 순간
OBJECT ENCODING big:h          # -> hashtable (되돌아오지 않음)

CONFIG GET hash-max-listpack-entries    # 기본 128
CONFIG GET hash-max-listpack-value      # 기본 64
CONFIG GET set-max-intset-entries       # 기본 512

# 해시 샤딩: user:1000 → user:{id/1000}에 필드로 분산 저장`,
    lang: "redis-cli",
  },

  /* ─────────────── OPS ─────────────── */
  {
    id: "OPS-001",
    nameEn: "PERSISTENCE: RDB + AOF",
    nameKo: "영속성 — 스냅샷과 로그",
    rarity: "UR",
    type: "OPS",
    attrs: ["RDB", "AOF", "Durability"],
    atk: "RDB 시점 스냅샷",
    def: "AOF everysec (최대 1초 손실)",
    effect:
      "RDB는 fork로 뜨는 시점 스냅샷, AOF는 쓰기 명령의 추가 전용 로그. 공식 권장은 둘을 함께 켜는 것이다.",
    flavor: "백업은 RDB로, 복구는 AOF로.",
    visual: "persist",
    snippet: "dump.rdb  ⊕  appendonly.aof",
    detail:
      "RDB는 단일 압축 파일이라 백업·원격 전송·빠른 재시작에 유리하지만, 마지막 저장 시점 이후 데이터를 잃는다. 또 저장할 때마다 fork하므로 데이터셋이 크면 순간 지연이 생긴다. AOF는 fsync 정책을 고를 수 있고(always / everysec / no) 기본 everysec는 최대 1초 손실로 성능도 충분하다. AOF는 커지면 백그라운드 rewrite로 '현재 상태를 만드는 최소 명령 집합'으로 다시 쓴다 — 7.0부터는 base + incr 멀티파트 파일과 manifest 구조다. 둘 다 켜져 있으면 재시작 시 더 완전한 AOF로 복구한다.",
    code: `# RDB: 60초 안에 1000개 키가 바뀌면 스냅샷
save 60 1000

# AOF: 로그 기반, 1초마다 fsync (권장 기본값)
appendonly  yes
appendfsync everysec      # always=가장 안전·느림 / no=OS에 위임

# 수동 조작
BGSAVE          # 백그라운드 스냅샷
BGREWRITEAOF    # AOF 재작성
INFO persistence   # rdb_last_bgsave_status, aof_rewrite_in_progress`,
    lang: "conf",
  },
  {
    id: "OPS-002",
    nameEn: "KEY EVICTION",
    nameKo: "키 축출 정책",
    rarity: "SR",
    type: "OPS",
    attrs: ["maxmemory", "LRU", "LFU"],
    atk: "maxmemory 상한",
    def: "정책별 축출 대상 선택",
    effect:
      "메모리가 maxmemory를 넘으면 maxmemory-policy에 따라 키를 골라 지운다. 캐시 용도라면 allkeys-lru가 무난한 기본값.",
    flavor: "무엇을 버릴지 정하지 않으면, 쓰기가 멈춘다.",
    visual: "eviction",
    snippet: "maxmemory-policy allkeys-lru",
    detail:
      "noeviction은 아무것도 버리지 않고 새 데이터를 쓰는 명령에 에러를 반환한다(읽기는 정상). allkeys-*는 전체 키를, volatile-*는 TTL이 설정된 키만 대상으로 한다 — TTL 있는 키가 없으면 volatile-*는 noeviction처럼 동작한다. LRU/LFU는 정확한 계산이 아니라 무작위 표본(maxmemory-samples, 기본 5)에서 고르는 근사 알고리즘이다. 소수의 핫키에 접근이 몰리면 allkeys-lru, 접근 '빈도'가 중요하면 allkeys-lfu, TTL 설계를 잘했다면 volatile-ttl. INFO stats의 keyspace_hits/misses와 evicted_keys로 정책이 맞는지 검증한다.",
    code: `maxmemory 100mb
maxmemory-policy allkeys-lru     # 캐시 기본 권장
maxmemory-samples 5              # 근사 표본 수 (↑ 정확·CPU↑)

# 정책 목록
#  noeviction        쓰기 거부 (에러)
#  allkeys-lru/lfu/random         전체 키 대상
#  volatile-lru/lfu/random/ttl    TTL 있는 키만 대상

# 검증: 적중률 = hits / (hits + misses)
INFO stats   # keyspace_hits, keyspace_misses, evicted_keys`,
    lang: "conf",
  },

  {
    id: "OPS-003",
    nameEn: "OBSERVABILITY",
    nameKo: "관측 — INFO · SLOWLOG",
    rarity: "R",
    type: "OPS",
    attrs: ["INFO", "SLOWLOG", "LATENCY"],
    atk: "적중률 · 지연 추적",
    def: "느린 명령 색출",
    effect:
      "INFO로 상태를, SLOWLOG로 느린 명령을, LATENCY로 지연 스파이크의 원인을 본다. 단일 스레드라 '느린 명령 찾기'가 곧 성능 튜닝이다.",
    flavor: "범인은 대개 O(N) 명령 하나.",
    visual: "observe",
    snippet: "hits / (hits + misses)",
    detail:
      "INFO stats의 keyspace_hits와 keyspace_misses로 캐시 적중률을, evicted_keys·expired_keys로 축출과 만료 상황을 본다. INFO clients의 connected_clients와 blocked_clients는 연결 포화와 블로킹 명령 대기를 드러낸다. SLOWLOG는 slowlog-log-slower-than(마이크로초 단위)을 넘긴 명령을 인자와 함께 기록하므로 O(N) 명령과 무거운 Lua를 잡아낸다. LATENCY DOCTOR는 fork·AOF 쓰기·만료 처리 같은 이벤트별 지연 원인을 요약해준다. commandstats·latencystats 섹션은 명령별 호출 수와 지연 분포를 준다.",
    code: `INFO stats      # keyspace_hits / misses / evicted_keys
INFO clients    # connected_clients, blocked_clients
INFO memory     # used_memory, mem_fragmentation_ratio

CONFIG SET slowlog-log-slower-than 10000   # 10ms 이상 기록
SLOWLOG GET 10                             # 최근 10건
SLOWLOG RESET

LATENCY DOCTOR      # 지연 원인 요약 (fork, aof, expire…)
INFO commandstats   # 명령별 호출 수·평균 지연`,
    lang: "redis-cli",
  },
  {
    id: "OPS-004",
    nameEn: "MEMORY ANALYSIS",
    nameKo: "메모리 분석",
    rarity: "R",
    type: "OPS",
    attrs: ["Memory", "Fragmentation"],
    atk: "키별 사용량 측정",
    def: "단편화 비율 감시",
    effect:
      "used_memory와 실제 RSS의 비율, 키별 사용량, 빅키 분포를 본다. Redis에서 메모리는 곧 용량이자 비용이다.",
    flavor: "쓴 만큼이 아니라, 잡은 만큼 낸다.",
    visual: "memory",
    snippet: "mem_fragmentation_ratio",
    detail:
      "MEMORY USAGE key로 특정 키가 실제로 몇 바이트인지, MEMORY DOCTOR로 진단 요약을 얻는다. INFO memory의 mem_fragmentation_ratio가 1보다 크게 높으면 할당자 단편화이므로 activedefrag로 완화하고, 1보다 작으면 일부가 스왑으로 내려갔다는 뜻이라 더 위험하다. redis-cli --bigkeys는 타입별 최대 키를, --memkeys는 메모리 기준 상위 키를 SCAN으로 훑는다(운영 중에도 안전). 빅키를 지울 때는 DEL 대신 UNLINK로 백그라운드 회수한다. maxmemory를 잡을 때는 복제·AOF 버퍼 몫을 남겨두는 것이 핵심이다.",
    code: `MEMORY USAGE user:1000 SAMPLES 0    # 정확 측정
MEMORY DOCTOR
MEMORY STATS

INFO memory
#  used_memory           : 실제 데이터
#  used_memory_rss       : OS가 준 메모리
#  mem_fragmentation_ratio: rss / used_memory
#    > 1.5  단편화 → activedefrag yes
#    < 1.0  스왑 발생 → 즉시 조치

redis-cli --memkeys        # 메모리 상위 키 스캔`,
    lang: "redis-cli",
  },
  {
    id: "OPS-005",
    nameEn: "SECURITY & ACL",
    nameKo: "보안과 ACL",
    rarity: "SR",
    type: "OPS",
    attrs: ["ACL", "TLS"],
    atk: "사용자별 권한 분리",
    def: "키 패턴 · 명령 제한",
    effect:
      "6.0부터 사용자 단위 ACL을 지원한다. 명령 카테고리와 키 패턴으로 '무엇을 어디까지' 할 수 있는지 잠근다.",
    flavor: "인터넷에 그대로 연 Redis가 가장 흔한 사고.",
    visual: "acl",
    snippet: "+@read ~cache:* -@dangerous",
    detail:
      "기본 사용자 default는 전권이므로 운영에서는 requirepass 또는 ACL로 반드시 막는다. ACL SETUSER로 사용자를 만들고 +@read 같은 명령 카테고리, ~cache:* 같은 키 패턴, &채널 패턴을 조합한다. FLUSHALL·CONFIG·KEYS 같은 위험 명령은 -@dangerous, -@admin으로 한 번에 뺄 수 있어 애플리케이션 계정에는 애초에 없는 명령으로 만들 수 있다. 네트워크 쪽은 bind와 protected-mode로 노출 범위를 줄이고, 전송 구간 암호화가 필요하면 TLS를 켠다. ACL LIST/WHOAMI로 현재 권한을 확인한다.",
    code: `# 캐시 전용 애플리케이션 계정
ACL SETUSER app-cache on >secret123 \\
    ~cache:* +@read +@write -@dangerous -@admin

ACL LIST            # 정의된 사용자와 권한
ACL WHOAMI          # 현재 접속 사용자
ACL CAT             # 명령 카테고리 목록
ACL GETUSER app-cache

# 기본 계정 잠그기 + 노출 제한
requirepass <strong-password>
bind 127.0.0.1 -::1
protected-mode yes`,
    lang: "redis-cli",
  },
  {
    id: "OPS-006",
    nameEn: "CLIENTS & BUFFERS",
    nameKo: "연결과 출력 버퍼",
    rarity: "R",
    type: "OPS",
    attrs: ["Client", "Buffer"],
    atk: "연결 상태 추적",
    def: "출력 버퍼 상한",
    effect:
      "연결 수·유휴 시간·출력 버퍼를 관리한다. 데이터를 제때 못 읽는 느린 소비자 하나가 서버 메모리를 밀어 올린다.",
    flavor: "받아가지 않으면, 서버가 들고 있는다.",
    visual: "client",
    snippet: "client-output-buffer-limit",
    detail:
      "CLIENT LIST로 각 연결의 age·idle·마지막 명령·버퍼 크기를 보고 CLIENT KILL로 끊는다. maxclients(기본 10000)를 넘으면 새 연결이 거부되고, timeout 설정으로 유휴 연결을 정리한다. 가장 자주 문제가 되는 건 client-output-buffer-limit이다 — Pub/Sub 구독자나 복제본이 밀려서 못 읽으면 서버 쪽 출력 버퍼가 부풀고, 한계를 넘으면 그 연결이 끊긴다(복제본이면 전체 재동기화로 이어져 부하가 폭증한다). 애플리케이션은 커넥션 풀을 쓰되 풀 크기 × 인스턴스 수가 maxclients를 넘지 않게 잡는다.",
    code: `CLIENT LIST
# id=5 addr=10.0.0.7:52344 age=812 idle=0 cmd=get omem=0 …
CLIENT KILL ID 5
CLIENT NO-EVICT on          # 중요한 연결 보호

CONFIG GET maxclients       # 기본 10000
CONFIG SET timeout 300      # 유휴 연결 정리(초)

# 클래스별 출력 버퍼 한계 (hard soft soft-seconds)
client-output-buffer-limit normal   0       0     0
client-output-buffer-limit replica  256mb  64mb  60
client-output-buffer-limit pubsub   32mb    8mb  60`,
    lang: "redis-cli",
  },
  {
    id: "OPS-007",
    nameEn: "BACKUP & RESTORE",
    nameKo: "백업과 복구",
    rarity: "SR",
    type: "OPS",
    attrs: ["Backup", "DR"],
    atk: "무중단 RDB 복사",
    def: "AOF 매니페스트 복원",
    effect:
      "RDB 파일은 완성된 뒤 원자적으로 교체되므로, 서버가 돌아가는 중에 그대로 복사해도 안전하다.",
    flavor: "백업 없는 인메모리는 그냥 휘발성이다.",
    visual: "backup",
    snippet: "BGSAVE → 복사 → 원격 보관",
    detail:
      "가장 단순한 백업은 주기적으로 BGSAVE 후 dump.rdb를 다른 장비나 오브젝트 스토리지로 옮기는 것이다(파일명에 시각을 넣고 오래된 것은 정리, 최소 하루 한 번은 데이터센터 밖으로). AOF만 쓰는 경우 7.0+는 base·incr 여러 파일과 manifest로 구성돼 있어 rewrite 도중 복사하면 깨질 수 있으므로 auto-aof-rewrite-percentage를 0으로 잠시 끄고 복사한 뒤 되돌린다. 8.10부터는 BACKUP START/LIST/SEAL/CLEANUP 명령군으로 쓰기를 막지 않고 일관된 백업 세트를 만들 수 있으며, 복구는 preload-file 설정에 매니페스트를 지정한다.",
    code: `BGSAVE                      # 백그라운드 스냅샷
INFO persistence            # rdb_bgsave_in_progress: 0 확인
# → dump.rdb 를 원격/S3로 복사

# AOF 백업 중 rewrite 잠시 중지
CONFIG SET auto-aof-rewrite-percentage 0
#  ... appenddirname 디렉터리 복사 ...
CONFIG SET auto-aof-rewrite-percentage 100

# 8.10+ 온라인 백업 명령군
BACKUP START / BACKUP LIST / BACKUP SEAL / BACKUP CLEANUP
# 복구: preload-file aof:/restore/appendonly.aof.manifest`,
    lang: "redis-cli",
  },

  /* ─────────────── PROG ─────────────── */
  {
    id: "PROG-001",
    nameEn: "PIPELINING",
    nameKo: "파이프라이닝",
    rarity: "R",
    type: "PROG",
    attrs: ["RTT", "Throughput"],
    atk: "왕복 지연 제거",
    def: "처리량 수배 향상",
    effect:
      "응답을 기다리지 않고 명령을 몰아서 보낸다. 명령마다 붙던 네트워크 왕복(RTT)이 사라져 처리량이 크게 오른다.",
    flavor: "느린 건 Redis가 아니라 왕복이다.",
    visual: "pipeline",
    snippet: "100 RTT  →  1 RTT",
    detail:
      "Redis 자체는 μs 단위인데 체감 성능을 지배하는 건 대부분 네트워크 왕복이다. SET 100번이 100 RTT라면 파이프라인으로 묶으면 사실상 1 RTT다. 단 서버가 응답을 메모리에 쌓아두므로 무한정 밀어 넣지 말고 수천~1만 개 단위로 끊어 보낸다. 중요한 구분: 파이프라이닝은 전송 최적화일 뿐 원자성 보장이 아니다. 중간에 다른 클라이언트 명령이 끼어들 수 있으므로, 원자성이 필요하면 MULTI/EXEC나 Lua를 써야 한다.",
    code: `# redis-py
pipe = r.pipeline(transaction=False)
for uid in user_ids:            # 10,000명
    pipe.hgetall(f"user:{uid}")
    if len(pipe) >= 1000:       # 1000개씩 끊어서 flush
        results.extend(pipe.execute())
res = pipe.execute()

# 왕복 1회 = RTT 1ms 라면
#   개별 실행 : 10,000 × 1ms = 10초
#   파이프라인: 10회 flush   ≈ 10ms`,
    lang: "python",
  },
  {
    id: "PROG-002",
    nameEn: "TRANSACTIONS & LUA",
    nameKo: "트랜잭션과 스크립트",
    rarity: "SR",
    type: "PROG",
    attrs: ["MULTI", "WATCH", "EVAL"],
    atk: "EXEC 독점 실행",
    def: "WATCH 낙관적 락",
    effect:
      "MULTI로 명령을 큐에 모아 EXEC에서 한 번에, 다른 클라이언트가 끼어들지 않게 실행한다. 롤백은 없다.",
    flavor: "읽고-판단하고-쓸 거라면, 서버로 보내라.",
    visual: "multi",
    snippet: "WATCH → MULTI → EXEC",
    detail:
      "EXEC 시점에 큐잉된 명령들이 순차·독점 실행된다. 단 롤백이 없다 — 실행 중 실패한 명령이 있어도 나머지는 그대로 적용된다(문법 오류는 큐잉 단계에서 걸러져 EXEC 자체가 실패). 조건부 갱신은 WATCH로 감시한 키가 바뀌면 EXEC가 nil을 반환하는 낙관적 락(CAS)으로 구현하고, 실패 시 재시도한다. 읽고-판단하고-쓰는 로직이라면 EVAL로 Lua 스크립트를 보내는 편이 낫다 — 단일 스레드에서 통째로 원자 실행되므로 재시도 루프가 필요 없다(7.0+는 Functions).",
    code: `WATCH  stock:42          # 이 키가 바뀌면 EXEC 취소
GET    stock:42          # -> 5  (앱에서 판단)
MULTI
DECR   stock:42
LPUSH  orders "order:99"
EXEC                     # -> nil 이면 누가 먼저 바꿈 → 재시도

-- Lua: 재시도 없이 서버에서 원자 실행
EVAL "
  local s = tonumber(redis.call('GET', KEYS[1]))
  if s > 0 then
    redis.call('DECR', KEYS[1]); return 1
  end
  return 0
" 1 stock:42`,
    lang: "lua",
  },
  {
    id: "PROG-003",
    nameEn: "CLIENT-SIDE CACHING",
    nameKo: "클라이언트 사이드 캐싱",
    rarity: "SR",
    type: "PROG",
    attrs: ["Tracking", "RESP3"],
    atk: "왕복 자체를 제거",
    def: "서버가 무효화 통보",
    effect:
      "자주 읽는 값을 애플리케이션 메모리에 두고, 그 값이 바뀌면 서버가 무효화 메시지를 밀어준다. 캐시의 캐시.",
    flavor: "가장 빠른 조회는, 조회하지 않는 것.",
    visual: "tracking",
    snippet: "CLIENT TRACKING ON",
    detail:
      "CLIENT TRACKING ON으로 켜면 서버가 그 커넥션이 읽은 키를 기억해 두었다가, 누군가 그 키를 변경하면 invalidate 메시지를 보낸다. RESP3에서는 같은 커넥션으로 push 메시지가 오고, RESP2에서는 별도 구독 커넥션(REDIRECT)으로 받는다. 키를 하나씩 추적하는 대신 프리픽스 단위로 통보받는 BCAST 모드도 있는데, 서버 메모리는 아끼지만 내가 읽지 않은 키의 무효화까지 받는다. 읽기 대비 쓰기가 드문 설정값·프로필·피처 플래그 같은 데이터에 효과가 크고, 반대로 자주 바뀌는 키에 쓰면 무효화 폭풍만 남는다.",
    code: `HELLO 3                     # RESP3 (push 수신)
CLIENT TRACKING ON

GET config:feature-flags    # 서버가 이 키를 기억
# → 애플리케이션 로컬 맵에 저장

# 다른 클라이언트가 값을 바꾸면
# >2 invalidate  1) "config:feature-flags"  (push)
# → 로컬 캐시에서 제거하고 다음 읽기 때 다시 GET

# 프리픽스 단위 통보 (서버 메모리 절약)
CLIENT TRACKING ON BCAST PREFIX config:`,
    lang: "redis-cli",
  },
  {
    id: "PROG-004",
    nameEn: "BLOCKING COMMANDS",
    nameKo: "블로킹 명령",
    rarity: "R",
    type: "PROG",
    attrs: ["Blocking", "Queue"],
    atk: "폴링 루프 제거",
    def: "타임아웃 지정",
    effect:
      "데이터가 생길 때까지 클라이언트를 대기시키는 명령군. 1초마다 찔러보는 폴링 없이 이벤트 기반 소비가 된다.",
    flavor: "기다리는 건 클라이언트지, 서버가 아니다.",
    visual: "blocking",
    snippet: "BLPOP · BLMOVE · XREAD BLOCK",
    detail:
      "BLPOP/BRPOP(리스트), BLMOVE(리스트 간 이동), BZPOPMIN/BZMPOP(정렬 집합), XREAD BLOCK(스트림)이 있다. 이름과 달리 서버 전체를 멈추지 않는다 — 해당 클라이언트만 대기 상태로 빠지고 서버는 다른 요청을 계속 처리한다(INFO clients의 blocked_clients로 확인). 타임아웃 0은 무한 대기다. 실무 주의점은 커넥션이다. 대기 중인 커넥션은 그동안 다른 명령에 재사용할 수 없으므로 커넥션 풀에서 블로킹 전용 커넥션을 분리해야 한다. MULTI 트랜잭션이나 스크립트 안에서는 블로킹하지 않고 즉시 반환한다.",
    code: `BLPOP jobs 0              # 무한 대기 (폴링 불필요)
BLPOP jobs 5              # 5초 대기 후 nil

BLMOVE jobs jobs:proc RIGHT LEFT 0    # 대기 + 원자적 이동
BZPOPMIN delayed 0                    # 우선순위 큐

XREAD BLOCK 5000 STREAMS events $     # 새 엔트리만 대기

INFO clients              # blocked_clients 로 확인
# ⚠ 블로킹용 커넥션은 풀에서 분리할 것`,
    lang: "redis-cli",
  },
  {
    id: "PROG-005",
    nameEn: "SCAN & CURSORS",
    nameKo: "SCAN과 커서",
    rarity: "R",
    type: "PROG",
    attrs: ["SCAN", "Cursor"],
    atk: "논블로킹 순회",
    def: "완전 순회 보장",
    effect:
      "KEYS 대신 커서로 조금씩 나눠 훑는다. 순회 내내 존재한 원소는 반드시 한 번 이상 반환되지만, 중복될 수 있다.",
    flavor: "중복은 감수하고, 누락은 막는다.",
    visual: "scan",
    snippet: "cursor 0 → … → 0",
    detail:
      "커서 0으로 시작해 반환된 커서로 다시 호출하고, 커서가 0으로 돌아오면 끝이다. 보장은 '순회 시작부터 끝까지 계속 존재한 원소는 최소 한 번 반환'이며 중복 반환은 가능하므로 애플리케이션이 멱등하게 처리해야 한다. 도중에 추가되거나 삭제된 원소는 반환될 수도, 아닐 수도 있다. COUNT는 한 번에 훑을 양의 힌트일 뿐 반환 개수 보장이 아니고, MATCH는 훑은 뒤 필터링이라 빈 배열이 여러 번 돌아오는 게 정상이다 — 빈 결과를 종료 신호로 오해하면 안 된다. HSCAN/SSCAN/ZSCAN으로 큰 컬렉션 내부도 같은 방식으로 순회한다.",
    code: `SCAN 0 MATCH "session:*" COUNT 100
# 1) "17408"                ← 다음 커서
# 2) 1) "session:u1" 2) "session:u7"
SCAN 17408 MATCH "session:*" COUNT 100
# … 커서가 "0" 이 되면 종료

HSCAN big:hash 0 COUNT 100    # 해시 필드 순회
SSCAN big:set  0 COUNT 100
ZSCAN big:zset 0 COUNT 100

# ⚠ 빈 배열이 와도 커서가 0이 아니면 계속 진행`,
    lang: "redis-cli",
  },

  /* ─────────────── PATTERN ─────────────── */
  {
    id: "PATTERN-001",
    nameEn: "CACHE-ASIDE",
    nameKo: "캐시 어사이드",
    rarity: "R",
    type: "PATTERN",
    attrs: ["Cache", "TTL"],
    atk: "읽기 부하 흡수",
    def: "TTL이 최후의 정합성",
    effect:
      "앱이 캐시를 먼저 보고, 없으면 DB에서 읽어 캐시에 채운다. 가장 널리 쓰이는 기본형이자 대부분의 정답.",
    flavor: "캐시는 진실이 아니라 사본이다.",
    visual: "cacheaside",
    snippet: "GET → miss → DB → SET EX",
    detail:
      "읽기는 GET → 없으면 DB 조회 → SET에 TTL을 붙여 저장. 쓰기는 DB를 갱신한 뒤 캐시를 '갱신'하지 말고 '삭제(DEL)'하는 편이 안전하다 — 동시 쓰기 상황에서 캐시에 옛 값이 눌러앉는 경합을 줄여준다. TTL은 무슨 일이 있어도 결국 값이 맞춰지게 하는 마지막 안전장치이므로 반드시 건다(무한 TTL 금지). 존재하지 않는 ID로 조회가 폭격되면 매번 DB까지 가므로, 짧은 TTL로 널 값을 캐싱하거나 Bloom 필터로 앞단에서 막는다.",
    code: `# 읽기
val = GET  product:42
if val is None:
    val = db.query(42)
    SET product:42 <val> EX 600      # TTL 필수

# 쓰기 — 갱신이 아니라 무효화
db.update(42, new_val)
DEL product:42

# 없는 ID 폭격 방어: 짧은 TTL 널 캐싱
SET product:99999 "__NULL__" EX 30`,
    lang: "python",
  },
  {
    id: "PATTERN-002",
    nameEn: "CACHE STAMPEDE",
    nameKo: "캐시 스탬피드",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["Stampede", "Jitter"],
    atk: "동시 재계산 차단",
    def: "TTL 지터 분산",
    effect:
      "인기 키의 TTL이 끝나는 순간 수천 요청이 한꺼번에 DB로 몰리는 현상. 캐시를 잘 깔아두고도 DB가 죽는다.",
    flavor: "다 같이 만료되면, 다 같이 몰려간다.",
    visual: "stampede",
    snippet: "TTL 만료 → N개 요청 동시 miss",
    detail:
      "세 처방을 조합한다. (1) TTL 지터 — 같은 시각에 채운 키들이 같은 시각에 함께 만료되지 않도록 만료 시간에 무작위 오차를 더한다. (2) 뮤텍스 — SET NX로 재계산 권한을 정확히 한 요청에만 주고 나머지는 짧게 기다렸다 캐시를 다시 읽는다. (3) 논리적 만료 — 값 안에 '언제부터 낡았는지'를 넣고 실제 TTL은 넉넉히 잡아, 만료가 임박하면 한 요청만 백그라운드로 갱신하고 나머지는 옛 값을 그대로 받는다(stale-while-revalidate). 트래픽이 큰 서비스에서는 세 번째가 가장 안정적이다.",
    code: `# (1) TTL 지터
SET hot:key <val> EX 600            # ❌ 전부 같은 시각 만료
SET hot:key <val> EX (600 + rand(0,60))   # ✅

# (2) 뮤텍스 — 재계산은 한 요청만
if SET lock:hot:key 1 NX EX 10:      # 획득한 요청만
    val = db.query(); SET hot:key val EX 600; DEL lock:hot:key
else:
    sleep(50ms); val = GET hot:key   # 나머지는 재시도

# (3) 논리적 만료 (stale-while-revalidate)
SET hot:key '{"v":…,"stale_at":1786460000}' EX 3600
# stale_at 지나면 한 요청만 백그라운드 갱신, 나머지는 옛 값 사용`,
    lang: "python",
  },
  {
    id: "PATTERN-003",
    nameEn: "DISTRIBUTED LOCK",
    nameKo: "분산 락",
    rarity: "UR",
    type: "PATTERN",
    attrs: ["Lock", "NX", "Redlock"],
    atk: "SET NX PX 로 획득",
    def: "토큰 확인 후 해제",
    effect:
      "값에 무작위 토큰을 넣어 잠그고, 해제할 때 그 토큰이 내 것인지 확인하고 지운다. TTL이 데드락을 막는다.",
    flavor: "남의 락을 푸는 것이 최악의 버그.",
    visual: "lock",
    snippet: "SET res <token> NX PX 30000",
    detail:
      "획득은 SET resource <random> NX PX 30000 한 줄이다. 토큰이 필요한 이유는 해제에 있다 — 작업이 TTL보다 오래 걸려 락이 이미 만료되고 다른 클라이언트가 그 락을 잡았는데 내가 DEL 하면 남의 락을 푸는 셈이 된다. 그래서 '값이 내 토큰일 때만 삭제'를 원자적으로 해야 한다. Redis 8.4+는 DELEX key IFEQ <token>, 그 이전 버전은 GET 후 DEL 하는 Lua 스크립트를 쓴다. 복제가 비동기라 마스터 장애 시 두 클라이언트가 동시에 락을 쥘 수 있는데, 공식 문서는 독립 마스터 N대의 과반을 잡는 Redlock을 제시하면서도 정확성이 중요하면 펜싱 토큰을 함께 쓰라고 명시한다.",
    code: `SET lock:order:42 <random-token> NX PX 30000
# -> OK 면 획득, nil 이면 실패 (재시도는 랜덤 지연 후)

# 해제 — Redis 8.4+
DELEX lock:order:42 IFEQ <random-token>

# 해제 — 8.4 미만은 Lua로 원자 실행
EVAL "
  if redis.call('get', KEYS[1]) == ARGV[1] then
    return redis.call('del', KEYS[1])
  else return 0 end
" 1 lock:order:42 <random-token>

# ⚠ 비동기 복제 → 페일오버 시 이중 획득 가능
#   정확성이 중요하면 펜싱 토큰 병행`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-004",
    nameEn: "RATE LIMITING",
    nameKo: "레이트 리미팅",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["RateLimit", "Window"],
    atk: "고정 윈도우 2줄",
    def: "슬라이딩 윈도우 정확도",
    effect:
      "구현이 셋 있고 정확도·비용이 다르다 — 고정 윈도우(INCR), 슬라이딩 윈도우(ZSet), 토큰 버킷(Lua).",
    flavor: "경계에서 두 배가 새는지 확인하라.",
    visual: "ratelimit",
    snippet: "INCR + EXPIRE  |  ZSet  |  Bucket",
    detail:
      "고정 윈도우는 INCR 후 첫 호출에만 EXPIRE를 거는 두 줄이라 가장 싸지만, 경계에서 한도의 두 배가 통과한다(59초에 100회 + 61초에 100회). 슬라이딩 윈도우는 정렬 집합에 타임스탬프를 score로 넣고 오래된 것을 지운 뒤 개수를 세므로 정확하지만 요청마다 메모리와 명령이 더 든다. 버스트는 허용하되 평균을 제한하려면 토큰 버킷을 Lua로 구현한다(마지막 보충 시각과 잔량을 해시에 저장). 어느 방식이든 판정 로직은 Lua나 파이프라인으로 한 번의 왕복에 끝내야 경합이 생기지 않는다.",
    code: `# (1) 고정 윈도우 — 싸다, 경계에서 2배 샘
INCR   rl:u1000:202608121430
EXPIRE rl:u1000:202608121430 60 NX     # 첫 호출에만
# 값 > 100 이면 차단

# (2) 슬라이딩 윈도우 — 정확, 조금 비쌈
ZREMRANGEBYSCORE rl:u1000 0 <now-60000>
ZADD  rl:u1000 <now> <uuid>
ZCARD rl:u1000                          # > 100 이면 차단
EXPIRE rl:u1000 60

# (3) 토큰 버킷 — 버스트 허용 + 평균 제한 (Lua로 원자 실행)
HMGET bucket:u1000 tokens last_refill`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-005",
    nameEn: "RELIABLE QUEUE",
    nameKo: "신뢰성 작업 큐",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["Queue", "List", "Stream"],
    atk: "처리 중 유실 방지",
    def: "죽은 소비자 몫 회수",
    effect:
      "List의 LMOVE 패턴과 Stream의 컨슈머 그룹, 두 선택지가 있다. '소비자가 죽으면 그 작업은 어떻게 되나'가 갈림길이다.",
    flavor: "꺼낸 순간 사라지는 큐는 큐가 아니다.",
    visual: "queue",
    snippet: "List LMOVE  vs  Stream XACK",
    detail:
      "List 방식은 BLMOVE로 작업을 '처리 중' 리스트로 원자적으로 옮기고 완료 시 LREM 한다 — 가볍고 단순하지만 소비자가 죽으면 항목이 처리 중 리스트에 남아 별도 회수 로직(오래된 항목을 되돌리는 워커)이 필요하고, 여러 소비자 그룹이 같은 작업을 각자 보는 것은 불가능하다. Stream 방식은 XREADGROUP으로 받고 XACK로 확인하며, 미확인 항목은 PEL에 남아 XAUTOCLAIM으로 자동 회수되고 소비자 그룹을 여러 개 둘 수 있다. 재시도·데드레터·다중 소비자가 필요하면 Stream, 단순 백그라운드 작업이면 List가 맞다.",
    code: `# ── List 방식 (가볍다)
BLMOVE jobs jobs:proc RIGHT LEFT 0    # 꺼내며 '처리 중'으로
# ... 처리 ...
LREM jobs:proc 1 <payload>            # 완료
# ⚠ 죽은 소비자 항목은 별도 워커가 jobs 로 되돌려야 함

# ── Stream 방식 (재시도·다중 그룹)
XREADGROUP GROUP workers w1 COUNT 10 BLOCK 5000 STREAMS jobs >
XACK jobs workers <id>                # 완료
XAUTOCLAIM jobs workers w2 60000 0    # 60초 미확인분 회수
XPENDING jobs workers                 # 밀린 작업 확인`,
    lang: "redis-cli",
  },
];
