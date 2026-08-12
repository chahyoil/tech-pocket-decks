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

  memstats: `
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

  config: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="26" width="90" height="48" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="59" y="46" text-anchor="middle" fill="#ffcdd2" font-size="9" font-weight="700" font-family="sans-serif">메모리</text>
  <text x="59" y="60" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">CONFIG SET</text>
  <path d="M108 40 H140" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="140,35 150,40 140,45" fill="#66bb6a"/>
  <text x="128" y="32" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">REWRITE</text>
  <path d="M108 62 H140" stroke="#e05a4e" stroke-width="2" stroke-dasharray="3 3"/>
  <text x="128" y="76" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">빠뜨리면 원복</text>
  <rect x="156" y="26" width="110" height="48" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="211" y="46" text-anchor="middle" fill="#a5d6ff" font-size="9" font-family="ui-monospace,monospace">redis.conf</text>
  <text x="211" y="60" text-anchor="middle" fill="#7d8590" font-size="8" font-family="sans-serif">재시작해도 유지</text>
</svg>`,

  json: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="150" height="72" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="24" y="30" fill="#7d8590" font-size="8.5" font-family="ui-monospace,monospace">{</text>
  <text x="34" y="42" fill="#a5d6ff" font-size="8.5" font-family="ui-monospace,monospace">"name": "Yuna",</text>
  <text x="34" y="54" fill="#a5d6ff" font-size="8.5" font-family="ui-monospace,monospace">"addr": {</text>
  <text x="44" y="66" fill="#ff8a80" font-size="8.5" font-family="ui-monospace,monospace">"city": "Seoul"</text>
  <text x="34" y="78" fill="#7d8590" font-size="8.5" font-family="ui-monospace,monospace">} }</text>
  <rect x="40" y="58" width="98" height="12" rx="2" fill="none" stroke="#ff6b5e" stroke-dasharray="3 2"/>
  <path d="M170 62 H196" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="196,57 206,62 196,67" fill="#ff6b5e"/>
  <text x="220" y="40" text-anchor="middle" fill="#ff6b5e" font-size="8" font-weight="700" font-family="sans-serif">경로 지정</text>
  <text x="220" y="58" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">$.addr.city</text>
  <text x="220" y="76" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="sans-serif">그 부분만 갱신</text>
</svg>`,

  timeseries: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="18" fill="#8b7f80" font-size="8" font-family="sans-serif">원본 (짧은 보존)</text>
  <polyline points="16,42 30,34 44,44 58,30 72,38 86,26 100,36 114,30 128,40"
            fill="none" stroke="#ff6b5e" stroke-width="1.5"/>
  <g fill="#ff8a80">
    <circle cx="16" cy="42" r="1.8"/><circle cx="30" cy="34" r="1.8"/><circle cx="44" cy="44" r="1.8"/>
    <circle cx="58" cy="30" r="1.8"/><circle cx="72" cy="38" r="1.8"/><circle cx="86" cy="26" r="1.8"/>
    <circle cx="100" cy="36" r="1.8"/><circle cx="114" cy="30" r="1.8"/><circle cx="128" cy="40" r="1.8"/>
  </g>
  <path d="M144 40 H170" stroke="#ffb300" stroke-width="2"/>
  <polygon points="170,35 180,40 170,45" fill="#ffb300"/>
  <text x="162" y="32" text-anchor="middle" fill="#ffb300" font-size="7" font-family="ui-monospace,monospace">CREATERULE</text>
  <text x="196" y="18" fill="#8b7f80" font-size="8" font-family="sans-serif">1분 평균 (긴 보존)</text>
  <polyline points="192,40 214,36 236,34 258,38" fill="none" stroke="#66bb6a" stroke-width="2"/>
  <g fill="#a5d6a7">
    <circle cx="192" cy="40" r="2.5"/><circle cx="214" cy="36" r="2.5"/>
    <circle cx="236" cy="34" r="2.5"/><circle cx="258" cy="38" r="2.5"/>
  </g>
  <text x="140" y="72" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="sans-serif">RETENTION 으로 원본은 자동 삭제</text>
  <text x="140" y="88" text-anchor="middle" fill="#42a5f5" font-size="8" font-family="ui-monospace,monospace">LABELS sensor=temp → TS.MRANGE</text>
</svg>`,

  arrays: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="8" font-family="sans-serif">희소 배열 — 빈 칸은 메모리 0</text>
  <g>
    <rect x="14" y="28" width="26" height="24" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
    <text x="27" y="44" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="ui-monospace,monospace">a</text>
    <rect x="42" y="28" width="26" height="24" rx="3" fill="#151011" stroke="#3a2c2e" stroke-dasharray="3 2"/>
    <rect x="70" y="28" width="26" height="24" rx="3" fill="#151011" stroke="#3a2c2e" stroke-dasharray="3 2"/>
    <text x="112" y="45" text-anchor="middle" fill="#4a3a3c" font-size="11" font-family="ui-monospace,monospace">· · ·</text>
    <rect x="128" y="28" width="26" height="24" rx="3" fill="#151011" stroke="#3a2c2e" stroke-dasharray="3 2"/>
    <rect x="156" y="28" width="26" height="24" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
    <text x="169" y="44" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="ui-monospace,monospace">b</text>
  </g>
  <text x="27" y="64" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="ui-monospace,monospace">0</text>
  <text x="169" y="64" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="ui-monospace,monospace">1000000</text>
  <rect x="196" y="24" width="70" height="20" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="231" y="38" text-anchor="middle" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">ARLEN 1000001</text>
  <rect x="196" y="48" width="70" height="20" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="231" y="62" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="ui-monospace,monospace">ARCOUNT 2</text>
  <text x="100" y="88" text-anchor="middle" fill="#ffb300" font-size="8" font-family="sans-serif">ARRING → 고정 크기 링 버퍼</text>
</svg>`,

  iothreads: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="52" y="18" text-anchor="middle" fill="#42a5f5" font-size="8" font-weight="700" font-family="sans-serif">I/O 스레드 ×4</text>
  <g>
    <rect x="14" y="24" width="76" height="13" rx="3" fill="#12233a" stroke="#42a5f5"/>
    <rect x="14" y="40" width="76" height="13" rx="3" fill="#12233a" stroke="#42a5f5"/>
    <rect x="14" y="56" width="76" height="13" rx="3" fill="#12233a" stroke="#42a5f5"/>
    <rect x="14" y="72" width="76" height="13" rx="3" fill="#12233a" stroke="#42a5f5"/>
  </g>
  <text x="52" y="95" text-anchor="middle" fill="#7d8590" font-size="7" font-family="sans-serif">소켓 read / write</text>
  <path d="M94 30 L124 46 M94 46 L124 48 M94 62 L124 52 M94 78 L124 54" stroke="#7a4a48" stroke-width="1.2"/>
  <rect x="128" y="34" width="60" height="32" rx="8" fill="#2a1114" stroke="#ff6b5e" stroke-width="2"/>
  <text x="158" y="48" text-anchor="middle" fill="#ff8a80" font-size="9" font-weight="700" font-family="sans-serif">MAIN</text>
  <text x="158" y="60" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="sans-serif">명령 실행 1개</text>
  <path d="M192 50 H216" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="216,45 226,50 216,55" fill="#66bb6a"/>
  <text x="252" y="44" text-anchor="middle" fill="#66bb6a" font-size="8" font-weight="700" font-family="sans-serif">원자성</text>
  <text x="252" y="58" text-anchor="middle" fill="#7d8590" font-size="7" font-family="sans-serif">그대로 유지</text>
</svg>`,

  fork: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="20" width="66" height="26" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="47" y="37" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="sans-serif">부모</text>
  <rect x="14" y="58" width="66" height="26" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="47" y="75" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">자식 (저장)</text>
  <path d="M84 33 H108 M84 71 H108" stroke="#7a4a48" stroke-width="1.5"/>
  <text x="150" y="18" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">공유 페이지</text>
  <g>
    <rect x="112" y="24" width="24" height="22" rx="3" fill="#221618" stroke="#7a4a48"/>
    <rect x="140" y="24" width="24" height="22" rx="3" fill="#221618" stroke="#7a4a48"/>
    <rect x="168" y="24" width="24" height="22" rx="3" fill="#2e1416" stroke="#e05a4e" stroke-width="2"/>
    <rect x="112" y="58" width="24" height="22" rx="3" fill="#221618" stroke="#7a4a48"/>
    <rect x="140" y="58" width="24" height="22" rx="3" fill="#221618" stroke="#7a4a48"/>
    <rect x="168" y="58" width="24" height="22" rx="3" fill="#2e1416" stroke="#e05a4e" stroke-width="2"/>
  </g>
  <path d="M180 48 V56" stroke="#e05a4e" stroke-width="1.5" stroke-dasharray="2 2"/>
  <text x="180" y="94" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">쓰기 발생 → 복사</text>
  <text x="238" y="34" text-anchor="middle" fill="#ffb300" font-size="9" font-weight="700" font-family="sans-serif">메모리</text>
  <text x="238" y="48" text-anchor="middle" fill="#ffb300" font-size="11" font-weight="700" font-family="sans-serif">최대 2×</text>
  <text x="238" y="64" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">THP 켜면 악화</text>
</svg>`,

  clusterfail: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="10" y="36" width="56" height="28" rx="6" fill="#2e1416" stroke="#e05a4e" stroke-dasharray="4 3"/>
  <text x="38" y="55" text-anchor="middle" fill="#e05a4e" font-size="9" font-weight="700" font-family="sans-serif">M1 ✕</text>
  <text x="38" y="24" text-anchor="middle" fill="#ffb300" font-size="7" font-family="sans-serif">PFAIL</text>
  <path d="M70 42 C92 30 96 30 116 34" stroke="#ffb300" stroke-width="1.2" fill="none" stroke-dasharray="3 2"/>
  <path d="M70 58 C92 70 96 70 116 66" stroke="#ffb300" stroke-width="1.2" fill="none" stroke-dasharray="3 2"/>
  <rect x="118" y="22" width="52" height="24" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="144" y="38" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">M2</text>
  <rect x="118" y="56" width="52" height="24" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="144" y="72" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">M3</text>
  <text x="144" y="14" text-anchor="middle" fill="#8b7f80" font-size="7" font-family="sans-serif">gossip · 과반 동의</text>
  <path d="M176 50 H202" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="202,45 212,50 202,55" fill="#66bb6a"/>
  <text x="189" y="42" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">FAIL</text>
  <rect x="216" y="36" width="52" height="28" rx="6" fill="#12331c" stroke="#66bb6a" stroke-width="2"/>
  <text x="242" y="55" text-anchor="middle" fill="#a5d6a7" font-size="8" font-weight="700" font-family="sans-serif">R1→M</text>
  <text x="140" y="94" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">마스터 3대 이상 홀수여야 과반 성립</text>
</svg>`,

  upgrade: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="32" width="72" height="34" rx="8" fill="#221618" stroke="#7a4a48"/>
  <text x="50" y="48" text-anchor="middle" fill="#d7b4b2" font-size="9" font-family="sans-serif">구버전</text>
  <text x="50" y="60" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">master</text>
  <path d="M90 49 H126" stroke="#ff6b5e" stroke-width="1.5" stroke-dasharray="4 3"/>
  <polygon points="126,44 136,49 126,54" fill="#ff6b5e"/>
  <text x="112" y="40" text-anchor="middle" fill="#ff6b5e" font-size="7" font-family="sans-serif">복제</text>
  <rect x="140" y="32" width="72" height="34" rx="8" fill="#12331c" stroke="#66bb6a" stroke-width="2"/>
  <text x="176" y="48" text-anchor="middle" fill="#a5d6a7" font-size="9" font-weight="700" font-family="sans-serif">신버전</text>
  <text x="176" y="60" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">replica → master</text>
  <path d="M216 49 H240" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="240,44 250,49 240,54" fill="#66bb6a"/>
  <text x="140" y="20" text-anchor="middle" fill="#ffb300" font-size="8" font-family="ui-monospace,monospace">CLIENT PAUSE → 전환</text>
  <text x="140" y="86" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="ui-monospace,monospace">REPLICAOF NO ONE → 구버전 종료</text>
</svg>`,

  kernel: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="252" height="22" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="24" y="29" fill="#a5d6a7" font-size="8.5" font-family="ui-monospace,monospace">vm.overcommit_memory = 1</text>
  <text x="184" y="29" fill="#7d8590" font-size="7.5" font-family="sans-serif">fork 실패 방지</text>
  <rect x="14" y="40" width="252" height="22" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="24" y="55" fill="#a5d6a7" font-size="8.5" font-family="ui-monospace,monospace">THP = never</text>
  <text x="184" y="55" fill="#7d8590" font-size="7.5" font-family="sans-serif">COW 폭증 방지</text>
  <rect x="14" y="66" width="252" height="22" rx="5" fill="#2e2410" stroke="#ffb300"/>
  <text x="24" y="81" fill="#ffe082" font-size="8.5" font-family="ui-monospace,monospace">swap = 켜둘 것 (메모리 크기만큼)</text>
  <text x="184" y="81" fill="#7d8590" font-size="7.5" font-family="sans-serif">OOM 즉사 방지</text>
</svg>`,

  benchmark: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">-P 1</text>
  <rect x="46" y="12" width="60" height="12" rx="3" fill="#7a4a48"/>
  <text x="116" y="22" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">80k ops/s</text>
  <text x="14" y="42" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">-P 16</text>
  <rect x="46" y="34" width="180" height="12" rx="3" fill="#ff6b5e"/>
  <text x="232" y="44" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">900k</text>
  <text x="14" y="62" fill="#66bb6a" font-size="8" font-weight="700" font-family="sans-serif">→ 병목은 Redis가 아니라 왕복</text>
  <rect x="14" y="70" width="252" height="22" rx="5" fill="#0d1117" stroke="#30363d"/>
  <text x="24" y="85" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">--intrinsic-latency</text>
  <text x="140" y="85" fill="#7d8590" font-size="7.5" font-family="sans-serif">먼저 재라 · 하한이 높으면 튜닝 무의미</text>
