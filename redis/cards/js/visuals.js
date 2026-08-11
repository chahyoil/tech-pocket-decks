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

  cli: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="12" width="252" height="76" rx="8" fill="#0d1117" stroke="#30363d"/>
  <circle cx="26" cy="22" r="3" fill="#ff6b5e"/><circle cx="36" cy="22" r="3" fill="#ffb300"/><circle cx="46" cy="22" r="3" fill="#66bb6a"/>
  <text x="24" y="44" fill="#66bb6a" font-size="9" font-family="ui-monospace,monospace">&gt; TYPE user:1000</text>
  <text x="34" y="56" fill="#a5d6ff" font-size="9" font-family="ui-monospace,monospace">hash</text>
  <text x="24" y="70" fill="#66bb6a" font-size="9" font-family="ui-monospace,monospace">&gt; OBJECT ENCODING user:1000</text>
  <text x="34" y="82" fill="#ffb300" font-size="9" font-family="ui-monospace,monospace">listpack</text>
</svg>`,

  resp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="252" height="72" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="26" y="32" fill="#66bb6a" font-size="10" font-family="ui-monospace,monospace">+OK</text>
  <text x="96" y="32" fill="#7d8590" font-size="8" font-family="sans-serif">단순 문자열</text>
  <text x="26" y="48" fill="#ffb300" font-size="10" font-family="ui-monospace,monospace">:42</text>
  <text x="96" y="48" fill="#7d8590" font-size="8" font-family="sans-serif">정수</text>
  <text x="26" y="64" fill="#a5d6ff" font-size="10" font-family="ui-monospace,monospace">$5 hello</text>
  <text x="96" y="64" fill="#7d8590" font-size="8" font-family="sans-serif">벌크 문자열</text>
  <text x="26" y="80" fill="#ff6b5e" font-size="10" font-family="ui-monospace,monospace">-ERR ...</text>
  <text x="96" y="80" fill="#7d8590" font-size="8" font-family="sans-serif">에러</text>
  <text x="200" y="48" fill="#ff6b5e" font-size="9" font-weight="700" font-family="sans-serif">RESP3</text>
  <text x="200" y="62" fill="#7d8590" font-size="8" font-family="sans-serif">+ push</text>
</svg>`,

  antipattern: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <ellipse cx="80" cy="50" rx="52" ry="34" fill="rgba(255,107,94,0.18)" stroke="#ff6b5e" stroke-width="2"/>
  <text x="80" y="46" text-anchor="middle" fill="#ff8a80" font-size="11" font-weight="700" font-family="sans-serif">BIG KEY</text>
  <text x="80" y="60" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="sans-serif">5,000,000 원소</text>
  <path d="M136 50 H166" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="166,45 176,50 166,55" fill="#ff6b5e"/>
  <rect x="182" y="26" width="84" height="48" rx="8" fill="#2e1416" stroke="#e05a4e"/>
  <text x="224" y="46" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="sans-serif">단일 스레드</text>
  <text x="224" y="60" text-anchor="middle" fill="#e05a4e" font-size="10" font-weight="700" font-family="sans-serif">■ 정지</text>
  <text x="80" y="94" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">O(N) 조회 · 삭제 · 마이그레이션</text>
