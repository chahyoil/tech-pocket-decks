(() => {
  const cards = window.POSTGRES_CARDS || [];
  const storageKey = "postgres-pocket-deck-v3";
  const typeLabels = {
    STARTER: "01 · PostgreSQL 시작하기",
    SQL: "02 · SQL로 데이터 다루기",
    DATA: "03 · 타입과 데이터 모델링",
    TX: "04 · 트랜잭션과 동시성",
    INDEX: "05 · 인덱스와 쿼리 성능",
    PROGRAM: "06 · 서버 프로그래밍",
    INTERNAL: "07 · 내부 구조와 플래너",
    OPS: "08 · 운영과 신뢰성",
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
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    })[char]);
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (Number.isInteger(saved?.index)) {
        state.index = Math.max(0, Math.min(cards.length - 1, saved.index));
      }
      if (Array.isArray(saved?.reviewed)) state.reviewed = new Set(saved.reviewed);
    } catch (_) {
      // Local progress must never block the lesson.
    }
  }

  function saveState() {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ index: state.index, reviewed: [...state.reviewed] })
    );
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function diagramHtml(item) {
    const diagrams = {
      postgres: `
        <div class="diagram ecosystem">
          <span class="mini-node">SQL</span><span class="mini-node">JSONB</span><span class="mini-node">EXT</span>
          <strong class="db-core">PostgreSQL</strong>
          <div class="diagram-caption">관계형 코어 + 확장 가능한 데이터 엔진</div>
        </div>`,
      "client-server": `
        <div class="diagram client-server">
          <div class="client-stack"><span>psql</span><span>WEB</span><span>GUI</span></div>
          <i class="flow-arrow">→</i>
          <div class="server-stack"><strong>postgres</strong><span>backend × N</span></div>
          <i class="flow-arrow">→</i><span class="disk-node">DB</span>
        </div>`,
      table: `
        <div class="diagram table-map">
          <div class="mini-table"><b>accounts</b><span><em>PK</em> account_id</span><span><em>UQ</em> email</span><span><em>CK</em> balance ≥ 0</span></div>
          <div class="rule-note">타입 + 제약조건<br><strong>데이터 규칙</strong></div>
        </div>`,
      transaction: `
        <div class="diagram tx-map">
          <div class="account-node"><span>ALICE</span><strong>−100</strong></div>
          <div class="tx-core"><small>BEGIN</small><b>ALL<br>OR<br>NOTHING</b><small>COMMIT</small></div>
          <div class="account-node"><span>BOB</span><strong>+100</strong></div>
        </div>`,
      mvcc: `
        <div class="diagram mvcc-map">
          <div class="session-line"><b>SESSION A</b><span>READ v1</span><i>snapshot</i></div>
          <div class="version-stack"><span>v1 · 1000</span><span>v2 · 900</span></div>
          <div class="session-line write"><b>SESSION B</b><span>WRITE v2</span><i>commit</i></div>
        </div>`,
      index: `
        <div class="diagram index-map">
          <div class="scan-list"><span></span><span></span><span></span><span></span><span class="hit"></span><span></span></div>
          <div class="versus">SEQ<br>↔<br>INDEX</div>
          <div class="btree"><span class="root">50</span><span>20</span><span class="hit">80</span><i>→ row</i></div>
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
      flipCard();
    }
  });

  let pointerStart = null;
  $("#card-stage").addEventListener("pointerdown", (event) => { pointerStart = event.clientX; });
  $("#card-stage").addEventListener("pointerup", (event) => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(distance) < 60) return;
    if (distance > 0 && state.index > 0) goTo(state.index - 1);
    if (distance < 0 && state.index < cards.length - 1) goTo(state.index + 1);
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
    if (event.key.toLowerCase() === "r") randomCard();
  });

  loadState();
  renderCard();
})();