</svg>`,

  playbook: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="12" width="252" height="17" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="22" y="24" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">OOM</text>
  <text x="86" y="24" fill="#8b7f80" font-size="7.5" font-family="sans-serif">→ maxmemory + 정책 확인</text>
  <rect x="14" y="32" width="252" height="17" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="22" y="44" fill="#ffe082" font-size="7.5" font-family="ui-monospace,monospace">느림</text>
  <text x="86" y="44" fill="#8b7f80" font-size="7.5" font-family="sans-serif">→ SLOWLOG · LATENCY DOCTOR</text>
  <rect x="14" y="52" width="252" height="17" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="22" y="64" fill="#ffe082" font-size="7.5" font-family="ui-monospace,monospace">복제지연</text>
  <text x="86" y="64" fill="#8b7f80" font-size="7.5" font-family="sans-serif">→ offset 차 · replica 버퍼</text>
  <rect x="14" y="72" width="252" height="17" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="22" y="84" fill="#90caf9" font-size="7.5" font-family="ui-monospace,monospace">소실</text>
  <text x="86" y="84" fill="#8b7f80" font-size="7.5" font-family="sans-serif">→ CONFIG REWRITE 누락 확인</text>
</svg>`,

  functions: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="20" width="96" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="62" y="36" text-anchor="middle" fill="#ff8a80" font-size="8.5" font-weight="700" font-family="ui-monospace,monospace">mylib</text>
  <rect x="26" y="42" width="72" height="14" rx="3" fill="#12331c" stroke="#66bb6a"/>
  <text x="62" y="53" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">reserve()</text>
  <rect x="26" y="60" width="72" height="14" rx="3" fill="#12331c" stroke="#66bb6a"/>
  <text x="62" y="71" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">release()</text>
  <path d="M116 50 H142" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="142,45 152,50 142,55" fill="#ff6b5e"/>
  <text x="129" y="42" text-anchor="middle" fill="#ff6b5e" font-size="7" font-family="ui-monospace,monospace">LOAD</text>
  <rect x="158" y="20" width="108" height="60" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="212" y="38" text-anchor="middle" fill="#ffcdd2" font-size="9" font-weight="700" font-family="sans-serif">REDIS</text>
  <text x="212" y="54" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">RDB/AOF 저장</text>
  <text x="212" y="68" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">복제본에 전파</text>
  <text x="140" y="94" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">EVAL과 달리 NOSCRIPT 이 없다</text>
</svg>`,

  ttlctl: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="18" text-anchor="middle" fill="#e05a4e" font-size="8" font-weight="700" font-family="ui-monospace,monospace">SET key val</text>
  <rect x="16" y="24" width="108" height="24" rx="5" fill="#2e1416" stroke="#e05a4e"/>
  <text x="70" y="40" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">TTL ✕ 사라짐 (영구)</text>
  <text x="70" y="64" text-anchor="middle" fill="#66bb6a" font-size="8" font-weight="700" font-family="ui-monospace,monospace">SET … KEEPTTL</text>
  <rect x="16" y="70" width="108" height="22" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="70" y="85" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">남은 TTL 유지</text>
  <line x1="136" y1="14" x2="136" y2="94" stroke="#3a2c2e"/>
  <text x="208" y="24" text-anchor="middle" fill="#ffb300" font-size="8" font-weight="700" font-family="sans-serif">EXPIRE 조건 플래그</text>
  <rect x="148" y="30" width="118" height="14" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="156" y="41" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">NX  TTL 없을 때만</text>
  <rect x="148" y="46" width="118" height="14" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="156" y="57" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">XX  있을 때만</text>
  <rect x="148" y="62" width="118" height="14" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="156" y="73" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">GT  더 클 때만</text>
  <rect x="148" y="78" width="118" height="14" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="156" y="89" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">LT  더 작을 때만</text>
</svg>`,

  roundtrip: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="66" y="18" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">두 번 왕복</text>
  <path d="M20 30 H100" stroke="#7a4a48" stroke-width="1.5"/>
  <polygon points="100,26 108,30 100,34" fill="#7a4a48"/>
  <text x="60" y="27" text-anchor="middle" fill="#d7b4b2" font-size="7" font-family="ui-monospace,monospace">GET</text>
  <path d="M108 44 H28" stroke="#7a4a48" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="28,40 20,44 28,48" fill="#7a4a48"/>
  <path d="M20 58 H100" stroke="#7a4a48" stroke-width="1.5"/>
  <polygon points="100,54 108,58 100,62" fill="#7a4a48"/>
  <text x="60" y="55" text-anchor="middle" fill="#d7b4b2" font-size="7" font-family="ui-monospace,monospace">DEL</text>
  <text x="66" y="82" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">그 사이 누가 끼어든다</text>
  <line x1="128" y1="14" x2="128" y2="92" stroke="#3a2c2e"/>
  <text x="204" y="18" text-anchor="middle" fill="#ff6b5e" font-size="8" font-weight="700" font-family="sans-serif">한 번</text>
  <path d="M150 42 H250" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="250,37 260,42 250,47" fill="#ff6b5e"/>
  <text x="200" y="37" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">GETDEL</text>
  <path d="M260 58 H160" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="160,53 150,58 160,63" fill="#66bb6a"/>
  <text x="204" y="82" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">원자적 · 개입 불가</text>
</svg>`,

  errors: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="12" width="252" height="24" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="24" y="22" fill="#66bb6a" font-size="7" font-weight="700" font-family="sans-serif">재시도 O</text>
  <text x="24" y="32" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">LOADING · BUSY · MASTERDOWN</text>
  <rect x="14" y="40" width="252" height="24" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="24" y="50" fill="#42a5f5" font-size="7" font-weight="700" font-family="sans-serif">리다이렉트 (클라이언트 자동)</text>
  <text x="24" y="60" fill="#90caf9" font-size="7.5" font-family="ui-monospace,monospace">MOVED · ASK</text>
  <rect x="14" y="68" width="252" height="24" rx="5" fill="#2e1416" stroke="#e05a4e"/>
  <text x="24" y="78" fill="#e05a4e" font-size="7" font-weight="700" font-family="sans-serif">재시도 X — 원인을 고쳐라</text>
  <text x="24" y="88" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">OOM · WRONGTYPE · CROSSSLOT · READONLY</text>
</svg>`,

  session: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="18" width="52" height="18" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="38" y="31" text-anchor="middle" fill="#90caf9" font-size="7.5" font-family="sans-serif">web-1</text>
  <rect x="12" y="42" width="52" height="18" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="38" y="55" text-anchor="middle" fill="#90caf9" font-size="7.5" font-family="sans-serif">web-2</text>
  <rect x="12" y="66" width="52" height="18" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="38" y="79" text-anchor="middle" fill="#90caf9" font-size="7.5" font-family="sans-serif">web-3</text>
  <path d="M68 27 L104 46 M68 51 L104 51 M68 75 L104 56" stroke="#7a4a48" stroke-width="1.2"/>
  <rect x="108" y="30" width="76" height="42" rx="8" fill="#2a1114" stroke="#ff6b5e" stroke-width="2"/>
  <text x="146" y="46" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">session:abc</text>
  <text x="146" y="62" text-anchor="middle" fill="#ffb300" font-size="8" font-family="ui-monospace,monospace">EX 1800</text>
  <path d="M188 51 H212" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="212,46 222,51 212,56" fill="#66bb6a"/>
  <text x="248" y="42" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="ui-monospace,monospace">GETEX</text>
  <text x="248" y="56" text-anchor="middle" fill="#7d8590" font-size="7" font-family="sans-serif">읽기+연장</text>
  <text x="140" y="92" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">웹 서버는 무상태 · 축출 정책 주의</text>
</svg>`,

  leaderboard: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="16" width="150" height="16" rx="3" fill="#ffb300"/>
  <text x="22" y="28" fill="#3a2c00" font-size="8.5" font-weight="700" font-family="ui-monospace,monospace">1  player:3</text>
  <text x="172" y="28" fill="#ffe082" font-size="8" font-family="ui-monospace,monospace">980</text>
  <rect x="14" y="36" width="120" height="16" rx="3" fill="#b0b0b0"/>
  <text x="22" y="48" fill="#26262a" font-size="8.5" font-weight="700" font-family="ui-monospace,monospace">2  player:9</text>
  <text x="172" y="48" fill="#d7d7d7" font-size="8" font-family="ui-monospace,monospace">640</text>
  <rect x="14" y="56" width="92" height="16" rx="3" fill="#a8663c"/>
  <text x="22" y="68" fill="#2a1608" font-size="8.5" font-weight="700" font-family="ui-monospace,monospace">3  player:7</text>
  <text x="172" y="68" fill="#e0b48c" font-size="8" font-family="ui-monospace,monospace">320</text>
  <rect x="14" y="76" width="60" height="14" rx="3" fill="#3d1a1e" stroke="#ff6b5e"/>
  <text x="22" y="87" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">128  나</text>
  <text x="228" y="34" text-anchor="middle" fill="#ff6b5e" font-size="7.5" font-family="sans-serif">동점 처리</text>
  <text x="228" y="50" text-anchor="middle" fill="#8b7f80" font-size="7" font-family="ui-monospace,monospace">score·10^10</text>
  <text x="228" y="62" text-anchor="middle" fill="#8b7f80" font-size="7" font-family="ui-monospace,monospace">− timestamp</text>
  <text x="228" y="84" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">ZREVRANK</text>
</svg>`,

  idempotency: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="18" width="58" height="22" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="41" y="33" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">요청 #1</text>
  <rect x="12" y="60" width="58" height="22" rx="5" fill="#2e2410" stroke="#ffb300"/>
  <text x="41" y="75" text-anchor="middle" fill="#ffe082" font-size="8" font-family="sans-serif">재시도 #2</text>
  <path d="M74 29 H104" stroke="#66bb6a" stroke-width="1.5"/>
  <polygon points="104,25 112,29 104,33" fill="#66bb6a"/>
  <path d="M74 71 H104" stroke="#ffb300" stroke-width="1.5"/>
  <polygon points="104,67 112,71 104,75" fill="#ffb300"/>
  <rect x="116" y="24" width="76" height="52" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="154" y="42" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">idem:&lt;key&gt;</text>
  <text x="154" y="56" text-anchor="middle" fill="#ff8a80" font-size="7.5" font-family="ui-monospace,monospace">SET NX</text>
  <text x="154" y="70" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">결과 저장</text>
  <path d="M196 34 H222" stroke="#66bb6a" stroke-width="1.5"/>
  <polygon points="222,30 230,34 222,38" fill="#66bb6a"/>
  <text x="252" y="30" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">실제 처리</text>
  <text x="252" y="42" text-anchor="middle" fill="#7d8590" font-size="7" font-family="sans-serif">1회만</text>
  <path d="M196 66 H222" stroke="#ffb300" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="222,62 230,66 222,70" fill="#ffb300"/>
  <text x="252" y="66" text-anchor="middle" fill="#ffe082" font-size="7.5" font-family="sans-serif">저장된</text>
  <text x="252" y="78" text-anchor="middle" fill="#ffe082" font-size="7.5" font-family="sans-serif">결과 반환</text>