</svg>`,

  bitmap: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="22" fill="#8b7f80" font-size="8" font-family="sans-serif">offset = user id</text>
  <g font-family="ui-monospace,monospace" font-size="10">
    <rect x="14" y="30" width="18" height="18" rx="3" fill="#221618" stroke="#7a4a48"/><text x="23" y="43" text-anchor="middle" fill="#8b7f80">0</text>
    <rect x="34" y="30" width="18" height="18" rx="3" fill="#2a1114" stroke="#ff6b5e"/><text x="43" y="43" text-anchor="middle" fill="#ff8a80">1</text>
    <rect x="54" y="30" width="18" height="18" rx="3" fill="#2a1114" stroke="#ff6b5e"/><text x="63" y="43" text-anchor="middle" fill="#ff8a80">1</text>
    <rect x="74" y="30" width="18" height="18" rx="3" fill="#221618" stroke="#7a4a48"/><text x="83" y="43" text-anchor="middle" fill="#8b7f80">0</text>
    <rect x="94" y="30" width="18" height="18" rx="3" fill="#2a1114" stroke="#ff6b5e"/><text x="103" y="43" text-anchor="middle" fill="#ff8a80">1</text>
    <rect x="114" y="30" width="18" height="18" rx="3" fill="#221618" stroke="#7a4a48"/><text x="123" y="43" text-anchor="middle" fill="#8b7f80">0</text>
    <rect x="134" y="30" width="18" height="18" rx="3" fill="#2a1114" stroke="#ff6b5e"/><text x="143" y="43" text-anchor="middle" fill="#ff8a80">1</text>
    <rect x="154" y="30" width="18" height="18" rx="3" fill="#2a1114" stroke="#ff6b5e"/><text x="163" y="43" text-anchor="middle" fill="#ff8a80">1</text>
  </g>
  <text x="180" y="43" fill="#6d5a5c" font-size="10" font-family="ui-monospace,monospace">…</text>
  <text x="14" y="68" fill="#66bb6a" font-size="9" font-weight="700" font-family="ui-monospace,monospace">BITCOUNT → 5</text>
  <text x="14" y="86" fill="#ffb300" font-size="9" font-family="sans-serif">1억 명 ≈ 12MB</text>
  <text x="190" y="86" fill="#6d5a5c" font-size="8" font-family="sans-serif">희소 ID면 낭비</text>
</svg>`,

  hll: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <g fill="#7a4a48">
    <circle cx="24" cy="24" r="2.5"/><circle cx="40" cy="34" r="2.5"/><circle cx="30" cy="50" r="2.5"/>
    <circle cx="52" cy="20" r="2.5"/><circle cx="60" cy="44" r="2.5"/><circle cx="44" cy="62" r="2.5"/>
    <circle cx="70" cy="28" r="2.5"/><circle cx="26" cy="72" r="2.5"/><circle cx="62" cy="72" r="2.5"/>
    <circle cx="80" cy="56" r="2.5"/><circle cx="88" cy="36" r="2.5"/><circle cx="76" cy="76" r="2.5"/>
    <circle cx="16" cy="40" r="2.5"/><circle cx="94" cy="66" r="2.5"/><circle cx="52" cy="86" r="2.5"/>
  </g>
  <text x="56" y="14" text-anchor="middle" fill="#8b7f80" font-size="9" font-family="sans-serif">1억 개 이벤트</text>
  <path d="M110 50 H144" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="144,45 154,50 144,55" fill="#ff6b5e"/>
  <text x="127" y="42" text-anchor="middle" fill="#ff6b5e" font-size="8" font-family="ui-monospace,monospace">PFADD</text>
  <rect x="162" y="34" width="52" height="32" rx="6" fill="#2a1114" stroke="#ff6b5e" stroke-width="2"/>
  <text x="188" y="48" text-anchor="middle" fill="#ff8a80" font-size="11" font-weight="700" font-family="sans-serif">12KB</text>
  <text x="188" y="60" text-anchor="middle" fill="#d7b4b2" font-size="7" font-family="sans-serif">고정</text>
  <text x="244" y="46" text-anchor="middle" fill="#66bb6a" font-size="9" font-weight="700" font-family="sans-serif">±0.81%</text>
  <text x="244" y="60" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">멤버십 불가</text>
</svg>`,

  geo: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="110" cy="52" r="36" fill="rgba(255,107,94,0.10)" stroke="#ff6b5e" stroke-dasharray="4 3"/>
  <path d="M110 34 a8 8 0 0 1 8 8 c0 6 -8 16 -8 16 s-8 -10 -8 -16 a8 8 0 0 1 8 -8 z" fill="#ff6b5e"/>
  <circle cx="86" cy="66" r="4" fill="#66bb6a"/>
  <circle cx="132" cy="40" r="4" fill="#66bb6a"/>
  <circle cx="126" cy="70" r="4" fill="#66bb6a"/>
  <circle cx="168" cy="30" r="4" fill="#4a3a3c"/>
  <circle cx="180" cy="78" r="4" fill="#4a3a3c"/>
  <text x="110" y="98" text-anchor="middle" fill="#ff6b5e" font-size="8" font-family="ui-monospace,monospace">BYRADIUS 3 km</text>
  <text x="214" y="44" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">범위 밖</text>
  <text x="110" y="18" text-anchor="middle" fill="#ffb300" font-size="8" font-family="sans-serif">score = geohash(52bit)</text>
</svg>`,

  bloom: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="8" font-family="sans-serif">3개 해시 → 비트 세우기</text>
  <path d="M40 26 L24 42" stroke="#ff6b5e" stroke-width="1.5"/>
  <path d="M46 26 L86 42" stroke="#ff6b5e" stroke-width="1.5"/>
  <path d="M52 26 L146 42" stroke="#ff6b5e" stroke-width="1.5"/>
  <g>
    <rect x="14" y="44" width="20" height="16" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
    <rect x="36" y="44" width="20" height="16" rx="3" fill="#221618" stroke="#7a4a48"/>
    <rect x="58" y="44" width="20" height="16" rx="3" fill="#221618" stroke="#7a4a48"/>
    <rect x="80" y="44" width="20" height="16" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
    <rect x="102" y="44" width="20" height="16" rx="3" fill="#221618" stroke="#7a4a48"/>
    <rect x="124" y="44" width="20" height="16" rx="3" fill="#221618" stroke="#7a4a48"/>
    <rect x="146" y="44" width="20" height="16" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
  </g>
  <rect x="182" y="26" width="84" height="24" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="224" y="42" text-anchor="middle" fill="#a5d6a7" font-size="9" font-family="sans-serif">없음 = 확실</text>
  <rect x="182" y="56" width="84" height="24" rx="6" fill="#2e2410" stroke="#ffb300"/>
  <text x="224" y="72" text-anchor="middle" fill="#ffe082" font-size="9" font-family="sans-serif">있음 = 아마도</text>
  <text x="90" y="80" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">원본은 저장하지 않음</text>
