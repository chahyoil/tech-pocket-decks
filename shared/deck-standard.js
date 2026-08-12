/* Tech Pocket Decks — shared runtime contract */
(function (root) {
  "use strict";

  const STORAGE_PREFIX = "tech-pocket-decks";

  function asText(value, fallback = "") {
    return value === undefined || value === null ? fallback : String(value);
  }

  function normalizeCard(raw = {}, index = 0) {
    const stats = raw.stats || {};
    const attrs = raw.attrs ?? raw.tags ?? [];
    const rank = raw.rank ?? raw.rarity ?? raw.level ?? "CORE";

    return {
      ...raw,
      id: asText(raw.id, `CARD-${String(index + 1).padStart(3, "0")}`),
      number: raw.number ?? raw.num ?? index + 1,
      nameEn: asText(raw.nameEn ?? raw.titleEn),
      nameKo: asText(raw.nameKo ?? raw.titleKo),
      type: asText(raw.type ?? raw.category, "GENERAL"),
      rank: asText(rank),
      rankKind: raw.rarity ? "rarity" : "level",
      rarity: asText(raw.rarity ?? rank),
      level: asText(raw.level ?? rank),
      atk: asText(raw.atk ?? stats.atk),
      def: asText(raw.def ?? stats.def),
      effect: asText(raw.effect ?? raw.concept),
      flavor: asText(raw.flavor ?? raw.quote),
      attrs: Array.isArray(attrs) ? attrs.map((value) => asText(value)) : [],
      icon: asText(raw.icon, "◆"),
      chapter: asText(raw.chapter ?? raw.type ?? raw.category, "GENERAL"),
      visual: raw.visual ?? raw.diagramNodes ?? null,
      diagramNodes: Array.isArray(raw.diagramNodes) ? raw.diagramNodes : [],
      snippet: asText(raw.snippet),
      detail: asText(raw.detail),
      code: asText(raw.code),
      lang: asText(raw.lang, "text"),
    };
  }

  function normalizeCards(cards) {
    return Array.isArray(cards) ? cards.map(normalizeCard) : [];
  }

  function escapeHtml(value = "") {
    return asText(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    })[char]);
  }

  function storageKey(deck) {
    return `${STORAGE_PREFIX}:${deck}:v1`;
  }

  function loadState(deck, legacyKeys = []) {
    const key = storageKey(deck);
    const keys = [key, ...legacyKeys.filter(Boolean)];

    for (const candidate of keys) {
      try {
        const raw = localStorage.getItem(candidate);
        if (!raw) continue;
        const state = JSON.parse(raw);
        if (candidate !== key) localStorage.setItem(key, raw);
        return state && typeof state === "object" ? state : null;
      } catch (_) {
        // Corrupt or unavailable storage must not block a lesson.
      }
    }
    return null;
  }

  function saveState(deck, state) {
    try {
      localStorage.setItem(storageKey(deck), JSON.stringify(state));
    } catch (_) {
      // Private browsing/storage limits must not block navigation.
    }
  }

  function attachSwipe(target, { onPrevious, onNext, threshold = 56 } = {}) {
    if (!target) return () => {};
    let start = null;

    const reset = () => { start = null; };
    const onDown = (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      const origin = event.target instanceof Element ? event.target : null;
      if (origin?.closest("button, a, pre, code, .detail-box, .code-box, [data-no-swipe]")) return;
      start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    };
    const onUp = (event) => {
      if (!start || (start.id !== undefined && event.pointerId !== start.id)) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      reset();
      if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy) * 1.15) return;
      if (dx > 0) onPrevious?.();
      else onNext?.();
    };

    target.addEventListener("pointerdown", onDown, { passive: true });
    target.addEventListener("pointerup", onUp, { passive: true });
    target.addEventListener("pointercancel", reset, { passive: true });

    return () => {
      target.removeEventListener("pointerdown", onDown);
      target.removeEventListener("pointerup", onUp);
      target.removeEventListener("pointercancel", reset);
    };
  }

  root.DeckStandard = Object.freeze({
    version: 1,
    normalizeCard,
    normalizeCards,
    escapeHtml,
    storageKey,
    loadState,
    saveState,
    attachSwipe,
  });
})(window);