</svg>`,

  feed: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="68" y="16" text-anchor="middle" fill="#ff6b5e" font-size="7.5" font-weight="700" font-family="sans-serif">fan-out on WRITE</text>
  <rect x="14" y="42" width="34" height="20" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="31" y="56" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="sans-serif">post</text>
  <g stroke="#ff6b5e" stroke-width="1.2">
    <path d="M52 48 L92 26"/><path d="M52 50 L92 40"/><path d="M52 52 L92 54"/><path d="M52 54 L92 68"/><path d="M52 56 L92 82"/>
  </g>
  <g fill="#3d1a1e" stroke="#ff8a80">
    <rect x="94" y="20" width="32" height="12" rx="3"/><rect x="94" y="34" width="32" height="12" rx="3"/>
    <rect x="94" y="48" width="32" height="12" rx="3"/><rect x="94" y="62" width="32" height="12" rx="3"/>
    <rect x="94" y="76" width="32" height="12" rx="3"/>
  </g>
  <text x="110" y="98" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">쓰기 ×N</text>
  <line x1="140" y1="12" x2="140" y2="92" stroke="#3a2c2e"/>
  <text x="212" y="16" text-anchor="middle" fill="#42a5f5" font-size="7.5" font-weight="700" font-family="sans-serif">fan-out on READ</text>
  <g fill="#12233a" stroke="#42a5f5">
    <rect x="152" y="30" width="32" height="12" rx="3"/><rect x="152" y="46" width="32" height="12" rx="3"/>
    <rect x="152" y="62" width="32" height="12" rx="3"/>
  </g>
  <g stroke="#42a5f5" stroke-width="1.2">
    <path d="M188 36 L222 50"/><path d="M188 52 L222 52"/><path d="M188 68 L222 54"/>
  </g>
  <rect x="226" y="42" width="38" height="20" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="245" y="56" text-anchor="middle" fill="#90caf9" font-size="7.5" font-family="sans-serif">병합</text>
  <text x="212" y="88" text-anchor="middle" fill="#42a5f5" font-size="7" font-family="sans-serif">읽기가 무겁다</text>
</svg>`,

  counter: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <g stroke="#ff6b5e" stroke-width="1.2">
    <path d="M14 24 H44"/><path d="M14 36 H44"/><path d="M14 48 H44"/><path d="M14 60 H44"/><path d="M14 72 H44"/>
  </g>
  <text x="29" y="90" text-anchor="middle" fill="#8b7f80" font-size="7" font-family="sans-serif">클릭 폭주</text>
  <polygon points="44,44 52,48 44,52" fill="#ff6b5e"/>
  <rect x="56" y="26" width="88" height="44" rx="8" fill="#2a1114" stroke="#ff6b5e" stroke-width="2"/>
  <text x="100" y="44" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">stat:…:14</text>
  <text x="100" y="60" text-anchor="middle" fill="#ff8a80" font-size="8" font-family="ui-monospace,monospace">HINCRBY</text>
  <text x="100" y="86" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">원자적 · 락 없음</text>
  <path d="M150 48 H182" stroke="#ffb300" stroke-width="2" stroke-dasharray="4 3"/>
  <polygon points="182,43 192,48 182,53" fill="#ffb300"/>
  <text x="170" y="40" text-anchor="middle" fill="#ffb300" font-size="7" font-family="sans-serif">주기 플러시</text>
  <ellipse cx="230" cy="32" rx="24" ry="7" fill="#1b2430" stroke="#546e7a"/>
  <path d="M206 32 V62 a24 7 0 0 0 48 0 V32" fill="#1b2430" stroke="#546e7a"/>
  <text x="230" y="52" text-anchor="middle" fill="#78909c" font-size="8" font-family="sans-serif">DB</text>
  <text x="185" y="88" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">읽기+리셋은 원자적으로</text>
</svg>`,

  editions: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="20" width="120" height="60" rx="8" fill="#2a1114" stroke="#ff6b5e" stroke-width="2"/>
  <text x="74" y="38" text-anchor="middle" fill="#ff8a80" font-size="9" font-weight="700" font-family="sans-serif">Redis OSS 8</text>
  <rect x="24" y="46" width="46" height="14" rx="3" fill="#3d1a1e"/><text x="47" y="57" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="sans-serif">core</text>
  <rect x="76" y="46" width="48" height="14" rx="3" fill="#3d1a1e"/><text x="100" y="57" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="sans-serif">JSON·TS</text>
  <rect x="24" y="62" width="100" height="12" rx="3" fill="#3d1a1e"/><text x="74" y="72" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="sans-serif">구 Stack 기능 통합</text>
  <rect x="146" y="14" width="120" height="26" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="206" y="31" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">Software / Cloud (상용)</text>
  <rect x="146" y="44" width="120" height="26" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="206" y="61" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">Valkey (BSD 포크)</text>
  <text x="206" y="86" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">버전·배포판을 못 박을 것</text>
</svg>`,

  firstrun: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="18" width="252" height="64" rx="8" fill="#0d1117" stroke="#30363d"/>
  <circle cx="26" cy="28" r="3" fill="#ff6b5e"/><circle cx="36" cy="28" r="3" fill="#ffb300"/><circle cx="46" cy="28" r="3" fill="#66bb6a"/>
  <text x="24" y="48" fill="#66bb6a" font-size="9" font-family="ui-monospace,monospace">$ docker run -p 6379:6379 redis:8</text>
  <text x="24" y="64" fill="#66bb6a" font-size="9" font-family="ui-monospace,monospace">$ redis-cli PING</text>
  <text x="24" y="78" fill="#ff8a80" font-size="10" font-weight="700" font-family="ui-monospace,monospace">PONG</text>
  <text x="230" y="78" fill="#6d5a5c" font-size="7" font-family="sans-serif">볼륨 필수</text>
</svg>`,

  modeling: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="30" width="70" height="40" rx="8" fill="#12233a" stroke="#42a5f5"/>
  <text x="47" y="47" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">필요한</text>
  <text x="47" y="60" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">질의</text>
  <path d="M86 50 H108" stroke="#ff6b5e" stroke-width="2"/><polygon points="108,45 118,50 108,55" fill="#ff6b5e"/>
  <rect x="122" y="30" width="70" height="40" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="157" y="47" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">자료구조</text>
  <text x="157" y="60" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">선택</text>
  <path d="M196 50 H218" stroke="#ff6b5e" stroke-width="2"/><polygon points="218,45 228,50 218,55" fill="#ff6b5e"/>
  <rect x="232" y="30" width="36" height="40" rx="8" fill="#12331c" stroke="#66bb6a"/>
  <text x="250" y="53" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">키</text>
  <text x="140" y="20" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">관계형과 반대 순서</text>
  <text x="140" y="90" text-anchor="middle" fill="#ffb300" font-size="8" font-family="sans-serif">중복 저장은 결함이 아니라 의도</text>
</svg>`,

  clientlib: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="252" height="22" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="24" y="29" fill="#a5d6a7" font-size="8.5" font-family="sans-serif">① 커넥션 풀 — 요청마다 연결 열지 않는가</text>
  <rect x="14" y="40" width="252" height="22" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="24" y="55" fill="#90caf9" font-size="8.5" font-family="sans-serif">② 클러스터 — 슬롯 맵 캐시 · MOVED 자동</text>
  <rect x="14" y="66" width="252" height="22" rx="5" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="24" y="81" fill="#ffcdd2" font-size="8.5" font-family="sans-serif">③ RESP3 — 클라이언트 캐싱 · push 수신</text>
</svg>`,

  bitfield: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="8" font-family="sans-serif">한 문자열 = 여러 정수 필드</text>
  <rect x="14" y="28" width="60" height="24" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="44" y="44" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">u8 #0</text>
  <rect x="76" y="28" width="60" height="24" rx="3" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="106" y="44" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">u8 #1</text>
  <rect x="138" y="28" width="76" height="24" rx="3" fill="#221618" stroke="#7a4a48"/>
  <text x="176" y="44" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">i16 #1</text>
  <text x="232" y="44" fill="#6d5a5c" font-size="10" font-family="ui-monospace,monospace">…</text>
  <text x="14" y="70" fill="#ffb300" font-size="8" font-weight="700" font-family="sans-serif">OVERFLOW</text>
  <rect x="76" y="60" width="58" height="14" rx="3" fill="#12331c" stroke="#66bb6a"/><text x="105" y="71" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">SAT 포화</text>
  <rect x="138" y="60" width="58" height="14" rx="3" fill="#2e2410" stroke="#ffb300"/><text x="167" y="71" text-anchor="middle" fill="#ffe082" font-size="7.5" font-family="ui-monospace,monospace">WRAP 순환</text>
  <rect x="200" y="60" width="58" height="14" rx="3" fill="#2e1416" stroke="#e05a4e"/><text x="229" y="71" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">FAIL nil</text>
  <text x="140" y="90" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">상한 처리를 앱 분기 없이 서버에서</text>
</svg>`,

  listadv: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="140" y="18" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">quicklist = listpack 노드의 연결 리스트</text>
  <rect x="14" y="26" width="66" height="30" rx="5" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="47" y="45" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">listpack</text>
  <path d="M82 41 H92" stroke="#7a4a48" stroke-width="1.5"/>
  <rect x="94" y="26" width="66" height="30" rx="5" fill="#221618" stroke="#7a4a48"/>
  <text x="127" y="41" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="ui-monospace,monospace">LZF 압축</text>
  <text x="127" y="52" text-anchor="middle" fill="#6d5a5c" font-size="6.5" font-family="sans-serif">가운데</text>
  <path d="M162 41 H172" stroke="#7a4a48" stroke-width="1.5"/>
  <rect x="174" y="26" width="66" height="30" rx="5" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="207" y="45" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">listpack</text>
  <text x="47" y="68" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">양 끝 비압축</text>
  <text x="207" y="68" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">양 끝 비압축</text>
  <text x="140" y="88" text-anchor="middle" fill="#ffb300" font-size="8" font-family="ui-monospace,monospace">LPOS · LINSERT · LMPOP</text>
</svg>`,

  zsetadv: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="18" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">ZADD … GT</text>
  <rect x="14" y="26" width="112" height="20" rx="4" fill="#221618" stroke="#7a4a48"/>
  <text x="70" y="40" text-anchor="middle" fill="#d7b4b2" font-size="8" font-family="ui-monospace,monospace">기존 980</text>
  <path d="M70 50 V60" stroke="#66bb6a" stroke-width="1.5"/><polygon points="65,60 70,68 75,60" fill="#66bb6a"/>
  <rect x="14" y="70" width="52" height="20" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="40" y="84" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="ui-monospace,monospace">1200 ✓</text>
  <rect x="74" y="70" width="52" height="20" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="100" y="84" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">640 ✕</text>
  <line x1="140" y1="12" x2="140" y2="94" stroke="#3a2c2e"/>
  <text x="210" y="22" text-anchor="middle" fill="#ff6b5e" font-size="8" font-weight="700" font-family="sans-serif">STORE 없이 즉시 반환</text>
  <rect x="152" y="30" width="116" height="16" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="160" y="42" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">ZINTER 2 a b</text>
  <rect x="152" y="50" width="116" height="16" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="160" y="62" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">ZDIFF  2 a b</text>
  <rect x="152" y="70" width="116" height="16" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="160" y="82" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">ZRANGESTORE</text>
</svg>`,

  streamops: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="18" fill="#8b7f80" font-size="8" font-family="sans-serif">트리밍</text>
  <rect x="14" y="24" width="30" height="20" rx="3" fill="#1a1416" stroke="#4a3a3c" stroke-dasharray="3 2"/>
  <rect x="46" y="24" width="30" height="20" rx="3" fill="#1a1416" stroke="#4a3a3c" stroke-dasharray="3 2"/>
  <rect x="78" y="24" width="30" height="20" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
  <rect x="110" y="24" width="30" height="20" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="45" y="56" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">잘림</text>
  <text x="124" y="56" text-anchor="middle" fill="#ff8a80" font-size="7" font-family="sans-serif">보관</text>
  <text x="14" y="74" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">MAXLEN ~ 개수</text>
  <text x="14" y="88" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">MINID  ~ 시각</text>
  <line x1="152" y1="12" x2="152" y2="94" stroke="#3a2c2e"/>
  <text x="216" y="20" text-anchor="middle" fill="#42a5f5" font-size="8" font-weight="700" font-family="sans-serif">PEL 회수</text>
  <rect x="164" y="28" width="48" height="20" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="188" y="42" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="sans-serif">죽은 w1</text>
  <path d="M216 38 H232" stroke="#66bb6a" stroke-width="1.5"/><polygon points="232,34 240,38 232,42" fill="#66bb6a"/>
  <rect x="220" y="52" width="48" height="20" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="244" y="66" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="sans-serif">w2</text>
  <text x="210" y="88" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="ui-monospace,monospace">XAUTOCLAIM</text>
</svg>`,

  typepick: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="140" y="16" text-anchor="middle" fill="#ff6b5e" font-size="8.5" font-weight="700" font-family="sans-serif">질의 형태가 타입을 정한다</text>
  <rect x="14" y="24" width="120" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="20" y="36" fill="#7d8590" font-size="7" font-family="sans-serif">값 하나 · 카운터</text>
  <text x="140" y="36" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">String</text>
  <rect x="14" y="42" width="120" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="20" y="54" fill="#7d8590" font-size="7" font-family="sans-serif">객체의 일부 필드</text>
  <text x="140" y="54" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">Hash</text>
  <rect x="14" y="60" width="120" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="20" y="72" fill="#7d8590" font-size="7" font-family="sans-serif">순위 · 범위</text>
  <text x="140" y="72" fill="#ff8a80" font-size="7.5" font-family="ui-monospace,monospace">ZSet</text>
  <rect x="14" y="78" width="120" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="20" y="90" fill="#7d8590" font-size="7" font-family="sans-serif">여러 소비자 · 재처리</text>
  <text x="140" y="90" fill="#ff8a80" font-size="7.5" font-family="ui-monospace,monospace">Stream</text>
  <text x="216" y="52" text-anchor="middle" fill="#66bb6a" font-size="8" font-weight="700" font-family="sans-serif">헷갈리면</text>
  <text x="216" y="68" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="ui-monospace,monospace">Hash · ZSet</text>
</svg>`,

  memcost: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="18" text-anchor="middle" fill="#e05a4e" font-size="8" font-weight="700" font-family="sans-serif">키 1M 개</text>
  <g>
    <rect x="16" y="26" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="34" y="26" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="52" y="26" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="70" y="26" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="88" y="26" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="106" y="26" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="16" y="44" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="34" y="44" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="52" y="44" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="70" y="44" width="14" height="14" rx="2" fill="#2e1416" stroke="#e05a4e"/>
  </g>
  <text x="70" y="76" text-anchor="middle" fill="#e05a4e" font-size="8" font-family="sans-serif">키마다 고정 오버헤드</text>
  <text x="70" y="90" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">이름 + dict + robj + expire</text>
  <text x="150" y="52" fill="#66bb6a" font-size="14" font-family="sans-serif">≫</text>
  <text x="216" y="18" text-anchor="middle" fill="#66bb6a" font-size="8" font-weight="700" font-family="sans-serif">해시 10K 개</text>
  <g>
    <rect x="176" y="30" width="34" height="24" rx="3" fill="#12331c" stroke="#66bb6a"/>
    <rect x="216" y="30" width="34" height="24" rx="3" fill="#12331c" stroke="#66bb6a"/>
    <rect x="176" y="58" width="34" height="24" rx="3" fill="#12331c" stroke="#66bb6a"/>
    <rect x="216" y="58" width="34" height="24" rx="3" fill="#12331c" stroke="#66bb6a"/>
  </g>
  <text x="216" y="94" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">listpack 으로 압축</text>