</svg>`,

  vector: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="12" width="150" height="76" rx="8" fill="#0d1117" stroke="#30363d"/>
  <circle cx="70" cy="46" r="14" fill="none" stroke="#ff6b5e" stroke-dasharray="3 3"/>
  <circle cx="70" cy="46" r="4" fill="#ff6b5e"/>
  <circle cx="60" cy="38" r="3.5" fill="#66bb6a"/>
  <circle cx="80" cy="52" r="3.5" fill="#66bb6a"/>
  <circle cx="64" cy="56" r="3.5" fill="#66bb6a"/>
  <circle cx="110" cy="28" r="3" fill="#4a3a3c"/>
  <circle cx="132" cy="64" r="3" fill="#4a3a3c"/>
  <circle cx="34" cy="74" r="3" fill="#4a3a3c"/>
  <circle cx="120" cy="46" r="3" fill="#4a3a3c"/>
  <text x="70" y="80" text-anchor="middle" fill="#ff8a80" font-size="8" font-family="ui-monospace,monospace">VSIM</text>
  <text x="88" y="24" fill="#8b7f80" font-size="8" font-family="sans-serif">HNSW 그래프</text>
  <rect x="174" y="20" width="92" height="26" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="220" y="37" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">근사 최근접</text>
  <rect x="174" y="52" width="92" height="26" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="220" y="69" text-anchor="middle" fill="#90caf9" font-size="8" font-family="ui-monospace,monospace">FILTER .price</text>
</svg>`,

  sentinel: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <g fill="#ffb300">
    <circle cx="40" cy="20" r="7" fill="none" stroke="#ffb300" stroke-width="1.5"/><circle cx="40" cy="20" r="2.5"/>
    <circle cx="70" cy="20" r="7" fill="none" stroke="#ffb300" stroke-width="1.5"/><circle cx="70" cy="20" r="2.5"/>
    <circle cx="100" cy="20" r="7" fill="none" stroke="#ffb300" stroke-width="1.5"/><circle cx="100" cy="20" r="2.5"/>
  </g>
  <text x="128" y="24" fill="#ffb300" font-size="8" font-family="sans-serif">Sentinel ×3 (홀수)</text>
  <path d="M40 30 V44 M70 30 V44 M100 30 V44" stroke="#ffb300" stroke-width="1" stroke-dasharray="3 2"/>
  <rect x="24" y="48" width="76" height="30" rx="6" fill="#2e1416" stroke="#e05a4e" stroke-dasharray="4 3"/>
  <text x="62" y="62" text-anchor="middle" fill="#e05a4e" font-size="9" font-weight="700" font-family="sans-serif">MASTER ✕</text>
  <text x="62" y="73" text-anchor="middle" fill="#8b7f80" font-size="7" font-family="sans-serif">ODOWN</text>
  <path d="M106 62 H136" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="136,57 146,62 136,67" fill="#66bb6a"/>
  <text x="122" y="55" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">과반 선출</text>
  <rect x="152" y="48" width="80" height="30" rx="6" fill="#12331c" stroke="#66bb6a" stroke-width="2"/>
  <text x="192" y="62" text-anchor="middle" fill="#a5d6a7" font-size="9" font-weight="700" font-family="sans-serif">NEW MASTER</text>
  <text x="192" y="73" text-anchor="middle" fill="#8b7f80" font-size="7" font-family="sans-serif">복제본 승격</text>
