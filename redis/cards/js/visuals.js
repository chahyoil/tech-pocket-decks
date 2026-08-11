/** Mini SVG diagrams for Redis card fronts (viewBox 280×100) */
window.REDIS_VISUALS = {
  memory: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="16" width="150" height="68" rx="10" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="87" y="32" text-anchor="middle" fill="#ff6b5e" font-size="10" font-weight="700" font-family="sans-serif">IN-MEMORY</text>
  <rect x="22" y="40" width="40" height="16" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="42" y="52" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">Hash</text>
  <rect x="68" y="40" width="40" height="16" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="88" y="52" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">ZSet</text>
  <rect x="114" y="40" width="40" height="16" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="134" y="52" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">List</text>
  <rect x="22" y="60" width="62" height="16" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="53" y="72" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">Stream</text>
  <rect x="90" y="60" width="64" height="16" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="122" y="72" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">Set / String</text>
  <path d="M168 50 H190" stroke="#6d5a5c" stroke-width="2" stroke-dasharray="3 3"/>
  <polygon points="190,45 200,50 190,55" fill="#6d5a5c"/>
  <ellipse cx="238" cy="34" rx="30" ry="8" fill="#1b2430" stroke="#546e7a"/>
  <path d="M208 34 V66 a30 8 0 0 0 60 0 V34" fill="#1b2430" stroke="#546e7a"/>
  <text x="238" y="56" text-anchor="middle" fill="#78909c" font-size="9" font-family="sans-serif">RDB/AOF</text>
</svg>`,

  ttl: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="16" y="34" width="112" height="32" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="72" y="54" text-anchor="middle" fill="#ffcdd2" font-size="10" font-family="ui-monospace,monospace">session:u1000</text>
  <circle cx="160" cy="50" r="17" fill="none" stroke="#ffb300" stroke-width="2"/>
  <path d="M160 40 V50 L168 55" stroke="#ffb300" stroke-width="2" fill="none" stroke-linecap="round"/>
  <text x="160" y="82" text-anchor="middle" fill="#ffb300" font-size="9" font-family="sans-serif">EX 3600</text>
  <path d="M182 50 H206" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="206,45 216,50 206,55" fill="#ff6b5e"/>
  <rect x="222" y="34" width="44" height="32" rx="8" fill="#1a1416" stroke="#4a3a3c" stroke-dasharray="4 3"/>
  <text x="244" y="55" text-anchor="middle" fill="#6d5a5c" font-size="14" font-family="sans-serif">✕</text>
  <text x="244" y="82" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">expired</text>
</svg>`,

  string: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="36" width="86" height="28" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="57" y="55" text-anchor="middle" fill="#ffcdd2" font-size="10" font-family="ui-monospace,monospace">key</text>
  <path d="M104 50 H126" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="126,45 136,50 126,55" fill="#ff6b5e"/>
  <rect x="142" y="28" width="124" height="44" rx="6" fill="#0d1117" stroke="#30363d"/>
  <text x="152" y="46" fill="#a5d6ff" font-size="9" font-family="ui-monospace,monospace">01001010 11010...</text>
  <text x="152" y="62" fill="#7d8590" font-size="9" font-family="ui-monospace,monospace">bytes ≤ 512MB</text>
  <text x="204" y="20" text-anchor="middle" fill="#ff6b5e" font-size="9" font-weight="700" font-family="sans-serif">INCR · APPEND · SETRANGE</text>
</svg>`,

  hash: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="140" y="18" text-anchor="middle" fill="#ff6b5e" font-size="10" font-weight="700" font-family="ui-monospace,monospace">user:1000</text>
  <rect x="46" y="26" width="188" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
  <line x1="130" y1="26" x2="130" y2="86" stroke="#30363d"/>
  <line x1="46" y1="46" x2="234" y2="46" stroke="#30363d"/>
  <line x1="46" y1="66" x2="234" y2="66" stroke="#30363d"/>
  <text x="58" y="40" fill="#a5d6ff" font-size="9" font-family="ui-monospace,monospace">name</text>
  <text x="142" y="40" fill="#e6edf3" font-size="9" font-family="ui-monospace,monospace">"Yuna"</text>
  <text x="58" y="60" fill="#a5d6ff" font-size="9" font-family="ui-monospace,monospace">email</text>
  <text x="142" y="60" fill="#e6edf3" font-size="9" font-family="ui-monospace,monospace">y@ex.com</text>
  <text x="58" y="80" fill="#a5d6ff" font-size="9" font-family="ui-monospace,monospace">visits</text>
  <text x="142" y="80" fill="#ff8a80" font-size="9" font-weight="700" font-family="ui-monospace,monospace">42  ← HINCRBY</text>
</svg>`,

  list: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="30" y="30" text-anchor="middle" fill="#ff6b5e" font-size="9" font-weight="700" font-family="sans-serif">LPUSH</text>
  <path d="M30 36 V48" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="25,48 30,58 35,48" fill="#ff6b5e"/>
  <rect x="14" y="58" width="46" height="26" rx="5" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="37" y="75" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="ui-monospace,monospace">A</text>
  <rect x="66" y="58" width="46" height="26" rx="5" fill="#221618" stroke="#7a4a48"/>
  <text x="89" y="75" text-anchor="middle" fill="#d7b4b2" font-size="9" font-family="ui-monospace,monospace">B</text>
  <rect x="118" y="58" width="46" height="26" rx="5" fill="#221618" stroke="#7a4a48"/>
  <text x="141" y="75" text-anchor="middle" fill="#d7b4b2" font-size="9" font-family="ui-monospace,monospace">C</text>
  <rect x="170" y="58" width="46" height="26" rx="5" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="193" y="75" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="ui-monospace,monospace">D</text>
  <text x="193" y="30" text-anchor="middle" fill="#ff6b5e" font-size="9" font-weight="700" font-family="sans-serif">RPOP</text>
  <path d="M193 48 V36" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="188,36 193,26 198,36" fill="#ff6b5e"/>
  <text x="248" y="66" text-anchor="middle" fill="#66bb6a" font-size="9" font-weight="700" font-family="sans-serif">O(1)</text>
  <text x="248" y="80" text-anchor="middle" fill="#7d8590" font-size="8" font-family="sans-serif">양 끝만</text>
</svg>`,

  set: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="108" cy="50" r="34" fill="rgba(255,107,94,0.16)" stroke="#ff6b5e"/>
  <circle cx="152" cy="50" r="34" fill="rgba(66,165,245,0.16)" stroke="#42a5f5"/>
  <path d="M130 21 a34 34 0 0 0 0 58 a34 34 0 0 0 0 -58" fill="rgba(255,179,0,0.35)" stroke="none"/>
  <text x="88" y="54" text-anchor="middle" fill="#ffcdd2" font-size="10" font-family="sans-serif">A</text>
  <text x="130" y="54" text-anchor="middle" fill="#ffe082" font-size="10" font-weight="700" font-family="sans-serif">∩</text>
  <text x="172" y="54" text-anchor="middle" fill="#90caf9" font-size="10" font-family="sans-serif">B</text>
  <text x="130" y="16" text-anchor="middle" fill="#8b7f80" font-size="9" font-family="sans-serif">유니크 · 순서 없음</text>
  <text x="130" y="95" text-anchor="middle" fill="#ffb300" font-size="9" font-weight="700" font-family="ui-monospace,monospace">SINTER A B</text>
  <text x="243" y="46" text-anchor="middle" fill="#66bb6a" font-size="9" font-weight="700" font-family="sans-serif">SISMEMBER</text>
  <text x="243" y="60" text-anchor="middle" fill="#66bb6a" font-size="10" font-weight="700" font-family="sans-serif">O(1)</text>
</svg>`,

  zset: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="18" y="20" fill="#8b7f80" font-size="9" font-family="sans-serif">score 순 자동 정렬</text>
  <rect x="18" y="26" width="150" height="14" rx="3" fill="#ff6b5e"/>
  <text x="176" y="37" fill="#ffcdd2" font-size="9" font-family="ui-monospace,monospace">980 player:3</text>
  <rect x="18" y="44" width="110" height="14" rx="3" fill="#e05a4e"/>
  <text x="176" y="55" fill="#e6c9c7" font-size="9" font-family="ui-monospace,monospace">640 player:9</text>
  <rect x="18" y="62" width="72" height="14" rx="3" fill="#a8443c"/>
  <text x="176" y="73" fill="#c9aeac" font-size="9" font-family="ui-monospace,monospace">320 player:7</text>
  <rect x="18" y="80" width="40" height="14" rx="3" fill="#6e3630"/>
  <text x="176" y="91" fill="#a89290" font-size="9" font-family="ui-monospace,monospace">110 player:2</text>
  <text x="140" y="20" fill="#66bb6a" font-size="9" font-weight="700" font-family="sans-serif">ZADD / ZRANK  O(log N)</text>
</svg>`,

  stream: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#ff6b5e" font-size="9" font-weight="700" font-family="sans-serif">XADD →</text>
  <rect x="14" y="26" width="40" height="24" rx="4" fill="#221618" stroke="#7a4a48"/>
  <text x="34" y="42" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">…-0</text>
  <rect x="58" y="26" width="40" height="24" rx="4" fill="#221618" stroke="#7a4a48"/>
  <text x="78" y="42" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">…-1</text>
  <rect x="102" y="26" width="40" height="24" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="122" y="42" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">…-2</text>
  <rect x="146" y="26" width="40" height="24" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="166" y="42" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">…-3</text>
  <text x="196" y="42" fill="#6d5a5c" font-size="12" font-family="sans-serif">→ ∞</text>
  <path d="M122 52 V64" stroke="#42a5f5" stroke-width="1.5"/>
  <path d="M166 52 V64" stroke="#42a5f5" stroke-width="1.5"/>
  <rect x="86" y="64" width="70" height="22" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="121" y="79" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">worker-1</text>
  <rect x="164" y="64" width="70" height="22" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="199" y="79" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">worker-2</text>
  <text x="44" y="79" text-anchor="middle" fill="#42a5f5" font-size="8" font-weight="700" font-family="sans-serif">GROUP</text>
</svg>`,

  eventloop: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="10" y="20" width="34" height="18" rx="4" fill="#221618" stroke="#7a4a48"/>
  <text x="27" y="33" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">GET</text>
  <rect x="10" y="42" width="34" height="18" rx="4" fill="#221618" stroke="#7a4a48"/>
  <text x="27" y="55" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">INCR</text>
  <rect x="10" y="64" width="34" height="18" rx="4" fill="#221618" stroke="#7a4a48"/>
  <text x="27" y="77" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">ZADD</text>
  <text x="27" y="14" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">clients</text>
  <path d="M48 50 H74" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="74,45 84,50 74,55" fill="#ff6b5e"/>
  <circle cx="136" cy="50" r="32" fill="none" stroke="#ff6b5e" stroke-width="3" stroke-dasharray="140 20"/>
  <text x="136" y="46" text-anchor="middle" fill="#ff6b5e" font-size="10" font-weight="700" font-family="sans-serif">1 THREAD</text>
  <text x="136" y="60" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">한 번에 하나</text>
  <path d="M172 50 H198" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="198,45 208,50 198,55" fill="#66bb6a"/>
  <text x="244" y="40" text-anchor="middle" fill="#66bb6a" font-size="9" font-weight="700" font-family="sans-serif">원자성</text>
  <text x="244" y="54" text-anchor="middle" fill="#7d8590" font-size="8" font-family="sans-serif">락 불필요</text>
  <text x="244" y="70" text-anchor="middle" fill="#ffb300" font-size="8" font-family="sans-serif">느린 명령 = 정지</text>
</svg>`,

  replication: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="34" width="72" height="34" rx="8" fill="#2a1114" stroke="#ff6b5e" stroke-width="2"/>
  <text x="50" y="50" text-anchor="middle" fill="#ff8a80" font-size="10" font-weight="700" font-family="sans-serif">MASTER</text>
  <text x="50" y="62" text-anchor="middle" fill="#a8908f" font-size="8" font-family="sans-serif">read/write</text>
  <path d="M90 44 C120 44 120 22 150 22" stroke="#ff6b5e" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>
  <path d="M90 51 H150" stroke="#ff6b5e" stroke-width="1.5" stroke-dasharray="4 3"/>
  <path d="M90 58 C120 58 120 80 150 80" stroke="#ff6b5e" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>
  <text x="120" y="16" text-anchor="middle" fill="#ffb300" font-size="8" font-family="sans-serif">async</text>
  <rect x="152" y="10" width="66" height="24" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="185" y="26" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">replica</text>
  <rect x="152" y="40" width="66" height="24" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="185" y="56" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">replica</text>
  <rect x="152" y="70" width="66" height="24" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="185" y="86" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">replica</text>
  <text x="250" y="44" text-anchor="middle" fill="#7d8590" font-size="8" font-family="sans-serif">read</text>
  <text x="250" y="56" text-anchor="middle" fill="#7d8590" font-size="8" font-family="sans-serif">only</text>
</svg>`,

  persist: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="10" y="14" width="126" height="74" rx="8" fill="#1a1012" stroke="#7a4a48"/>
  <text x="73" y="30" text-anchor="middle" fill="#ff8a80" font-size="10" font-weight="700" font-family="sans-serif">RDB</text>
  <rect x="24" y="38" width="98" height="34" rx="6" fill="#0d1117" stroke="#30363d"/>
  <text x="73" y="52" text-anchor="middle" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">dump.rdb</text>
  <text x="73" y="65" text-anchor="middle" fill="#7d8590" font-size="8" font-family="sans-serif">fork · 시점 스냅샷</text>
  <text x="73" y="84" text-anchor="middle" fill="#ffb300" font-size="8" font-family="sans-serif">빠른 재시작 · 백업</text>
  <text x="144" y="54" text-anchor="middle" fill="#ff6b5e" font-size="13" font-weight="700" font-family="sans-serif">+</text>
  <rect x="152" y="14" width="118" height="74" rx="8" fill="#1a1012" stroke="#7a4a48"/>
  <text x="211" y="30" text-anchor="middle" fill="#ff8a80" font-size="10" font-weight="700" font-family="sans-serif">AOF</text>
  <rect x="164" y="38" width="94" height="34" rx="6" fill="#0d1117" stroke="#30363d"/>
  <text x="172" y="50" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">SET k v</text>
  <text x="172" y="60" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">INCR n</text>
  <text x="172" y="70" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">LPUSH q j</text>
  <text x="211" y="84" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="sans-serif">everysec · 최대 1초 손실</text>
</svg>`,

  eviction: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="9" font-family="sans-serif">maxmemory 100mb</text>
  <rect x="14" y="26" width="200" height="26" rx="6" fill="#1a1012" stroke="#7a4a48"/>
  <rect x="16" y="28" width="196" height="22" rx="5" fill="url(#g1)"/>
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#66bb6a"/>
      <stop offset="70%" stop-color="#ffb300"/>
      <stop offset="100%" stop-color="#ff6b5e"/>
    </linearGradient>
  </defs>
  <line x1="214" y1="20" x2="214" y2="58" stroke="#ff6b5e" stroke-width="2" stroke-dasharray="3 2"/>
  <text x="240" y="42" text-anchor="middle" fill="#ff6b5e" font-size="9" font-weight="700" font-family="sans-serif">LIMIT</text>
  <path d="M60 56 V70" stroke="#6d5a5c" stroke-width="1.5"/>
  <polygon points="55,70 60,80 65,70" fill="#6d5a5c"/>
  <path d="M110 56 V70" stroke="#6d5a5c" stroke-width="1.5"/>
  <polygon points="105,70 110,80 115,70" fill="#6d5a5c"/>
  <text x="86" y="95" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">least recently used → 축출</text>
  <text x="205" y="72" text-anchor="middle" fill="#ffb300" font-size="8" font-family="ui-monospace,monospace">allkeys-lru</text>
  <text x="205" y="86" text-anchor="middle" fill="#7d8590" font-size="8" font-family="sans-serif">표본 5개 근사</text>
</svg>`,

  pipeline: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="12" y="20" fill="#8b7f80" font-size="8.5" font-family="sans-serif">개별 실행 — 명령마다 RTT</text>
  <path d="M20 30 H60" stroke="#6d5a5c" stroke-width="1.5"/>
  <polygon points="60,26 68,30 60,34" fill="#6d5a5c"/>
  <path d="M68 40 H28" stroke="#6d5a5c" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="28,36 20,40 28,44" fill="#6d5a5c"/>
  <path d="M20 46 H60" stroke="#6d5a5c" stroke-width="1.5"/>
  <polygon points="60,42 68,46 60,50" fill="#6d5a5c"/>
  <path d="M68 56 H28" stroke="#6d5a5c" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="28,52 20,56 28,60" fill="#6d5a5c"/>
  <text x="80" y="46" fill="#6d5a5c" font-size="9" font-family="sans-serif">× N</text>
  <line x1="118" y1="14" x2="118" y2="92" stroke="#3a2c2e"/>
  <text x="134" y="20" fill="#ff6b5e" font-size="8.5" font-weight="700" font-family="sans-serif">PIPELINE — 한 번에</text>
  <path d="M136 34 H236" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="236,29 246,34 236,39" fill="#ff6b5e"/>
  <text x="186" y="30" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">cmd ×1000</text>
  <path d="M246 52 H146" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="146,47 136,52 146,57" fill="#66bb6a"/>
  <text x="196" y="66" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="ui-monospace,monospace">reply ×1000</text>
  <text x="196" y="86" text-anchor="middle" fill="#ffb300" font-size="9" font-weight="700" font-family="sans-serif">RTT 1회</text>
</svg>`,

  multi: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="16" y="18" fill="#ffb300" font-size="9" font-weight="700" font-family="ui-monospace,monospace">WATCH stock:42</text>
  <rect x="14" y="24" width="120" height="64" rx="8" fill="#1a1012" stroke="#ff6b5e" stroke-dasharray="4 3"/>
  <text x="74" y="40" text-anchor="middle" fill="#ff8a80" font-size="9" font-weight="700" font-family="ui-monospace,monospace">MULTI</text>
  <rect x="26" y="46" width="96" height="15" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="34" y="57" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">DECR stock:42</text>
  <rect x="26" y="64" width="96" height="15" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="34" y="75" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">LPUSH orders</text>
  <path d="M138 56 H162" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="162,51 172,56 162,61" fill="#ff6b5e"/>
  <text x="150" y="48" text-anchor="middle" fill="#ff8a80" font-size="8" font-weight="700" font-family="ui-monospace,monospace">EXEC</text>
  <rect x="178" y="24" width="88" height="30" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="222" y="37" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">둘 다 적용</text>
  <text x="222" y="48" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="sans-serif">중간 개입 없음</text>
  <rect x="178" y="58" width="88" height="30" rx="6" fill="#2e1416" stroke="#e05a4e"/>
  <text x="222" y="71" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">nil</text>
  <text x="222" y="82" text-anchor="middle" fill="#e05a4e" font-size="8" font-family="sans-serif">키 변경됨 → 재시도</text>
</svg>`,
};
