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
];