</svg>`,

  cluster: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="140" y="16" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">CRC16(key) mod 16384</text>
  <rect x="14" y="24" width="80" height="18" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="54" y="37" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">0 – 5460</text>
  <rect x="98" y="24" width="80" height="18" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="138" y="37" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">5461 – 10922</text>
  <rect x="182" y="24" width="84" height="18" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="224" y="37" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">10923 – 16383</text>
  <path d="M54 44 V54 M138 44 V54 M224 44 V54" stroke="#7a4a48" stroke-width="1.5"/>
  <rect x="24" y="56" width="60" height="24" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="54" y="72" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">node A</text>
  <rect x="108" y="56" width="60" height="24" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="138" y="72" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">node B</text>
  <rect x="194" y="56" width="60" height="24" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="224" y="72" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">node C</text>
  <text x="140" y="94" text-anchor="middle" fill="#ffb300" font-size="8" font-family="ui-monospace,monospace">MOVED 5798 → 다른 노드</text>
</svg>`,

  pubsub: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="10" y="38" width="54" height="26" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="37" y="55" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="sans-serif">publish</text>
  <path d="M68 51 H96" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="96,46 106,51 96,56" fill="#ff6b5e"/>
  <rect x="110" y="34" width="52" height="34" rx="8" fill="#3d1a1e" stroke="#ff8a80" stroke-width="2"/>
  <text x="136" y="49" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">channel</text>
  <text x="136" y="61" text-anchor="middle" fill="#8b7f80" font-size="7" font-family="sans-serif">저장 안 함</text>
  <path d="M166 42 H196 M166 51 H196 M166 60 H196" stroke="#66bb6a" stroke-width="1.5"/>
  <polygon points="196,38 204,42 196,46" fill="#66bb6a"/>
  <polygon points="196,47 204,51 196,55" fill="#66bb6a"/>
  <rect x="208" y="30" width="58" height="18" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="237" y="43" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">sub 1</text>
  <rect x="208" y="52" width="58" height="18" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="237" y="65" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">sub 2</text>
  <rect x="208" y="74" width="58" height="18" rx="4" fill="#1a1416" stroke="#4a3a3c" stroke-dasharray="3 2"/>
  <text x="237" y="87" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">offline ✕</text>
</svg>`,

  notify: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="36" width="86" height="30" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="57" y="55" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="ui-monospace,monospace">session:u1</text>
  <text x="57" y="26" text-anchor="middle" fill="#ffb300" font-size="8" font-family="sans-serif">TTL 만료 · 삭제 시점</text>
  <path d="M104 51 H132" stroke="#ffb300" stroke-width="2"/>
  <polygon points="132,46 142,51 132,56" fill="#ffb300"/>
  <rect x="148" y="24" width="118" height="24" rx="5" fill="#0d1117" stroke="#30363d"/>
  <text x="207" y="40" text-anchor="middle" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">__keyevent@0__:expired</text>
  <rect x="148" y="54" width="118" height="24" rx="5" fill="#0d1117" stroke="#30363d"/>
  <text x="207" y="70" text-anchor="middle" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">__keyspace@0__:key</text>
  <text x="80" y="92" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">Pub/Sub 기반 → 유실 가능</text>
</svg>`,

  encoding: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="60" y="20" text-anchor="middle" fill="#66bb6a" font-size="9" font-weight="700" font-family="ui-monospace,monospace">listpack</text>
  <g>
    <rect x="16" y="30" width="18" height="34" rx="2" fill="#12331c" stroke="#66bb6a"/>
    <rect x="34" y="30" width="18" height="34" rx="2" fill="#12331c" stroke="#66bb6a"/>
    <rect x="52" y="30" width="18" height="34" rx="2" fill="#12331c" stroke="#66bb6a"/>
    <rect x="70" y="30" width="18" height="34" rx="2" fill="#12331c" stroke="#66bb6a"/>
    <rect x="88" y="30" width="18" height="34" rx="2" fill="#12331c" stroke="#66bb6a"/>
  </g>
  <text x="60" y="78" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">연속 메모리 · 작다</text>
  <path d="M116 47 H150" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="150,42 160,47 150,52" fill="#ff6b5e"/>
  <text x="133" y="38" text-anchor="middle" fill="#ff6b5e" font-size="7" font-family="sans-serif">128 초과</text>
  <text x="133" y="62" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">단방향 ✕</text>
  <text x="216" y="20" text-anchor="middle" fill="#ff8a80" font-size="9" font-weight="700" font-family="ui-monospace,monospace">hashtable</text>
  <g>
    <circle cx="180" cy="40" r="7" fill="#2a1114" stroke="#ff6b5e"/>
    <circle cx="202" cy="56" r="7" fill="#2a1114" stroke="#ff6b5e"/>
    <circle cx="228" cy="36" r="7" fill="#2a1114" stroke="#ff6b5e"/>
    <circle cx="250" cy="58" r="7" fill="#2a1114" stroke="#ff6b5e"/>
    <circle cx="214" cy="72" r="7" fill="#2a1114" stroke="#ff6b5e"/>
  </g>
  <text x="216" y="92" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">포인터 · 메모리 ↑</text>
