// Kafka Ultra Master Deck (60 Comprehensive Engineering Cards)
const KAFKA_CARDS = [
  // ==========================================
  // 1 ~ 5: INTRO & BASICS
  // ==========================================
  {
    id: "KAFKA-001",
    num: "001",
    rarity: "UR",
    category: "INTRO",
    tags: ["INTRO", "OVERVIEW"],
    icon: "🧠",
    titleEn: "WHAT IS KAFKA",
    titleKo: "카프카와 실시간 이벤트 스트리밍",
    diagramNodes: [
      { name: "Event Source", type: "" },
      { name: "Kafka Cluster", type: "highlight" },
      { name: "Event Sink", type: "" }
    ],
    stats: { atk: "실시간 Capture", def: "영속적 Storage" },
    concept: "디지털 인체의 중앙 신경계(Central Nervous System) 역할. 실시간 수집, 영속 저장, 분산 처리를 수행하는 메시징 및 스트리밍 엔진.",
    quote: "「기업 전체의 데이터 흐름을 연결하는 실시간 중앙 신경망.」",
    detail: "Apache Kafka는 데이터베이스, 센서, 모바일, 클라우드 등의 이벤트 소스로부터 데이터 스트림을 실시간으로 캡처하여 분산 로그로 내구성 있게 저장하고 필요한 목적지에 라우팅합니다.",
    code: "// Kafka Producer 기본 생성 및 메시지 전송\nProperties props = new Properties();\nprops.put(\"bootstrap.servers\", \"localhost:9092\");\n\nProducer<String, String> producer = new KafkaProducer<>(props);\nproducer.send(new ProducerRecord<>(\"orders\", \"order-101\", \"PAYMENT_SUCCESS\"));"
  },
  {
    id: "KAFKA-002",
    num: "002",
    rarity: "N",
    category: "INTRO",
    tags: ["INTRO", "RECORD"],
    icon: "📦",
    titleEn: "ANATOMY OF AN EVENT",
    titleKo: "이벤트(Event) 레코드의 내부 구조",
    diagramNodes: [
      { name: "Key", type: "" },
      { name: "Value + TS", type: "highlight" },
      { name: "Headers", type: "" }
    ],
    stats: { atk: "비즈니스 사건", def: "불변 (Immutable)" },
    concept: "세상이나 시스템에서 일어난 '사건(Fact)'의 기록. Key, Value, Timestamp, Headers 메타데이터로 구성.",
    quote: "「이벤트는 과거에 실제로 발생한 변경 불가능한 사실 데이터이다.」",
    detail: "Kafka 레코드는 불변(Immutable) 상태로 보존됩니다. Key는 파티셔닝과 순서 보장에 사용되며, Value는 실제 페이로드, Headers는 추적용 컨텍스트(Tracing ID 등)를 담습니다.",
    code: "// ProducerRecord 내부 필드 구조\npublic class ProducerRecord<K, V> {\n    private final String topic;\n    private final Integer partition;\n    private final K key;\n    private final V value;\n    private final Long timestamp;\n    private final Headers headers;\n}"
  },
  {
    id: "KAFKA-003",
    num: "003",
    rarity: "R",
    category: "INTRO",
    tags: ["INTRO", "DECOUPLING"],
    icon: "🔌",
    titleEn: "PRODUCERS & CONSUMERS",
    titleKo: "프로듀서와 컨슈머의 완전한 디커플링",
    diagramNodes: [
      { name: "Producer", type: "highlight" },
      { name: "Topic Log", type: "" },
      { name: "Consumer", type: "highlight" }
    ],
    stats: { atk: "게시 (Publish)", def: "구독 (Subscribe)" },
    concept: "발행자(Producer)와 구독자(Consumer)가 완전히 격리되어 네트워크 상태나 가동 시간에 영향을 받지 않는 구조.",
    quote: "「서로의 존재를 몰라도 된다. 브로커 로그에 기록하고 폴링할 뿐.」",
    detail: "Producer는 Topic에 데이터를 쓰고, Consumer는 자신의 속도(Pull 방식)로 데이터를 읽습니다. Consumer의 다운이나 장애가 Producer의 쓰기 성능에 절대 영향을 주지 않습니다.",
    code: "// Consumer 폴링 루프\nKafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);\nconsumer.subscribe(Collections.singletonList(\"orders\"));\nwhile (true) {\n    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));\n    records.forEach(record -> processOrder(record.value()));\n}"
  },
  {
    id: "KAFKA-004",
    num: "004",
    rarity: "SR",
    category: "INTRO",
    tags: ["INTRO", "PARTITION"],
    icon: "🗂️",
    titleEn: "TOPICS & PARTITIONS",
    titleKo: "토픽과 파티션 분산 저장 알고리즘",
    diagramNodes: [
      { name: "Topic", type: "" },
      { name: "P0 | P1 | P2", type: "highlight" },
      { name: "Offset Appends", type: "" }
    ],
    stats: { atk: "파티션 수평확장", def: "파티션내 순서보장" },
    concept: "토픽은 파티션(Partition)으로 분할되어 여러 브로커에 분산되며, 파티션 내부에서는 오프셋 순서가 엄격히 보장.",
    quote: "「파티션 단위로 병렬 읽기/쓰기를 수행하여 한계 없는 훌륭한 수평 확장을 이룬다.」",
    detail: "이벤트는 파티션 끝에 시퀀셜하게 쓰여집니다(Append-Only). 파티션 수를 늘리면 컨슈머 그룹의 병렬 처리량이 비례하여 증가합니다.",
    code: "// DefaultPartitioner 알고리즘\nint partition = Utils.toPositive(Utils.murmur2(keyBytes)) % numPartitions;\n// 동일 Key -> 동일 Partition 지정으로 엄격한 순서 보장"
  },
  {
    id: "KAFKA-005",
    num: "005",
    rarity: "UR",
    category: "INTRO",
    tags: ["INTRO", "KRAFT"],
    icon: "🛡️",
    titleEn: "KRAFT CONSENSUS MODE",
    titleKo: "KRaft(Kafka Raft) 메타데이터 모드",
    diagramNodes: [
      { name: "Active Controller", type: "highlight" },
      { name: "@metadata Topic", type: "highlight" },
      { name: "Broker Quorum", type: "" }
    ],
    stats: { atk: "ZooKeeper 제거", def: "수백만 파티션 동기화" },
    concept: "ZooKeeper 외부 의존성을 제거하고 Kafka 내장 Raft 합의 프로토콜로 메타데이터를 관리하는 차세대 아키텍처.",
    quote: "「외부 클러스터 없이 카프카 자체 메타데이터 노드로 장애 복구를 극대화한다.」",
    detail: "KRaft는 메타데이터 변경사항을 internal `@metadata` 토픽에 기록합니다. 주키퍼 병목 없이 컨트롤러 장애 시 수 밀리초 만에 새로운 리더 컨트롤러를 선출합니다.",
    code: "# KRaft 클러스터 포맷 및 클러스터 실행\n$ bin/kafka-storage.sh random-cluster-id\n$ bin/kafka-storage.sh format -t $CLUSTER_ID -c config/kraft/server.properties\n$ bin/kafka-server-start.sh config/kraft/server.properties"
  },

  // ==========================================
  // 6 ~ 15: CORE - CLIENT INTERNALS & NETWORKING
  // ==========================================
  {
    id: "KAFKA-006",
    num: "006",
    rarity: "SR",
    category: "CORE",
    tags: ["CORE", "ACCUMULATOR"],
    icon: "⚡",
    titleEn: "PRODUCER RECORD ACCUMULATOR",
    titleKo: "프로듀서 레코드 어큐뮬레이터 & 메모리 뷰",
    diagramNodes: [
      { name: "BufferPool", type: "" },
      { name: "RecordBatch (64KB)", type: "highlight" },
      { name: "Sender Thread", type: "" }
    ],
    stats: { atk: "linger.ms 튜닝", def: "batch.size 메모리 팩" },
    concept: "메시지를 네트워크로 즉시 보내지 않고, 메모리 버퍼(RecordAccumulator)에 배치 단위로 모아서 전송하는 메커니즘.",
    quote: "「linger.ms를 약간 부여하면 IO 횟수가 급감하고 처리량이 폭발적으로 상승한다.」",
    detail: "메인 쓰레드는 `send()` 호출 시 RecordAccumulator의 `BufferPool`에 레코드를 채우고 즉시 리턴합니다. 별도의 Sender 쓰레드가 `batch.size` 또는 `linger.ms` 조건이 충족되면 네트워크 I/O를 일으킵니다.",
    code: "props.put(\"bootstrap.servers\", \"localhost:9092\");\nprops.put(\"buffer.memory\", \"33554432\"); // 32MB 버퍼 메모리\nprops.put(\"batch.size\", \"65536\");        // 64KB 배치 크기\nprops.put(\"linger.ms\", \"20\");           // 20ms 대기 후 배치 전송"
  },
  {
    id: "KAFKA-007",
    num: "007",
    rarity: "SR",
    category: "CORE",
    tags: ["CORE", "ACKS"],
    icon: "🎯",
    titleEn: "PRODUCER ACKS & IDEMPOTENCE",
    titleKo: "프로듀서 ACKS 및 멱등성 (Idempotence)",
    diagramNodes: [
      { name: "PID + SequenceNo", type: "highlight" },
      { name: "Broker Deduplication", type: "highlight" },
      { name: "ACK Response", type: "" }
    ],
    stats: { atk: "acks=all 유실방지", def: "Sequence 중복제거" },
    concept: "ACKS(0, 1, all)와 멱등성 프로듀서(enable.idempotence)를 통한 네트워크 재전송 시 중복 저장 방지.",
    quote: "「ProducerId와 Sequence Number로 재전송되어도 브로커에서 중복을 완벽히 걸러낸다.」",
    detail: "acks=all 및 enable.idempotence=true를 설정하면 브로커가 PID(Producer ID)와 시퀀스 번호를 추적하여 중복 레코드를 자동으로 거부하고 정확히 한 번 저장을 보장합니다.",
    code: "props.put(\"acks\", \"all\");\nprops.put(\"enable.idempotence\", \"true\");\nprops.put(\"max.in.flight.requests.per.connection\", \"5\"); // 멱등성 유지 가능한 최대 개수"
  },
  {
    id: "KAFKA-008",
    num: "008",
    rarity: "UR",
    category: "CORE",
    tags: ["CORE", "REBALANCE"],
    icon: "🤝",
    titleEn: "COOPERATIVE REBALANCE PROTOCOL",
    titleKo: "협력적 리밸런싱 (Cooperative Sticky)",
    diagramNodes: [
      { name: "Eager (Stop-World)", type: "" },
      { name: "VS", type: "" },
      { name: "Cooperative (No Stop)", type: "highlight" }
    ],
    stats: { atk: "점진적 파티션 이동", def: "STW (Stop-The-World) 방지" },
    concept: "기존 Eager 리밸런싱의 모든 파티션 해제(Stop-the-World) 문제를 해결한 점진적(Incremental) 협력적 리밸런싱.",
    quote: "「이동이 필요한 파티션만 새로 할당하고 나머지 파티션의 소비는 멈추지 않는다.」",
    detail: "CooperativeStickyAssignor는 리밸런스 발생 시 영향을 받는 특정 파티션만 2단계(Two-Round)에 걸쳐 재할당합니다. 전체 컨슈머 멈춤 현상이 사라집니다.",
    code: "props.put(\"partition.assignment.strategy\", \n    \"org.apache.kafka.clients.consumer.CooperativeStickyAssignor\");"
  },
  {
    id: "KAFKA-009",
    num: "009",
    rarity: "R",
    category: "CORE",
    tags: ["CORE", "FETCHER"],
    icon: "📥",
    titleEn: "CONSUMER FETCHER & SESSIONS",
    titleKo: "컨슈머 페처 & 세션 타임아웃 튜닝",
    diagramNodes: [
      { name: "poll() Thread", type: "" },
      { name: "Heartbeat Thread", type: "highlight" },
      { name: "Group Coordinator", type: "" }
    ],
    stats: { atk: "heartbeat.interval.ms", def: "max.poll.interval.ms" },
    concept: "하트비트 전송과 실제 poll() 로직의 쓰레드 분리 구조 및 세션 타임아웃 예방 튜닝.",
    quote: "「긴 데이터 처리 로직 시 max.poll.interval.ms를 늘려 불필요한 리밸런싱을 막아라.」",
    detail: "하트비트는 별도 쓰레드에서 주기적으로 전송되지만, `poll()` 호출 주기가 `max.poll.interval.ms`를 초과하면 컨슈머가 죽은 것으로 간주되어 리밸런싱이 발생합니다.",
    code: "props.put(\"session.timeout.ms\", \"45000\");      // 브로커 세션 판정시간\nprops.put(\"heartbeat.interval.ms\", \"15000\");    // 하트비트 전송 주기\nprops.put(\"max.poll.interval.ms\", \"300000\");    // poll 호출 최대 처리시간(5분)\nprops.put(\"max.poll.records\", \"500\");           // 1회 poll당 수신 레코드 수"
  },
  {
    id: "KAFKA-010",
    num: "010",
    rarity: "N",
    category: "CORE",
    tags: ["CORE", "COMMIT"],
    icon: "📌",
    titleEn: "MANUAL OFFSET COMMIT STRATEGY",
    titleKo: "명시적 수동 오프셋 커밋 기법",
    diagramNodes: [
      { name: "Process Record", type: "" },
      { name: "commitAsync()", type: "highlight" },
      { name: "commitSync() on Close", type: "" }
    ],
    stats: { atk: "비동기 높은 속도", def: "동기 정확성 확보" },
    concept: "자동 커밋의 유실/중복 위험을 최소화하기 위해 비동기 커밋(`commitAsync`)과 종료 시 동기 커밋(`commitSync`)을 조합하는 패턴.",
    quote: "「평소에는 commitAsync()로 속도를 올리고, 예외 상황에 commitSync()로 동기화한다.」",
    detail: "DB 저장 등 비즈니스 작업 완료 후 오프셋을 커밋해야 'At-Least-Once' 보장이 이뤄집니다. 닫기 직전에 처리 안 된 오프셋을 동기 커밋하여 데이터 유실을 차단합니다.",
    code: "try {\n    while (running) {\n        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));\n        for (ConsumerRecord<String, String> r : records) process(r);\n        consumer.commitAsync(); // 일반 비동기 커밋\n    }\n} finally {\n    consumer.commitSync(); // 종료 전 최종 동기 커밋\n    consumer.close();\n}"
  },
  {
    id: "KAFKA-011",
    num: "011",
    rarity: "R",
    category: "CORE",
    tags: ["CORE", "PARTITIONER"],
    icon: "🔑",
    titleEn: "CUSTOM PARTITIONER DESIGN",
    titleKo: "커스텀 파티셔너 및 쏠림(Hotspot) 해결",
    diagramNodes: [
      { name: "Key: Enterprise-A", type: "highlight" },
      { name: "Custom Partitioner", type: "highlight" },
      { name: "Dedicated P0", type: "" }
    ],
    stats: { atk: "부하 쏠림 방지", def: "특수 Key 우회 분배" },
    concept: "특정 대용량 데이터 키가 특정 파티션으로 쏠려 CPU/디스크 병목을 일으키는 핫스팟 현상을 분산시키는 전략.",
    quote: "「특정 대형 고객사의 키 부하를 분산시키거나 전용 파티션으로 분리 격리한다.」",
    detail: "MurmurHash2 기반 기본 파티셔너를 대치하여, 키에 접미사(Salt)를 붙이거나 커스텀 알고리즘을 적용해 특정 파티션에 부하가 집중되는 것을 원천 방지합니다.",
    code: "public class AntiHotspotPartitioner implements Partitioner {\n    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {\n        int numPartitions = cluster.partitionsForTopic(topic).size();\n        if (\"BIG_VENDOR\".equals(key)) {\n            return ThreadLocalRandom.current().nextInt(0, 2); // 0,1번 파티션으로 분산\n        }\n        return (Utils.toPositive(Utils.murmur2(keyBytes)) % (numPartitions - 2)) + 2;\n    }\n}"
  },
  {
    id: "KAFKA-012",
    num: "012",
    rarity: "SR",
    category: "CORE",
    tags: ["CORE", "MONITORING"],
    icon: "📈",
    titleEn: "CONSUMER LAG & BURROW MONITORING",
    titleKo: "컨슈머 랙 (Consumer Lag) 실시간 감지",
    diagramNodes: [
      { name: "Log End Offset (LEO)", type: "" },
      { name: "Consumer Lag Delta", type: "highlight" },
      { name: "Current Offset", type: "" }
    ],
    stats: { atk: "처리 지연 탐지", def: "Burrow / Exporter 경보" },
    concept: "프로듀서가 적재한 최신 오프셋과 컨슈머가 읽은 오프셋 사이의 차이인 Consumer Lag을 통한 지연 추적.",
    quote: "「Lag 수치 상승은 애플리케이션 장애나 컨슈머 부족의 가장 명확한 경고 신호이다.」",
    detail: "컨슈머 랙 모니터링에는 Prometheus JMX Exporter나 LinkedIn Burrow가 널리 사용됩니다. 단순 임계치가 아닌 Lag의 증가 추세(Trend)를 감지해야 오탐을 줄입니다.",
    code: "# Kafka JMX Exporter Metric Example\n# kafka.consumer:type=consumer-fetch-manager-metrics,client-id=*,topic=*\n# metric_name: records-lag-max\n# kafka_consumer_fetch_manager_records_lag_max > 10000 -> Alert Notification"
  },
  {
    id: "KAFKA-013",
    num: "013",
    rarity: "SR",
    category: "CORE",
    tags: ["CORE", "PROTOCOL"],
    icon: "📡",
    titleEn: "BYTE-LEVEL NETWORK PROTOCOL",
    titleKo: "바이트 레벨 카프카 바이너리 프로토콜",
    diagramNodes: [
      { name: "Size (Int32)", type: "" },
      { name: "ApiKey + ApiVersion", type: "highlight" },
      { name: "CorrelationId + Payload", type: "highlight" }
    ],
    stats: { atk: "TCP 기반 이진 프로토콜", def: "CorrelationId 비동기 묵음" },
    concept: "카프카가 브로커와 클라이언트 간 통신을 위해 직접 정의한 직렬화 이진(Binary) TCP 프로토콜.",
    quote: "「HTTP/REST 오버헤드 없이 순수 이진 바이트 패킷으로 최고의 전송 속도를 낸다.」",
    detail: "모든 프레임은 Big-Endian 바이트 스트림입니다. `ApiKey`(Produce=0, Fetch=1)와 `CorrelationId`(요청-응답 매칭)를 사용하여 단일 TCP 소켓에서 다중 요청을 비동기 멀티플렉싱 처리합니다.",
    code: "// Kafka Binary Protocol Header Structure\n// Request Header v2:\n// [Size: Int32] [api_key: Int16] [api_version: Int16] [correlation_id: Int32] [client_id: NullableString]"
  },
  {
    id: "KAFKA-014",
    num: "014",
    rarity: "R",
    category: "CORE",
    tags: ["CORE", "COMPRESSION"],
    icon: "🗜️",
    titleEn: "BATCH COMPRESSION ALGORITHMS",
    titleKo: "배치 압축 알고리즘 (Snappy vs Zstd vs gzip vs lz4)",
    diagramNodes: [
      { name: "Uncompressed Batch", type: "" },
      { name: "zstd / snappy Codec", type: "highlight" },
      { name: "Compressed Packet", type: "" }
    ],
    stats: { atk: "Snappy: 초고속 CPU", def: "Zstd: 최고 압축률" },
    concept: "네트워크 대역폭 축소 및 디스크 공간 절약을 위해 Producer/Broker 레벨에서 적용하는 배치 압축 기술.",
    quote: "「Zstd는 뛰어난 압축률을, Snappy는 압도적으로 적은 CPU 사용량을 제공한다.」",
    detail: "개별 레코드가 아닌 RecordBatch 전체를 묶어서 압축하므로 텍스트/JSON 중복 데이터에 대해 엄청난 압축 효과를 발휘합니다. 브로커 재압축 방지를 위해 클라이언트와 코덱을 통일하는 것이 좋습니다.",
    code: "props.put(\"compression.type\", \"snappy\"); // 일반 실시간 서비스 추천\n// props.put(\"compression.type\", \"zstd\");   // 로그/대용량 분석 추천"
  },
  {
    id: "KAFKA-015",
    num: "015",
    rarity: "R",
    category: "CORE",
    tags: ["CORE", "QUOTAS"],
    icon: "🛑",
    titleEn: "CLIENT QUOTAS & MULTI-TENANCY",
    titleKo: "클라이언트 쿼터 (Quotas) 및 멀티테넌시 대역폭 제어",
    diagramNodes: [
      { name: "Client A (Quota 10MB/s)", type: "highlight" },
      { name: "Broker Throttling Engine", type: "highlight" },
      { name: "Delayed Response", type: "" }
    ],
    stats: { atk: "producer_byte_rate", def: "consumer_byte_rate" },
    concept: "특정 불량 클라이언트가 전체 네트워크 대역폭이나 브로커 CPU를 독점하지 못하도록 전송 속도를 제한(Throttling).",
    quote: "「쿼터 초과 시 응답을 슬립 지연(Delay Response)시켜 클라이언트 쓰기 속도를 강제로 맞춘다.」",
    detail: "사용자(User)나 Client-ID 기반으로 `producer_byte_rate` 및 `consumer_byte_rate` 쿼터를 설정합니다. 브로커는 커넥션을 단절하지 않고 지연 응답을 리턴해 클라이언트를 튜닝합니다.",
    code: "# 특정 client-id에 대해 5MB/sec 바이트 쿼터 동적 설정 CLI\n$ bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter \\\n  --add-config 'producer_byte_rate=5242880,consumer_byte_rate=5242880' \\\n  --entity-type clients --entity-name order-service-client"
  },

  // ==========================================
  // 16 ~ 28: ARCH - CLUSTER INTERNALS & STORAGE ENGINE
  // ==========================================
  {
    id: "KAFKA-016",
    num: "016",
    rarity: "UR",
    category: "ARCH",
    tags: ["ARCH", "SEGMENT"],
    icon: "📁",
    titleEn: "LOG SEGMENT FILE ANATOMY",
    titleKo: "로그 세그먼트 파일 (.log, .index, .timeindex)",
    diagramNodes: [
      { name: "000.log (Data)", type: "highlight" },
      { name: "000.index (Offset)", type: "" },
      { name: "000.timeindex (Time)", type: "" }
    ],
    stats: { atk: "이진 탐색 (Binary Search)", def: "Sparse Index 효율" },
    concept: "파티션 디렉토리 내부를 구성하는 실제 데이터 파일(.log)과 빠른 오프셋/시간 검색을 위한 희소 인덱스(.index).",
    quote: "「모든 데이터를 인덱싱하지 않고 일정 바이트 간격(Sparse Index)으로 메모리 효율을 극대화한다.」",
    detail: "1GB 단위로 세그먼트 파일이 롤링(Rolling)됩니다. `.index` 파일은 상대 오프셋과 `.log` 파일의 물리적 포지션(Byte Offset)을 매핑하여 O(log N) 속도로 무시무시하게 빠른 조회를 제공합니다.",
    code: "# 파티션 로그 파일 구조 및 인덱스 덤프 확인 CLI\n$ bin/kafka-run-class.sh kafka.tools.DumpLogSegments \\\n  --files /var/lib/kafka/data/orders-0/00000000000000000000.index \\\n  --verify-index-only"
  },
  {
    id: "KAFKA-017",
    num: "017",
    rarity: "SR",
    category: "ARCH",
    tags: ["ARCH", "HW-LEO"],
    icon: "📐",
    titleEn: "HIGH WATERMARK & LEO",
    titleKo: "High Watermark (HW)와 Log End Offset (LEO)",
    diagramNodes: [
      { name: "LEO (Producer Write)", type: "" },
      { name: "HW (ISR Replicated)", type: "highlight" },
      { name: "Consumer Visible", type: "" }
    ],
    stats: { atk: "LEO: 최신 작성 오프셋", def: "HW: 복제 완료 안전선" },
    concept: "리더에 쓰여진 최신 오프셋(LEO)과 ISR 전체에 복제 완료가 확인되어 컨슈머가 읽을 수 있는 안전선(HW).",
    quote: "「컨슈머는 High Watermark 이하의 전송 검증이 완료된 레코드만 읽을 수 있다.」",
    detail: "모든 ISR 팔로워 노드가 데이터 복제를 완료해야 High Watermark(HW)가 상승합니다. 이를 통해 리더 노드가 갑작스럽게 다운되더라도 컨슈머가 읽은 데이터가 사라지지 않도록 보호합니다.",
    code: "// 브로커 내부 파티션 로그 상태\n// Log End Offset (LEO) = 100\n// High Watermark (HW) = 95\n// -> Consumer는 95번 오프셋까지만 수신 가능 (96~99는 ISR 복제 진행 중)"
  },
  {
    id: "KAFKA-018",
    num: "018",
    rarity: "UR",
    category: "ARCH",
    tags: ["ARCH", "REPLICATION"],
    icon: "🔄",
    titleEn: "REPLICATION & ISR MECHANICS",
    titleKo: "In-Sync Replicas (ISR) 복제 메커니즘",
    diagramNodes: [
      { name: "Leader Broker", type: "highlight" },
      { name: "ReplicaFetcherThread", type: "" },
      { name: "ISR Member List", type: "highlight" }
    ],
    stats: { atk: "replica.lag.time.max.ms", def: "min.insync.replicas" },
    concept: "리더 브로커의 변경 로그를 지속적으로 복제하며 동기화 상태를 유지하는 팔로워들의 모임(ISR).",
    quote: "「ISR에서 탈퇴한 팔로워는 복제를 캐치업(Catch-up)할 때까지 리더 후보에서 제외된다.」",
    detail: "팔로워는 `ReplicaFetcherThread`를 통해 리더로부터 Fetch 요청을 보냅니다. `replica.lag.time.max.ms` 이내에 Fetch 요청을 보내지 못하는 지연 팔로워는 ISR 그룹에서 퇴출됩니다.",
    code: "# 토픽 설정 확인 CLI (ISR 상태 점검)\n$ bin/kafka-topics.sh --describe --topic orders --bootstrap-server localhost:9092\n# Output: Topic: orders Partition: 0 Leader: 1 Replicas: 1,2,3 Isr: 1,2"
  },
  {
    id: "KAFKA-019",
    num: "019",
    rarity: "UR",
    category: "ARCH",
    tags: ["ARCH", "CONTROLLER"],
    icon: "👑",
    titleEn: "KRAFT CONTROLLER STATE MACHINE",
    titleKo: "KRaft 쿼럼 컨트롤러 상태 머신",
    diagramNodes: [
      { name: "Active Controller", type: "highlight" },
      { name: "Raft Quorum Votes", type: "" },
      { name: "Standby Controller", type: "" }
    ],
    stats: { atk: "Raft Consensus Protocol", def: "밀리초 단위 컨트롤러 failover" },
    concept: "KRaft 쿼럼 노드들 사이에서 Raft 투표 알고리즘을 통해 Active Controller를 선출하고 클러스터 조율.",
    quote: "「외부 주키퍼 세션 타임아웃 대기 없이 즉시 메타데이터 리더를 교체한다.」",
    detail: "KRaft 쿼럼 노드들은 리더 에포크(Leader Epoch)를 부여받아 메타데이터 변경 로그를 기록합니다. Active Controller 장애 발생 시 즉각적인 쿼럼 투표로 장애 조치(Failover)됩니다.",
    code: "process.roles=broker,controller\nnode.id=1\ncontroller.quorum.voters=1@localhost:9093,2@localhost:9094,3@localhost:9095"
  },
  {
    id: "KAFKA-020",
    num: "020",
    rarity: "SR",
    category: "ARCH",
    tags: ["ARCH", "COMPACTION"],
    icon: "🧹",
    titleEn: "LOG COMPACTION & TOMBSTONES",
    titleKo: "로그 압축 기술과 톰스톤(Tombstone) 마커",
    diagramNodes: [
      { name: "Key A (v1)", type: "" },
      { name: "Key A (null/Tombstone)", type: "highlight" },
      { name: "Cleaner Thread", type: "" }
    ],
    stats: { atk: "최신 Key 보존", def: "delete.retention.ms" },
    concept: "Key 기반 최신 값만 남기는 로그 압축 과정에서 Key 삭제 신호로 쓰이는 톰스톤(Value=null) 레코드.",
    quote: "「Value가 null인 톰스톤 레코드가 압축 스레드에 의해 백그라운드 삭제를 수행한다.」",
    detail: "Cleaner 스레드가 백그라운드에서 스키마 테이블 형태의 디두플리케이션을 수행합니다. 톰스톤 레코드는 `delete.retention.ms` 동안 유지된 후 인덱스와 데이터 파일에서 완전 제거됩니다.",
    code: "cleanup.policy=compact\ndelete.retention.ms=86400000 // 톰스톤 유효기간 (24시간)\nsegment.ms=604800000"
  },
  {
    id: "KAFKA-021",
    num: "021",
    rarity: "SR",
    category: "ARCH",
    tags: ["ARCH", "ZERO-COPY"],
    icon: "🚀",
    titleEn: "ZERO-COPY & PAGECACHE",
    titleKo: "Zero-Copy 데이터 전송과 PageCache",
    diagramNodes: [
      { name: "Disk Segment", type: "" },
      { name: "OS PageCache", type: "highlight" },
      { name: "Network Card (NIC)", type: "highlight" }
    ],
    stats: { atk: "User-space Copy 제로", def: "sendfile System Call" },
    concept: "OS Kernel의 PageCache에서 NIC(네트워크 카드)로 직접 버퍼를 쏘아 보내는 극강의 Zero-Copy I/O.",
    quote: "「JVM 메모리로 데이터를 사본 복사하지 않고 OS 커널 레벨에서 즉시 네트워크로 전송한다.」",
    detail: "일반적인 I/O는 Disk ➔ Kernel PageCache ➔ User Buffer ➔ Socket Buffer ➔ NIC 4단계를 거치지만, Kafka는 `sendfile()`로 Kernel PageCache ➔ NIC 2단계만 거쳐 엄청난 throughput을 만들어냅니다.",
    code: "// FileChannel.transferTo() 내부 고성능 C/C++ sendfile 시스템 콜 연동\nfileChannel.transferTo(position, count, socketChannel);"
  },
  {
    id: "KAFKA-022",
    num: "022",
    rarity: "R",
    category: "ARCH",
    tags: ["ARCH", "TIERED"],
    icon: "☁️",
    titleEn: "TIERED STORAGE ARCHITECTURE",
    titleKo: "티어드 스토리지 (Tiered Storage) 분리",
    diagramNodes: [
      { name: "Hot Layer (Local NVMe)", type: "highlight" },
      { name: "Remote Log Manager", type: "" },
      { name: "Cold Layer (S3/GCS)", type: "highlight" }
    ],
    stats: { atk: "컴퓨팅-스토리지 분리", def: "저렴한 클라우드 오브젝트" },
    concept: "실시간 처리용 핫 데이터는 로컬 디스크에, 장기 보관용 쿨 데이터는 S3 등 저렴한 오브젝트 스토리이에 분리 저장.",
    quote: "「스토리지 용량 부족 때문에 브로커 스케일아웃을 하지 않아도 된다.」",
    detail: "RemoteLogManager가 닫힌 세그먼트 파일(Cold Data)을 백그라운드로 S3에 업로드합니다. 브로커 로컬 디스크는 최신 핫 데이터만 보관하므로 비용을 획기적으로 낮춥니다.",
    code: "remote.log.storage.system.enable=true\nremote.log.manager.class.name=org.apache.kafka.server.log.remote.storage.RemoteLogManager\nremote.log.metadata.manager.class.name=org.apache.kafka.server.log.remote.storage.TopicBasedRemoteLogMetadataManager"
  },
  {
    id: "KAFKA-023",
    num: "023",
    rarity: "R",
    category: "ARCH",
    tags: ["ARCH", "PREFERRED-LEADER"],
    icon: "⚖️",
    titleEn: "PREFERRED LEADER ELECTION",
    titleKo: "선호 리더 선출 및 브로커 리밸런싱",
    diagramNodes: [
      { name: "Preferred Leader (P0)", type: "highlight" },
      { name: "Auto Rebalance", type: "" },
      { name: "Imbalance Ratio", type: "" }
    ],
    stats: { atk: "auto.leader.rebalance", def: "부하 편중 자동 해소" },
    concept: "특정 브로커 재시작 후 리더가 한쪽으로 쏠리는 현상을 방지하기 위해 원래 선호 리더(Preferred Leader)로 자동 복귀.",
    quote: "「브로커 장애 복구 후 파티션 리더 자리를 원래 균등했던 상태로 자동 재배치한다.」",
    detail: "파티션 할당 목록의 첫 번째 브로커가 Preferred Leader입니다. `auto.leader.rebalance.enable=true` 설정 시 주기적으로 쏠림 비율을 체크하여 자동으로 리더를 원래 자리로 돌아오게 합니다.",
    code: "auto.leader.rebalance.enable=true\nleader.imbalance.per.broker.percentage=10\nleader.imbalance.check.interval.seconds=300"
  },
  {
    id: "KAFKA-024",
    num: "024",
    rarity: "SR",
    category: "ARCH",
    tags: ["ARCH", "TUNING"],
    icon: "⚙️",
    titleEn: "OS & HARDWARE TUNING",
    titleKo: "운영체제(OS) & 커널 네트워크 튜닝",
    diagramNodes: [
      { name: "vm.dirty_background_ratio", type: "" },
      { name: "num.io.threads", type: "highlight" },
      { name: "TCP Buffer Size", type: "" }
    ],
    stats: { atk: "PageCache Flush 지연시간", def: "network/io thread 분리" },
    concept: "Linux 커널의 메모리 플러시 비율, 파일 디스크립터 한계, 네트워크 쓰레드 개수를 최적화하는 하드웨어 튜닝.",
    quote: "「OS 수준에서 디스크 디티 백그라운드 플러시가 튀어 I/O 스파이크가 발생하는 것을 방지하라.」",
    detail: "vm.dirty_background_ratio를 낮게 유지(5%)하여 디스크 쓰기를 자주 분산 수행시키고, `num.network.threads` 및 `num.io.threads`를 CPU 코어 수에 맞춰 튜닝합니다.",
    code: "# Linux sysctl.conf 커널 튜닝 예시\nvm.dirty_background_ratio = 5\nvm.dirty_ratio = 10\nvm.swappiness = 1\nfs.file-max = 1000000"
  },
  {
    id: "KAFKA-025",
    num: "025",
    rarity: "SR",
    category: "ARCH",
    tags: ["ARCH", "JVM"],
    icon: "☕",
    titleEn: "JVM MEMORY MANAGEMENT & ZGC",
    titleKo: "JVM 메모리 관리 및 ZGC / G1GC 튜닝",
    diagramNodes: [
      { name: "JVM Heap (32GB Max)", type: "highlight" },
      { name: "ZGC (Low Pause)", type: "highlight" },
      { name: "Off-Heap PageCache", type: "" }
    ],
    stats: { atk: "STW GC 멈춤 최적화", def: "ZGC / Shenandoah GC" },
    concept: "브로커 JVM 힙 크기를 과도하게 잡지 않고(PageCache 양보) ZGC를 도입하여 1ms 이하 STW를 달성하는 전략.",
    quote: "「카프카 브로커에는 32GB 이상의 힙보다 OS PageCache에 RAM을 양보하는 것이 훨씬 유리하다.」",
    detail: "카프카 브로커는 주요 힙 메모리 사용량이 적습니다(OS PageCache에 의존). JDK 17+ 환경에서 ZGC(`-XX:+UseZGC`)를 활성화하면 GC Pause 시간을 1ms 미만으로 일관되게 제어할 수 있습니다.",
    code: "# JVM Options for Kafka Broker\nKAFKA_JVM_PERFORMANCE_OPTS=\"-XX:+UseZGC -XX:+UnlockExperimentalVMOptions -Xms16g -Xmx16g -XX:MaxGCPauseMillis=20\""
  },
  {
    id: "KAFKA-026",
    num: "026",
    rarity: "R",
    category: "ARCH",
    tags: ["ARCH", "THREADING"],
    icon: "🧵",
    titleEn: "NETWORK & IO THREAD POOL",
    titleKo: "네트워크 쓰레드 및 I/O 쓰레드 풀 아키텍처",
    diagramNodes: [
      { name: "Acceptor Thread", type: "" },
      { name: "num.network.threads", type: "highlight" },
      { name: "num.io.threads", type: "highlight" }
    ],
    stats: { atk: "Acceptor/Processor 분리", def: "RequestHandlerPool Queue" },
    concept: "클라이언트 소켓 연결 수신, RequestQueue 적재, 실제 디스크/복제 처리를 담당하는 분리된 쓰레드 모델.",
    quote: "「네트워크 수신 쓰레드와 디스크/로그 처리 쓰레드를 명확히 분리해 병목을 차단한다.」",
    detail: "Acceptor가 연결을 받아 Selector/Network Thread(num.network.threads)에 넘기고, 수신된 패킷은 RequestQueue에 들어간 뒤 RequestHandlerThread(num.io.threads)가 처리합니다.",
    code: "num.network.threads=8  # CPU 코어 수에 비례\nnum.io.threads=16      # 코어 수의 2배 권장 (디스크 I/O 대기 감안)"
  },
  {
    id: "KAFKA-027",
    num: "027",
    rarity: "N",
    category: "ARCH",
    tags: ["ARCH", "CLEANER"],
    icon: "🧹",
    titleEn: "LOG CLEANER THREAD & BUFFERS",
    titleKo: "로그 클리너 쓰레드 메모리 튜닝",
    diagramNodes: [
      { name: "Dirty Log Segment", type: "" },
      { name: "Cleaner Dedupe Buffer", type: "highlight" },
      { name: "Cleaned Log Segment", type: "" }
    ],
    stats: { atk: "log.cleaner.threads", def: "log.cleaner.dedupe.buffer.size" },
    concept: "Log Compaction 작업 시 메모리 해시 테이블을 생성하여 구버전 키 레코드를 지우는 백그라운드 쓰레드.",
    quote: "「클리너 버퍼 크기를 넉넉히 주어야 오프셋 스캔 횟수가 줄고 압축 속도가 빨라진다.」",
    detail: "`log.cleaner.dedupe.buffer.size`는 압축 작업용 오프셋 해시맵 메모리입니다. 컴팩션 토픽 양이 많을 경우 이 버퍼 크기와 `log.cleaner.threads`를 늘려 클리너 지연을 방지해야 합니다.",
    code: "log.cleaner.threads=2\nlog.cleaner.dedupe.buffer.size=134217728 # 128MB 버퍼"
  },
  {
    id: "KAFKA-028",
    num: "028",
    rarity: "R",
    category: "ARCH",
    tags: ["ARCH", "RACK"],
    icon: "🏢",
    titleEn: "RACK AWARENESS & FAULT DOMAINS",
    titleKo: "렉 인지(Rack Awareness) 및 가용 영역(AZ) 고가용성",
    diagramNodes: [
      { name: "AZ-a (Broker 1)", type: "highlight" },
      { name: "AZ-b (Broker 2)", type: "highlight" },
      { name: "AZ-c (Broker 3)", type: "highlight" }
    ],
    stats: { atk: "broker.rack=az1", def: "교차 가용 영역(AZ) 복제" },
    concept: "동일한 파티션의 복제본(Replicas)들이 동일한 렉이나 가용 영역(AZ)에 쏠리지 않도록 물리적으로 분산 배치.",
    quote: "「데이터센터 한 렉 전체 전원이 나가도 다른 가용 영역에서 손실 없이 가동을 이어간다.」",
    detail: "`broker.rack` 옵션을 명시하면 Kafka 파티션 할당 알고리즘이 복제본을 서로 다른 물리 Rack/AZ에 우선 배치합니다. 컨슈머 역시 가장 가까운 Rack의 파티션(Fetch from Follower)에서 데이터를 읽을 수 있습니다.",
    code: "broker.rack=ap-northeast-2a\n# Client-side Nearest Rack Fetching\nclient.rack=ap-northeast-2a"
  },

  // ==========================================
  // 29 ~ 35: EOS & TRANSACTIONS
  // ==========================================
  {
    id: "KAFKA-029",
    num: "029",
    rarity: "UR",
    category: "EOS",
    tags: ["EOS", "OVERVIEW"],
    icon: "💎",
    titleEn: "EXACTLY-ONCE SEMANTICS (EOS v2)",
    titleKo: "단 한 번 처리 (EOS v2) 아키텍처",
    diagramNodes: [
      { name: "Read Source", type: "" },
      { name: "Transaction Execution", type: "highlight" },
      { name: "Write Sink (EOS)", type: "highlight" }
    ],
    stats: { atk: "Duplicate-Free", def: "Loss-Free Financial Grade" },
    concept: "네트워크 끊김, 브로커 다운, 애플리케이션 재시작 시에도 메시지가 중복되거나 유실되지 않는 무결성 보장.",
    quote: "「금융 서비스와 결제 데이터 처리에 필수적인 End-to-End Exactly-Once.」",
    detail: "Kafka 2.5+의 EOS v2는 트랜잭션 오버헤드를 대폭 줄였습니다. Idempotent Producer, Transactional Coordinator, Read-Committed Consumer가 결합하여 작동합니다.",
    code: "props.put(\"processing.guarantee\", \"exactly_once_v2\"); // Kafka Streams 전용 EOS 설정"
  },
  {
    id: "KAFKA-030",
    num: "030",
    rarity: "SR",
    category: "EOS",
    tags: ["EOS", "COORDINATOR"],
    icon: "🏛️",
    titleEn: "TRANSACTION COORDINATOR",
    titleKo: "트랜잭션 코디네이터 & `__transaction_state`",
    diagramNodes: [
      { name: "Transactional Producer", type: "" },
      { name: "Tx Coordinator", type: "highlight" },
      { name: "__transaction_state", type: "highlight" }
    ],
    stats: { atk: "2-Phase Commit 관리", def: "TransactionalId 인덱싱" },
    concept: "클라이언트의 트랜잭션 상태(Begin, Prepare, Commit, Abort)를 추적 관리하는 내부 전용 코디네이터 노드.",
    quote: "「`__transaction_state` 토픽에 트랜잭션 로그를 내구성 있게 기록하여 롤백을 제어한다.」",
    detail: "프로듀서가 `transactional.id`를 제공하면 Transaction Coordinator가 할당되어 2단계 커밋(Two-Phase Commit)의 원자성을 보장합니다.",
    code: "props.put(\"transactional.id\", \"payment-tx-producer-01\");\nproducer.initTransactions();"
  },
  {
    id: "KAFKA-031",
    num: "031",
    rarity: "UR",
    category: "EOS",
    tags: ["EOS", "2PC"],
    icon: "🔖",
    titleEn: "TWO-PHASE COMMIT & MARKERS",
    titleKo: "2단계 커밋(2PC) 및 트랜잭션 마커",
    diagramNodes: [
      { name: "Prepare Commit", type: "" },
      { name: "Control Marker Write", type: "highlight" },
      { name: "Transaction Complete", type: "" }
    ],
    stats: { atk: "COMMIT / ABORT 마커", def: "원자적 오프셋 커밋" },
    concept: "트랜잭션 성공/실패 시 데이터 파티션에 특별한 Control Record(Commit/Abort Marker)를 기록하는 메커니즘.",
    quote: "「파티션 로그 끝에 커밋 마커가 추가되어야만 컨슈머에게 비로소 노출된다.」",
    detail: "1단계: `__transaction_state`에 PREPARE_COMMIT 기록. 2단계: 관련 데이터 파티션에 COMMIT Control Marker 기록 후 최종 COMPLETE 처리.",
    code: "try {\n    producer.beginTransaction();\n    producer.send(record1);\n    producer.sendOffsetsToTransaction(offsets, consumerGroupId); // 오프셋도 트랜잭션에 포함\n    producer.commitTransaction();\n} catch (Exception e) {\n    producer.abortTransaction();\n}"
  },
  {
    id: "KAFKA-032",
    num: "032",
    rarity: "SR",
    category: "EOS",
    tags: ["EOS", "READ-COMMITTED"],
    icon: "👁️",
    titleEn: "READ-COMMITTED ISOLATION LEVEL",
    titleKo: "격리 수준 `read_committed`과 마커 필터링",
    diagramNodes: [
      { name: "Uncommitted Record", type: "" },
      { name: "Commit Marker", type: "highlight" },
      { name: "Consumer Visible Window", type: "" }
    ],
    stats: { atk: "isolation.level=read_committed", def: "Aborted Record 자동 필터링" },
    concept: "컨슈머가 아직 커밋되지 않은 트랜잭션 메시지나 취소(Aborted)된 메시지를 무시하고 커밋된 메시지만 읽도록 제어.",
    quote: "「Aborted 트랜잭션 데이터는 컨슈머 내부 페처에서 자동으로 버려진다.」",
    detail: "기본값 `read_uncommitted` 상태에서는 마커 유무와 상관없이 다 읽지만, `read_committed`로 설정하면 Last Stable Offset(LSO)까지만 소비하여 완벽한 격리성을 제공합니다.",
    code: "props.put(\"isolation.level\", \"read_committed\");"
  },
  {
    id: "KAFKA-033",
    num: "033",
    rarity: "R",
    category: "EOS",
    tags: ["EOS", "ZOMBIE"],
    icon: "🧟",
    titleEn: "ZOMBIE FENCING & EPOCH NUMBERS",
    titleKo: "좀비 프로세스 차단 (Zombie Fencing)",
    diagramNodes: [
      { name: "Old Producer (Epoch 1)", type: "" },
      { name: "Tx Coordinator Fencing", type: "highlight" },
      { name: "New Producer (Epoch 2)", type: "highlight" }
    ],
    stats: { atk: "Producer Epoch 차단", def: "ProducerFencedException" },
    concept: "네트워크 일시 지연으로 남아있는 구버전 프로듀서(좀비)가 뒤늦게 데이터를 써서 트랜잭션을 오염시키는 것을 차단.",
    quote: "「새로운 프로듀서가 높은 에포크 번호를 받으면 구버전 좀비 프로듀서는 즉시 차단 거부된다.」",
    detail: "동일한 `transactional.id`로 새 인스턴스가 접속하면 에포크(Epoch) 번호가 올라갑니다. 이전 프로듀서가 요청을 보내면 `ProducerFencedException`을 발생시켜 작업을 즉시 중단시킵니다.",
    code: "// 구버전 프로듀서 요청 시 발생 예외\n// org.apache.kafka.common.errors.ProducerFencedException\n// -> 애플리케이션은 즉시 종료(close) 처리해야 함"
  },
  {
    id: "KAFKA-034",
    num: "034",
    rarity: "R",
    category: "EOS",
    tags: ["EOS", "SEQUENCE"],
    icon: "🔢",
    titleEn: "IDEMPOTENT SEQUENCE TRACKING",
    titleKo: "멱등성 시퀀스 번호 검증 알고리즘",
    diagramNodes: [
      { name: "Seq N-1 (Done)", type: "" },
      { name: "Seq N (Incoming)", type: "highlight" },
      { name: "Seq N+1 (Out of Order)", type: "" }
    ],
    stats: { atk: "Duplicate Sequence Rejected", def: "OutOfOrderSequenceException" },
    concept: "브로커가 파티션별로 기대하는 시퀀스 번호(Expected Sequence Number)와 정확히 일치하는지 검증.",
    quote: "「수신된 시퀀스가 이전에 받은 번호와 동일하면 거부하고, 갭이 크면 예외를 발생시킨다.」",
    detail: "수신된 시퀀스 = `Expected Sequence`: 성공 저장. 수신된 시퀀스 < `Expected`: 중복 요청으로 판단하고 저장 없이 성공 ACK만 보냄. 수신 시퀀스 > `Expected`: 메시지 누락으로 간주하여 에러 리턴.",
    code: "// Broker Partition State Machine\n// if (incomingSeq == expectedSeq) appendAndIncrement();\n// else if (incomingSeq < expectedSeq) return DuplicateSequenceAck();\n// else throw OutOfOrderSequenceException();"
  },
  {
    id: "KAFKA-035",
    num: "035",
    rarity: "SR",
    category: "EOS",
    tags: ["EOS", "STATE-MACHINE"],
    icon: "🔄",
    titleEn: "TRANSACTION STATE MACHINE",
    titleKo: "트랜잭션 코디네이터 내부 상태 전환",
    diagramNodes: [
      { name: "Empty", type: "" },
      { name: "Ongoing -> PrepareCommit", type: "highlight" },
      { name: "CompleteCommit", type: "" }
    ],
    stats: { atk: "Empty -> Ongoing", def: "Prepare -> Complete" },
    concept: "트랜잭션 코디네이터가 `__transaction_state` 로그에 기록하는 5단계 상태 전이 머신.",
    quote: "「트랜잭션이 어떤 단계에서 중단되더라도 재시작 시 이전 상태를 완벽히 재구성하여 복원한다.」",
    detail: "상태 순서: `Empty` ➔ `Ongoing`(데이터 쓰기 중) ➔ `PrepareCommit`/`PrepareAbort` ➔ `CompleteCommit`/`CompleteAbort` ➔ `Empty`. 중간 단계 장애 시 코디네이터가 롤백/완료를 자동 처리합니다.",
    code: "// Transaction Metadata States\n// Empty -> Ongoing -> PrepareCommit -> CompleteCommit -> Empty"
  },

  // ==========================================
  // 36 ~ 45: STREAMS & CONNECT
  // ==========================================
  {
    id: "KAFKA-036",
    num: "036",
    rarity: "SR",
    category: "STREAMS",
    tags: ["STREAMS", "CONNECT"],
    icon: "🌉",
    titleEn: "KAFKA CONNECT ARCHITECTURE",
    titleKo: "카프카 커넥트 분산형(Distributed) 아키텍처",
    diagramNodes: [
      { name: "Connect Cluster", type: "highlight" },
      { name: "Connector Config", type: "" },
      { name: "Task 1 | Task 2", type: "highlight" }
    ],
    stats: { atk: "REST API 동적 제어", def: "자동 Task 수평 분산" },
    concept: "외부 DB, S3, ES 연동을 코드 없이 JSON 설정만으로 수행하며, 워커 노드 간 자동 부하 분산을 지원하는 시스템.",
    quote: "「워커 노드를 추가하면 커넥터 Task가 유연하게 재배치되어 병렬 처리된다.」",
    detail: "Connector는 작업을 정의하고, 실제 실행은 Task가 담당합니다. Distributed Mode에서는 커넥트 워커들이 클러스터를 형성하여 고가용성을 유지합니다.",
    code: "# REST API로 PostgreSQL Source Connector 등록\n$ curl -X POST http://localhost:8083/connectors -H \"Content-Type: application/json\" -d '{\n  \"name\": \"pg-orders-source\",\n  \"config\": {\n    \"connector.class\": \"io.debezium.connector.postgresql.PostgresConnector\",\n    \"tasks.max\": \"3\",\n    \"database.hostname\": \"postgres-db\",\n    \"plugin.name\": \"pgoutput\"\n  }\n}'"
  },
  {
    id: "KAFKA-037",
    num: "037",
    rarity: "UR",
    category: "STREAMS",
    tags: ["STREAMS", "CDC"],
    icon: "🔄",
    titleEn: "CDC WITH DEBEZIUM & WAL",
    titleKo: "CDC (Change Data Capture) 및 DB 트랜잭션 로그 연동",
    diagramNodes: [
      { name: "PostgreSQL WAL", type: "" },
      { name: "Debezium Connector", type: "highlight" },
      { name: "Kafka Event Topic", type: "highlight" }
    ],
    stats: { atk: "DB 조회 부하 Zero", def: "실시간 변경 감지 (Insert/Update/Delete)" },
    concept: "DB 테이블에 쿼리를 날리지 않고, DB 내장 트랜잭션 로그(WAL/Binlog)를 읽어 실시간 변경 이벤트를 추출하는 기술.",
    quote: "「데이터베이스 부하 없이 모든 C.R.U.D 변경 내역을 카프카 이벤트로 동기화한다.」",
    detail: "Debezium과 같은 CDC 툴을 사용하면 DB의 트랜잭션 로그를 캡처하여 변경 전(Before)과 변경 후(After) 데이터를 완벽히 카프카 이벤트로 발행합니다.",
    code: "// Debezium CDC Event Payload Structure Sample\n{\n  \"before\": { \"id\": 10, \"status\": \"PENDING\" },\n  \"after\":  { \"id\": 10, \"status\": \"PAID\" },\n  \"op\": \"u\", // update\n  \"ts_ms\": 1786458000000\n}"
  },
  {
    id: "KAFKA-038",
    num: "038",
    rarity: "UR",
    category: "STREAMS",
    tags: ["STREAMS", "ROCKSDB"],
    icon: "⛰️",
    titleEn: "ROCKSDB STATE STORE & CHANGELOG",
    titleKo: "RocksDB 로컬 상태 저장소 & Changelog 토픽",
    diagramNodes: [
      { name: "Stream Input", type: "" },
      { name: "RocksDB Local Store", type: "highlight" },
      { name: "Changelog Topic", type: "highlight" }
    ],
    stats: { atk: "초고속 인메모리급 쿼리", def: "Changelog 복원 백업" },
    concept: "Kafka Streams에서 상태(Stateful) 연산을 위해 사용하는 고성능 내장 RocksDB 및 백업용 Changelog 토픽 메커니즘.",
    quote: "「앱이 재시작되어도 Changelog 토픽을 재생(Replay)하여 RocksDB 상태를 순식간에 복원한다.」",
    detail: "상태 기반 연산(Aggregate, Join 등)은 힙 메모리 대신 로컬 C++ RocksDB에 저장됩니다. 변경사항은 백그라운드로 Kafka 내 `changelog` 토픽에 동기화되어 장애에 대비합니다.",
    code: "Stores.persistentKeyValueStore(\"aggregated-order-count-store\");\n// RocksDB 설정 최적화 커스텀 가능\nprops.put(StreamsConfig.ROCKSDB_CONFIG_SETTER_CLASS_CONFIG, CustomRocksDBConfig.class.getName());"
  },
  {
    id: "KAFKA-039",
    num: "039",
    rarity: "SR",
    category: "STREAMS",
    tags: ["STREAMS", "WINDOW"],
    icon: "⏰",
    titleEn: "WINDOWING & GRACE PERIOD",
    titleKo: "윈도우 연산 (Tumbling/Hopping/Session)과 지연 데이터",
    diagramNodes: [
      { name: "Time Window", type: "highlight" },
      { name: "Grace Period", type: "" },
      { name: "Late Arrival Record", type: "" }
    ],
    stats: { atk: "Tumbling (고정) / Hopping (슬라이딩)", def: "Grace Period 지연 수용" },
    concept: "시간 축을 기준으로 데이터를 그룹핑하는 윈도우 연산과 뒤늦게 도착한 지연 데이터(Late Record) 처리 기법.",
    quote: "「Grace Period 시간을 부여하여 지연 도착한 이벤트도 윈도우 결과에 정확히 반영한다.」",
    detail: "Tumbling(중복 없는 고정 창), Hopping(겹치는 창), Session(활동 기준 창) 세 가지를 지원하며 `grace()`를 통해 지연 이벤트 허용 범위를 결정합니다.",
    code: "TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5))\n    .grace(Duration.ofMinutes(1)); // 1분 지연 허용"
  },
  {
    id: "KAFKA-040",
    num: "040",
    rarity: "SR",
    category: "STREAMS",
    tags: ["STREAMS", "JOIN"],
    icon: "🔀",
    titleEn: "KSTREAM-KSTREAM & KTABLE JOINS",
    titleKo: "스트림 조인과 코파티셔닝 (Co-partitioning)",
    diagramNodes: [
      { name: "Stream A (P3)", type: "" },
      { name: "Co-Partition Match", type: "highlight" },
      { name: "Stream B (P3)", type: "" }
    ],
    stats: { atk: "동일 파티션 개수 필수", def: "동일 파티셔너 키 필수" },
    concept: "두 스트림 또는 스트림과 테이블 간 실시간 조인 연산을 수행하기 위한 전제조건(Co-partitioning).",
    quote: "「조인 대상이 되는 두 토픽은 반드시 동일한 파티션 개수와 키 분배를 가져야 한다.」",
    detail: "코파티셔닝 조건이 맞지 않으면 조인 전 `repartition()` 과정을 거쳐 파티션 개수와 파티션 키를 맞추어 노드 간 셔플링을 발생시킵니다.",
    code: "KStream<String, Order> orders = builder.stream(\"orders\");\nKTable<String, User> users = builder.table(\"users\");\n\nKStream<String, EnrichedOrder> enriched = orders.join(users,\n    (order, user) -> new EnrichedOrder(order, user)\n);"
  },
  {
    id: "KAFKA-041",
    num: "041",
    rarity: "R",
    category: "STREAMS",
    tags: ["STREAMS", "QUERY"],
    icon: "🔍",
    titleEn: "INTERACTIVE QUERIES (IQ v2)",
    titleKo: "인터랙티브 쿼리 (Interactive Queries)",
    diagramNodes: [
      { name: "REST Client", type: "" },
      { name: "Streams Instance", type: "highlight" },
      { name: "ReadOnly RocksDB", type: "" }
    ],
    stats: { atk: "외부 DB 조회 대체", def: "실시간 로컬 키값 쿼리" },
    concept: "Kafka Streams 내부 RocksDB 상태 저장소를 외부 REST API를 통해 직접 실시간 쿼리하는 기능.",
    quote: "「외부 데이터베이스로 데이터를 내보내지 않고 스트림 앱 자체를 DB처럼 쿼리한다.」",
    detail: "ReadOnlyKeyValueStore 인터페이스를 통해 현재 스트림 인스턴스에 유지되고 있는 최신 집계 상태 값을 직접 조회할 수 있습니다.",
    code: "ReadOnlyKeyValueStore<String, Long> keyValueStore =\n    streams.store(StoreQueryParameters.fromNameAndType(\"word-count-store\", QueryableStoreTypes.keyValueStore()));\nLong count = keyValueStore.get(\"kafka\"); // 키 기반 실시간 쿼리"
  },
  {
    id: "KAFKA-042",
    num: "042",
    rarity: "N",
    category: "STREAMS",
    tags: ["STREAMS", "SCHEMA"],
    icon: "📜",
    titleEn: "SCHEMA EVOLUTION POLICIES",
    titleKo: "스키마 진화 정책 (BACKWARD, FORWARD, FULL)",
    diagramNodes: [
      { name: "Schema v1", type: "" },
      { name: "Schema Registry Validation", type: "highlight" },
      { name: "Schema v2 (Compatible)", type: "" }
    ],
    stats: { atk: "BACKWARD / FORWARD", def: "FULL / NONE 정책" },
    concept: "서비스 업데이트로 이벤트 구조(필드 추가/삭제)가 바뀔 때 컨슈머 장애를 예방하는 스키마 호환성 검증 정책.",
    quote: "「기본값 BACKWARD 정책은 새 스키마로 작성된 데이터를 구버전 컨슈머가 에러 없이 읽을 수 있게 한다.」",
    detail: "BACKWARD(필드 삭제/기본값 추가 허용), FORWARD(필드 추가 허용), FULL(양방향 완벽 호환) 정책을 설정하여 배포 순서와 무관하게 시스템 무장애를 유지합니다.",
    code: "# Confluent Schema Registry 호환성 변경 REST API\n$ curl -X PUT -H \"Content-Type: application/json\" \\\n  --data '{\"compatibility\": \"FULL\"}' \\\n  http://localhost:8081/config/orders-value"
  },
  {
    id: "KAFKA-043",
    num: "043",
    rarity: "R",
    category: "STREAMS",
    tags: ["STREAMS", "SMT"],
    icon: "⚙️",
    titleEn: "SINGLE MESSAGE TRANSFORMS (SMT)",
    titleKo: "커넥트 단일 메시지 변환 (SMT - Single Message Transform)",
    diagramNodes: [
      { name: "Source Record", type: "" },
      { name: "SMT Pipeline (Mask/Header)", type: "highlight" },
      { name: "Transformed Record", type: "" }
    ],
    stats: { atk: "실시간 마스킹/라우팅", def: "무코드 경량 필드 변환" },
    concept: "Kafka Connect 파이프라인 흐름 도중 개별 레코드 필드를 변환/마스킹/라우팅하는 플러그인.",
    quote: "「주민번호 마스킹이나 토픽명 동적 변경을 무코드 SMT 설정으로 가볍게 처리한다.」",
    detail: "`org.apache.kafka.connect.transforms.Transformation` 인터페이스를 구현하여 민감정보 마스킹, 필드 추출, 헤더 추가 등의 작업을 수행할 수 있습니다.",
    code: "transforms=maskSSN,renameTopic\ntransforms.maskSSN.type=org.apache.kafka.connect.transforms.MaskField$Value\ntransforms.maskSSN.fields=ssn\ntransforms.renameTopic.type=org.apache.kafka.connect.transforms.RegexRouter\ntransforms.renameTopic.regex=.*orders(.*)\ntransforms.renameTopic.replacement=app-orders$1"
  },
  {
    id: "KAFKA-044",
    num: "044",
    rarity: "SR",
    category: "STREAMS",
    tags: ["STREAMS", "STANDBY"],
    icon: "👯",
    titleEn: "KAFKA STREAMS STANDBY REPLICAS",
    titleKo: "카프카 스트림즈 대기 복제본 (Standby Replicas)",
    diagramNodes: [
      { name: "Active Task (RocksDB)", type: "highlight" },
      { name: "Changelog Sync", type: "" },
      { name: "Standby Task (Hot Warm)", type: "highlight" }
    ],
    stats: { atk: "num.standby.replicas=1", def: "즉시 Failover 로컬 복원" },
    concept: "스트림 애플리케이션 인스턴스 장애 시 RocksDB 핫 재구성 대기 시간을 극소화하기 위한 대기 스탠바이 인스턴스.",
    quote: "「스탠바이 인스턴스가 Changelog를 실시간 따라 읽어 장애 시 밀리초 만에 핫 복구한다.」",
    detail: "`num.standby.replicas` 설정을 1 이상으로 두면 다른 인스턴스가 섀도우 상태로 RocksDB 상태를 동기화하여 활성 인스턴스 고장 시 워밍업 대기 없이 즉시 승격됩니다.",
    code: "props.put(StreamsConfig.NUM_STANDBY_REPLICAS_CONFIG, 1);"
  },
  {
    id: "KAFKA-045",
    num: "045",
    rarity: "UR",
    category: "STREAMS",
    tags: ["STREAMS", "PAPI"],
    icon: "🛠️",
    titleEn: "PROCESSOR API (PAPI) & PUNCTUATOR",
    titleKo: "프로세서 API (PAPI) 및 주기적 펑추에이터 (Punctuator)",
    diagramNodes: [
      { name: "Processor Context", type: "" },
      { name: "Punctuator Schedule", type: "highlight" },
      { name: "State Store Emit", type: "highlight" }
    ],
    stats: { atk: "저수준 세밀 제어", def: "주기적 타임아웃 이벤트" },
    concept: "High-level DSL 한계를 넘어 로우레벨 이벤트 핸들링과 시간 기반 주기적(Punctuator) 작업을 직접 작성.",
    quote: "「특정 시간 동안 액션이 없는 사용자를 타이머 기반으로 세밀하게 감지하여 이벤트를 발행한다.」",
    detail: "`Processor` 인터페이스를 구현하고 `context.schedule()`을 통해 시스템 타임 또는 스트림 타임 기준으로 주기적인 배치 작업이나 세션 정리를 직접 제어할 수 있습니다.",
    code: "public class CustomProcessor implements Processor<String, String, String, String> {\n    public void init(ProcessorContext<String, String> context) {\n        context.schedule(Duration.ofMinutes(1), PunctuationType.WALL_CLOCK_TIME, timestamp -> {\n            // 1분마다 로컬 스토어 덤프 및 이벤트 발행\n        });\n    }\n}"
  },

  // ==========================================
  // 46 ~ 53: ADVANCED & ARCHITECTURAL PATTERNS
  // ==========================================
  {
    id: "KAFKA-046",
    num: "046",
    rarity: "SR",
    category: "ADVANCED",
    tags: ["ADVANCED", "DLQ"],
    icon: "☠️",
    titleEn: "DEAD LETTER QUEUE (DLQ) PATTERN",
    titleKo: "데드 레터 큐 (DLQ) 및 독약(Poison Pill) 메시지 처리",
    diagramNodes: [
      { name: "Consumer Error", type: "" },
      { name: "Retry Handler (3회)", type: "highlight" },
      { name: "DLQ Topic", type: "highlight" }
    ],
    stats: { atk: "Poison Pill 격리", def: "파이프라인 블로킹 방지" },
    concept: "파싱 불가 또는 비즈니스 에러를 일으키는 불량 메시지(Poison Pill)를 별도 DLQ 토픽으로 우회 격리하는 패턴.",
    quote: "「불량 메시지 하나 때문에 전체 컨슈머 파이프라인이 멈추는 불상사를 방지하라.」",
    detail: "지정된 횟수(예: 3회)만큼 재시도 후에도 실패하는 메시지는 `.DLQ` 토픽으로 보낸 후 정상 오프셋을 커밋하여 차후 복구 분석을 도모합니다.",
    code: "try {\n    processRecord(record);\n} catch (NonRetryableException e) {\n    dlqProducer.send(new ProducerRecord<>(\"orders.DLQ\", record.key(), record.value()));\n    consumer.commitSync(); // DLQ 이관 후 오프셋 넘김\n}"
  },
  {
    id: "KAFKA-047",
    num: "047",
    rarity: "SR",
    category: "ADVANCED",
    tags: ["ADVANCED", "REBALANCE-STORM"],
    icon: "🌩️",
    titleEn: "REBALANCE STORM MITIGATION",
    titleKo: "리밸런싱 폭풍(Rebalance Storm) 방지 및 대응",
    diagramNodes: [
      { name: "GC Pause / Long Task", type: "" },
      { name: "Coordinator Kick-out", type: "highlight" },
      { name: "Cascading Rebalance", type: "" }
    ],
    stats: { atk: "Static Membership", def: "group.instance.id" },
    concept: "컨슈머의 긴 GC Pause나 장시간 처리 때문에 무한 리밸런싱 폭풍에 빠지는 현상을 차단하는 방어막.",
    quote: "「`group.instance.id` 정적 멤버십을 적용하면 컨슈머 재배포 시에도 리밸런싱이 발생하지 않는다.」",
    detail: "Static Membership(KIP-345)을 사용하면 컨슈머 재시작 시 핑퐁 리밸런스 없이 기존 파티션을 그대로 즉시 재할당받아 서비스 영향을 제로화합니다.",
    code: "props.put(\"group.instance.id\", \"payment-consumer-node-01\"); // 정적 멤버십 설정\nprops.put(\"session.timeout.ms\", \"60000\");"
  },
  {
    id: "KAFKA-048",
    num: "048",
    rarity: "R",
    category: "ADVANCED",
    tags: ["ADVANCED", "RESEQUENCING"],
    icon: "🔀",
    titleEn: "OUT-OF-ORDER PROCESSING & RESEQUENCING",
    titleKo: "순서 뒤바뀜 처리 및 버퍼링 재정렬",
    diagramNodes: [
      { name: "Out-of-Order Input", type: "" },
      { name: "PriorityQueue Buffer", type: "highlight" },
      { name: "In-Order Execution", type: "" }
    ],
    stats: { atk: "시퀀스 번호 추적", def: "In-Memory Re-sequencer" },
    concept: "네트워크 재전송이나 멉티쓰레드 처리로 인해 뒤바뀐 이벤트 순서를 수신측 메모리 버퍼에서 재정렬하는 패턴.",
    quote: "「이벤트 시퀀스 번호와 윈도우 버퍼를 조합하여 올바른 순서대로 비즈니스 로직에 전달한다.」",
    detail: "파티션 키가 달라 순서가 꼬이거나 아웃 오브 오더가 일어날 때, 수신측에서 시퀀스 번호를 기반으로 차례가 올 때까지 PriorityQueue에 대기시킨 후 실행합니다.",
    code: "PriorityQueue<Event> buffer = new PriorityQueue<>(Comparator.comparingLong(Event::getSequenceNo));\n// 수신 시 buffer.add(event);\n// expectedSeqNo와 buffer.peek().getSequenceNo() 일치 시 poll()하여 처리"
  },
  {
    id: "KAFKA-049",
    num: "049",
    rarity: "R",
    category: "ADVANCED",
    tags: ["ADVANCED", "SECURITY"],
    icon: "🔒",
    titleEn: "KAFKA ENTERPRISE SECURITY (mTLS & SASL)",
    titleKo: "엔터프라이즈 보안 (mTLS 암호화 및 SASL/OAUTH)",
    diagramNodes: [
      { name: "Client Cert (mTLS)", type: "highlight" },
      { name: "SASL/OAUTHBEARER", type: "highlight" },
      { name: "ACL Engine", type: "" }
    ],
    stats: { atk: "양방향 TLS 인증", def: "OAuth2 / OIDC 토큰 검증" },
    concept: "클라이언트와 브로커 간 양방향 TLS(mTLS) 암호화 및 OAuth2 토큰 기반 SASL/OAUTHBEARER 고급 보안 체계.",
    quote: "「사내 IAM 및 OAuth2 서버와 연동하여 토큰 기반으로 카프카 보안 접근을 통제한다.」",
    detail: "SASL/ORAM, SASL/GSSAPI(Kerberos), SASL/OAUTHBEARER를 지원하며 전송 구간은 TLS로 암호화하여 금융 및 의료 데이터의 최고 수준 암호화를 구현합니다.",
    code: "security.protocol=SASL_SSL\nsasl.mechanism=OAUTHBEARER\nsasl.jaas.config=org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required;\nsasl.login.callback.handler.class=CustomOAuthCallbackHandler;"
  },
  {
    id: "KAFKA-050",
    num: "050",
    rarity: "UR",
    category: "ADVANCED",
    tags: ["ADVANCED", "MIRRORMAKER"],
    icon: "🌐",
    titleEn: "MULTI-DC REPLICATION (MIRRORMAKER 2)",
    titleKo: "멀티 데이터센터 복제 및 MirrorMaker 2.0",
    diagramNodes: [
      { name: "Primary DC Cluster", type: "" },
      { name: "MirrorMaker 2.0", type: "highlight" },
      { name: "DR DC Cluster", type: "highlight" }
    ],
    stats: { atk: "Active-Passive DR", def: "Active-Active 동기화" },
    concept: "서로 다른 데이터센터(DC) 또는 클라우드 리전 간에 카프카 토픽과 오프셋을 동기화하는 멀티 클러스터 복제.",
    quote: "「리전 재앙 발생 시 DR 센터로 즉시 오프셋 손실 없이 가상 트래픽 전환(Failover)을 실행한다.」",
    detail: "MirrorMaker 2.0(MM2)은 Kafka Connect 프레임워크 기반으로 토픽 데이터뿐만 아니라 `__consumer_offsets` 매핑 정보까지 주기적으로 동기화하여 disaster recovery를 만듭니다.",
    code: "# MirrorMaker 2.0 전용 설정 파일 (mm2.properties)\nclusters = A, B\nA.bootstrap.servers = dc1-kafka:9092\nB.bootstrap.servers = dc2-kafka:9092\nA->B.enabled = true\nA->B.topics = orders.*\nsync.topic.acls.enabled = true"
  },
  {
    id: "KAFKA-051",
    num: "051",
    rarity: "N",
    category: "ADVANCED",
    tags: ["ADVANCED", "LARGE-MESSAGE"],
    icon: "🐘",
    titleEn: "LARGE MESSAGE STRATEGIES",
    titleKo: "대용량 메시지 (Claim Check & Chunking) 처리 패턴",
    diagramNodes: [
      { name: "Payload > 10MB", type: "" },
      { name: "Claim Check (S3 Upload)", type: "highlight" },
      { name: "Kafka Reference Pointer", type: "" }
    ],
    stats: { atk: "Claim Check Pattern", def: "max.request.size 튜닝" },
    concept: "1MB가 넘는 대용량 이미지/파일 페이로드가 브로커 성능을 떨어뜨리는 것을 방지하는 클레임 체크 패턴.",
    quote: "「대용량 페이로드는 S3에 업로드하고, 카프카에는 S3 URI 래퍼런스 참조값만 전송하라.」",
    detail: "기본 메시지 제한(`max.message.bytes=1048576`)을 무작정 늘리면 GC 및 네트워크 병목이 생깁니다. Claim Check 패턴을 사용하면 브로커 메모리를 깨끗하게 유지할 수 있습니다.",
    code: "// Claim Check Pattern 코드 구조\nString s3Url = s3Client.upload(largePayload); // S3 업로드\nProducerRecord record = new ProducerRecord(\"large-files\", key, new ClaimCheck(s3Url));\nproducer.send(record);"
  },
  {
    id: "KAFKA-052",
    num: "052",
    rarity: "UR",
    category: "ADVANCED",
    tags: ["ADVANCED", "EVENT-SOURCING"],
    icon: "🏛️",
    titleEn: "EVENT SOURCING & CQRS PATTERN",
    titleKo: "이벤트 소싱 (Event Sourcing) 및 CQRS 아키텍처",
    diagramNodes: [
      { name: "Command API", type: "" },
      { name: "Kafka Event Store Log", type: "highlight" },
      { name: "Read DB (CQRS View)", type: "highlight" }
    ],
    stats: { atk: "상태 변경 이력 영구 보존", def: "명령과 조회 책임 분리" },
    concept: "애플리케이션 상태를 직접 수정하지 않고, 상태를 변경하는 이벤트를 카프카에 순치적으로 누적하는 패턴.",
    quote: "「이벤트 로그가 진실의 단일 원천(Single Source of Truth)이며, 조회를 위한 DB 뷰는 언제든 재구성한다.」",
    detail: "Command(쓰기)와 Query(읽기)를 분리합니다. 카프카 이벤트 로그를 통해 과거 어떤 시점으로든 상태를 재구성(Replay)할 수 있어 감사(Audit)와 분석에 탁월합니다.",
    code: "// Event Sourcing Event Replay Structure\npublic class AccountAggregate {\n    private BigDecimal balance = BigDecimal.ZERO;\n    public void apply(AccountCreatedEvent e) { this.balance = e.getInitialBalance(); }\n    public void apply(MoneyDepositedEvent e) { this.balance = this.balance.add(e.getAmount()); }\n}"
  },
  {
    id: "KAFKA-053",
    num: "053",
    rarity: "UR",
    category: "ADVANCED",
    tags: ["ADVANCED", "SAGA"],
    icon: "🔄",
    titleEn: "SAGA PATTERN WITH KAFKA",
    titleKo: "카프카 기반 분산 트랜잭션 (Saga Pattern)",
    diagramNodes: [
      { name: "Order Service", type: "highlight" },
      { name: "Choreography Event", type: "" },
      { name: "Payment Service", type: "highlight" }
    ],
    stats: { atk: "보상 트랜잭션 (Compensating)", def: "최종 일관성 (Eventual Consistency)" },
    concept: "마이크로서비스 간 2PC 단점을 극복하기 위해 각 서비스 이벤트를 기반으로 최종 일관성을 맞추는 패턴.",
    quote: "「중간 서비스 실패 시 보상 이벤트(Compensating Event)를 반대 방향으로 발행하여 롤백을 수행한다.」",
    detail: "Choreography(이벤트 기반 자율 처리) 또는 Orchestration(사가 오케스트레이터 중앙 조율)을 이용하여 긴 트랜잭션을 분할하고, 처리 실패 시 보상 트랜잭션 이벤트를 날립니다.",
    code: "// Saga Compensating Event Sample\nif (!paymentApproved) {\n    kafkaTemplate.send(\"payment-failed-events\", new CancelOrderEvent(orderId, \"PAYMENT_REJECTED\"));\n}"
  },

  // ==========================================
  // 54 ~ 60: OPERATIONS & KUBERNETES & PLAYBOOK
  // ==========================================
  {
    id: "KAFKA-054",
    num: "054",
    rarity: "UR",
    category: "OPERATIONS",
    tags: ["OPERATIONS", "K8S"],
    icon: "☸️",
    titleEn: "STRIMZI OPERATOR & KUBERNETES",
    titleKo: "쿠버네티스 Strimzi 오퍼레이터 Cloud-Native Kafka",
    diagramNodes: [
      { name: "Kafka CustomResource", type: "highlight" },
      { name: "Strimzi Operator", type: "highlight" },
      { name: "StatefulSet + PVC", type: "" }
    ],
    stats: { atk: "Cloud-Native K8s 배포", def: "자동 롤링 업데이트 & TLS" },
    concept: "쿠버네티스 환경에서 카프카 클러스터를 CRD(Custom Resource Definition) 선언으로 운영하는 오퍼레이터.",
    quote: "「YAML 파일 하나로 클러스터 배포, TLS 인증서 발급, 스케일아웃을 자동화한다.」",
    detail: "Strimzi는 K8s StatefulSet, PersistentVolumeClaim(PVC), Service, Secret 관리를 완전 자동화합니다. 브로커 구성 변경 시 무중단 롤링 업데이트를 수행합니다.",
    code: "# Strimzi Kafka Custom Resource Sample (kafka.yaml)\napiVersion: kafka.strimzi.io/v1beta2\nkind: Kafka\nmetadata:\n  name: my-cluster\nspec:\n  kafka:\n    version: 3.7.0\n    replicas: 3\n    storage:\n      type: persistent-claim\n      size: 100Gi"
  },
  {
    id: "KAFKA-055",
    num: "055",
    rarity: "UR",
    category: "OPERATIONS",
    tags: ["OPERATIONS", "PLAYBOOK"],
    icon: "🏆",
    titleEn: "PRODUCTION TROUBLESHOOTING PLAYBOOK",
    titleKo: "실무 장애 대응 트러블슈팅 응급 플레이북",
    diagramNodes: [
      { name: "Incident Alert", type: "highlight" },
      { name: "Check ISR / Lag / Disk", type: "highlight" },
      { name: "Emergency Action", type: "highlight" }
    ],
    stats: { atk: "장애 3대 요소 탐지", def: "트러블슈팅 체크리스트" },
    concept: "생산 환경에서 발생하는 대표적 3대 장애(ISR 붕괴, Consumer Lag 폭발, Disk Full)의 긴급 대처 가이드.",
    quote: "「장애 발생 시 ISR 점검 -> Lag 폭발 원인 쓰레드 덤프 -> 디스크 보관주기 축소를 즉시 수행하라.」",
    detail: "1. **ISR Shrink**: 네트웍 렌턴시 및 Disk I/O 병목 점검\n2. **Lag 폭발**: 컨슈머 파티션 수확인 및 `max.poll.records` 축소\n3. **Disk Full**: `kafka-configs.sh`로 해당 토픽 `retention.ms` 임시 축소하여 용량 확보.",
    code: "# 디스크 긴급 용량 확보 CLI 명령 (보관주기를 1시간으로 임시 축소)\n$ bin/kafka-configs.sh --bootstrap-server localhost:9092 --entity-type topics \\\n  --entity-name orders --alter --add-config retention.ms=3600000"
  },
  {
    id: "KAFKA-056",
    num: "056",
    rarity: "R",
    category: "OPERATIONS",
    tags: ["OPERATIONS", "ACL"],
    icon: "📋",
    titleEn: "AUDIT LOGGING & SECURITY ACLS",
    titleKo: "감사 로그 (Audit Logging) 및 미세 ACL 권한 관리",
    diagramNodes: [
      { name: "Principal (User)", type: "" },
      { name: "Authorizer Engine", type: "highlight" },
      { name: "Audit Log Output", type: "highlight" }
    ],
    stats: { atk: "StandardAuthorizer", def: "ResourcePatternType (LITERAL/PREFIXED)" },
    concept: "누가 언제 어떤 토픽에 읽기/쓰기를 수행했는지 감사 추적하고, 리소스별 억세스 권한을 세밀히 제어.",
    quote: "「토픽 Prefix 기반 규칙 설정으로 개발팀/운영팀의 접근 권한을 엄격히 격리한다.」",
    detail: "`org.apache.kafka.metadata.authorizer.StandardAuthorizer`를 도입하여 `User:PaymentService`에게 `payment-*` 토픽만 읽기/쓰기를 허용하는 등의 세밀한 ACL 배치가 가능합니다.",
    code: "# 특정 파티션 그룹 권한 부여 CLI\n$ bin/kafka-acls.sh --bootstrap-server localhost:9092 --add \\\n  --allow-principal User:OrderApp --operation Read --operation Write \\\n  --topic order- --resource-pattern-type prefixed"
  },
  {
    id: "KAFKA-057",
    num: "057",
    rarity: "SR",
    category: "OPERATIONS",
    tags: ["OPERATIONS", "REASSIGNMENT"],
    icon: "⚖️",
    titleEn: "PARTITION REASSIGNMENT & BALANCING",
    titleKo: "파티션 재배치 (Reassignment) 및 디스크 균등 튜닝",
    diagramNodes: [
      { name: "Overloaded Broker 1", type: "" },
      { name: "kafka-reassign-partitions", type: "highlight" },
      { name: "Balanced Broker 2/3", type: "highlight" }
    ],
    stats: { atk: "Throttle-rate 제어", def: "디스크 균형 마이그레이션" },
    concept: "신규 브로커 노드 추가 시 기존 토픽 파티션을 새로 추가된 노드로 수동 마이그레이션 재배치.",
    quote: "「파티션 마이그레이션 시 네트워크 대역폭 쓰로틀링을 설정하여 실시간 서비스 영향도를 막는다.」",
    detail: "`kafka-reassign-partitions.sh` 명령을 실행할 때 `throttle` 인자를 주어 복제 트래픽 속도를 제한(예: 50MB/s)함으로써 기존 서비스 영향 없이 안전하게 분산 이동시킵니다.",
    code: "# 파티션 마이그레이션 대역폭 50MB/s 제한 실행\n$ bin/kafka-reassign-partitions.sh --bootstrap-server localhost:9092 \\\n  --reassignment-json-file reassign.json --execute --throttle 52428800"
  },
  {
    id: "KAFKA-058",
    num: "058",
    rarity: "SR",
    category: "OPERATIONS",
    tags: ["OPERATIONS", "PROMETHEUS"],
    icon: "📊",
    titleEn: "PROMETHEUS METRICS & ALERT RULES",
    titleKo: "프로메테우스 경보 룰 및 그래파나 대시보드",
    diagramNodes: [
      { name: "JMX Exporter", type: "" },
      { name: "Prometheus Scrape", type: "highlight" },
      { name: "Grafana Alerting", type: "highlight" }
    ],
    stats: { atk: "UnderReplicatedPartitions", def: "OfflinePartitionsCount" },
    concept: "브로커 장애, 파티션 오프라인, ISR 감소를 24시간 실시간 감시하는 프로메테우스 알람 임계치 모니터링.",
    quote: "「OfflinePartitionsCount > 0 신호 발생 시 즉각 Ops팀 시스템 경보를 발송하라.」",
    detail: "1. `OfflinePartitionsCount > 0` (대형 장애)\n2. `UnderReplicatedPartitions > 0` (복제 지연)\n3. `ActiveControllerCount != 1` (컨트롤러 이상) 3대 프로메테우스 알람 룰 작성 규칙.",
    code: "# Prometheus Alert Rule Sample\n- alert: KafkaUnderReplicatedPartitions\n  expr: kafka_server_replicamanager_underreplicatedpartitions > 0\n  for: 2m\n  labels:\n    severity: critical\n  annotations:\n    summary: \"Kafka Under Replicated Partitions detected on {{ $labels.instance }}\""
  },
  {
    id: "KAFKA-059",
    num: "059",
    rarity: "R",
    category: "OPERATIONS",
    tags: ["OPERATIONS", "UPGRADE"],
    icon: "🆙",
    titleEn: "ZERO-DOWNTIME CLUSTER UPGRADES",
    titleKo: "무중단 클러스터 업그레이드 및 프로토콜 버전 업",
    diagramNodes: [
      { name: "Rolling Binary Upgrade", type: "highlight" },
      { name: "inter.broker.protocol", type: "" },
      { name: "log.message.format", type: "highlight" }
    ],
    stats: { atk: "2-Step Rolling Upgrade", def: "Protocol Version Compatibility" },
    concept: "클러스터 가동을 멈추지 않고 카프카 바이너리 버전을 단계적으로 올리는 무중단 업그레이드 수순.",
    quote: "「1단계 바이너리 교체 후, 2단계에서 inter.broker.protocol.version을 순차 업데이트한다.」",
    detail: "먼저 `inter.broker.protocol.version`을 이전 버전으로 고정한 상태에서 롤링 재시작으로 바이너리를 새 버전으로 교체합니다. 클러스터 전체 이상 없음을 확인한 뒤 프로토콜 버전을 최종 상향시킵니다.",
    code: "# 1단계: 새 바이너리로 롤링 교체 시 기존 프로토콜 유지\ninter.broker.protocol.version=3.6\n# 2단계: 전체 정상 확인 후 최종 상향 및 재시작\ninter.broker.protocol.version=3.7"
  },
  {
    id: "KAFKA-060",
    num: "060",
    rarity: "UR",
    category: "OPERATIONS",
    tags: ["OPERATIONS", "BENCHMARK"],
    icon: "⏱️",
    titleEn: "BENCHMARK & LOAD TESTING TOOLKIT",
    titleKo: "성능 벤치마크 및 부하 테스트 툴킷",
    diagramNodes: [
      { name: "Producer Perf Test", type: "highlight" },
      { name: "Kafka Broker Target", type: "" },
      { name: "Consumer Perf Test", type: "highlight" }
    ],
    stats: { atk: "TPS throughput 측정", def: "Latency Percentile (p99)" },
    concept: "생산 환경 투입 전 카프카 클러스터의 최대 한계 수용량(Throughput & Latency p99)을 검증하는 도구.",
    quote: "「`kafka-producer-perf-test.sh`로 초당 메시지 처리 건수와 p99 지연 시간을 정밀 측정한다.」",
    detail: "클러스터 튜닝 후 레코드 크기, 프로듀서 쓰레드 수, ACKS 설정별로 최대 TPS(Transactions Per Second)와 Latency 99퍼센타일 지표를 가늠하여 인프라 규격을 확정합니다.",
    code: "# 100만 건 메시지 초당 5만 건 속도 부하 테스트 CLI\n$ bin/kafka-producer-perf-test.sh --topic perf-test \\\n  --num-records 1000000 --record-size 1024 --throughput 50000 \\\n  --producer-props bootstrap.servers=localhost:9092 acks=all"
  }
];
