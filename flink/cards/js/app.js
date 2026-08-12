(() => {
  const Standard = window.DeckStandard;
  const CARDS = Standard.normalizeCards(window.FLINK_CARDS);
  const VISUALS = window.FLINK_VISUALS || {};
  const DECK_ID = "flink";
  const LEGACY_STORAGE_KEYS = ["flink-card-deck-v2"];
  const RARITY_WEIGHT = { N: 40, R: 30, SR: 18, UR: 10, LR: 2 };

  const TYPE_LABEL = {
    STARTER: "입문 STARTER",
    CORE: "핵심 CORE",
    ARCH: "아키텍처 ARCH",
    API: "API 계층",
    OPS: "운영 OPS",
  };

  const state = {
    index: 0,
    owned: new Set(),
    recentRandom: [],
    filter: "ALL",
    view: "viewer",
    flipped: false,
    shuffleLock: false,
    swipeDx: 0,
  };

  const $ = (sel) => document.querySelector(sel);
  const cardEl = $("#card");
  const faceFront = $("#face-front");
  const faceBack = $("#face-back");
  const progressEl = $("#progress");
  const toastEl = $("#toast");
  const dexGrid = $("#dex-grid");
  const pathScroll = $("#path-scroll");
  const collectRate = $("#collect-rate");
  const btnPrev = $("#btn-prev");
  const btnNext = $("#btn-next");
  const btnRandom = $("#btn-random");

  function escapeHtml(s) {
    return Standard.escapeHtml(s);
  }

  function load() {
    try {
      const data = Standard.loadState(DECK_ID, LEGACY_STORAGE_KEYS);
      if (!data) return;
      const seen = data.seen ?? data.owned ?? data.reviewed;
      if (Array.isArray(seen)) state.owned = new Set(seen);
      if (typeof data.index === "number") {
        state.index = Math.max(0, Math.min(CARDS.length - 1, data.index));
      }
    } catch (_) {
      /* ignore */
    }
  }

  function save() {
    Standard.saveState(DECK_ID, { index: state.index, seen: [...state.owned] });
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  function showNewBadge() {
    const nb = faceFront.querySelector("#new-badge");
    if (!nb) return;
    nb.classList.add("show");
    setTimeout(() => nb.classList.remove("show"), 1800);
  }

  function rarityStars(r) {
    return { N: "★", R: "★★", SR: "★★★", UR: "★★★★", LR: "★★★★★" }[r] || "★";
  }

  function artHtml(c) {
    const svg = VISUALS[c.visual];
    if (svg) {
      return `<div class="art-diagram">${svg}</div>`;
    }
    return `<pre class="art-snippet">${escapeHtml(c.snippet || c.nameEn)}</pre>`;
  }

  function renderCard({ announceNew } = {}) {
    const c = CARDS[state.index];
    const wasNew = !state.owned.has(c.id);
    state.owned.add(c.id);
    state.flipped = false;
    cardEl.classList.remove("flipped");
    cardEl.style.transform = "";
    cardEl.dataset.rarity = c.rarity;

    faceFront.innerHTML = `
      <div class="card-header">
        <span class="rarity-badge" data-r="${c.rarity}">${rarityStars(c.rarity)} ${c.rarity}</span>
        <span class="card-id">#${String(state.index + 1).padStart(3, "0")} · ${c.id}</span>
      </div>
      <div class="art">
        <span class="new-badge" id="new-badge">NEW!</span>
        ${artHtml(c)}
      </div>
      <div class="title-block">
        <h1>${escapeHtml(c.nameEn)}</h1>
        <div class="ko">${escapeHtml(c.nameKo)}</div>
        <div class="tags">
          <span class="tag">${escapeHtml(c.type)}</span>
          ${(c.attrs || []).map((a) => `<span class="tag">${escapeHtml(a)}</span>`).join("")}
        </div>
      </div>
      <div class="stats">
        <div class="stat"><label>ATK</label><span>${escapeHtml(c.atk)}</span></div>
        <div class="stat"><label>DEF</label><span>${escapeHtml(c.def)}</span></div>
      </div>
      <div class="effect-box">
        <div class="label">CONCEPT</div>
        <p>${escapeHtml(c.effect)}</p>
      </div>
      <div class="flavor">「${escapeHtml(c.flavor)}」</div>
      <div class="hint-tap">탭 → 상세 + 코드</div>
    `;

    faceBack.innerHTML = `
      <div class="back-inner">
        <div class="back-title">
          <h2>${escapeHtml(c.nameKo)}</h2>
          <span class="lang-pill">${escapeHtml(c.lang || "code")}</span>
        </div>
        <div class="detail-box">
          <div class="label">DETAIL</div>
          <p>${escapeHtml(c.detail)}</p>
        </div>
        <div class="code-box">
          <div class="label">CODE</div>
          <pre><code>${escapeHtml(c.code || "")}</code></pre>
        </div>
        <div class="hint-tap">탭 → 앞면</div>
      </div>
    `;

    progressEl.innerHTML = `<b>${state.index + 1}</b> / ${CARDS.length}`;
    btnPrev.disabled = state.index <= 0;
    btnNext.disabled = state.index >= CARDS.length - 1;

    if (announceNew && wasNew) {
      showNewBadge();
      toast(`✨ NEW! ${c.nameKo}`);
    }

    updateCollectRate();
    save();
  }

  function goTo(index, { announceNew, randomAnim } = {}) {
    state.index = Math.max(0, Math.min(CARDS.length - 1, index));
    if (randomAnim) {
      cardEl.classList.remove("shuffle");
      void cardEl.offsetWidth;
      cardEl.classList.add("shuffle");
      setTimeout(() => cardEl.classList.remove("shuffle"), 700);
    }
    renderCard({ announceNew });
  }

  function goNext() {
    if (state.index < CARDS.length - 1) goTo(state.index + 1);
  }

  function goPrev() {
    if (state.index > 0) goTo(state.index - 1);
  }

  function weightedRandomIndex() {
    const recent = new Set(state.recentRandom);
    const pool = CARDS.map((c, i) => ({ c, i })).filter(({ i }) => !recent.has(i));
    const list = pool.length ? pool : CARDS.map((c, i) => ({ c, i }));
    const weights = list.map(({ c, i }) => {
      let w = RARITY_WEIGHT[c.rarity] || 10;
      if (!state.owned.has(c.id)) w *= 1.8;
      if (i === state.index) w *= 0.15;
      return w;
    });
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let k = 0; k < list.length; k++) {
      r -= weights[k];
      if (r <= 0) return list[k].i;
    }
    return list[list.length - 1].i;
  }

  function doRandom() {
    if (state.shuffleLock) return;
    state.shuffleLock = true;
    btnRandom.disabled = true;
    cardEl.classList.remove("flipped");
    state.flipped = false;

    let ticks = 0;
    const iv = setInterval(() => {
      const preview = Math.floor(Math.random() * CARDS.length);
      const p = CARDS[preview];
      cardEl.dataset.rarity = p.rarity;
      const art = faceFront.querySelector(".art");
      if (art) {
        const badge = `<span class="new-badge" id="new-badge">NEW!</span>`;
        art.innerHTML = badge + artHtml(p);
      }
      const title = faceFront.querySelector("h1");
      if (title) title.textContent = p.nameEn;
      ticks++;
      if (ticks >= 8) {
        clearInterval(iv);
        const idx = weightedRandomIndex();
        state.recentRandom.push(idx);
        if (state.recentRandom.length > 5) state.recentRandom.shift();
        goTo(idx, { announceNew: true, randomAnim: true });
        toast(`🎲 ${CARDS[idx].rarity} · ${CARDS[idx].nameKo}`);
        setTimeout(() => {
          state.shuffleLock = false;
          btnRandom.disabled = false;
        }, 400);
      }
    }, 70);
  }

  function flipCard() {
    state.flipped = !state.flipped;
    cardEl.classList.toggle("flipped", state.flipped);
  }

  let startX = 0;
  let startY = 0;
  let dragging = false;
  let moved = false;

  function onPointerDown(e) {
    if (state.shuffleLock) return;
    const origin = e.target instanceof Element ? e.target : null;
    if (origin?.closest("button, a, pre, code, .detail-box, .code-box")) return;
    const t = e.touches ? e.touches[0] : e;
    startX = t.clientX;
    startY = t.clientY;
    dragging = true;
    moved = false;
    state.swipeDx = 0;
    cardEl.classList.add("dragging");
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const t = e.touches ? e.touches[0] : e;
    state.swipeDx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(state.swipeDx) > 8 || Math.abs(dy) > 8) moved = true;
    if (Math.abs(dy) > Math.abs(state.swipeDx) && Math.abs(dy) > 12) return;
    const rot = state.swipeDx * 0.05;
    const base = state.flipped ? "rotateY(180deg) " : "";
    cardEl.style.transform = `${base}translateX(${state.swipeDx}px) rotate(${rot}deg)`;
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    cardEl.classList.remove("dragging");
    cardEl.style.transform = "";
    if (state.swipeDx > 70) goPrev();
    else if (state.swipeDx < -70) goNext();
  }

  const stage = $("#card-stage");
  stage.addEventListener("touchstart", onPointerDown, { passive: true });
  stage.addEventListener("touchmove", onPointerMove, { passive: true });
  stage.addEventListener("touchend", onPointerUp);
  stage.addEventListener("mousedown", onPointerDown);
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("mouseup", onPointerUp);

  cardEl.addEventListener("click", (e) => {
    if (e.target.closest("a, button, .detail-box, .code-box")) return;
    if (moved || Math.abs(state.swipeDx) > 10) return;
    flipCard();
  });

  btnPrev.addEventListener("click", goPrev);
  btnNext.addEventListener("click", goNext);
  btnRandom.addEventListener("click", doRandom);

  window.addEventListener("keydown", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (state.view !== "viewer") return;
    if (target?.closest("button, a, input, textarea, select, pre, code")) return;
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      flipCard();
    }
    if (e.key === "r" || e.key === "R") doRandom();
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      state.view = view;
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b === btn));
      document.querySelectorAll(".view").forEach((v) => {
        v.classList.toggle("active", v.id === `view-${view}`);
      });
      if (view === "dex") renderDex();
      if (view === "path") renderPath();
    });
  });

  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.filter = chip.dataset.filter;
      document.querySelectorAll(".filter-chip").forEach((c) => {
        c.classList.toggle("active", c === chip);
      });
      renderDex();
    });
  });

  function updateCollectRate() {
    const n = state.owned.size;
    const total = CARDS.length;
    const pct = Math.round((n / total) * 100);
    if (collectRate) collectRate.innerHTML = `<b>${n}</b>/${total} (${pct}%)`;
  }

  function dexGlyph(c) {
    const map = {
      STARTER: "①",
      CORE: "②",
      ARCH: "③",
      API: "④",
      OPS: "⑤",
    };
    return map[c.type] || "◆";
  }

  function renderDex() {
    updateCollectRate();
    const filter = state.filter;
    const list = CARDS.filter((c) => {
      if (filter === "ALL") return true;
      if (filter === "OWNED") return state.owned.has(c.id);
      if (filter === "LOCKED") return !state.owned.has(c.id);
      if (filter === "UR") return c.rarity === "UR" || c.rarity === "LR";
      if (["N", "R", "SR", "LR"].includes(filter)) return c.rarity === filter;
      return c.type === filter;
    });

    dexGrid.innerHTML = list
      .map((c) => {
        const owned = state.owned.has(c.id);
        const idx = CARDS.indexOf(c);
        return `
        <button type="button" class="dex-cell ${owned ? "" : "locked"}" data-r="${c.rarity}" data-idx="${idx}">
          <span class="d-icon">${owned ? dexGlyph(c) : "❓"}</span>
          <span class="d-name">${owned ? escapeHtml(c.nameEn) : "???"}</span>
          <span class="d-r">${c.rarity}</span>
        </button>`;
      })
      .join("");

    dexGrid.querySelectorAll(".dex-cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        goTo(Number(cell.dataset.idx));
        document.querySelector('.tab-btn[data-view="viewer"]').click();
      });
    });
  }

  function renderPath() {
    const types = ["STARTER", "CORE", "ARCH", "API", "OPS"];
    pathScroll.innerHTML = types
      .map((type) => {
        const cards = CARDS.filter((c) => c.type === type);
        const owned = cards.filter((c) => state.owned.has(c.id)).length;
        return `
        <div class="path-block">
          <h3>${TYPE_LABEL[type] || type} <b>${owned}/${cards.length}</b></h3>
          <div class="path-list">
            ${cards
              .map((c) => {
                const idx = CARDS.indexOf(c);
                const isOwned = state.owned.has(c.id);
                return `
                <button type="button" class="path-item ${isOwned ? "owned" : ""}" data-idx="${idx}">
                  <span class="num">#${String(idx + 1).padStart(2, "0")}</span>
                  <span class="p-icon">${dexGlyph(c)}</span>
                  <span class="p-text">
                    <strong>${escapeHtml(c.nameEn)}</strong>
                    <span>${escapeHtml(c.nameKo)} · ${c.rarity}</span>
                  </span>
                  <span class="check">${isOwned ? "✅" : "⬜"}</span>
                </button>`;
              })
              .join("")}
          </div>
        </div>`;
      })
      .join("");

    pathScroll.querySelectorAll(".path-item").forEach((item) => {
      item.addEventListener("click", () => {
        goTo(Number(item.dataset.idx));
        document.querySelector('.tab-btn[data-view="viewer"]').click();
      });
    });
  }

  load();
  renderCard();
  updateCollectRate();
})();