</svg>`,

  observe: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="8" font-family="sans-serif">캐시 적중률</text>
  <rect x="14" y="26" width="120" height="14" rx="4" fill="#1a1012" stroke="#7a4a48"/>
  <rect x="16" y="28" width="104" height="10" rx="3" fill="#66bb6a"/>
  <text x="142" y="37" fill="#66bb6a" font-size="9" font-weight="700" font-family="ui-monospace,monospace">87%</text>
  <text x="14" y="58" fill="#8b7f80" font-size="8" font-family="sans-serif">SLOWLOG</text>
  <rect x="14" y="64" width="252" height="28" rx="5" fill="#0d1117" stroke="#30363d"/>
  <text x="22" y="76" fill="#ff6b5e" font-size="7.5" font-family="ui-monospace,monospace">1) KEYS session:*      142,318 μs</text>
  <text x="22" y="87" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">2) SMEMBERS big:set     18,904 μs</text>
  <text x="196" y="20" fill="#ff6b5e" font-size="8" font-family="ui-monospace,monospace">LATENCY DOCTOR</text>
</svg>`,

  memory: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="22" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">used_memory</text>
  <rect x="14" y="28" width="140" height="16" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="164" y="41" fill="#ffcdd2" font-size="9" font-family="ui-monospace,monospace">2.1 GB</text>
  <text x="14" y="62" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">used_memory_rss</text>
  <rect x="14" y="68" width="196" height="16" rx="4" fill="#1a1012" stroke="#ffb300"/>
  <rect x="14" y="68" width="140" height="16" rx="4" fill="rgba(255,179,0,0.25)" stroke="none"/>
  <text x="220" y="81" fill="#ffe082" font-size="9" font-family="ui-monospace,monospace">2.9 GB</text>
  <text x="200" y="22" fill="#ffb300" font-size="9" font-weight="700" font-family="sans-serif">ratio 1.38</text>
  <text x="200" y="34" fill="#6d5a5c" font-size="7" font-family="sans-serif">&gt;1.5 단편화 / &lt;1 스왑</text>
</svg>`,

  acl: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="46" cy="42" r="12" fill="none" stroke="#ff6b5e" stroke-width="2"/>
  <path d="M28 74 a18 16 0 0 1 36 0" fill="none" stroke="#ff6b5e" stroke-width="2"/>
  <text x="46" y="92" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">app-cache</text>
  <rect x="86" y="16" width="180" height="20" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="96" y="30" fill="#a5d6a7" font-size="8.5" font-family="ui-monospace,monospace">+@read +@write  ~cache:*</text>
  <rect x="86" y="42" width="180" height="20" rx="5" fill="#2e1416" stroke="#e05a4e"/>
  <text x="96" y="56" fill="#ffcdd2" font-size="8.5" font-family="ui-monospace,monospace">-@dangerous  -@admin</text>
  <rect x="86" y="68" width="180" height="20" rx="5" fill="#1a1416" stroke="#4a3a3c"/>
  <text x="96" y="82" fill="#6d5a5c" font-size="8.5" font-family="ui-monospace,monospace">FLUSHALL · CONFIG · KEYS ✕</text>
</svg>`,

  client: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="18" width="52" height="18" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="38" y="31" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">client</text>
  <rect x="12" y="42" width="52" height="18" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="38" y="55" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">client</text>
  <rect x="12" y="66" width="52" height="18" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="38" y="79" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">slow ⚠</text>
  <path d="M68 27 H96 M68 51 H96" stroke="#7a4a48" stroke-width="1.5"/>
  <path d="M68 75 H96" stroke="#e05a4e" stroke-width="1.5"/>
  <rect x="100" y="14" width="70" height="72" rx="8" fill="#221618" stroke="#7a4a48"/>
  <text x="135" y="30" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">output buf</text>
  <rect x="112" y="36" width="46" height="8" rx="2" fill="#66bb6a"/>
  <rect x="112" y="48" width="46" height="8" rx="2" fill="#66bb6a"/>
  <rect x="112" y="60" width="46" height="20" rx="2" fill="#e05a4e"/>
  <path d="M174 50 H198" stroke="#e05a4e" stroke-width="2"/>
  <polygon points="198,45 208,50 198,55" fill="#e05a4e"/>
  <text x="244" y="42" text-anchor="middle" fill="#e05a4e" font-size="9" font-weight="700" font-family="sans-serif">한계 초과</text>
  <text x="244" y="56" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">연결 강제 종료</text>