</svg>`,

  expirecycle: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="18" text-anchor="middle" fill="#42a5f5" font-size="8" font-weight="700" font-family="sans-serif">수동 — 접근할 때</text>
  <rect x="14" y="26" width="112" height="26" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="70" y="43" text-anchor="middle" fill="#90caf9" font-size="8" font-family="ui-monospace,monospace">GET k → 만료? → DEL</text>
  <text x="70" y="66" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">아무도 안 보면 영원히 남음</text>
  <line x1="140" y1="12" x2="140" y2="94" stroke="#3a2c2e"/>
  <text x="210" y="18" text-anchor="middle" fill="#ff6b5e" font-size="8" font-weight="700" font-family="sans-serif">능동 — serverCron</text>
  <g>
    <circle cx="164" cy="36" r="4" fill="#e05a4e"/><circle cx="180" cy="36" r="4" fill="#7a4a48"/>
    <circle cx="196" cy="36" r="4" fill="#e05a4e"/><circle cx="212" cy="36" r="4" fill="#7a4a48"/>
    <circle cx="228" cy="36" r="4" fill="#e05a4e"/><circle cx="244" cy="36" r="4" fill="#7a4a48"/>
  </g>
  <text x="204" y="56" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="sans-serif">표본 추출 → 만료분 삭제</text>
  <text x="204" y="72" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">25% 넘으면 즉시 반복</text>
  <text x="140" y="92" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">만료 시각 ≠ 삭제 시각</text>
</svg>`,

  backlog: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="18" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">repl backlog (원형 버퍼)</text>
  <rect x="14" y="24" width="200" height="22" rx="4" fill="#1a1012" stroke="#7a4a48"/>
  <rect x="16" y="26" width="120" height="18" rx="3" fill="#3d1a1e"/>
  <text x="76" y="39" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">보관 중인 스트림</text>
  <line x1="60" y1="20" x2="60" y2="50" stroke="#66bb6a" stroke-width="2"/>
  <text x="60" y="62" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">요청 offset</text>
  <text x="60" y="74" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-weight="700" font-family="sans-serif">부분 재동기화 ✓</text>
  <line x1="176" y1="20" x2="176" y2="50" stroke="#e05a4e" stroke-width="2" stroke-dasharray="3 2"/>
  <text x="190" y="62" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">밀려남</text>
  <text x="196" y="74" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-weight="700" font-family="sans-serif">전체 재동기화 (fork!)</text>
  <text x="140" y="92" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="sans-serif">크기 ≥ 끊김 시간 × 쓰기 처리량</text>
</svg>`,

  diskless: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="34" width="60" height="30" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="44" y="53" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">master</text>
  <path d="M78 40 C110 20 130 20 160 30" stroke="#6d5a5c" stroke-width="1.5" fill="none" stroke-dasharray="3 2"/>
  <ellipse cx="118" cy="20" rx="18" ry="6" fill="#1b2430" stroke="#546e7a"/>
  <text x="118" y="14" text-anchor="middle" fill="#546e7a" font-size="7" font-family="sans-serif">disk</text>
  <text x="118" y="34" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">기본 경로</text>
  <path d="M78 56 H160" stroke="#66bb6a" stroke-width="2.5"/>
  <polygon points="160,51 170,56 160,61" fill="#66bb6a"/>
  <text x="118" y="72" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-weight="700" font-family="sans-serif">fork → socket 직송</text>
  <rect x="174" y="34" width="60" height="30" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="204" y="53" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">replica</text>
  <text x="140" y="92" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">repl-diskless-load swapdb</text>
</svg>`,

  slotmig: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="30" width="76" height="36" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="52" y="46" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">node A</text>
  <text x="52" y="59" text-anchor="middle" fill="#ffb300" font-size="7" font-family="ui-monospace,monospace">MIGRATING</text>
  <path d="M94 48 H150" stroke="#ffb300" stroke-width="2"/>
  <polygon points="150,43 160,48 150,53" fill="#ffb300"/>
  <text x="126" y="40" text-anchor="middle" fill="#ffb300" font-size="7" font-family="ui-monospace,monospace">MIGRATE</text>
  <rect x="164" y="30" width="76" height="36" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="202" y="46" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">node B</text>
  <text x="202" y="59" text-anchor="middle" fill="#42a5f5" font-size="7" font-family="ui-monospace,monospace">IMPORTING</text>
  <text x="140" y="18" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">슬롯 5798 이전 중</text>
  <text x="126" y="80" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">키 있음 → 처리 · 없음 → ASK</text>
  <text x="140" y="94" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">ASK 는 슬롯 맵을 갱신하지 않는다</text>
</svg>`,

  swapdb: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="24" y="24" width="80" height="30" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="64" y="43" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">DB 0 (현재)</text>
  <rect x="24" y="62" width="80" height="30" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="64" y="81" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="ui-monospace,monospace">DB 1 (신규)</text>
  <path d="M112 36 C142 36 142 74 168 74" stroke="#ffb300" stroke-width="2" fill="none"/>
  <polygon points="168,69 178,74 168,79" fill="#ffb300"/>
  <path d="M112 80 C142 80 142 42 168 42" stroke="#ffb300" stroke-width="2" fill="none"/>
  <polygon points="168,37 178,42 168,47" fill="#ffb300"/>
  <text x="140" y="18" text-anchor="middle" fill="#ffb300" font-size="8" font-weight="700" font-family="ui-monospace,monospace">SWAPDB 0 1</text>
  <rect x="182" y="28" width="80" height="30" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="222" y="47" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="ui-monospace,monospace">DB 0 (신규)</text>
  <rect x="182" y="64" width="80" height="26" rx="6" fill="#1a1416" stroke="#4a3a3c"/>
  <text x="222" y="81" text-anchor="middle" fill="#6d5a5c" font-size="8" font-family="ui-monospace,monospace">DB 1 → 폐기</text>
</svg>`,

  waitaof: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="36" width="52" height="26" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="40" y="53" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">client</text>
  <path d="M70 49 H96" stroke="#ff6b5e" stroke-width="1.5"/><polygon points="96,45 104,49 96,53" fill="#ff6b5e"/>
  <rect x="108" y="24" width="66" height="26" rx="5" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="141" y="41" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">master</text>
  <path d="M141 52 V64" stroke="#66bb6a" stroke-width="1.5"/><polygon points="136,64 141,72 146,64" fill="#66bb6a"/>
  <rect x="108" y="72" width="66" height="18" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="141" y="85" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">AOF fsync</text>
  <path d="M178 37 H204" stroke="#ff6b5e" stroke-width="1.5" stroke-dasharray="3 2"/><polygon points="204,33 212,37 204,41" fill="#ff6b5e"/>
  <rect x="214" y="24" width="52" height="26" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="240" y="41" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">replica</text>
  <text x="240" y="66" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">[1, 0]</text>
  <text x="240" y="80" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">반환값 반드시 검사</text>
</svg>`,

  routing: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="34" width="58" height="32" rx="6" fill="#12233a" stroke="#42a5f5"/>
  <text x="41" y="48" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">client</text>
  <text x="41" y="60" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="sans-serif">slot map 캐시</text>
  <path d="M74 42 L118 28" stroke="#66bb6a" stroke-width="2"/>
  <polygon points="118,24 126,28 118,32" fill="#66bb6a"/>
  <text x="96" y="20" text-anchor="middle" fill="#66bb6a" font-size="7" font-weight="700" font-family="sans-serif">1 hop</text>
  <rect x="130" y="16" width="52" height="22" rx="5" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="156" y="31" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="sans-serif">node A</text>
  <rect x="130" y="44" width="52" height="22" rx="5" fill="#221618" stroke="#7a4a48"/>
  <text x="156" y="59" text-anchor="middle" fill="#d7b4b2" font-size="7.5" font-family="sans-serif">node B</text>
  <rect x="130" y="72" width="52" height="22" rx="5" fill="#221618" stroke="#7a4a48"/>
  <text x="156" y="87" text-anchor="middle" fill="#d7b4b2" font-size="7.5" font-family="sans-serif">node C</text>
  <line x1="196" y1="12" x2="196" y2="94" stroke="#3a2c2e"/>
  <text x="238" y="24" text-anchor="middle" fill="#ffb300" font-size="8" font-weight="700" font-family="sans-serif">프록시</text>
  <text x="238" y="42" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">+ 단일 엔드포인트</text>
  <text x="238" y="58" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">− 홉 +1</text>
  <text x="238" y="72" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">− SPOF · 병목</text>
</svg>`,

  hashtag: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="20" width="252" height="20" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="22" y="34" fill="#7d8590" font-size="8.5" font-family="ui-monospace,monospace">user:</text>
  <text x="56" y="34" fill="#ff8a80" font-size="8.5" font-weight="700" font-family="ui-monospace,monospace">{1000}</text>
  <text x="104" y="34" fill="#7d8590" font-size="8.5" font-family="ui-monospace,monospace">:profile</text>
  <text x="190" y="34" fill="#66bb6a" font-size="8" font-family="ui-monospace,monospace">→ slot 1234</text>
  <rect x="14" y="44" width="252" height="20" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="22" y="58" fill="#7d8590" font-size="8.5" font-family="ui-monospace,monospace">user:</text>
  <text x="56" y="58" fill="#ff8a80" font-size="8.5" font-weight="700" font-family="ui-monospace,monospace">{1000}</text>
  <text x="104" y="58" fill="#7d8590" font-size="8.5" font-family="ui-monospace,monospace">:cart</text>
  <text x="190" y="58" fill="#66bb6a" font-size="8" font-family="ui-monospace,monospace">→ slot 1234</text>
  <text x="140" y="14" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="sans-serif">첫 { 와 그 뒤 첫 } 사이만 해싱</text>
  <rect x="14" y="70" width="252" height="20" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="22" y="84" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">{app}:user:1 · {app}:user:2 …</text>
  <text x="190" y="84" fill="#e05a4e" font-size="7.5" font-family="sans-serif">→ 슬롯 1개 집중 ✕</text>
</svg>`,

  robj: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="20" width="120" height="66" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="74" y="34" text-anchor="middle" fill="#ff8a80" font-size="8.5" font-weight="700" font-family="ui-monospace,monospace">robj</text>
  <rect x="24" y="40" width="100" height="12" rx="2" fill="#3d1a1e"/><text x="74" y="50" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">type · encoding</text>
  <rect x="24" y="54" width="100" height="12" rx="2" fill="#2e2410"/><text x="74" y="64" text-anchor="middle" fill="#ffe082" font-size="7" font-family="ui-monospace,monospace">lru (24bit)</text>
  <rect x="24" y="68" width="100" height="12" rx="2" fill="#12233a"/><text x="74" y="78" text-anchor="middle" fill="#90caf9" font-size="7" font-family="ui-monospace,monospace">refcount · ptr</text>
  <text x="206" y="22" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">같은 String, 다른 표현</text>
  <rect x="146" y="30" width="120" height="16" rx="3" fill="#12331c" stroke="#66bb6a"/>
  <text x="154" y="42" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">int    12345 (값 직접)</text>
  <rect x="146" y="50" width="120" height="16" rx="3" fill="#12331c" stroke="#66bb6a"/>
  <text x="154" y="62" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">embstr ≤44B (불변)</text>
  <rect x="146" y="70" width="120" height="16" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="154" y="82" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">raw    별도 할당</text>
</svg>`,

  sds: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="34" width="42" height="30" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="35" y="53" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">len</text>
  <rect x="58" y="34" width="42" height="30" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="79" y="53" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">alloc</text>
  <rect x="102" y="34" width="30" height="30" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="117" y="53" text-anchor="middle" fill="#ffe082" font-size="7" font-family="ui-monospace,monospace">flg</text>
  <rect x="134" y="34" width="80" height="30" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="174" y="53" text-anchor="middle" fill="#a5d6ff" font-size="8" font-family="ui-monospace,monospace">buf[] …</text>
  <rect x="216" y="34" width="50" height="30" rx="4" fill="#1a1416" stroke="#4a3a3c" stroke-dasharray="3 2"/>
  <text x="241" y="53" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">여유</text>
  <text x="70" y="24" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-weight="700" font-family="sans-serif">STRLEN = O(1)</text>
  <text x="174" y="24" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-weight="700" font-family="sans-serif">널 바이트 허용</text>
  <text x="241" y="24" text-anchor="middle" fill="#ffb300" font-size="7" font-family="sans-serif">선점</text>
  <text x="140" y="82" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">길이별 헤더 sdshdr5/8/16/32/64 로 오버헤드 절감</text>
