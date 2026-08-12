(() => {
  const Standard = window.DeckStandard;
  const cards = Standard.normalizeCards(window.K8S_CARDS || []);
  const deckId = "kubernetes";
  const legacyStorageKeys = ["k8s-pocket-deck-v1"];
  const typeLabels = {
    OVERVIEW: "01 · Kubernetes 오버뷰",
    ARCH: "02 · 클러스터 아키텍처",
    WORKLOAD: "03 · 워크로드",
    NET: "04 · 서비스 & 네트워킹",
    STORAGE: "05 · 스토리지",
    CONFIG: "06 · 컨피그 & 시크릿",
    SCHED: "07 · 스케줄링 & 퇴거",
    SECURITY: "08 · 보안",
  };

  const state = {
    index: 0,
    reviewed: new Set(),
    filter: "ALL",
    view: "card",
    flipped: false,
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const card = $("#study-card");
  const front = $("#card-front");
  const back = $("#card-back");
  const toast = $("#toast");

  function escapeHtml(value = "") {
    return Standard.escapeHtml(value);
  }

  function loadState() {
    try {
      const saved = Standard.loadState(deckId, legacyStorageKeys);
      if (Number.isInteger(saved?.index)) {
        state.index = Math.max(0, Math.min(cards.length - 1, saved.index));
      }
      const seen = saved?.seen ?? saved?.reviewed ?? saved?.owned;
      if (Array.isArray(seen)) state.reviewed = new Set(seen);
    } catch (_) {
      // Local progress must never block the lesson.
    }
  }

  function saveState() {
    Standard.saveState(deckId, { index: state.index, seen: [...state.reviewed] });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function diagramHtml(item) {
    const diagrams = {
      cluster: `
        <div class="diagram cluster-map">
          <span class="cp-node">Control Plane</span><span class="arrow">➔</span>
          <span class="worker-node">worker-1</span><span class="arrow">·</span>
          <span class="worker-node">worker-2</span>
          <div class="diagram-caption">컨트롤 플레인 + 노드 집합</div>
        </div>`,
      object: `
        <div class="diagram object-map">
          <span class="obj-node">apiVersion / kind</span>
          <span class="spec-node">spec</span>
          <span class="status-node">status</span>
          <div class="diagram-caption">선언적 오브젝트 구조</div>
        </div>`,
      pod: `
        <div class="diagram pod-map">
          <span class="pod-box">POD</span>
          <div class="ctr-box">container</div>
          <div class="ctr-box">container</div>
          <div class="diagram-caption">스케줄 최소 단위 · 네트워크/볼륨 공유</div>
        </div>`,
      svc: `
        <div class="diagram svc-map">
          <span class="svc-node">Service</span><span class="arrow">➔</span>
          <span class="ep-node">Pod-1</span>
          <span class="ep-node">Pod-2</span>
          <div class="diagram-caption">고정 IP + 셀렉터 라우팅</div>
        </div>`,
      deploy: `
        <div class="diagram deploy-map">
          <span class="dep-node">Deployment</span><span class="arrow">➔</span>
          <span class="rs-node">ReplicaSet</span>
          <span class="pod-mini">P</span><span class="pod-mini">P</span><span class="pod-mini">P</span>
          <div class="diagram-caption">롤링 업데이트 + 레플리카 유지</div>
        </div>`,
      pv: `
        <div class="diagram pv-map">
          <span class="pv-node">PersistentVolume</span><span class="arrow">↔</span>
          <span class="pvc-node">PVC</span><span class="arrow">↔</span>
          <span class="sc-node">StorageClass</span>
          <div class="diagram-caption">영구 저장 추상화</div>
        </div>`,
      config: `
        <div class="diagram config-map">
          <span class="cfg-node">ConfigMap</span>
          <span class="sec-node">Secret</span>
          <div class="diagram-caption">설정·민감정보 주입</div>
        </div>`,
      sched: `
        <div class="diagram sched-map">
          <span class="sched-node">Scheduler</span><span class="arrow">➔</span>
          <span class="node-mini">node-A</span>
          <span class="node-mini">node-B</span>
          <div class="diagram-caption">필터 → 점수 → 노드 선택</div>
        </div>`,
      rbac: `
        <div class="diagram rbac-map">
          <span class="role-node">Role</span><span class="arrow">↔</span>
          <span class="sa-node">ServiceAccount</span>
          <span class="verb-node">get</span><span class="verb-node">list</span>
          <div class="diagram-caption">누가 / 무엇을 / 어떻게</div>
        </div>`,
      ns: `
        <div class="diagram ns-map">
          <span class="ns-box">ns: team-a</span>
          <span class="ns-box">ns: team-b</span>
          <div class="iso-note">논리적 격리 · 이름 충돌 방지</div>
        </div>`,
      qos: `
        <div class="diagram qos-map">
          <span class="qos-node g">Guaranteed</span>
          <span class="qos-node b">Burstable</span>
          <span class="qos-node e">BestEffort</span>
          <div class="diagram-caption">퇴거 우선순위: BE → BS → GU</div>
        </div>`,
      hpa: `
        <div class="diagram hpa-map">
          <span class="hpa-node">HPA</span><span class="arrow">↔</span>
          <span class="metric-node">CPU 70%</span>
          <span class="replica-node">3 → 6 replicas</span>
          <div class="diagram-caption">메트릭 기반 자동 확장</div>
        </div>`,
      dualstack: `
        <div class="diagram dualstack-map">
          <span class="v4-node">IPv4 10.244.0.5</span>
          <span class="v6-node">IPv6 fd00:10:244::5</span>
          <div class="diagram-caption">Pod·Service 동시 듀얼스택</div>
        </div>`,
      csi: `
        <div class="diagram csi-map">
          <span class="csi-node">CSI Driver</span><span class="arrow">↔</span>
          <span class="pvc-node">PVC</span><span class="arrow">↔</span>
          <span class="src-node">Source</span>
          <div class="diagram-caption">Clone / Snapshot / Populator</div>
        </div>`,
      webhook: `
        <div class="diagram webhook-map">
          <span class="wh-node">API Server</span><span class="arrow">➔</span>
          <span class="wh-node m">Mutating</span><span class="arrow">➔</span>
          <span class="wh-node v">Validating</span><span class="arrow">➔</span>
          <span class="wh-node e">etcd</span>
          <div class="diagram-caption">어드미션 웹훅 파이프라인</div>
        </div>`,
      finalizer: `
        <div class="diagram finalizer-map">
          <span class="fin-node">DELETE 요청</span><span class="arrow">➔</span>
          <span class="fin-node hold">Terminating</span><span class="arrow">➔</span>
          <span class="fin-node done">정리 완료 → 제거</span>
          <div class="diagram-caption">finalizer 제거 전까지 유지</div>
        </div>`,
      quota: `
        <div class="diagram quota-map">
          <span class="q-node">Namespace</span><span class="arrow">↔</span>
          <span class="q-node">Quota (총량)</span>
          <span class="q-node">LimitRange (개별)</span>
          <div class="diagram-caption">네임스페이스 자원 한도</div>
        </div>`,
      probe: `
        <div class="diagram probe-map">
          <span class="probe-node">Liveness</span>
          <span class="probe-node">Readiness</span>
          <span class="probe-node">Startup</span>
          <div class="diagram-caption">재시작 / 트래픽 / 초기화</div>
        </div>`,
    };
    return diagrams[item.visual] || `<pre class="diagram-fallback">${escapeHtml(item.snippet || item.nameEn)}</pre>`;
  }

  function updateCompletion() {
    const label = `${state.reviewed.size} / ${cards.length} 학습`;
    $("#review-status").textContent = `학습 ${state.reviewed.size} / ${cards.length}`;
    $("#completion").textContent = label;
  }

  function renderCard() {
    const item = cards[state.index];
    if (!item) return;

    state.reviewed.add(item.id);
    state.flipped = false;
    card.classList.remove("flipped");
    card.dataset.type = item.type;
    $("#progress").textContent = `${String(state.index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    $("#chapter-label").textContent = item.chapter;

    front.innerHTML = `
      <div class="card-meta">
        <span class="level">${escapeHtml(item.level)}</span>
        <span>#${String(state.index + 1).padStart(3, "0")} · ${escapeHtml(item.id)}</span>
      </div>
      <div class="concept-art">${diagramHtml(item)}</div>
      <div class="card-title">
        <h2>${escapeHtml(item.nameEn)}</h2>
        <p>${escapeHtml(item.nameKo)}</p>
        <div class="tags">
          <span>${escapeHtml(item.type)}</span>
          ${item.attrs.map((attr) => `<span>${escapeHtml(attr)}</span>`).join("")}
        </div>
      </div>
      <div class="duo-stats">
        <div><small>KEY</small><strong>${escapeHtml(item.atk)}</strong></div>
        <div><small>TRADE-OFF</small><strong>${escapeHtml(item.def)}</strong></div>
      </div>
      <div class="concept-box">
        <small>CONCEPT</small>
        <p>${escapeHtml(item.effect)}</p>
      </div>
      <blockquote>「${escapeHtml(item.flavor)}」</blockquote>
      <div class="flip-hint">탭 → 상세 + 코드</div>
    `;

    back.innerHTML = `
      <div class="back-inner">
        <div class="back-title">
          <h2>${escapeHtml(item.nameKo)}</h2>
          <span class="lang-pill">${escapeHtml(item.lang)}</span>
        </div>
        <section class="detail-box">
          <small>DETAIL</small>
          <p>${escapeHtml(item.detail)}</p>
        </section>
        <section class="code-box">
          <small>CODE</small>
          <pre><code>${escapeHtml(item.code)}</code></pre>
        </section>
        <div class="flip-hint">탭 → 앞면</div>
      </div>
    `;

    $("#prev-button").disabled = state.index === 0;
    $("#next-button").disabled = state.index === cards.length - 1;
    updateCompletion();
    saveState();
  }

  function goTo(index) {
    state.index = Math.max(0, Math.min(cards.length - 1, index));
    renderCard();
  }

  function flipCard() {
    state.flipped = !state.flipped;
    card.classList.toggle("flipped", state.flipped);
  }

  function randomCard() {
    if (cards.length < 2) return;
    let next = state.index;
    while (next === state.index) next = Math.floor(Math.random() * cards.length);
    card.classList.add("shuffling");
    setTimeout(() => {
      card.classList.remove("shuffling");
      goTo(next);
      showToast(`${cards[next].nameKo} 카드를 뽑았습니다`);
    }, 240);
  }

  function showView(view) {
    state.view = view;
    $$(".view").forEach((element) => element.classList.toggle("active", element.id === `view-${view}`));
    $$(".tab").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
    if (view === "library") renderLibrary();
    if (view === "path") renderPath();
  }

  function renderLibrary() {
    const filtered = cards.filter((item) => {
      if (state.filter === "ALL") return true;
      if (state.filter === "REVIEWED") return state.reviewed.has(item.id);
      return item.type === state.filter;
    });

    $("#library-grid").innerHTML = filtered.length
      ? filtered.map((item) => {
          const index = cards.indexOf(item);
          const done = state.reviewed.has(item.id);
          return `
            <button class="library-card" type="button" data-index="${index}" data-type="${item.type}">
              <span class="library-number">${String(index + 1).padStart(2, "0")}</span>
              <span class="library-icon">${escapeHtml(item.icon)}</span>
              <span class="library-copy"><small>${escapeHtml(item.chapter)}</small><strong>${escapeHtml(item.nameKo)}</strong><span>${escapeHtml(item.nameEn)}</span></span>
              <span class="review-check ${done ? "done" : ""}">${done ? "✓" : "·"}</span>
            </button>`;
        }).join("")
      : `<p class="empty-state">아직 이 조건에 해당하는 카드가 없습니다.</p>`;

    $$(".library-card", $("#library-grid")).forEach((button) => {
      button.addEventListener("click", () => {
        goTo(Number(button.dataset.index));
        showView("card");
      });
    });
  }

  function renderPath() {
    $("#path-list").innerHTML = Object.entries(typeLabels).map(([type, title], groupIndex) => {
      const group = cards.filter((item) => item.type === type);
      const done = group.filter((item) => state.reviewed.has(item.id)).length;
      return `
        <section class="path-group">
          <div class="path-heading"><span>${String(groupIndex + 1).padStart(2, "0")}</span><div><h2>${title}</h2><p>${done} / ${group.length} 학습</p></div></div>
          <div class="path-cards">
            ${group.map((item) => {
              const index = cards.indexOf(item);
              const isDone = state.reviewed.has(item.id);
              return `<button type="button" data-index="${index}"><span>${escapeHtml(item.icon)}</span><strong>${escapeHtml(item.nameKo)}</strong><small>${isDone ? "봤음" : "학습하기"} →</small></button>`;
            }).join("")}
          </div>
        </section>`;
    }).join("");

    $$(".path-cards button", $("#path-list")).forEach((button) => {
      button.addEventListener("click", () => {
        goTo(Number(button.dataset.index));
        showView("card");
      });
    });
  }

  card.addEventListener("click", (event) => {
    if (event.target.closest("button, a, .detail-box, .code-box")) return;
    flipCard();
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      flipCard();
    }
  });

  Standard.attachSwipe($("#card-stage"), {
    onPrevious: () => state.index > 0 && goTo(state.index - 1),
    onNext: () => state.index < cards.length - 1 && goTo(state.index + 1),
  });

  $("#prev-button").addEventListener("click", () => goTo(state.index - 1));
  $("#next-button").addEventListener("click", () => goTo(state.index + 1));
  $("#shuffle-button").addEventListener("click", randomCard);
  $$(".tab").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  $$(".filter").forEach((button) => button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    $$(".filter").forEach((item) => item.classList.toggle("active", item === button));
    renderLibrary();
  }));

  window.addEventListener("keydown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (state.view !== "card" || target?.closest("button, a")) return;
    if (event.key === "ArrowLeft") goTo(state.index - 1);
    if (event.key === "ArrowRight") goTo(state.index + 1);
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      flipCard();
    }
    if (event.key.toLowerCase() === "r") randomCard();
  });

  loadState();
  renderCard();
})();