</svg>`,

  backup: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="34" width="66" height="34" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="47" y="55" text-anchor="middle" fill="#ffcdd2" font-size="9" font-weight="700" font-family="sans-serif">REDIS</text>
  <path d="M84 51 H110" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="110,46 120,51 110,56" fill="#ff6b5e"/>
  <text x="102" y="42" text-anchor="middle" fill="#ff6b5e" font-size="7" font-family="ui-monospace,monospace">BGSAVE</text>
  <rect x="126" y="30" width="52" height="42" rx="5" fill="#0d1117" stroke="#30363d"/>
  <path d="M126 30 h40 l12 12 v30 h-52 z" fill="#0d1117" stroke="#30363d"/>
  <text x="152" y="52" text-anchor="middle" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">dump</text>
  <text x="152" y="63" text-anchor="middle" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">.rdb</text>
  <path d="M182 51 H206" stroke="#66bb6a" stroke-width="2" stroke-dasharray="4 3"/>
  <polygon points="206,46 216,51 206,56" fill="#66bb6a"/>
  <ellipse cx="246" cy="36" rx="24" ry="7" fill="#12331c" stroke="#66bb6a"/>
  <path d="M222 36 V64 a24 7 0 0 0 48 0 V36" fill="#12331c" stroke="#66bb6a"/>
  <text x="246" y="56" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">원격</text>
  <text x="140" y="90" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">완성 후 원자적 교체 → 실행 중 복사 안전</text>
</svg>`,

  tracking: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="26" width="86" height="48" rx="8" fill="#12233a" stroke="#42a5f5"/>
  <text x="55" y="44" text-anchor="middle" fill="#90caf9" font-size="9" font-weight="700" font-family="sans-serif">APP</text>
  <rect x="24" y="50" width="62" height="16" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="55" y="62" text-anchor="middle" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">local cache</text>
  <path d="M102 40 H150" stroke="#66bb6a" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="150,36 158,40 150,44" fill="#66bb6a"/>
  <text x="128" y="34" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">GET</text>
  <path d="M158 62 H110" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="110,58 102,62 110,66" fill="#ff6b5e"/>
  <text x="134" y="76" text-anchor="middle" fill="#ff6b5e" font-size="7" font-family="ui-monospace,monospace">invalidate (push)</text>
  <rect x="162" y="26" width="104" height="48" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="214" y="44" text-anchor="middle" fill="#ffcdd2" font-size="9" font-weight="700" font-family="sans-serif">REDIS</text>
  <text x="214" y="60" text-anchor="middle" fill="#d7b4b2" font-size="7.5" font-family="ui-monospace,monospace">읽은 키 추적</text>
  <text x="140" y="94" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">읽기 ≫ 쓰기인 데이터에만</text>