</svg>`,

  dict: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="66" y="18" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="ui-monospace,monospace">ht[0] (기존)</text>
  <g>
    <rect x="20" y="24" width="92" height="12" rx="2" fill="#221618" stroke="#7a4a48"/>
    <rect x="20" y="38" width="92" height="12" rx="2" fill="#1a1416" stroke="#3a2c2e"/>
    <rect x="20" y="52" width="92" height="12" rx="2" fill="#1a1416" stroke="#3a2c2e"/>
    <rect x="20" y="66" width="92" height="12" rx="2" fill="#221618" stroke="#7a4a48"/>
  </g>
  <text x="66" y="92" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="ui-monospace,monospace">rehashidx = 2</text>
  <path d="M118 50 H144" stroke="#ffb300" stroke-width="2"/>
  <polygon points="144,45 154,50 144,55" fill="#ffb300"/>
  <text x="136" y="42" text-anchor="middle" fill="#ffb300" font-size="7" font-family="sans-serif">조금씩</text>
  <text x="214" y="18" text-anchor="middle" fill="#66bb6a" font-size="8" font-family="ui-monospace,monospace">ht[1] (2배)</text>
  <g>
    <rect x="162" y="22" width="104" height="9" rx="2" fill="#12331c" stroke="#66bb6a"/>
    <rect x="162" y="33" width="104" height="9" rx="2" fill="#12331c" stroke="#66bb6a"/>
    <rect x="162" y="44" width="104" height="9" rx="2" fill="#0f2416" stroke="#2e5a35"/>
    <rect x="162" y="55" width="104" height="9" rx="2" fill="#0f2416" stroke="#2e5a35"/>
    <rect x="162" y="66" width="104" height="9" rx="2" fill="#0f2416" stroke="#2e5a35"/>
    <rect x="162" y="77" width="104" height="9" rx="2" fill="#0f2416" stroke="#2e5a35"/>
  </g>
  <text x="214" y="96" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">새 삽입은 항상 ht[1]</text>
</svg>`,

  listpack: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="34" width="34" height="30" rx="3" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="31" y="53" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">hdr</text>
  <rect x="50" y="34" width="52" height="30" rx="3" fill="#12331c" stroke="#66bb6a"/>
  <text x="76" y="47" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">enc+data</text>
  <text x="76" y="59" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="ui-monospace,monospace">backlen</text>
  <rect x="104" y="34" width="52" height="30" rx="3" fill="#12331c" stroke="#66bb6a"/>
  <text x="130" y="47" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">enc+data</text>
  <text x="130" y="59" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="ui-monospace,monospace">backlen</text>
  <rect x="158" y="34" width="52" height="30" rx="3" fill="#12331c" stroke="#66bb6a"/>
  <text x="184" y="47" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">enc+data</text>
  <text x="184" y="59" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="ui-monospace,monospace">backlen</text>
  <rect x="212" y="34" width="30" height="30" rx="3" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="227" y="53" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">end</text>
  <text x="140" y="24" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">연속 메모리 · 포인터 없음</text>
  <text x="140" y="80" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">backlen → 역방향 순회 가능</text>
  <text x="140" y="92" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="sans-serif">ziplist 의 연쇄 갱신 문제 해소</text>
</svg>`,

  quicklist: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="12" y="34" width="56" height="32" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="40" y="48" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">listpack</text>
  <text x="40" y="60" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="sans-serif">비압축</text>
  <path d="M70 50 H84" stroke="#7a4a48" stroke-width="1.5"/>
  <rect x="86" y="34" width="52" height="32" rx="5" fill="#221618" stroke="#7a4a48"/>
  <text x="112" y="48" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="ui-monospace,monospace">LZF</text>
  <text x="112" y="60" text-anchor="middle" fill="#6d5a5c" font-size="6.5" font-family="sans-serif">압축</text>
  <path d="M140 50 H154" stroke="#7a4a48" stroke-width="1.5"/>
  <rect x="156" y="34" width="52" height="32" rx="5" fill="#221618" stroke="#7a4a48"/>
  <text x="182" y="48" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="ui-monospace,monospace">LZF</text>
  <path d="M210 50 H222" stroke="#7a4a48" stroke-width="1.5"/>
  <rect x="224" y="34" width="44" height="32" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="246" y="48" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">listpack</text>
  <text x="246" y="60" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="sans-serif">비압축</text>
  <text x="140" y="22" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">양 끝만 빠르면 되는 자료구조</text>
  <text x="140" y="86" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">list-compress-depth 1</text>
</svg>`,

  skiplist: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="7" font-family="ui-monospace,monospace">L3</text>
  <line x1="30" y1="17" x2="240" y2="17" stroke="#ff6b5e" stroke-width="1.5"/>
  <circle cx="30" cy="17" r="3.5" fill="#ff6b5e"/><circle cx="240" cy="17" r="3.5" fill="#ff6b5e"/>
  <text x="14" y="40" fill="#8b7f80" font-size="7" font-family="ui-monospace,monospace">L2</text>
  <line x1="30" y1="37" x2="240" y2="37" stroke="#ff8a80" stroke-width="1.5"/>
  <circle cx="30" cy="37" r="3.5" fill="#ff8a80"/><circle cx="120" cy="37" r="3.5" fill="#ff8a80"/><circle cx="240" cy="37" r="3.5" fill="#ff8a80"/>
  <text x="14" y="60" fill="#8b7f80" font-size="7" font-family="ui-monospace,monospace">L1</text>
  <line x1="30" y1="57" x2="240" y2="57" stroke="#d7b4b2" stroke-width="1.5"/>
  <circle cx="30" cy="57" r="3.5" fill="#d7b4b2"/><circle cx="75" cy="57" r="3.5" fill="#d7b4b2"/><circle cx="120" cy="57" r="3.5" fill="#d7b4b2"/><circle cx="195" cy="57" r="3.5" fill="#d7b4b2"/><circle cx="240" cy="57" r="3.5" fill="#d7b4b2"/>
  <text x="14" y="80" fill="#8b7f80" font-size="7" font-family="ui-monospace,monospace">L0</text>
  <line x1="30" y1="77" x2="240" y2="77" stroke="#7a4a48" stroke-width="1.5"/>
  <g fill="#7a4a48">
    <circle cx="30" cy="77" r="3.5"/><circle cx="52" cy="77" r="3.5"/><circle cx="75" cy="77" r="3.5"/><circle cx="97" cy="77" r="3.5"/>
    <circle cx="120" cy="77" r="3.5"/><circle cx="150" cy="77" r="3.5"/><circle cx="172" cy="77" r="3.5"/><circle cx="195" cy="77" r="3.5"/>
    <circle cx="217" cy="77" r="3.5"/><circle cx="240" cy="77" r="3.5"/>
  </g>
  <text x="252" y="42" fill="#66bb6a" font-size="7" font-family="sans-serif">1/4</text>
  <text x="140" y="94" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">범위·순위는 skiplist · 멤버→점수는 dict</text>
</svg>`,

  intset: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="140" y="20" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">정렬된 정수 배열 · 이진 탐색</text>
  <g font-family="ui-monospace,monospace" font-size="8.5">
    <rect x="20" y="28" width="34" height="22" rx="3" fill="#12331c" stroke="#66bb6a"/><text x="37" y="43" text-anchor="middle" fill="#a5d6a7">1</text>
    <rect x="56" y="28" width="34" height="22" rx="3" fill="#12331c" stroke="#66bb6a"/><text x="73" y="43" text-anchor="middle" fill="#a5d6a7">2</text>
    <rect x="92" y="28" width="34" height="22" rx="3" fill="#3d1a1e" stroke="#ff8a80"/><text x="109" y="43" text-anchor="middle" fill="#ffcdd2">3</text>
    <rect x="128" y="28" width="34" height="22" rx="3" fill="#12331c" stroke="#66bb6a"/><text x="145" y="43" text-anchor="middle" fill="#a5d6a7">7</text>
    <rect x="164" y="28" width="42" height="22" rx="3" fill="#12331c" stroke="#66bb6a"/><text x="185" y="43" text-anchor="middle" fill="#a5d6a7">42</text>
  </g>
  <text x="109" y="62" text-anchor="middle" fill="#ff8a80" font-size="7" font-family="sans-serif">▲ 중앙부터</text>
  <text x="234" y="43" text-anchor="middle" fill="#66bb6a" font-size="8" font-weight="700" font-family="sans-serif">int16</text>
  <path d="M232 50 V58" stroke="#ffb300" stroke-width="1.5"/><polygon points="228,58 232,64 236,58" fill="#ffb300"/>
  <text x="234" y="76" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">int32 · int64</text>
  <text x="110" y="82" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">문자열 하나만 들어와도 즉시 승격</text>
  <text x="140" y="94" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">ID는 문자열로 감싸지 말 것</text>
</svg>`,

  rax: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="98" y="16" width="84" height="18" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="140" y="29" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">"1786460"</text>
  <text x="140" y="10" text-anchor="middle" fill="#8b7f80" font-size="7" font-family="sans-serif">공통 접두어는 한 번만</text>
  <path d="M126 36 L86 50 M154 36 L194 50" stroke="#7a4a48" stroke-width="1.5"/>
  <rect x="52" y="50" width="68" height="18" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="86" y="63" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="ui-monospace,monospace">"123-0"</text>
  <rect x="160" y="50" width="68" height="18" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="194" y="63" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="ui-monospace,monospace">"456-1"</text>
  <path d="M86 70 V78" stroke="#42a5f5" stroke-width="1.5"/>
  <path d="M194 70 V78" stroke="#42a5f5" stroke-width="1.5"/>
  <rect x="52" y="78" width="68" height="14" rx="3" fill="#12233a" stroke="#42a5f5"/>
  <text x="86" y="89" text-anchor="middle" fill="#90caf9" font-size="7" font-family="ui-monospace,monospace">listpack</text>
  <rect x="160" y="78" width="68" height="14" rx="3" fill="#12233a" stroke="#42a5f5"/>
  <text x="194" y="89" text-anchor="middle" fill="#90caf9" font-size="7" font-family="ui-monospace,monospace">listpack</text>
  <text x="252" y="30" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">정렬</text>
  <text x="252" y="42" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">유지</text>
</svg>`,

  eventloopint: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="140" cy="52" r="34" fill="none" stroke="#ff6b5e" stroke-width="2" stroke-dasharray="6 4"/>
  <polygon points="140,14 146,24 134,24" fill="#ff6b5e"/>
  <rect x="86" y="14" width="60" height="16" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="116" y="26" text-anchor="middle" fill="#90caf9" font-size="7" font-family="ui-monospace,monospace">① poll</text>
  <rect x="182" y="34" width="72" height="16" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="218" y="46" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">② 명령 실행</text>
  <rect x="182" y="56" width="72" height="16" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="218" y="68" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">③ 응답 전송</text>
  <rect x="26" y="56" width="86" height="16" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="69" y="68" text-anchor="middle" fill="#ffe082" font-size="7" font-family="ui-monospace,monospace">④ beforeSleep</text>
  <text x="140" y="50" text-anchor="middle" fill="#ff8a80" font-size="8" font-weight="700" font-family="sans-serif">ae</text>
  <text x="140" y="62" text-anchor="middle" fill="#8b7f80" font-size="6.5" font-family="sans-serif">epoll/kqueue</text>
  <text x="140" y="96" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">명령 하나가 늦으면 ①~④ 전부 멈춘다</text>
</svg>`,

  servercron: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="18" fill="#ffb300" font-size="8" font-weight="700" font-family="ui-monospace,monospace">hz 10 → 100ms 마다</text>
  <line x1="14" y1="30" x2="266" y2="30" stroke="#4a3a3c" stroke-width="1.5"/>
  <g fill="#ffb300">
    <circle cx="30" cy="30" r="3.5"/><circle cx="70" cy="30" r="3.5"/><circle cx="110" cy="30" r="3.5"/>
    <circle cx="150" cy="30" r="3.5"/><circle cx="190" cy="30" r="3.5"/><circle cx="230" cy="30" r="3.5"/>
  </g>
  <rect x="14" y="42" width="122" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="22" y="54" fill="#a5d6ff" font-size="7.5" font-family="sans-serif">만료 능동 회수</text>
  <rect x="144" y="42" width="122" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="152" y="54" fill="#a5d6ff" font-size="7.5" font-family="sans-serif">점진적 리해싱</text>
  <rect x="14" y="62" width="122" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="22" y="74" fill="#a5d6ff" font-size="7.5" font-family="sans-serif">클라이언트 타임아웃</text>
  <rect x="144" y="62" width="122" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  <text x="152" y="74" fill="#a5d6ff" font-size="7.5" font-family="sans-serif">자식 프로세스 확인</text>
  <text x="140" y="92" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="ui-monospace,monospace">dynamic-hz = 부하 따라 자동</text>
