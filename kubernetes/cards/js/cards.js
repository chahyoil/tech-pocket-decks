/**
 * Kubernetes Concepts learning sample based on the official documentation.
 * The UI intentionally contains no external-document buttons.
 */
window.K8S_CARDS = [
  {
    id: "OVR-001",
    type: "OVERVIEW",
    chapter: "OVERVIEW",
    level: "FOUNDATION",
    nameEn: "WHAT IS KUBERNETES",
    nameKo: "쿠버네티스란?",
    visual: "cluster",
    icon: "K8s",
    attrs: ["Container", "Orchestrator"],
    atk: "선언적 API",
    def: "자가 복구",
    effect:
      "컨테이너화된 워크로드의 배포·스케일·운영을 자동화하는 이식성 있는 분산 시스템 오케스트레이터.",
    flavor: "원하는 상태를 선언하면, 쿠버네티스가 그 상태를 유지한다.",
    detail:
      "Kubernetes는 컨테이너 런타임 위에서 동작하며, 클러스터 전체의 리소스를 추상화한다. 사용자는 Pod, Service, Deployment 같은 오브젝트로 '원하는 상태(Desired State)'를 선언하고, 컨트롤 플레인이 클러스터의 실제 상태를 관찰하며 그 상태로 수렴시킨다. 이 때문에 장애 복구, 스케일 아웃, 롤링 업데이트가 모두 컨트롤 루프로 자동 처리된다.",
    code: `# 클러스터 노드 확인
kubectl get nodes

# 현재 실행 중인 모든 Pod
kubectl get pods -A

# 선언한 상태 vs 실제 상태
kubectl diff -f deployment.yaml`,
    lang: "yaml",
  },
  {
    id: "OVR-002",
    type: "OVERVIEW",
    chapter: "OVERVIEW",
    level: "FOUNDATION",
    nameEn: "KUBERNETES COMPONENTS",
    nameKo: "쿠버네티스 구성 요소",
    visual: "cluster",
    icon: "CMP",
    attrs: ["Control Plane", "Node"],
    atk: "컨트롤 플레인",
    def: "데이터 플레인",
    effect:
      "컨트롤 플레인(kube-apiserver, etcd, scheduler, controller-manager)과 노드(kubelet, kube-proxy, 런타임)로 구성.",
    flavor: "두 개의 세계 — 클러스터의 두뇌와 팔.",
    detail:
      "컨트롤 플레인은 클러스터의 전역 결정을 내리고 이벤트(예: Pod 시작)에 반응한다. kube-apiserver는 모든 통신의 입구이고, etcd는 클러스터 상태를 저장하는 KV 스토어다. 각 노드에서 kubelet은 Pod가 정상 동작하도록 보장하고, kube-proxy는 서비스 네트워킹 규칙을 관리한다.",
    code: `# 컨트롤 플레인 컴포넌트 상태
kubectl get componentstatuses

# 노드별 컨포넌트 확인
kubectl get nodes -o wide

# kube-proxy가 유지하는 iptables 규칙
iptables -L -n -t nat | grep KUBE`,
    lang: "bash",
  },
  {
    id: "OVR-003",
    type: "OVERVIEW",
    chapter: "OVERVIEW",
    level: "CORE",
    nameEn: "KUBERNETES OBJECTS",
    nameKo: "쿠버네티스 오브젝트",
    visual: "object",
    icon: "OBJ",
    attrs: ["Spec", "Status"],
    atk: "Spec (원하는 상태)",
    def: "Status (현재 상태)",
    effect:
      "모든 오브젝트는 Spec(사용자가 원하는 상태)과 Status(시스템이 관측한 현재 상태)를 가진다.",
    flavor: "오브젝트는 클러스터에 대한 '의도의 서명'이다.",
    detail:
      "Kubernetes 오브젝트는 영속성 있는 리소스로, 클러스터가 존재하는 한 상태가 유지된다. 각 오브젝트는 apiVersion, kind, metadata, 그리고 spec/status 필드로 구성된다. 사용자는 spec을 통해 원하는 상태를 기술하고, 시스템은 컨트롤 루프로 status를 spec에 가깝게 수렴시킨다. kubectl apply로 선언적 관리가 가능한 근간이다.",
    code: `# 오브젝트의 필수 필드
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.27`,
    lang: "yaml",
  },
  {
    id: "OVR-004",
    type: "OVERVIEW",
    chapter: "OVERVIEW",
    level: "CORE",
    nameEn: "THE KUBERNETES API",
    nameKo: "쿠버네티스 API",
    visual: "object",
    icon: "API",
    attrs: ["REST", "Declarative"],
    atk: "kube-apiserver",
    def: "etcd persist",
    effect:
      "모든 오브젝트는 RESTful 리소스로 모델링되며, 모든 컴포넌트는 kube-apiserver를 통해 상태를 읽고 쓴다.",
    flavor: "API가 클러스터의 유일한 진실의 출처이다.",
    detail:
      "Kubernetes API는 RESTful 리소스(Pod, Service, ConfigMap 등)와 컬렉션으로 구성된다. 모든 컨트롤러, 스케줄러, kubelet, 그리고 kubectl까지 API 서버를 통해서만 상태를 변경한다. API 서버는 인증·인가·어드미션 웹훅 단계를 거쳐 etcd에 기록한다. 선언적 관리와 감사(audit)가 한 곳에서 가능한 이유다.",
    code: `# API를 통해 직접 리소스 확인
kubectl get --raw='/api/v1/namespaces/default/pods'

# 특정 API 그룹의 리소스 목록
kubectl api-resources --api-group=apps

# 선언적 patch 예시
kubectl patch deployment web -p '{"spec":{"replicas":5}}'`,
    lang: "bash",
  },
  {
    id: "OVR-005",
    type: "OVERVIEW",
    chapter: "OVERVIEW",
    level: "CORE",
    nameEn: "NAMESPACES",
    nameKo: "네임스페이스",
    visual: "ns",
    icon: "NS",
    attrs: ["Isolation", "Scope"],
    atk: "리소스 격리",
    def: "이름 충돌 방지",
    effect:
      "클러스터 내 논리적 그룹으로, 리소스 이름 충돌을 피하고 권한/쿼터 범위를 지정한다.",
    flavor: "한 클러스터에 여러 개의 가상 클러스터.",
    detail:
      "네임스페이스는 같은 클러스터 내에서 리소스를 논리적으로 분리하는 메커니즘이다. 이름은 네임스페이스 안에서만 유일하면 된다. ResourceQuota, NetworkPolicy, RBAC RoleBinding 등은 네임스페이스 단위로 적용된다. 단, 노드나 퍼시스턴트 볼륨처럼 클러스터 범위 리소스는 네임스페이스로 격리되지 않는다.",
    code: `# 네임스페이스 생성
kubectl create namespace team-alpha

# 특정 네임스페이스의 리소스만 조회
kubectl get pods -n team-alpha

# 기본 네임스페이스 변경
kubectl config set-context \\
  --current --namespace=team-alpha`,
    lang: "bash",
  },
  {
    id: "OVR-006",
    type: "OVERVIEW",
    chapter: "OVERVIEW",
    level: "CORE",
    nameEn: "LABELS & SELECTORS",
    nameKo: "레이블과 셀렉터",
    visual: "object",
    icon: "LBL",
    attrs: ["Filter", "Grouping"],
    atk: "key/value 레이블",
    def: "셀렉터 매칭",
    effect:
      "오브젝트에 붙이는 key/value 레이블과 이를 매칭하는 셀렉터로 리소스 그룹을 유연하게 필터링한다.",
    flavor: "레이블은 오브젝트를 식별하는 가벼운 태그.",
    detail:
      "레이블은 사용자가 오브젝트에 붙이는 key/value 쌍으로, 의미있는 속성을 표현한다. Deployment, Service, NetworkPolicy는 모두 셀렉터로 대상 Pod를 찾는다. equality-based(key=value)와 set-based(key in [a,b]) 셀렉터를 조합할 수 있다. 레이블이 클러스터의 느슨한 결합의 핵심이다.",
    code: `# Pod에 레이블 추가
kubectl label pod web-1 app=web tier=frontend

# 셀렉터로 필터링
kubectl get pods -l app=web,tier=frontend

# set-based 셀렉터
kubectl get pods -l 'env in (prod, staging)'`,
    lang: "bash",
  },
  {
    id: "ARC-007",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "CORE",
    nameEn: "NODES",
    nameKo: "노드",
    visual: "cluster",
    icon: "NODE",
    attrs: ["kubelet", "kube-proxy"],
    atk: "워커 / 컨트롤 플레인",
    def: "상태 보고",
    effect:
      "노드는 Pod를 실행하는 워커 머신으로, kubelet이 컨테이너 라이프사이클을 관리하고 상태를 API 서버에 보고한다.",
    flavor: "노드는 클러스터의 손발이다.",
    detail:
      "노드는 물리 또는 가상 머신으로, kubelet, 컨테이너 런타임(containerd 등), kube-proxy가 동작한다. kubelet은 PodSpec을 받아 컨테이너를 시작하고, liveness/readiness 프로브로 상태를 점검하며, 노드 상태(메모리, 디스크 압박 등)를 주기적으로 API 서버에 보고한다. 노드가 비정상이면 컨트롤 플레인이 Pod를 다른 노드로 재스케줄한다.",
    code: `# 노드 상태 상세 확인
kubectl describe node worker-1

# 노드의 조건(Conditions) 점검
kubectl get nodes -o \\
  jsonpath='{range .items[*]}{.metadata.name}{" "}{.status.conditions[-1].type}{"\\n"}{end}'

# 노드를 스케줄링 불가로 마킹
kubectl cordon worker-1
kubectl drain worker-1 --ignore-daemonsets`,
    lang: "bash",
  },
  {
    id: "ARC-008",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "CORE",
    nameEn: "CONTROL PLANE ↔ NODE",
    nameKo: "컨트롤 플레인-노드 통신",
    visual: "cluster",
    icon: "CP",
    attrs: ["TLS", "Watch"],
    atk: "API 서버 단일 입구",
    def: "kubelet 푸시",
    effect:
      "노드는 kube-apiserver에 연결하고, 컨트롤 플레인은 kubelet을 통해 노드로 명령을 내린다.",
    flavor: "모든 신호는 API 서버를 통해 흐른다.",
    detail:
      "노드는 아웃바운드 TLS 연결로 API 서버에 접속한다. kubelet은 API 서버에 PodSpec 변경을 watch하고, 컨테이너 상태를 푸시한다. 컨트롤 플레인이 노드로 직접 연결하지 않는 것이 기본 구조이며, 이를 통해 방화벽 환경에서도 동작한다. 노드의 클라이언트 인증서는 부팅 시 발급되거나 kubelet TLS bootstrap으로 처리된다.",
    code: `# kubelet이 사용하는 인증서 위치
ls /etc/kubernetes/pki/

# 노드의 kubelet API (10250) 상태
kubectl get --raw='/api/v1/nodes/worker-1/proxy/healthz'

# apiserver가 watch한 이벤트 흐름
kubectl get events -A --watch`,
    lang: "bash",
  },
  {
    id: "ARC-009",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "CORE",
    nameEn: "CONTROLLERS",
    nameKo: "컨트롤러",
    visual: "deploy",
    icon: "CTL",
    attrs: ["Reconcile", "Watch"],
    atk: "관측 + 보정",
    def: " desired state 수렴",
    effect:
      "컨트롤러는 관찰-비교-조정 루프로 클러스터의 실제 상태를 원하는 상태로 수렴시킨다.",
    flavor: "컨트롤 루프 — 쿠버네티스의 심장.",
    detail:
      "각 컨트롤러는 특정 리소스를 담당한다. 예: ReplicaSet 컨트롤러는 Pod 수를 유지, Deployment 컨트롤러는 롤아웃을 관리, Node 컨트롤러는 노드 상태를 감시. 모두 '현재 상태를 관측하고 desired state와 비교해 필요한 조정을 수행'하는 패턴(Reconcile Loop)을 따른다. 선언적 모델을 자동화하는 핵심 추상화다.",
    code: `# 컨트롤러 매니저가 실행 중인 컨트롤러
kubectl get deploy -n kube-system \\
  -l component=kube-controller-manager

# ReplicaSet 컨트롤러 동작 확인
kubectl get rs -l app=web
# READY 열이 desired/current를 보여줌

# 컨트롤러 로그
kubectl logs -n kube-system \\
  -l component=kube-controller-manager --tail=50`,
    lang: "bash",
  },
  {
    id: "ARC-010",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "ADVANCED",
    nameEn: "GARBAGE COLLECTION",
    nameKo: "가비지 컬렉션",
    visual: "object",
    icon: "GC",
    attrs: ["Cascading", "Owner Refs"],
    atk: "Owner-Dependent 링크",
    def: "고아 리소스 정리",
    effect:
      "오브젝트 간 OwnerReferences 기반 종속 관계로, 소유자가 사라지면 종속 리소스도 자동 정리된다.",
    flavor: "주인이 떠나면 종자도 따라간다.",
    detail:
      "Deployment가 ReplicaSet을, ReplicaSet이 Pod를 소유한다. 소유자(Owner)가 삭제되면 Foreground(종속 먼저) 또는 Background(소유자 먼저) 정책에 따라 종속(Dependent)이 정리된다. Orphan 정책을 선택하면 종속이 살아남는다. 이 덕분에 사용자가 수동으로 하위 리소스를 정리할 필요가 없다.",
    code: `# Pod의 ownerReferences 확인
kubectl get pod web-abc -o \\
  jsonpath='{.metadata.ownerReferences}'

# Foreground 삭제 (종속 먼저 정리)
kubectl delete deployment web \\
  --cascade=foreground

# Orphan (종속 유지)
kubectl delete deployment web \\
  --cascade=orphan`,
    lang: "bash",
  },
  {
    id: "ARC-011",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "ADVANCED",
    nameEn: "CLOUD CONTROLLER MANAGER",
    nameKo: "클라우드 컨트롤러 매니저",
    visual: "cluster",
    icon: "CCM",
    attrs: ["Cloud", "Provider"],
    atk: "클라우드 API 통합",
    def: "코어 분리",
    effect:
      "클라우드별 컨트롤러(node, route, service)를 분리해 클러스터 코어와 벤더 코드를 격리한다.",
    flavor: "클라우드 친화, 코어는 벤더 불가.",
    detail:
      "cloud-controller-manager는 클라우드 프로바이더별 로직을 캡슐화한다. 노드 라벨/어노테이션 주입, 라우팅 테이블 관리, LoadBalancer 서비스 프로비저닝을 담당한다. 이 컴포넌트가 분리됨으로써 쿠버네티스 코어는 특정 클라우드에 종속되지 않고, 클라우드 공급자만 자체 업데이트할 수 있다.",
    code: `# 클라우드 컨트롤러 매니저 상태
kubectl get pods -n kube-system \\
  -l component=cloud-controller-manager

# 클라우드 Provider 확인
kubectl get nodes -o \\
  jsonpath='{.items[*].spec.providerId}'

# LoadBalancer 서비스(클라우드가 프로비저닝)
kubectl get svc -o wide`,
    lang: "bash",
  },
  {
    id: "WL-012",
    type: "WORKLOAD",
    chapter: "WORKLOADS",
    level: "FOUNDATION",
    nameEn: "PODS",
    nameKo: "파드",
    visual: "pod",
    icon: "POD",
    attrs: ["Atomic", "Co-located"],
    atk: "공유 네트워크/스토리지",
    def: "스케줄링 최소 단위",
    effect:
      "Pod는 쿠버네티스의 최소 스케줄 단위로, 하나 이상의 컨테이너가 네트워크와 볼륨을 공유한다.",
    flavor: "파드는 한 노드 위의 한 운명 공동체.",
    detail:
      "Pod 내 컨테이너들은 같은 네트워크 네임스페이스(IP, 포트 공유)와 볼륨을 공유하고, 항상 같은 노드에 스케줄된다. 보통 1 Pod = 1 컨테이너지만, 사이드카나 init 컨테이너로 구성하기도 한다. Pod는 직접 만들지 않고 Deployment 같은 워크로드 컨트롤러로 관리하는 것이 권장된다.",
    code: `# Pod 정의
apiVersion: v1
kind: Pod
metadata:
  name: web
  labels:
    app: web
spec:
  containers:
    - name: web
      image: nginx:1.27
      ports:
        - containerPort: 80
      resources:
        requests:
          cpu: 100m
          memory: 128Mi`,
    lang: "yaml",
  },
  {
    id: "WL-013",
    type: "WORKLOAD",
    chapter: "WORKLOADS",
    level: "CORE",
    nameEn: "POD LIFECYCLE",
    nameKo: "파드 라이프사이클",
    visual: "pod",
    icon: "LC",
    attrs: ["Phase", "RestartPolicy"],
    atk: "Pending → Running",
    def: "Succeeded / Failed",
    effect:
      "Pod는 Pending, Running, Succeeded, Failed, Unknown 5단계 Phase를 거치며, RestartPolicy로 재시작 동작을 결정한다.",
    flavor: "파드는 일회용 — 태어나고, 일하고, 사라진다.",
    detail:
      "Pod는 Pending 단계에서 이미지를 받고 볼륨을 마운트한다. Running에서 모든 컨테이너가 실행 중이며, Succeeded는 작업 완료, Failed는 컨테이너 종료 실패를 의미한다. RestartPolicy가 Always(기본)면 크래시 후 재시작, Never/OnFailure면 재시작하지 않거나 실패 시에만 재시도한다. Pod는 절대 '재부팅'되지 않고, 대체 Pod로 교체된다.",
    code: `# Pod phase와 상태 확인
kubectl get pod web -o \\
  jsonpath='{.status.phase}'

# 컨테이너 종료 원인
kubectl get pod web -o \\
  jsonpath='{.status.containerStatuses[*].state}'

# 종료 로그 보기
kubectl logs web --previous`,
    lang: "bash",
  },
  {
    id: "WL-014",
    type: "WORKLOAD",
    chapter: "WORKLOADS",
    level: "CORE",
    nameEn: "DEPLOYMENTS",
    nameKo: "디플로이먼트",
    visual: "deploy",
    icon: "DEP",
    attrs: ["RollingUpdate", "ReplicaSet"],
    atk: "선언적 롤아웃",
    def: "롤백 지원",
    effect:
      "Deployment는 ReplicaSet을 관리하며, 레플리카 수 유지와 이미지/설정 변경 시 롤링 업데이트를 수행한다.",
    flavor: "디플로이먼트는 '점진적 변화'를 다스린다.",
    detail:
      "Deployment는 Pod 템플릿이 바뀌면 새 ReplicaSet을 만들고, 이전 ReplicaSet의 Pod를 점진히 줄이면서 새 것을 늘린다. maxSurge와 maxUnavailable로 속도를 조절한다. rollout undo/ history로 이전 Revision으로 롤백할 수 있어, 무중단 배포와 손쉬운 복구를 동시에 지원한다.",
    code: `# Deployment 롤링 업데이트
kubectl set image deployment/web \\
  web=nginx:1.28

# 롤아웃 상태
kubectl rollout status deployment/web

# 이전 버전으로 롤백
kubectl rollout undo deployment/web
kubectl rollout history deployment/web`,
    lang: "bash",
  },
  {
    id: "WL-015",
    type: "WORKLOAD",
    chapter: "WORKLOADS",
    level: "CORE",
    nameEn: "REPLICASET",
    nameKo: "레플리카셋",
    visual: "deploy",
    icon: "RS",
    attrs: ["Replicas", "Selector"],
    atk: "레플리카 수 유지",
    def: "Pod 재생성",
    effect:
      "ReplicaSet은 셀렉터로 매칭된 Pod 수를 desired replicas에 맞게 유지한다. 보통 Deployment가 직접 관리한다.",
    flavor: "레플리카셋은 '정해진 수'를 지킨다.",
    detail:
      "ReplicaSet은 label selector로 대상 Pod를 식별하고, replicas 필드에 지정된 수를 유지한다. Pod가 사라지면 새 Pod를 만들고, 너무 많으면 삭제한다. 단독 사용보다 Deployment로 관리하는 것이 일반적이다 — Deployment가 ReplicaSet을 버전별로 보존해 롤백을 가능하게 한다.",
    code: `# ReplicaSet 정의
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.27`,
    lang: "yaml",
  },
  {
    id: "WL-016",
    type: "WORKLOAD",
    chapter: "WORKLOADS",
    level: "CORE",
    nameEn: "STATEFULSETS",
    nameKo: "스테이트풀셋",
    visual: "pod",
    icon: "STS",
    attrs: ["Stable ID", "PV"],
    atk: "순차 기동/종료",
    def: "고정 ID + 볼륨",
    effect:
      "StatefulSet은 각 Pod에 고정 이름(web-0, web-1)과 영구 볼륨을 부여해 순서와 상태가 중요한 워크로드를 지원한다.",
    flavor: "이름이 있고, 번호가 있고, 기억이 있다.",
    detail:
      "StatefulSet은 Pod에 순차적 인덱스(0,1,2...)를 부여하고, 각 Pod에 전용 PersistentVolumeClaim을 연결한다. 기동은 0부터 순차, 종료는 역순이다. Pod가 재스케줄되어도 이름과 볼륨이 유지되므로 데이터베이스, 메시지 큐처럼 각 인스턴스가 고유 식별성을 가져야 하는 워크로드에 적합하다.",
    code: `# StatefulSet 정의
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: db
spec:
  serviceName: db
  replicas: 3
  selector:
    matchLabels:
      app: db
  template:
    metadata:
      labels:
        app: db
    spec:
      containers:
        - name: db
          image: postgres:16
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi`,
    lang: "yaml",
  },
  {
    id: "WL-017",
    type: "WORKLOAD",
    chapter: "WORKLOADS",
    level: "CORE",
    nameEn: "DAEMONSET",
    nameKo: "데몬셋",
    visual: "deploy",
    icon: "DS",
    attrs: ["Per-Node", "Infra"],
    atk: "노드마다 1 Pod",
    def: "노드 자동 추적",
    effect:
      "DaemonSet은 (조건을 만족하는) 모든 노드에 Pod 복제본을 하나씩 실행해 노드 단위 인프라를 보장한다.",
    flavor: "모든 노드에 한 발, 한 발씩.",
    detail:
      "DaemonSet은 로그 수집기(Fluentd), 모니터링 에이전트(Node Exporter), 네트워크 플러그인(calico)처럼 모든 노드에서 실행돼야 하는 Pod에 사용한다. nodeSelector, affinity, toleration으로 대상 노드를 제한할 수 있고, 노드가 추가되면 자동으로 Pod가 배포된다.",
    code: `# DaemonSet 정의
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-agent
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: log-agent
  template:
    metadata:
      labels:
        app: log-agent
    spec:
      containers:
        - name: fluentd
          image: fluent/fluentd:v1.17
      tolerations:
        - operator: Exists  # 모든 taint 허용`,
    lang: "yaml",
  },
  {
    id: "WL-018",
    type: "WORKLOAD",
    chapter: "WORKLOADS",
    level: "CORE",
    nameEn: "JOBS & CRONJOBS",
    nameKo: "잡과 크론잡",
    visual: "pod",
    icon: "JOB",
    attrs: ["Batch", "Schedule"],
    atk: "완료 보장",
    def: "재시도 정책",
    effect:
      "Job은 Pod가 성공할 때까지 재시도하고, CronJob은 cron 표현식으로 Job을 주기적 실행한다.",
    flavor: "잡은 끝을 가진 작업, 크론잡은 시계.",
    detail:
      "Job은 completions(몇 개 성공할지)과 parallelism(동시 실행 수)을 지정해 배치 작업을 처리한다. Pod가 실패하면 backoffLimit까지 재시도한다. CronJob은 분 단위 cron 표현식으로 Job을 생성하며, concurrencyPolicy로 겹침 실행을 제어한다. 데이터 ETL, 백업, 정기 정산 같은 종료형 작업에 사용한다.",
    code: `# CronJob 정의
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-backup
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      backoffLimit: 3
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: backup
              image: backup-tool:1.0
              command: ["/backup.sh"]`,
    lang: "yaml",
  },
  {
    id: "NET-019",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "FOUNDATION",
    nameEn: "SERVICE",
    nameKo: "서비스",
    visual: "svc",
    icon: "SVC",
    attrs: ["Stable IP", "LoadBalance"],
    atk: "고정 ClusterIP",
    def: "셀렉터 라우팅",
    effect:
      "Service는 Pod 집합에 안정적인 IP/DNS 이름을 부여하고, 셀렉터로 트래픽을 로드밸런싱한다.",
    flavor: "Pod는 사라져도 서비스는 그 자리에.",
    detail:
      "Pod IP는 휘발적이므로 클라이언트가 직접 접근하면 안 된다. Service는 label selector로 대상 Pod를 찾고, ClusterIP(클러스터 내부), NodePort(노드 포트), LoadBalancer(클라우드 LB), ExternalName(DNS CNAME) 타입으로 노출한다. kube-proxy가 iptables/IPVS 규칙으로 트래픽을 Endpoints(Pod)로 분산한다.",
    code: `# Service 정의
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP  # NodePort, LoadBalancer`,
    lang: "yaml",
  },
  {
    id: "NET-020",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "CORE",
    nameEn: "INGRESS",
    nameKo: "인그레스",
    visual: "svc",
    icon: "ING",
    attrs: ["HTTP", "L7"],
    atk: "호스트/경로 라우팅",
    def: "TLS 종단",
    effect:
      "Ingress는 HTTP/HTTPS 트래픽을 호스트 이름과 경로 기반으로 클러스터 내 Service로 라우팅하는 L7 진입점이다.",
    flavor: "한 문으로 여러 서비스를 부른다.",
    detail:
      "Ingress는 호스트(host)와 경로(path) 규칙으로 트래픽을 Service로 보내며, TLS 종료도 처리한다. Ingress 자체는 규칙만 정의하고, Ingress Controller(NGINX, Traefik, ALB 등)가 실제 트래픽을 처리한다. Service가 L4라면 Ingress는 L7 계층의 부하 분산이자 진입 게이트웨이다.",
    code: `# Ingress 정의
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 80`,
    lang: "yaml",
  },
  {
    id: "NET-021",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "CORE",
    nameEn: "ENDPOINTSLICES",
    nameKo: "엔드포인트슬라이스",
    visual: "svc",
    icon: "EPS",
    attrs: ["Scalable", "Pod IPs"],
    atk: "최대 1000 Pod/슬라이스",
    def: "스케일 대응",
    effect:
      "EndpointSlice는 Service 뒤 Pod IP 목록을 여러 슬라이스(최대 100개)로 나눠 대규모 서비스에서도 효율적으로 엔드포인트를 관리한다.",
    flavor: "한 덩어리 대신, 잘게 썬 엔드포인트.",
    detail:
      "종전 Endpoints 리소스는 모든 Pod IP를 단일 오브젝트에 담아 한 Pod 변경 시 전체가 재전송되는 병목이 있었다. EndpointSlice는 슬라이스 단위(기본 100 Pod)로 분할해 watch 부하를 줄이고, 토폴로지(topology) 정보를 포함해 토폴로지 인식 라우팅을 지원한다. kube-proxy는 이를 기반으로 로드밸런싱 규칙을 만든다.",
    code: `# 특정 서비스의 EndpointSlice 확인
kubectl get endpointslice -l \\
  kubernetes.io/service-name=web

# 슬라이스 상세 (Pod IP와 노드 정보)
kubectl describe endpointslice web-abc | head -40

# 엔드포인트 개수
kubectl get endpointslice -l \\
  kubernetes.io/service-name=web -o \\
  jsonpath='{.items[*].endpoints}'`,
    lang: "bash",
  },
  {
    id: "NET-022",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "CORE",
    nameEn: "NETWORK POLICIES",
    nameKo: "네트워크 폴리시",
    visual: "svc",
    icon: "NP",
    attrs: ["Firewall", "L3/L4"],
    atk: "허용 트래픽 지정",
    def: "기본 차단",
    effect:
      "NetworkPolicy는 Pod 간 트래픽을 네임스페이스/레이블 기반으로 허용(Allow)하여 기본 차단 환경을 만든다.",
    flavor: "열어주지 않으면 닫혀 있다.",
    detail:
      "기본적으로 클러스터 내 모든 Pod는 서로 통신할 수 있다. NetworkPolicy는 ingress/egress 규칙을 지정해 특정 Pod(레이블/네임스페이스)와 포트로만 트래픽을 허용한다. 정책이 적용되면 명시된 트래픽만 허용되므로 사실상 Pod 방화벽 역할을 한다. CNI 플러그인(Calico, Cilium 등)이 정책을 실제로 적용한다.",
    code: `# NetworkPolicy 정의
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-allow-web
spec:
  podSelector:
    matchLabels:
      app: db
  policyTypes: [Ingress]
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: web
      ports:
        - protocol: TCP
          port: 5432`,
    lang: "yaml",
  },
  {
    id: "NET-023",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "CORE",
    nameEn: "DNS FOR SERVICES",
    nameKo: "서비스 DNS",
    visual: "svc",
    icon: "DNS",
    attrs: ["CoreDNS", "Name"],
    atk: "자동 DNS 등록",
    def: "Pod DNS 검색",
    effect:
      "Service와 Pod는 자동으로 DNS 레코드를 받아, 클라이언트가 서비스 이름으로 안정적으로 접근할 수 있다.",
    flavor: "이름이 곧 주소.",
    detail:
      "ClusterIP 서비스는 <service>.<namespace>.svc.cluster.local 형태의 A/AAAA 레코드를 받는다. Headless 서비스(ClusterIP: None)는 Pod IP를 직접 반환한다. StatefulSet Pod는 <pod-name>.<service>.<namespace> 형태로 개별 DNS를 가져, 서비스 디스커버리에 매우 유용하다. CoreDNS가 기본 DNS 서버다.",
    code: `# 서비스 DNS 확인
kubectl exec -it debug -- \\
  nslookup web.default.svc.cluster.local

# StatefulSet Pod 개별 DNS
kubectl exec -it debug -- \\
  nslookup db-0.db.default.svc.cluster.local

# Pod의 DNS 설정 확인
kubectl exec -it debug -- cat /etc/resolv.conf`,
    lang: "bash",
  },
  {
    id: "NET-024",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "ADVANCED",
    nameEn: "GATEWAY API",
    nameKo: "게이트웨이 API",
    visual: "svc",
    icon: "GW",
    attrs: ["L7", "Vendor-neutral"],
    atk: "GatewayClass/HTTPRoute",
    def: "역할 분리",
    effect:
      "Gateway API는 HTTPRoute, GatewayClass, Gateway로 L7 트래픽 관리를 벤더 중립적이고 역할 기반으로 표준화한다.",
    flavor: "인그레스의 다음 세대.",
    detail:
      "Gateway API는 Ingress의 한계(복잡한 어노테이션, 벤더별 분화)를 넘어, HTTPRoute/TCPRoute/GRPCRoute로 트래픽 규칙을, Gateway로 진입점을, GatewayClass로 인프라 구현을 분리한다. 'Infra Provider / Cluster Operator / App Developer' 역할을 나눠 관리할 수 있어 대규모 멀티테넌트 환경에 적합하다.",
    code: `# Gateway + HTTPRoute 정의
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: web-gateway
spec:
  gatewayClassName: cilium
  listeners:
    - name: http
      port: 80
      protocol: HTTP
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: web-route
spec:
  parentRefs:
    - name: web-gateway
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /api
      backendRefs:
        - name: api
          port: 80`,
    lang: "yaml",
  },
  {
    id: "ST-025",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "FOUNDATION",
    nameEn: "VOLUMES",
    nameKo: "볼륨",
    visual: "pv",
    icon: "VOL",
    attrs: ["Pod-scoped", "Mount"],
    atk: "Pod 내 컨테이너 공유",
    def: "Pod 소멸 시 사라짐",
    effect:
      "Volume은 Pod 내 컨테이너들이 데이터를 공유하고 임시 저장하기 위한 마운트 지점이다. Pod가 사라지면 같이 사라진다.",
    flavor: "볼륨은 파드 안의 작은 창고.",
    detail:
      "emptyDir(임시), hostPath(노드 경로), configMap/secret(설정 주입) 등 다양한 볼륨 타입이 있다. emptyDir은 Pod가 노드에 할당될 때 생성되고, Pod가 삭제되면 같이 사라진다. 컨테이너 재시작에도 데이터가 유지되므로 같은 Pod 내 컨테이너 간 데이터 공유에 적합하지만, 영구 저장에는 부적합하다.",
    code: `# emptyDir 볼륨 정의
apiVersion: v1
kind: Pod
metadata:
  name: shared
spec:
  containers:
    - name: writer
      image: busybox
      volumeMounts:
        - name: data
          mountPath: /out
    - name: reader
      image: busybox
      volumeMounts:
        - name: data
          mountPath: /in
  volumes:
    - name: data
      emptyDir: {}`,
    lang: "yaml",
  },
  {
    id: "ST-026",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "CORE",
    nameEn: "PERSISTENT VOLUMES",
    nameKo: "퍼시스턴트 볼륨",
    visual: "pv",
    icon: "PV",
    attrs: ["Cluster", "Persistent"],
    atk: "PV ↔ PVC 바인딩",
    def: "Reclaim 정책",
    effect:
      "PersistentVolume은 클러스터 범위 스토리지 리소스이고, PVC는 Pod가 이를 요청하는 수단이다. Pod가 사라져도 데이터가 유지된다.",
    flavor: "데이터는 Pod보다 오래 산다.",
    detail:
      "PV는 관리자가 프로비저닝하거나 StorageClass로 동적 생성된다. PVC는 사용자가 용량/접근 모드를 요청하면 PV와 바인딩된다. accessModes에는 ReadWriteOnce, ReadOnlyMany, ReadWriteMany가 있고, persistentVolumeReclaimPolicy(Retain/Recycle/Delete)로 바인딩 해제 후 처리를 결정한다. StatefulSet의 volumeClaimTemplates와 잘 어울린다.",
    code: `# PVC 정의
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: standard
  resources:
    requests:
      storage: 10Gi

# Pod에 PVC 마운트
#   volumes:
#     - name: data
#       persistentVolumeClaim:
#         claimName: data`,
    lang: "yaml",
  },
  {
    id: "ST-027",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "CORE",
    nameEn: "STORAGE CLASSES",
    nameKo: "스토리지 클래스",
    visual: "pv",
    icon: "SC",
    attrs: ["Dynamic", "Provisioner"],
    atk: "온디맨드 프로비저닝",
    def: "볼륨 속성 템플릿",
    effect:
      "StorageClass는 provisioner와 파라미터를 정의해 PVC가 생성될 때 PV를 자동으로 동적 프로비저닝한다.",
    flavor: "요청하면, 곧바로 만들어 준다.",
    detail:
      "정적 PV는 사전에 관리자가 만들어야 하지만, StorageClass를 사용하면 PVC 생성 시 provisioner(예: kubernetes.io/aws-ebs, driver.longhorn.io)가 클라우드/분산 스토리지에 볼륨을 동적으로 생성한다. volumeBindingMode(WaitForFirstConsumer)로 Pod 스케줄까지 대기해, 토폴로지 제약을 만족하는 노드에 볼륨을 만들 수 있다.",
    code: `# StorageClass 정의
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  fsType: ext4
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete`,
    lang: "yaml",
  },
  {
    id: "ST-028",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "ADVANCED",
    nameEn: "VOLUME SNAPSHOTS",
    nameKo: "볼륨 스냅샷",
    visual: "pv",
    icon: "SNAP",
    attrs: ["Backup", "CSI"],
    atk: "PVC 기반 스냅샷",
    def: "복원 가능",
    effect:
      "VolumeSnapshot/VolumeSnapshotContent는 CSI 드라이버를 통해 PVC의 시점 스냅샷을 생성·복원한다.",
    flavor: "한 순간의 데이터를 보관한다.",
    detail:
      "VolumeSnapshot은 사용자가 PVC의 스냅샷을 요청하는 리소스이고, VolumeSnapshotContent는 실제 스토리지 백엔드의 스냅샷을 가리킨다. 스냅샷에서 새 PVC를 만들 수 있어 백업·복제·롤백 시나리오에 사용된다. CSI 드라이버가 이 기능을 지원해야 하며, 스토리지 백엔드의 스냅샷 기능 위에서 동작한다.",
    code: `# PVC 스냅샷 생성
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: db-snap
spec:
  volumeSnapshotClassName: csi-snap
  source:
    persistentVolumeClaimName: db-data

# 스냅샷에서 새 PVC 복원
#   persistentVolumeClaimName 대신
#   dataSource: snapshot으로 지정`,
    lang: "yaml",
  },
  {
    id: "ST-029",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "ADVANCED",
    nameEn: "PROJECTED VOLUMES",
    nameKo: "프로젝티드 볼륨",
    visual: "pv",
    icon: "PRJ",
    attrs: ["Aggregate", "Composite"],
    atk: "여러 소스 통합",
    def: "단일 마운트",
    effect:
      "projected volume은 ConfigMap, Secret, downwardAPI, serviceAccountToken 등 여러 소스를 하나의 디렉터리에 합쳐 마운트한다.",
    flavor: "여러 소스를 한 곳으로.",
    detail:
      "같은 Pod에서 ConfigMap + Secret + downwardAPI를 각각 볼륨으로 마운트하면 여러 마운트 지점이 생긴다. projected 볼륨은 sources 배열로 여러 리소스를 하나의 디렉터리에 통합한다. 예를 들어 /etc/app에 설정과 인증서를 함께 두고 싶을 때 유용하다. 성능은 개별 볼륨과 같다.",
    code: `# projected volume 정의
volumes:
  - name: combined
    projected:
      sources:
        - configMap:
            name: app-config
        - secret:
            name: app-tls
        - downwardAPI:
            items:
              - path: labels
                fieldRef:
                  fieldPath: metadata.labels`,
    lang: "yaml",
  },
  {
    id: "CFG-030",
    type: "CONFIG",
    chapter: "CONFIGURATION",
    level: "FOUNDATION",
    nameEn: "CONFIGMAPS",
    nameKo: "컨피그맵",
    visual: "config",
    icon: "CFG",
    attrs: ["Config", "Non-secret"],
    atk: "key-value 설정",
    def: "환경변수/볼륨",
    effect:
      "ConfigMap은 비밀이 아닌 설정 데이터를 key-value로 저장해, 환경 변수나 파일로 컨테이너에 주입한다.",
    flavor: "코드는 이미지에, 설정은 컨피그맵에.",
    detail:
      "ConfigMap은 문자열/바이너리 값을 키-값으로 저장한다. 컨테이너는 환경 변수(env)나 볼륨 마운트로 이 값을 읽는다. 이미지를 다시 빌드하지 않고 설정만 교체할 수 있어 환경별 프로파일(dev/staging/prod) 관리에 적합하다. 비밀 데이터는 절대 ConfigMap에 두지 말고 Secret을 사용한다.",
    code: `# ConfigMap 정의
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "db.default.svc"
  LOG_LEVEL: "info"
  config.yaml: |
    server:
      port: 8080
      timeout: 30s

# Pod에서 환경변수로 주입
#   envFrom:
#     - configMapRef:
#         name: app-config`,
    lang: "yaml",
  },
  {
    id: "CFG-031",
    type: "CONFIG",
    chapter: "CONFIGURATION",
    level: "FOUNDATION",
    nameEn: "SECRETS",
    nameKo: "시크릿",
    visual: "config",
    icon: "SEC",
    attrs: ["Sensitive", "base64"],
    atk: "인증서/패스워드",
    def: "볼륨/환경변수",
    effect:
      "Secret은 패스워드, 토큰, TLS 인증서 같은 민감 정보를 base64 인코딩으로 저장하고 Pod에 안전하게 전달한다.",
    flavor: "컨피그맵의 비밀 친척 — 하지만 더 조심.",
    detail:
      "Secret은 같은 크기 제한(기본 1MiB)을 가지지만, etcd에 별도로 저장되며 RBAC로 접근이 제한된다. 값은 base64로 인코딩되어 저장되지만 암호화는 아니므로, 저장 시 암호화(Encryption at Rest) 설정을 권장한다. 환경변수보다 파일(볼륨) 마운트가 더 안전하며, 사용 후 메모리에서 지워진다.",
    code: `# Secret 정의
apiVersion: v1
kind: Secret
metadata:
  name: db-cred
type: Opaque
stringData:
  username: "admin"
  password: "s3cr3t!"

# Pod에서 파일로 마운트 (더 안전)
#   volumes:
#     - name: cred
#       secret:
#         secretName: db-cred`,
    lang: "yaml",
  },
  {
    id: "CFG-032",
    type: "CONFIG",
    chapter: "CONFIGURATION",
    level: "CORE",
    nameEn: "RESOURCE MANAGEMENT",
    nameKo: "리소스 관리",
    visual: "config",
    icon: "RES",
    attrs: ["Requests", "Limits"],
    atk: "requests/limits",
    def: "QoS 등급",
    effect:
      "컨테이너에 CPU/메모리 requests와 limits를 지정해 스케줄링과 자원 보장, 그리고 QoS 등급을 결정한다.",
    flavor: "자원을 약속하고, 한계를 정한다.",
    detail:
      "requests는 스케줄러가 노드를 고를 때 보장할 자원량이고, limits는 그 컨테이너가 쓸 수 있는 최대치다. CPU limit 초과 시 throttle, 메모리 limit 초과 시 OOMKill된다. requests=limits면 Guaranteed QoS(가장 높음), requests만 설정하면 Burstable, 둘 다 없으면 BestEffort(첫 퇴거 대상)로 분류된다.",
    code: `# 리소스 요청/제한
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"

# 노드의 전체/할당 가능 자원
kubectl describe node worker-1 | grep -A5 Capacity`,
    lang: "yaml",
  },
  {
    id: "CFG-033",
    type: "CONFIG",
    chapter: "CONFIGURATION",
    level: "CORE",
    nameEn: "KUBECONFIG",
    nameKo: "kubeconfig 파일",
    visual: "config",
    icon: "CFG",
    attrs: ["Context", "Cluster"],
    atk: "클러스터/사용자/컨텍스트",
    def: "API 접근",
    effect:
      "kubeconfig는 클러스터, 사용자, 컨텍스트 정보를 담아 kubectl이 API 서버에 접근할 때 사용하는 설정 파일이다.",
    flavor: "kubectl의 열쇠 꾸러미.",
    detail:
      "기본 위치는 ~/.kube/config다. clusters(서버 URL/CA), users(인증서/토큰), contexts(cluster+user+namespace 조합)를 정의한다. kubectl config use-context로 전환한다. 여러 클러스터/환경(dev/staging/prod)을 운영할 때 KUBECONFIG 환경변수나 파일 병합으로 관리한다.",
    code: `# 현재 컨텍스트 확인
kubectl config current-context

# 클러스터/컨텍스트 목록
kubectl config get-contexts

# 새 클러스터 추가
kubectl config set-cluster prod \\
  --server=https://api.prod:6443 \\
  --certificate-authority=ca.crt

# 컨텍스트 전환
kubectl config use-context prod`,
    lang: "bash",
  },
  {
    id: "SCH-034",
    type: "SCHED",
    chapter: "SCHEDULING & EVICTION",
    level: "CORE",
    nameEn: "KUBE-SCHEDULER",
    nameKo: "스케줄러",
    visual: "sched",
    icon: "SCH",
    attrs: ["Filter", "Score"],
    atk: "노드 후보 필터링",
    def: "최적 노드 선택",
    effect:
      "kube-scheduler는 자원 요청, affinity, taint/toleration, policy를 평가해 Pod를 배치할 최적의 노드를 선택한다.",
    flavor: "Pod가 어디로 갈지 결정하는 안내자.",
    detail:
      "스케줄러는 Filter 단계(자원 부족, taint 불일치, affinity 위반 등을 제거)와 Score 단계(잔여 자원,亲和性 가중치)를 거쳐 노드를 선택한다. 사용자는 nodeSelector, nodeAffinity, podAffinity/antiAffinity, toleration, priorityClass, topologySpreadConstraints로 스케줄링 의도를 표현한다. 스케줄링 프레임워크로 각 단계를 확장할 수 있다.",
    code: `# 노드 셀렉터
spec:
  nodeSelector:
    disktype: ssd

# 노드 어피니티 (고급)
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: zone
                operator: In
                values: [ap-northeast-2a]`,
    lang: "yaml",
  },
  {
    id: "SCH-035",
    type: "SCHED",
    chapter: "SCHEDULING & EVICTION",
    level: "CORE",
    nameEn: "TAINTS & TOLERATIONS",
    nameKo: "테인트와 톨러레이션",
    visual: "sched",
    icon: "TNT",
    attrs: ["Repel", "Tolerate"],
    atk: "노드가 Pod를 밀어냄",
    def: "Pod가 taint를 견딤",
    effect:
      "taint는 노드가 특정 Pod만 허용하도록 표시하고, toleration은 Pod가 그 taint를 견딜 수 있음을 선언한다.",
    flavor: "노드는 '거부'를, 파드는 '인내'를 말한다.",
    detail:
      "node-control-plane 노드는 NoSchedule taint가 있어 일반 Pod가 스케줄되지 않는다. 전용 노드(GPU, 빌드 머신)에 taint를 부여하고, 허용할 Pod에 toleration을 지정하면 그 Pod만 그 노드에 배포된다. NoExecute taint는 이미 실행 중인 Pod도 퇴거시킨다. tolerations와 nodeSelector/affinity를 함께 쓰면 '전용 노드'를 정교히 구성한다.",
    code: `# 노드에 taint 부여
kubectl taint nodes gpu-node gpu=true:NoSchedule

# Pod에 toleration 지정
spec:
  tolerations:
    - key: "gpu"
      operator: "Equal"
      value: "true"
      effect: "NoSchedule"

# taint 제거
kubectl taint nodes gpu-node gpu=true:NoSchedule-`,
    lang: "bash",
  },
  {
    id: "SCH-036",
    type: "SCHED",
    chapter: "SCHEDULING & EVICTION",
    level: "ADVANCED",
    nameEn: "POD PRIORITY & PREEMPTION",
    nameKo: "파드 우선순위와 선점",
    visual: "sched",
    icon: "PRIO",
    attrs: ["PriorityClass", "Evict"],
    atk: "높은 우선순위 먼저",
    def: "낮은 Pod 퇴거",
    effect:
      "PriorityClass로 Pod에 우선순위를 부여하고, 자원 부족 시 스케줄러가 낮은 우선순위 Pod를 퇴거(preempt)해 높은 Pod를 실행한다.",
    flavor: "긴한 일이 먼저 자리를 차지한다.",
    detail:
      "PriorityClass는 globalDefault 여부로 기본 우선순위를 정한다. 자원이 부족해 높은 우선순위 Pod를 스케줄할 수 없으면, 스케줄러는 낮은 우선순위 Pod를 퇴거시켜 자원을 확보한다. 시스템 컴포넌트는 system-critical/system-node-critical 우선순위로 보호된다. 노드 압박으로 인한 퇴거(node-pressure eviction)는 별도 메커니즘이다.",
    code: `# PriorityClass 정의
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
description: "프로덕션 주요 워크로드"

# Pod에서 참조
#   priorityClassName: high-priority`,
    lang: "yaml",
  },
  {
    id: "SEC-037",
    type: "SECURITY",
    chapter: "SECURITY",
    level: "CORE",
    nameEn: "RBAC",
    nameKo: "RBAC (역할 기반 접근 제어)",
    visual: "rbac",
    icon: "RBAC",
    attrs: ["Role", "Binding"],
    atk: "verbs(허용 동작)",
    def: "리소스 범위",
    effect:
      "Role/ClusterRole로 권한을 정의하고, RoleBinding/ClusterRoleBinding으로 사용자/그룹/SA에 권한을 부여한다.",
    flavor: "누가 무엇을 할 수 있는가.",
    detail:
      "Role은 네임스페이스 범위, ClusterRole은 클러스터 범위 권한 묶음이다. apiGroups, resources, verbs를 통해 'apps 그룹의 deployments를 get/list/patch 가능' 같은 권한을 선언한다. RoleBinding은 특정 네임스페이스에, ClusterRoleBinding은 전체 클러스터에 바인딩한다. 최소 권한 원칙으로 별도 Role을 만들고 ServiceAccount에 연결하는 패턴이 권장된다.",
    code: `# Role 정의
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
---
# ServiceAccount에 바인딩
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
subjects:
  - kind: ServiceAccount
    name: app-sa
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io`,
    lang: "yaml",
  },
  {
    id: "SEC-038",
    type: "SECURITY",
    chapter: "SECURITY",
    level: "CORE",
    nameEn: "SERVICE ACCOUNTS",
    nameKo: "서비스 어카운트",
    visual: "rbac",
    icon: "SA",
    attrs: ["Pod identity", "Token"],
    atk: "Pod API 신원",
    def: "RBAC 연결",
    effect:
      "ServiceAccount는 Pod가 클러스터 API에 접근할 때 사용하는 신원으로, 자동 마운트된 토큰으로 인증한다.",
    flavor: "사람이 아닌 파드를 위한 계정.",
    detail:
      "각 Pod는 네임스페이스의 한 ServiceAccount를 할당받는다(미지정 시 default SA). 자동으로 마운트되는 토큰(/var/run/secrets/kubernetes.io/serviceaccount/token)으로 API를 호출한다. projected serviceAccountToken(v1.24+)은 영구 토큰 대신 만료 시간이 있는 단기 토큰을 발급해 보안을 강화한다. 권한 제어는 RBAC RoleBinding과 연결된다.",
    code: `# ServiceAccount 생성
kubectl create sa app-sa -n default

# Pod에 SA 지정
#   spec:
#     serviceAccountName: app-sa

# 현재 Pod의 SA 토큰 확인
kubectl exec -it web -- \\
  cat /var/run/secrets/kubernetes.io/ \\
  serviceaccount/token

# SA별 바인딩된 권한 확인
kubectl auth can-i --list --as=system:serviceaccount:default:app-sa`,
    lang: "bash",
  },
  {
    id: "SEC-039",
    type: "SECURITY",
    chapter: "SECURITY",
    level: "CORE",
    nameEn: "POD SECURITY STANDARDS",
    nameKo: "파드 보안 표준",
    visual: "pod",
    icon: "PSS",
    attrs: ["Privileged", "Restricted"],
    atk: "권한 축소 정책",
    def: "네임스페이스 강제",
    effect:
      "Pod Security Standards(privileged/baseline/restricted)로 네임스페이스별 Pod 보안 수준을 정하고 어드미션으로 강제한다.",
    flavor: "네임스페이스마다 보안 울타리를 정한다.",
    detail:
      "privileged(제한 없음), baseline(최소 보호), restricted(엄격) 세 가지 프로파일을 네임스페이스 라벨(pod-security.kubernetes.io/enforce=restricted)로 지정한다. PodSecurity Admission 컨트롤러가 이를 평가해 위반 Pod를 거부한다. 기존 PodSecurityPolicy(삭제됨)를 대체하는 내장 메커니즘이다.",
    code: `# 네임스페이스 보안 프로파일 강제
apiVersion: v1
kind: Namespace
metadata:
  name: prod
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted

# restricted 위반 여부 점검
kubectl label ns prod \\
  pod-security.kubernetes.io/enforce=restricted \\
  --overwrite`,
    lang: "yaml",
  },
  {
    id: "SEC-040",
    type: "SECURITY",
    chapter: "SECURITY",
    level: "ADVANCED",
    nameEn: "CONTROLLING API ACCESS",
    nameKo: "API 접근 제어",
    visual: "rbac",
    icon: "API",
    attrs: ["Authn", "Authz"],
    atk: "인증 → 인가 → 어드미션",
    def: "감사(audit)",
    effect:
      "모든 API 요청은 인증(Authentication) → 인가(Authorization/RBAC) → 어드미션 컨트롤러 단계를 거쳐 etcd에 기록된다.",
    flavor: "API 서버는 세 겹의 문을 지킨다.",
    detail:
      "kube-apiserver는 먼저 요청자를 인증(x509 인증서, OIDC, 서비스 계정 토큰 등)한다. 이후 RBAC/ABAC/Node 인가자로 권한을 검사한다. 통과하면 Mutating/Webhook 어드미션 컨트롤러가 객체를 수정/검증한다. 모든 단계는 audit 로그로 기록될 수 있어, 클러스터의 모든 변경이 추적 가능하다. 보안의 단일 통제점이 API 서버인 이유다.",
    code: `# API 접근 권한 점검
kubectl auth can-i create deployments -n prod
kubectl auth can-i --as=alice \\
  delete pods -n prod

# 감사 로그 위치
# /var/log/kubernetes/audit/audit.log
# --audit-log-path 옵션으로 활성화

# API 서버 인증 방식 확인
kubectl get pod -n kube-system \\
  -l component=kube-apiserver -o \\
  jsonpath='{.items[*].spec.containers[*].command}'`,
    lang: "bash",
  },

  // 41 ~ 80: ADVANCED — Pods, Probes, Scheduling, Storage, Security, Extending
  {
    id: "WL-041",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "INIT CONTAINERS",
    nameKo: "init 컨테이너",
    visual: "pod",
    icon: "INIT",
    attrs: ["Pre-run", "Sequential"],
    atk: "앱 컨테이너 이전 실행",
    def: "완료 후 종료",
    effect:
      "init 컨테이너는 앱 컨테이너보다 먼저 순차 실행되어, 데이터 준비·마이그레이션·대기 작업을 완료한 뒤 종료된다.",
    flavor: "무대 위에 오르기 전, 무대 뒤의 준비자.",
    detail:
      "init 컨테이너는 같은 Pod의 다른 컨테이너보다 항상 먼저 실행되며, 여러 개일 경우 선언 순서대로 하나씩 실행된다. 반드시 성공(exit 0)해야 다음 단계로 진행되므로, DB 마이그레이션·권한 설정·원격 파일 다운로드 같은 사전 조건 검증에 적합하다. 실패하면 Pod 전체가 재시작되며, 리소스는 가장 큰 init 컨테이너 기준으로 계산된다.",
    code: `# init 컨테이너 정의
spec:
  initContainers:
    - name: setup
      image: busybox
      command: ["sh", "-c", "until nslookup db; do sleep 2; done"]
    - name: migrate
      image: migrate-tool:1.0
      command: ["/migrate.sh"]
  containers:
    - name: app
      image: app:1.0`,
    lang: "yaml",
  },
  {
    id: "WL-042",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "SIDECAR CONTAINERS",
    nameKo: "사이드카 컨테이너",
    visual: "pod",
    icon: "SIDE",
    attrs: ["Co-located", "Aux"],
    atk: "보조 기능 분리",
    def: "Pod 내 공유",
    effect:
      "사이드카는 메인 컨테이너와 같은 Pod에서 로깅·프록시·메트릭 같은 보조 기능을 담당해 모듈성과 재사용성을 높인다.",
    flavor: "주인 옆에서 조용히 돕는 조수.",
    detail:
      "메인 앱 코드를 수정하지 않고, 같은 Pod에 보조 컨테이너를 추가해 부가 기능을 붙인다. 예: Envoy 사이드카로 mTLS, Fluentd로 로그 수집, Prometheus exporter로 메트릭 노출. K8s 1.28+에서는 init 컨테이너에 restartPolicy: Always를 주면 'native sidecar'로 동작해, 사이드카가 앱 컨테이너보다 먼저 시작하고 늦게 종료되도록 보장한다.",
    code: `# native sidecar (restartPolicy: Always)
spec:
  initContainers:
    - name: envoy
      image: envoyproxy/envoy:v1.30
      restartPolicy: Always  # 사이드카로 승격
      ports:
        - containerPort: 15000
  containers:
    - name: app
      image: app:1.0`,
    lang: "yaml",
  },
  {
    id: "WL-043",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "EPHEMERAL CONTAINERS",
    nameKo: "에피머럴 컨테이너",
    visual: "pod",
    icon: "EPH",
    attrs: ["Debug", "Temporary"],
    atk: "일시적 디버깐",
    def: "재시작 없음",
    effect:
      "ephemeral container는 디버깅 목적으로 이미 실행 중인 Pod에 일시적으로 추가되는 컨테이너다. 재시작 정책이 없다.",
    flavor: "살아 있는 파드에 잠시 끼워 넣는 손.",
    detail:
      "디버깅 툴이 없는 프로덕션 이미지(crash pod)에 임시로 디버깐 컨테이너를 붙일 수 있다. PodSpec을 수정하는 게 아니라 ephemeralcontainers 하위 리소스로 POST해 추가한다. resources, ports, restartPolicy 등을 지정할 수 없고, Pod 재시작에도 유지되지 않는다. kubectl debug 명령으로 편하게 사용한다.",
    code: `# 실행 중인 Pod에 디버그 컨테이너 추가
kubectl debug -it web-abc \\
  --image=busybox:1.36 \\
  --target=web

# 컨테이너 목록에서 ephemeral 확인
kubectl describe pod web-abc | grep -A3 Ephemeral

# 공유 네임스페이스로 프로세스 디버깅
kubectl debug -it web-abc \\
  --image=nicolaka/netshoot \\
  --target=web --profile=sysadmin`,
    lang: "bash",
  },
  {
    id: "WL-044",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "LIVENESS/READINESS/STARTUP PROBES",
    nameKo: "프로브(Liveness/Readiness/Startup)",
    visual: "probe",
    icon: "PROBE",
    attrs: ["Health", "Traffic gate"],
    atk: "Liveness 재시작",
    def: "Readiness 트래픽 제어",
    effect:
      "Liveness는 컨테이너 재시작, Readiness는 Service 트래픽 수신 여부, Startup은 초기화 완료까지 다른 프로브를 대기시킨다.",
    flavor: "파드의 세 가지 맥박.",
    detail:
      "Liveness probe 실패 → kubelet이 컨테이너 재시작. Readiness probe 실패 → Service Endpoints에서 제외(트래픽 안 받음, 재시작은 안 함). Startup probe는 느리게 시작하는 앱(Java, 레거시)에서 liveness보다 먼저 평가되며, 성공 전까지 liveness/readiness를 평가하지 않는다. probe 종류는 httpGet, tcpSocket, exec 세 가지.",
    code: `# 세 종류 프로브 정의
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  failureThreshold: 3
startupProbe:
  httpGet:
    path: /startup
    port: 8080
  failureThreshold: 30
  periodSeconds: 10  # 최대 300초 대기`,
    lang: "yaml",
  },
  {
    id: "WL-045",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "POD DISRUPTIONS (PDB)",
    nameKo: "파드 중단 예산 (PDB)",
    visual: "pod",
    icon: "PDB",
    attrs: ["Voluntary", "Quorum"],
    atk: "minAvailable 보장",
    def: "maxUnavailable 한계",
    effect:
      "PodDisruptionBudget은 자발적 중단(drain, 업데이트) 중에도 minAvailable/maxUnavailable 수의 Pod가 살아있도록 보장한다.",
    flavor: "장애는 계획되어야 한다.",
    detail:
      "중단은 자발적(노드 드레인, 클러스터 오토스케일러)과 비자발적(하드웨어 장애)으로 나뉜다. PDB는 자발적 중단에만 적용된다. minAvailable: 2면 최소 2개 Pod는 항상 가동해야 drain이 허용되고, maxUnavailable: 1이면 동시에 1개까지만 중단 가능하다. 쿼럼이 필요한 DB, ETCD 클러스터에 필수적이다.",
    code: `# PodDisruptionBudget 정의
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: db-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: db

# 노드 드레인 시 PDB 검사
kubectl drain worker-1 \\
  --ignore-daemonsets \\
  --delete-emptydir-data

# PDB 상태 확인
kubectl get pdb db-pdb`,
    lang: "yaml",
  },
  {
    id: "WL-046",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "POD QOS CLASSES",
    nameKo: "파드 QoS 등급",
    visual: "qos",
    icon: "QoS",
    attrs: ["Guaranteed", "Burstable"],
    atk: "퇴거 우선순위",
    def: "자원 보장 수준",
    effect:
      "QoS는 requests/limits 설정에 따라 Guaranteed/Burstable/BestEffort로 분류되어 노드 압박 시 퇴거 순서를 결정한다.",
    flavor: "자원 약속의 세 등급.",
    detail:
      "Guaranteed: 모든 컨테이너에 CPU/메모리 requests=limits 설정 (가장 안정, 퇴거 마지막). Burstable: requests는 있으나 limits와 다르거나 일부만 설정. BestEffort: requests/limits 모두 없 (첫 퇴거 대상). 노드 메모리/디스크 압박 시 kubelet이 BestEffort → Burstable 순으로 Pod를 퇴거시킨다. Guaranteed Pod는 마지막까지 보호된다.",
    code: `# Guaranteed QoS (requests == limits)
resources:
  requests:
    cpu: "500m"
    memory: "512Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"

# QoS 등급 확인
kubectl get pod web -o \\
  jsonpath='{.status.qosClass}'

# 노드의 메모리 압박 상태
kubectl describe node worker-1 | grep -A5 MemoryPressure`,
    lang: "yaml",
  },
  {
    id: "WL-047",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "STATIC PODS",
    nameKo: "스태틱 파드",
    visual: "pod",
    icon: "STAT",
    attrs: ["kubelet", "No API"],
    atk: "노드 로컬 정의",
    def: "미러 Pod",
    effect:
      "Static Pod는 kubelet이 노드의 매니페스트 디렉터리를 감시해 직접 실행하는 Pod로, API 서버 없이 동작한다.",
    flavor: "API 서버 없이도 파드는 태어난다.",
    detail:
      "/etc/kubernetes/manifests(기본 경로)에 YAML을 두면 kubelet이 이를 읽어 Pod를 실행한다. 컨트롤 플레인 노드의 apiserver, etcd, controller-manager, scheduler가 모두 static Pod로 동작한다. API 서버에는 read-only 'mirror Pod'로 반영되어 상태는 관측 가능하지만, 제어는 노드에서 매니페스트로만 가능하다.",
    code: `# static pod 매니페스트 위치
ls /etc/kubernetes/manifests/

# kubelet 설정의 staticPodPath
# /var/lib/kubelet/config.yaml
# staticPodPath: /etc/kubernetes/manifests

# 미러 Pod 확인 (kube-system)
kubectl get pods -n kube-system \\
  -o wide | grep control-plane

# static pod 인지 확인
kubectl get pod -n kube-system etcd-ctrl \\
  -o jsonpath='{.metadata.annotations}' | grep kubernetes.io/config.`,
    lang: "bash",
  },
  {
    id: "WL-048",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "DOWNWARD API",
    nameKo: "다운워드 API",
    visual: "pod",
    icon: "DAPI",
    attrs: ["Metadata", "Inject"],
    atk: "Pod 자기 정보 주입",
    def: "레이블/어노테이션",
    effect:
      "DownwardAPI 볼륨/환경변수로 Pod의 메타데이터(이름, IP, 레이블, 자원 한계 등)를 컨테이너에 주입한다.",
    flavor: "파드가 자기 자신을 들여다본다.",
    detail:
      "Pod 이름, namespace, IP, UID, 레이블, 어노테이션, 자원 requests/limits 등을 환경변수나 파일로 컨테이너에 전달한다. 레이블/어노테이션은 환경변수로는 Pod 생성 시점의 스냅샷이지만, downwardAPI 볼륨으로 마운트하면 변경 사항이 live로 반영된다. 앱이 자신의 클러스터 맥락을 알아야 할 때 유용하다.",
    code: `# 환경변수로 주입
env:
  - name: POD_NAME
    valueFrom:
      fieldRef:
        fieldPath: metadata.name
  - name: POD_IP
    valueFrom:
      fieldRef:
        fieldPath: status.podIP
  - name: CPU_LIMIT
    valueFrom:
      resourceFieldRef:
        containerName: app
        resource: limits.cpu`,
    lang: "yaml",
  },
  {
    id: "WL-049",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "CONTAINER LIFECYCLE HOOKS",
    nameKo: "컨테이너 라이프사이클 훅",
    visual: "pod",
    icon: "HOOK",
    attrs: ["PostStart", "PreStop"],
    atk: "시작 시 훅",
    def: "종료 시 훅",
    effect:
      "PostStart와 PreStop 훅으로 컨테이너 시작 직후와 종료 직전에 명령이나 HTTP 요청을 실행한다.",
    flavor: "태어날 때와 떠날 때의 인사.",
    detail:
      "PostStart는 컨테이너 생성 직후 비동기로 실행되며, 완료 전까지 컨테이너 상태가 Running으로 넘어가지 않는다(실패 시 컨테이너는 RestartPolicy에 따라 재시작). PreStop은 종료 직전 실행되며, graceful shutdown(리소스 정리, 연결 종료 알림)에 사용한다. terminationGracePeriodSeconds 내에 완료해야 SIGKILL된다.",
    code: `# 라이프사이클 훅 정의
lifecycle:
  postStart:
    exec:
      command: ["/app/init.sh"]
  preStop:
    exec:
      command: ["/bin/sh", "-c", "nginx -s quit; sleep 10"]

# 종료 유예 시간
spec:
  terminationGracePeriodSeconds: 30  # 기본 30초`,
    lang: "yaml",
  },
  {
    id: "WL-050",
    type: "WORKLOAD",
    chapter: "WORKLOADS · PODS",
    level: "ADVANCED",
    nameEn: "RUNTIME CLASS",
    nameKo: "런타임 클래스",
    visual: "pod",
    icon: "RUN",
    attrs: ["Runtime", "gVisor/Kata"],
    atk: "런타임 선택",
    def: "격리 수준 제어",
    effect:
      "RuntimeClass는 Pod가 사용할 컨테이너 런타임(containerd, gVisor, Kata Containers)을 지정해 격리 수준을 선택한다.",
    flavor: "런타임도 선택지가 있다.",
    detail:
      "RuntimeClass는 클러스터에 여러 컨테이너 런타임 설정(예: runc, gVisor 샌드박스, Kata VM)을 노출한다. 신뢰할 수 없는 워크로드(멀티테넌트, 코드 실행 서비스)는 gVisor/Kata로 더 강한 격리를 제공하고, 일반 워크로드는 기본 runc로 성능을 취한다. PodSpec의 runtimeClassName으로 연결한다. 핸들러는 노드의 RuntimeClass 리소스로 정의된다.",
    code: `# RuntimeClass 정의
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: gvisor
handler: runsc  # containerd의 handler 이름

# Pod에서 참조
spec:
  runtimeClassName: gvisor
  containers:
    - name: untrusted
      image: sandbox:1.0`,
    lang: "yaml",
  },
  {
    id: "WL-051",
    type: "WORKLOAD",
    chapter: "WORKLOADS · AUTOSCALING",
    level: "ADVANCED",
    nameEn: "HORIZONTAL POD AUTOSCALER",
    nameKo: "수평 파드 오토스케일러 (HPA)",
    visual: "hpa",
    icon: "HPA",
    attrs: ["Scale-out", "Metrics"],
    atk: "CPU/메모리 기반 확장",
    def: "최소/최대 범위",
    effect:
      "HPA는 CPU/메모리 또는 커스텀 메트릭을 기반으로 Deployment/StatefulSet의 Pod 수를 자동으로 조정한다.",
    flavor: "부하가 오르면 늘리고, 내리면 줄인다.",
    detail:
      "HPA 컨트롤러는 Metrics Server/커스텀 메트릭 API를 주기적으로 폴링해, desired replicas = ceil(currentReplicas × currentMetric / targetMetric)로 계산한다. v2 버전에서는 CPU/메모리뿐 아니라 Requests Per Second, 큐 길이 같은 커스텀 메트릭과 외부 메트릭(AWS SQS 등)도 지원한다. minReplicas/maxReplicas로 안전 범위를 설정한다.",
    code: `# HPA v2 정의
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70

# HPA 상태 확인
kubectl get hpa web`,
    lang: "yaml",
  },
  {
    id: "WL-052",
    type: "WORKLOAD",
    chapter: "WORKLOADS · AUTOSCALING",
    level: "ADVANCED",
    nameEn: "VERTICAL POD AUTOSCALER",
    nameKo: "수직 파드 오토스케일러 (VPA)",
    visual: "hpa",
    icon: "VPA",
    attrs: ["Resize", "Recommend"],
    atk: "requests 자동 조정",
    def: "Pod 재생성",
    effect:
      "VPA는 관측된 사용량을 기반으로 Pod의 CPU/메모리 requests를 추천하고, 모드에 따라 자동으로 재조정한다.",
    flavor: "가로가 아니라 세로로 키운다.",
    detail:
      "VPA는 과거 사용량을 학습해 적정 requests를 추천한다. Update 모드는 Pod를 재생성해 새 requests를 적용하고(다운타임 발생), Off 모드는 추천만 보여주고 수동 적용, Initial 모드는 신규 Pod에만 추천 적용한다. HPA와 CPU/메모리 메트릭 충돌이 있으므로, 동일 리소스에 HPA+VPA CPU 동시 사용은 권장되지 않는다.",
    code: `# VPA 정의 (Off 모드 - 추천만)
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: web-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web
  updatePolicy:
    updateMode: "Off"  # Off / Initial / Auto

# 추천 값 확인
kubectl describe vpa web-vpa | grep -A8 Recommendation`,
    lang: "yaml",
  },
  {
    id: "SCH-053",
    type: "SCHED",
    chapter: "SCHEDULING & EVICTION",
    level: "ADVANCED",
    nameEn: "TOPOLOGY SPREAD",
    nameKo: "토폴로지 분산 제약",
    visual: "sched",
    icon: "TSC",
    attrs: ["Even", "Zone"],
    atk: "영역 균등 분산",
    def: "maxSkew 한계",
    effect:
      "topologySpreadConstraints는 Pod를 영역/노드/랙 같은 토폴로지 도메인에 균등하게 분산시킨다.",
    flavor: "알을 한 바구니에 다 담지 마라.",
    detail:
      "maxSkew로 도메인 간 최대 Pod 수 차이를 지정한다. 예: zone 라벨 기반 maxSkew: 1이면, 두 zone의 Pod 수 차이가 1 이하여야 새 Pod가 적은 쪽으로 스케줄된다. whenUnsatisfiable을 DoNotSchedule(하드) 또는 ScheduleAnyway(소프트)로 설정해, 고가용성을 위해 다중 영역/노드에 Pod를 골고루 배포한다. nodeAffinity와 함께 쓰면 정교한 배치가 가능하다.",
    code: `# 토폴로지 분산 제약
spec:
  topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: DoNotSchedule
      labelSelector:
        matchLabels:
          app: web
    - maxSkew: 1
      topologyKey: kubernetes.io/hostname
      whenUnsatisfiable: ScheduleAnyway
      labelSelector:
        matchLabels:
          app: web`,
    lang: "yaml",
  },
  {
    id: "SCH-054",
    type: "SCHED",
    chapter: "SCHEDULING & EVICTION",
    level: "ADVANCED",
    nameEn: "POD OVERHEAD",
    nameKo: "파드 오버헤드",
    visual: "sched",
    icon: "OH",
    attrs: ["Runtime", "Fixed"],
    atk: "컨테이너 외 자원",
    def: "스케줄링 반영",
    effect:
      "PodOverhead는 컨테이너 외 런타임 자원(gVisor/Kata 샌드박스 등)을 Pod 자원 요청에 더해 스케줄링에 반영한다.",
    flavor: "컨테이너만 자원을 쓰는 건 아니다.",
    detail:
      "PodOverhead는 RuntimeClass에 정의되어, Pod가 격리 런타임을 사용할 때 샌드박스 자체가 소비하는 CPU/메모리를 추가로 확보한다. 스케줄러는 requests + overhead를 노드 자원과 비교하고, kubelet/cgroup도 이 값을 포함해 컨테이너를 배치한다. 격리형 런타임(gVisor, Kata)이나 VM 기반 워크로드에서 노드 과배정을 막는다.",
    code: `# RuntimeClass에 overhead 정의
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: kata
handler: kata
overhead:
  podFixed:
    cpu: "250m"
    memory: "160Mi"

# Pod에서 사용
spec:
  runtimeClassName: kata`,
    lang: "yaml",
  },
  {
    id: "SCH-055",
    type: "SCHED",
    chapter: "SCHEDULING & EVICTION",
    level: "ADVANCED",
    nameEn: "POD SCHEDULING READINESS",
    nameKo: "파드 스케줄링 준비",
    visual: "sched",
    icon: "RDY",
    attrs: ["Gate", "Hold"],
    atk: "스케줄 보류",
    def: "게이트 해제",
    effect:
      "schedulingGates로 Pod를 '준비 안 됨' 상태로 보류시키고, 외부 컨트롤러가 게이트를 제거하면 스케줄링이 시작된다.",
    flavor: "출발선에 서되, 신호가 있기 전엔 뛰지 마라.",
    detail:
      "Pod에 spec.schedulingGates가 있으면 스케줄러가 이 Pod를 큐에 두되 노드에 할당하지 않는다. 외부 컨트롤러가 의존성(이미지 사전 다운로드, 리소스 사전 준비)을 만족시킨 뒤 게이트를 제거하면 스케줄이 진행된다. 대규모 배치나 Gang 스케줄링, 복잡한 선결 조건이 필요한 워크로드에서 활용한다. kubectl은 SchedulingGated 상태로 표시한다.",
    code: `# Pod 생성 시 게이트 추가
apiVersion: v1
kind: Pod
metadata:
  name: web
spec:
  schedulingGates:
    - name: example.com/prepare-data
  containers:
    - name: web
      image: nginx

# 외부에서 게이트 제거
kubectl patch pod web --type=json -p \\
  '[{"op":"replace","path":"/spec/schedulingGates","value":[]}]'`,
    lang: "yaml",
  },
  {
    id: "SCH-056",
    type: "SCHED",
    chapter: "SCHEDULING & EVICTION",
    level: "ADVANCED",
    nameEn: "NODE-PRESSURE EVICTION",
    nameKo: "노드 압박 퇴거",
    visual: "qos",
    icon: "EVI",
    attrs: ["kubelet", "Pressure"],
    atk: "메모리/디스크 부족",
    def: "QoS 순 퇴거",
    effect:
      "kubelet은 노드의 메모리/디스크/CPU 압박 상태에서 BestEffort → Burstable 순으로 Pod를 퇴거시킨다.",
    flavor: "배가 가라앉으면, 가벼운 짐부터 버린다.",
    detail:
      "kubelet은 노드의 eviction-hard/soft 임계값을 감시한다. 메모리 부족 시 BestEffort(자원 설정 없음)를 먼저, 그 다음 초과 사용 Burstable을 퇴거한다. Guaranteed QoS는 마지막까지 보호된다. 각 퇴거는 graceful termination → SIGTERM → SIGKILL 순으로 진행된다. API-initiated eviction(노드 드레인)과는 다른 kubelet 주도 메커니즘이다.",
    code: `# 노드 압박 상태 확인
kubectl describe node worker-1 | grep -A8 Conditions

# kubelet eviction 설정 (정적 PID/메모리 임계)
# /var/lib/kubelet/config.yaml
# evictionHard:
#   memory.available: "100Mi"
#   nodefs.available: "10%"
#   nodefs.inodesFree: "5%"

# 퇴거 이벤트 확인
kubectl get events -n default \\
  --field-selector reason=Evicted`,
    lang: "bash",
  },
  {
    id: "SCH-057",
    type: "SCHED",
    chapter: "SCHEDULING & EVICTION",
    level: "ADVANCED",
    nameEn: "API-INITIATED EVICTION",
    nameKo: "API 주도 퇴거",
    visual: "qos",
    icon: "EV",
    attrs: ["Drain", "PDB"],
    atk: "사용자/컨트롤러 요청",
    def: "grace period",
    effect:
      "Eviction API 호출(kubectl drain 등)로 Pod를 퇴거하며, PDB가 이 과정에서 자발적 중단 보호를 담당한다.",
    flavor: "사람이 명하는 퇴거, 예산이 지킨다.",
    detail:
      "kubectl drain은 노드를 Unschedulable로 마킹하고 Pod를 Eviction subresource로 퇴거시킨다. 이는 kubelet의 노드 압박 퇴거와는 다른, API 서버를 통한 자발적 중단이다. PDB가 있으면 minAvailable을 위반하는 퇴거는 API 서버가 거부한다. grace-period-seconds(기본 30초) 후 SIGTERM, 그 후 SIGKILL한다.",
    code: `# 노드 드레인 (API 주도 퇴거)
kubectl drain worker-1 \\
  --ignore-daemonsets \\
  --delete-emptydir-data \\
  --force

# 특정 Pod 강제 퇴거
kubectl evict pod/web-abc -n default

# 노드 보호 해제
kubectl uncordon worker-1

# PDB 위반 퇴거 시도 시 거부됨
# "Cannot delete DaemonSet-managed Pod ... PDB violation"`,
    lang: "bash",
  },
  {
    id: "POL-058",
    type: "CONFIG",
    chapter: "POLICIES",
    level: "ADVANCED",
    nameEn: "RESOURCE QUOTAS",
    nameKo: "리소스 쿼터",
    visual: "quota",
    icon: "QUOTA",
    attrs: ["Namespace", "Limit"],
    atk: "네임스페이스 자원 한도",
    def: "Pod/Service 수 제한",
    effect:
      "ResourceQuota는 네임스페이스별 CPU/메모리/Pod/Service 총량을 제한해 멀티테넌트 클러스터의 자원 고갈을 막는다.",
    flavor: "네임스페이스마다 자원 울타리.",
    detail:
      "네임스테이스별로 hard 한도를 정한다. 예: Pod 10개, CPU requests 4 cores, 메모리 limits 8Gi, PVC 50Gi. 이 한도를 넘는 생성 요청은 API 서버가 거부한다. ResourceQuota가 있는 네임스페이스의 Pod는 반드시 requests/limits을 명시해야 하므로, BestEffort Pod 생성이 막혀 자원 예측성이 높아진다.",
    code: `# ResourceQuota 정의
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: team-alpha
spec:
  hard:
    requests.cpu: "4"
    requests.memory: "8Gi"
    limits.cpu: "8"
    limits.memory: "16Gi"
    pods: "20"
    persistentvolumeclaims: "10"

# 사용량 확인
kubectl describe quota team-quota -n team-alpha`,
    lang: "yaml",
  },
  {
    id: "POL-059",
    type: "CONFIG",
    chapter: "POLICIES",
    level: "ADVANCED",
    nameEn: "LIMIT RANGES",
    nameKo: "리밋 레인지",
    visual: "quota",
    icon: "LR",
    attrs: ["Default", "Per-Pod"],
    atk: "기본 자원 부여",
    def: "최소/최대 제한",
    effect:
      "LimitRange는 네임스페이스에서 Pod/컨테이너/PVC의 기본 requests/limits과 최소/최대 한도를 지정한다.",
    flavor: "쿼터의 세부 조율자.",
    detail:
      "ResourceQuota는 총량만 관리하지만, LimitRange는 개별 Pod/컨테이너 단위의 정책을 담당한다. 예: 모든 컨테이너에 기본 CPU 100m/메모리 256Mi를 부여하고, 최대 1 CPU / 2Gi를 초과하지 못하게 한다. requests/limits 미지정 Pod에 default를 채워 BestEffort를 막고, 비정상적 대량 요청을 차단한다. ResourceQuota와 함께 쓰는 것이 일반적이다.",
    code: `# LimitRange 정의
apiVersion: v1
kind: LimitRange
metadata:
  name: defaults
  namespace: team-alpha
spec:
  limits:
    - type: Container
      default:
        cpu: "500m"
        memory: "512Mi"
      defaultRequest:
        cpu: "100m"
        memory: "256Mi"
      max:
        cpu: "2"
        memory: "4Gi"
      min:
        cpu: "50m"
        memory: "64Mi"`,
    lang: "yaml",
  },
  {
    id: "OVR-060",
    type: "OVERVIEW",
    chapter: "OVERVIEW · OBJECTS",
    level: "ADVANCED",
    nameEn: "FINALIZERS",
    nameKo: "파이널라이저",
    visual: "finalizer",
    icon: "FIN",
    attrs: ["Pre-delete", "Hook"],
    atk: "삭제 지연",
    def: "정리 후 완료",
    effect:
      "finalizer는 오브젝트가 삭제될 때 즉시 제거되지 않게 막고, 컨트롤러가 정리 작업을 마친 뒤 finalizer를 제거해야 삭제된다.",
    flavor: "삭제는 마지막 인사 후에.",
    detail:
      "오브젝트에 finalizer(문자열)가 있으면, 삭제 요청이 와도 deletionTimestamp만 설정되고 Terminating 상태로 머문다. 해당 finalizer를 담당하는 컨트롤러가 정리(외부 리소스 삭제, 연결 해제)를 수행한 뒤 finalizer를 제거해야만 오브젝트가 실제로 사라진다. PV/StorageClass/CRD 컨트롤러가 외부 스토리지나 클라우드 리소스를 정리할 때 사용한다.",
    code: `# finalizer가 있는 오브젝트 확인
kubectl get pv pvc-abc -o \\
  jsonpath='{.metadata.finalizers}'

# 컨트롤러 없이 finalizer가 남은 경우 강제 제거
kubectl patch pv pvc-abc --type=json -p \\
  '[{"op":"remove","path":"/metadata/finalizers","value":[]}]'

# CRD에 기본 finalizer 선언
#   finalizers:
#     - example.com/cleanup`,
    lang: "bash",
  },
  {
    id: "OVR-061",
    type: "OVERVIEW",
    chapter: "OVERVIEW · OBJECTS",
    level: "ADVANCED",
    nameEn: "ANNOTATIONS",
    nameKo: "어노테이션",
    visual: "object",
    icon: "ANN",
    attrs: ["Metadata", "Non-identifying"],
    atk: "key/value 부가 정보",
    def: "셀렉터 미사용",
    effect:
      "Annotation은 오브젝트에 비식별 메타데이터(도구 설정, 빌드 정보, 연락처 등)를 부착하는 key/value 저장소다.",
    flavor: "레이블은 식별용, 어노테이션은 설명용.",
    detail:
      "레이블은 셀렉터/집계에 쓰이지만 어노테이션은 그렇지 않다. ingress controller 설정, kubectl last-applied-config, 빌드/릴리스 메타데이터, 책임자 연락처, 모니터링 도구의 임의 설정 등 '기계가 읽는 부가 정보'를 담는다. 값은 크기 제한이 없고(사실상 256KiB), JSON/YAML 형태의 복잡한 값도 가능하다.",
    code: `# 어노테이션 추가
kubectl annotate pod web \\
  example.com/owner="team-platform" \\
  example.com/ticket="JIRA-1234"

# 모든 어노테이션 확인
kubectl describe pod web | grep -A20 Annotations

# last-applied-configuration (kubectl apply가 기록)
kubectl get pod web -o \\
  jsonpath='{.metadata.annotations}' | jq`,
    lang: "bash",
  },
  {
    id: "OVR-062",
    type: "OVERVIEW",
    chapter: "OVERVIEW · OBJECTS",
    level: "ADVANCED",
    nameEn: "OWNERS & DEPENDENTS",
    nameKo: "소유자와 종속",
    visual: "deploy",
    icon: "OWN",
    attrs: ["Cascading", "GC"],
    atk: "ownerReferences",
    def: "종속 정리",
    effect:
      "ownerReferences는 오브젝트 간 소유-종속 관계를 기록해, 소유자 삭제 시 GC가 종속을 함께 정리한다.",
    flavor: "부모가 사라지면 자식도.",
    detail:
      "Deployment → ReplicaSet → Pod 순으로 ownerReferences가 기록된다. 소유자(Owner)가 삭제되면 Garbage Collector가 Foreground/Background 정책에 따라 종속(Dependent)을 정리한다. 또한 orphan 옵션으로 종속을 유지하면서 소유자만 삭제할 수도 있다. CRD 기반 컨트롤러가 자식 리소스를 만들 때 ownerReferences를 지정하면 같은 GC 메커니즘을 활용할 수 있다.",
    code: `# Pod의 ownerReferences 확인
kubectl get pod web-abc -o \\
  jsonpath='{.metadata.ownerReferences}'

# CRD 컨트롤러가 자식에 owner 부여
# metadata:
#   ownerReferences:
#     - apiVersion: example.com/v1
#       kind: MyApp
#       name: myapp-1
#       uid: <owner UID>
#       controller: true

# Orphan (종속 유지하며 소유자만 삭제)
kubectl delete myapp myapp-1 --cascade=orphan`,
    lang: "bash",
  },
  {
    id: "OVR-063",
    type: "OVERVIEW",
    chapter: "OVERVIEW · OBJECTS",
    level: "ADVANCED",
    nameEn: "FIELD SELECTORS",
    nameKo: "필드 셀렉터",
    visual: "object",
    icon: "FS",
    attrs: ["Filter", "Status"],
    atk: "필드 기반 검색",
    def: "레이블 아님",
    effect:
      "field selector는 레이블이 아닌 오브젝트 필드(status.phase, metadata.namespace 등) 값으로 리소스를 필터링한다.",
    flavor: "레이블은 태그, 필드는 상태.",
    detail:
      "kubectl get pods --field-selector=status.phase=Running 처럼 필드 값으로 검색한다. 지원 필드는 리소스마다 다르며, Pod는 status.phase, spec.nodeName, metadata.namespace 등을 지원한다. 클라이언트 측 필터링(server-side)으로, API 서버가 조건을 평가해 응답한다. label selector와 조합해 정밀 검색이 가능하다.",
    code: `# Running 상태 Pod만
kubectl get pods --field-selector \\
  status.phase=Running

# 특정 노드의 Pod
kubectl get pods --field-selector \\
  spec.nodeName=worker-1

# 미할당 Pending Pod
kubectl get pods --field-selector \\
  spec.nodeName= -A

# 필드+레이블 조합
kubectl get pods -l app=web \\
  --field-selector=status.phase=Running`,
    lang: "bash",
  },
  {
    id: "ARC-064",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "ADVANCED",
    nameEn: "CONTAINER RUNTIME INTERFACE",
    nameKo: "컨테이너 런타임 인터페이스 (CRI)",
    visual: "pod",
    icon: "CRI",
    attrs: ["gRPC", "Pluggable"],
    atk: "kubelet ↔ 런타임",
    def: "표준 인터페이스",
    effect:
      "CRI는 kubelet과 컨테이너 런타임(containerd, CRI-O 등)을 분리하는 gRPC 인터페이스로, 런타임 교체를 가능하게 한다.",
    flavor: "kubelet은 '무엇'을, 런타임은 '어떻게'를.",
    detail:
      "과거 kubelet은 Docker에 직접 결합되어 있었으나, CRI로 분리되어 containerd, CRI-O, dockerd(legacy) 등 어떤 런타임이든 gRPC 소켓만 연결하면 동작한다. ImageService(이미지 풀/관리)와 RuntimeService(컨테이너 생성/시작/정지) 두 서비스로 구성된다. dockershim은 1.24에서 제거되었고, 현재 containerd가 사실상 표준이다.",
    code: `# kubelet의 런타임 설정
# /var/lib/kubelet/config.yaml
# containerRuntimeEndpoint: unix:///run/containerd/containerd.sock

# 노드의 런타임 확인
kubectl get nodes -o \\
  jsonpath='{.items[*].status.nodeInfo.containerRuntimeVersion}'

# containerd 상태
crictl --runtime-endpoint \\
  unix:///run/containerd/containerd.sock info`,
    lang: "bash",
  },
  {
    id: "ARC-065",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "ADVANCED",
    nameEn: "LEASES",
    nameKo: "리스",
    visual: "object",
    icon: "LEASE",
    attrs: ["Lock", "Heartbeat"],
    atk: "분산 락",
    def: "리더 선출",
    effect:
      "Lease(coordination.k8s.io)는 짧은 TTL의 분산 락/하트비트 리소스로, 리더 선출과 노드 heartbeat에 사용된다.",
    flavor: "잠시 빌리는 자물쇠.",
    detail:
      "Lease는 renewTime과 leaseDurationSeconds를 가진 경량 리소스다. 컨트롤러/스케줄러 리더 선출(coordinated leader election)이 Lease를 기반으로 동작하고, 노드 heartbeat도 node.kubernetes.io/lease 리소스를 주기적으로 갱신해 노드 생존을 알린다. 짧은 TTL 덕분에 장애가 발생하면 빠르게 새 리더가 선출된다.",
    code: `# 노드 heartbeat Lease 확인
kubectl get lease -n kube-node-lease

# 컨트롤러 리더 Lease
kubectl get lease -n kube-system

# Lease 상세
kubectl describe lease worker-1 -n kube-node-lease | grep -A5 Spec`,
    lang: "bash",
  },
  {
    id: "ARC-066",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "ADVANCED",
    nameEn: "SELF-HEALING",
    nameKo: "자가 복구",
    visual: "probe",
    icon: "HEAL",
    attrs: ["Auto", "Reconcile"],
    atk: "관측-보정 루프",
    def: "대체 복구",
    effect:
      "Kubernetes는 컨테이너 재시작, Pod 재스케줄, ReplicaSet 보정, 노드 장애 감지로 '원하는 상태'를 자동 복구한다.",
    flavor: "끊임없이 상태를 되돌려 놓는다.",
    detail:
      "컨테이너 크래시 → kubelet이 RestartPolicy로 재시작. Pod 사라짐 → ReplicaSet/StatefulSet 컨트롤러가 새 Pod 생성. 노드 다운 → Node 컨트롤러가 NotReady로 마킹, Pod가 5분(기본) 후 다른 노드로 재스케줄. 프로브 실패 → liveness 재시작, readiness 트래픽 차단. 선언적 desired state와 컨트롤 루프가 결합해 '치료' 없이 '회복'을 유도한다.",
    code: `# Pod 재시작 횟수
kubectl get pods -o \\
  jsonpath='{range .items[*]}{.metadata.name}{" "}{.status.containerStatuses[0].restartCount}{"\\n"}{end}'

# 노드 장애 후 Pod 퇴거 대기
# --pod-eviction-timeout (기본 5분)

# 컨트롤러가 새 Pod로 복구한 예시
kubectl get pods -l app=web -w`,
    lang: "bash",
  },
  {
    id: "ARC-067",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "ADVANCED",
    nameEn: "CGROUP V2",
    nameKo: "cgroup v2",
    visual: "qos",
    icon: "CG",
    attrs: ["Unified", "Resource"],
    atk: "단일 계층 구조",
    def: "Pod 자원 통제",
    effect:
      "cgroup v2는 단일 계층 구조로 CPU/메모리/IO 자원을 Pod와 컨테이너에 더 정확하게 할당하고 제한한다.",
    flavor: "자원 통제의 새 표준.",
    detail:
      "cgroup v2는 v1의 여러 컨트롤러(cpu, memory, blkio)를 단일 계층 구조로 통합해, Pod 단위 자원 제한이 더 일관되게 적용된다. K8s 1.25+에서 cgroup v2가 GA이며, 최신 런타임(containerd 1.6+, CRI-O)이 지원한다. memory.max, cpu.max 같은 파일로 제한을 걸고, kubelet의 QoS/리소스 정책이 더 정밀하게 동작한다. Pod 수준 자원 통제와 HugePages, device 접근 제어가 개선된다.",
    code: `# 노드의 cgroup 버전 확인
kubectl get node worker-1 -o \\
  jsonpath='{.status.nodeInfo.kernelVersion}'
# cgroup v2 여부
stat -fc %T /sys/fs/cgroup/

# kubelet cgroup v2 설정
# /var/lib/kubelet/config.yaml
# cgroupDriver: systemd  # v2 권장

# Pod cgroup 경로
ls /sys/fs/cgroup/kubepods/`,
    lang: "bash",
  },
  {
    id: "ARC-068",
    type: "ARCH",
    chapter: "CLUSTER ARCHITECTURE",
    level: "ADVANCED",
    nameEn: "MIXED VERSION PROXY",
    nameKo: "혼합 버전 프록시",
    visual: "cluster",
    icon: "MVP",
    attrs: ["Upgrade", "Aggregation"],
    atk: "버전 혼재 클러스터",
    def: "API 호환",
    effect:
      "Mixed Version Proxy는 버전이 혼재된 클러스터에서 API 서버가 다른 버전 노드로 요청을 프록시해 호환성을 유지한다.",
    flavor: "다른 세대의 노드가 같은 언어로.",
    detail:
      "업그레이드 중 컨트롤 플레인과 노드의 K8s 버전이 섞일 때, 일부 리소스(예: 노드의 Pod 통계)는 노드 버전에 따라 API가 다를 수 있다. Mixed Version Proxy는 API 서버가 대상 노드/리소스에 맞춰 요청을 적절히 변환/전달해, 클라이언트가 버전 차이를 인식하지 않고 사용할 수 있게 한다. 롤링 업그레이드 중 무결성을 보존한다.",
    code: `# 노드 버전 분포 확인
kubectl get nodes -o wide | grep -E "NAME|VERSION"

# 업그레이드 중 버전 차이
kubectl version --short

# Mixed Version Proxy 기능 게이트
# --feature-gate=MixedVersionProxy=true
# (kube-apiserver)

# 컴포넌트 버전 호환성 점검
kubectl get nodes -o \\
  jsonpath='{range .items[*]}{.metadata.name}{" "}{.status.nodeInfo.kubeletVersion}{"\\n"}{end}'`,
    lang: "bash",
  },
  {
    id: "NET-069",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "ADVANCED",
    nameEn: "DUAL-STACK (IPv4/IPv6)",
    nameKo: "듀얼스택 네트워킹",
    visual: "dualstack",
    icon: "DS",
    attrs: ["IPv4", "IPv6"],
    atk: "두 주소 체계 동시",
    def: "clusterCIDR 듀얼",
    effect:
      "듀얼스택은 클러스터가 IPv4와 IPv6를 동시에 지원해 Pod/Service가 두 체계의 주소를 가질 수 있게 한다.",
    flavor: "두 세계의 주민.",
    detail:
      "cluster.cidr와 service-cluster-ip-range를 IPv4/IPv6 CIDR 쌍으로 설정하고, dual-stack feature gate를 활성화한다. Pod는 v4+v6 두 IP를 받고, Service도 dual-stack ClusterIP를 가질 수 있다. 단일 스택에서 듀얼 스택으로 전환하려면 클러스터 재설정이 필요해, 신규 클러스터에서 처음부터 듀얼스택으로 구축하는 것이 일반적이다.",
    code: `# 클러스터 듀얼스택 설정
# --cluster-cidr=10.244.0.0/16,fd00:10:244::/56
# --service-cluster-ip-range=10.96.0.0/12,fd00:10:96::/112

# 노드 IP 패밀리 확인
kubectl get nodes -o \\
  jsonpath='{.items[*].status.addresses}'

# Pod의 듀얼 IP 확인
kubectl get pod web -o \\
  jsonpath='{.status.podIPs}'

# Service 듀얼스택
spec:
  ipFamilyPolicy: PreferDualStack
  ipFamilies: [IPv4, IPv6]`,
    lang: "yaml",
  },
  {
    id: "NET-070",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "ADVANCED",
    nameEn: "SERVICE INTERNAL TRAFFIC POLICY",
    nameKo: "서비스 내부 트래픽 정책",
    visual: "svc",
    icon: "SITP",
    attrs: ["Local", "Keep-in-node"],
    atk: "노드 내 트래픽 유지",
    def: "EndpointSlices 필터",
    effect:
      "internalTrafficPolicy: Local은 Service가 같은 노드의 Endpoints로만 트래픽을 보내도록 kube-proxy를 제한한다.",
    flavor: "가까운 이웃에게만.",
    detail:
      "기본 Service는 클러스터 어디든 트래픽을 보낼 수 있어 다른 노드로 건너뛰는 hop이 발생한다. internalTrafficPolicy: Local을 지정하면 kube-proxy가 같은 노드의 Endpoints만 라우팅 대상으로 노출한다. 같은 노드에 엔드포인트가 없으면 트래픽이 drop된다. 노드 간 트래픽 비용/지연이 큰 환경이나 daemonset과 함께 쓸 때 유용하다.",
    code: `# 내부 트래픽 정책 Local
apiVersion: v1
kind: Service
metadata:
  name: metrics
spec:
  selector:
    app: metrics
  internalTrafficPolicy: Local  # 기본 Cluster
  ports:
    - port: 9090
      targetPort: 9090

# 노드별 엔드포인트 확인
kubectl get endpointslices -l \\
  kubernetes.io/service-name=metrics -o wide`,
    lang: "yaml",
  },
  {
    id: "NET-071",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "ADVANCED",
    nameEn: "CLUSTERIP ALLOCATION",
    nameKo: "ClusterIP 할당",
    visual: "svc",
    icon: "CIP",
    attrs: ["Range", "Dynamic"],
    atk: "service-cluster-ip-range",
    def: "명시적 IP",
    effect:
      "ClusterIP는 service-cluster-ip-range 안에서 동적/명시적으로 할당되며, type: ClusterIP 또는 headless(None)로 제어한다.",
    flavor: "서비스 주소는 예약석.",
    detail:
      "kube-apiserver의 --service-cluster-ip-range(CIDR) 안에서 ClusterIP가 자동 할당된다. spec.clusterIP를 명시해 특정 IP를 고정할 수 있고, 사용 중인 IP는 충돌이 난다. ClusterIP: None으로 Headless Service를 만들면 ClusterIP가 없고 DNS가 Pod IP를 직접 반환한다. 대규모 클러스터에서는 IPv4 고갈을 막기 위해 CIDR 확장이나 dual-stack이 필요하다.",
    code: `# 명시적 ClusterIP
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  clusterIP: 10.96.10.10  # range 안에서
  selector:
    app: web
  ports:
    - port: 80

# Headless Service (ClusterIP 없음)
spec:
  clusterIP: None

# 현재 할당된 ClusterIP 범위
kubectl get svc -A -o \\
  jsonpath='{range .items[*]}{.metadata.name}{" "}{.spec.clusterIP}{"\\n"}{end}'`,
    lang: "yaml",
  },
  {
    id: "NET-072",
    type: "NET",
    chapter: "SERVICES & NETWORKING",
    level: "ADVANCED",
    nameEn: "TOPOLOGY AWARE ROUTING",
    nameKo: "토폴로지 인식 라우팅",
    visual: "svc",
    icon: "TAR",
    attrs: ["Zone", "Hint"],
    atk: "같은 영역 우선",
    def: "EndpointHint",
    effect:
      "Topology Aware Routing은 트래픽을 같은 영역/노드로 우선 보내고, 불가할 때만 다른 영역으로 라우팅한다.",
    flavor: "가까운 쪽으로 먼저.",
    detail:
      "EndpointSlices에 topology hints(deprecated/향후 제거 예정)나 Service trafficDistribution(PreferClose)로 표시된 엔드포인트가 우선순위를 갖는다. kube-proxy는 이를 보고 같은 zone/노드 엔드포인트로 먼저 트래픽을 보낸다. 클라우드 cross-zone 트래픽 비용과 지연을 줄이는 목적이다. trafficDistribution: PreferClose가 새 API 방향이다.",
    code: `# trafficDistribution으로 영역 우선
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  trafficDistribution: PreferClose
  ports:
    - port: 80

# EndpointSlice의 토폴로지 힌트
kubectl get endpointslice -l \\
  kubernetes.io/service-name=web -o yaml | grep -A3 hints`,
    lang: "yaml",
  },
  {
    id: "ST-073",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "ADVANCED",
    nameEn: "CSI VOLUME CLONING",
    nameKo: "CSI 볼륨 복제",
    visual: "csi",
    icon: "CLN",
    attrs: ["Clone", "DataSource"],
    atk: "기존 PVC 복제",
    def: "스냅샷 없이",
    effect:
      "PVC의 dataSource를 다른 PVC로 지정하면 CSI 드라이버가 스토리지 백엔드 수준에서 볼륨을 복제한다.",
    flavor: "복사는 더 빠르게, 더 깊이.",
    detail:
      "스냅샷을 만들지 않고 기존 PVC의 데이터로 새 PVC를 직접 생성한다. CSI 드라이버가 스토리지 백엔드의 clone 기능을 호출하므로, 블록 단위 복사로 빠르고 일관성이 좋다. 템플릿 데이터베이스, 테스트 환경 복제, 마이그레이션 사전 단계에 유용하다. CSI 드라이버가 VolumeSnapshot + Clone을 모두 지원해야 완전한 백업 전략이 가능하다.",
    code: `# 기존 PVC에서 복제
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-clone
spec:
  storageClassName: csi-fast
  dataSource:
    kind: PersistentVolumeClaim
    name: db-template
  accessModes: ["ReadWriteOnce"]
  resources:
    requests:
      storage: 20Gi`,
    lang: "yaml",
  },
  {
    id: "ST-074",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "ADVANCED",
    nameEn: "VOLUME POPULATORS",
    nameKo: "볼륨 채우기 (Populator)",
    visual: "csi",
    icon: "POP",
    attrs: ["DataSource", "External"],
    atk: "외부 소스 주입",
    def: "초기 데이터",
    effect:
      "VolumePopulator는 PVC의 dataSource를 외부 소스(S3, 이미지 레지스트리 등)로 지정해 볼륨 생성 시 데이터를 미리 채운다.",
    flavor: "볼륨을 만들면서 채워 넣는다.",
    detail:
      "기존에는 스냅샷/clone만 dataSource로 쓸 수 있었으나, 데이터 소스 컨트롤러 프레임워크로 S3 버킷, OCI 이미지, HTTP 파일 등을 dataSource로 지정할 수 있다. CSI 드라이버가 볼륨을 만들면 populator 컨트롤러가 데이터를 채운다. 대용량 초기 데이터 캐시, 모델 가중치, 데이터셋 사전 로드에 유용하다.",
    code: `# S3에서 데이터 채우기 (예시 CRD)
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: model-cache
spec:
  dataSource:
    apiGroup: populator.storage.k8s.io
    kind: S3Source
    name: my-model-bucket
  accessModes: ["ReadWriteOnce"]
  resources:
    requests:
      storage: 50Gi`,
    lang: "yaml",
  },
  {
    id: "ST-075",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "ADVANCED",
    nameEn: "EPHEMERAL VOLUMES",
    nameKo: "에피머럴 볼륨",
    visual: "pv",
    icon: "EPV",
    attrs: ["Pod-scoped", "CSI"],
    atk: "Pod와 생명주기 일치",
    def: "PVC 불필요",
    effect:
      "Ephemeral Volume은 Pod와 수명을 같이하는 볼륨으로, PVC 없이 CSI 드라이버가 Pod 생성 시 만들고 Pod 삭제 시 사라진다.",
    flavor: "파드와 함께 태어나고, 함께 사라진다.",
    detail:
      "emptyDir은 노드 디스크 기반이라 CSI 스토리지의 고급 기능(스냅샷, 암호화 등)을 쓸 수 없다. CSI ephemeral inline volume은 PodSpec 안에서 volume.csi로 직접 선언해, CSI 드라이버가 Pod 단위로 임시 볼륨을 생성·제거한다. PVC 오브젝트가 따로 존재하지 않아 네임스페이스가 깔끔하고, 민감한 자료를 노드 디스크가 아닌 백엔드에 저장할 수 있다.",
    code: `# CSI ephemeral inline volume
volumes:
  - name: ephemeral
    csi:
      driver: secrets-store.csi.k8s.io
      volumeAttributes:
        secretProviderClass: vault-secrets

# 일반적인 emptyDir과 비교
volumes:
  - name: tmp
    emptyDir:
      medium: Memory  # tmpfs`,
    lang: "yaml",
  },
  {
    id: "ST-076",
    type: "STORAGE",
    chapter: "STORAGE",
    level: "ADVANCED",
    nameEn: "DYNAMIC RESOURCE ALLOCATION (DRA)",
    nameKo: "동적 자원 할당 (DRA)",
    visual: "csi",
    icon: "DRA",
    attrs: ["GPU", "Device"],
    atk: "GPU/디바이스 풀",
    def: "요청-바인딩 모델",
    effect:
      "DRA는 GPU, FPGA, 가속기 같은 특수 디바이스를 새 ResourceClaim/ResourceClass 모델로 동적 할당한다. Device Plugin의 후속이다.",
    flavor: "컨테이너에 특별한 장비를 대여해 준다.",
    detail:
      "기존 Device Plugin은 노드 단위 풀만 지원했으나, DRA는 토폴로지 인식, 공유/독점 선택, 셀렉터 기반 매칭을 지원한다. Pod가 ResourceClaim을 요청하면 컨트롤러가 클레임을 노드에 바인딩하고, kubelet이 디바이스를 컨테이너에 노출한다. GPU 파티셔닝, NIC, RDMA, 가속기 등 복잡한 디바이스 요구를 선언적으로 표현할 수 있다. v1.32+부터 구조가 개편된 core DRA로 발전 중이다.",
    code: `# ResourceClass 정의
apiVersion: resource.k8s.io/v1beta1
kind: DeviceClass
metadata:
  name: gpu-class
spec:
  nodeSelector:
    matchLabels:
      accelerator: nvidia

# Pod에서 클레임 요청
spec:
  resourceClaims:
    - name: gpu
      resourceClassName: gpu-class
  containers:
    - name: train
      image: ml:1.0
      resources:
        claims: [gpu]`,
    lang: "yaml",
  },
  {
    id: "CFG-077",
    type: "CONFIG",
    chapter: "CONFIGURATION",
    level: "ADVANCED",
    nameEn: "ADMISSION WEBHOOKS",
    nameKo: "어드미션 웹훅",
    visual: "webhook",
    icon: "ADM",
    attrs: ["Mutating", "Validating"],
    atk: "API 요청 가로채기",
    def: "거부/수정",
    effect:
      "Admission Webhook은 API 서버가 etcd에 기록하기 전 요청을 가로채, 필드를 수정(Mutating)하거나 정책 위반을 거부(Validating)한다.",
    flavor: "API 서버 앞의 두 번째 문.",
    detail:
      "인증·인가 후, etcd 저장 전에 실행된다. MutatingAdmissionWebhook은 객체를 수정(sidecar 주입, 기본값 채우기)하고, ValidatingAdmissionWebhook은 검증만 하고 거부 여부를 결정한다. OPA Gatekeeper, Kyverno, Istio sidecar injection이 모두 이 메커니즘을 사용한다. 순서가 중요해 Mutating이 먼저, Validating이 나중에 실행된다.",
    code: `# ValidatingWebhookConfiguration 예시
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: require-labels
webhooks:
  - name: labels.example.com
    rules:
      - apiGroups: [""]
        resources: ["pods"]
        operations: ["CREATE"]
    admissionReviewVersions: ["v1"]
    clientConfig:
      service:
        name: webhook
        namespace: kube-system
        path: "/validate"
    sideEffects: None`,
    lang: "yaml",
  },
  {
    id: "SEC-078",
    type: "SECURITY",
    chapter: "SECURITY",
    level: "ADVANCED",
    nameEn: "MULTI-TENANCY",
    nameKo: "멀티테넌시",
    visual: "ns",
    icon: "MT",
    attrs: ["Isolation", "Cost-sharing"],
    atk: "네임스페이스 격리",
    def: "자원/권한 분리",
    effect:
      "Multi-tenancy는 한 클러스터를 여러 팀/고객이 공유하되 네임스페이스·RBAC·NetworkPolicy·쿼터로 논리적/강한 격리를 제공한다.",
    flavor: "한 지붕, 여러 세대.",
    detail:
      "Soft multi-tenancy는 네임스테이스 + RBAC + ResourceQuota + NetworkPolicy로 논리 격리. Hard multi-tenancy는 별도 클러스터나 가상 클러스터(vcluster, Capsule)로 강한 격리. Pod Security Standards(restricted), PSA, Admission Webhook(Kyverno/Gatekeeper)로 테넌트 간 간섭을 막는다. 비용 효율과 보안/노이즈 간 트레이드오프를 고려해 단계를 선택한다.",
    code: `# 테넌트 네임스페이스 + 보안 라벨
apiVersion: v1
kind: Namespace
metadata:
  name: tenant-a
  labels:
    pod-security.kubernetes.io/enforce: restricted
    tenant: tenant-a

# 전용 SA + RBAC + 쿼터 조합
# ResourceQuota / LimitRange / NetworkPolicy
# 가 각 테넌트 네임스페이스에 적용`,
    lang: "yaml",
  },
  {
    id: "SEC-079",
    type: "SECURITY",
    chapter: "SECURITY",
    level: "ADVANCED",
    nameEn: "SECRETS GOOD PRACTICES",
    nameKo: "시크릿 운영 권장 사항",
    visual: "config",
    icon: "SEC",
    attrs: ["E2E", "Rotation"],
    atk: "Encryption at Rest",
    def: "외부 KMS",
    effect:
      "Secret 권장 사항: etcd 암호화(Encryption at Rest) 활성화, 외부 비밀 관리(Vault/Sealed Secrets), 최소 권한 RBAC, 정기 로테이션.",
    flavor: "비밀은 비밀답게 다뤄야 한다.",
    detail:
      "Secret은 기본적으로 etcd에 base64로만 저장되어 사실상 평문이다. 권장: (1) EncryptionAtRest 활성화로 etcd 저장 시 암호화, (2) ExternalSecrets/Sealed Secrets로 GitOps 호환 비밀 관리, (3) RBAC로 Secret 조회 최소화, (4) 파일(볼륨) 마운트를 환경변수보다 선호(메모리 노출 감소), (5) 만료/로테이션 자동화(projected SA token, CSI Secrets Store).",
    code: `# Encryption at Rest 활성화 (API 서버)
# --encryption-provider-config=encryption.yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources: ["secrets"]
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <base64-key>
      - identity: {}

# ExternalSecret (Operator)
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-cred
spec:
  secretStoreRef:
    name: vault
    kind: SecretStore
  target:
    name: db-cred
  data:
    - secretKey: password
      remoteRef:
        key: prod/db
        property: password`,
    lang: "yaml",
  },
  {
    id: "SEC-080",
    type: "SECURITY",
    chapter: "SECURITY",
    level: "ADVANCED",
    nameEn: "USER NAMESPACES",
    nameKo: "사용자 네임스페이스",
    visual: "pod",
    icon: "UNS",
    attrs: ["UID map", "Sandbox"],
    atk: "컨테이너 ↔ 호스트 UID 분리",
    def: "권한 축소",
    effect:
      "user namespace는 컨테이너 내부 UID/GID를 호스트와 다른 매핑으로 격리해, 루트 권한의 영향을 줄인다.",
    flavor: "안의 루트는 밖의 일반인.",
    detail:
      "리눅스 user namespace를 Pod에 적용하면, 컨테이너 안의 root(UID 0)가 호스트의 비특권 UID(예: 100000)로 매핑된다. 컨테이너 탈출 시 공격자가 얻는 권한이 호스트 비특권 계정으로 제한된다. K8s 1.30+에서 GA에 가까운 상태이며, 컨테이너 런타임과 노드 커널(5.15+)이 지원해야 한다. hostUserIDs 필드로 매핑을 선언한다.",
    code: `# user namespace 사용 Pod
apiVersion: v1
kind: Pod
metadata:
  name: sandboxed
spec:
  hostUsers: false  # user namespace 활성화
  containers:
    - name: app
      image: app:1.0
      securityContext:
        runAsNonRoot: true
        allowPrivilegeEscalation: false
  nodeSelector:
    kubernetes.io/os: linux

# 노드 지원 여부 확인
# kernel >= 5.15, containerd >= 1.7`,
    lang: "yaml",
  },
];