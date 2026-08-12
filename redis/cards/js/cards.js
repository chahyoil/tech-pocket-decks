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

  {
    id: "STARTER-006",
    nameEn: "CONFIG AT RUNTIME",
    nameKo: "런타임 설정",
    rarity: "N",
    type: "STARTER",
    attrs: ["CONFIG", "redis.conf"],
    atk: "재시작 없이 변경",
    def: "REWRITE로 영속화",
    effect:
      "대부분의 설정은 CONFIG SET으로 즉시 바뀐다. 단 파일에 쓰지 않으면 재시작과 함께 조용히 사라진다.",
    flavor: "고쳤다고 저장된 건 아니다.",
    visual: "config",
    snippet: "CONFIG SET → CONFIG REWRITE",
    detail:
      "CONFIG GET은 글롭 패턴으로 현재 값을 보여주고(CONFIG GET * 로 전체), CONFIG SET은 즉시 적용한다. 가장 흔한 사고가 CONFIG REWRITE를 빠뜨리는 것이다 — 런타임으로만 바꾼 maxmemory나 appendonly가 재시작하면 옛 설정으로 돌아가고, 그 결과 데이터가 날아가거나 축출이 멈춘다. 반대로 port·appenddirname처럼 시작 시에만 읽는 설정은 CONFIG SET으로 바꿀 수 없어 파일 수정 후 재시작이 필요하다. 무엇이 런타임 변경 가능한지는 CONFIG GET * 목록에 있는지로 판단한다.",
    code: `CONFIG GET maxmemory*          # 패턴으로 조회
CONFIG GET *                   # 런타임 변경 가능한 전체 목록

CONFIG SET maxmemory 4gb
CONFIG SET maxmemory-policy allkeys-lru
CONFIG REWRITE                 # ← 이걸 빼면 재시작 시 원복

# 시작 시에만 읽는 설정 (CONFIG SET 불가)
#   port · appenddirname · backupdirname · io-threads`,
    lang: "redis-cli",
  },

  {
    id: "STARTER-007",
    nameEn: "EDITIONS & FORKS",
    nameKo: "배포판과 포크",
    rarity: "R",
    type: "STARTER",
    attrs: ["OSS", "Stack", "Valkey"],
    atk: "8.0부터 Stack 통합",
    def: "버전별 라이선스 확인",
    effect:
      "Redis 8에서 Stack의 확장 기능이 Redis Open Source로 흡수됐다. 여기에 상용 배포판과 커뮤니티 포크가 갈라져 있다.",
    flavor: "어떤 Redis를 쓰는지부터 정확히 알 것.",
    visual: "editions",
    snippet: "OSS 8 = 구 Stack 포함",
    detail:
      "예전에는 핵심 서버(Redis OSS)와 JSON·시계열·확률형·검색 모듈을 묶은 Redis Stack이 따로 있었지만, 공식 문서는 'Redis 8 in Redis Open Source replaces Redis Stack'이라고 명시한다 — 즉 8부터는 한 배포판에 다 들어 있다. 그 위에 자체 관리형인 Redis Software와 완전 관리형 Redis Cloud가 있고, 여기에만 있는 기능(Active-Active 등)이 별도로 표시된다. 한편 2024년 라이선스 변경 이후 갈라져 나온 Valkey는 Linux Foundation 산하 BSD 라이선스 포크로, 핵심 API는 호환되지만 신규 기능은 갈라지고 있다. 카드나 문서를 쓸 때 대상 배포판과 버전을 못 박아야 하는 이유다.",
    code: `INFO server
#  redis_version:8.2.0
#  redis_mode:standalone | cluster | sentinel
#  os / arch_bits / process_id

# 이 배포판에 확장 타입이 있는지 확인
COMMAND INFO JSON.SET     # 비어 있으면 미지원
MODULE LIST               # 로드된 모듈 목록

# 문서 볼 때 항상 버전을 같이 볼 것
#   OSS 8+ = 구 Stack 기능 포함
#   Software / Cloud = 상용 전용 기능 별도 표기`,
    lang: "redis-cli",
  },
  {
    id: "STARTER-008",
    nameEn: "FIRST RUN",
    nameKo: "설치와 첫 실행",
    rarity: "N",
    type: "STARTER",
    attrs: ["Docker", "PING"],
    atk: "한 줄로 기동",
    def: "PING → PONG 확인",
    effect:
      "기본 포트 6379, 설정 파일 하나, 헬스체크는 PING 한 번. 시작에 필요한 것이 이게 전부다.",
    flavor: "PONG이 오면 절반은 끝난 것.",
    visual: "firstrun",
    snippet: "PING → PONG",
    detail:
      "로컬 실습은 컨테이너가 가장 빠르다 — 포트만 열고 띄우면 된다. 설정을 바꾸려면 redis.conf를 마운트하거나 명령행 인자로 넘긴다(--maxmemory 256mb 처럼 conf 키를 그대로 쓴다). 접속 확인은 PING이고, 응답이 PONG이면 서버·네트워크·인증이 모두 정상이라는 뜻이다. 데이터 디렉터리(dir)에 dump.rdb와 AOF 디렉터리가 생기므로 컨테이너라면 반드시 볼륨을 붙여야 재시작 때 살아남는다. 실습 후에는 FLUSHALL로 비우되, 운영에서는 ACL로 아예 막아두는 명령이다.",
    code: `# 컨테이너로 (볼륨 필수)
docker run -d --name redis -p 6379:6379 \\
  -v redis-data:/data redis:8 \\
  redis-server --appendonly yes --maxmemory 256mb

redis-cli PING              # -> PONG
redis-cli INFO server | head
redis-cli CONFIG GET dir    # 데이터 저장 위치

# 설정 파일로 띄우기
redis-server /etc/redis/redis.conf`,
    lang: "bash",
  },
  {
    id: "STARTER-009",
    nameEn: "MODELING BY ACCESS",
    nameKo: "접근 패턴으로 설계하기",
    rarity: "SR",
    type: "STARTER",
    attrs: ["Modeling", "KeyDesign"],
    atk: "질의에서 역산",
    def: "정규화 없음",
    effect:
      "관계형처럼 데이터를 먼저 정규화하고 나중에 질의하는 게 아니라, 필요한 질의를 먼저 정하고 그 답이 바로 나오는 자료구조를 고른다.",
    flavor: "조인이 없으니, 미리 조인해 둔다.",
    visual: "modeling",
    snippet: "질의 → 자료구조 → 키 이름",
    detail:
      "Redis에는 조인도 애드혹 쿼리도 없다. 그래서 설계 순서가 반대다 — '이 화면이 필요한 데이터는 무엇인가'를 먼저 적고, 그 답을 한 번의 명령으로 얻을 수 있는 구조를 고른 뒤, 키 이름을 정한다. 같은 데이터가 여러 형태로 중복 저장되는 것은 결함이 아니라 의도다(사용자 프로필 Hash + 랭킹 ZSet + 검색용 Set). 대신 갱신 지점이 여러 곳이 되므로 쓰기 경로를 한곳에 모으고, 정합성의 최후 보루로 TTL을 건다. 키 이름은 object:id:field 관례를 지키되 너무 길게 만들지 않는다 — 키 이름 자체도 메모리다.",
    code: `# ❌ 관계형 사고: 정규화 후 조인
# ✅ Redis 사고: 화면이 필요한 걸 그대로 저장

# "프로필 화면"      → HGETALL user:1000
HSET user:1000 name "Yuna" tier "gold"
# "랭킹 화면"        → ZREVRANGE rank:daily 0 9
ZADD rank:daily 980 "user:1000"
# "내 팔로워 수"     → SCARD followers:1000
SADD followers:1000 "user:1001"

# 같은 사실이 3곳에 중복 → 정상.
# 대신 쓰기 경로를 하나로 모으고 TTL로 보정한다.`,
    lang: "redis-cli",
  },
  {
    id: "STARTER-010",
    nameEn: "CHOOSING A CLIENT",
    nameKo: "클라이언트 고르기",
    rarity: "R",
    type: "STARTER",
    attrs: ["Client", "Pool", "RESP3"],
    atk: "커넥션 풀 내장",
    def: "클러스터 · RESP3 지원",
    effect:
      "언어마다 사실상의 표준 라이브러리가 있다. 고를 때 볼 것은 세 가지 — 커넥션 풀, 클러스터 대응, RESP3 지원.",
    flavor: "성능 차이는 대개 라이브러리가 아니라 설정에서 난다.",
    visual: "clientlib",
    snippet: "pool · cluster · RESP3",
    detail:
      "Python은 redis-py, Java는 Lettuce(비동기·클러스터 강함)와 Jedis(단순·동기), Go는 go-redis, Node.js는 node-redis와 ioredis가 사실상 표준이다. 선택 기준은 첫째 커넥션 풀 — 매 요청 연결을 새로 여는 구현은 지연의 대부분을 연결 수립에 쓴다. 둘째 클러스터 대응 — 슬롯 맵을 캐시하고 MOVED/ASK를 자동 처리하는지, 다중 키 명령을 슬롯별로 쪼개주는지. 셋째 RESP3 — 클라이언트 사이드 캐싱과 push 알림을 쓰려면 필요하다. 여기에 타임아웃과 재시도 정책을 라이브러리 기본값에 맡기지 말고 명시적으로 잡는 것이 실무 차이를 만든다.",
    code: `# redis-py
r = redis.Redis(host="…", port=6379, protocol=3,
    socket_timeout=2, socket_connect_timeout=1,
    health_check_interval=30, max_connections=50)

# 클러스터
rc = redis.RedisCluster(host="…", port=6379)

# 확인할 것
#  ① 커넥션 풀 — 요청마다 연결 새로 열지 않는가
#  ② 클러스터 — 슬롯 맵 캐시 · MOVED/ASK 자동 처리
#  ③ RESP3   — 클라이언트 사이드 캐싱 · push 수신`,
    lang: "python",
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

  {
    id: "TYPE-012",
    nameEn: "JSON",
    nameKo: "JSON 문서",
    rarity: "SR",
    type: "TYPE",
    attrs: ["JSON", "JSONPath"],
    atk: "경로 단위 부분 갱신",
    def: "중첩 · 배열 그대로",
    effect:
      "JSON 문서를 값으로 저장하고 JSONPath로 일부만 읽고 쓴다. 문자열에 직렬화해 넣는 것과 근본적으로 다르다.",
    flavor: "서버가 구조를 알면, 통째로 옮길 필요가 없다.",
    visual: "json",
    snippet: "JSON.SET k $.a.b value",
    detail:
      "String에 JSON을 통째로 넣으면 필드 하나 바꾸는 데도 전체를 읽고 파싱하고 다시 써야 한다. JSON 타입은 서버가 구조를 이해하므로 $.address.city 같은 경로를 지정해 부분만 갱신하고, JSON.NUMINCRBY로 중첩된 숫자를 원자적으로 증가시킨다. 배열 조작(JSON.ARRAPPEND/ARRPOP)도 서버에서 끝난다. Hash와의 차이는 중첩과 배열을 그대로 담을 수 있다는 점이고, 대가는 Hash보다 큰 메모리와 파싱 비용이다. 구조가 평평하면 Hash가, 계층적이면 JSON이 맞다.",
    code: `JSON.SET user:1000 $ '{"name":"Yuna","addr":{"city":"Seoul"},"tags":[]}'

JSON.GET user:1000 $.addr.city        # -> ["Seoul"]
JSON.SET user:1000 $.addr.city '"Busan"'   # 부분 갱신

JSON.NUMINCRBY user:1000 $.visits 1   # 중첩 숫자 원자 증가
JSON.ARRAPPEND user:1000 $.tags '"vip"'
JSON.ARRLEN    user:1000 $.tags
JSON.DEL       user:1000 $.addr`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-013",
    nameEn: "TIME SERIES",
    nameKo: "시계열",
    rarity: "SR",
    type: "TYPE",
    attrs: ["TimeSeries", "Downsampling"],
    atk: "자동 다운샘플링",
    def: "보존 기간 자동 정리",
    effect:
      "타임스탬프-값 쌍을 전용 구조로 저장한다. 라벨로 여러 시계열을 묶어 질의하고, 규칙으로 집계본을 자동 생성한다.",
    flavor: "원본은 버리고 요약만 남긴다.",
    visual: "timeseries",
    snippet: "TS.CREATERULE → 1분 평균",
    detail:
      "TS.CREATE에 RETENTION(보존 기간)과 LABELS(메타데이터)를 지정하고 TS.ADD로 포인트를 넣는다. 핵심은 TS.CREATERULE이다 — 원본 시계열에 규칙을 걸면 1분·1시간 평균 같은 집계 시계열이 자동으로 채워지므로, 원본은 짧은 RETENTION으로 버리고 요약만 오래 남길 수 있다. TS.MRANGE는 라벨 필터(sensor=temp)로 여러 시계열을 한 번에 질의한다. ZSet에 타임스탬프를 score로 넣는 수제 방식보다 메모리 효율과 집계·보존 기능이 앞선다.",
    code: `TS.CREATE temp:seoul RETENTION 86400000 LABELS sensor temp city seoul
TS.ADD    temp:seoul * 27.4         # * = 현재 시각

# 1분 평균 집계본을 자동 생성
TS.CREATE     temp:seoul:1m RETENTION 2592000000
TS.CREATERULE temp:seoul temp:seoul:1m AGGREGATION avg 60000

TS.RANGE  temp:seoul - + AGGREGATION max 3600000
TS.MRANGE - + FILTER sensor=temp     # 라벨로 여러 시계열 한 번에`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-014",
    nameEn: "ARRAYS",
    nameKo: "배열 (8.8 신규)",
    rarity: "UR",
    type: "TYPE",
    attrs: ["Array", "Sparse", "RingBuffer"],
    atk: "인덱스 O(1) 접근",
    def: "희소 저장 · 링 버퍼",
    effect:
      "인덱스로 직접 접근하는 희소 배열. 리스트와 정확히 반대의 트레이드오프 — 임의 인덱스가 상수 시간이고 빈 구간은 메모리를 쓰지 않는다.",
    flavor: "리스트가 못 하는 쪽만 골라서 한다.",
    visual: "arrays",
    snippet: "ARLEN 1000001 / ARCOUNT 2",
    detail:
      "Redis 8.8에 추가된 타입이다. ARSET/ARGET으로 인덱스에 쓰고 읽으며 설정되지 않은 인덱스는 nil을 돌려준다. 희소성의 핵심은 두 길이 개념이다 — ARLEN은 논리 길이(가장 큰 인덱스+1), ARCOUNT는 실제 원소 수다. 0번과 100만번에만 값을 넣으면 ARLEN은 1000001, ARCOUNT는 2가 된다. ARRING으로 고정 크기 링 버퍼로 만들면 가장 오래된 항목을 자동으로 덮어써 '최근 N개 로그' 용도에 맞고, ARLASTITEMS로 최근 삽입분만 꺼낸다. AROP은 구간 집계를, ARSCAN은 빈 슬롯을 건너뛴 순회를 한다.",
    code: `ARSET   sparse 0 "a"
ARSET   sparse 1000000 "b"
ARLEN   sparse            # -> 1000001 (논리 길이)
ARCOUNT sparse            # -> 2       (실제 원소)
ARGET   sparse 500        # -> nil

ARMSET  a 0 "x" 7 "y"     # 임의 인덱스 다중 쓰기
ARSCAN  a 0               # 빈 슬롯 건너뛴 index-value 순회

ARRING      logs 1000 "line…"   # 고정 1000칸 링 버퍼
ARLASTITEMS logs 10 REV         # 최근 10개`,
    lang: "redis-cli",
  },

  {
    id: "TYPE-015",
    nameEn: "BITFIELD",
    nameKo: "비트필드",
    rarity: "SR",
    type: "TYPE",
    attrs: ["Bitfield", "Overflow"],
    atk: "한 키에 카운터 여러 개",
    def: "오버플로 정책 선택",
    effect:
      "문자열을 임의 폭의 정수 필드로 쪼개 쓴다. 작은 카운터 수십 개를 키 하나에 압축해 담는다.",
    flavor: "8비트면 충분한 값에 8바이트를 쓰지 마라.",
    visual: "bitfield",
    snippet: "u8 · i16 · WRAP|SAT|FAIL",
    detail:
      "BITFIELD는 하나의 문자열 안에서 '오프셋 0부터 8비트 부호 없는 정수', '오프셋 8부터 16비트 부호 있는 정수' 같은 식으로 필드를 지정해 GET/SET/INCRBY 한다. u<n>은 부호 없음(최대 63비트), i<n>은 부호 있음(최대 64비트)이고, #n 표기를 쓰면 필드 폭 단위 인덱스로 지정할 수 있다. 진짜 가치는 OVERFLOW 정책이다 — WRAP(순환), SAT(최대·최소값에서 포화), FAIL(넘치면 nil 반환)을 필드별로 지정할 수 있어, 상한이 있는 카운터를 애플리케이션 분기 없이 서버에서 처리한다. 사용자별 소규모 통계 여러 개를 키 폭발 없이 담는 데 적합하다.",
    code: `# user:1000 통계를 한 키에: [0]조회수 u8, [1]좋아요 u8
BITFIELD stats:1000 SET u8 #0 0 SET u8 #1 0

BITFIELD stats:1000 INCRBY u8 #0 1 GET u8 #0

# 255에서 더 올리면?
BITFIELD stats:1000 OVERFLOW SAT  INCRBY u8 #0 10   # 255 고정
BITFIELD stats:1000 OVERFLOW WRAP INCRBY u8 #0 10   # 순환
BITFIELD stats:1000 OVERFLOW FAIL INCRBY u8 #0 10   # -> nil

BITFIELD_RO stats:1000 GET u8 #0    # 복제본에서 읽기 전용`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-016",
    nameEn: "LIST — ADVANCED",
    nameKo: "리스트 심화",
    rarity: "R",
    type: "TYPE",
    attrs: ["quicklist", "LPOS", "LMPOP"],
    atk: "위치 탐색 · 다중 팝",
    def: "quicklist 압축 저장",
    effect:
      "리스트는 내부적으로 listpack 노드를 이은 quicklist다. 양 끝이 아닌 연산은 비싸지만, 그걸 줄여주는 명령들이 있다.",
    flavor: "가운데를 건드릴 거면 리스트가 아닐 수도.",
    visual: "listadv",
    snippet: "LPOS · LINSERT · LMPOP",
    detail:
      "LPOS는 값이 있는 인덱스를 찾아준다 — RANK로 n번째 일치를, COUNT로 여러 개를 한 번에 얻으므로 '작업 큐에서 특정 작업의 위치'를 알아낼 때 LRANGE 전체 조회를 대신한다. LINSERT는 특정 값 앞뒤에 삽입하고, LSET은 인덱스 값을 교체한다(둘 다 O(N)). LMPOP은 여러 리스트 중 비어 있지 않은 첫 리스트에서 여러 개를 한 번에 꺼내 우선순위 큐 순회를 없앤다. 저장 구조인 quicklist는 listpack 노드들의 이중 연결 리스트이며 list-max-listpack-size로 노드 크기를, list-compress-depth로 양 끝을 제외한 가운데 노드 압축을 조절한다.",
    code: `LPOS jobs "job:42"                  # 인덱스 찾기
LPOS jobs "job:42" RANK 2 COUNT 3   # 2번째부터 3개

LINSERT jobs BEFORE "job:42" "job:41"
LSET    jobs 0 "job:00"

LMPOP 3 q:high q:mid q:low LEFT COUNT 5   # 비어있지 않은 첫 큐

CONFIG GET list-max-listpack-size   # 노드당 원소 수
CONFIG GET list-compress-depth      # 가운데 노드 압축
OBJECT ENCODING jobs                # -> listpack | quicklist`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-017",
    nameEn: "SORTED SET — ADVANCED",
    nameKo: "정렬 집합 심화",
    rarity: "SR",
    type: "TYPE",
    attrs: ["ZRANGESTORE", "GT/LT", "ZDIFF"],
    atk: "조건부 점수 갱신",
    def: "결과 저장 없는 집합 연산",
    effect:
      "ZADD의 NX/XX/GT/LT 플래그와 STORE 없는 집합 연산을 알면, 앱에서 하던 판단을 서버로 옮길 수 있다.",
    flavor: "점수는 올라가기만 해야 할 때가 많다.",
    visual: "zsetadv",
    snippet: "ZADD … GT — 최고 기록만",
    detail:
      "ZADD에 GT를 붙이면 새 점수가 기존보다 클 때만 갱신된다 — '최고 기록'을 저장할 때 GET으로 읽어 비교하는 왕복이 사라지고 경합도 없어진다. LT는 반대(최단 시간 기록), NX는 없을 때만, XX는 있을 때만이다. 7.0부터 ZDIFF/ZINTER/ZUNION은 결과를 저장하지 않고 바로 반환하므로, 임시 키를 만들고 지우던 패턴이 필요 없다(저장이 필요하면 여전히 …STORE). ZRANGESTORE는 범위 조회 결과를 다른 키에 바로 담아 페이지 캐시를 만든다. ZRANDMEMBER는 중복 허용(음수 count) 추첨을 지원한다.",
    code: `ZADD best:score GT CH 980 "player:7"   # 더 클 때만 갱신
#   CH = 실제로 바뀐 원소 수 반환
ZADD best:time  LT CH 12.4 "player:7"  # 더 작을 때만 (기록 단축)

ZINTER 2 tags:a tags:b WITHSCORES      # 임시 키 없이 즉시 반환
ZDIFF  2 all:users banned WITHSCORES

ZRANGESTORE page:1 rank:daily 0 19 REV # 상위 20을 별도 키로
ZRANDMEMBER rank:daily -5              # 중복 허용 추첨`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-018",
    nameEn: "STREAM — TRIM & CLAIM",
    nameKo: "스트림 트리밍과 회수",
    rarity: "SR",
    type: "TYPE",
    attrs: ["MAXLEN", "MINID", "XCLAIM"],
    atk: "메모리 상한 유지",
    def: "죽은 소비자 몫 회수",
    effect:
      "스트림은 지우지 않으면 무한히 자란다. 트리밍 전략과 미확인 메시지 회수가 실제 운영의 전부다.",
    flavor: "로그는 남기되, 영원히 남기지는 말 것.",
    visual: "streamops",
    snippet: "MAXLEN ~ 10000 · MINID",
    detail:
      "MAXLEN은 개수로, MINID는 ID(=시각) 기준으로 자른다 — '최근 10000건'이면 MAXLEN, '3일치 보관'이면 MINID가 맞다. 앞에 ~를 붙이면 정확히 그 숫자가 아니라 노드 경계까지만 지우는 근사 트리밍이라 훨씬 싸다(운영에서는 거의 항상 ~를 쓴다). 소비자가 죽으면 그 메시지는 PEL에 남는데, XPENDING으로 유휴 시간을 확인하고 XCLAIM으로 특정 메시지를, XAUTOCLAIM으로 일정 시간 이상 방치된 것들을 한 번에 다른 소비자에게 옮긴다. 재시도 횟수(delivery count)가 임계를 넘으면 데드레터 스트림으로 보내는 것이 표준 처리다.",
    code: `XADD events MAXLEN ~ 10000 * type "click"   # 근사 트리밍(권장)
XADD events NOMKSTREAM * type "x"          # 없으면 만들지 않음
XTRIM events MINID ~ <3일전-ms>            # 시각 기준 보관

XPENDING events analytics - + 10           # 미확인 + 유휴시간
XAUTOCLAIM events analytics w2 60000 0 COUNT 10
XCLAIM events analytics w2 60000 <id>      # 특정 메시지만

XINFO STREAM events FULL                   # 내부 구조·PEL 전체
XINFO GROUPS events                        # lag, pending 확인`,
    lang: "redis-cli",
  },
  {
    id: "TYPE-019",
    nameEn: "CHOOSING A TYPE",
    nameKo: "자료구조 선택표",
    rarity: "UR",
    type: "TYPE",
    attrs: ["Compare", "Decision"],
    atk: "문제 → 구조 매핑",
    def: "잘못된 선택 회피",
    effect:
      "같은 문제를 여러 타입으로 풀 수 있다. 결정 기준은 '무엇을 질의할 것인가' 하나뿐이다.",
    flavor: "저장이 아니라 조회가 타입을 정한다.",
    visual: "typepick",
    snippet: "질의 형태 → 자료구조",
    detail:
      "단일 값 조회·카운터면 String. 필드 단위로 읽고 쓰는 객체면 Hash. 순서가 있고 양 끝에서 넣고 빼면 List. 중복 없는 소속 판정과 집합 연산이면 Set. 순위·범위·우선순위가 필요하면 Sorted Set. 여러 소비자가 재처리·확인하며 읽어야 하면 Stream. 개수만 알면 되고 정확도를 조금 포기해도 되면 HyperLogLog. 존재 여부만 대량으로 걸러야 하면 Bloom. 중첩 구조를 부분 갱신해야 하면 JSON. 시각별 값과 자동 집계가 필요하면 Time Series. 유사도 검색이면 Vector Set. 헷갈릴 때의 기본값은 Hash와 Sorted Set이며, 이 둘로 안 되면 대개 설계가 잘못된 것이다.",
    code: `# 질의 형태 → 자료구조
"값 하나 / 카운터"        → String   GET · INCR
"객체의 일부 필드"        → Hash     HGET · HINCRBY
"큐 · 최근 N개"           → List     LPUSH · LRANGE · LTRIM
"소속 판정 · 교집합"      → Set      SISMEMBER · SINTER
"순위 · 범위 · 우선순위"  → ZSet     ZREVRANGE · ZRANGEBYSCORE
"여러 소비자 · 재처리"    → Stream   XREADGROUP · XACK
"개수만 (근사 OK)"        → HLL      PFADD · PFCOUNT
"존재 여부 대량 필터"     → Bloom    BF.EXISTS
"중첩 구조 부분 갱신"     → JSON     JSON.SET $.a.b
"시각별 값 + 집계"        → TS       TS.ADD · TS.CREATERULE
"유사도 검색"             → Vector   VADD · VSIM`,
    lang: "text",
  },
  {
    id: "TYPE-020",
    nameEn: "MEMORY COST BY TYPE",
    nameKo: "타입별 메모리 비용",
    rarity: "SR",
    type: "TYPE",
    attrs: ["Memory", "Overhead"],
    atk: "같은 데이터 · 다른 비용",
    def: "키 개수가 진짜 비용",
    effect:
      "값 자체보다 키 하나당 붙는 오버헤드가 크다. 키를 쪼갤수록 메모리가 늘고, 묶을수록 준다.",
    flavor: "100만 키보다 1만 해시가 싸다.",
    visual: "memcost",
    snippet: "1M keys ≫ 10K hashes",
    detail:
      "키 하나에는 키 문자열, 딕셔너리 엔트리, robj 헤더, 만료 딕셔너리 엔트리(TTL이 있다면)가 따라붙어 값이 몇 바이트든 수십~백 바이트의 고정 비용이 생긴다. 그래서 user:1:name, user:1:email처럼 필드마다 키를 만드는 것보다 Hash 하나에 필드로 담는 편이 몇 배 싸고, 작은 Hash는 listpack으로 압축되어 더 싸진다. 반대로 한 Hash에 필드를 수만 개 넣으면 임계를 넘어 hashtable로 바뀌며 이점이 사라지므로, 큰 해시는 user:{id/1000} 식으로 버킷을 나눠 각각을 listpack 범위 안에 유지하는 '해시 샤딩'을 쓴다. 실측은 항상 MEMORY USAGE로 한다.",
    code: `# 같은 데이터, 세 가지 저장 방식의 실측 비교
SET user:1:name "Yuna"; SET user:1:email "y@ex.com"
MEMORY USAGE user:1:name          # 키마다 고정 오버헤드

HSET user:1 name "Yuna" email "y@ex.com"
MEMORY USAGE user:1               # 훨씬 작다 (listpack)

# 키 이름도 메모리다
#   "user:profile:preferences:1000"  vs  "u:p:1000"

# 큰 해시는 버킷으로 쪼개 listpack 범위 유지
#   user:{id/1000} 안에 field=id 로 저장`,
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

  {
    id: "ARCH-008",
    nameEn: "THREADED I/O",
    nameKo: "I/O 멀티스레드",
    rarity: "SR",
    type: "ARCH",
    attrs: ["io-threads", "Throughput"],
    atk: "네트워크 I/O 병렬화",
    def: "명령 실행은 여전히 단일",
    effect:
      "6.0부터 소켓 읽기·쓰기를 여러 스레드로 나눈다. 하지만 명령 자체는 변함없이 한 스레드에서 하나씩 실행된다.",
    flavor: "병목은 대개 실행이 아니라 배달이었다.",
    visual: "iothreads",
    snippet: "io-threads 4 (실행은 1)",
    detail:
      "단일 스레드 병목은 명령 실행보다 커널과 데이터를 주고받는 네트워크 I/O인 경우가 많다. io-threads를 켜면 응답 쓰기를(io-threads-do-reads yes면 요청 읽기까지) 워커 스레드가 나눠 처리해 처리량이 오른다. 중요한 건 원자성이 그대로라는 점이다 — 파싱된 명령의 실행은 여전히 메인 스레드가 순차로 하므로 '락이 필요 없다'는 전제는 깨지지 않는다. 코어 수보다 적게(보통 4 이하) 잡고, 처리량이 실제로 네트워크에 묶여 있을 때만 켠다. 값이 작은 대량 요청에 효과가 크고, 이미 파이프라이닝을 쓰고 있다면 효과가 작다.",
    code: `# redis.conf — 시작 시에만 설정 가능
io-threads 4              # 코어 수보다 작게
io-threads-do-reads yes   # 읽기까지 분산

# 효과 확인: 파이프라인 없이 대량 요청
redis-benchmark -t get -n 1000000 -c 100 -d 64

# ⚠ 여전히 유효한 전제
#   명령 실행 = 단일 스레드 = 원자성 보장
#   O(N) 명령 하나가 전체를 막는 것도 그대로`,
    lang: "conf",
  },
  {
    id: "ARCH-009",
    nameEn: "FORK & COPY-ON-WRITE",
    nameKo: "fork와 copy-on-write",
    rarity: "UR",
    type: "ARCH",
    attrs: ["fork", "COW", "THP"],
    atk: "서비스 중 스냅샷",
    def: "쓰기량만큼 메모리 추가",
    effect:
      "BGSAVE와 AOF rewrite는 fork한 자식이 수행한다. 부모는 계속 서비스하지만 그동안 수정된 페이지만큼 메모리가 더 든다.",
    flavor: "저장하는 순간이 가장 위험하다.",
    visual: "fork",
    snippet: "부모 쓰기 → 그 페이지만 복사",
    detail:
      "fork 직후 부모와 자식은 같은 물리 페이지를 공유하고, 부모가 어떤 페이지에 쓰는 순간 그 페이지만 복사된다. 그래서 저장 중 쓰기가 많으면 메모리가 최대 2배까지 늘 수 있다 — 공식 문서도 쓰기가 많은 환경에서는 이를 감안해 메모리를 잡으라고 명시한다. 두 가지가 이를 악화시킨다. Transparent Huge Pages가 켜져 있으면 복사 단위가 2MB로 커져 메모리와 지연이 함께 튀므로 반드시 끈다. vm.overcommit_memory가 0이면 여유가 부족할 때 fork 자체가 실패해 저장이 아예 안 된다. 또 fork에 걸리는 시간은 데이터셋 크기에 비례하며 그동안 응답이 멈춘다 — LATENCY DOCTOR가 fork를 자주 지목하는 이유다.",
    code: `# fork를 유발하는 작업
BGSAVE          # RDB 스냅샷
BGREWRITEAOF    # AOF 재작성
# + 복제본 전체 재동기화(디스크리스 아니면)

INFO stats      # latest_fork_usec ← fork에 멈춘 시간
INFO memory     # used_memory_peak vs used_memory

# 반드시 선행할 OS 설정
sysctl vm.overcommit_memory=1
echo never > /sys/kernel/mm/transparent_hugepage/enabled`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-010",
    nameEn: "CLUSTER FAILOVER",
    nameKo: "클러스터 페일오버",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Gossip", "PFAIL", "Quorum"],
    atk: "노드 장애 자동 승격",
    def: "마스터 과반 필요",
    effect:
      "노드끼리 gossip으로 서로를 감시하다 마스터가 죽으면 그 복제본이 승격한다. Sentinel 없이 클러스터가 스스로 처리한다.",
    flavor: "감시자를 따로 두지 않는 대신, 서로를 본다.",
    visual: "clusterfail",
    snippet: "PFAIL → FAIL → 승격",
    detail:
      "각 노드는 cluster bus로 상태를 주고받는다. cluster-node-timeout 동안 응답이 없으면 PFAIL(의심)로 표시되고, 과반 마스터가 동의하면 FAIL로 승격되어 해당 마스터의 복제본들이 선거를 거쳐 하나가 올라선다. 그래서 마스터는 3대 이상 홀수여야 과반이 성립한다 — 2대 구성은 한 대가 죽으면 남은 한 대가 과반이 아니라 아무 일도 못 한다. cluster-require-full-coverage가 yes(기본)면 슬롯 일부라도 담당 노드가 없을 때 클러스터 전체가 쓰기를 거부한다. 가용성을 우선하려면 no로 바꾸되 일부 키가 안 보이는 상태를 감수해야 한다. 복제는 여전히 비동기라 승격 시점의 미전파 쓰기는 유실될 수 있다.",
    code: `CLUSTER INFO
#  cluster_state:ok | fail
#  cluster_slots_assigned:16384
#  cluster_known_nodes:6

CLUSTER NODES        # myself,master / slave / fail? / fail

# 핵심 설정
cluster-node-timeout 15000
cluster-require-full-coverage yes   # no = 부분 가용성 허용
cluster-replica-validity-factor 10

CLUSTER FAILOVER          # 복제본에서 수동 전환(점검용)
CLUSTER FAILOVER TAKEOVER # 마스터 응답 없을 때 강제`,
    lang: "redis-cli",
  },

  {
    id: "ARCH-011",
    nameEn: "EXPIRE CYCLE",
    nameKo: "만료 처리 내부",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Passive", "Active", "hz"],
    atk: "표본 기반 능동 삭제",
    def: "접근 시 수동 삭제",
    effect:
      "TTL이 끝나도 그 순간 삭제되지 않는다. 접근할 때 지우거나, 백그라운드가 표본을 뽑아 지운다.",
    flavor: "만료 시각은 약속이지 알람이 아니다.",
    visual: "expirecycle",
    snippet: "표본 20개 · 25% 규칙",
    detail:
      "수동(passive) 만료는 키에 접근하는 순간 TTL을 확인해 지난 키를 지우고 없는 것처럼 응답한다. 하지만 아무도 접근하지 않는 키는 영원히 메모리에 남으므로 능동(active) 만료가 함께 돈다 — serverCron이 hz 주기로 만료 딕셔너리에서 키를 표본 추출해 지우고, 지워진 비율이 기준(약 25%)을 넘으면 같은 작업을 즉시 반복한다. 즉 만료된 키가 많을수록 더 공격적으로 회수한다. 이 방식 때문에 '만료 시각과 실제 삭제 시각'은 일치하지 않고, keyspace notification의 expired 이벤트도 실제 삭제 시점에 발생한다. 복제본은 스스로 만료시키지 않고 마스터가 보내는 DEL을 기다리되, 읽기 응답에서는 논리적으로 만료된 키를 없는 것으로 처리한다.",
    code: `INFO stats
#  expired_keys        : 누적 만료 삭제 수
#  expired_stale_perc  : 표본 중 만료 비율

CONFIG GET hz                 # serverCron 주기 (기본 10)
CONFIG GET active-expire-effort   # 1~10, 클수록 공격적

# 정확한 타이밍이 필요하면 만료에 기대지 말 것
#   → ZSet(score=실행시각) 지연 큐 + 워커

DEBUG SLEEP 0    # 만료는 알람이 아니라 '다음 사이클'에 처리됨`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-012",
    nameEn: "REPLICATION BACKLOG",
    nameKo: "복제 백로그와 PSYNC2",
    rarity: "SR",
    type: "ARCH",
    attrs: ["Backlog", "PSYNC2"],
    atk: "부분 재동기화",
    def: "백로그 크기가 좌우",
    effect:
      "마스터는 최근 복제 스트림을 원형 버퍼에 들고 있다. 끊긴 복제본이 돌아왔을 때 그 구간이 남아 있어야 부분 재동기화가 된다.",
    flavor: "백로그가 작으면, 잠깐의 끊김이 전체 재동기화가 된다.",
    visual: "backlog",
    snippet: "repl-backlog-size",
    detail:
      "복제본이 재접속하면 PSYNC로 (replication ID, offset)을 보낸다. 요청한 offset이 아직 백로그 안에 있으면 그 차이만 보내는 부분 재동기화로 끝나지만, 이미 밀려났으면 전체 재동기화가 일어난다 — 마스터가 RDB를 새로 만들고(fork!) 통째로 전송하므로 CPU·메모리·네트워크가 동시에 튄다. 그래서 백로그는 '네트워크가 끊길 수 있는 최대 시간 × 쓰기 처리량'보다 크게 잡아야 한다. PSYNC2(4.0+) 덕분에 페일오버로 승격된 복제본도 이전 replication ID를 기억해 다른 복제본들이 전체 재동기화 없이 붙을 수 있고, 정상 종료된 복제본은 RDB에 복제 정보를 저장해 재시작 후에도 부분 재동기화가 가능하다.",
    code: `CONFIG SET repl-backlog-size 256mb   # 끊김시간 × 쓰기량 이상
CONFIG SET repl-backlog-ttl 3600     # 복제본 0일 때 유지 시간

INFO replication
#  master_repl_offset      : 현재 오프셋
#  repl_backlog_active / size / histlen
#  slave0: offset=… lag=…

INFO stats
#  sync_full          : 전체 재동기화 횟수 ← 늘면 백로그 부족
#  sync_partial_ok    : 부분 재동기화 성공
#  sync_partial_err   : 부분 실패 → 전체로 떨어진 횟수`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-013",
    nameEn: "DISKLESS REPLICATION",
    nameKo: "디스크리스 복제",
    rarity: "R",
    type: "ARCH",
    attrs: ["Diskless", "swapdb"],
    atk: "디스크 우회 전송",
    def: "느린 디스크 환경 유리",
    effect:
      "전체 재동기화 때 RDB를 디스크에 쓰지 않고 자식 프로세스가 소켓으로 바로 흘려보낸다.",
    flavor: "디스크가 느리면, 디스크를 건너뛴다.",
    visual: "diskless",
    snippet: "fork → socket 직송",
    detail:
      "기본 방식은 마스터가 RDB 파일을 만들어 디스크에 저장한 뒤 그걸 읽어 전송하는 것이라, EBS 같은 느린 볼륨에서는 디스크가 병목이 된다. repl-diskless-sync를 켜면 fork한 자식이 복제본 소켓으로 직접 직렬화해 보낸다. 대신 전송이 시작되면 중간 합류가 어려우므로, repl-diskless-sync-delay만큼 기다렸다 붙은 복제본들을 한 번에 처리한다. 받는 쪽도 repl-diskless-load로 디스크를 건너뛸 수 있는데, swapdb 모드는 새 데이터셋을 메모리에 받는 동안 기존 데이터를 들고 있다가 교체하므로 메모리를 두 배 쓰는 대신 실패 시 롤백이 된다.",
    code: `# 보내는 쪽 (마스터)
repl-diskless-sync yes
repl-diskless-sync-delay 5      # 복제본 모아서 한 번에

# 받는 쪽 (복제본)
repl-diskless-load swapdb
#  disabled : 항상 디스크 경유 (기본·가장 안전)
#  on-empty-db : 비어 있을 때만 직접 로드
#  swapdb   : 기존 DB 유지하며 교체 (메모리 2배, 롤백 가능)

INFO stats | grep sync_full     # 전체 재동기화 빈도 확인`,
    lang: "conf",
  },
  {
    id: "ARCH-014",
    nameEn: "SLOT MIGRATION",
    nameKo: "슬롯 마이그레이션",
    rarity: "UR",
    type: "ARCH",
    attrs: ["Resharding", "MIGRATING", "ASK"],
    atk: "무중단 리샤딩",
    def: "슬롯 단위 원자 이전",
    effect:
      "노드를 추가·제거할 때 슬롯을 하나씩 옮긴다. 옮기는 도중에도 읽고 쓸 수 있게 하는 장치가 ASK 리다이렉트다.",
    flavor: "이사 중에도 우편은 배달되어야 한다.",
    visual: "slotmig",
    snippet: "IMPORTING / MIGRATING → ASK",
    detail:
      "절차는 대상 노드에 IMPORTING, 원본 노드에 MIGRATING을 표시하고, 그 슬롯의 키를 MIGRATE로 하나씩(또는 KEYS 다중으로) 옮긴 뒤, 마지막에 양쪽과 나머지 노드에 SETSLOT NODE로 소유권을 확정하는 것이다. 이전 중에 원본 노드가 요청을 받으면, 키가 아직 있으면 정상 처리하고 이미 옮겨졌으면 ASK를 반환한다 — 클라이언트는 대상 노드에 ASKING을 먼저 보내고 그 한 번만 요청한다(슬롯 맵을 갱신하지 않는다는 점이 MOVED와 다르다). 실무에서는 redis-cli --cluster reshard/rebalance가 이 전 과정을 대신해 준다. 큰 키가 하나라도 있으면 MIGRATE가 그 키를 통째로 옮기며 블로킹되므로 빅키 제거가 리샤딩의 선행 조건이다.",
    code: `# 실무에서는 이 한 줄이면 된다
redis-cli --cluster reshard 10.0.0.11:6379 \\
  --cluster-from <src-id> --cluster-to <dst-id> \\
  --cluster-slots 1000 --cluster-yes
redis-cli --cluster rebalance 10.0.0.11:6379

# 내부적으로 일어나는 일
CLUSTER SETSLOT 5798 IMPORTING <src-node-id>   # 대상 노드에서
CLUSTER SETSLOT 5798 MIGRATING <dst-node-id>   # 원본 노드에서
CLUSTER GETKEYSINSLOT 5798 100
MIGRATE <host> <port> "" 0 5000 KEYS k1 k2 …
CLUSTER SETSLOT 5798 NODE <dst-node-id>        # 소유권 확정`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-015",
    nameEn: "MULTI-DB & SWAPDB",
    nameKo: "다중 DB와 SWAPDB",
    rarity: "R",
    type: "ARCH",
    attrs: ["SELECT", "SWAPDB"],
    atk: "원자적 DB 교체",
    def: "클러스터에서는 사용 불가",
    effect:
      "인스턴스 하나에 번호로 구분된 DB가 16개 있다. 격리 수단은 아니지만, SWAPDB로 무중단 데이터 교체를 할 수 있다.",
    flavor: "격리가 아니라, 이름표에 가깝다.",
    visual: "swapdb",
    snippet: "SWAPDB 0 1 — 원자 교체",
    detail:
      "SELECT n으로 DB를 바꾸지만 같은 프로세스·같은 메모리·같은 이벤트 루프를 공유하므로 성능 격리가 전혀 없다 — 한 DB의 느린 명령이 다른 DB를 그대로 막는다. 그래서 멀티테넌시 용도로는 인스턴스 분리나 키 프리픽스를 쓰는 게 맞고, Cluster 모드에서는 아예 0번만 허용된다. 그럼에도 유용한 경우가 SWAPDB다 — 새 데이터셋을 비어 있는 DB에 통째로 적재한 뒤 SWAPDB로 한 번에 교체하면, 전체 재색인 같은 작업을 다운타임 없이 원자적으로 반영할 수 있다. 교체 후 옛 DB는 FLUSHDB ASYNC로 백그라운드 회수한다.",
    code: `SELECT 1
DBSIZE
FLUSHDB ASYNC        # 현재 DB만, 백그라운드 삭제

# 무중단 전체 교체 패턴
#  1) DB 1 에 새 데이터셋 적재
#  2) 원자적으로 교체
SWAPDB 0 1
#  3) 옛 데이터 정리
SELECT 1
FLUSHDB ASYNC

# ⚠ Cluster 모드에서는 DB 0 만 사용 가능
# ⚠ DB 분리는 성능 격리가 아니다 (같은 스레드)`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-016",
    nameEn: "WAIT & WAITAOF",
    nameKo: "동기 대기 명령",
    rarity: "SR",
    type: "ARCH",
    attrs: ["WAIT", "WAITAOF", "Durability"],
    atk: "복제 · fsync 확인",
    def: "여전히 강한 일관성은 아님",
    effect:
      "WAIT는 N개 복제본이 받았는지를, WAITAOF(7.2+)는 AOF에 fsync됐는지를 확인할 때까지 기다린다.",
    flavor: "유실 창을 좁힐 뿐, 없애지는 못한다.",
    visual: "waitaof",
    snippet: "WAITAOF numlocal numreplicas timeout",
    detail:
      "WAIT numreplicas timeout은 현재 커넥션의 이전 쓰기들이 지정한 수의 복제본에 도달할 때까지 블로킹한다. WAITAOF numlocal numreplicas timeout은 한 걸음 더 나아가 '디스크에 fsync됐는지'를 확인한다 — numlocal은 0 또는 1이며 로컬 AOF가 켜져 있어야 하고, 복제본에서는 호출할 수 없다. 두 명령 모두 타임아웃 시에도 '실제로 확인된 개수'를 반환하므로, 반환값이 요구 수준 이상인지 클라이언트가 반드시 검사해야 한다. 중요한 한계 — 공식 문서가 명시하듯 이것들은 Redis를 강한 일관성 저장소로 만들지 않는다. 페일오버나 재시작 과정에서 확인된 쓰기도 사라질 수 있고, 다만 그 확률을 크게 낮춘다.",
    code: `SET order:99 "paid"
WAIT 1 100            # 복제본 1대가 받을 때까지 최대 100ms
# -> (integer) 1      실제 도달한 복제본 수 (반드시 검사)

WAITAOF 1 0 1000      # 로컬 AOF fsync 확인
# -> 1) (integer) 1   local fsynced
#    2) (integer) 0   replicas fsynced

WAITAOF 1 1 2000      # 로컬 + 복제본 1대 fsync

# ⚠ MULTI/스크립트 안에서는 블로킹하지 않고 즉시 반환
# ⚠ 복제본에서는 WAITAOF 사용 불가`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-017",
    nameEn: "CLIENT ROUTING",
    nameKo: "클라이언트 라우팅과 프록시",
    rarity: "R",
    type: "ARCH",
    attrs: ["SlotMap", "Proxy"],
    atk: "슬롯 맵 캐시 = 1홉",
    def: "프록시 = 단순한 클라이언트",
    effect:
      "클러스터는 클라이언트가 직접 라우팅한다. 슬롯 맵을 캐시하면 한 번에 맞는 노드로 가고, 캐시가 낡으면 리다이렉트를 먹는다.",
    flavor: "라우팅을 누가 할 것인가의 문제.",
    visual: "routing",
    snippet: "slot map 캐시 → 1 hop",
    detail:
      "클러스터 지원 클라이언트는 접속 시 CLUSTER SLOTS/SHARDS로 슬롯↔노드 맵을 받아 캐시한다. 이후 키의 CRC16을 계산해 담당 노드로 곧장 보내므로 왕복이 한 번이다. 토폴로지가 바뀌면 MOVED를 받고 맵을 갱신하는데, 이 갱신을 매 요청마다 하면 폭풍이 되므로 좋은 클라이언트는 스로틀링을 건다. 다중 키 명령은 클라이언트가 슬롯별로 쪼개 병렬 전송하고 결과를 합쳐준다. 대안은 프록시(Envoy·twemproxy 등)로, 클라이언트는 단일 엔드포인트만 알면 되어 언어별 클러스터 지원 편차를 없애지만 홉이 하나 늘고 프록시가 새로운 단일 장애점·병목이 된다.",
    code: `CLUSTER SLOTS        # 슬롯 범위 ↔ 노드 (구형 클라이언트)
CLUSTER SHARDS       # 샤드 단위 정보 (7.0+, 권장)
CLUSTER MYID
CLUSTER COUNTKEYSINSLOT 5798

# 클라이언트가 하는 일
#  ① 슬롯 맵 캐시  ② CRC16 계산  ③ 담당 노드로 직접
#  ④ MOVED 받으면 맵 갱신(스로틀링 필수)

# 프록시를 쓸 때의 트레이드오프
#  + 단일 엔드포인트, 언어 편차 없음
#  − 홉 +1, 프록시가 SPOF/병목`,
    lang: "redis-cli",
  },
  {
    id: "ARCH-018",
    nameEn: "KEY HASHING & TAGS",
    nameKo: "키 해싱과 해시 태그",
    rarity: "SR",
    type: "ARCH",
    attrs: ["CRC16", "HashTag"],
    atk: "같은 슬롯으로 묶기",
    def: "핫슬롯 회피",
    effect:
      "슬롯은 CRC16(key) mod 16384. 중괄호가 있으면 첫 { 와 그 뒤 첫 } 사이만 해싱한다 — 이 규칙 하나가 다중 키 연산을 가능하게 한다.",
    flavor: "너무 잘 묶으면, 한 노드만 뜨거워진다.",
    visual: "hashtag",
    snippet: "user:{1000}:cart",
    detail:
      "해시 태그 규칙은 정확히 이렇다 — 키에 { 가 있고 그 뒤에 } 가 있으며 사이가 비어 있지 않으면, 그 사이 문자열만으로 슬롯을 계산한다. 조건을 하나라도 못 채우면 키 전체를 해싱한다. 그래서 user:{1000}:profile과 user:{1000}:cart는 같은 슬롯에 떨어져 MGET·MULTI·Lua로 함께 다룰 수 있다. 함정은 과도한 태그다 — {app}처럼 모든 키에 같은 태그를 붙이면 전 데이터가 슬롯 하나에 몰려 클러스터가 사실상 단일 노드가 되고, 리샤딩으로도 나눌 수 없다. 태그는 '반드시 함께 연산해야 하는 최소 단위'에만 붙이고, 그 단위가 커지지 않는지 주기적으로 확인한다.",
    code: `CLUSTER KEYSLOT "user:1000:cart"      # 키 전체 해싱
CLUSTER KEYSLOT "user:{1000}:cart"    # "1000" 만 해싱
CLUSTER KEYSLOT "user:{1000}:profile" # ↑ 와 같은 슬롯

# 규칙: 첫 '{' 와 그 뒤 첫 '}' 사이. 비어 있으면 전체 해싱
"foo{}{bar}"   → 전체 해싱 ({} 안이 비어 있음)
"foo{{bar}}"   → "{bar" 만 해싱
"foo{bar}{baz}"→ "bar" 만 해싱

# ❌ 안티패턴: 전 키에 동일 태그 → 슬롯 1개에 전부 집중
#    "{app}:user:1"  "{app}:user:2" …`,
    lang: "redis-cli",
  },

  /* ─────────────── INTERNAL ─────────────── */
  {
    id: "INTERNAL-001",
    nameEn: "REDIS OBJECT (robj)",
    nameKo: "robj — 모든 값의 껍데기",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["robj", "encoding"],
    atk: "type + encoding 분리",
    def: "공유 정수 객체",
    effect:
      "모든 값은 robj 구조체로 감싸진다. 겉으로 보이는 타입(type)과 실제 저장 방식(encoding)이 분리돼 있는 것이 핵심.",
    flavor: "String이라고 다 같은 String이 아니다.",
    visual: "robj",
    snippet: "type=string / encoding=int",
    detail:
      "robj에는 type(string/list/set/zset/hash/stream), encoding(int/embstr/raw/listpack/…), lru 필드, refcount, 실제 데이터 포인터가 들어 있다. 같은 String이라도 값이 정수로 표현 가능하면 encoding이 int가 되어 포인터 자리에 값을 직접 담고, 44바이트 이하 짧은 문자열은 embstr로 robj와 SDS를 한 번에 할당해 캐시 지역성과 할당 횟수를 줄이며, 그보다 길면 raw로 따로 할당한다. embstr은 수정 불가라 APPEND 한 번이면 raw로 승격된다. 또 0~9999 정수는 서버 시작 시 미리 만들어 공유하므로 카운터가 많아도 객체가 새로 생기지 않는다(maxmemory 정책이 LRU/LFU면 공유가 비활성화된다).",
    code: `SET k 12345
OBJECT ENCODING k        # -> int    (포인터 자리에 값 직접)
OBJECT REFCOUNT k        # -> 2147483647 (공유 객체)

SET k "hello"
OBJECT ENCODING k        # -> embstr (44바이트 이하, 불변)
APPEND k " world"
OBJECT ENCODING k        # -> raw    (수정되며 승격)

OBJECT FREQ k            # LFU 모드일 때 접근 빈도 카운터
DEBUG OBJECT k           # serializedlength, ql_nodes 등`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-002",
    nameEn: "SDS",
    nameKo: "단순 동적 문자열",
    rarity: "R",
    type: "INTERNAL",
    attrs: ["SDS", "binary-safe"],
    atk: "길이 O(1)",
    def: "바이너리 세이프",
    effect:
      "C 문자열 대신 길이와 여유 공간을 헤더에 들고 다니는 자체 문자열 타입. STRLEN이 O(1)인 이유이자 이미지도 담을 수 있는 이유다.",
    flavor: "널 문자를 두려워하지 않는다.",
    visual: "sds",
    snippet: "[len|alloc|flags|buf…]",
    detail:
      "SDS는 헤더에 사용 길이(len)와 할당 크기(alloc)를 갖고 그 뒤에 바이트 배열이 온다. 덕분에 STRLEN은 헤더만 읽으면 되는 O(1)이고, 문자열 끝을 널 문자로 판단하지 않으므로 중간에 0x00이 있어도 안전하다 — 직렬화된 객체나 이미지를 그대로 넣을 수 있는 근거다. APPEND 같은 확장은 미리 여유 공간을 넉넉히 잡아 두어(공간 선점) 잦은 재할당을 피하고, 축소 시에도 바로 반환하지 않고 들고 있다가 재사용한다. 길이에 따라 sdshdr5/8/16/32/64로 헤더 크기를 바꿔 짧은 문자열의 오버헤드를 줄인다.",
    code: `SET img:1 "<바이너리 그대로>"     # 널 바이트 포함 가능
STRLEN img:1                       # O(1) — 헤더의 len 값

APPEND log:1 "line1\\n"            # 여유 공간 선점 → 재할당 감소
APPEND log:1 "line2\\n"

DEBUG OBJECT log:1
#  serializedlength  : 직렬화 크기
MEMORY USAGE log:1                 # 실제 할당(alloc) 기준

# 값 최대 512MB — SDS 길이 한계가 아니라 프로토콜/정책 상한`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-003",
    nameEn: "DICT & INCREMENTAL REHASH",
    nameKo: "딕셔너리와 점진적 리해싱",
    rarity: "UR",
    type: "INTERNAL",
    attrs: ["dict", "rehash"],
    atk: "해시테이블 2개 운용",
    def: "멈춤 없는 확장",
    effect:
      "키 공간은 해시테이블이다. 커질 때 한 번에 옮기면 서버가 멈추므로, 두 테이블을 동시에 두고 조금씩 옮긴다.",
    flavor: "단일 스레드가 멈추지 않으려면 나눠서 해야 한다.",
    visual: "dict",
    snippet: "ht[0] → ht[1] 조금씩",
    detail:
      "dict은 체이닝 방식 해시테이블 두 개(ht[0], ht[1])와 rehashidx를 갖는다. 부하율이 기준을 넘으면 ht[1]을 두 배 크기로 할당하고 rehashidx를 0으로 세팅해 리해싱 상태로 들어간다. 이후 모든 조회·삽입·삭제가 들어올 때마다 버킷 몇 개씩을 ht[0]에서 ht[1]로 옮기고, serverCron도 시간을 쪼개 옮긴다. 리해싱 중에는 조회를 두 테이블 모두에서 하고, 새 삽입은 항상 ht[1]에만 한다. 이 설계 때문에 수천만 키가 있어도 확장이 서버를 멈추지 않지만, 리해싱 중에는 메모리를 두 테이블만큼 쓴다. 자식 프로세스가 저장 중일 때는 copy-on-write를 아끼려고 리해싱을 억제한다.",
    code: `DBSIZE                     # 키 개수
INFO memory
#  used_memory_overhead     : 자료구조 오버헤드(테이블 포함)

INFO keyspace
#  db0:keys=1000000,expires=…,avg_ttl=…

# 리해싱 중 메모리가 튀는 이유
#   ht[0] + ht[1] 동시 존재 → 일시적으로 테이블 2배

# SCAN 이 중복은 허용하되 누락은 없는 이유도 이 구조 때문
#   커서에 역방향 비트 증가를 써서 리사이즈를 견딘다
SCAN 0 COUNT 100`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-004",
    nameEn: "LISTPACK",
    nameKo: "listpack 내부",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["listpack", "ziplist"],
    atk: "연속 메모리 · 포인터 0",
    def: "작을 때만 유리",
    effect:
      "작은 컬렉션을 담는 연속 메모리 블록. 포인터도 해시테이블도 없이 엔트리를 이어 붙여 오버헤드를 최소화한다.",
    flavor: "작을 때는 배열이 이긴다.",
    visual: "listpack",
    snippet: "[hdr][e1][e2]…[end]",
    detail:
      "각 엔트리는 인코딩 정보와 데이터, 그리고 자기 길이를 담은 backlen을 갖는다. backlen 덕분에 뒤에서 앞으로도 순회할 수 있고, 구형 ziplist가 가졌던 연쇄 갱신(cascade update) 문제 — 한 엔트리 크기가 바뀌면 뒤쪽 엔트리들의 prevlen이 줄줄이 바뀌던 문제 — 가 사라졌다. 조회는 순차 탐색이라 O(N)이지만 원소가 수십~백 개면 연속 메모리의 캐시 효율이 해시테이블을 압도한다. 그래서 Hash·ZSet·List·Stream이 작을 때 공통으로 이 구조를 쓰고, hash-max-listpack-entries 같은 임계를 넘으면 각자의 본래 구조로 전환한다.",
    code: `HSET h f1 v1 f2 v2
OBJECT ENCODING h            # -> listpack

CONFIG GET hash-max-listpack-entries   # 128
CONFIG GET hash-max-listpack-value     # 64
CONFIG GET zset-max-listpack-entries   # 128
CONFIG GET list-max-listpack-size      # 128

# 임계를 넘기면 전환되고 되돌아오지 않는다
#   listpack → hashtable / skiplist

MEMORY USAGE h               # 전환 전후로 재보면 차이가 크다`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-005",
    nameEn: "QUICKLIST",
    nameKo: "quicklist",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["quicklist", "compress"],
    atk: "노드 단위 압축",
    def: "양 끝은 비압축 유지",
    effect:
      "리스트의 실체는 listpack 노드들을 이은 이중 연결 리스트. 노드 크기와 압축 깊이로 메모리와 속도를 맞바꾼다.",
    flavor: "양 끝만 빠르면 되는 자료구조라서.",
    visual: "quicklist",
    snippet: "[lp]↔[lp:LZF]↔[lp]",
    detail:
      "원소를 하나씩 노드로 만들면 포인터 오버헤드가 크고, 전부 한 listpack에 넣으면 삽입 비용이 커진다. quicklist는 그 절충으로 listpack 여러 개를 연결 리스트로 잇는다. list-max-listpack-size가 노드 하나에 들어갈 원소 수(음수면 바이트 크기)를 정한다. list-compress-depth는 양 끝에서 몇 개 노드를 압축하지 않고 둘지를 정하는데, 리스트 연산이 대부분 양 끝에서 일어나므로 가운데 노드만 LZF로 압축하면 접근 속도를 거의 잃지 않고 메모리를 크게 아낀다. 0이면 압축하지 않음, 1이면 양 끝 1개씩 제외하고 압축이다.",
    code: `RPUSH big:list a b c …
OBJECT ENCODING big:list       # listpack → quicklist

CONFIG SET list-max-listpack-size 128   # 노드당 원소 수
CONFIG SET list-compress-depth 1        # 양 끝 1노드 비압축

DEBUG OBJECT big:list
#  ql_nodes      : 노드 수
#  ql_compressed : 압축된 노드 수
#  ql_avg_node   : 노드당 평균 원소

# 가운데 접근(LINDEX 중간)은 노드를 타고 가야 하므로 O(N)`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-006",
    nameEn: "SKIPLIST",
    nameKo: "스킵리스트",
    rarity: "UR",
    type: "INTERNAL",
    attrs: ["skiplist", "ZSet"],
    atk: "확률적 O(log N)",
    def: "dict 병행으로 O(1) 조회",
    effect:
      "정렬 집합은 스킵리스트와 해시테이블을 동시에 유지한다. 범위·순위는 스킵리스트가, 멤버→점수 조회는 해시가 처리한다.",
    flavor: "균형 트리를 동전 던지기로 대신한다.",
    visual: "skiplist",
    snippet: "level↑ 확률 1/4",
    detail:
      "스킵리스트는 정렬된 연결 리스트에 '건너뛰는 층'을 확률적으로 쌓은 구조다. 노드를 넣을 때 동전을 던지듯 확률(Redis는 약 1/4)로 레벨을 올려, 평균적으로 상위 레벨일수록 노드가 희박해진다. 검색은 최상위 레벨에서 가능한 만큼 전진하다 내려오기를 반복해 평균 O(log N)이 되고, 균형 트리와 달리 회전 같은 재조정이 없어 구현이 단순하며 범위 순회가 자연스럽다. 여기에 각 노드는 span을 들고 있어 ZRANK를 순위 계산으로 바로 답한다. 다만 ZSCORE처럼 멤버로 점수를 찾는 연산은 스킵리스트로 O(log N)이 되므로, 별도 dict을 함께 유지해 O(1)로 만든다 — ZSet이 메모리를 많이 쓰는 이유가 이 이중 구조다.",
    code: `ZADD z 1 a 2 b 3 c
OBJECT ENCODING z        # 작으면 listpack, 크면 skiplist

# 두 구조가 하는 일이 다르다
ZSCORE     z b           # dict      → O(1)
ZRANK      z b           # skiplist  → O(log N), span 으로 계산
ZRANGEBYSCORE z 1 2      # skiplist  → 시작점 찾고 순차 전진

CONFIG GET zset-max-listpack-entries   # 128
MEMORY USAGE z           # 이중 구조라 같은 원소 수 Set보다 크다`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-007",
    nameEn: "INTSET",
    nameKo: "정수 집합",
    rarity: "R",
    type: "INTERNAL",
    attrs: ["intset", "Set"],
    atk: "정렬 배열 · 이진 탐색",
    def: "인코딩 자동 승격",
    effect:
      "정수만 든 Set은 해시테이블 대신 정렬된 정수 배열로 저장된다. 포인터가 없어 극단적으로 조밀하다.",
    flavor: "정수만 있으면 배열이 낫다.",
    visual: "intset",
    snippet: "int16 → int32 → int64",
    detail:
      "intset은 원소를 오름차순 정렬된 배열로 담고 SISMEMBER를 이진 탐색으로 처리한다. 인코딩은 원소 크기에 따라 int16, int32, int64 중 하나이고, 더 큰 정수가 들어오면 전체 배열을 상위 인코딩으로 승격시킨다(내려가지는 않는다). 원소 수가 set-max-intset-entries(기본 512)를 넘거나 정수가 아닌 값이 하나라도 들어오면 즉시 hashtable(또는 작으면 listpack)로 전환된다. 사용자 ID 집합처럼 정수만 담기는 경우 같은 원소 수의 일반 Set보다 몇 배 작으므로, 굳이 문자열로 감싸지 말고 정수 그대로 넣는 것이 실질적인 최적화가 된다.",
    code: `SADD ids 3 1 2
OBJECT ENCODING ids       # -> intset (정렬 배열, 이진 탐색)

SADD ids "abc"
OBJECT ENCODING ids       # -> listpack/hashtable (되돌아오지 않음)

CONFIG GET set-max-intset-entries    # 512
CONFIG GET set-max-listpack-entries  # 128

# 실전 팁: ID는 문자열로 감싸지 말 것
SADD followers 1000 1001    # ✅ intset
SADD followers "u:1000"     # ❌ 즉시 승격, 메모리 수 배`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-008",
    nameEn: "RADIX TREE (rax)",
    nameKo: "래딕스 트리",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["rax", "Stream"],
    atk: "접두어 공유 저장",
    def: "정렬된 ID 인덱스",
    effect:
      "스트림의 엔트리 ID 인덱스와 소비자 그룹 PEL이 쓰는 구조. 공통 접두어를 한 번만 저장해 조밀하면서 정렬을 유지한다.",
    flavor: "시간순 ID는 앞부분이 거의 같다.",
    visual: "rax",
    snippet: "1786-…-0 · 1786-…-1",
    detail:
      "래딕스 트리는 트라이에서 자식이 하나뿐인 경로를 하나의 노드로 압축한 구조다. 스트림 ID는 밀리초-시퀀스 형태라 연속된 엔트리들의 앞부분이 거의 동일한데, 이 공통 접두어를 한 번만 저장하므로 메모리 효율이 매우 좋다. 동시에 사전순 정렬이 유지되어 XRANGE 같은 범위 질의와 '이 ID 다음부터' 읽기가 자연스럽다. Redis는 스트림 엔트리 인덱스뿐 아니라 소비자 그룹의 PEL(미확인 목록), 클러스터 슬롯-키 매핑, 클라이언트 추적 테이블에도 rax를 쓴다. 실제 필드 데이터는 rax 노드가 가리키는 listpack 묶음에 담겨 또 한 번 압축된다.",
    code: `XADD events '*' k v          # ID: <ms>-<seq>
XRANGE events - + COUNT 5    # 정렬 유지 → 범위 질의 자연스러움

XINFO STREAM events FULL
#  radix-tree-keys  : rax 노드 키 개수
#  radix-tree-nodes : 노드 수
#  entries          : listpack 묶음에 담긴 실제 데이터

# 같은 rax 를 쓰는 곳
#   스트림 엔트리 인덱스 · 소비자 그룹 PEL
#   클러스터 슬롯→키 매핑 · 클라이언트 사이드 캐싱 추적`,
    lang: "redis-cli",
  },

  {
    id: "INTERNAL-009",
    nameEn: "EVENT LOOP (ae)",
    nameKo: "이벤트 루프 ae",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["epoll", "beforeSleep"],
    atk: "다중화로 수만 커넥션",
    def: "단일 루프 · 순차 처리",
    effect:
      "epoll/kqueue로 준비된 소켓만 골라 처리하는 루프 하나가 서버의 심장이다. 파일 이벤트와 시간 이벤트를 함께 돌린다.",
    flavor: "스레드를 늘리는 대신, 기다리지 않는다.",
    visual: "eventloopint",
    snippet: "poll → 처리 → beforeSleep",
    detail:
      "ae는 플랫폼별 다중화 API(Linux epoll, BSD kqueue, 그 외 select)를 얇게 감싼 자체 이벤트 라이브러리다. 루프는 다음 시간 이벤트까지의 시간을 계산해 그만큼 대기하며 폴링하고, 깨어나면 읽기 가능한 소켓에서 명령을 파싱해 실행하고 쓰기 가능한 소켓으로 응답을 내보낸다. 매 반복 직전에 호출되는 beforeSleep에서 AOF 버퍼 flush, 블로킹 해제된 클라이언트 처리, 클러스터 상태 갱신 같은 '루프 사이에 반드시 해야 하는 일'을 처리한다. 이 구조 때문에 명령 하나가 오래 걸리면 그 시간만큼 모든 소켓이 방치된다 — 지연 문제를 항상 '가장 느린 명령'에서 찾는 이유다.",
    code: `INFO stats
#  total_connections_received
#  instantaneous_ops_per_sec
#  total_net_input_bytes / output_bytes

CONFIG GET maxclients        # 파일 디스크립터 한계와 연동

# 루프 한 바퀴가 하는 일
#   ① 시간 이벤트까지 대기하며 poll
#   ② 읽기 가능 소켓 → 명령 파싱·실행
#   ③ 쓰기 가능 소켓 → 응답 전송
#   ④ beforeSleep: AOF flush, 블로킹 해제, 클러스터 갱신

# 명령 하나가 100ms 걸리면 그동안 ①~④ 전부 멈춘다`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-010",
    nameEn: "serverCron & hz",
    nameKo: "serverCron과 hz",
    rarity: "R",
    type: "INTERNAL",
    attrs: ["serverCron", "hz"],
    atk: "주기적 유지보수",
    def: "hz로 빈도 조절",
    effect:
      "만료 회수, 리해싱, 통계 갱신, 자식 프로세스 확인 같은 뒷정리를 초당 hz번 도는 타이머가 처리한다.",
    flavor: "청소는 조금씩, 자주.",
    visual: "servercron",
    snippet: "hz 10 → 100ms마다",
    detail:
      "hz는 기본 10으로 serverCron이 초당 10번, 즉 100ms마다 돈다는 뜻이다. 여기서 만료 키 능동 회수, 점진적 리해싱 진행, 클라이언트 타임아웃 정리, RDB/AOF 자식 프로세스 종료 확인, 메모리·명령 통계 갱신, 복제 상태 점검이 이뤄진다. hz를 올리면 만료 회수와 타임아웃 처리가 촘촘해지지만 유휴 상태에서도 CPU를 더 쓴다. dynamic-hz가 켜져 있으면 접속 클라이언트 수에 따라 실효 빈도를 자동으로 올려주므로 대개 기본값을 그대로 두는 편이 낫다. 만료가 몰려 메모리가 안 줄어드는 상황이라면 hz보다 active-expire-effort를 먼저 본다.",
    code: `CONFIG GET hz                  # 기본 10 (권장 1~100)
CONFIG GET dynamic-hz          # yes = 부하에 따라 자동 조정
CONFIG GET active-expire-effort

# serverCron 이 하는 일
#   만료 능동 회수 · 점진적 리해싱 · 클라이언트 타임아웃
#   자식 프로세스(RDB/AOF) 종료 확인 · 통계 갱신 · 복제 점검

INFO stats | grep expired_keys
INFO persistence | grep -E "rdb_bgsave_in_progress|aof_rewrite_in_progress"`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-011",
    nameEn: "ALLOCATOR & DEFRAG",
    nameKo: "할당자와 단편화",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["jemalloc", "activedefrag"],
    atk: "크기 클래스 할당",
    def: "액티브 디프래그",
    effect:
      "메모리를 OS에서 직접 받지 않고 jemalloc의 크기 클래스로 받는다. 그래서 '쓴 만큼'과 '잡은 만큼'이 달라진다.",
    flavor: "지웠는데 메모리가 안 줄어드는 이유.",
    visual: "allocator",
    snippet: "used_memory vs RSS",
    detail:
      "jemalloc은 요청 크기를 미리 정해진 크기 클래스(8, 16, 32, 48, 64…)로 올림해 할당한다. 33바이트를 요청하면 48바이트를 잡는 식이라 값 크기를 조금만 줄여도 클래스가 내려가 메모리가 계단식으로 떨어지는 일이 생긴다. 키를 많이 지웠는데 RSS가 안 줄어드는 것도 이 구조 탓이다 — 해제된 공간이 페이지 곳곳에 흩어져 있으면 OS로 반환되지 못한다. activedefrag를 켜면 Redis가 조각난 할당을 새 위치로 조금씩 옮겨 페이지를 비우고 반환한다. 다만 이 작업 자체가 CPU를 쓰므로 mem_fragmentation_ratio가 실제로 높을 때만 켜고, 임계값으로 동작 범위를 제한한다.",
    code: `INFO memory
#  used_memory              : Redis 가 쓴다고 아는 양
#  used_memory_rss          : OS 가 준 양
#  mem_fragmentation_ratio  : rss / used_memory
#  mem_allocator            : jemalloc-5.x

CONFIG SET activedefrag yes
CONFIG SET active-defrag-ignore-bytes 100mb
CONFIG SET active-defrag-threshold-lower 10   # 10% 넘으면 시작
CONFIG SET active-defrag-cycle-max 25         # CPU 사용 상한

# 값 크기를 조금 줄이면 크기 클래스가 내려가 계단식 절감`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-012",
    nameEn: "RDB FILE FORMAT",
    nameKo: "RDB 파일 포맷",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["RDB", "opcode", "CRC64"],
    atk: "타입별 압축 직렬화",
    def: "체크섬 무결성 검증",
    effect:
      "매직 헤더와 버전으로 시작해 DB별 키-값을 opcode로 이어 붙이고 CRC64로 끝나는 이진 포맷.",
    flavor: "덤프 파일은 그냥 바이트가 아니다.",
    visual: "rdbfmt",
    snippet: "REDIS0011 … [EOF][CRC64]",
    detail:
      "파일은 REDIS + 4자리 버전 문자열로 시작한다. 이어 보조 필드(redis-ver, 생성 시각, used-mem 등), DB 선택자, 해시테이블 크기 힌트, 그리고 키마다 만료 시각·타입 바이트·키·값이 온다. 값은 타입별로 가장 조밀한 표현을 골라 저장되고, 길이는 가변 길이 인코딩을, 짧은 문자열은 LZF 압축을 쓴다. 마지막에 EOF opcode와 CRC64 체크섬이 붙어 손상을 감지한다. 버전이 올라가며 opcode가 추가되므로 상위 버전이 만든 RDB를 하위 버전이 못 읽을 수 있다 — 다운그레이드 계획이 있다면 반드시 확인해야 하는 지점이다. DUMP/RESTORE 명령도 같은 직렬화 포맷을 쓰기 때문에 키 단위 이전이 가능하다.",
    code: `redis-check-rdb /data/dump.rdb      # 구조·체크섬 검증

DUMP  mykey                          # RDB와 같은 직렬화 포맷
RESTORE newkey 0 "<직렬화 바이트>"    # 다른 인스턴스로 이전
#  버전 바이트가 안 맞으면 RESTORE 실패

INFO persistence
#  rdb_last_save_time / rdb_last_bgsave_status
#  rdb_changes_since_last_save

# ⚠ 상위 버전 RDB → 하위 버전 로드 불가할 수 있음
CONFIG GET rdbchecksum      # no 로 끄면 저장/로드가 조금 빨라짐`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-013",
    nameEn: "MULTI-PART AOF",
    nameKo: "멀티파트 AOF",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["base", "incr", "manifest"],
    atk: "base + incr 분리",
    def: "매니페스트로 원자 교체",
    effect:
      "7.0부터 AOF는 단일 파일이 아니라 base 스냅샷 + incr 로그들 + 이를 가리키는 manifest 세트다.",
    flavor: "재작성 중에도 안전한 이유.",
    visual: "aofmp",
    snippet: "…base.rdb + …incr.aof + manifest",
    detail:
      "appenddirname 디렉터리 안에 base 파일(초기 스냅샷, RDB 또는 AOF 포맷), 하나 이상의 incr 파일(그 이후 증분), 그리고 이 구성을 기술한 manifest가 들어간다. rewrite가 시작되면 부모는 새 incr 파일을 열어 계속 쓰고, 자식은 현재 상태로 새 base를 만든다. 자식이 끝나면 임시 manifest를 만들고 원자적으로 교체한 뒤 옛 파일들을 정리한다 — 구형처럼 부모가 버퍼를 메모리에 쌓아 두었다가 마지막에 이어 붙이며 멈추던 문제가 사라졌다. 반복 실패 시 incr 파일이 무한히 늘지 않도록 재시도 속도를 점점 늦추는 제한 장치도 있다. 백업할 때는 rewrite 중 복사하면 세트가 깨질 수 있어 잠시 자동 rewrite를 꺼야 한다.",
    code: `CONFIG GET appenddirname          # 기본 "appendonlydir"
ls /data/appendonlydir/
#  appendonly.aof.1.base.rdb
#  appendonly.aof.1.incr.aof
#  appendonly.aof.manifest

BGREWRITEAOF
INFO persistence
#  aof_rewrite_in_progress / aof_last_bgrewrite_status
#  aof_base_size / aof_current_size

redis-check-aof --fix /data/appendonlydir/appendonly.aof.manifest`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-014",
    nameEn: "COMMAND PROPAGATION",
    nameKo: "명령 전파 방식",
    rarity: "UR",
    type: "INTERNAL",
    attrs: ["Propagation", "Determinism"],
    atk: "효과를 전파",
    def: "복제본 결정성 보장",
    effect:
      "복제본과 AOF에는 받은 명령을 그대로 보내지 않는다. 결과가 갈릴 수 있는 명령은 '실제 일어난 효과'로 바꿔 전파한다.",
    flavor: "SPOP은 복제본에서 다른 답을 낼 수 있으니까.",
    visual: "propagation",
    snippet: "SPOP → SREM <뽑힌 값>",
    detail:
      "무작위성이나 시각에 의존하는 명령을 그대로 전파하면 마스터와 복제본의 데이터가 갈라진다. 그래서 SPOP은 실제로 뽑힌 원소로 만든 SREM으로, EXPIRE는 절대 시각인 PEXPIREAT로, SETEX 계열도 결정적 형태로 바꿔 전파된다. 만료와 축출도 마찬가지로 복제본이 스스로 판단하지 않고 마스터가 DEL(또는 UNLINK)을 내려보낸다. 스크립트와 함수는 예전엔 코드 전체를 전파했지만 지금은 실행 결과 만들어진 쓰기 명령들만 전파하므로, 스크립트 안에서 무작위나 시각을 써도 안전하다. 이 '효과 전파' 원칙이 복제본이 마스터의 정확한 사본으로 남는 근거다.",
    code: `# 마스터가 받은 명령        복제본/AOF로 가는 것
SPOP    myset            →  SREM myset "실제로 뽑힌 값"
EXPIRE  k 100            →  PEXPIREAT k <절대 시각 ms>
INCRBYFLOAT k 0.1        →  SET k <계산된 결과>
키 만료 / LRU 축출        →  DEL k (마스터가 내려보냄)
EVAL "…random…"          →  스크립트가 실행한 쓰기 명령들

MONITOR                  # 마스터가 받은 명령
# vs
redis-cli --rdb /dev/null  # 복제 스트림 관찰(psync)`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-015",
    nameEn: "CLUSTER BUS",
    nameKo: "클러스터 버스",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["Gossip", "port+10000"],
    atk: "노드 간 상태 전파",
    def: "별도 포트 · 이진 프로토콜",
    effect:
      "클라이언트가 쓰는 포트와 별개로 포트+10000에서 노드끼리 gossip을 주고받는다. 방화벽에서 자주 빠뜨리는 지점.",
    flavor: "6379만 열면 클러스터는 뜨지 않는다.",
    visual: "clusterbus",
    snippet: "6379 + 16379 (bus)",
    detail:
      "각 노드는 기본적으로 클라이언트 포트에 10000을 더한 포트를 열어 클러스터 버스로 쓴다(cluster-port로 변경 가능). 여기서 오가는 것은 RESP가 아니라 대역폭을 아끼는 이진 프로토콜이며, PING/PONG 패킷에 자신이 아는 다른 노드들의 상태 일부를 실어 보내는 gossip 방식으로 전체 상태를 수렴시킨다. 이 채널로 노드 발견, 장애 감지(PFAIL/FAIL 전파), 슬롯 소유권 변경, 페일오버 투표가 모두 처리된다. 그래서 보안 그룹이나 방화벽에서 클라이언트 포트만 열면 클러스터가 형성되지 않거나 계속 노드가 fail로 표시된다 — 클러스터 구축 실패의 가장 흔한 원인이다.",
    code: `# 반드시 두 포트 모두 열 것
#   6379  : 클라이언트
#   16379 : 클러스터 버스 (= 6379 + 10000)
CONFIG GET cluster-port          # 0 = 자동(+10000)

CLUSTER NODES
#  <id> <ip>:<port>@<cport> <flags> <master> … <slots>
#                    ↑ 버스 포트

CLUSTER INFO
#  cluster_known_nodes / cluster_size
#  cluster_stats_messages_sent / received

# 노드가 계속 fail? → 버스 포트 방화벽부터 확인`,
    lang: "redis-cli",
  },
  {
    id: "INTERNAL-016",
    nameEn: "LRU / LFU BITS",
    nameKo: "LRU · LFU 비트",
    rarity: "SR",
    type: "INTERNAL",
    attrs: ["24bit", "Morris"],
    atk: "객체당 24비트",
    def: "확률 카운터 + 감쇠",
    effect:
      "축출 판단에 쓰는 정보는 robj 안 24비트가 전부다. 정확한 LRU 리스트도, 정확한 빈도 카운터도 유지하지 않는다.",
    flavor: "정확함보다 싼 것이 이긴다.",
    visual: "lrubits",
    snippet: "8bit counter + 16bit clock",
    detail:
      "LRU 모드에서는 24비트에 마지막 접근 시각을 초 단위로 담고, 축출할 때 무작위 표본을 뽑아 그중 가장 오래된 것을 고른다. LFU 모드에서는 같은 24비트를 8비트 카운터와 16비트 감쇠 시각으로 나눠 쓴다. 8비트로 수백만 회 접근을 세기 위해 Morris 카운터라는 확률적 증가를 쓴다 — 카운터가 클수록 증가 확률이 낮아져 로그 스케일로 포화한다(lfu-log-factor로 조절). 그리고 lfu-decay-time마다 카운터를 낮춰 과거에 뜨거웠던 키가 영원히 남지 않게 한다. 이 설계 덕분에 키 하나당 추가 비용 없이 근사 LFU가 가능하지만, 그래서 OBJECT FREQ 값은 접근 횟수가 아니라 로그 스케일 지표로 읽어야 한다.",
    code: `CONFIG SET maxmemory-policy allkeys-lfu
OBJECT FREQ mykey        # 로그 스케일 카운터 (0~255)
OBJECT IDLETIME mykey    # LRU 모드에서 유휴 초

CONFIG GET lfu-log-factor    # 10 — 클수록 포화가 느림
CONFIG GET lfu-decay-time    # 1분마다 감쇠 (0 = 감쇠 없음)
CONFIG GET maxmemory-samples # 5 — 표본 수(정확도 ↔ CPU)

# 핫키 찾기: LFU 모드에서 상위 FREQ 키 스캔
redis-cli --hotkeys`,
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
    visual: "memstats",
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

  {
    id: "OPS-008",
    nameEn: "ZERO-DOWNTIME UPGRADE",
    nameKo: "무중단 업그레이드",
    rarity: "SR",
    type: "OPS",
    attrs: ["Upgrade", "Failover"],
    atk: "복제본 승격으로 교체",
    def: "CLIENT PAUSE로 전환 보호",
    effect:
      "새 버전을 복제본으로 붙이고 동기화가 끝나면 승격시켜 갈아탄다. 공식 문서가 제시하는 무중단 교체 절차.",
    flavor: "재시작이 필요하면, 재시작하지 말고 갈아타라.",
    visual: "upgrade",
    snippet: "replica → REPLICAOF NO ONE",
    detail:
      "순서가 정해져 있다. (1) 새 인스턴스를 현재 마스터의 복제본으로 띄운다(같은 서버라면 반드시 다른 포트). (2) 초기 동기화 완료를 로그와 INFO의 키 개수 일치로 확인한다. (3) 복제본에 쓰기를 허용한다(replica-read-only no). (4) 전환 직전 CLIENT PAUSE로 옛 마스터에 쓰기가 들어오지 않게 막고 클라이언트를 새 인스턴스로 돌린다. (5) MONITOR로 옛 마스터에 질의가 없음을 확인한 뒤 REPLICAOF NO ONE으로 승격하고 옛 마스터를 내린다. Sentinel이나 Cluster를 쓴다면 복제본부터 하나씩 올린 뒤 수동 페일오버로 승격하는 편이 훨씬 간단하다.",
    code: `# 1) 새 버전을 복제본으로
redis-server --port 6380 --replicaof 127.0.0.1 6379

# 2) 동기화 확인
INFO replication      # master_link_status:up
DBSIZE                # 양쪽 키 개수 일치 확인

# 3~5) 전환
CONFIG SET replica-read-only no
CLIENT PAUSE 5000                  # 옛 마스터 쓰기 차단
#   ... 클라이언트를 6380으로 전환 ...
MONITOR                            # 옛 마스터 질의 0 확인
REPLICAOF NO ONE                   # 신규 인스턴스 승격`,
    lang: "redis-cli",
  },
  {
    id: "OPS-009",
    nameEn: "KERNEL & OS TUNING",
    nameKo: "커널 · OS 튜닝",
    rarity: "SR",
    type: "OPS",
    attrs: ["THP", "overcommit", "swap"],
    atk: "THP off · overcommit 1",
    def: "스왑 확보 · maxmemory 여유",
    effect:
      "Redis 사고의 상당수는 Redis 설정이 아니라 커널 설정에서 온다. 공식 문서가 명시하는 최소 세팅이 있다.",
    flavor: "설정 파일 밖에도 설정이 있다.",
    visual: "kernel",
    snippet: "vm.overcommit_memory = 1",
    detail:
      "vm.overcommit_memory는 1로 둔다 — 0이면 여유 메모리가 부족할 때 fork가 실패해 BGSAVE와 AOF rewrite가 아예 안 된다. Transparent Huge Pages는 never로 끈다 — 켜져 있으면 copy-on-write 단위가 커져 저장 중 메모리와 지연이 동시에 튄다. 스왑은 끄지 말고 메모리와 같은 크기로 켜두는 것이 권장이다. 없으면 메모리 초과 시 OOM 킬러가 프로세스를 즉사시키지만, 있으면 지연 스파이크로 먼저 드러나 대응할 기회가 생긴다. maxmemory는 데이터 외 오버헤드와 단편화를 빼고 잡는다 — 여유가 10GB면 8~9GB로 설정한다. 운영 환경은 Linux가 기본 전제다.",
    code: `# /etc/sysctl.conf
vm.overcommit_memory = 1        # fork 실패 방지
net.core.somaxconn   = 512      # accept 백로그

# Transparent Huge Pages 끄기 (부팅 스크립트에 등록)
echo never > /sys/kernel/mm/transparent_hugepage/enabled

# 스왑은 켜둔다 (메모리와 동일 크기)
#   없으면 OOM 킬러가 즉사시킨다

# maxmemory 는 여유의 80~90%
#   free 10GB → maxmemory 8gb`,
    lang: "conf",
  },
  {
    id: "OPS-010",
    nameEn: "BENCHMARK & LATENCY",
    nameKo: "벤치마크와 지연 측정",
    rarity: "R",
    type: "OPS",
    attrs: ["Benchmark", "Latency"],
    atk: "실측 처리량",
    def: "인프라 지연 분리",
    effect:
      "redis-benchmark로 처리량을, --latency 계열로 지연을 잰다. 핵심은 서버 지연과 네트워크·커널 지연을 분리하는 것.",
    flavor: "튜닝하기 전에, 무엇이 느린지부터.",
    visual: "benchmark",
    snippet: "--intrinsic-latency 먼저",
    detail:
      "redis-benchmark는 -t로 명령을, -n으로 요청 수를, -c로 동시 연결을, -P로 파이프라인 깊이를, -d로 값 크기를 조절한다. 파이프라인 깊이를 올렸을 때 처리량이 크게 뛴다면 병목이 Redis가 아니라 왕복이라는 뜻이다. redis-cli --latency는 클라이언트가 체감하는 지연을, --intrinsic-latency는 서버 하드웨어와 커널이 만드는 최소 지연을 잰다. 후자가 이미 높다면(가상화·전원 절약 모드·이웃 부하) Redis를 아무리 튜닝해도 소용없으므로 이걸 먼저 재야 한다. 벤치마크는 반드시 실제 값 크기와 명령 분포로 돌려야 의미가 있다 — 기본값 3바이트 값으로 낸 숫자는 현실과 무관하다.",
    code: `# 서버가 낼 수 있는 최소 지연 (Redis와 무관한 하한)
redis-cli --intrinsic-latency 100

# 클라이언트 체감 지연
redis-cli --latency
redis-cli --latency-history -i 5

# 처리량 — 실제 값 크기·명령으로
redis-benchmark -t get,set -n 200000 -c 50 -d 512
redis-benchmark -t get -n 200000 -P 16      # 파이프라인 16
#  -P 로 크게 뛰면 병목은 왕복이지 Redis가 아니다`,
    lang: "redis-cli",
  },
  {
    id: "OPS-011",
    nameEn: "INCIDENT PLAYBOOK",
    nameKo: "장애 대응 플레이북",
    rarity: "UR",
    type: "OPS",
    attrs: ["Incident", "Triage"],
    atk: "증상 → 원인 경로",
    def: "첫 확인 명령 고정",
    effect:
      "인메모리·단일 스레드라는 두 전제 때문에 흔한 장애는 증상과 원인이 대체로 정해져 있다. 다섯 가지와 첫 명령.",
    flavor: "새벽에 떠올릴 수 있어야 플레이북이다.",
    visual: "playbook",
    snippet: "OOM · 지연 · 복제 · 소실 · 클러스터",
    detail:
      "(1) OOM command not allowed — maxmemory 도달 + noeviction. INFO memory와 정책을 확인하고 캐시 용도면 allkeys-lru로 바꾼다. (2) 전체적으로 느려짐 — SLOWLOG로 O(N) 명령을 찾고 LATENCY DOCTOR로 fork·AOF 원인을 확인한다. (3) 복제 지연 — INFO replication의 offset 차이, client-output-buffer-limit의 replica 항목, 마스터 쓰기 폭주를 본다. (4) 재시작 후 데이터 소실 — CONFIG SET만 하고 REWRITE를 빠뜨렸거나 persistence가 애초에 꺼져 있던 경우다. (5) 클러스터 쓰기 거부 — cluster_state가 fail이거나 슬롯 커버리지가 깨졌다. 공통 원칙은 '메모리·느린 명령·버퍼' 세 곳을 먼저 보는 것이다.",
    code: `# ① OOM command not allowed
INFO memory | grep -E "used_memory:|maxmemory"
CONFIG GET maxmemory-policy        # noeviction 이면 원인

# ② 전반적 지연
SLOWLOG GET 20
LATENCY DOCTOR
INFO stats | grep latest_fork_usec

# ③ 복제 지연
INFO replication                   # master_repl_offset 차이

# ④ 재시작 후 소실 → CONFIG REWRITE 누락 / persistence off
# ⑤ 클러스터 쓰기 거부
CLUSTER INFO | grep -E "state|slots_assigned"`,
    lang: "redis-cli",
  },

  {
    id: "OPS-012",
    nameEn: "DATA MIGRATION",
    nameKo: "데이터 이전",
    rarity: "SR",
    type: "OPS",
    attrs: ["DUMP", "MIGRATE", "--pipe"],
    atk: "키 단위 · 대량 주입",
    def: "복제로 통째 이전",
    effect:
      "옮기는 방법이 셋이다 — 복제로 통째, MIGRATE로 키 단위, 프로토콜 파일을 --pipe로 대량 주입.",
    flavor: "가장 안전한 이전은 복제본을 만드는 것.",
    visual: "migration",
    snippet: "replica | MIGRATE | --pipe",
    detail:
      "전체를 그대로 옮길 거라면 새 인스턴스를 복제본으로 붙였다가 승격시키는 방식이 가장 안전하고 빠르다(무중단 업그레이드와 같은 절차). 일부 키만 옮길 때는 DUMP로 직렬화해 RESTORE 하거나 한 번에 처리하는 MIGRATE를 쓰는데, 큰 키는 통째로 전송되며 그동안 양쪽이 블로킹되므로 빅키를 먼저 정리해야 한다. 외부 데이터를 대량으로 넣을 때는 명령을 한 줄씩 보내지 말고 RESP 프로토콜 형식 파일을 만들어 redis-cli --pipe로 주입하면 수십 배 빠르다. 버전이 다른 인스턴스 사이에서는 RESTORE의 직렬화 버전이 맞아야 하고, 클러스터로 갈 때는 해시 태그 설계를 미리 맞춰야 한다.",
    code: `# ① 통째로 — 복제 후 승격 (권장)
REPLICAOF <old-host> <old-port>   → 동기화 → REPLICAOF NO ONE

# ② 키 단위
DUMP    mykey
RESTORE mykey 0 "<바이트>" REPLACE
MIGRATE <host> <port> "" 0 5000 COPY REPLACE KEYS k1 k2

# ③ 대량 주입 — RESP 프로토콜 파일로
cat data.resp | redis-cli --pipe
#  형식: *3\\r\\n$3\\r\\nSET\\r\\n$3\\r\\nk1\\r\\n$2\\r\\nv1\\r\\n

# 클러스터로 이전 전 해시 태그 설계 확정할 것`,
    lang: "redis-cli",
  },
  {
    id: "OPS-013",
    nameEn: "INSTANCE SIZING",
    nameKo: "인스턴스 설계",
    rarity: "SR",
    type: "OPS",
    attrs: ["Sizing", "Multi-instance"],
    atk: "코어당 인스턴스",
    def: "장애 반경 축소",
    effect:
      "명령 실행이 단일 스레드이므로 코어를 늘려도 한 인스턴스의 처리량은 늘지 않는다. 인스턴스를 나누는 것이 스케일 방법이다.",
    flavor: "큰 인스턴스 하나가 가장 나쁜 선택.",
    visual: "sizing",
    snippet: "작게 여러 개 > 크게 하나",
    detail:
      "한 서버에 코어가 16개라도 인스턴스 하나는 코어 하나 남짓만 쓴다. 그래서 같은 장비에 여러 인스턴스를 포트를 나눠 띄우고 클러스터로 묶는 구성이 일반적이다. 인스턴스를 작게 유지하면 얻는 것이 많다 — fork 시간이 데이터셋 크기에 비례하므로 저장 지연이 줄고, 전체 재동기화가 빨라지며, 장애 시 영향 범위가 좁아지고, 리샤딩도 쉬워진다. 경험칙으로 인스턴스당 수 GB에서 수십 GB를 넘기지 않는다. 다만 인스턴스마다 복제본이 필요하므로 장비 수와 운영 복잡도가 늘고, 한 장비에 여러 개를 띄울 때는 저장(fork)이 동시에 겹치지 않게 시각을 흩어야 한다.",
    code: `# 한 장비에 여러 인스턴스 (포트로 구분)
redis-server /etc/redis/6379.conf
redis-server /etc/redis/6380.conf
redis-server /etc/redis/6381.conf

# 인스턴스를 작게 유지하면
#   fork 시간 ↓ · 재동기화 시간 ↓ · 장애 반경 ↓ · 리샤딩 용이

INFO stats | grep latest_fork_usec   # 데이터셋 크기에 비례

# ⚠ 같은 장비의 인스턴스들이 동시에 BGSAVE 하지 않게
#   save 지시자 시각을 흩어 설정할 것`,
    lang: "bash",
  },
  {
    id: "OPS-014",
    nameEn: "REDIS ON KUBERNETES",
    nameKo: "쿠버네티스 위의 Redis",
    rarity: "SR",
    type: "OPS",
    attrs: ["StatefulSet", "OOMKilled"],
    atk: "안정적 네트워크 ID",
    def: "메모리 리밋 여유 확보",
    effect:
      "StatefulSet + PVC로 배포하되, 컨테이너 메모리 리밋과 maxmemory 사이에 반드시 여유를 둬야 OOMKilled를 피한다.",
    flavor: "리밋 = maxmemory 로 잡으면 죽는다.",
    visual: "k8sredis",
    snippet: "limit > maxmemory + 여유",
    detail:
      "Deployment가 아니라 StatefulSet을 쓰는 이유는 안정적인 파드 이름과 PVC가 필요하기 때문이다 — 복제 구성과 클러스터 노드 식별이 여기에 의존한다. 가장 흔한 사고는 컨테이너 메모리 리밋을 maxmemory와 같게 잡는 것이다. 실제 RSS는 데이터 외에 복제·클라이언트 버퍼, 단편화, 저장 중 copy-on-write까지 포함하므로 리밋을 넘겨 커널이 프로세스를 죽인다(OOMKilled). 리밋은 maxmemory의 1.5배 안팎으로 잡는 것이 안전하다. 프로브도 주의가 필요하다 — 대용량 RDB 로딩 중에는 PING이 늦으므로 startupProbe에 충분한 시간을 주지 않으면 기동 중 계속 재시작된다.",
    code: `# StatefulSet 핵심만
resources:
  limits:   { memory: "6Gi" }     # maxmemory 4gb 의 1.5배
  requests: { memory: "6Gi" }
args: ["--maxmemory","4gb","--maxmemory-policy","allkeys-lru"]

startupProbe:                      # 대용량 로딩 대비 넉넉히
  exec: { command: ["redis-cli","PING"] }
  failureThreshold: 60
  periodSeconds: 10

volumeClaimTemplates: [ { …, resources: { requests: { storage: 20Gi } } } ]

# ⚠ limit == maxmemory → 저장 중 COW 로 OOMKilled`,
    lang: "conf",
  },
  {
    id: "OPS-015",
    nameEn: "ALERTING METRICS",
    nameKo: "무엇을 알럿으로 걸까",
    rarity: "SR",
    type: "OPS",
    attrs: ["Alert", "SLO"],
    atk: "선행 지표 감시",
    def: "노이즈 알럿 제거",
    effect:
      "지표는 많지만 새벽에 깨울 만한 것은 예닐곱 개다. 결과가 아니라 원인이 되는 지표에 건다.",
    flavor: "울리지 않는 알럿과 늘 우는 알럿, 둘 다 쓸모없다.",
    visual: "alerting",
    snippet: "메모리 · 축출 · 복제 · 지연",
    detail:
      "반드시 거는 것 — used_memory/maxmemory 비율(80% 경고, 90% 심각), evicted_keys 급증(캐시가 아닌 데이터가 버려지는 중일 수 있음), rejected_connections(maxclients 포화), master_link_status가 down, 복제 offset 지연, latest_fork_usec 급증, sync_full 발생(백로그 부족 신호). 상황에 따라 거는 것 — keyspace 적중률 급락(캐시 정책 문제), blocked_clients 증가, mem_fragmentation_ratio 1 미만(스왑). 반대로 순간 QPS나 순간 지연 단일 값에 거는 알럿은 노이즈가 되기 쉬우므로 지속 시간 조건을 붙인다. 모든 알럿에는 '먼저 실행할 명령'을 문서로 붙여 둔다.",
    code: `# 필수 알럿 (Prometheus 스타일 표현)
used_memory / maxmemory            > 0.85  for 5m
rate(evicted_keys[5m])             > 0     for 10m
rate(rejected_connections[5m])     > 0
master_link_status                != "up"  for 1m
master_repl_offset - slave_offset  > 10MB  for 5m
latest_fork_usec                   > 500000
increase(sync_full[1h])            > 0     # 백로그 부족

# 참고 지표
keyspace_hits / (hits + misses)    < 0.8
mem_fragmentation_ratio            < 1.0   # 스왑 의심`,
    lang: "text",
  },
  {
    id: "OPS-016",
    nameEn: "READING THE LOG",
    nameKo: "로그 읽기",
    rarity: "R",
    type: "OPS",
    attrs: ["Log", "Warning"],
    atk: "기동 · 저장 · 복제 흔적",
    def: "경고 메시지 해석",
    effect:
      "Redis 로그는 짧지만 기동, 저장, 복제, 경고가 모두 남는다. 장애 조사에서 가장 먼저 볼 곳.",
    flavor: "시작 로그의 경고를 무시하지 마라.",
    visual: "logs",
    snippet: "WARNING overcommit_memory",
    detail:
      "loglevel은 notice가 기본이고 debug/verbose는 조사할 때만 잠깐 올린다. 기동 시 남는 경고들이 특히 중요하다 — overcommit_memory가 0이라 저장이 실패할 수 있다는 경고, THP가 켜져 있어 지연이 생길 수 있다는 경고, somaxconn이 낮아 백로그가 잘린다는 경고는 모두 실제 장애로 이어지는 예고다. 저장 관련으로는 Background saving started/terminated, fork에 걸린 시간, AOF rewrite 진행이 남고, 복제는 Full resync/Partial resynchronization과 그 이유가 남아 백로그 부족을 판별할 수 있다. 컨테이너에서는 logfile을 비워 두어 표준 출력으로 내보내는 것이 표준이다.",
    code: `CONFIG GET logfile            # 비어 있으면 stdout
CONFIG SET loglevel verbose   # 조사 중에만

# 놓치면 안 되는 기동 경고
# WARNING overcommit_memory is set to 0 → 저장 실패 가능
# WARNING you have Transparent Huge Pages enabled
# WARNING The TCP backlog setting of 511 cannot be enforced

# 저장·복제 흔적
# Background saving started by pid …
# Fork CPU time … / Background saving terminated with success
# Full resync from master … ← 잦으면 백로그 부족
# Partial resynchronization accepted`,
    lang: "text",
  },
  {
    id: "OPS-017",
    nameEn: "INTEGRITY CHECK",
    nameKo: "정합성 검증",
    rarity: "R",
    type: "OPS",
    attrs: ["check-rdb", "DIGEST"],
    atk: "파일 무결성 확인",
    def: "인스턴스 간 비교",
    effect:
      "복구·이전 후에는 데이터가 같은지 확인해야 한다. 파일은 check 도구로, 인스턴스끼리는 다이제스트로 비교한다.",
    flavor: "옮겼다와 같다는 다른 말이다.",
    visual: "integrity",
    snippet: "redis-check-rdb · DEBUG DIGEST",
    detail:
      "redis-check-rdb는 RDB의 구조와 CRC64 체크섬을 검증하고, redis-check-aof는 AOF(7.0+는 manifest)를 검사하며 --fix로 잘린 꼬리를 잘라낼 수 있다. 인스턴스 간 비교는 DEBUG DIGEST가 데이터셋 전체의 해시를 주므로 마스터와 복제본이 같은지 한 번에 확인할 수 있고, DEBUG DIGEST-VALUE로 특정 키만 비교할 수도 있다(만료 시각 차이 등으로 미세하게 달라질 수 있어 해석에 주의가 필요하다). 가벼운 방법으로는 양쪽 DBSIZE와 INFO keyspace를 비교하고, 표본 키를 몇 개 골라 값을 대조한다. 이전 작업의 마지막 단계에 이 검증을 반드시 넣는다.",
    code: `redis-check-rdb /data/dump.rdb
redis-check-aof --fix /data/appendonlydir/appendonly.aof.manifest

# 인스턴스 간 비교
redis-cli -p 6379 DEBUG DIGEST
redis-cli -p 6380 DEBUG DIGEST      # 같으면 동일 데이터셋

DEBUG DIGEST-VALUE user:1000        # 특정 키만

# 가벼운 확인
DBSIZE
INFO keyspace                       # db0:keys=…,expires=…`,
    lang: "redis-cli",
  },
  {
    id: "OPS-018",
    nameEn: "COST OPTIMIZATION",
    nameKo: "비용 최적화",
    rarity: "SR",
    type: "OPS",
    attrs: ["Memory", "Cost"],
    atk: "인코딩 · 키 이름 · TTL",
    def: "측정 후 최적화",
    effect:
      "메모리가 곧 청구서다. 효과가 큰 순서는 불필요한 데이터 제거 → 인코딩 유지 → 키 이름 단축 순이다.",
    flavor: "가장 싼 데이터는 저장하지 않은 데이터.",
    visual: "cost",
    snippet: "TTL → 인코딩 → 키 이름",
    detail:
      "첫째, TTL 없는 키를 찾아 없앤다 — 캐시에 무한 TTL이 섞여 있는 것이 가장 흔한 낭비다. 둘째, 컬렉션을 listpack 임계 안에 유지한다(해시 샤딩). 셋째, 값을 줄인다 — JSON 키 이름을 짧게 하거나 MessagePack 같은 조밀한 직렬화로 바꾸면 값 크기가 절반이 되고 할당자 크기 클래스까지 내려간다. 넷째, 키 이름을 줄인다. 키 하나당 이름 문자열이 그대로 메모리이므로 수천만 키에서는 접두어 몇 글자가 수백 MB가 된다. 다섯째, 정수 집합은 문자열로 감싸지 말고 정수 그대로 넣어 intset을 유지한다. 모든 변경은 MEMORY USAGE로 전후를 실측해 확인한다.",
    code: `# ① TTL 없는 키 찾기 (샘플링)
redis-cli --scan --pattern 'cache:*' | head -1000 | \\
  xargs -n1 redis-cli TTL | sort | uniq -c

# ② 인코딩 유지 확인
OBJECT ENCODING big:hash        # hashtable 이면 샤딩 검토

# ③④ 값·키 이름 줄이기
#  {"userName":"Yuna","userAge":30}  → {"n":"Yuna","a":30}
#  "application:user:profile:1000"   → "u:p:1000"

# ⑤ 정수는 정수로
SADD followers 1001             # intset 유지

MEMORY USAGE <key>              # 항상 전후 실측`,
    lang: "bash",
  },
  {
    id: "OPS-019",
    nameEn: "MULTI-TENANCY",
    nameKo: "멀티테넌시와 격리",
    rarity: "SR",
    type: "OPS",
    attrs: ["Isolation", "Noisy Neighbor"],
    atk: "인스턴스 분리 = 진짜 격리",
    def: "ACL = 권한 격리만",
    effect:
      "DB 번호도 키 프리픽스도 성능을 격리하지 못한다. 한 팀의 O(N) 명령이 모두를 멈춘다.",
    flavor: "같은 스레드를 쓰는 한, 이웃은 조용하지 않다.",
    visual: "tenancy",
    snippet: "인스턴스 > ACL > prefix > DB",
    detail:
      "격리 수단을 강한 순서로 보면 인스턴스 분리, ACL, 키 프리픽스, DB 번호 순이다. 인스턴스 분리만이 CPU·메모리·장애를 실제로 나눈다 — 한 테넌트가 빅키를 만들거나 KEYS를 실행해도 다른 테넌트는 무사하다. ACL은 권한을 나눌 뿐 성능은 공유하므로, 위험 명령을 제거해 사고 확률을 낮추는 보조 수단이다. 키 프리픽스는 논리적 구분과 정리 편의를 줄 뿐이고, DB 번호는 클러스터에서 쓸 수 없는 데다 같은 메모리·같은 이벤트 루프를 공유해 격리라 부르기 어렵다. 공유가 불가피하다면 테넌트별 maxmemory를 나눌 수 없다는 점을 인지하고, 위험 명령 차단과 쿼터를 애플리케이션 계층에서 강제한다.",
    code: `# 강한 격리 순
#  ① 인스턴스/클러스터 분리  ← CPU·메모리·장애까지 분리
#  ② ACL                    ← 권한만 (성능은 공유)
#  ③ 키 프리픽스             ← 논리적 구분
#  ④ DB 번호                ← 격리 아님 (클러스터 불가)

ACL SETUSER tenant-a on >pw ~a:* +@read +@write -@dangerous
ACL SETUSER tenant-b on >pw ~b:* +@read +@write -@dangerous

# 공유 인스턴스에서 반드시 막을 것
#  KEYS · FLUSHALL · FLUSHDB · CONFIG · DEBUG · MONITOR`,
    lang: "redis-cli",
  },
  {
    id: "OPS-020",
    nameEn: "DR DRILL",
    nameKo: "재해 복구 훈련",
    rarity: "UR",
    type: "OPS",
    attrs: ["RTO", "RPO", "Drill"],
    atk: "복구 절차 실측",
    def: "RPO를 숫자로 정의",
    effect:
      "백업이 있다는 것과 복구할 수 있다는 것은 다르다. 복구 시간과 허용 손실을 숫자로 정하고 실제로 해본다.",
    flavor: "복구해 본 적 없는 백업은 백업이 아니다.",
    visual: "drdrill",
    snippet: "RPO ≈ fsync 정책",
    detail:
      "먼저 두 숫자를 정한다. RPO(허용 데이터 손실)는 영속성 설정이 그대로 결정한다 — AOF everysec이면 최대 1초, RDB만 쓰고 5분마다 저장하면 최대 5분이다. RTO(복구 목표 시간)는 실측해야 한다. 데이터셋 크기에 따라 AOF 재생이 RDB 로딩보다 훨씬 오래 걸리므로, 실제 크기로 재시작 시간을 재보지 않으면 추정이 크게 빗나간다. 훈련 항목은 최소 네 가지다 — 백업 파일로 새 인스턴스 복원, 마스터 강제 종료 후 페일오버 시간 측정, 복제본 전체 재동기화 부하 확인, 그리고 실수로 FLUSHALL 했을 때의 복구 경로. 마지막 항목 때문에 백업은 반드시 다른 장비·다른 리전에 두어야 한다.",
    code: `# RPO 는 설정이 정한다
appendfsync everysec   → 최대 1초 손실
save 300 10 (RDB만)    → 최대 5분 손실

# RTO 는 반드시 실측
time redis-server --dir /restore --dbfilename dump.rdb
#  대용량은 AOF 재생 ≫ RDB 로딩

# 훈련 항목
#  ① 백업 파일 → 새 인스턴스 복원 + DEBUG DIGEST 비교
#  ② 마스터 kill -9 → 페일오버 소요 시간 측정
#  ③ 복제본 전체 재동기화 시 마스터 부하 확인
#  ④ FLUSHALL 오작동 시나리오 → 백업 시점 복구

# 백업은 다른 장비·다른 리전에`,
    lang: "bash",
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

  {
    id: "PROG-006",
    nameEn: "FUNCTIONS",
    nameKo: "함수 (7.0+)",
    rarity: "SR",
    type: "PROG",
    attrs: ["Functions", "FCALL"],
    atk: "서버 측 라이브러리",
    def: "복제 · 영속화되는 코드",
    effect:
      "EVAL의 정식 후계. 이름 붙인 함수를 라이브러리로 등록해 FCALL로 호출하고, 그 코드가 서버의 일부로 저장·복제된다.",
    flavor: "스크립트를 데이터처럼 다룬다.",
    visual: "functions",
    snippet: "FUNCTION LOAD → FCALL",
    detail:
      "EVAL/EVALSHA의 근본 문제는 스크립트가 서버가 아니라 클라이언트의 소유물이라는 점이었다 — 재시작이나 페일오버로 스크립트 캐시가 비면 NOSCRIPT 에러가 나고 클라이언트가 다시 올려야 했다. Functions는 FUNCTION LOAD로 등록한 라이브러리가 RDB/AOF에 저장되고 복제본에도 전파되므로 그 문제가 사라진다. redis.register_function으로 이름을 붙이고, 읽기 전용 함수에 no-writes 플래그를 달면 FCALL_RO로 복제본에서도 호출할 수 있다. EVAL이 없어진 것은 아니며 일회성 로직에는 여전히 EVAL이 간단하다 — 재사용하는 비즈니스 로직이면 Functions로 올린다.",
    code: `FUNCTION LOAD "#!lua name=mylib
redis.register_function{
  function_name = 'reserve',
  callback = function(keys, args)
    local n = tonumber(redis.call('GET', keys[1]))
    if n and n > 0 then
      redis.call('DECR', keys[1]); return 1
    end
    return 0
  end
}"

FCALL reserve 1 stock:42      # -> 1 또는 0
FUNCTION LIST                 # 등록된 라이브러리
FUNCTION DUMP / RESTORE       # 백업·이전`,
    lang: "lua",
  },
  {
    id: "PROG-007",
    nameEn: "TTL CONTROL",
    nameKo: "TTL 정밀 제어",
    rarity: "R",
    type: "PROG",
    attrs: ["KEEPTTL", "GETEX", "NX/XX/GT/LT"],
    atk: "조건부 만료 설정",
    def: "덮어써도 TTL 보존",
    effect:
      "SET이 기본적으로 TTL을 날려버린다는 사실이 가장 흔한 버그다. KEEPTTL·GETEX·조건 플래그로 정밀하게 다룬다.",
    flavor: "값만 바꿨는데 세션이 영원해졌다.",
    visual: "ttlctl",
    snippet: "SET … KEEPTTL",
    detail:
      "SET key newval은 기존 TTL을 제거하고 키를 영구로 만든다 — 세션 값을 갱신했더니 만료가 사라져 메모리가 새는 사고가 여기서 나온다. SET ... KEEPTTL을 쓰면 남은 TTL이 그대로 유지된다. 반대로 '읽으면서 만료를 미루는' 슬라이딩 세션은 GETEX key EX 1800 한 번이면 끝난다(예전에는 GET + EXPIRE 두 번이었고 그 사이에 만료될 수 있었다). 7.0부터 EXPIRE에 NX(TTL 없을 때만), XX(있을 때만), GT(더 클 때만), LT(더 작을 때만)가 붙어, 여러 코드 경로가 같은 키의 TTL을 건드릴 때 '늘어나기만' 또는 '줄어들기만' 하도록 강제할 수 있다.",
    code: `SET session:u1 "{...}" EX 1800
SET session:u1 "{new}"              # ❌ TTL 사라짐 (영구)
SET session:u1 "{new}" KEEPTTL      # ✅ 남은 TTL 유지

GETEX session:u1 EX 1800            # 읽으면서 만료 갱신
GETEX session:u1 PERSIST            # 읽으면서 TTL 제거

EXPIRE key 300 NX     # TTL이 없을 때만 설정
EXPIRE key 300 GT     # 기존보다 클 때만 (줄어들지 않게)
EXPIRE key 60  LT     # 기존보다 작을 때만 (늘어나지 않게)`,
    lang: "redis-cli",
  },
  {
    id: "PROG-008",
    nameEn: "ONE-ROUNDTRIP COMMANDS",
    nameKo: "왕복을 줄이는 명령",
    rarity: "R",
    type: "PROG",
    attrs: ["GETDEL", "LMPOP", "SINTERCARD"],
    atk: "읽기 + 쓰기 한 번에",
    def: "그 사이 개입 없음",
    effect:
      "두 번 갈 것을 한 번에 끝내는 명령들. 왕복이 줄 뿐 아니라 그 사이에 끼어들 틈이 사라져 경합도 함께 없어진다.",
    flavor: "GET 하고 판단해서 SET 하기 전에.",
    visual: "roundtrip",
    snippet: "GETDEL · GETEX · SET GET",
    detail:
      "GETDEL은 읽고 지우는 것을(일회용 토큰·OTP), GETEX는 읽고 만료를 갱신하는 것을 원자적으로 한다. SET ... GET은 이전 값을 돌려주면서 새 값을 쓴다. LMPOP/ZMPOP은 여러 키 중 비어 있지 않은 첫 키에서 꺼내므로 우선순위별 큐를 순회할 필요가 없다. SINTERCARD는 교집합 결과를 만들지 않고 크기만 세며 LIMIT으로 조기 종료까지 한다 — 큰 집합에서 '몇 개 이상 겹치는가'만 필요할 때 결정적으로 싸다. COPY는 서버 안에서 키를 복제한다. 습관적으로 GET → 판단 → SET을 쓰기 전에, 한 명령으로 끝나는 게 있는지 먼저 찾아보는 습관이 성능과 정확성을 동시에 준다.",
    code: `GETDEL otp:u1000                 # 읽고 즉시 소멸 (일회용)
GETEX  session:u1 EX 1800        # 읽고 만료 연장
SET    flag:x "on" GET           # 이전 값 반환 + 새 값 쓰기

LMPOP 3 q:high q:mid q:low LEFT COUNT 1   # 우선순위 큐 한 방
ZMPOP 2 delayed:a delayed:b MIN

SINTERCARD 2 tags:a tags:b LIMIT 10  # 교집합 '크기'만, 조기 종료
COPY  cache:v1 cache:v2 REPLACE      # 서버 내 복제`,
    lang: "redis-cli",
  },
  {
    id: "PROG-009",
    nameEn: "ERRORS & RETRY",
    nameKo: "에러와 재시도",
    rarity: "SR",
    type: "PROG",
    attrs: ["Error", "Retry", "Backoff"],
    atk: "에러 종류별 대응",
    def: "무의미한 재시도 차단",
    effect:
      "Redis 에러는 재시도해야 하는 것과 절대 재시도하면 안 되는 것으로 갈린다. 구분하지 않으면 장애가 증폭된다.",
    flavor: "OOM에 재시도는 기름을 붓는 일.",
    visual: "errors",
    snippet: "재시도 O / 리다이렉트 / 재시도 X",
    detail:
      "재시도가 맞는 것 — LOADING(재시작 후 데이터 적재 중), BUSY(느린 스크립트 실행 중, 필요하면 SCRIPT KILL), MASTERDOWN, 일시적 연결 오류. 클라이언트가 자동 처리하는 리다이렉트 — MOVED(슬롯 맵을 갱신하고 재시도), ASK(그 노드에 ASKING 후 1회만). 재시도가 무의미하거나 해로운 것 — WRONGTYPE(코드 버그), NOSCRIPT(스크립트를 다시 올리는 게 먼저), CROSSSLOT(키 설계 문제), OOM(메모리를 비우기 전에는 계속 실패하며 재시도가 부하만 키운다), READONLY(복제본에 쓰기를 보낸 것 — 페일오버 감지 후 재연결이 필요하지 단순 재시도가 아니다). 어느 경우든 지수 백오프와 상한을 두어 장애 중인 서버를 더 때리지 않게 한다.",
    code: `# ✅ 재시도 (지수 백오프)
LOADING     Redis is loading the dataset in memory
BUSY        Redis is busy running a script      → SCRIPT KILL
MASTERDOWN  Link with MASTER is down

# ↪ 클라이언트가 자동 처리 (리다이렉트)
MOVED 5798 10.0.0.12:6379     → 슬롯 맵 갱신 후 재시도
ASK   5798 10.0.0.13:6379     → ASKING + 1회 재시도

# ❌ 재시도 금지 — 원인을 고쳐야 함
WRONGTYPE   자료구조 오용 (코드 버그)
CROSSSLOT   해시 태그 누락 (키 설계)
OOM         maxmemory 도달 → 재시도는 부하만 증폭
READONLY    복제본에 쓰기 → 재연결·토폴로지 갱신 필요`,
    lang: "text",
  },

  {
    id: "PROG-010",
    nameEn: "MULTI vs LUA vs FUNCTIONS",
    nameKo: "원자성 도구 선택",
    rarity: "SR",
    type: "PROG",
    attrs: ["Atomicity", "Decision"],
    atk: "상황별 최소 도구",
    def: "과한 원자성 회피",
    effect:
      "원자적으로 묶는 방법이 셋이다. 조건 분기가 필요한지, 재사용할 것인지 두 질문으로 갈린다.",
    flavor: "명령 하나로 되면 그게 정답.",
    visual: "atomicpick",
    snippet: "단일 → MULTI → Lua → Function",
    detail:
      "① 한 명령으로 끝나면 그냥 그 명령을 쓴다(GETDEL, SET GET, INCR 등) — 가장 싸고 가장 안전하다. ② 여러 명령을 순서대로 묶기만 하면 되고 중간 값에 따른 분기가 없으면 MULTI/EXEC. ③ 읽은 값으로 판단해서 쓰기가 갈리면 Lua — 서버에서 통째로 실행되므로 WATCH 재시도 루프가 필요 없다. ④ 그 로직을 여러 서비스가 재사용하거나 페일오버 후에도 남아야 하면 Functions. 주의할 점은 셋 다 실행 중 다른 클라이언트를 막는다는 것이다 — 무거운 Lua는 원자성을 얻는 대신 전체 지연을 만든다. 그리고 클러스터에서는 어느 방식이든 키가 같은 슬롯에 있어야 한다.",
    code: `# ① 한 명령이면 그것으로
GETDEL otp:u1000

# ② 분기 없는 묶음 → MULTI
MULTI; DECR stock:42; LPUSH orders "o:99"; EXEC

# ③ 읽고 판단해서 쓰기 → Lua (재시도 불필요)
EVAL "if tonumber(redis.call('GET',KEYS[1]))>0 then
        redis.call('DECR',KEYS[1]); return 1 end return 0" 1 stock:42

# ④ 재사용·영속 → Functions
FCALL reserve 1 stock:42

# ⚠ 공통: 실행 중 서버 전체가 대기 · 클러스터는 동일 슬롯`,
    lang: "redis-cli",
  },
  {
    id: "PROG-011",
    nameEn: "CLUSTER-SAFE CODE",
    nameKo: "클러스터 대응 코드",
    rarity: "SR",
    type: "PROG",
    attrs: ["CROSSSLOT", "HashTag"],
    atk: "슬롯별 분할 전송",
    def: "다중 키 명령 회피",
    effect:
      "단일 인스턴스에서 잘 돌던 코드가 클러스터에서 깨지는 지점은 정해져 있다 — 다중 키 명령과 파이프라인.",
    flavor: "나중에 클러스터로 갈 거면, 처음부터 그렇게 짜라.",
    visual: "clustercode",
    snippet: "MGET → 슬롯별 분할",
    detail:
      "MGET·MSET·SINTER·ZUNIONSTORE·MULTI·Lua는 대상 키가 모두 같은 슬롯에 있어야 하고 아니면 CROSSSLOT 에러가 난다. 해결은 둘 중 하나다 — 반드시 함께 다뤄야 하는 키에만 해시 태그를 붙이거나, 애플리케이션에서 키를 슬롯별로 그룹핑해 나눠 보내고 결과를 합치는 것이다(좋은 클라이언트는 MGET 정도는 자동으로 해준다). 파이프라인도 노드별로 나눠야 하므로 클러스터 클라이언트의 파이프라인 지원 여부를 확인해야 한다. SCAN은 노드마다 따로 돌려야 전체를 훑을 수 있고, 키 개수·플러시 같은 관리 명령도 노드 단위다. 처음부터 클러스터를 가정하고 짜면 나중에 옮길 때 고칠 것이 거의 없다.",
    code: `MGET user:1:name user:2:name        # CROSSSLOT 에러 가능

# ① 해시 태그로 묶기 (함께 쓰는 것만)
MGET user:{1}:name user:{1}:email   # OK

# ② 슬롯별로 나눠 보내고 합치기
groups = defaultdict(list)
for k in keys: groups[crc16(hashtag(k)) % 16384].append(k)
for slot, ks in groups.items(): pipe.mget(ks)

# 노드 단위로 해야 하는 것
#   SCAN · DBSIZE · FLUSHDB · INFO keyspace
redis-cli --cluster call <host>:<port> DBSIZE`,
    lang: "python",
  },
  {
    id: "PROG-012",
    nameEn: "CONNECTION POOLING",
    nameKo: "커넥션 풀 설계",
    rarity: "R",
    type: "PROG",
    attrs: ["Pool", "Timeout"],
    atk: "연결 재사용",
    def: "타임아웃 명시",
    effect:
      "풀 크기, 타임아웃, 블로킹 전용 연결 분리 — 이 셋만 제대로 잡으면 클라이언트 쪽 문제는 대부분 사라진다.",
    flavor: "풀을 크게 잡는 게 답인 적은 거의 없다.",
    visual: "pool",
    snippet: "pool × 인스턴스 < maxclients",
    detail:
      "풀 크기는 '동시에 진행 중인 요청 수'만큼이면 충분하다. Redis는 요청을 순차 처리하므로 풀을 키운다고 처리량이 늘지 않고, 오히려 앱 인스턴스 수 × 풀 크기가 maxclients를 넘어 연결이 거부되기 쉽다. 타임아웃은 연결과 명령을 따로 잡되 짧게 둔다 — Redis 응답이 밀리초 단위인데 타임아웃이 수십 초면 장애 시 스레드가 전부 묶인다. BLPOP·XREAD BLOCK 같은 블로킹 명령은 대기 동안 커넥션을 점유하므로 별도 풀로 분리한다. 마지막으로 헬스 체크 간격을 설정해 방화벽이나 로드밸런서가 조용히 끊은 좀비 연결을 걸러낸다.",
    code: `pool = redis.ConnectionPool(
    max_connections=50,          # 동시 진행 요청 수 기준
    socket_connect_timeout=1,    # 연결
    socket_timeout=2,            # 명령 (짧게!)
    health_check_interval=30,    # 좀비 연결 제거
    retry_on_timeout=False)

blocking_pool = redis.ConnectionPool(max_connections=5)  # 분리

# 용량 계산
#   앱 인스턴스 수 × 풀 크기  <  maxclients(기본 10000)
CONFIG GET maxclients
INFO clients        # connected_clients · blocked_clients`,
    lang: "python",
  },
  {
    id: "PROG-013",
    nameEn: "SERIALIZATION",
    nameKo: "직렬화 선택",
    rarity: "R",
    type: "PROG",
    attrs: ["JSON", "MsgPack", "Compression"],
    atk: "값 크기 = 비용",
    def: "스키마 진화 대비",
    effect:
      "값 크기가 메모리와 네트워크를 동시에 정한다. 사람이 읽을 필요가 없다면 JSON을 고집할 이유가 없다.",
    flavor: "필드 이름을 백만 번 저장하고 있는가.",
    visual: "serialize",
    snippet: "JSON > MsgPack > Protobuf",
    detail:
      "JSON은 디버깅이 쉽고 어디서나 읽히지만 필드 이름이 값마다 반복 저장돼 낭비가 크다. MessagePack이나 CBOR로 바꾸면 대개 30~50% 줄고 파싱도 빠르다. Protobuf는 가장 조밀하지만 스키마 파일 관리가 필요하다. 압축(LZ4·Zstd)은 값이 1KB를 넘길 때부터 의미가 있고, 그보다 작으면 CPU만 쓴다. 어떤 형식을 쓰든 스키마 진화를 반드시 고려한다 — 캐시에 남아 있는 옛 형식을 읽다가 배포 직후 전량 실패하는 사고가 흔하므로, 값에 버전 바이트를 붙이거나 키 프리픽스에 버전을 넣어 신구를 공존시킨다. 그리고 필드 일부만 자주 읽는다면 애초에 Hash나 JSON 타입으로 나눠 담는 것이 낫다.",
    code: `# 같은 객체, 다른 크기 (대략)
JSON        {"userName":"Yuna","userAge":30}   ~34B
JSON(짧게)  {"n":"Yuna","a":30}                ~19B
MessagePack <binary>                            ~15B

# 스키마 진화 — 배포 직후 전량 실패 방지
SET user:1000 "\\x02<msgpack>"    # 앞 1바이트 = 버전
#  또는 키에: v2:user:1000

# 값 1KB 이상일 때만 압축 검토 (LZ4/Zstd)
# 일부 필드만 자주 읽으면 → Hash / JSON 타입으로 분리`,
    lang: "text",
  },
  {
    id: "PROG-014",
    nameEn: "TESTING WITH REDIS",
    nameKo: "테스트 전략",
    rarity: "R",
    type: "PROG",
    attrs: ["Testcontainers", "Isolation"],
    atk: "실제 서버로 검증",
    def: "테스트 간 격리",
    effect:
      "인메모리 가짜 구현은 빠르지만 만료·축출·클러스터 동작이 다르다. 로직이 그것들에 의존하면 실제 서버로 테스트해야 한다.",
    flavor: "가짜 Redis는 진짜 버그를 숨긴다.",
    visual: "testing",
    snippet: "container per suite · DB per test",
    detail:
      "단위 테스트에서는 fakeredis 같은 구현으로 충분하지만, TTL 정밀 동작, 축출 정책, Lua, 파이프라인, 클러스터 리다이렉트가 얽힌 코드라면 실제 서버가 필요하다. Testcontainers로 스위트마다 컨테이너를 띄우는 것이 표준이고, 기동 비용을 줄이려면 컨테이너는 하나만 띄우고 테스트마다 DB 번호를 바꾸거나 키 프리픽스를 난수로 주어 격리한다(운영 코드가 클러스터 대상이면 DB 번호는 쓸 수 없으니 프리픽스 방식이 안전하다). 각 테스트 끝에 FLUSHDB로 정리하되 병렬 실행 시에는 서로의 데이터를 지우지 않도록 주의한다. 시간 의존 테스트는 sleep 대신 TTL을 아주 짧게 잡거나 시간을 주입 가능하게 설계한다.",
    code: `# 스위트당 컨테이너 1개, 테스트마다 격리
@pytest.fixture(scope="session")
def redis_url(): return RedisContainer("redis:8").get_url()

@pytest.fixture
def r(redis_url):
    prefix = f"test:{uuid4().hex}:"      # 병렬 안전
    client = redis.from_url(redis_url)
    yield PrefixedClient(client, prefix)
    for k in client.scan_iter(prefix + "*"): client.delete(k)

# 실제 서버가 필요한 경우
#   TTL 정밀 동작 · 축출 정책 · Lua · 파이프라인 · 클러스터`,
    lang: "python",
  },
  {
    id: "PROG-015",
    nameEn: "BULK OPERATIONS",
    nameKo: "대량 작업",
    rarity: "SR",
    type: "PROG",
    attrs: ["SCAN", "Batch", "UNLINK"],
    atk: "SCAN + 파이프라인",
    def: "서버 정지 없이",
    effect:
      "수백만 키를 지우거나 옮기는 작업은 방식 하나로 서버를 멈출 수도, 아무 영향 없이 끝날 수도 있다.",
    flavor: "한 번에 다 하려는 순간 장애가 된다.",
    visual: "bulk",
    snippet: "SCAN → 배치 → UNLINK",
    detail:
      "원칙은 세 가지다. 첫째 KEYS 대신 SCAN으로 커서 순회한다. 둘째 배치로 묶어 파이프라인으로 보내되 한 배치를 수백~수천 개로 제한한다. 셋째 삭제는 DEL이 아니라 UNLINK로 백그라운드 회수시킨다. 여기에 배치 사이에 짧은 지연을 넣어 다른 트래픽에 여지를 주면 운영 중에도 안전하다. redis-cli는 --scan --pattern으로 키 목록을, --bigkeys/--memkeys로 문제 키를 뽑아주므로 스크립트 없이도 상당 부분 처리된다. 클러스터에서는 노드마다 따로 돌려야 하며, Lua로 대량 삭제를 한 번에 실행하는 방식은 그 시간 동안 서버를 멈추므로 피한다.",
    code: `# ❌ 서버 정지
KEYS "cache:*" | xargs redis-cli DEL

# ✅ SCAN + 배치 + UNLINK
cursor = 0
while True:
    cursor, keys = r.scan(cursor, match="cache:*", count=500)
    if keys:
        pipe = r.pipeline(transaction=False)
        for k in keys: pipe.unlink(k)
        pipe.execute()
    if cursor == 0: break
    time.sleep(0.01)          # 다른 트래픽에 여지

# CLI 로도 가능
redis-cli --scan --pattern 'cache:*' | \\
  xargs -n 500 redis-cli UNLINK`,
    lang: "python",
  },
  {
    id: "PROG-016",
    nameEn: "OBSERVABLE CLIENTS",
    nameKo: "관측 가능한 클라이언트",
    rarity: "R",
    type: "PROG",
    attrs: ["SETNAME", "SETINFO"],
    atk: "연결에 이름표",
    def: "범인 서비스 특정",
    effect:
      "CLIENT LIST에 IP만 남으면 누가 문제인지 알 수 없다. 연결에 이름과 라이브러리 정보를 붙여 두면 조사 시간이 크게 준다.",
    flavor: "장애 때 IP만 보이면 아무것도 모르는 것.",
    visual: "observable",
    snippet: "CLIENT SETNAME svc-order-1",
    detail:
      "CLIENT SETNAME으로 연결마다 서비스 이름과 인스턴스를 붙여 두면 CLIENT LIST에 그대로 나타나 어떤 서비스가 연결을 점유하는지, 어떤 서비스가 느린 명령을 보내는지 즉시 특정할 수 있다. 최신 클라이언트는 CLIENT SETINFO로 라이브러리 이름과 버전을 자동으로 보내므로 버전이 섞인 환경에서 문제 버전을 골라내기도 쉽다. 여기에 SLOWLOG는 명령과 인자를 남기고, LATENCY와 commandstats는 분포를 주므로 셋을 함께 보면 '어느 서비스의 어떤 명령이 언제 느려졌는가'가 한 번에 나온다. 애플리케이션 쪽에서도 명령 지연을 히스토그램으로 계측해 서버 지표와 대조하면 네트워크 구간 문제를 분리할 수 있다.",
    code: `CLIENT SETNAME "svc-order:pod-7"     # 연결마다
CLIENT GETNAME
CLIENT SETINFO LIB-NAME redis-py     # 대개 자동 전송
CLIENT INFO

CLIENT LIST
# id=8 addr=10.0.0.7:5123 name=svc-order:pod-7 age=812
#   idle=0 cmd=hgetall lib-name=redis-py lib-ver=5.0.1

CLIENT KILL LADDR 10.0.0.7:5123      # 특정 연결만 정리
CLIENT NO-TOUCH on                   # LRU 갱신 없이 조회(점검용)`,
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
  {
    id: "PATTERN-006",
    nameEn: "SESSION STORE",
    nameKo: "세션 저장소",
    rarity: "R",
    type: "PATTERN",
    attrs: ["Session", "Sliding TTL"],
    atk: "서버 무상태화",
    def: "TTL = 세션 수명",
    effect:
      "세션을 Redis에 두면 웹 서버가 무상태가 되어 수평 확장이 가능해진다. 만료 처리는 TTL이 대신한다.",
    flavor: "세션은 캐시가 아니다 — 날아가면 전원 로그아웃.",
    visual: "session",
    snippet: "GETEX로 읽기 + 연장",
    detail:
      "세션 ID를 키로, 사용자 정보를 Hash나 직렬화 값으로 저장하고 TTL을 세션 수명으로 건다. 활동할 때마다 만료를 미루는 슬라이딩 세션은 GETEX로 읽기와 갱신을 한 번에 처리한다. 로그아웃은 DEL이고, '모든 기기에서 로그아웃'은 사용자별 세션 ID 집합(Set)을 따로 두고 순회하며 지운다. 주의점 둘. 세션은 유실되면 전원 로그아웃되는 데이터이므로 축출 정책이 allkeys-*면 세션까지 버려질 수 있다 — volatile-* 를 쓰거나 캐시와 인스턴스를 분리한다. 그리고 세션 값에 큰 객체를 넣지 않는다(모든 요청마다 전송된다).",
    code: `# 로그인
SET  session:abc123 '{"uid":1000,"role":"user"}' EX 1800
SADD user:1000:sessions "abc123"        # 기기 목록

# 요청마다 — 읽기 + 만료 연장을 한 번에
GETEX session:abc123 EX 1800

# 로그아웃
DEL  session:abc123
SREM user:1000:sessions "abc123"

# 전체 기기 로그아웃
SMEMBERS user:1000:sessions → 각각 DEL

# ⚠ allkeys-lru 캐시와 같은 인스턴스에 두지 말 것`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-007",
    nameEn: "LEADERBOARD",
    nameKo: "리더보드",
    rarity: "R",
    type: "PATTERN",
    attrs: ["ZSet", "Ranking"],
    atk: "실시간 순위 조회",
    def: "동점 · 기간 분리",
    effect:
      "정렬 집합 하나면 끝난다. 실제로 어려운 건 랭킹이 아니라 동점 처리, 기간 분리, 대규모 페이지네이션이다.",
    flavor: "동점일 때 누가 위인지가 진짜 문제.",
    visual: "leaderboard",
    snippet: "score = 점수·10^10 − 시각",
    detail:
      "ZINCRBY로 점수를 올리고 ZREVRANGE로 상위 N, ZREVRANK로 개인 순위를 얻는다. 동점이면 멤버 사전순이 되어 '먼저 달성한 사람이 위'가 되지 않는다 — score를 (점수 × 10^10 − 타임스탬프)처럼 합성해 시간을 tie-breaker로 넣는다(부동소수점 정밀도 한계 안에서). 일간·주간 랭킹은 rank:2026-08-12처럼 키를 나누고 TTL을 걸며, 기간 합산은 ZUNIONSTORE로 만든다. '내 주변 순위'는 ZREVRANK로 위치를 얻어 그 앞뒤 구간만 ZREVRANGE 한다. 수백만 명 규모면 상위 100위는 캐시하고 개인 순위만 실시간으로 조회하는 분리가 필요하다.",
    code: `ZINCRBY rank:2026-08-12 50 "player:7"
EXPIRE  rank:2026-08-12 604800

ZREVRANGE rank:2026-08-12 0 9 WITHSCORES    # TOP 10
ZREVRANK  rank:2026-08-12 "player:7"        # 내 순위

# 내 주변 5명
r = ZREVRANK …           # -> 128
ZREVRANGE rank:… 123 133

# 주간 합산
ZUNIONSTORE rank:week 7 rank:2026-08-06 … rank:2026-08-12

# 동점 → 먼저 달성한 쪽이 위
#   score = points * 10000000000 - epoch_seconds`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-008",
    nameEn: "IDEMPOTENCY KEY",
    nameKo: "멱등 키",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["Idempotency", "NX"],
    atk: "중복 요청 차단",
    def: "저장된 결과 재사용",
    effect:
      "같은 요청이 두 번 와도 실제 처리는 한 번만. 결제·주문처럼 재시도가 위험한 API의 표준 방어선.",
    flavor: "락은 동시 실행을 막고, 멱등 키는 결과를 돌려준다.",
    visual: "idempotency",
    snippet: "SET idem:<key> NX → 결과 저장",
    detail:
      "클라이언트가 요청마다 고유한 멱등 키를 보내면 서버는 SET idem:<key> \"processing\" NX EX 86400으로 선점을 시도한다. 성공하면 첫 요청이므로 실제 처리를 하고 결과를 그 키에 덮어쓴다. 실패하면(이미 존재) 저장된 결과를 그대로 반환한다. 여기서 결과를 저장하지 않고 그냥 '중복' 에러만 주면, 응답을 못 받아 재시도한 정상 클라이언트가 영원히 결과를 받지 못한다 — 이게 가장 흔한 구현 실수다. 처리 도중 죽는 경우를 대비해 processing 상태에는 짧은 TTL을, 완료된 결과에는 긴 TTL을 준다. 분산 락과 비슷해 보이지만 목적이 다르다 — 락은 동시 실행을 막고, 멱등 키는 이미 한 일의 결과를 재사용한다.",
    code: `# 첫 요청만 선점 성공
if SET idem:<key> "processing" NX EX 60:
    result = process_payment(...)          # 실제 처리
    SET idem:<key> <result-json> EX 86400  # 결과로 덮어쓰기
    return result
else:
    v = GET idem:<key>
    if v == "processing":
        return 409  # 진행 중 — 잠시 후 재시도 안내
    return v        # ✅ 저장된 결과 그대로 반환

# ❌ 흔한 실수: 중복이면 에러만 반환
#    → 응답 못 받은 정상 재시도가 영원히 결과를 못 받음`,
    lang: "python",
  },
  {
    id: "PATTERN-009",
    nameEn: "TIMELINE / FEED",
    nameKo: "타임라인 · 피드",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["Fan-out", "Feed"],
    atk: "쓰기 팬아웃 = 빠른 읽기",
    def: "읽기 병합 = 싼 쓰기",
    effect:
      "팔로우 기반 피드는 둘 중 하나다 — 글 쓸 때 팔로워 전원 타임라인에 밀어넣거나, 읽을 때 팔로잉들의 글을 합치거나.",
    flavor: "100만 팔로워 한 명이 설계를 결정한다.",
    visual: "feed",
    snippet: "fan-out on write vs on read",
    detail:
      "fan-out on write는 게시 시점에 팔로워 각각의 타임라인에 글 ID를 LPUSH하고 LTRIM으로 최근 N개만 남긴다 — 읽기가 LRANGE 한 번이라 매우 빠르지만, 팔로워 100만인 계정이 글 하나를 쓰면 100만 번의 쓰기가 발생한다. fan-out on read는 읽을 때 팔로잉들의 최신 글을 모아 정렬한다 — 쓰기는 싸지만 읽기가 무겁고 팔로잉이 많을수록 나빠진다. 실무 해법은 혼합이다. 일반 계정은 쓰기 팬아웃으로 처리하고, 팔로워가 아주 많은 계정만 예외로 읽기 시 병합한다. 정렬 기준이 순수 시간순이 아니면(랭킹·개인화) List 대신 ZSet에 score로 정렬 값을 넣는다.",
    code: `# ── fan-out on write (일반 계정)
for f in followers:                     # 게시 시점에 밀어넣기
    LPUSH timeline:{f} "post:99"
    LTRIM timeline:{f} 0 999
LRANGE timeline:{me} 0 19               # 읽기는 한 번

# ── fan-out on read (팔로워 많은 계정)
#   게시 시엔 자기 글 목록에만 저장
LPUSH posts:celeb "post:99"
#   읽을 때 팔로잉 중 대형 계정만 병합
ZRANGE posts:celeb 0 19 REV

# ⚠ 혼합이 정답 — 대형 계정만 예외 처리`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-010",
    nameEn: "REALTIME COUNTERS",
    nameKo: "실시간 카운터",
    rarity: "R",
    type: "PATTERN",
    attrs: ["Counter", "Bucket", "Flush"],
    atk: "락 없는 원자 집계",
    def: "버킷 분할 + 주기 플러시",
    effect:
      "조회수·좋아요·지표를 Redis에서 세고 주기적으로 원본 DB에 반영한다. DB 쓰기 부하가 수십 분의 일로 준다.",
    flavor: "매 클릭마다 DB를 때리지 마라.",
    visual: "counter",
    snippet: "HINCRBY 버킷 → 주기 플러시",
    detail:
      "INCR/HINCRBY는 원자적이라 락 없이 정확하다. 시간대별 지표는 stat:2026-08-12:14 같은 시간 버킷 키에 담고 TTL을 걸어 자동 정리한다. 대상이 많을 때 키를 수만 개 만드는 대신 Hash 하나에 필드로 모으면 메모리가 훨씬 절약된다(작은 해시는 listpack 인코딩). 원본 DB로는 별도 워커가 주기적으로 훑어 반영하는데, 이때 '읽고 리셋'을 원자적으로 하지 않으면 그 사이 증가분을 잃는다 — GETDEL을 쓰거나 Lua로 read-and-reset을 한 번에 처리한다. 정확한 값보다 규모가 중요하면 HyperLogLog나 Count-min sketch로 바꾼다.",
    code: `# 시간 버킷 + 필드로 모으기 (키 폭발 방지)
HINCRBY stat:2026-08-12:14 "post:99:views" 1
EXPIRE  stat:2026-08-12:14 172800 NX

# 플러시 워커 — 읽고 리셋을 원자적으로
EVAL "
  local v = redis.call('HGETALL', KEYS[1])
  redis.call('DEL', KEYS[1])
  return v
" 1 stat:2026-08-12:14
#   ❌ HGETALL 후 DEL 로 나누면 그 사이 증가분 유실

GETDEL counter:simple      # 단일 카운터면 이 한 줄`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-011",
    nameEn: "DISTRIBUTED SEMAPHORE",
    nameKo: "분산 세마포어",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["Semaphore", "ZSet"],
    atk: "동시 실행 N개 제한",
    def: "만료된 점유 자동 회수",
    effect:
      "락이 '한 명만'이라면 세마포어는 'N명까지'다. ZSet에 획득 시각을 score로 넣어 오래된 점유를 청소한다.",
    flavor: "외부 API 동시 호출 수를 지키는 법.",
    visual: "semaphore",
    snippet: "ZREMRANGEBYSCORE → ZCARD",
    detail:
      "외부 API 동시 호출 제한, DB 커넥션 총량 제한처럼 '전체에서 N개까지'를 강제할 때 쓴다. 구현은 ZSet 하나다 — 먼저 타임아웃보다 오래된 항목을 ZREMRANGEBYSCORE로 지워 죽은 점유자를 회수하고, 내 토큰을 현재 시각 score로 ZADD한 뒤 ZRANK가 N보다 작으면 획득 성공, 아니면 내 토큰을 ZREM하고 실패 처리한다. 반납은 ZREM이다. 이 세 단계 사이에 다른 클라이언트가 끼어들면 한도를 넘을 수 있으므로 반드시 Lua로 묶어 원자적으로 실행한다. 점유 시간이 타임아웃보다 길어질 수 있다면 주기적으로 score를 갱신하는 하트비트를 함께 둔다.",
    code: `-- Lua 로 한 번에 (원자성 필수)
local now, limit, ttl = tonumber(ARGV[1]), tonumber(ARGV[2]), tonumber(ARGV[3])
redis.call('ZREMRANGEBYSCORE', KEYS[1], 0, now - ttl)  -- 죽은 점유 회수
if redis.call('ZCARD', KEYS[1]) < limit then
  redis.call('ZADD', KEYS[1], now, ARGV[4])            -- 내 토큰
  return 1
end
return 0

# 반납
ZREM sem:extapi <token>
# 장기 작업이면 주기적으로 score 갱신(하트비트)
ZADD sem:extapi XX GT <now> <token>`,
    lang: "lua",
  },
  {
    id: "PATTERN-012",
    nameEn: "DELAYED JOBS",
    nameKo: "지연 작업 큐",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["ZSet", "Scheduler"],
    atk: "score = 실행 시각",
    def: "폴링 워커가 회수",
    effect:
      "'10분 뒤에 실행'은 정렬 집합의 score에 실행 시각을 넣으면 된다. 만료 이벤트에 기대지 않는 것이 핵심.",
    flavor: "TTL은 타이머가 아니다.",
    visual: "delayed",
    snippet: "ZRANGEBYSCORE 0 now",
    detail:
      "키 만료 알림으로 스케줄링을 구현하려는 시도가 흔하지만, expired 이벤트는 실제 삭제 시점에 발생해 지연되고 Pub/Sub이라 유실될 수도 있어 부적합하다. 올바른 방법은 ZSet에 job ID를 넣고 score를 실행 예정 시각(epoch ms)으로 두는 것이다. 워커는 주기적으로 score가 현재 시각 이하인 항목을 꺼내 처리한다. 이때 조회와 제거 사이에 다른 워커가 같은 작업을 가져가지 않도록 ZRANGEBYSCORE + ZREM을 Lua로 묶거나, 7.0+의 ZMPOP/BZMPOP을 쓴다. 처리 중 실패를 대비해 꺼낸 작업을 '처리 중' ZSet으로 옮기고 완료 시 제거하면 신뢰성 큐가 되고, 재시도는 score를 미래로 다시 밀어 넣으면 된다.",
    code: `# 10분 뒤 실행 예약
ZADD jobs:scheduled <now_ms + 600000> "job:99"

# 워커: 실행 시각이 된 것만 원자적으로 꺼내기
EVAL "
  local due = redis.call('ZRANGEBYSCORE', KEYS[1], 0, ARGV[1], 'LIMIT', 0, 10)
  if #due > 0 then redis.call('ZREM', KEYS[1], unpack(due)) end
  return due
" 1 jobs:scheduled <now_ms>

# 재시도 = 미래로 다시 밀기 (지수 백오프)
ZADD jobs:scheduled <now_ms + 2^n * 1000> "job:99"

# ❌ 만료 이벤트로 스케줄링하지 말 것 (지연·유실)`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-013",
    nameEn: "AUTOCOMPLETE",
    nameKo: "자동완성",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["ZRANGEBYLEX", "Prefix"],
    atk: "접두어 범위 조회",
    def: "score 동일 → 사전순",
    effect:
      "정렬 집합의 모든 원소 score를 0으로 두면 사전순으로 정렬된다. 그러면 접두어 검색이 범위 조회가 된다.",
    flavor: "같은 점수는 이름순이라는 규칙의 활용.",
    visual: "autocomplete",
    snippet: "[ho  →  [ho\\xff",
    detail:
      "score를 전부 같게 하면 ZSet은 멤버 사전순으로 정렬되고, ZRANGEBYLEX로 '[prefix'부터 '[prefix\\xff'까지를 조회하면 그 접두어로 시작하는 항목이 한 번에 나온다. 인기순 정렬이 필요하면 score에 인기도를 넣는 대신 멤버를 '인기도역순:이름' 형태로 합성하거나, lex 결과를 받아 별도 ZSet에서 점수를 조회해 정렬한다. 한글은 자모 분리·초성 검색이 필요하면 색인 시점에 변환한 문자열을 함께 넣어야 한다. 항목이 아주 많으면 접두어 2~3글자별로 ZSet을 쪼개(ac:ho 같은 키) 각 집합을 작게 유지하는 것이 조회와 메모리 모두에 유리하다.",
    code: `# 색인: score 를 모두 0 으로
ZADD ac:names 0 "home" 0 "hospital" 0 "hotel" 0 "house"

# "ho" 로 시작하는 항목
ZRANGEBYLEX ac:names "[ho" "[ho\\xff" LIMIT 0 10
# -> home, hospital, hotel, house

# 인기순이 필요하면 멤버를 합성
ZADD ac:names 0 "hotel:0912"     # 이름:인기도역순
# 또는 lex 결과를 popularity ZSet 에서 재조회

# 항목이 많으면 접두어별로 키 분할
#   ac:ho · ac:ha …  (각 집합을 작게 유지)`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-014",
    nameEn: "TAG-BASED INVALIDATION",
    nameKo: "태그 기반 무효화",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["Tag", "Reverse Index"],
    atk: "한 번에 관련 캐시 제거",
    def: "역인덱스 유지 비용",
    effect:
      "'상품 42가 바뀌면 관련 캐시 전부 제거'를 하려면, 태그에서 키로 가는 역인덱스를 따로 만들어야 한다.",
    flavor: "KEYS 로 찾을 생각을 하는 순간 잘못된 길.",
    visual: "taginval",
    snippet: "tag:product:42 → Set of keys",
    detail:
      "캐시 키에 패턴이 있다고 KEYS나 SCAN으로 지우려 들면 느리고 부정확하다. 대신 캐시를 저장할 때 그 캐시가 의존하는 태그마다 Set에 키 이름을 추가해 역인덱스를 만든다. 무효화 시에는 해당 태그 Set의 멤버를 모두 UNLINK하고 Set 자체도 지운다. 주의점은 역인덱스가 커지고 낡는다는 것이다 — 캐시 키는 TTL로 사라지지만 태그 Set에는 이름이 남으므로, 태그 Set에도 TTL을 걸거나 무효화 시 한꺼번에 정리한다. 태그 수가 적고 무효화가 잦다면 '세대(generation) 번호'를 쓰는 대안이 더 싸다 — 태그별 카운터를 올리고 캐시 키에 그 번호를 포함시키면, 번호를 올리는 것만으로 옛 키가 자동으로 미아가 되어 TTL로 사라진다.",
    code: `# 저장 시 태그 역인덱스도 함께
SET  cache:page:home <html> EX 600
SADD tag:product:42 "cache:page:home"
SADD tag:user:1000  "cache:page:home"
EXPIRE tag:product:42 3600

# 상품 42 변경 → 관련 캐시 일괄 제거
SMEMBERS tag:product:42 → UNLINK 각각
UNLINK tag:product:42

# 대안: 세대 번호 (역인덱스 불필요)
INCR gen:product:42                  # -> 7
SET cache:product:42:v7 <html> EX 600
#  번호를 올리면 옛 키는 자동으로 미아 → TTL 로 소멸`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-015",
    nameEn: "INVENTORY RESERVATION",
    nameKo: "재고 예약",
    rarity: "UR",
    type: "PATTERN",
    attrs: ["Lua", "Oversell"],
    atk: "초과 판매 차단",
    def: "예약 만료 자동 복구",
    effect:
      "확인과 차감 사이에 다른 요청이 끼어들면 초과 판매가 난다. 검사와 차감을 한 번에 원자적으로 실행하는 것이 유일한 해법.",
    flavor: "GET 후 DECR 하는 순간 이미 늦었다.",
    visual: "inventory",
    snippet: "check + decr in one Lua",
    detail:
      "GET으로 재고를 읽고 앱에서 판단한 뒤 DECR 하면, 그 사이에 들어온 요청들이 같은 값을 읽어 재고보다 많이 팔린다. Lua로 '읽고 비교하고 차감'을 한 번에 실행하면 단일 스레드 특성상 그 사이에 아무도 끼어들 수 없어 문제가 사라진다. 결제 전 '임시 예약'이 필요하면 재고를 차감하면서 예약 키를 TTL과 함께 만들고, 결제가 완료되면 예약 키를 지워 확정하며, 만료되면 별도 워커가 재고를 되돌린다(또는 예약 ZSet에 만료 시각을 넣어 회수한다). 클러스터에서는 재고 키와 예약 키가 같은 슬롯에 있어야 하므로 해시 태그로 묶는다.",
    code: `-- 검사 + 차감 + 예약을 한 번에
local stock = tonumber(redis.call('GET', KEYS[1]) or 0)
local qty   = tonumber(ARGV[1])
if stock < qty then return 0 end
redis.call('DECRBY', KEYS[1], qty)
redis.call('SET', KEYS[2], qty, 'EX', 600)      -- 예약 TTL
redis.call('ZADD', KEYS[3], tonumber(ARGV[2]) + 600000, ARGV[3])
return 1

# 호출 — 클러스터 대비 해시 태그로 동일 슬롯
EVAL <script> 3 stock:{p42} resv:{p42}:o99 resv:expiring:{p42} 2 <now_ms> "o99"

# 만료 예약 회수 워커: ZRANGEBYSCORE 0 now → INCRBY 재고 복구`,
    lang: "lua",
  },
  {
    id: "PATTERN-016",
    nameEn: "RECENTLY VIEWED",
    nameKo: "최근 본 목록",
    rarity: "R",
    type: "PATTERN",
    attrs: ["ZSet", "Dedup"],
    atk: "중복 제거 + 최신순",
    def: "상한 유지",
    effect:
      "List로 만들면 중복이 쌓인다. ZSet에 score를 조회 시각으로 두면 중복 제거와 최신순 정렬이 동시에 해결된다.",
    flavor: "같은 상품을 두 번 보면 위로 올라와야 한다.",
    visual: "recent",
    snippet: "ZADD now → ZREMRANGEBYRANK",
    detail:
      "List에 LPUSH하고 LTRIM하는 방식은 같은 항목을 다시 봐도 새 원소가 쌓여 목록이 중복으로 채워진다. ZSet에 멤버를 항목 ID, score를 조회 시각으로 넣으면 같은 항목을 다시 볼 때 score만 갱신되어 자연스럽게 맨 위로 올라간다. 목록 길이는 ZREMRANGEBYRANK로 상한을 유지한다 — 예를 들어 최근 20개만 남기려면 0부터 -21까지를 지운다. 두 명령을 파이프라인이나 Lua로 묶으면 왕복이 한 번이다. 사용자별 키에 TTL을 걸어 비활성 사용자의 목록이 영원히 남지 않게 한다. 같은 구조로 '최근 검색어', '최근 대화방'도 그대로 구현된다.",
    code: `# 조회 시점 — 두 명령을 파이프라인으로
ZADD recent:u1000 <now_ms> "product:42"      # 중복이면 score만 갱신
ZREMRANGEBYRANK recent:u1000 0 -21           # 최근 20개만 유지
EXPIRE recent:u1000 2592000                  # 30일

# 조회
ZREVRANGE recent:u1000 0 19                  # 최신순
ZSCORE    recent:u1000 "product:42"          # 마지막으로 본 시각

# ❌ List 방식은 중복이 쌓인다
# LPUSH recent:u1000 "product:42"; LTRIM recent:u1000 0 19`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-017",
    nameEn: "FEATURE FLAGS",
    nameKo: "피처 플래그",
    rarity: "R",
    type: "PATTERN",
    attrs: ["Hash", "Pub/Sub", "Tracking"],
    atk: "즉시 전파",
    def: "로컬 캐시로 무부하",
    effect:
      "플래그는 매우 자주 읽고 거의 안 쓴다. 클라이언트 로컬 캐시 + 변경 시 무효화 통보가 정답인 전형적 사례.",
    flavor: "요청마다 Redis에 물어볼 필요 없다.",
    visual: "flags",
    snippet: "Hash + invalidate push",
    detail:
      "플래그 전체를 Hash 하나에 담고(HGETALL 한 번이면 전부 로드) 애플리케이션 메모리에 캐시한다. 값이 바뀌면 두 가지 방법으로 알린다 — CLIENT TRACKING(BCAST PREFIX flag:)을 켜서 서버가 invalidate를 push하게 하거나, 변경 시 Pub/Sub 채널로 알려 각 인스턴스가 다시 읽게 한다. 전자는 별도 채널 없이 동작하고 후자는 RESP2 환경에서도 쓸 수 있다. 어느 쪽이든 알림 유실에 대비해 짧은 주기(수십 초) 폴링을 백업으로 둔다. 사용자 일부에게만 켜는 점진적 배포는 플래그 값에 비율을 넣고 사용자 ID 해시로 판정하거나, 대상 사용자 Set을 따로 두고 SISMEMBER로 확인한다.",
    code: `HSET flags "new-checkout" "on" "dark-mode" "50%"
HGETALL flags                      # 기동 시 전량 로드 → 로컬 캐시

# 변경 전파 ① 서버 push (RESP3)
CLIENT TRACKING ON BCAST PREFIX flags
# 변경 시 → invalidate 수신 → 해당 키만 다시 로드

# 변경 전파 ② Pub/Sub (RESP2 호환)
HSET flags "new-checkout" "off"
PUBLISH flags:changed "new-checkout"

# 점진적 배포
SADD flag:new-checkout:users 1000 1001
SISMEMBER flag:new-checkout:users 1000
# 또는 hash(userId) % 100 < 50`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-018",
    nameEn: "USAGE METERING",
    nameKo: "사용량 집계 · 과금",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["Metering", "Idempotency"],
    atk: "원자 누적",
    def: "중복 계산 방지",
    effect:
      "과금으로 이어지는 카운터는 빠르기만 해서는 안 된다. 중복 집계와 플러시 중 유실을 둘 다 막아야 한다.",
    flavor: "돈이 걸리면 근사치는 답이 아니다.",
    visual: "metering",
    snippet: "SET NX 중복검사 → HINCRBY",
    detail:
      "구조는 실시간 카운터와 같지만 두 가지가 추가된다. 첫째 멱등성 — 같은 이벤트가 재시도로 두 번 오면 두 번 세면 안 되므로, 이벤트 ID로 SET NX를 걸어 처음일 때만 HINCRBY 하고 두 검사를 Lua로 묶는다. 둘째 무손실 플러시 — 워커가 HGETALL 후 DEL 하는 사이 들어온 증가분이 사라지므로, 시간 버킷을 쓰고 이미 지난 버킷만 확정 처리하거나 Lua로 읽기와 리셋을 원자화한다. 시간 버킷 방식이 더 안전하다. 현재 버킷은 계속 쌓게 두고 이전 버킷만 DB로 옮긴 뒤 지우면, 경합 자체가 발생하지 않는다. 최종 정산은 항상 원본 이벤트 로그와 대조할 수 있게 남겨 둔다.",
    code: `-- 멱등 누적 (같은 이벤트 ID 는 한 번만)
if redis.call('SET', KEYS[1], 1, 'NX', 'EX', 86400) then
  redis.call('HINCRBY', KEYS[2], ARGV[1], tonumber(ARGV[2]))
  return 1
end
return 0
# KEYS[1]=seen:evt:<id>  KEYS[2]=usage:{acct}:2026081214

# 플러시: '지난' 버킷만 확정 (경합 없음)
#   현재 14시 → 13시 버킷만 처리
HGETALL usage:{acct}:2026081213
#   DB 반영 성공 후
UNLINK  usage:{acct}:2026081213

# 정산은 원본 이벤트 로그와 대조 가능하게 보관`,
    lang: "lua",
  },
  {
    id: "PATTERN-019",
    nameEn: "SHARED CIRCUIT BREAKER",
    nameKo: "공유 서킷 브레이커",
    rarity: "SR",
    type: "PATTERN",
    attrs: ["CircuitBreaker", "TTL"],
    atk: "인스턴스 간 상태 공유",
    def: "TTL = 자동 half-open",
    effect:
      "인스턴스마다 따로 판단하면 각자 실패를 겪어야 열린다. 상태를 Redis에 두면 한 번의 장애로 전체가 즉시 차단된다.",
    flavor: "같은 벽에 100번 부딪힐 필요는 없다.",
    visual: "breaker",
    snippet: "실패 카운터 + open TTL",
    detail:
      "실패할 때마다 INCR로 카운터를 올리고 짧은 TTL을 건다(윈도우 역할). 카운터가 임계를 넘으면 open 키를 TTL과 함께 만들어 그 시간 동안 모든 인스턴스가 호출을 건너뛴다. TTL이 끝나면 open 키가 사라져 자연스럽게 half-open이 되고, 한 요청이 통과해 성공하면 카운터를 리셋하고 실패하면 다시 open을 만든다 — 별도 타이머 없이 만료가 상태 전이를 대신하는 것이 이 구현의 장점이다. half-open에서 여러 인스턴스가 동시에 시도하지 않도록 SET NX로 탐색 권한을 한 곳에만 준다. 주의할 점은 Redis 자체가 장애일 때다 — 브레이커 조회에 실패하면 차단이 아니라 통과(fail-open)를 기본값으로 두어야 Redis 장애가 전체 장애로 번지지 않는다.",
    code: `# 호출 전
EXISTS cb:extapi:open        # 1 이면 즉시 실패 반환(호출 생략)

# 실패 시
INCR   cb:extapi:fails
EXPIRE cb:extapi:fails 60 NX          # 60초 윈도우
# 임계 초과 → 차단 (TTL 이 곧 open 시간)
SET cb:extapi:open 1 EX 30

# half-open: 탐색 권한을 한 인스턴스에만
SET cb:extapi:probe 1 NX EX 5
#  성공 → DEL cb:extapi:fails / 실패 → SET open 다시

# ⚠ Redis 조회 실패 시 기본값은 '통과'(fail-open)`,
    lang: "redis-cli",
  },
  {
    id: "PATTERN-020",
    nameEn: "JOB SYSTEM ON REDIS",
    nameKo: "Redis만으로 만드는 작업 시스템",
    rarity: "UR",
    type: "PATTERN",
    attrs: ["Stream", "ZSet", "Lock"],
    atk: "예약 · 실행 · 재시도",
    def: "데드레터까지 한 스택",
    effect:
      "지연 큐(ZSet) + 실행 큐(Stream) + 중복 방지(락) + 데드레터. 앞선 패턴들을 조합하면 작업 시스템 하나가 나온다.",
    flavor: "각 조각은 이미 다 배웠다.",
    visual: "jobsystem",
    snippet: "ZSet → Stream → PEL → DLQ",
    detail:
      "예약은 ZSet에 실행 시각을 score로 넣어 관리하고, 디스패처가 시각이 된 작업을 꺼내 Stream에 XADD 한다(꺼내기와 넣기를 Lua로 묶어 중복 투입을 막는다). 워커는 XREADGROUP으로 받아 처리하고 XACK 한다. 처리 실패나 워커 사망은 PEL에 남으므로 XAUTOCLAIM으로 회수하고, delivery count가 임계를 넘으면 데드레터 스트림으로 XADD 한 뒤 원본을 XACK 해 무한 재시도를 끊는다. 같은 작업이 중복 실행되면 안 되는 경우 멱등 키를 함께 쓴다. 디스패처가 여러 대면 분산 락으로 한 번에 하나만 돌게 한다. 이 조합으로 전용 큐 시스템 없이도 상당한 규모를 감당할 수 있지만, 엄격한 순서 보장이나 대용량 장기 보존이 필요하면 Kafka 같은 전용 시스템이 맞다.",
    code: `# ① 예약 (ZSet)
ZADD jobs:sched <run_at_ms> "job:99"

# ② 디스패처: 시각 된 것 → 실행 큐로 (Lua 로 원자화)
#    ZRANGEBYSCORE → ZREM → XADD jobs:ready

# ③ 워커
XREADGROUP GROUP workers w1 COUNT 10 BLOCK 5000 STREAMS jobs:ready >
XACK jobs:ready workers <id>

# ④ 실패 회수 + 데드레터
XAUTOCLAIM jobs:ready workers w2 60000 0 COUNT 10
XPENDING   jobs:ready workers - + 10     # delivery count 확인
#  임계 초과 → XADD jobs:dlq  후  XACK 원본

# ⑤ 중복 실행 방지: SET idem:<job> NX EX
# ⑥ 디스패처 다중화: SET lock:dispatcher NX PX`,
    lang: "redis-cli",
  },
];