</svg>`,

  allocator: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="18" fill="#8b7f80" font-size="8" font-family="sans-serif">요청 33B → 크기 클래스 48B</text>
  <rect x="14" y="24" width="60" height="18" rx="3" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="44" y="37" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">33B</text>
  <rect x="80" y="24" width="88" height="18" rx="3" fill="#221618" stroke="#7a4a48"/>
  <text x="124" y="37" text-anchor="middle" fill="#d7b4b2" font-size="7.5" font-family="ui-monospace,monospace">48B 할당</text>
  <text x="196" y="37" fill="#e05a4e" font-size="7.5" font-family="sans-serif">15B 낭비</text>
  <text x="14" y="60" fill="#8b7f80" font-size="8" font-family="sans-serif">삭제 후 — 조각이 흩어져 반환 불가</text>
  <g>
    <rect x="14" y="66" width="20" height="14" rx="2" fill="#3d1a1e"/><rect x="36" y="66" width="20" height="14" rx="2" fill="#1a1416" stroke="#3a2c2e"/>
    <rect x="58" y="66" width="20" height="14" rx="2" fill="#3d1a1e"/><rect x="80" y="66" width="20" height="14" rx="2" fill="#1a1416" stroke="#3a2c2e"/>
    <rect x="102" y="66" width="20" height="14" rx="2" fill="#1a1416" stroke="#3a2c2e"/><rect x="124" y="66" width="20" height="14" rx="2" fill="#3d1a1e"/>
  </g>
  <path d="M150 73 H176" stroke="#66bb6a" stroke-width="2"/><polygon points="176,68 186,73 176,78" fill="#66bb6a"/>
  <text x="163" y="66" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">defrag</text>
  <g>
    <rect x="192" y="66" width="20" height="14" rx="2" fill="#12331c" stroke="#66bb6a"/>
    <rect x="214" y="66" width="20" height="14" rx="2" fill="#12331c" stroke="#66bb6a"/>
    <rect x="236" y="66" width="20" height="14" rx="2" fill="#12331c" stroke="#66bb6a"/>
  </g>
  <text x="224" y="92" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">페이지 반환</text>
</svg>`,

  rdbfmt: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="34" width="52" height="30" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="40" y="47" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">REDIS</text>
  <text x="40" y="58" text-anchor="middle" fill="#ff8a80" font-size="7" font-family="ui-monospace,monospace">0011</text>
  <rect x="70" y="34" width="46" height="30" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="93" y="52" text-anchor="middle" fill="#ffe082" font-size="7" font-family="ui-monospace,monospace">aux</text>
  <rect x="120" y="34" width="46" height="30" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="143" y="47" text-anchor="middle" fill="#90caf9" font-size="7" font-family="ui-monospace,monospace">SELECTDB</text>
  <text x="143" y="58" text-anchor="middle" fill="#42a5f5" font-size="7" font-family="ui-monospace,monospace">resize</text>
  <rect x="170" y="34" width="52" height="30" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="196" y="47" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">expiry</text>
  <text x="196" y="58" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">type k v</text>
  <rect x="226" y="34" width="40" height="30" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="246" y="47" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">EOF</text>
  <text x="246" y="58" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="ui-monospace,monospace">CRC64</text>
  <text x="140" y="22" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">DUMP/RESTORE 도 같은 포맷</text>
  <text x="140" y="82" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="sans-serif">상위 버전 RDB → 하위 버전 로드 불가할 수 있음</text>
</svg>`,

  aofmp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="20" width="252" height="66" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="24" y="36" fill="#7d8590" font-size="8" font-family="ui-monospace,monospace">appendonlydir/</text>
  <rect x="34" y="42" width="110" height="16" rx="3" fill="#12331c" stroke="#66bb6a"/>
  <text x="42" y="54" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">…1.base.rdb</text>
  <text x="152" y="54" fill="#6d5a5c" font-size="7" font-family="sans-serif">스냅샷</text>
  <rect x="34" y="62" width="110" height="16" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="42" y="74" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">…1.incr.aof</text>
  <text x="152" y="74" fill="#6d5a5c" font-size="7" font-family="sans-serif">이후 증분</text>
  <rect x="196" y="42" width="62" height="36" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="227" y="58" text-anchor="middle" fill="#ffe082" font-size="7.5" font-family="ui-monospace,monospace">manifest</text>
  <text x="227" y="70" text-anchor="middle" fill="#ffb300" font-size="6.5" font-family="sans-serif">원자 교체</text>
  <text x="140" y="96" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">rewrite 중에도 부모는 incr 에 계속 기록</text>
</svg>`,

  propagation: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="20" width="104" height="20" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="66" y="34" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">SPOP myset</text>
  <path d="M124 30 H150" stroke="#ffb300" stroke-width="2"/><polygon points="150,25 160,30 150,35" fill="#ffb300"/>
  <text x="138" y="22" text-anchor="middle" fill="#ffb300" font-size="6.5" font-family="sans-serif">변환</text>
  <rect x="164" y="20" width="102" height="20" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="215" y="34" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">SREM myset "x"</text>
  <rect x="14" y="46" width="104" height="20" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="66" y="60" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">EXPIRE k 100</text>
  <path d="M124 56 H150" stroke="#ffb300" stroke-width="2"/><polygon points="150,51 160,56 150,61" fill="#ffb300"/>
  <rect x="164" y="46" width="102" height="20" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="215" y="60" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">PEXPIREAT k …</text>
  <rect x="14" y="72" width="104" height="20" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="66" y="86" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">키 만료 / 축출</text>
  <path d="M124 82 H150" stroke="#ffb300" stroke-width="2"/><polygon points="150,77 160,82 150,87" fill="#ffb300"/>
  <rect x="164" y="72" width="102" height="20" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="215" y="86" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">DEL k (마스터가)</text>
  <text x="140" y="14" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="sans-serif">받은 명령 → 복제본/AOF 로 가는 것</text>
</svg>`,

  clusterbus: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="20" width="72" height="26" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="56" y="37" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">:6379 / :16379</text>
  <rect x="188" y="20" width="72" height="26" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="224" y="37" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">:6379 / :16379</text>
  <rect x="104" y="66" width="72" height="26" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="140" y="83" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">:6379 / :16379</text>
  <path d="M92 33 H188" stroke="#ffb300" stroke-width="1.5" stroke-dasharray="4 3"/>
  <path d="M62 48 L120 66" stroke="#ffb300" stroke-width="1.5" stroke-dasharray="4 3"/>
  <path d="M218 48 L160 66" stroke="#ffb300" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="140" y="29" text-anchor="middle" fill="#ffb300" font-size="7.5" font-weight="700" font-family="sans-serif">gossip (이진)</text>
  <text x="140" y="14" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="sans-serif">클라이언트 포트 + 10000</text>
  <text x="230" y="76" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">방화벽에서</text>
  <text x="230" y="88" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">자주 빠뜨림</text>
</svg>`,

  lrubits: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="140" y="18" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">robj 안 24비트가 전부</text>
  <text x="70" y="34" text-anchor="middle" fill="#42a5f5" font-size="7.5" font-weight="700" font-family="sans-serif">LRU 모드</text>
  <rect x="14" y="40" width="112" height="22" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="70" y="55" text-anchor="middle" fill="#90caf9" font-size="8" font-family="ui-monospace,monospace">마지막 접근 시각</text>
  <text x="210" y="34" text-anchor="middle" fill="#ff6b5e" font-size="7.5" font-weight="700" font-family="sans-serif">LFU 모드</text>
  <rect x="154" y="40" width="46" height="22" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="177" y="55" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">8bit cnt</text>
  <rect x="204" y="40" width="62" height="22" rx="4" fill="#3d1a1e" stroke="#ff8a80"/>
  <text x="235" y="55" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">16bit clock</text>
  <text x="210" y="76" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="sans-serif">Morris 확률 카운터 · 로그 스케일</text>
  <text x="70" y="76" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">표본에서 가장 오래된 것</text>
  <text x="140" y="92" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">lfu-decay-time 으로 과거 인기 감쇠</text>
</svg>`,

  migration: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="16" width="252" height="22" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="24" y="31" fill="#a5d6a7" font-size="8" font-family="sans-serif">① 복제본 → 승격      전체 이전 · 가장 안전</text>
  <rect x="14" y="42" width="252" height="22" rx="5" fill="#2e2410" stroke="#ffb300"/>
  <text x="24" y="57" fill="#ffe082" font-size="8" font-family="sans-serif">② DUMP / MIGRATE    키 단위 · 빅키 주의</text>
  <rect x="14" y="68" width="252" height="22" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="24" y="83" fill="#90caf9" font-size="8" font-family="sans-serif">③ redis-cli --pipe    대량 주입 · 수십 배 빠름</text>
</svg>`,

  sizing: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="24" width="104" height="60" rx="8" fill="#2e1416" stroke="#e05a4e"/>
  <text x="66" y="42" text-anchor="middle" fill="#ffcdd2" font-size="9" font-weight="700" font-family="sans-serif">64GB × 1</text>
  <text x="66" y="58" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">fork 느림</text>
  <text x="66" y="70" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">장애 반경 큼</text>
  <text x="132" y="58" fill="#6d5a5c" font-size="12" font-family="sans-serif">vs</text>
  <g>
    <rect x="152" y="24" width="52" height="26" rx="5" fill="#12331c" stroke="#66bb6a"/>
    <rect x="210" y="24" width="52" height="26" rx="5" fill="#12331c" stroke="#66bb6a"/>
    <rect x="152" y="56" width="52" height="26" rx="5" fill="#12331c" stroke="#66bb6a"/>
    <rect x="210" y="56" width="52" height="26" rx="5" fill="#12331c" stroke="#66bb6a"/>
  </g>
  <text x="178" y="41" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">8GB</text>
  <text x="236" y="41" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">8GB</text>
  <text x="178" y="73" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">8GB</text>
  <text x="236" y="73" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">8GB</text>
  <text x="207" y="94" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">코어를 실제로 쓴다 · 장애 반경 ↓</text>
</svg>`,

  k8sredis: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="18" width="140" height="70" rx="8" fill="#12233a" stroke="#42a5f5"/>
  <text x="84" y="32" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">container limit 6Gi</text>
  <rect x="26" y="38" width="116" height="18" rx="3" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="84" y="51" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">maxmemory 4gb</text>
  <rect x="26" y="58" width="60" height="14" rx="3" fill="#2e2410" stroke="#ffb300"/>
  <text x="56" y="69" text-anchor="middle" fill="#ffe082" font-size="6.5" font-family="sans-serif">버퍼·단편화</text>
  <rect x="88" y="58" width="54" height="14" rx="3" fill="#2e2410" stroke="#ffb300"/>
  <text x="115" y="69" text-anchor="middle" fill="#ffe082" font-size="6.5" font-family="sans-serif">COW 여유</text>
  <text x="84" y="84" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">limit ≈ maxmemory × 1.5</text>
  <rect x="168" y="26" width="98" height="24" rx="5" fill="#2e1416" stroke="#e05a4e"/>
  <text x="217" y="41" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="sans-serif">limit = maxmemory</text>
  <text x="217" y="60" text-anchor="middle" fill="#e05a4e" font-size="9" font-weight="700" font-family="sans-serif">OOMKilled</text>
  <text x="217" y="78" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">startupProbe 넉넉히</text>
</svg>`,

  alerting: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="252" height="18" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="22" y="27" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">used/maxmemory &gt; 0.85</text>
  <text x="200" y="27" fill="#e05a4e" font-size="7" font-family="sans-serif">즉시 대응</text>
  <rect x="14" y="35" width="252" height="18" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="22" y="48" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">evicted_keys &gt; 0 / rejected_conn</text>
  <rect x="14" y="56" width="252" height="18" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="22" y="69" fill="#ffe082" font-size="7.5" font-family="ui-monospace,monospace">master_link != up · repl lag</text>
  <rect x="14" y="77" width="252" height="18" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="22" y="90" fill="#90caf9" font-size="7.5" font-family="ui-monospace,monospace">latest_fork_usec · sync_full</text>
</svg>`,

  logs: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="252" height="72" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="22" y="30" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace"># WARNING overcommit_memory is 0</text>
  <text x="22" y="44" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace"># WARNING Transparent Huge Pages</text>
  <text x="22" y="58" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">* Background saving started by pid</text>
  <text x="22" y="72" fill="#ff8a80" font-size="7.5" font-family="ui-monospace,monospace">* Full resync from master …</text>
  <text x="248" y="72" fill="#e05a4e" font-size="7" font-family="sans-serif">잦으면</text>
  <text x="248" y="82" fill="#e05a4e" font-size="7" font-family="sans-serif">백로그↑</text>
</svg>`,

  integrity: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="30" width="76" height="34" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="52" y="45" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">원본</text>
  <text x="52" y="58" text-anchor="middle" fill="#ff8a80" font-size="7.5" font-family="ui-monospace,monospace">a3f9…c1</text>
  <text x="140" y="42" text-anchor="middle" fill="#66bb6a" font-size="12" font-weight="700" font-family="sans-serif">=</text>
  <text x="140" y="60" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">DEBUG DIGEST</text>
  <rect x="190" y="30" width="76" height="34" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="228" y="45" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">복원본</text>
  <text x="228" y="58" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="ui-monospace,monospace">a3f9…c1</text>
  <text x="140" y="20" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">옮겼다 ≠ 같다</text>
  <text x="140" y="84" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">redis-check-rdb / --check-aof</text>
