// Kafka Card Deck Controller — Mobile TCG App

(function () {
  const Standard = window.DeckStandard;
  const cards = Standard.normalizeCards(KAFKA_CARDS);
  const deckId = "kafka";
  let currentIndex = 0;
  let isFlipped = false;
  let collectedIds = new Set();

  // DOM Elements
  const cardEl = document.getElementById("card");
  const frontFace = document.getElementById("face-front");
  const backFace = document.getElementById("face-back");
  const progressEl = document.getElementById("progress");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnRandom = document.getElementById("btn-random");
  const toastEl = document.getElementById("toast");

  // Tab & View Navigation
  const tabBtns = document.querySelectorAll(".tab-btn");
  const views = document.querySelectorAll(".view");
  const dexGrid = document.getElementById("dex-grid");
  const collectRate = document.getElementById("collect-rate");
  const pathScroll = document.getElementById("path-scroll");

  function init() {
    loadProgress();
    renderCard(currentIndex);
    setupEvents();
    renderDex("ALL");
    renderPath();
  }

  function loadProgress() {
    const saved = Standard.loadState(deckId);
    if (Number.isInteger(saved?.index)) {
      currentIndex = Math.max(0, Math.min(cards.length - 1, saved.index));
    }
    const seen = saved?.seen ?? saved?.owned ?? saved?.reviewed;
    if (Array.isArray(seen)) collectedIds = new Set(seen);
  }

  function saveProgress() {
    Standard.saveState(deckId, { index: currentIndex, seen: [...collectedIds] });
  }

  function renderCard(index) {
    const data = cards[index];
    collectedIds.add(data.id);
    isFlipped = false;
    cardEl.classList.remove("flipped");
    cardEl.setAttribute("data-rarity", data.rarity);

    // Progress Pill
    progressEl.innerHTML = `<b>${index + 1}</b> / ${cards.length}`;

    // Front Face Render
    frontFace.innerHTML = `
      <div class="card-header">
        <span class="rarity-badge" data-r="${data.rarity}">★ ${data.rarity}</span>
        <span class="card-id">#${escapeHtml(data.number)} • ${escapeHtml(data.id)}</span>
      </div>
      <div class="art">
        <div class="diagram-flow">
          ${data.diagramNodes
            .map(
              (n, i) => `
            <div class="d-node ${n.type === "highlight" ? "highlight" : ""}">${escapeHtml(n.name)}</div>
            ${i < data.diagramNodes.length - 1 ? '<span class="d-arrow">➔</span>' : ""}
          `
            )
            .join("")}
        </div>
      </div>
      <div class="title-block">
        <h1>${escapeHtml(data.nameEn)}</h1>
        <div class="ko">${escapeHtml(data.nameKo)}</div>
        <div class="tags">
          <span class="tag">${escapeHtml(data.type)}</span>
          ${data.attrs.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
      <div class="stats">
        <div class="stat"><label>ATK</label><span>${escapeHtml(data.atk)}</span></div>
        <div class="stat"><label>DEF</label><span>${escapeHtml(data.def)}</span></div>
      </div>
      <div class="concept-box">
        <div class="label">CONCEPT</div>
        <p>${escapeHtml(data.effect)}</p>
      </div>
      <div class="quote">「${escapeHtml(data.flavor)}」</div>
      <div class="hint-tap">탭 → 상세 + 코드</div>
    `;

    // Back Face Render
    backFace.innerHTML = `
      <div class="back-inner">
        <div class="back-header">
          <h2>${escapeHtml(data.nameKo)}</h2>
          <span class="badge-lang">${escapeHtml(data.lang || "Kafka")}</span>
        </div>
        <div class="detail-box">
          <div class="label">DETAIL</div>
          <p>${escapeHtml(data.detail)}</p>
        </div>
        <div class="code-box">
          <div class="label">CODE & EXAMPLE</div>
          <pre><code>${escapeHtml(data.code)}</code></pre>
        </div>
        <div class="hint-tap">탭 → 앞면</div>
      </div>
    `;

    updateControls();
    updateDexStats();
    saveProgress();
  }

  function updateControls() {
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === cards.length - 1;
  }

  function setupEvents() {
    // Card Flip
    cardEl.addEventListener("click", (event) => {
      if (event.target.closest("button, a, .detail-box, .code-box")) return;
      isFlipped = !isFlipped;
      cardEl.classList.toggle("flipped", isFlipped);
    });

    // Button Nav
    btnPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentIndex > 0) {
        currentIndex--;
        renderCard(currentIndex);
      }
    });

    btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        renderCard(currentIndex);
      }
    });

    btnRandom.addEventListener("click", (e) => {
      e.stopPropagation();
      cardEl.classList.add("shuffle");
      showToast("🎲 새로운 랜덤 카드를 뽑았습니다!");
      setTimeout(() => {
        let rand;
        do {
          rand = Math.floor(Math.random() * cards.length);
        } while (rand === currentIndex && cards.length > 1);
        currentIndex = rand;
        renderCard(currentIndex);
        cardEl.classList.remove("shuffle");
      }, 300);
    });

    const stage = document.getElementById("card-stage");
    Standard.attachSwipe(stage, {
      onPrevious: () => {
        if (currentIndex > 0) renderCard(--currentIndex);
      },
      onNext: () => {
        if (currentIndex < cards.length - 1) renderCard(++currentIndex);
      },
    });

    window.addEventListener("keydown", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const viewerActive = document.getElementById("view-viewer").classList.contains("active");
      if (!viewerActive || target?.closest("button, a, input, textarea, select")) return;
      if (event.key === "ArrowLeft" && currentIndex > 0) renderCard(--currentIndex);
      if (event.key === "ArrowRight" && currentIndex < cards.length - 1) renderCard(++currentIndex);
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        isFlipped = !isFlipped;
        cardEl.classList.toggle("flipped", isFlipped);
      }
      if (event.key.toLowerCase() === "r") btnRandom.click();
    });

    // Tab Navigation
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetView = btn.getAttribute("data-view");
        tabBtns.forEach((b) => b.classList.remove("active"));
        views.forEach((v) => v.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(`view-${targetView}`).classList.add("active");
      });
    });

    // Dex Filter Chips
    const filterChips = document.querySelectorAll(".filter-chip");
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        renderDex(chip.getAttribute("data-filter"));
      });
    });
  }

  function renderDex(filter) {
    dexGrid.innerHTML = "";
    cards.forEach((card, idx) => {
      const isOwned = collectedIds.has(card.id);
      if (filter === "OWNED" && !isOwned) return;
      if (filter !== "ALL" && filter !== "OWNED" && card.type !== filter) return;

      const cell = document.createElement("div");
      cell.className = `dex-cell ${isOwned ? "" : "locked"}`;
      cell.setAttribute("data-r", card.rarity);
      cell.innerHTML = `
        <div class="d-icon">${escapeHtml(card.icon)}</div>
        <div class="d-name">${escapeHtml(card.nameKo)}</div>
        <div class="d-r" style="color: var(--${card.rarity.toLowerCase()})">${card.rarity}</div>
      `;

      cell.addEventListener("click", () => {
        currentIndex = idx;
        renderCard(currentIndex);
        document.querySelector('[data-view="viewer"]').click();
      });

      dexGrid.appendChild(cell);
    });
  }

  function updateDexStats() {
    const rate = Math.round((collectedIds.size / cards.length) * 100);
    collectRate.innerHTML = `<b>${collectedIds.size}</b>/${cards.length} (${rate}%)`;
  }

  function renderPath() {
    pathScroll.innerHTML = cards.map(
      (card, idx) => `
      <div class="path-item">
        <div class="path-idx">${idx + 1}</div>
        <div class="path-card" data-idx="${idx}">
          <h3>${escapeHtml(card.number)}. ${escapeHtml(card.nameKo)}</h3>
          <p>${escapeHtml(card.nameEn)} • ${escapeHtml(card.atk)}</p>
        </div>
      </div>
    `
    ).join("");

    pathScroll.querySelectorAll(".path-card").forEach((el) => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        currentIndex = idx;
        renderCard(currentIndex);
        document.querySelector('[data-view="viewer"]').click();
      });
    });
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 2000);
  }

  function escapeHtml(str) {
    return Standard.escapeHtml(str);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