</svg>`,

  blocking: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="20" width="66" height="24" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="45" y="36" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">client A</text>
  <text x="45" y="58" text-anchor="middle" fill="#ffb300" font-size="8" font-family="ui-monospace,monospace">BLPOP 0</text>
  <text x="45" y="72" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">⏳ 대기</text>
  <path d="M82 32 H108" stroke="#ffb300" stroke-width="1.5" stroke-dasharray="3 2"/>
  <rect x="112" y="16" width="66" height="68" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="145" y="38" text-anchor="middle" fill="#ffcdd2" font-size="9" font-weight="700" font-family="sans-serif">REDIS</text>
  <text x="145" y="54" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="sans-serif">계속</text>
  <text x="145" y="66" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="sans-serif">처리 중</text>
  <path d="M182 32 H208" stroke="#66bb6a" stroke-width="1.5"/>
  <path d="M182 62 H208" stroke="#66bb6a" stroke-width="1.5"/>
  <rect x="212" y="20" width="54" height="24" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="239" y="36" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">client B</text>
  <rect x="212" y="50" width="54" height="24" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="239" y="66" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">client C</text>
  <text x="140" y="96" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">막히는 건 그 클라이언트뿐</text>
</svg>`,

  scan: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">cursor 0 → 17408 → … → 0</text>
  <g>
    <rect x="14" y="30" width="34" height="30" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
    <rect x="52" y="30" width="34" height="30" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
    <rect x="90" y="30" width="34" height="30" rx="4" fill="#3d1a1e" stroke="#ff8a80" stroke-width="2"/>
    <rect x="128" y="30" width="34" height="30" rx="4" fill="#221618" stroke="#7a4a48"/>
    <rect x="166" y="30" width="34" height="30" rx="4" fill="#221618" stroke="#7a4a48"/>
    <rect x="204" y="30" width="34" height="30" rx="4" fill="#221618" stroke="#7a4a48"/>
  </g>
  <text x="248" y="49" fill="#6d5a5c" font-size="10" font-family="ui-monospace,monospace">…</text>
  <path d="M107 66 V76" stroke="#ff8a80" stroke-width="1.5"/>
  <polygon points="102,66 107,60 112,66" fill="#ff8a80"/>
  <text x="107" y="88" text-anchor="middle" fill="#ff8a80" font-size="8" font-family="sans-serif">지금 여기</text>
  <text x="200" y="80" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="sans-serif">중복 O · 누락 X</text>
</svg>`,

  cacheaside: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="10" y="36" width="56" height="28" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="38" y="54" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">APP</text>
  <path d="M70 44 H102" stroke="#66bb6a" stroke-width="1.5"/>
  <polygon points="102,40 110,44 102,48" fill="#66bb6a"/>
  <text x="86" y="36" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">①GET</text>
  <rect x="114" y="30" width="60" height="40" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="144" y="47" text-anchor="middle" fill="#ffcdd2" font-size="9" font-weight="700" font-family="sans-serif">CACHE</text>
  <text x="144" y="60" text-anchor="middle" fill="#ffb300" font-size="7" font-family="sans-serif">miss</text>
  <path d="M178 44 H206" stroke="#ffb300" stroke-width="1.5"/>
  <polygon points="206,40 214,44 206,48" fill="#ffb300"/>
  <text x="192" y="36" text-anchor="middle" fill="#ffb300" font-size="7" font-family="sans-serif">②조회</text>
  <ellipse cx="244" cy="34" rx="22" ry="6" fill="#1b2430" stroke="#546e7a"/>
  <path d="M222 34 V60 a22 6 0 0 0 44 0 V34" fill="#1b2430" stroke="#546e7a"/>
  <text x="244" y="52" text-anchor="middle" fill="#78909c" font-size="8" font-family="sans-serif">DB</text>
  <path d="M214 76 H120" stroke="#ff6b5e" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="120,72 112,76 120,80" fill="#ff6b5e"/>
  <text x="167" y="90" text-anchor="middle" fill="#ff6b5e" font-size="7" font-family="ui-monospace,monospace">③SET … EX 600</text>
</svg>`,

  stampede: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="88" height="26" rx="6" fill="#1a1416" stroke="#4a3a3c" stroke-dasharray="4 3"/>
  <text x="58" y="31" text-anchor="middle" fill="#6d5a5c" font-size="9" font-family="sans-serif">CACHE ✕ 만료</text>
  <g stroke="#e05a4e" stroke-width="1.5">
    <path d="M120 20 L190 46"/><path d="M120 32 L190 48"/><path d="M120 44 L190 50"/>
    <path d="M120 56 L190 52"/><path d="M120 68 L190 54"/><path d="M120 80 L190 56"/>
  </g>
  <text x="150" y="16" text-anchor="middle" fill="#e05a4e" font-size="8" font-weight="700" font-family="sans-serif">동시 요청 폭주</text>
  <polygon points="190,44 200,50 190,58" fill="#e05a4e"/>
  <ellipse cx="238" cy="34" rx="26" ry="7" fill="#2e1416" stroke="#e05a4e"/>
  <path d="M212 34 V66 a26 7 0 0 0 52 0 V34" fill="#2e1416" stroke="#e05a4e"/>
  <text x="238" y="54" text-anchor="middle" fill="#ffcdd2" font-size="9" font-weight="700" font-family="sans-serif">DB ⚠</text>
  <text x="58" y="62" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="sans-serif">처방: 지터</text>
  <text x="58" y="76" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="sans-serif">뮤텍스 · 논리 만료</text>