</svg>`,

  cost: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="252" height="17" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="22" y="26" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">① TTL 없는 키 제거          효과 ★★★</text>
  <rect x="14" y="34" width="252" height="17" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="22" y="46" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">② listpack 임계 유지        효과 ★★★</text>
  <rect x="14" y="54" width="252" height="17" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="22" y="66" fill="#ffe082" font-size="7.5" font-family="sans-serif">③ 값 축소 · 직렬화 교체     효과 ★★</text>
  <rect x="14" y="74" width="252" height="17" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="22" y="86" fill="#90caf9" font-size="7.5" font-family="sans-serif">④ 키 이름 단축              효과 ★ (키 많을 때)</text>
</svg>`,

  tenancy: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="16" width="252" height="18" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="22" y="29" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">인스턴스 분리   CPU·메모리·장애까지 분리 ✓</text>
  <rect x="14" y="38" width="220" height="18" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="22" y="51" fill="#ffe082" font-size="7.5" font-family="sans-serif">ACL             권한만 (성능 공유)</text>
  <rect x="14" y="60" width="176" height="18" rx="4" fill="#2e1416" stroke="#e05a4e"/>
  <text x="22" y="73" fill="#ffcdd2" font-size="7.5" font-family="sans-serif">키 프리픽스     논리적 구분뿐</text>
  <rect x="14" y="82" width="120" height="16" rx="4" fill="#1a1416" stroke="#4a3a3c"/>
  <text x="22" y="94" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">DB 번호   격리 아님</text>
  <text x="252" y="73" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">약함</text>
</svg>`,

  drdrill: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="20" text-anchor="middle" fill="#ffb300" font-size="8" font-weight="700" font-family="sans-serif">RPO — 설정이 결정</text>
  <rect x="14" y="26" width="112" height="18" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="70" y="39" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">everysec → 1초</text>
  <rect x="14" y="48" width="112" height="18" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="70" y="61" text-anchor="middle" fill="#ffe082" font-size="7.5" font-family="ui-monospace,monospace">RDB 5분 → 5분</text>
  <line x1="140" y1="12" x2="140" y2="94" stroke="#3a2c2e"/>
  <text x="210" y="20" text-anchor="middle" fill="#ff6b5e" font-size="8" font-weight="700" font-family="sans-serif">RTO — 실측해야</text>
  <rect x="154" y="26" width="112" height="18" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="210" y="39" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="sans-serif">AOF 재생 ≫ RDB 로딩</text>
  <text x="210" y="60" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">실제 크기로 재시작 계측</text>
  <text x="140" y="84" text-anchor="middle" fill="#e05a4e" font-size="8" font-weight="700" font-family="sans-serif">복구해 본 적 없는 백업 = 백업 아님</text>
</svg>`,

  atomicpick: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="14" width="252" height="18" rx="4" fill="#12331c" stroke="#66bb6a"/>
  <text x="22" y="27" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">한 명령이면          GETDEL · SET GET</text>
  <rect x="14" y="36" width="252" height="18" rx="4" fill="#12233a" stroke="#42a5f5"/>
  <text x="22" y="49" fill="#90caf9" font-size="7.5" font-family="sans-serif">분기 없는 묶음       MULTI / EXEC</text>
  <rect x="14" y="58" width="252" height="18" rx="4" fill="#2e2410" stroke="#ffb300"/>
  <text x="22" y="71" fill="#ffe082" font-size="7.5" font-family="sans-serif">읽고 판단해 쓰기     Lua (EVAL)</text>
  <rect x="14" y="80" width="252" height="18" rx="4" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="22" y="93" fill="#ffcdd2" font-size="7.5" font-family="sans-serif">재사용 · 영속        FUNCTION / FCALL</text>
</svg>`,

  clustercode: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="18" width="120" height="24" rx="5" fill="#2e1416" stroke="#e05a4e"/>
  <text x="74" y="34" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">MGET u:1 u:2</text>
  <text x="74" y="54" text-anchor="middle" fill="#e05a4e" font-size="8" font-weight="700" font-family="ui-monospace,monospace">CROSSSLOT</text>
  <path d="M140 30 H162" stroke="#66bb6a" stroke-width="2"/><polygon points="162,25 172,30 162,35" fill="#66bb6a"/>
  <rect x="178" y="18" width="88" height="24" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="222" y="34" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">u:{1}:a u:{1}:b</text>
  <text x="222" y="54" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-family="sans-serif">해시 태그로 묶기</text>
  <rect x="14" y="64" width="252" height="30" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="24" y="77" fill="#90caf9" font-size="7.5" font-family="sans-serif">또는 앱에서 슬롯별 그룹핑 → 병렬 전송 → 병합</text>
  <text x="24" y="89" fill="#7d8590" font-size="7" font-family="sans-serif">노드 단위: SCAN · DBSIZE · FLUSHDB · INFO keyspace</text>
</svg>`,

  pool: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="22" width="96" height="56" rx="8" fill="#12233a" stroke="#42a5f5"/>
  <text x="62" y="36" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">앱 인스턴스</text>
  <g>
    <rect x="24" y="42" width="34" height="12" rx="2" fill="#0d1117" stroke="#30363d"/>
    <rect x="64" y="42" width="34" height="12" rx="2" fill="#0d1117" stroke="#30363d"/>
    <rect x="24" y="58" width="34" height="12" rx="2" fill="#0d1117" stroke="#30363d"/>
    <rect x="64" y="58" width="34" height="12" rx="2" fill="#2e2410" stroke="#ffb300"/>
  </g>
  <text x="81" y="67" text-anchor="middle" fill="#ffe082" font-size="6" font-family="sans-serif">blocking</text>
  <text x="62" y="90" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">블로킹 전용 분리</text>
  <path d="M116 50 H146" stroke="#7a4a48" stroke-width="1.5"/>
  <rect x="152" y="30" width="114" height="40" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="209" y="46" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">maxclients</text>
  <text x="209" y="60" text-anchor="middle" fill="#ff8a80" font-size="8" font-family="ui-monospace,monospace">10000</text>
  <text x="209" y="84" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">앱 수 × 풀 크기 &lt; maxclients</text>
</svg>`,

  serialize: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="14" y="20" fill="#8b7f80" font-size="8" font-family="sans-serif">같은 객체, 다른 크기</text>
  <text x="14" y="38" fill="#7d8590" font-size="7.5" font-family="ui-monospace,monospace">JSON</text>
  <rect x="70" y="28" width="150" height="12" rx="3" fill="#e05a4e"/>
  <text x="228" y="38" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">34B</text>
  <text x="14" y="56" fill="#7d8590" font-size="7.5" font-family="ui-monospace,monospace">짧은키</text>
  <rect x="70" y="46" width="84" height="12" rx="3" fill="#ffb300"/>
  <text x="228" y="56" fill="#ffe082" font-size="7.5" font-family="ui-monospace,monospace">19B</text>
  <text x="14" y="74" fill="#7d8590" font-size="7.5" font-family="ui-monospace,monospace">msgpack</text>
  <rect x="70" y="64" width="66" height="12" rx="3" fill="#66bb6a"/>
  <text x="228" y="74" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">15B</text>
  <text x="140" y="92" text-anchor="middle" fill="#ff6b5e" font-size="7.5" font-family="sans-serif">스키마 진화 대비: 값 앞 버전 바이트 또는 키 프리픽스</text>
</svg>`,

  testing: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="24" width="110" height="56" rx="8" fill="#2e1416" stroke="#e05a4e"/>
  <text x="69" y="42" text-anchor="middle" fill="#ffcdd2" font-size="8" font-weight="700" font-family="sans-serif">가짜 Redis</text>
  <text x="69" y="58" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">TTL·축출·Lua</text>
  <text x="69" y="70" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">동작이 다르다</text>
  <text x="140" y="56" text-anchor="middle" fill="#6d5a5c" font-size="11" font-family="sans-serif">vs</text>
  <rect x="156" y="24" width="110" height="56" rx="8" fill="#12331c" stroke="#66bb6a"/>
  <text x="211" y="42" text-anchor="middle" fill="#a5d6a7" font-size="8" font-weight="700" font-family="sans-serif">실제 컨테이너</text>
  <text x="211" y="58" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">suite 당 1개</text>
  <text x="211" y="70" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">test:uuid: 프리픽스</text>
  <text x="140" y="94" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">병렬 실행 시 FLUSHDB 대신 프리픽스 격리</text>
</svg>`,

  bulk: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="18" width="120" height="34" rx="6" fill="#2e1416" stroke="#e05a4e"/>
  <text x="74" y="33" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">KEYS * | DEL</text>
  <text x="74" y="46" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-weight="700" font-family="sans-serif">서버 정지</text>
  <rect x="14" y="58" width="120" height="34" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="74" y="73" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">SCAN → 배치 → UNLINK</text>
  <text x="74" y="86" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-weight="700" font-family="sans-serif">무중단</text>
  <text x="150" y="34" fill="#6d5a5c" font-size="11" font-family="sans-serif">→</text>
  <rect x="168" y="18" width="98" height="74" rx="6" fill="#0d1117" stroke="#30363d"/>
  <text x="176" y="34" fill="#a5d6ff" font-size="7" font-family="ui-monospace,monospace">cursor 순회</text>
  <text x="176" y="48" fill="#a5d6ff" font-size="7" font-family="ui-monospace,monospace">COUNT 500</text>
  <text x="176" y="62" fill="#a5d6ff" font-size="7" font-family="ui-monospace,monospace">pipeline UNLINK</text>
  <text x="176" y="76" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">sleep 10ms</text>
  <text x="217" y="88" text-anchor="middle" fill="#6d5a5c" font-size="6.5" font-family="sans-serif">다른 트래픽에 여지</text>
</svg>`,

  observable: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="18" width="252" height="30" rx="6" fill="#2e1416" stroke="#e05a4e"/>
  <text x="24" y="32" fill="#8b7f80" font-size="7" font-family="sans-serif">이름표 없음</text>
  <text x="24" y="44" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">id=8 addr=10.0.0.7:5123 cmd=hgetall</text>
  <text x="240" y="44" fill="#e05a4e" font-size="7.5" font-family="sans-serif">누구?</text>
  <rect x="14" y="54" width="252" height="34" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="24" y="68" fill="#66bb6a" font-size="7" font-family="ui-monospace,monospace">CLIENT SETNAME svc-order:pod-7</text>
  <text x="24" y="82" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">name=svc-order:pod-7 lib-name=redis-py</text>
</svg>`,

  semaphore: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="140" y="18" text-anchor="middle" fill="#8b7f80" font-size="8" font-family="sans-serif">동시 실행 한도 3</text>
  <g>
    <rect x="30" y="26" width="46" height="24" rx="5" fill="#12331c" stroke="#66bb6a"/>
    <rect x="82" y="26" width="46" height="24" rx="5" fill="#12331c" stroke="#66bb6a"/>
    <rect x="134" y="26" width="46" height="24" rx="5" fill="#12331c" stroke="#66bb6a"/>
    <rect x="186" y="26" width="46" height="24" rx="5" fill="#2e1416" stroke="#e05a4e"/>
  </g>
  <text x="53" y="42" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">w1 ✓</text>
  <text x="105" y="42" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">w2 ✓</text>
  <text x="157" y="42" text-anchor="middle" fill="#a5d6a7" font-size="7.5" font-family="sans-serif">w3 ✓</text>
  <text x="209" y="42" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="sans-serif">w4 ✕</text>
  <rect x="30" y="58" width="202" height="20" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="131" y="72" text-anchor="middle" fill="#a5d6ff" font-size="7.5" font-family="ui-monospace,monospace">ZSet — score = 획득 시각</text>
  <text x="140" y="92" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="sans-serif">오래된 점유는 ZREMRANGEBYSCORE 로 회수</text>
</svg>`,

  delayed: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <line x1="14" y1="54" x2="266" y2="54" stroke="#4a3a3c" stroke-width="1.5"/>
  <line x1="120" y1="34" x2="120" y2="74" stroke="#ffb300" stroke-width="2"/>
  <text x="120" y="30" text-anchor="middle" fill="#ffb300" font-size="7.5" font-weight="700" font-family="sans-serif">now</text>
  <g>
    <circle cx="40" cy="54" r="6" fill="#66bb6a"/><circle cx="70" cy="54" r="6" fill="#66bb6a"/><circle cx="100" cy="54" r="6" fill="#66bb6a"/>
    <circle cx="150" cy="54" r="6" fill="#7a4a48"/><circle cx="190" cy="54" r="6" fill="#7a4a48"/><circle cx="235" cy="54" r="6" fill="#7a4a48"/>
  </g>
  <text x="70" y="76" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-weight="700" font-family="sans-serif">실행 시각 도래</text>
  <text x="192" y="76" text-anchor="middle" fill="#6d5a5c" font-size="7.5" font-family="sans-serif">대기</text>
  <text x="140" y="16" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="ui-monospace,monospace">ZSet score = 실행 예정 시각</text>
  <text x="140" y="94" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-family="sans-serif">만료 이벤트로 스케줄링하지 말 것</text>
