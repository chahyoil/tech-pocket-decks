// Kafka Card Deck Controller — Mobile TCG App

(function () {
  let currentIndex = 0;
  let isFlipped = false;
  const collectedIds = new Set([KAFKA_CARDS[0].id]);

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
    renderCard(currentIndex);
    setupEvents();
    renderDex("ALL");
    renderPath();
  }

  function renderCard(index) {
    const data = KAFKA_CARDS[index];
    collectedIds.add(data.id);
    isFlipped = false;
    cardEl.classList.remove("flipped");
    cardEl.setAttribute("data-rarity", data.rarity);

    // Progress Pill
    progressEl.innerHTML = `<b>${index + 1}</b> / ${KAFKA_CARDS.length}`;

    // Front Face Render
    frontFace.innerHTML = `
      <div class="card-header">
        <span class="rarity-badge" data-r="${data.rarity}">★ ${data.rarity}</span>
        <span class="card-id">#${data.num} • ${data.id}</span>
      </div>
      <div class="art">
        <div class="diagram-flow">
          ${data.diagramNodes
            .map(
              (n, i) => `
            <div class="d-node ${n.type}">${n.name}</div>
            ${i < data.diagramNodes.length - 1 ? '<span class="d-arrow">➔</span>' : ""}
          `
            )
            .join("")}
        </div>
      </div>
      <div class="title-block">
        <h1>${data.titleEn}</h1>
        <div class="ko">${data.titleKo}</div>
        <div class="tags">
          ${data.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="stats">
        <div class="stat"><label>ATK</label><span>${data.stats.atk}</span></div>
        <div class="stat"><label>DEF</label><span>${data.stats.def}</span></div>
      </div>
      <div class="concept-box">
        <div class="label">CONCEPT</div>
        <p>${data.concept}</p>
      </div>
      <div class="quote">${data.quote}</div>
      <div class="hint-tap">👆 터치하여 상세 및 실전 코드 보기</div>
    `;

    // Back Face Render
    backFace.innerHTML = `
      <div class="back-inner">
        <div class="back-header">
          <h2>${data.titleKo}</h2>
          <span class="badge-lang">KAFKA v4.3</span>
        </div>
        <div class="detail-box">
          <div class="label">OFFICIAL DETAIL</div>
          <p>${data.detail}</p>
        </div>
        <div class="code-box">
          <div class="label">CODE & EXAMPLE</div>
          <pre><code>${escapeHtml(data.code)}</code></pre>
        </div>
        <div class="hint-tap">👆 터치하여 카드 앞면으로</div>
      </div>
    `;

    updateControls();
    updateDexStats();
  }

  function updateControls() {
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === KAFKA_CARDS.length - 1;
  }

  function setupEvents() {
    // Card Flip
    cardEl.addEventListener("click", () => {
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
      if (currentIndex < KAFKA_CARDS.length - 1) {
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
          rand = Math.floor(Math.random() * KAFKA_CARDS.length);
        } while (rand === currentIndex && KAFKA_CARDS.length > 1);
        currentIndex = rand;
        renderCard(currentIndex);
        cardEl.classList.remove("shuffle");
      }, 300);
    });

    // Touch Swiping on Card Stage
    let touchStartX = 0;
    let touchEndX = 0;
    const stage = document.getElementById("card-stage");

    stage.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0 && currentIndex < KAFKA_CARDS.length - 1) {
          currentIndex++;
          renderCard(currentIndex);
        } else if (diff > 0 && currentIndex > 0) {
          currentIndex--;
          renderCard(currentIndex);
        }
      }
    }

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
    KAFKA_CARDS.forEach((card, idx) => {
      const isOwned = collectedIds.has(card.id);
      if (filter === "OWNED" && !isOwned) return;
      if (filter !== "ALL" && filter !== "OWNED" && card.category !== filter) return;

      const cell = document.createElement("div");
      cell.className = `dex-cell ${isOwned ? "" : "locked"}`;
      cell.setAttribute("data-r", card.rarity);
      cell.innerHTML = `
        <div class="d-icon">${card.icon}</div>
        <div class="d-name">${card.titleKo}</div>
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
    const rate = Math.round((collectedIds.size / KAFKA_CARDS.length) * 100);
    collectRate.innerHTML = `<b>${collectedIds.size}</b>/${KAFKA_CARDS.length} (${rate}%)`;
  }

  function renderPath() {
    pathScroll.innerHTML = KAFKA_CARDS.map(
      (card, idx) => `
      <div class="path-item">
        <div class="path-idx">${idx + 1}</div>
        <div class="path-card" data-idx="${idx}">
          <h3>${card.num}. ${card.titleKo}</h3>
          <p>${card.titleEn} • ${card.stats.atk}</p>
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
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