</svg>`,

  lock: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="26" width="58" height="22" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="41" y="41" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">client A</text>
  <rect x="12" y="56" width="58" height="22" rx="5" fill="#2e1416" stroke="#e05a4e"/>
  <text x="41" y="71" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">client B</text>
  <path d="M74 37 H104" stroke="#66bb6a" stroke-width="1.5"/>
  <polygon points="104,33 112,37 104,41" fill="#66bb6a"/>
  <text x="89" y="30" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">OK</text>
  <path d="M74 67 H104" stroke="#e05a4e" stroke-width="1.5" stroke-dasharray="3 2"/>
  <text x="89" y="60" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">nil</text>
  <rect x="116" y="26" width="90" height="52" rx="8" fill="#2a1114" stroke="#ff6b5e" stroke-width="2"/>
  <path d="M152 40 a9 9 0 0 1 18 0 v6 h-6 v-6 a3 3 0 0 0 -6 0 v6 h-6 z" fill="#ff8a80"/>
  <rect x="149" y="46" width="24" height="18" rx="3" fill="#ff6b5e"/>
  <text x="161" y="76" text-anchor="middle" fill="#d7b4b2" font-size="7" font-family="ui-monospace,monospace">NX PX 30000</text>
  <text x="243" y="34" text-anchor="middle" fill="#ffb300" font-size="8" font-weight="700" font-family="sans-serif">token</text>
  <rect x="212" y="40" width="62" height="18" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="243" y="53" text-anchor="middle" fill="#a5d6ff" font-size="7" font-family="ui-monospace,monospace">a3f9-…-c1</text>
  <text x="243" y="72" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">내 것일 때만 삭제</text>
</svg>`,

  ratelimit: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="18" fill="#8b7f80" font-size="8" font-family="sans-serif">60초 윈도우 · 한도 5</text>
  <line x1="14" y1="58" x2="266" y2="58" stroke="#4a3a3c" stroke-width="1.5"/>
  <g>
    <circle cx="30" cy="46" r="6" fill="#66bb6a"/><circle cx="58" cy="46" r="6" fill="#66bb6a"/>
    <circle cx="86" cy="46" r="6" fill="#66bb6a"/><circle cx="114" cy="46" r="6" fill="#66bb6a"/>
    <circle cx="142" cy="46" r="6" fill="#66bb6a"/>
    <circle cx="170" cy="46" r="6" fill="#e05a4e"/><circle cx="198" cy="46" r="6" fill="#e05a4e"/>
    <circle cx="226" cy="46" r="6" fill="#e05a4e"/>
  </g>
  <text x="86" y="74" text-anchor="middle" fill="#66bb6a" font-size="8" font-weight="700" font-family="sans-serif">허용 5</text>
  <text x="198" y="74" text-anchor="middle" fill="#e05a4e" font-size="8" font-weight="700" font-family="sans-serif">차단</text>
  <line x1="156" y1="34" x2="156" y2="64" stroke="#ffb300" stroke-width="2" stroke-dasharray="3 2"/>
  <text x="140" y="92" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="ui-monospace,monospace">INCR+EXPIRE  |  ZSet  |  Token Bucket</text>
</svg>`,

  queue: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="46" y="20" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">jobs</text>
  <rect x="14" y="26" width="64" height="18" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="46" y="39" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">job:3</text>
  <rect x="14" y="48" width="64" height="18" rx="4" fill="#221618" stroke="#7a4a48"/>
  <text x="46" y="61" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">job:4</text>
  <rect x="14" y="70" width="64" height="18" rx="4" fill="#221618" stroke="#7a4a48"/>
  <text x="46" y="83" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">job:5</text>
  <path d="M82 35 H112" stroke="#ffb300" stroke-width="2"/>
  <polygon points="112,30 122,35 112,40" fill="#ffb300"/>
  <text x="102" y="28" text-anchor="middle" fill="#ffb300" font-size="7" font-family="ui-monospace,monospace">LMOVE</text>
  <rect x="128" y="24" width="70" height="22" rx="5" fill="#2e2410" stroke="#ffb300"/>
  <text x="163" y="39" text-anchor="middle" fill="#ffe082" font-size="8" font-family="sans-serif">처리 중 / PEL</text>
  <path d="M202 35 H228" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="228,30 238,35 228,40" fill="#66bb6a"/>
  <text x="252" y="38" text-anchor="middle" fill="#66bb6a" font-size="8" font-weight="700" font-family="sans-serif">ACK</text>
  <path d="M163 50 V66" stroke="#e05a4e" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="158,66 163,74 168,66" fill="#e05a4e"/>
  <text x="196" y="84" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">소비자 사망 → 회수(XAUTOCLAIM)</text>
</svg>`,
};