</svg>`,

  autocomplete: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="20" width="110" height="22" rx="5" fill="#0d1117" stroke="#ff6b5e"/>
  <text x="24" y="35" fill="#ffcdd2" font-size="9" font-family="ui-monospace,monospace">ho|</text>
  <path d="M130 31 H154" stroke="#ff6b5e" stroke-width="2"/><polygon points="154,26 164,31 154,36" fill="#ff6b5e"/>
  <text x="146" y="22" text-anchor="middle" fill="#ff6b5e" font-size="6.5" font-family="ui-monospace,monospace">BYLEX</text>
  <g>
    <rect x="170" y="16" width="96" height="14" rx="3" fill="#12331c" stroke="#66bb6a"/>
    <rect x="170" y="32" width="96" height="14" rx="3" fill="#12331c" stroke="#66bb6a"/>
    <rect x="170" y="48" width="96" height="14" rx="3" fill="#12331c" stroke="#66bb6a"/>
    <rect x="170" y="64" width="96" height="14" rx="3" fill="#12331c" stroke="#66bb6a"/>
  </g>
  <text x="178" y="27" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">home</text>
  <text x="178" y="43" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">hospital</text>
  <text x="178" y="59" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">hotel</text>
  <text x="178" y="75" fill="#a5d6a7" font-size="7.5" font-family="ui-monospace,monospace">house</text>
  <text x="70" y="62" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="sans-serif">score 전부 0</text>
  <text x="70" y="76" text-anchor="middle" fill="#ffb300" font-size="7.5" font-family="ui-monospace,monospace">[ho → [ho\\xff</text>
</svg>`,

  taginval: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="34" width="86" height="30" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="57" y="53" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">tag:product:42</text>
  <text x="57" y="24" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="sans-serif">태그 → 키 역인덱스</text>
  <path d="M104 42 L138 26 M104 49 L138 49 M104 56 L138 72" stroke="#ffb300" stroke-width="1.5"/>
  <g>
    <rect x="142" y="18" width="86" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
    <rect x="142" y="41" width="86" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
    <rect x="142" y="64" width="86" height="16" rx="3" fill="#0d1117" stroke="#30363d"/>
  </g>
  <text x="150" y="30" fill="#a5d6ff" font-size="7" font-family="ui-monospace,monospace">cache:page:home</text>
  <text x="150" y="53" fill="#a5d6ff" font-size="7" font-family="ui-monospace,monospace">cache:list:new</text>
  <text x="150" y="76" fill="#a5d6ff" font-size="7" font-family="ui-monospace,monospace">cache:api:v1:42</text>
  <text x="250" y="49" text-anchor="middle" fill="#e05a4e" font-size="8" font-weight="700" font-family="sans-serif">UNLINK</text>
  <text x="140" y="94" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">대안: 세대 번호(INCR gen) → 역인덱스 불필요</text>
</svg>`,

  inventory: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="18" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-weight="700" font-family="sans-serif">GET → 판단 → DECR</text>
  <path d="M20 28 H120" stroke="#e05a4e" stroke-width="1.5"/>
  <path d="M20 40 H120" stroke="#e05a4e" stroke-width="1.5"/>
  <path d="M20 52 H120" stroke="#e05a4e" stroke-width="1.5"/>
  <text x="70" y="70" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="sans-serif">셋 다 "재고 1" 을 읽음</text>
  <text x="70" y="86" text-anchor="middle" fill="#e05a4e" font-size="8" font-weight="700" font-family="sans-serif">초과 판매</text>
  <line x1="140" y1="12" x2="140" y2="94" stroke="#3a2c2e"/>
  <text x="210" y="18" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-weight="700" font-family="sans-serif">Lua 한 번에</text>
  <rect x="156" y="26" width="110" height="40" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="211" y="40" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">check + DECR</text>
  <text x="211" y="52" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">+ 예약 TTL</text>
  <text x="211" y="62" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="sans-serif">원자 실행</text>
  <text x="210" y="86" text-anchor="middle" fill="#66bb6a" font-size="8" font-weight="700" font-family="sans-serif">정확히 1개만</text>
</svg>`,

  recent: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="18" text-anchor="middle" fill="#e05a4e" font-size="7.5" font-weight="700" font-family="ui-monospace,monospace">List (중복 누적)</text>
  <g>
    <rect x="20" y="26" width="100" height="13" rx="3" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="20" y="42" width="100" height="13" rx="3" fill="#2e1416" stroke="#e05a4e"/>
    <rect x="20" y="58" width="100" height="13" rx="3" fill="#2e1416" stroke="#e05a4e"/>
  </g>
  <text x="70" y="36" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">product:42</text>
  <text x="70" y="52" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">product:42</text>
  <text x="70" y="68" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">product:42</text>
  <text x="70" y="86" text-anchor="middle" fill="#e05a4e" font-size="7" font-family="sans-serif">같은 항목이 쌓임</text>
  <line x1="140" y1="12" x2="140" y2="94" stroke="#3a2c2e"/>
  <text x="210" y="18" text-anchor="middle" fill="#66bb6a" font-size="7.5" font-weight="700" font-family="ui-monospace,monospace">ZSet (score=시각)</text>
  <g>
    <rect x="160" y="26" width="100" height="13" rx="3" fill="#12331c" stroke="#66bb6a"/>
    <rect x="160" y="42" width="100" height="13" rx="3" fill="#12331c" stroke="#66bb6a"/>
    <rect x="160" y="58" width="100" height="13" rx="3" fill="#12331c" stroke="#66bb6a"/>
  </g>
  <text x="210" y="36" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">product:42 ↑</text>
  <text x="210" y="52" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">product:17</text>
  <text x="210" y="68" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">product:03</text>
  <text x="210" y="86" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">score 갱신 = 위로</text>
</svg>`,

  flags: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="26" width="90" height="48" rx="8" fill="#12233a" stroke="#42a5f5"/>
  <text x="59" y="42" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">앱 인스턴스</text>
  <rect x="24" y="48" width="70" height="18" rx="4" fill="#0d1117" stroke="#30363d"/>
  <text x="59" y="61" text-anchor="middle" fill="#a5d6ff" font-size="7" font-family="ui-monospace,monospace">로컬 캐시</text>
  <path d="M108 40 H150" stroke="#66bb6a" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="150,36 158,40 150,44" fill="#66bb6a"/>
  <text x="130" y="34" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="ui-monospace,monospace">HGETALL</text>
  <path d="M158 62 H116" stroke="#ff6b5e" stroke-width="2"/>
  <polygon points="116,58 108,62 116,66" fill="#ff6b5e"/>
  <text x="138" y="76" text-anchor="middle" fill="#ff6b5e" font-size="6.5" font-family="sans-serif">invalidate / publish</text>
  <rect x="162" y="26" width="104" height="48" rx="8" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="214" y="42" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="ui-monospace,monospace">Hash flags</text>
  <text x="214" y="58" text-anchor="middle" fill="#ff8a80" font-size="7" font-family="ui-monospace,monospace">new-checkout: on</text>
  <text x="140" y="92" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">알림 유실 대비 짧은 폴링을 백업으로</text>
</svg>`,

  metering: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="24" width="76" height="26" rx="5" fill="#2e2410" stroke="#ffb300"/>
  <text x="52" y="41" text-anchor="middle" fill="#ffe082" font-size="7.5" font-family="ui-monospace,monospace">SET NX evt:id</text>
  <path d="M94 37 H116" stroke="#66bb6a" stroke-width="1.5"/><polygon points="116,33 124,37 116,41" fill="#66bb6a"/>
  <text x="105" y="30" text-anchor="middle" fill="#66bb6a" font-size="6" font-family="sans-serif">처음</text>
  <rect x="128" y="24" width="76" height="26" rx="5" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="166" y="41" text-anchor="middle" fill="#ffcdd2" font-size="7.5" font-family="ui-monospace,monospace">HINCRBY</text>
  <text x="52" y="62" text-anchor="middle" fill="#e05a4e" font-size="6.5" font-family="sans-serif">중복이면 무시</text>
  <text x="140" y="16" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="sans-serif">멱등 + 무손실 플러시</text>
  <rect x="14" y="66" width="118" height="24" rx="5" fill="#12331c" stroke="#66bb6a"/>
  <text x="73" y="81" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">…:14 (현재·계속 쌓임)</text>
  <rect x="140" y="66" width="126" height="24" rx="5" fill="#12233a" stroke="#42a5f5"/>
  <text x="203" y="81" text-anchor="middle" fill="#90caf9" font-size="7" font-family="ui-monospace,monospace">…:13 (지난 것만 확정)</text>
  <text x="230" y="41" text-anchor="middle" fill="#66bb6a" font-size="7" font-family="sans-serif">경합 없음</text>
</svg>`,

  breaker: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="14" y="32" width="66" height="30" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="47" y="46" text-anchor="middle" fill="#a5d6a7" font-size="8" font-weight="700" font-family="sans-serif">CLOSED</text>
  <text x="47" y="57" text-anchor="middle" fill="#66bb6a" font-size="6.5" font-family="sans-serif">통과</text>
  <path d="M84 40 H108" stroke="#e05a4e" stroke-width="1.5"/><polygon points="108,36 116,40 108,44" fill="#e05a4e"/>
  <text x="100" y="32" text-anchor="middle" fill="#e05a4e" font-size="6" font-family="ui-monospace,monospace">INCR &gt; N</text>
  <rect x="120" y="32" width="66" height="30" rx="6" fill="#2e1416" stroke="#e05a4e"/>
  <text x="153" y="46" text-anchor="middle" fill="#ffcdd2" font-size="8" font-weight="700" font-family="sans-serif">OPEN</text>
  <text x="153" y="57" text-anchor="middle" fill="#e05a4e" font-size="6.5" font-family="ui-monospace,monospace">EX 30</text>
  <path d="M190 40 H214" stroke="#ffb300" stroke-width="1.5"/><polygon points="214,36 222,40 214,44" fill="#ffb300"/>
  <text x="206" y="32" text-anchor="middle" fill="#ffb300" font-size="6" font-family="sans-serif">TTL 만료</text>
  <rect x="200" y="62" width="66" height="28" rx="6" fill="#2e2410" stroke="#ffb300"/>
  <text x="233" y="76" text-anchor="middle" fill="#ffe082" font-size="8" font-weight="700" font-family="sans-serif">HALF-OPEN</text>
  <text x="233" y="86" text-anchor="middle" fill="#ffb300" font-size="6.5" font-family="ui-monospace,monospace">probe NX</text>
  <path d="M200 76 H84 V62" stroke="#66bb6a" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="80,62 84,54 88,62" fill="#66bb6a"/>
  <text x="140" y="16" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="sans-serif">TTL 이 상태 전이를 대신한다</text>
  <text x="120" y="94" text-anchor="middle" fill="#6d5a5c" font-size="7" font-family="sans-serif">Redis 장애 시 기본값은 통과(fail-open)</text>
</svg>`,

  jobsystem: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="10" y="34" width="56" height="28" rx="6" fill="#2e2410" stroke="#ffb300"/>
  <text x="38" y="49" text-anchor="middle" fill="#ffe082" font-size="7" font-family="ui-monospace,monospace">ZSet</text>
  <text x="38" y="59" text-anchor="middle" fill="#ffb300" font-size="6" font-family="sans-serif">예약</text>
  <path d="M70 48 H88" stroke="#ff6b5e" stroke-width="1.5"/><polygon points="88,44 96,48 88,52" fill="#ff6b5e"/>
  <rect x="100" y="34" width="56" height="28" rx="6" fill="#2a1114" stroke="#ff6b5e"/>
  <text x="128" y="49" text-anchor="middle" fill="#ffcdd2" font-size="7" font-family="ui-monospace,monospace">Stream</text>
  <text x="128" y="59" text-anchor="middle" fill="#ff8a80" font-size="6" font-family="sans-serif">실행 큐</text>
  <path d="M160 48 H178" stroke="#66bb6a" stroke-width="1.5"/><polygon points="178,44 186,48 178,52" fill="#66bb6a"/>
  <rect x="190" y="34" width="52" height="28" rx="6" fill="#12331c" stroke="#66bb6a"/>
  <text x="216" y="49" text-anchor="middle" fill="#a5d6a7" font-size="7" font-family="ui-monospace,monospace">worker</text>
  <text x="216" y="59" text-anchor="middle" fill="#66bb6a" font-size="6" font-family="ui-monospace,monospace">XACK</text>
  <path d="M128 66 V78" stroke="#e05a4e" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="124,78 128,86 132,78" fill="#e05a4e"/>
  <rect x="90" y="86" width="76" height="12" rx="3" fill="#2e1416" stroke="#e05a4e"/>
  <text x="128" y="96" text-anchor="middle" fill="#ffcdd2" font-size="6.5" font-family="ui-monospace,monospace">PEL → DLQ</text>
  <text x="140" y="18" text-anchor="middle" fill="#8b7f80" font-size="7.5" font-family="sans-serif">배운 조각들의 조합</text>
  <text x="252" y="80" text-anchor="middle" fill="#6d5a5c" font-size="6.5" font-family="sans-serif">+ 락</text>
  <text x="252" y="90" text-anchor="middle" fill="#6d5a5c" font-size="6.5" font-family="sans-serif">+ 멱등</text>
</svg>`,
};
