/** Mini SVG diagrams for card fronts */
window.FLINK_VISUALS = {
  flow: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#ff8a50"/></marker></defs>
  <rect x="8" y="32" width="70" height="36" rx="8" fill="#1e3a5f" stroke="#42a5f5"/>
  <text x="43" y="55" text-anchor="middle" fill="#90caf9" font-size="11" font-family="sans-serif">Source</text>
  <line x1="82" y1="50" x2="105" y2="50" stroke="#ff8a50" stroke-width="2" marker-end="url(#a)"/>
  <rect x="110" y="28" width="70" height="44" rx="8" fill="#3e2723" stroke="#ff8a50"/>
  <text x="145" y="48" text-anchor="middle" fill="#ffcc80" font-size="10" font-family="sans-serif">Operators</text>
  <text x="145" y="62" text-anchor="middle" fill="#ffab40" font-size="9" font-family="sans-serif">+ State</text>
  <line x1="184" y1="50" x2="207" y2="50" stroke="#ff8a50" stroke-width="2" marker-end="url(#a)"/>
  <rect x="212" y="32" width="58" height="36" rx="8" fill="#1b5e20" stroke="#66bb6a"/>
  <text x="241" y="55" text-anchor="middle" fill="#a5d6a7" font-size="11" font-family="sans-serif">Sink</text>
</svg>`,

  bounded: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="18" text-anchor="middle" fill="#90caf9" font-size="10" font-family="sans-serif">Bounded</text>
  <rect x="20" y="28" width="100" height="50" rx="6" fill="#1a237e" stroke="#7986cb"/>
  <line x1="30" y1="45" x2="110" y2="45" stroke="#9fa8da" stroke-width="2"/>
  <circle cx="40" cy="45" r="3" fill="#c5cae9"/><circle cx="60" cy="45" r="3" fill="#c5cae9"/>
  <circle cx="80" cy="45" r="3" fill="#c5cae9"/><circle cx="100" cy="45" r="3" fill="#c5cae9"/>
  <text x="70" y="92" text-anchor="middle" fill="#7986cb" font-size="9" font-family="sans-serif">END</text>
  <text x="210" y="18" text-anchor="middle" fill="#ff8a50" font-size="10" font-family="sans-serif">Unbounded</text>
  <rect x="160" y="28" width="100" height="50" rx="6" fill="#3e2723" stroke="#ff8a50"/>
  <line x1="170" y1="45" x2="250" y2="45" stroke="#ffab40" stroke-width="2"/>
  <circle cx="180" cy="45" r="3" fill="#ffcc80"/><circle cx="200" cy="45" r="3" fill="#ffcc80"/>
  <circle cx="220" cy="45" r="3" fill="#ffcc80"/><circle cx="240" cy="45" r="3" fill="#ffcc80"/>
  <text x="250" y="70" fill="#ff8a50" font-size="14" font-family="sans-serif">→</text>
  <text x="210" y="92" text-anchor="middle" fill="#ff8a50" font-size="9" font-family="sans-serif">∞ continues</text>
</svg>`,

  pipeline: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="10" y="35" width="55" height="30" rx="6" fill="#4a148c" stroke="#ce93d8"/>
  <text x="37" y="54" text-anchor="middle" fill="#e1bee7" font-size="10" font-family="sans-serif">Kafka</text>
  <path d="M70 50 H95" stroke="#ff8a50" stroke-width="2"/>
  <polygon points="95,45 105,50 95,55" fill="#ff8a50"/>
  <rect x="110" y="30" width="60" height="40" rx="6" fill="#e65100" stroke="#ffab40"/>
  <text x="140" y="54" text-anchor="middle" fill="#fff" font-size="11" font-weight="700" font-family="sans-serif">Flink</text>
  <path d="M175 50 H200" stroke="#ff8a50" stroke-width="2"/>
  <polygon points="200,45 210,50 200,55" fill="#ff8a50"/>
  <rect x="215" y="28" width="50" height="22" rx="4" fill="#1b5e20" stroke="#66bb6a"/>
  <text x="240" y="43" text-anchor="middle" fill="#a5d6a7" font-size="9" font-family="sans-serif">DB</text>
  <rect x="215" y="54" width="50" height="22" rx="4" fill="#0d47a1" stroke="#64b5f6"/>
  <text x="240" y="69" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">Kafka</text>
</svg>`,

  sql: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="18" width="240" height="64" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="36" y="42" fill="#ff7b72" font-size="12" font-family="ui-monospace,monospace">INSERT INTO</text>
  <text x="130" y="42" fill="#79c0ff" font-size="12" font-family="ui-monospace,monospace">agg</text>
  <text x="36" y="62" fill="#ff7b72" font-size="12" font-family="ui-monospace,monospace">SELECT</text>
  <text x="90" y="62" fill="#a5d6ff" font-size="12" font-family="ui-monospace,monospace">user, SUM(amt)...</text>
</svg>`,

  table: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="15" width="200" height="70" rx="6" fill="#1a237e" stroke="#5c6bc0"/>
  <line x1="40" y1="35" x2="240" y2="35" stroke="#5c6bc0"/>
  <line x1="40" y1="55" x2="240" y2="55" stroke="#3949ab" stroke-dasharray="2 2"/>
  <line x1="40" y1="70" x2="240" y2="70" stroke="#3949ab" stroke-dasharray="2 2"/>
  <line x1="110" y1="15" x2="110" y2="85" stroke="#5c6bc0"/>
  <line x1="180" y1="15" x2="180" y2="85" stroke="#5c6bc0"/>
  <text x="75" y="29" text-anchor="middle" fill="#9fa8da" font-size="10" font-family="sans-serif">user</text>
  <text x="145" y="29" text-anchor="middle" fill="#9fa8da" font-size="10" font-family="sans-serif">amt</text>
  <text x="210" y="29" text-anchor="middle" fill="#9fa8da" font-size="10" font-family="sans-serif">ts</text>
  <text x="75" y="50" text-anchor="middle" fill="#c5cae9" font-size="10" font-family="sans-serif">u1</text>
  <text x="145" y="50" text-anchor="middle" fill="#c5cae9" font-size="10" font-family="sans-serif">12</text>
  <text x="210" y="50" text-anchor="middle" fill="#ff8a50" font-size="9" font-family="sans-serif">↻</text>
</svg>`,

  stream: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="30" cy="50" r="8" fill="#42a5f5"/>
  <circle cx="60" cy="50" r="8" fill="#42a5f5" opacity=".85"/>
  <circle cx="90" cy="50" r="8" fill="#42a5f5" opacity=".7"/>
  <text x="120" y="54" fill="#ff8a50" font-size="14" font-family="sans-serif">→</text>
  <rect x="140" y="30" width="50" height="40" rx="6" fill="#e65100"/>
  <text x="165" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">map</text>
  <text x="200" y="54" fill="#ff8a50" font-size="14" font-family="sans-serif">→</text>
  <rect x="220" y="30" width="50" height="40" rx="6" fill="#6a1b9a"/>
  <text x="245" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">keyBy</text>
</svg>`,

  parallel: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="20" width="50" height="20" rx="4" fill="#1565c0"/><text x="45" y="34" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">sub 0</text>
  <rect x="20" y="48" width="50" height="20" rx="4" fill="#1565c0"/><text x="45" y="62" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">sub 1</text>
  <rect x="20" y="76" width="50" height="12" rx="3" fill="#0d47a1" opacity=".5"/>
  <path d="M75 30 H110 L150 30" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
  <path d="M75 58 H110 L150 58" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
  <rect x="155" y="20" width="50" height="20" rx="4" fill="#e65100"/><text x="180" y="34" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">op 0</text>
  <rect x="155" y="48" width="50" height="20" rx="4" fill="#e65100"/><text x="180" y="62" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">op 1</text>
  <text x="240" y="50" fill="#8b9bb8" font-size="10" font-family="sans-serif">p=2</text>
</svg>`,

  exchange: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="16" text-anchor="middle" fill="#66bb6a" font-size="9" font-family="sans-serif">forward</text>
  <path d="M30 40 H110" stroke="#66bb6a" stroke-width="2"/>
  <path d="M30 55 H110" stroke="#66bb6a" stroke-width="2"/>
  <text x="210" y="16" text-anchor="middle" fill="#ff8a50" font-size="9" font-family="sans-serif">keyBy shuffle</text>
  <path d="M160 35 L250 50" stroke="#ff8a50" stroke-width="1.5"/>
  <path d="M160 50 L250 35" stroke="#ff8a50" stroke-width="1.5"/>
  <path d="M160 50 L250 65" stroke="#ff8a50" stroke-width="1.5"/>
  <path d="M160 65 L250 50" stroke="#ff8a50" stroke-width="1.5"/>
  <circle cx="30" cy="40" r="5" fill="#43a047"/><circle cx="30" cy="55" r="5" fill="#43a047"/>
  <circle cx="160" cy="35" r="5" fill="#e65100"/><circle cx="160" cy="50" r="5" fill="#e65100"/><circle cx="160" cy="65" r="5" fill="#e65100"/>
</svg>`,

  keyby: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="40" y="22" fill="#90caf9" font-size="9" font-family="sans-serif">events</text>
  <rect x="15" y="30" width="36" height="16" rx="3" fill="#37474f"/><text x="33" y="41" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">u1</text>
  <rect x="15" y="50" width="36" height="16" rx="3" fill="#37474f"/><text x="33" y="61" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">u2</text>
  <rect x="15" y="70" width="36" height="16" rx="3" fill="#37474f"/><text x="33" y="81" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">u1</text>
  <text x="90" y="58" fill="#ff8a50" font-size="12" font-family="sans-serif">keyBy →</text>
  <rect x="150" y="28" width="100" height="28" rx="6" fill="#1a237e" stroke="#7986cb"/>
  <text x="200" y="46" text-anchor="middle" fill="#c5cae9" font-size="10" font-family="sans-serif">task[u1]</text>
  <rect x="150" y="62" width="100" height="28" rx="6" fill="#4a148c" stroke="#ce93d8"/>
  <text x="200" y="80" text-anchor="middle" fill="#e1bee7" font-size="10" font-family="sans-serif">task[u2]</text>
</svg>`,

  eventtime: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <line x1="30" y1="70" x2="250" y2="70" stroke="#546e7a" stroke-width="2"/>
  <text x="30" y="88" fill="#8b9bb8" font-size="8" font-family="sans-serif">event time</text>
  <circle cx="70" cy="50" r="10" fill="#42a5f5"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">t1</text>
  <circle cx="140" cy="40" r="10" fill="#42a5f5"/><text x="140" y="44" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">t2</text>
  <circle cx="110" cy="55" r="8" fill="#ef5350" opacity=".9"/><text x="110" y="58" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">late</text>
  <circle cx="200" cy="45" r="10" fill="#42a5f5"/><text x="200" y="49" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">t3</text>
  <text x="140" y="20" text-anchor="middle" fill="#ff8a50" font-size="9" font-family="sans-serif">order by event ts, not arrival</text>
</svg>`,

  proctime: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="140" cy="50" r="36" fill="none" stroke="#ff8a50" stroke-width="3"/>
  <line x1="140" y1="50" x2="140" y2="28" stroke="#fff" stroke-width="2"/>
  <line x1="140" y1="50" x2="162" y2="50" stroke="#ffcc80" stroke-width="2"/>
  <circle cx="140" cy="50" r="3" fill="#ff8a50"/>
  <text x="140" y="96" text-anchor="middle" fill="#8b9bb8" font-size="9" font-family="sans-serif">machine wall clock</text>
</svg>`,

  watermark: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <line x1="20" y1="60" x2="260" y2="60" stroke="#455a64" stroke-width="2"/>
  <path d="M20 50 Q50 30 80 50 T140 50 T200 50 T260 50" fill="none" stroke="#42a5f5" stroke-width="2"/>
  <line x1="180" y1="20" x2="180" y2="80" stroke="#ff8a50" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="180" y="16" text-anchor="middle" fill="#ff8a50" font-size="9" font-family="sans-serif">W(t)</text>
  <text x="100" y="90" text-anchor="middle" fill="#8b9bb8" font-size="8" font-family="sans-serif">events before W ≈ complete</text>
  <rect x="40" y="48" width="10" height="12" fill="#66bb6a"/><rect x="70" y="44" width="10" height="16" fill="#66bb6a"/>
  <rect x="120" y="46" width="10" height="14" fill="#66bb6a"/>
  <rect x="210" y="42" width="10" height="18" fill="#ef5350" opacity=".7"/>
</svg>`,

  state: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="90" height="55" rx="8" fill="#1a237e" stroke="#7986cb"/>
  <text x="75" y="48" text-anchor="middle" fill="#c5cae9" font-size="10" font-family="sans-serif">subtask</text>
  <text x="75" y="64" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">keys A,C</text>
  <rect x="140" y="30" width="110" height="45" rx="6" fill="#263238" stroke="#ff8a50"/>
  <text x="195" y="48" text-anchor="middle" fill="#ffcc80" font-size="10" font-family="sans-serif">local State</text>
  <text x="195" y="64" text-anchor="middle" fill="#8b9bb8" font-size="8" font-family="sans-serif">A→3  C→7</text>
  <path d="M120 52 H138" stroke="#ff8a50" stroke-width="2"/>
</svg>`,

  checkpoint: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="35" width="40" height="30" rx="4" fill="#1565c0"/><text x="35" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">src</text>
  <rect x="75" y="35" width="40" height="30" rx="4" fill="#e65100"/><text x="95" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">op</text>
  <rect x="135" y="35" width="40" height="30" rx="4" fill="#e65100"/><text x="155" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">op</text>
  <rect x="195" y="35" width="40" height="30" rx="4" fill="#2e7d32"/><text x="215" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">sink</text>
  <path d="M55 50 H75 M115 50 H135 M175 50 H195" stroke="#ffcc80" stroke-width="2"/>
  <circle cx="55" cy="50" r="5" fill="#ffeb3b"/><circle cx="115" cy="50" r="5" fill="#ffeb3b"/>
  <circle cx="175" cy="50" r="5" fill="#ffeb3b"/>
  <text x="140" y="88" text-anchor="middle" fill="#ffeb3b" font-size="9" font-family="sans-serif">barrier → aligned snapshot</text>
</svg>`,

  savepoint: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="80" height="55" rx="8" fill="#37474f" stroke="#90a4ae"/>
  <text x="80" y="55" text-anchor="middle" fill="#cfd8dc" font-size="11" font-family="sans-serif">Job v1</text>
  <text x="140" y="52" fill="#ff8a50" font-size="18" font-family="sans-serif">⇒</text>
  <rect x="170" y="20" width="70" height="30" rx="4" fill="#4e342e" stroke="#ff8a50"/>
  <text x="205" y="40" text-anchor="middle" fill="#ffcc80" font-size="9" font-family="sans-serif">Savepoint</text>
  <rect x="170" y="55" width="70" height="30" rx="4" fill="#1b5e20" stroke="#66bb6a"/>
  <text x="205" y="74" text-anchor="middle" fill="#a5d6a7" font-size="9" font-family="sans-serif">Job v2</text>
</svg>`,

  exactly: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <path d="M60 70 L120 30 L140 55 L200 20" fill="none" stroke="#546e7a" stroke-width="2"/>
  <path d="M60 70 L120 30 L140 55 L200 20" fill="none" stroke="#66bb6a" stroke-width="2" stroke-dasharray="4 4"/>
  <circle cx="200" cy="20" r="12" fill="#1b5e20" stroke="#66bb6a"/>
  <text x="200" y="24" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">1</text>
  <text x="140" y="90" text-anchor="middle" fill="#a5d6a7" font-size="9" font-family="sans-serif">effect applied once (state view)</text>
</svg>`,

  window: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <line x1="20" y1="70" x2="260" y2="70" stroke="#455a64"/>
  <rect x="30" y="35" width="50" height="35" rx="3" fill="#1565c0" opacity=".85"/>
  <rect x="85" y="35" width="50" height="35" rx="3" fill="#1565c0" opacity=".85"/>
  <rect x="140" y="35" width="50" height="35" rx="3" fill="#1565c0" opacity=".85"/>
  <text x="100" y="22" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">Tumbling windows</text>
  <rect x="200" y="40" width="55" height="30" rx="3" fill="#6a1b9a" opacity=".7"/>
  <text x="227" y="58" text-anchor="middle" fill="#e1bee7" font-size="8" font-family="sans-serif">slide</text>
</svg>`,

  process: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="70" y="15" width="140" height="70" rx="10" fill="#212121" stroke="#ff8a50"/>
  <text x="140" y="40" text-anchor="middle" fill="#ffcc80" font-size="11" font-family="sans-serif">ProcessFunction</text>
  <text x="140" y="58" text-anchor="middle" fill="#8b9bb8" font-size="9" font-family="sans-serif">element · state · timer</text>
  <text x="140" y="74" text-anchor="middle" fill="#8b9bb8" font-size="9" font-family="sans-serif">side-output</text>
</svg>`,

  jm: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="90" y="8" width="100" height="24" rx="4" fill="#e65100"/><text x="140" y="24" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">JobManager</text>
  <rect x="20" y="50" width="70" height="36" rx="4" fill="#37474f"/><text x="55" y="72" text-anchor="middle" fill="#cfd8dc" font-size="8" font-family="sans-serif">ResourceMgr</text>
  <rect x="105" y="50" width="70" height="36" rx="4" fill="#37474f"/><text x="140" y="72" text-anchor="middle" fill="#cfd8dc" font-size="8" font-family="sans-serif">Dispatcher</text>
  <rect x="190" y="50" width="70" height="36" rx="4" fill="#37474f"/><text x="225" y="72" text-anchor="middle" fill="#cfd8dc" font-size="8" font-family="sans-serif">JobMaster</text>
  <path d="M140 32 V48 M55 48 V50 M140 48 V50 M225 48 V50" stroke="#ff8a50" stroke-width="1.5"/>
</svg>`,

  tm: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="20" width="200" height="60" rx="8" fill="#1b5e20" stroke="#66bb6a"/>
  <text x="140" y="40" text-anchor="middle" fill="#c8e6c9" font-size="11" font-family="sans-serif">TaskManager (JVM)</text>
  <rect x="60" y="50" width="40" height="20" rx="3" fill="#33691e"/><text x="80" y="64" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">slot</text>
  <rect x="110" y="50" width="40" height="20" rx="3" fill="#33691e"/><text x="130" y="64" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">slot</text>
  <rect x="160" y="50" width="40" height="20" rx="3" fill="#33691e"/><text x="180" y="64" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">slot</text>
</svg>`,

  slot: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="220" height="55" rx="6" fill="#263238" stroke="#546e7a"/>
  <rect x="45" y="38" width="50" height="30" rx="4" fill="#e65100" opacity=".9"/><text x="70" y="57" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">slot0</text>
  <rect x="110" y="38" width="50" height="30" rx="4" fill="#ef6c00"/><text x="135" y="57" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">slot1</text>
  <rect x="175" y="38" width="50" height="30" rx="4" fill="#ff8f00"/><text x="200" y="57" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">slot2</text>
</svg>`,

  chain: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="200" height="45" rx="8" fill="#4a148c" stroke="#ce93d8"/>
  <text x="140" y="48" text-anchor="middle" fill="#f3e5f5" font-size="10" font-family="sans-serif">one Task / one Thread</text>
  <text x="140" y="64" text-anchor="middle" fill="#e1bee7" font-size="9" font-family="sans-serif">map → filter → map</text>
</svg>`,

  cluster: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="25" width="110" height="55" rx="6" fill="#0d47a1" stroke="#64b5f6"/>
  <text x="70" y="48" text-anchor="middle" fill="#bbdefb" font-size="10" font-family="sans-serif">Session</text>
  <text x="70" y="64" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">multi job · long-lived</text>
  <rect x="155" y="25" width="110" height="55" rx="6" fill="#bf360c" stroke="#ff8a50"/>
  <text x="210" y="48" text-anchor="middle" fill="#ffccbc" font-size="10" font-family="sans-serif">Application</text>
  <text x="210" y="64" text-anchor="middle" fill="#ffab91" font-size="8" font-family="sans-serif">1 app · tied lifetime</text>
</svg>`,

  layers: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="8" width="180" height="18" rx="3" fill="#f9a825"/><text x="140" y="21" text-anchor="middle" fill="#000" font-size="9" font-family="sans-serif">SQL</text>
  <rect x="60" y="30" width="160" height="18" rx="3" fill="#fb8c00"/><text x="140" y="43" text-anchor="middle" fill="#000" font-size="9" font-family="sans-serif">Table API</text>
  <rect x="70" y="52" width="140" height="18" rx="3" fill="#e65100"/><text x="140" y="65" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">DataStream</text>
  <rect x="85" y="74" width="110" height="18" rx="3" fill="#bf360c"/><text x="140" y="87" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">ProcessFunction</text>
</svg>`,

  side: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <path d="M30 50 H120" stroke="#42a5f5" stroke-width="3"/>
  <rect x="120" y="30" width="50" height="40" rx="6" fill="#e65100"/><text x="145" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">proc</text>
  <path d="M170 40 H240" stroke="#66bb6a" stroke-width="2"/>
  <text x="250" y="44" fill="#66bb6a" font-size="9" font-family="sans-serif">main</text>
  <path d="M170 60 H240" stroke="#ef5350" stroke-width="2" stroke-dasharray="4 2"/>
  <text x="250" y="64" fill="#ef5350" font-size="9" font-family="sans-serif">side</text>
</svg>`,

  backpressure: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="50" height="30" rx="4" fill="#43a047"/><text x="45" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">fast</text>
  <path d="M75 50 H105" stroke="#ffeb3b" stroke-width="3"/>
  <rect x="110" y="35" width="50" height="30" rx="4" fill="#f9a825"/><text x="135" y="54" text-anchor="middle" fill="#000" font-size="9" font-family="sans-serif">slow</text>
  <path d="M165 50 H195" stroke="#ef5350" stroke-width="3"/>
  <rect x="200" y="35" width="55" height="30" rx="4" fill="#c62828"/><text x="227" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">sink</text>
  <text x="140" y="85" text-anchor="middle" fill="#ef9a9a" font-size="9" font-family="sans-serif">pressure propagates upstream ←</text>
</svg>`,

  backend: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="25" width="100" height="55" rx="6" fill="#1565c0" stroke="#64b5f6"/>
  <text x="75" y="50" text-anchor="middle" fill="#e3f2fd" font-size="10" font-family="sans-serif">Heap</text>
  <text x="75" y="66" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">fast · small state</text>
  <rect x="155" y="25" width="100" height="55" rx="6" fill="#4e342e" stroke="#ff8a50"/>
  <text x="205" y="50" text-anchor="middle" fill="#ffecb3" font-size="10" font-family="sans-serif">RocksDB</text>
  <text x="205" y="66" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">large · durable</text>
</svg>`,

  late: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="80" height="40" rx="4" fill="#1565c0"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">window</text>
  <line x1="130" y1="50" x2="160" y2="50" stroke="#ff8a50" stroke-width="2"/>
  <text x="145" y="40" fill="#ff8a50" font-size="8" font-family="sans-serif">WM</text>
  <circle cx="200" cy="50" r="16" fill="#c62828"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">late</text>
  <text x="140" y="88" text-anchor="middle" fill="#8b9bb8" font-size="8" font-family="sans-serif">drop · sideOutput · allowedLateness</text>
</svg>`,

  uid: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="90" height="40" rx="6" fill="#37474f"/><text x="75" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">map</text>
  <text x="75" y="62" text-anchor="middle" fill="#ff8a50" font-size="8" font-family="monospace">uid=parse-v1</text>
  <rect x="160" y="30" width="90" height="40" rx="6" fill="#37474f"/><text x="205" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">process</text>
  <text x="205" y="62" text-anchor="middle" fill="#ff8a50" font-size="8" font-family="monospace">uid=count-v1</text>
</svg>`,

  ha: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="80" height="50" rx="6" fill="#e65100" stroke="#ffcc80"/>
  <text x="80" y="48" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">Leader JM</text>
  <text x="80" y="64" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">active</text>
  <rect x="160" y="25" width="80" height="50" rx="6" fill="#455a64" stroke="#90a4ae"/>
  <text x="200" y="48" text-anchor="middle" fill="#cfd8dc" font-size="10" font-family="sans-serif">Standby</text>
  <text x="200" y="64" text-anchor="middle" fill="#90a4ae" font-size="8" font-family="sans-serif">ready</text>
</svg>`,

  idle: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="30" width="60" height="40" rx="4" fill="#1565c0"/><text x="50" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">p0 busy</text>
  <rect x="100" y="30" width="60" height="40" rx="4" fill="#455a64"/><text x="130" y="54" text-anchor="middle" fill="#b0bec5" font-size="8" font-family="sans-serif">p1 idle</text>
  <rect x="180" y="30" width="70" height="40" rx="4" fill="#b71c1c"/><text x="215" y="48" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">WM stuck</text>
  <text x="215" y="62" text-anchor="middle" fill="#ef9a9a" font-size="7" font-family="sans-serif">min(W)</text>
</svg>`,

  agg: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="40" cy="50" r="8" fill="#42a5f5"/><circle cx="65" cy="50" r="8" fill="#42a5f5"/><circle cx="90" cy="50" r="8" fill="#42a5f5"/>
  <text x="120" y="54" fill="#ff8a50" font-size="14" font-family="sans-serif">⇒</text>
  <rect x="145" y="30" width="100" height="40" rx="8" fill="#1b5e20" stroke="#66bb6a"/>
  <text x="195" y="54" text-anchor="middle" fill="#c8e6c9" font-size="12" font-family="sans-serif">acc = 42</text>
</svg>`,

  job: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="20" width="55" height="24" rx="4" fill="#455a64"/><text x="47" y="36" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">1.env</text>
  <rect x="90" y="20" width="55" height="24" rx="4" fill="#1565c0"/><text x="117" y="36" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">2.source</text>
  <rect x="160" y="20" width="55" height="24" rx="4" fill="#e65100"/><text x="187" y="36" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">3.ops</text>
  <rect x="90" y="58" width="100" height="24" rx="4" fill="#2e7d32"/><text x="140" y="74" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">4.execute()</text>
  <path d="M75 32 H90 M145 32 H160 M187 44 V58" stroke="#ff8a50" stroke-width="1.5" fill="none"/>
</svg>`,

  kafka: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="30" width="70" height="45" rx="6" fill="#4a148c" stroke="#ce93d8"/>
  <text x="50" y="50" text-anchor="middle" fill="#f3e5f5" font-size="10" font-family="sans-serif">Kafka</text>
  <text x="50" y="64" text-anchor="middle" fill="#e1bee7" font-size="8" font-family="sans-serif">topic</text>
  <path d="M90 52 H120" stroke="#ff8a50" stroke-width="2"/>
  <rect x="125" y="25" width="70" height="55" rx="6" fill="#e65100"/>
  <text x="160" y="55" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">Flink</text>
  <path d="M200 52 H230" stroke="#ff8a50" stroke-width="2"/>
  <rect x="235" y="30" width="35" height="45" rx="6" fill="#4a148c" stroke="#ce93d8"/>
  <text x="252" y="56" text-anchor="middle" fill="#f3e5f5" font-size="9" font-family="sans-serif">out</text>
</svg>`,

  timer: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="80" cy="50" r="28" fill="none" stroke="#ff8a50" stroke-width="3"/>
  <line x1="80" y1="50" x2="80" y2="32" stroke="#fff" stroke-width="2"/>
  <line x1="80" y1="50" x2="98" y2="50" stroke="#ffcc80" stroke-width="2"/>
  <text x="160" y="40" fill="#cfd8dc" font-size="11" font-family="sans-serif">registerTimer(t)</text>
  <text x="160" y="60" fill="#ff8a50" font-size="11" font-family="sans-serif">→ onTimer(t)</text>
</svg>`,

  metrics: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="60" width="20" height="25" fill="#42a5f5"/>
  <rect x="60" y="45" width="20" height="40" fill="#66bb6a"/>
  <rect x="90" y="30" width="20" height="55" fill="#ff8a50"/>
  <rect x="120" y="50" width="20" height="35" fill="#42a5f5"/>
  <rect x="150" y="20" width="20" height="65" fill="#ef5350"/>
  <text x="200" y="50" fill="#8b9bb8" font-size="10" font-family="sans-serif">WebUI</text>
  <text x="200" y="66" fill="#8b9bb8" font-size="10" font-family="sans-serif">Prometheus</text>
</svg>`,

  join: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="90" cy="50" r="35" fill="#1565c0" opacity=".7"/>
  <circle cx="150" cy="50" r="35" fill="#e65100" opacity=".7"/>
  <text x="70" y="54" fill="#fff" font-size="9" font-family="sans-serif">orders</text>
  <text x="165" y="54" fill="#fff" font-size="9" font-family="sans-serif">pays</text>
  <text x="120" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif" font-weight="700">⋈</text>
</svg>`,

  check: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="15" width="180" height="70" rx="8" fill="#1b5e20" stroke="#66bb6a"/>
  <text x="140" y="40" text-anchor="middle" fill="#c8e6c9" font-size="12" font-family="sans-serif">✓ checkpoint</text>
  <text x="140" y="58" text-anchor="middle" fill="#c8e6c9" font-size="12" font-family="sans-serif">✓ uid · HA · metrics</text>
  <text x="140" y="74" text-anchor="middle" fill="#a5d6a7" font-size="10" font-family="sans-serif">go-live ready</text>
</svg>`,

  async: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="50" height="30" rx="4" fill="#1565c0"/><text x="45" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">events</text>
  <path d="M75 40 C100 20 120 20 145 40" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
  <path d="M75 50 C100 50 120 50 145 50" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
  <path d="M75 60 C100 80 120 80 145 60" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
  <rect x="150" y="30" width="50" height="40" rx="4" fill="#6a1b9a"/><text x="175" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">async</text>
  <rect x="220" y="35" width="45" height="30" rx="4" fill="#2e7d32"/><text x="242" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">out</text>
</svg>`,

  cep: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="50" cy="50" r="16" fill="#1565c0"/><text x="50" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">A</text>
  <path d="M70 50 H95" stroke="#ff8a50" stroke-width="2"/>
  <circle cx="115" cy="50" r="16" fill="#e65100"/><text x="115" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">B</text>
  <path d="M135 50 H160" stroke="#ff8a50" stroke-width="2"/>
  <circle cx="180" cy="50" r="16" fill="#c62828"/><text x="180" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">B</text>
  <text x="230" y="54" fill="#ffcc80" font-size="11" font-family="sans-serif">Alert!</text>
</svg>`,

  opstate: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="20" width="70" height="60" rx="6" fill="#37474f"/><text x="55" y="45" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">subtask0</text><text x="55" y="62" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">state A</text>
  <rect x="105" y="20" width="70" height="60" rx="6" fill="#37474f"/><text x="140" y="45" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">subtask1</text><text x="140" y="62" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">state B</text>
  <rect x="190" y="20" width="70" height="60" rx="6" fill="#37474f"/><text x="225" y="45" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">subtask2</text><text x="225" y="62" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">state C</text>
</svg>`,

  statetypes: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="10" y="30" width="48" height="40" rx="4" fill="#1565c0"/><text x="34" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Value</text>
  <rect x="66" y="30" width="48" height="40" rx="4" fill="#2e7d32"/><text x="90" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">List</text>
  <rect x="122" y="30" width="48" height="40" rx="4" fill="#6a1b9a"/><text x="146" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Map</text>
  <rect x="178" y="30" width="48" height="40" rx="4" fill="#e65100"/><text x="202" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Reduce</text>
  <rect x="234" y="30" width="38" height="40" rx="4" fill="#00838f"/><text x="253" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Agg</text>
</svg>`,

  ttl: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="80" height="40" rx="6" fill="#1565c0"/><text x="80" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">state</text>
  <path d="M130 50 H170" stroke="#ff8a50" stroke-width="2"/>
  <text x="150" y="40" text-anchor="middle" fill="#ff8a50" font-size="9" font-family="sans-serif">TTL</text>
  <rect x="180" y="30" width="80" height="40" rx="6" fill="#455a64" stroke-dasharray="4 2" stroke="#90a4ae"/><text x="220" y="54" text-anchor="middle" fill="#b0bec5" font-size="10" font-family="sans-serif">expired</text>
</svg>`,

  broadcast: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="50" height="30" rx="4" fill="#6a1b9a"/><text x="45" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">rules</text>
  <path d="M75 50 H100" stroke="#ff8a50" stroke-width="2"/>
  <path d="M110 50 L150 25 M110 50 L150 50 M110 50 L150 75" stroke="#ff8a50" stroke-width="1.5"/>
  <rect x="155" y="12" width="100" height="20" rx="3" fill="#37474f"/><text x="205" y="26" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">task0 + rules</text>
  <rect x="155" y="40" width="100" height="20" rx="3" fill="#37474f"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">task1 + rules</text>
  <rect x="155" y="68" width="100" height="20" rx="3" fill="#37474f"/><text x="205" y="82" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">task2 + rules</text>
</svg>`,

  connect: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="20" width="60" height="25" rx="4" fill="#1565c0"/><text x="50" y="37" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">stream A</text>
  <rect x="20" y="55" width="60" height="25" rx="4" fill="#2e7d32"/><text x="50" y="72" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">stream B</text>
  <path d="M80 32 H120 L150 50 M80 68 H120 L150 50" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
  <rect x="155" y="30" width="100" height="40" rx="6" fill="#e65100"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">CoProcess</text>
</svg>`,

  union: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="15" width="50" height="20" rx="3" fill="#1565c0"/>
  <rect x="20" y="40" width="50" height="20" rx="3" fill="#1565c0"/>
  <rect x="20" y="65" width="50" height="20" rx="3" fill="#1565c0"/>
  <path d="M70 25 H120 L150 50 M70 50 H120 L150 50 M70 75 H120 L150 50" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
  <rect x="155" y="30" width="100" height="40" rx="6" fill="#6a1b9a"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">union</text>
</svg>`,

  winassign: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="40" width="40" height="30" rx="3" fill="#1565c0"/><text x="35" y="58" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">tumble</text>
  <rect x="65" y="35" width="50" height="40" rx="3" fill="#2e7d32" opacity=".85"/><rect x="90" y="35" width="50" height="40" rx="3" fill="#66bb6a" opacity=".55"/><text x="100" y="58" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">slide</text>
  <path d="M160 55 Q180 25 200 55 Q220 85 240 55" fill="none" stroke="#ff8a50" stroke-width="2"/><text x="200" y="90" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">session</text>
</svg>`,

  procwin: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="20" width="200" height="60" rx="8" fill="#1a237e" stroke="#7986cb"/>
  <text x="140" y="45" text-anchor="middle" fill="#c5cae9" font-size="11" font-family="sans-serif">ProcessWindowFunction</text>
  <text x="140" y="62" text-anchor="middle" fill="#9fa8da" font-size="9" font-family="sans-serif">key + window meta + elements</text>
</svg>`,

  trigger: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="70" height="40" rx="6" fill="#455a64"/><text x="65" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">window</text>
  <path d="M100 50 H130" stroke="#ff8a50" stroke-width="2"/>
  <rect x="135" y="25" width="60" height="50" rx="6" fill="#e65100"/><text x="165" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Trigger</text><text x="165" y="62" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">fire?</text>
  <path d="M195 50 H220" stroke="#66bb6a" stroke-width="2"/>
  <rect x="220" y="30" width="45" height="40" rx="6" fill="#2e7d32"/><text x="242" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">out</text>
</svg>`,

  lateness: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="35" width="90" height="35" rx="4" fill="#1565c0"/><text x="75" y="56" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">window open</text>
  <rect x="120" y="35" width="70" height="35" rx="4" fill="#ef6c00"/><text x="155" y="56" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">lateness</text>
  <rect x="190" y="35" width="60" height="35" rx="4" fill="#455a64"/><text x="220" y="56" text-anchor="middle" fill="#b0bec5" font-size="8" font-family="sans-serif">drop</text>
</svg>`,

  rich: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="15" width="180" height="70" rx="8" fill="#263238" stroke="#ff8a50"/>
  <text x="140" y="40" text-anchor="middle" fill="#ffcc80" font-size="11" font-family="sans-serif">RichFunction</text>
  <text x="140" y="58" text-anchor="middle" fill="#90a4ae" font-size="9" font-family="sans-serif">open · map · close</text>
  <text x="140" y="74" text-anchor="middle" fill="#90a4ae" font-size="9" font-family="sans-serif">RuntimeContext</text>
</svg>`,

  basicops: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="55" height="30" rx="4" fill="#1565c0"/><text x="47" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">filter</text>
  <path d="M75 50 H95" stroke="#ff8a50" stroke-width="2"/>
  <rect x="100" y="35" width="55" height="30" rx="4" fill="#e65100"/><text x="127" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">map</text>
  <path d="M155 50 H175" stroke="#ff8a50" stroke-width="2"/>
  <rect x="180" y="35" width="75" height="30" rx="4" fill="#6a1b9a"/><text x="217" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">flatMap</text>
</svg>`,

  serde: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="30" width="70" height="40" rx="6" fill="#1565c0"/><text x="55" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">POJO</text>
  <path d="M95 50 H125" stroke="#ff8a50" stroke-width="2"/>
  <rect x="130" y="30" width="50" height="40" rx="6" fill="#e65100"/><text x="155" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">bytes</text>
  <path d="M185 50 H210" stroke="#ff8a50" stroke-width="2"/>
  <rect x="215" y="30" width="50" height="40" rx="6" fill="#2e7d32"/><text x="240" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">wire</text>
</svg>`,

  sqlwin: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="25" width="240" height="50" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="36" y="48" fill="#ff7b72" font-size="11" font-family="ui-monospace,monospace">TUMBLE</text>
  <text x="100" y="48" fill="#a5d6ff" font-size="11" font-family="ui-monospace,monospace">(ts, INTERVAL '5' MIN)</text>
  <text x="36" y="66" fill="#8b949e" font-size="10" font-family="ui-monospace,monospace">HOP · SESSION</text>
</svg>`,

  dynamic: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="20" width="90" height="60" rx="6" fill="#1a237e" stroke="#7986cb"/>
  <text x="75" y="45" text-anchor="middle" fill="#c5cae9" font-size="10" font-family="sans-serif">stream</text>
  <text x="75" y="62" text-anchor="middle" fill="#9fa8da" font-size="9" font-family="sans-serif">events</text>
  <path d="M125 50 H155" stroke="#ff8a50" stroke-width="2"/>
  <rect x="160" y="20" width="90" height="60" rx="6" fill="#3e2723" stroke="#ff8a50"/>
  <text x="205" y="45" text-anchor="middle" fill="#ffcc80" font-size="10" font-family="sans-serif">dynamic</text>
  <text x="205" y="62" text-anchor="middle" fill="#ffab40" font-size="9" font-family="sans-serif">table</text>
</svg>`,

  temporal: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="30" width="70" height="40" rx="4" fill="#1565c0"/><text x="60" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">order@t</text>
  <text x="115" y="54" fill="#ff8a50" font-size="14" font-family="sans-serif">as of</text>
  <rect x="160" y="15" width="90" height="70" rx="4" fill="#4a148c" stroke="#ce93d8"/>
  <text x="205" y="40" text-anchor="middle" fill="#e1bee7" font-size="9" font-family="sans-serif">rates v1</text>
  <text x="205" y="58" text-anchor="middle" fill="#e1bee7" font-size="9" font-family="sans-serif">rates v2</text>
  <text x="205" y="74" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">@t</text>
</svg>`,

  lookup: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="60" height="30" rx="4" fill="#1565c0"/><text x="50" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">event</text>
  <path d="M85 50 H120" stroke="#ff8a50" stroke-width="2"/>
  <rect x="125" y="25" width="60" height="50" rx="4" fill="#e65100"/><text x="155" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">lookup</text><text x="155" y="62" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">JDBC</text>
  <path d="M190 50 H220" stroke="#66bb6a" stroke-width="2"/>
  <rect x="225" y="35" width="40" height="30" rx="4" fill="#2e7d32"/><text x="245" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">row</text>
</svg>`,

  cdc: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="30" width="70" height="40" rx="6" fill="#0d47a1"/><text x="55" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">MySQL</text>
  <path d="M95 50 H125" stroke="#ff8a50" stroke-width="2"/>
  <text x="140" y="35" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">binlog</text>
  <rect x="130" y="40" width="50" height="25" rx="4" fill="#e65100"/><text x="155" y="57" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">CDC</text>
  <path d="M185 52 H215" stroke="#ff8a50" stroke-width="2"/>
  <rect x="220" y="30" width="45" height="40" rx="6" fill="#2e7d32"/><text x="242" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">+I-U</text>
</svg>`,

  restart: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="80" cy="50" r="28" fill="none" stroke="#ef5350" stroke-width="3"/>
  <path d="M80 30 A20 20 0 1 1 60 60" fill="none" stroke="#ff8a50" stroke-width="3"/>
  <polygon points="58,55 52,68 68,62" fill="#ff8a50"/>
  <text x="160" y="45" fill="#cfd8dc" font-size="11" font-family="sans-serif">fixed-delay</text>
  <text x="160" y="65" fill="#8b9bb8" font-size="10" font-family="sans-serif">failure-rate</text>
</svg>`,

  unaligned: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="50" height="30" rx="4" fill="#1565c0"/><text x="45" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">up</text>
  <rect x="90" y="25" width="100" height="50" rx="6" fill="#4e342e" stroke="#ff8a50"/>
  <text x="140" y="48" text-anchor="middle" fill="#ffcc80" font-size="9" font-family="sans-serif">buffers in CP</text>
  <text x="140" y="64" text-anchor="middle" fill="#ffab40" font-size="8" font-family="sans-serif">unaligned</text>
  <rect x="210" y="35" width="50" height="30" rx="4" fill="#c62828"/><text x="235" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">slow</text>
</svg>`,

  incp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="90" height="50" rx="6" fill="#455a64"/><text x="75" y="54" text-anchor="middle" fill="#cfd8dc" font-size="10" font-family="sans-serif">full state</text>
  <path d="M130 50 H160" stroke="#ff8a50" stroke-width="2"/>
  <rect x="165" y="25" width="90" height="50" rx="6" fill="#1b5e20" stroke="#66bb6a"/><text x="210" y="48" text-anchor="middle" fill="#c8e6c9" font-size="10" font-family="sans-serif">delta SST</text><text x="210" y="64" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">incremental</text>
</svg>`,

  memory: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="30" width="50" height="40" fill="#1565c0"/><text x="45" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">JVM</text>
  <rect x="70" y="30" width="50" height="40" fill="#2e7d32"/><text x="95" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">task</text>
  <rect x="120" y="30" width="50" height="40" fill="#6a1b9a"/><text x="145" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">managed</text>
  <rect x="170" y="30" width="50" height="40" fill="#e65100"/><text x="195" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">network</text>
  <rect x="220" y="30" width="40" height="40" fill="#00838f"/><text x="240" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">meta</text>
</svg>`,

  netbuf: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="40" width="40" height="25" rx="3" fill="#1565c0"/>
  <rect x="80" y="40" width="30" height="25" rx="3" fill="#42a5f5" opacity=".8"/>
  <rect x="120" y="40" width="30" height="25" rx="3" fill="#42a5f5" opacity=".6"/>
  <rect x="160" y="40" width="30" height="25" rx="3" fill="#42a5f5" opacity=".4"/>
  <path d="M200 52 H230" stroke="#ff8a50" stroke-width="2"/>
  <rect x="230" y="40" width="30" height="25" rx="3" fill="#e65100"/>
  <text x="140" y="85" text-anchor="middle" fill="#8b9bb8" font-size="9" font-family="sans-serif">credit-based buffers</text>
</svg>`,

  k8s: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="20" width="200" height="60" rx="8" fill="#0d47a1" stroke="#64b5f6"/>
  <text x="140" y="45" text-anchor="middle" fill="#bbdefb" font-size="12" font-family="sans-serif">Kubernetes</text>
  <text x="140" y="64" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">JM pod · TM pods · Operator</text>
</svg>`,

  cli: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="20" width="220" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="48" y="48" fill="#66bb6a" font-size="12" font-family="ui-monospace,monospace">$ flink run -d job.jar</text>
  <text x="48" y="68" fill="#8b949e" font-size="11" font-family="ui-monospace,monospace">$ flink savepoint ...</text>
</svg>`,

  rest: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="220" height="50" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="48" y="48" fill="#79c0ff" font-size="12" font-family="ui-monospace,monospace">GET /v1/jobs</text>
  <text x="48" y="66" fill="#ff7b72" font-size="11" font-family="ui-monospace,monospace">POST .../savepoints</text>
</svg>`,

  wmalign: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <line x1="40" y1="30" x2="40" y2="80" stroke="#42a5f5" stroke-width="3"/>
  <line x1="100" y1="50" x2="100" y2="80" stroke="#66bb6a" stroke-width="3"/>
  <line x1="160" y1="25" x2="160" y2="80" stroke="#ef5350" stroke-width="3"/>
  <line x1="30" y1="55" x2="200" y2="55" stroke="#ff8a50" stroke-dasharray="4 3"/>
  <text x="220" y="58" fill="#ffcc80" font-size="9" font-family="sans-serif">align</text>
</svg>`,

  hotkey: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="60" width="30" height="20" fill="#42a5f5"/>
  <rect x="90" y="40" width="30" height="40" fill="#42a5f5"/>
  <rect x="140" y="15" width="30" height="65" fill="#ef5350"/>
  <rect x="190" y="50" width="30" height="30" fill="#42a5f5"/>
  <text x="155" y="10" text-anchor="middle" fill="#ef9a9a" font-size="9" font-family="sans-serif">hot key</text>
</svg>`,

  e2e: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="35" width="50" height="30" rx="4" fill="#4a148c"/><text x="40" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">src</text>
  <path d="M65 50 H90" stroke="#ff8a50" stroke-width="2"/>
  <rect x="95" y="30" width="70" height="40" rx="4" fill="#e65100"/><text x="130" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Flink EO</text>
  <path d="M165 50 H190" stroke="#ff8a50" stroke-width="2"/>
  <rect x="195" y="30" width="70" height="40" rx="4" fill="#1b5e20" stroke="#66bb6a"/><text x="230" y="48" text-anchor="middle" fill="#c8e6c9" font-size="8" font-family="sans-serif">TX sink</text><text x="230" y="62" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">commit</text>
</svg>`,

  local: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="60" y="20" width="160" height="60" rx="8" fill="#37474f" stroke="#90a4ae"/>
  <text x="140" y="48" text-anchor="middle" fill="#eceff1" font-size="12" font-family="sans-serif">IDE + MiniCluster</text>
  <text x="140" y="66" text-anchor="middle" fill="#b0bec5" font-size="9" font-family="sans-serif">localhost debug</text>
</svg>`,

  rtmode: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="30" width="100" height="40" rx="6" fill="#1565c0"/><text x="75" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">STREAMING</text>
  <rect x="155" y="30" width="100" height="40" rx="6" fill="#6a1b9a"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">BATCH</text>
</svg>`,

  pyflink: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="200" height="50" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="60" y="55" fill="#ffdf5b" font-size="13" font-family="ui-monospace,monospace">pyflink.table</text>
</svg>`,

  wmstrategy: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="220" height="50" rx="8" fill="#1a237e" stroke="#7986cb"/>
  <text x="140" y="48" text-anchor="middle" fill="#c5cae9" font-size="10" font-family="sans-serif">WatermarkStrategy</text>
  <text x="140" y="64" text-anchor="middle" fill="#9fa8da" font-size="9" font-family="sans-serif">assigner + generator</text>
</svg>`,

  jobgraph: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="35" width="55" height="30" rx="4" fill="#455a64"/><text x="42" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">Stream</text>
  <path d="M70 50 H90" stroke="#ff8a50" stroke-width="2"/>
  <rect x="95" y="35" width="55" height="30" rx="4" fill="#1565c0"/><text x="122" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">JobGraph</text>
  <path d="M150 50 H170" stroke="#ff8a50" stroke-width="2"/>
  <rect x="175" y="35" width="90" height="30" rx="4" fill="#e65100"/><text x="220" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">Tasks on TM</text>
</svg>`,

  ssg: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="25" width="100" height="50" rx="6" fill="#1b5e20" stroke="#66bb6a"/><text x="75" y="48" text-anchor="middle" fill="#c8e6c9" font-size="9" font-family="sans-serif">group default</text><text x="75" y="64" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">src+map</text>
  <rect x="155" y="25" width="100" height="50" rx="6" fill="#4e342e" stroke="#ff8a50"/><text x="205" y="48" text-anchor="middle" fill="#ffcc80" font-size="9" font-family="sans-serif">group heavy</text><text x="205" y="64" text-anchor="middle" fill="#ffab40" font-size="8" font-family="sans-serif">process</text>
</svg>`,

  maxp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="35" width="200" height="30" rx="4" fill="#37474f"/>
  <rect x="40" y="35" width="80" height="30" rx="4" fill="#e65100"/>
  <text x="80" y="55" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">p=32</text>
  <text x="180" y="55" text-anchor="middle" fill="#b0bec5" font-size="9" font-family="sans-serif">maxP=1024</text>
</svg>`,

  cpsp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="25" width="100" height="50" rx="6" fill="#1565c0"/><text x="75" y="48" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">Checkpoint</text><text x="75" y="64" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">auto recover</text>
  <rect x="155" y="25" width="100" height="50" rx="6" fill="#e65100"/><text x="205" y="48" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">Savepoint</text><text x="205" y="64" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">ops migrate</text>
</svg>`,

  rocks: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="20" width="180" height="60" rx="8" fill="#3e2723" stroke="#ff8a50"/>
  <text x="140" y="48" text-anchor="middle" fill="#ffcc80" font-size="12" font-family="sans-serif">RocksDB</text>
  <text x="140" y="66" text-anchor="middle" fill="#ffab40" font-size="9" font-family="sans-serif">block cache · SST · local SSD</text>
</svg>`,

  sqlconn: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="25" width="230" height="50" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="40" y="48" fill="#ff7b72" font-size="11" font-family="ui-monospace,monospace">WITH (</text>
  <text x="90" y="48" fill="#a5d6ff" font-size="11" font-family="ui-monospace,monospace">'connector'='kafka'</text>
  <text x="40" y="66" fill="#ff7b72" font-size="11" font-family="ui-monospace,monospace">)</text>
</svg>`,

  upsertk: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="80" height="40" rx="4" fill="#e65100"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">changelog</text>
  <path d="M115 50 H150" stroke="#ff8a50" stroke-width="2"/>
  <rect x="155" y="25" width="100" height="50" rx="6" fill="#4a148c" stroke="#ce93d8"/>
  <text x="205" y="48" text-anchor="middle" fill="#f3e5f5" font-size="9" font-family="sans-serif">upsert-kafka</text>
  <text x="205" y="64" text-anchor="middle" fill="#e1bee7" font-size="8" font-family="sans-serif">compact topic</text>
</svg>`,

  latefire: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="60" cy="50" r="14" fill="#42a5f5"/><text x="60" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">r1</text>
  <circle cx="120" cy="50" r="14" fill="#66bb6a"/><text x="120" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">r2</text>
  <circle cx="180" cy="50" r="14" fill="#ff8a50"/><text x="180" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">r3</text>
  <text x="230" y="54" fill="#8b9bb8" font-size="9" font-family="sans-serif">same win</text>
</svg>`,

  portability: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="70" height="40" rx="4" fill="#1565c0"/><text x="65" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">v1 job</text>
  <rect x="115" y="35" width="50" height="30" rx="4" fill="#ff8a50"/><text x="140" y="54" text-anchor="middle" fill="#000" font-size="8" font-family="sans-serif">SP</text>
  <rect x="180" y="30" width="70" height="40" rx="4" fill="#2e7d32"/><text x="215" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">v2 job</text>
</svg>`,

  srcwm: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="25" width="80" height="50" rx="6" fill="#4a148c"/><text x="60" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Kafka</text><text x="60" y="62" text-anchor="middle" fill="#e1bee7" font-size="8" font-family="sans-serif">partitions</text>
  <path d="M105 50 H140" stroke="#ff8a50" stroke-width="2"/>
  <rect x="145" y="25" width="115" height="50" rx="6" fill="#e65100"/><text x="202" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">WM Strategy</text><text x="202" y="64" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">on Source</text>
</svg>`,

  files: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="50" height="55" rx="4" fill="#455a64"/><text x="65" y="55" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">dir</text>
  <rect x="110" y="30" width="50" height="45" rx="4" fill="#607d8b"/><text x="135" y="55" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">part-0</text>
  <rect x="180" y="30" width="50" height="45" rx="4" fill="#607d8b"/><text x="205" y="55" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">part-1</text>
</svg>`,

  obs: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="50" cy="50" r="18" fill="#1565c0"/><text x="50" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">lag</text>
  <circle cx="100" cy="50" r="18" fill="#2e7d32"/><text x="100" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">rps</text>
  <circle cx="150" cy="50" r="18" fill="#e65100"/><text x="150" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">CP</text>
  <circle cx="200" cy="50" r="18" fill="#c62828"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">BP</text>
  <circle cx="250" cy="50" r="18" fill="#6a1b9a"/><text x="250" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">WM</text>
</svg>`,

  barrier: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="40" cy="50" r="6" fill="#90caf9"/><circle cx="70" cy="50" r="6" fill="#90caf9"/><circle cx="100" cy="50" r="6" fill="#90caf9"/>
  <rect x="120" y="35" width="14" height="30" fill="#ffeb3b" stroke="#f9a825"/><text x="127" y="28" text-anchor="middle" fill="#ffeb3b" font-size="8" font-family="sans-serif">B</text>
  <circle cx="160" cy="50" r="6" fill="#90caf9"/><circle cx="190" cy="50" r="6" fill="#90caf9"/>
  <rect x="210" y="35" width="14" height="30" fill="#ffeb3b"/><circle cx="250" cy="50" r="6" fill="#90caf9"/>
  <text x="140" y="90" text-anchor="middle" fill="#8b9bb8" font-size="9" font-family="sans-serif">checkpoint barriers in stream</text>
</svg>`,

  twopc: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="35" width="55" height="30" rx="4" fill="#1565c0"/><text x="42" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">begin</text>
  <path d="M70 50 H90" stroke="#ff8a50" stroke-width="2"/>
  <rect x="95" y="35" width="70" height="30" rx="4" fill="#ef6c00"/><text x="130" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">preCommit</text>
  <path d="M165 50 H185" stroke="#ff8a50" stroke-width="2"/>
  <rect x="190" y="20" width="70" height="25" rx="4" fill="#2e7d32"/><text x="225" y="37" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">commit</text>
  <rect x="190" y="55" width="70" height="25" rx="4" fill="#c62828"/><text x="225" y="72" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">abort</text>
</svg>`,

  koffset: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="25" width="100" height="50" rx="6" fill="#4a148c"/><text x="70" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Kafka log</text><text x="70" y="64" text-anchor="middle" fill="#e1bee7" font-size="8" font-family="sans-serif">offsets</text>
  <path d="M125 50 H155" stroke="#ff8a50" stroke-width="2"/>
  <rect x="160" y="25" width="100" height="50" rx="6" fill="#e65100"/><text x="210" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Flink state</text><text x="210" y="64" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">CP stores off</text>
</svg>`,

  changelog: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="20" width="80" height="60" rx="6" fill="#37474f"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">state</text>
  <path d="M115 40 H150" stroke="#66bb6a" stroke-width="2"/>
  <path d="M115 60 H150" stroke="#ff8a50" stroke-width="2"/>
  <rect x="155" y="25" width="100" height="50" rx="6" fill="#1b5e20" stroke="#66bb6a"/><text x="205" y="48" text-anchor="middle" fill="#c8e6c9" font-size="9" font-family="sans-serif">changelog</text><text x="205" y="64" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">durable log</text>
</svg>`,

  localrec: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="90" height="45" rx="6" fill="#1565c0"/><text x="75" y="50" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">remote CP</text><text x="75" y="64" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">S3/HDFS</text>
  <rect x="160" y="30" width="90" height="45" rx="6" fill="#e65100"/><text x="205" y="50" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">local disk</text><text x="205" y="64" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">fast restore</text>
</svg>`,

  stateproc: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="30" width="70" height="40" rx="4" fill="#455a64"/><text x="55" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">savepoint</text>
  <path d="M95 50 H125" stroke="#ff8a50" stroke-width="2"/>
  <rect x="130" y="25" width="70" height="50" rx="4" fill="#6a1b9a"/><text x="165" y="48" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">processor</text><text x="165" y="62" text-anchor="middle" fill="#e1bee7" font-size="7" font-family="sans-serif">batch job</text>
  <path d="M200 50 H225" stroke="#ff8a50" stroke-width="2"/>
  <rect x="230" y="30" width="35" height="40" rx="4" fill="#2e7d32"/><text x="247" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">new</text>
</svg>`,

  serevo: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="80" height="40" rx="4" fill="#1565c0"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">schema v1</text>
  <path d="M115 50 H150" stroke="#ff8a50" stroke-width="2"/>
  <text x="132" y="40" fill="#ffcc80" font-size="8" font-family="sans-serif">migrate</text>
  <rect x="155" y="30" width="90" height="40" rx="4" fill="#2e7d32"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">schema v2</text>
</svg>`,

  keygroups: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="40" y="20" fill="#8b9bb8" font-size="8" font-family="sans-serif">keys</text>
  <rect x="20" y="30" width="16" height="16" fill="#42a5f5"/><rect x="40" y="30" width="16" height="16" fill="#42a5f5"/><rect x="60" y="30" width="16" height="16" fill="#ef5350"/>
  <path d="M90 38 H120" stroke="#ff8a50" stroke-width="2"/>
  <rect x="125" y="25" width="50" height="50" rx="4" fill="#37474f"/><text x="150" y="48" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">groups</text><text x="150" y="62" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">maxP</text>
  <path d="M180 50 H205" stroke="#ff8a50" stroke-width="2"/>
  <rect x="210" y="25" width="50" height="50" rx="4" fill="#e65100"/><text x="235" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">subtask</text>
</svg>`,

  mailbox: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="20" width="200" height="60" rx="8" fill="#263238" stroke="#90a4ae"/>
  <text x="140" y="42" text-anchor="middle" fill="#eceff1" font-size="10" font-family="sans-serif">Task thread mailbox</text>
  <text x="140" y="60" text-anchor="middle" fill="#b0bec5" font-size="8" font-family="sans-serif">record · wm · timer · barrier</text>
</svg>`,

  credit: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="60" height="40" rx="4" fill="#1565c0"/><text x="60" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">sender</text>
  <path d="M95 45 H130" stroke="#66bb6a" stroke-width="2"/><text x="112" y="38" fill="#66bb6a" font-size="8" font-family="sans-serif">data</text>
  <path d="M130 60 H95" stroke="#ff8a50" stroke-width="2"/><text x="112" y="78" fill="#ff8a50" font-size="8" font-family="sans-serif">credit</text>
  <rect x="135" y="30" width="60" height="40" rx="4" fill="#2e7d32"/><text x="165" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">receiver</text>
  <text x="230" y="54" fill="#8b9bb8" font-size="9" font-family="sans-serif">flow ctrl</text>
</svg>`,

  debloat: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="40" width="90" height="30" fill="#ef5350" opacity=".7"/><text x="75" y="30" text-anchor="middle" fill="#ef9a9a" font-size="8" font-family="sans-serif">fat buffers</text>
  <path d="M130 55 H160" stroke="#ff8a50" stroke-width="2"/>
  <rect x="170" y="45" width="50" height="20" fill="#66bb6a"/><text x="195" y="30" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">debloated</text>
</svg>`,

  adaptive: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="50" width="30" height="25" fill="#42a5f5"/>
  <rect x="90" y="35" width="30" height="40" fill="#42a5f5"/>
  <rect x="140" y="20" width="30" height="55" fill="#ff8a50"/>
  <rect x="190" y="35" width="30" height="40" fill="#42a5f5"/>
  <text x="140" y="90" text-anchor="middle" fill="#8b9bb8" font-size="9" font-family="sans-serif">scale to available slots</text>
</svg>`,

  speculative: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="70" height="40" rx="4" fill="#455a64"/><text x="75" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">slow task</text>
  <rect x="150" y="20" width="70" height="30" rx="4" fill="#e65100"/><text x="185" y="40" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">spec copy</text>
  <rect x="150" y="55" width="70" height="30" rx="4" fill="#2e7d32"/><text x="185" y="74" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">winner</text>
</svg>`,

  shuffle: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="70" height="50" rx="4" fill="#1565c0"/><text x="65" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">stage 1</text>
  <rect x="120" y="30" width="40" height="40" rx="4" fill="#ff8a50"/><text x="140" y="54" text-anchor="middle" fill="#000" font-size="8" font-family="sans-serif">disk</text>
  <rect x="180" y="25" width="70" height="50" rx="4" fill="#2e7d32"/><text x="215" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">stage 2</text>
</svg>`,

  customwm: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="20" width="200" height="60" rx="8" fill="#1a237e" stroke="#7986cb"/>
  <text x="140" y="45" text-anchor="middle" fill="#c5cae9" font-size="10" font-family="sans-serif">WatermarkGenerator</text>
  <text x="140" y="62" text-anchor="middle" fill="#9fa8da" font-size="9" font-family="sans-serif">onEvent · onPeriodicEmit</text>
</svg>`,

  dualwm: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <line x1="50" y1="30" x2="50" y2="75" stroke="#42a5f5" stroke-width="3"/>
  <line x1="120" y1="50" x2="120" y2="75" stroke="#66bb6a" stroke-width="3"/>
  <line x1="40" y1="70" x2="200" y2="70" stroke="#ff8a50" stroke-dasharray="4 2"/>
  <text x="220" y="74" fill="#ffcc80" font-size="9" font-family="sans-serif">min</text>
  <text x="85" y="20" fill="#8b9bb8" font-size="8" font-family="sans-serif">input watermarks</text>
</svg>`,

  timerint: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="20" width="180" height="60" rx="8" fill="#37474f"/>
  <text x="140" y="45" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">TimerService heap</text>
  <text x="140" y="62" text-anchor="middle" fill="#ffcc80" font-size="9" font-family="sans-serif">keyed · checkpointed</text>
</svg>`,

  mergewin: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="35" width="60" height="30" rx="4" fill="#1565c0" opacity=".8"/>
  <rect x="85" y="35" width="60" height="30" rx="4" fill="#42a5f5" opacity=".8"/>
  <path d="M160 50 H190" stroke="#ff8a50" stroke-width="2"/>
  <rect x="195" y="30" width="60" height="40" rx="6" fill="#e65100"/><text x="225" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">merged</text>
</svg>`,

  minibatch: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="40" cy="50" r="5" fill="#90caf9"/><circle cx="55" cy="50" r="5" fill="#90caf9"/><circle cx="70" cy="50" r="5" fill="#90caf9"/><circle cx="85" cy="50" r="5" fill="#90caf9"/>
  <rect x="110" y="30" width="70" height="40" rx="6" fill="#e65100"/><text x="145" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">mini-batch</text>
  <rect x="200" y="35" width="50" height="30" rx="4" fill="#2e7d32"/><text x="225" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">agg</text>
</svg>`,

  localglobal: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="30" width="50" height="40" rx="4" fill="#1565c0"/><text x="45" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">local</text>
  <rect x="80" y="30" width="50" height="40" rx="4" fill="#1565c0"/><text x="105" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">local</text>
  <path d="M135 50 H165" stroke="#ff8a50" stroke-width="2"/>
  <rect x="170" y="25" width="80" height="50" rx="6" fill="#e65100"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">global</text>
</svg>`,

  topn: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="60" y="20" width="160" height="18" fill="#e65100"/><text x="140" y="33" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">#1</text>
  <rect x="60" y="42" width="120" height="18" fill="#ef6c00"/><text x="120" y="55" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">#2</text>
  <rect x="60" y="64" width="90" height="18" fill="#ff8f00"/><text x="105" y="77" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">#3</text>
</svg>`,

  dedup: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="50" cy="50" r="12" fill="#90caf9" opacity=".5"/><circle cx="70" cy="50" r="12" fill="#90caf9" opacity=".5"/><circle cx="90" cy="50" r="12" fill="#42a5f5"/>
  <path d="M120 50 H160" stroke="#ff8a50" stroke-width="2"/>
  <circle cx="200" cy="50" r="16" fill="#2e7d32"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">1</text>
</svg>`,

  matchrec: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="30" width="230" height="40" rx="6" fill="#0d1117" stroke="#30363d"/>
  <text x="40" y="55" fill="#ff7b72" font-size="12" font-family="ui-monospace,monospace">MATCH_RECOGNIZE</text>
</svg>`,

  regjoin: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="90" height="50" rx="6" fill="#c62828" opacity=".85"/><text x="75" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">unbounded</text><text x="75" y="62" text-anchor="middle" fill="#ffcdd2" font-size="8" font-family="sans-serif">state grow</text>
  <text x="140" y="54" fill="#ff8a50" font-size="16" font-family="sans-serif">⋈</text>
  <rect x="160" y="25" width="90" height="50" rx="6" fill="#c62828" opacity=".85"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">unbounded</text>
</svg>`,

  retract: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="50" height="30" rx="4" fill="#2e7d32"/><text x="45" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">+I</text>
  <rect x="80" y="35" width="50" height="30" rx="4" fill="#c62828"/><text x="105" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">-D</text>
  <rect x="140" y="35" width="50" height="30" rx="4" fill="#2e7d32"/><text x="165" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">+I</text>
  <rect x="200" y="35" width="55" height="30" rx="4" fill="#e65100"/><text x="227" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">upsert</text>
</svg>`,

  explain: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="20" width="220" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="48" y="48" fill="#79c0ff" font-size="12" font-family="ui-monospace,monospace">EXPLAIN SELECT ...</text>
  <text x="48" y="68" fill="#8b949e" font-size="10" font-family="ui-monospace,monospace">physical plan · exchanges</text>
</svg>`,

  codegen: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="100" height="50" rx="6" fill="#1b5e20"/><text x="80" y="54" text-anchor="middle" fill="#c8e6c9" font-size="9" font-family="sans-serif">codegen</text>
  <path d="M135 50 H165" stroke="#ff8a50" stroke-width="2"/>
  <rect x="170" y="25" width="80" height="50" rx="6" fill="#4e342e" stroke="#ff8a50"/><text x="210" y="54" text-anchor="middle" fill="#ffcc80" font-size="9" font-family="sans-serif">UDF wall</text>
</svg>`,

  latency: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="50" cy="50" r="8" fill="#ffeb3b"/>
  <path d="M65 50 H220" stroke="#ffeb3b" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="230" cy="50" r="8" fill="#ffeb3b"/>
  <text x="140" y="80" text-anchor="middle" fill="#8b9bb8" font-size="9" font-family="sans-serif">latency markers</text>
</svg>`,

  bpdebug: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="35" width="60" height="30" rx="4" fill="#2e7d32"/><text x="55" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">OK</text>
  <rect x="100" y="35" width="60" height="30" rx="4" fill="#f9a825"/><text x="130" y="54" text-anchor="middle" fill="#000" font-size="8" font-family="sans-serif">LOW</text>
  <rect x="175" y="35" width="70" height="30" rx="4" fill="#c62828"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">HIGH</text>
</svg>`,

  readamp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="20" width="180" height="14" fill="#455a64"/><text x="140" y="30" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">L0</text>
  <rect x="50" y="40" width="180" height="14" fill="#546e7a"/><text x="140" y="50" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">L1</text>
  <rect x="50" y="60" width="180" height="14" fill="#607d8b"/><text x="140" y="70" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">L2 SST...</text>
  <text x="140" y="92" text-anchor="middle" fill="#ef9a9a" font-size="8" font-family="sans-serif">point lookup may hit many</text>
</svg>`,

  cpclean: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="50" height="50" rx="4" fill="#1565c0"/><text x="65" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">CP1</text>
  <rect x="110" y="25" width="50" height="50" rx="4" fill="#1565c0"/><text x="135" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">CP2</text>
  <rect x="180" y="35" width="60" height="30" rx="4" fill="#ff8a50"/><text x="210" y="54" text-anchor="middle" fill="#000" font-size="8" font-family="sans-serif">shared</text>
</svg>`,

  classload: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="90" height="50" rx="6" fill="#37474f"/><text x="75" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Flink parent</text>
  <rect x="150" y="25" width="100" height="50" rx="6" fill="#e65100"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">user child</text>
</svg>`,

  jar: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="80" height="50" rx="6" fill="#6a1b9a"/><text x="80" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">job.jar</text>
  <rect x="150" y="25" width="90" height="50" rx="6" fill="#455a64"/><text x="195" y="48" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">plugins/</text><text x="195" y="64" text-anchor="middle" fill="#b0bec5" font-size="8" font-family="sans-serif">connectors</text>
</svg>`,

  jmfo: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="80" height="50" rx="6" fill="#c62828" opacity=".7"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">JM dead</text>
  <path d="M120 50 H155" stroke="#ff8a50" stroke-width="2"/>
  <rect x="160" y="25" width="90" height="50" rx="6" fill="#2e7d32"/><text x="205" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">new leader</text><text x="205" y="64" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">restore jobs</text>
</svg>`,

  cancel: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="30" width="180" height="40" rx="6" fill="#455a64"/>
  <text x="140" y="48" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">cancel requested</text>
  <text x="140" y="64" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">timeout → force</text>
</svg>`,

  coloc: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="70" y="20" width="140" height="60" rx="8" fill="#1a237e" stroke="#7986cb"/>
  <text x="140" y="48" text-anchor="middle" fill="#c5cae9" font-size="10" font-family="sans-serif">same slot</text>
  <text x="140" y="64" text-anchor="middle" fill="#9fa8da" font-size="9" font-family="sans-serif">co-location group</text>
</svg>`,

  chainrules: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="40" height="30" rx="4" fill="#6a1b9a"/><text x="40" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">map</text>
  <rect x="65" y="35" width="40" height="30" rx="4" fill="#6a1b9a"/><text x="85" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">filter</text>
  <path d="M110 50 H140" stroke="#ef5350" stroke-width="2"/><text x="125" y="40" fill="#ef9a9a" font-size="8" font-family="sans-serif">keyBy</text>
  <rect x="145" y="35" width="50" height="30" rx="4" fill="#e65100"/><text x="170" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">process</text>
  <rect x="205" y="35" width="50" height="30" rx="4" fill="#e65100"/><text x="230" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">map</text>
</svg>`,

  rescale: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="40" height="20" fill="#1565c0"/>
  <rect x="40" y="55" width="40" height="20" fill="#1565c0"/>
  <path d="M85 35 L130 25 M85 35 L130 45 M85 65 L130 55 M85 65 L130 75" stroke="#ff8a50" fill="none"/>
  <rect x="135" y="15" width="35" height="18" fill="#e65100"/>
  <rect x="135" y="38" width="35" height="18" fill="#e65100"/>
  <rect x="135" y="61" width="35" height="18" fill="#e65100"/>
  <text x="210" y="54" fill="#8b9bb8" font-size="9" font-family="sans-serif">rescale</text>
</svg>`,

  bcboot: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="30" width="70" height="40" rx="4" fill="#6a1b9a"/><text x="55" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">rules 1st</text>
  <path d="M95 50 H125" stroke="#ff8a50" stroke-width="2"/>
  <rect x="130" y="30" width="60" height="40" rx="4" fill="#455a64"/><text x="160" y="54" text-anchor="middle" fill="#b0bec5" font-size="8" font-family="sans-serif">wait</text>
  <path d="M195 50 H220" stroke="#66bb6a" stroke-width="2"/>
  <rect x="225" y="30" width="40" height="40" rx="4" fill="#2e7d32"/><text x="245" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">go</text>
</svg>`,

  winjoin: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="80" height="40" rx="4" fill="#1565c0"/><text x="80" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">win A</text>
  <rect x="160" y="30" width="80" height="40" rx="4" fill="#e65100"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">win B</text>
  <text x="140" y="54" text-anchor="middle" fill="#ffcc80" font-size="12" font-family="sans-serif">⋈</text>
</svg>`,

  asyncretry: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="70" cy="50" r="20" fill="none" stroke="#ff8a50" stroke-width="3"/>
  <path d="M70 30 A20 20 0 1 1 55 60" fill="none" stroke="#ffcc80" stroke-width="2"/>
  <text x="140" y="45" fill="#cfd8dc" font-size="10" font-family="sans-serif">timeout</text>
  <text x="140" y="62" fill="#8b9bb8" font-size="10" font-family="sans-serif">capacity · backoff</text>
</svg>`,

  e2esla: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="50" cy="50" r="10" fill="#42a5f5"/><text x="50" y="75" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">event</text>
  <path d="M65 50 H200" stroke="#ff8a50" stroke-width="2"/>
  <circle cx="220" cy="50" r="10" fill="#66bb6a"/><text x="220" y="75" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">visible</text>
  <text x="130" y="40" text-anchor="middle" fill="#ffcc80" font-size="9" font-family="sans-serif">SLA latency</text>
</svg>`,

  compat: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="35" width="50" height="30" rx="4" fill="#455a64"/><text x="50" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">1.18</text>
  <path d="M80 50 H100" stroke="#ff8a50" stroke-width="2"/>
  <rect x="105" y="35" width="50" height="30" rx="4" fill="#455a64"/><text x="130" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">1.19</text>
  <path d="M160 50 H180" stroke="#ff8a50" stroke-width="2"/>
  <rect x="185" y="35" width="50" height="30" rx="4" fill="#e65100"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">1.20</text>
</svg>`,

  eotrade: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="100" height="50" rx="6" fill="#1b5e20"/><text x="80" y="48" text-anchor="middle" fill="#c8e6c9" font-size="9" font-family="sans-serif">correctness</text><text x="80" y="64" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">EO cost ↑</text>
  <rect x="150" y="25" width="100" height="50" rx="6" fill="#e65100"/><text x="200" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">simplicity</text><text x="200" y="64" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">latency ↓</text>
</svg>`,

  fingrain: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="50" height="40" fill="#42a5f5"/><text x="65" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">1x</text>
  <rect x="110" y="20" width="50" height="50" fill="#ff8a50"/><text x="135" y="48" text-anchor="middle" fill="#000" font-size="8" font-family="sans-serif">2x</text>
  <rect x="180" y="35" width="50" height="35" fill="#66bb6a"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">1.5x</text>
</svg>`,

  dsv2: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="90" height="50" rx="6" fill="#455a64"/><text x="85" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">DS v1</text>
  <path d="M140 50 H165" stroke="#ff8a50" stroke-width="2"/>
  <rect x="170" y="25" width="80" height="50" rx="6" fill="#e65100"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">DS v2</text>
</svg>`,

  ptf: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="200" height="50" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="60" y="55" fill="#d2a8ff" font-size="12" font-family="ui-monospace,monospace">PROCESS TABLE FN</text>
</svg>`,

  warroom: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="20" width="220" height="60" rx="8" fill="#b71c1c" stroke="#ef9a9a"/>
  <text x="140" y="48" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">WAR ROOM</text>
  <text x="140" y="66" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="sans-serif">impact → metrics → action</text>
</svg>`,

  planner: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="35" width="55" height="30" rx="4" fill="#455a64"/><text x="42" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">SQL</text>
  <path d="M70 50 H90" stroke="#ff8a50" stroke-width="2"/>
  <rect x="95" y="35" width="55" height="30" rx="4" fill="#1565c0"/><text x="122" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">logical</text>
  <path d="M150 50 H170" stroke="#ff8a50" stroke-width="2"/>
  <rect x="175" y="35" width="55" height="30" rx="4" fill="#e65100"/><text x="202" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">physical</text>
  <path d="M230 50 H245" stroke="#ff8a50" stroke-width="2"/>
  <text x="255" y="54" fill="#8b9bb8" font-size="9" font-family="sans-serif">run</text>
</svg>`,

  pushdown: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="15" width="80" height="25" rx="4" fill="#455a64"/><text x="80" y="32" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">filter late</text>
  <path d="M80 45 V65" stroke="#ff8a50" stroke-width="2"/>
  <rect x="40" y="65" width="80" height="25" rx="4" fill="#2e7d32"/><text x="80" y="82" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">filter early</text>
  <rect x="160" y="30" width="90" height="40" rx="6" fill="#1565c0"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">source</text>
</svg>`,

  proj: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="100" height="50" rx="4" fill="#37474f"/>
  <rect x="40" y="35" width="15" height="30" fill="#42a5f5"/><rect x="60" y="35" width="15" height="30" fill="#455a64"/><rect x="80" y="35" width="15" height="30" fill="#42a5f5"/><rect x="100" y="35" width="15" height="30" fill="#455a64"/>
  <path d="M140 50 H170" stroke="#ff8a50" stroke-width="2"/>
  <rect x="175" y="30" width="70" height="40" rx="4" fill="#e65100"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">cols</text>
</svg>`,

  exchange2: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="20" width="40" height="20" fill="#1565c0"/><rect x="20" y="50" width="40" height="20" fill="#1565c0"/>
  <path d="M65 30 L120 40 M65 60 L120 50" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
  <rect x="125" y="25" width="90" height="50" rx="6" fill="#6a1b9a"/><text x="170" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Exchange</text>
  <path d="M220 40 L250 30 M220 50 L250 60" stroke="#ff8a50" fill="none" stroke-width="1.5"/>
</svg>`,

  sqltll: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="25" width="180" height="50" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="70" y="55" fill="#a5d6ff" font-size="11" font-family="ui-monospace,monospace">table.exec.state.ttl</text>
</svg>`,

  distinct: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="60" cy="50" r="10" fill="#90caf9"/><circle cx="85" cy="50" r="10" fill="#90caf9"/><circle cx="110" cy="50" r="10" fill="#42a5f5"/>
  <text x="160" y="45" fill="#ffcc80" font-size="11" font-family="sans-serif">COUNT</text>
  <text x="160" y="62" fill="#ff8a50" font-size="11" font-family="sans-serif">DISTINCT</text>
</svg>`,

  hint: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="200" height="50" rx="8" fill="#0d1117" stroke="#ff8a50"/>
  <text x="60" y="55" fill="#ffcc80" font-size="12" font-family="ui-monospace,monospace">/*+ BROADCAST(d) */</text>
</svg>`,

  cumulate: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="55" width="40" height="20" fill="#1565c0"/>
  <rect x="90" y="40" width="50" height="35" fill="#1e88e5"/>
  <rect x="150" y="25" width="60" height="50" fill="#42a5f5"/>
  <text x="140" y="90" text-anchor="middle" fill="#8b9bb8" font-size="8" font-family="sans-serif">cumulate grows</text>
</svg>`,

  overagg: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="50" cy="50" r="6" fill="#42a5f5"/><circle cx="80" cy="50" r="6" fill="#42a5f5"/><circle cx="110" cy="50" r="6" fill="#42a5f5"/><circle cx="140" cy="50" r="6" fill="#ff8a50"/>
  <path d="M50 70 H140" stroke="#ffcc80" stroke-width="2"/>
  <text x="200" y="54" fill="#cfd8dc" font-size="10" font-family="sans-serif">OVER frame</text>
</svg>`,

  materialize: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="70" height="40" rx="4" fill="#1565c0"/><text x="65" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">changelog</text>
  <rect x="120" y="25" width="60" height="50" rx="4" fill="#e65100"/><text x="150" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">buffer</text>
  <rect x="200" y="30" width="55" height="40" rx="4" fill="#2e7d32"/><text x="227" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">sink</text>
</svg>`,

  tz: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="90" cy="50" r="28" fill="none" stroke="#ff8a50" stroke-width="3"/>
  <text x="90" y="54" text-anchor="middle" fill="#ffcc80" font-size="10" font-family="sans-serif">UTC</text>
  <text x="180" y="45" fill="#cfd8dc" font-size="10" font-family="sans-serif">Asia/Seoul</text>
  <text x="180" y="62" fill="#8b9bb8" font-size="9" font-family="sans-serif">window borders</text>
</svg>`,

  wmdll: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="25" width="230" height="50" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="40" y="55" fill="#ff7b72" font-size="11" font-family="ui-monospace,monospace">WATERMARK FOR ts AS ...</text>
</svg>`,

  computed: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="90" height="40" rx="4" fill="#455a64"/><text x="85" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">payload</text>
  <path d="M135 50 H165" stroke="#ff8a50" stroke-width="2"/>
  <rect x="170" y="30" width="70" height="40" rx="4" fill="#e65100"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">AS col</text>
</svg>`,

  metacols: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="80" height="50" rx="4" fill="#4a148c"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">value</text>
  <rect x="130" y="25" width="50" height="50" rx="4" fill="#e65100"/><text x="155" y="48" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">part</text><text x="155" y="62" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">off</text>
  <rect x="200" y="25" width="50" height="50" rx="4" fill="#e65100"/><text x="225" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">ts</text>
</svg>`,

  sqlclient: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="20" width="220" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="48" y="48" fill="#66bb6a" font-size="12" font-family="ui-monospace,monospace">Flink SQL&gt;</text>
  <text x="48" y="68" fill="#8b949e" font-size="11" font-family="ui-monospace,monospace">EXPLAIN ...</text>
</svg>`,

  stmtset: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="50" height="40" rx="4" fill="#1565c0"/><text x="55" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">src</text>
  <path d="M85 40 H120" stroke="#ff8a50"/><path d="M85 60 H120" stroke="#ff8a50"/>
  <rect x="125" y="20" width="55" height="25" rx="3" fill="#2e7d32"/><text x="152" y="37" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">sinkA</text>
  <rect x="125" y="55" width="55" height="25" rx="3" fill="#2e7d32"/><text x="152" y="72" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">sinkB</text>
  <text x="210" y="54" fill="#ffcc80" font-size="9" font-family="sans-serif">1 job</text>
</svg>`,

  dynopt: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="220" height="40" rx="6" fill="#0d1117" stroke="#ff8a50"/>
  <text x="45" y="55" fill="#ffcc80" font-size="10" font-family="ui-monospace,monospace">/*+ OPTIONS('scan...') */</text>
</svg>`,

  udfdll: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="200" height="40" rx="6" fill="#0d1117" stroke="#30363d"/>
  <text x="55" y="55" fill="#d2a8ff" font-size="11" font-family="ui-monospace,monospace">CREATE FUNCTION</text>
</svg>`,

  catalog: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="20" width="200" height="20" rx="3" fill="#e65100"/><text x="140" y="34" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">catalog</text>
  <rect x="55" y="45" width="170" height="18" rx="3" fill="#ef6c00"/><text x="140" y="58" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">database</text>
  <rect x="70" y="68" width="140" height="18" rx="3" fill="#ff8f00"/><text x="140" y="81" text-anchor="middle" fill="#000" font-size="8" font-family="sans-serif">table</text>
</svg>`,

  sqlpar: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="30" width="180" height="40" rx="6" fill="#1a237e" stroke="#7986cb"/>
  <text x="140" y="54" text-anchor="middle" fill="#c5cae9" font-size="11" font-family="sans-serif">parallelism.default = N</text>
</svg>`,

  fusion: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="35" width="40" height="30" rx="3" fill="#6a1b9a"/>
  <rect x="80" y="35" width="40" height="30" rx="3" fill="#6a1b9a"/>
  <rect x="130" y="35" width="40" height="30" rx="3" fill="#6a1b9a"/>
  <path d="M175 50 H200" stroke="#ff8a50" stroke-width="2"/>
  <rect x="205" y="25" width="55" height="50" rx="6" fill="#e65100"/><text x="232" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">fused</text>
</svg>`,

  kstart: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <line x1="30" y1="50" x2="250" y2="50" stroke="#455a64" stroke-width="3"/>
  <circle cx="60" cy="50" r="8" fill="#66bb6a"/><text x="60" y="75" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">earliest</text>
  <circle cx="140" cy="50" r="8" fill="#ff8a50"/><text x="140" y="75" text-anchor="middle" fill="#ffcc80" font-size="8" font-family="sans-serif">timestamp</text>
  <circle cx="220" cy="50" r="8" fill="#42a5f5"/><text x="220" y="75" text-anchor="middle" fill="#90caf9" font-size="8" font-family="sans-serif">latest</text>
</svg>`,

  kpart: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="25" width="30" height="50" fill="#4a148c"/><rect x="70" y="25" width="30" height="50" fill="#4a148c"/><rect x="110" y="25" width="30" height="50" fill="#4a148c"/><rect x="150" y="25" width="30" height="50" fill="#4a148c"/>
  <text x="210" y="45" fill="#cfd8dc" font-size="9" font-family="sans-serif">partitions</text>
  <text x="210" y="62" fill="#ffcc80" font-size="9" font-family="sans-serif">≈ source p</text>
</svg>`,

  desererr: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="90" height="40" rx="4" fill="#c62828"/><text x="85" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">bad JSON</text>
  <path d="M140 50 H175" stroke="#ff8a50" stroke-width="2"/>
  <rect x="180" y="30" width="70" height="40" rx="4" fill="#e65100"/><text x="215" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">DLQ</text>
</svg>`,

  acks: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="70" height="40" rx="4" fill="#e65100"/><text x="75" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">produce</text>
  <path d="M115 50 H150" stroke="#ff8a50" stroke-width="2"/>
  <rect x="155" y="20" width="90" height="60" rx="4" fill="#2e7d32"/><text x="200" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">acks=all</text><text x="200" y="64" text-anchor="middle" fill="#a5d6a7" font-size="8" font-family="sans-serif">ISR</text>
</svg>`,

  klag: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="60" width="30" height="20" fill="#42a5f5"/>
  <rect x="90" y="40" width="30" height="40" fill="#ff8a50"/>
  <rect x="140" y="20" width="30" height="60" fill="#ef5350"/>
  <rect x="190" y="45" width="30" height="35" fill="#42a5f5"/>
  <text x="140" y="95" text-anchor="middle" fill="#ef9a9a" font-size="9" font-family="sans-serif">consumer lag</text>
</svg>`,

  rebalance: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="70" cy="50" r="20" fill="#455a64"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">TM</text>
  <path d="M95 40 C130 10 160 10 195 40" stroke="#ff8a50" fill="none"/>
  <path d="M95 60 C130 90 160 90 195 60" stroke="#ff8a50" fill="none"/>
  <circle cx="210" cy="50" r="20" fill="#e65100"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">TM</text>
</svg>`,

  schemareg: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="20" width="180" height="60" rx="8" fill="#1a237e" stroke="#7986cb"/>
  <text x="140" y="48" text-anchor="middle" fill="#c5cae9" font-size="11" font-family="sans-serif">Schema Registry</text>
  <text x="140" y="66" text-anchor="middle" fill="#9fa8da" font-size="9" font-family="sans-serif">id · compatibility</text>
</svg>`,

  idemp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="90" cy="50" r="16" fill="#42a5f5"/><text x="90" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">msg</text>
  <circle cx="140" cy="50" r="16" fill="#42a5f5" opacity=".4"/><text x="140" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">dup</text>
  <path d="M165 50 H195" stroke="#66bb6a" stroke-width="2"/>
  <rect x="200" y="35" width="50" height="30" rx="4" fill="#2e7d32"/><text x="225" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">1x</text>
</svg>`,

  mtopic: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="20" width="60" height="20" rx="3" fill="#4a148c"/>
  <rect x="20" y="50" width="60" height="20" rx="3" fill="#4a148c"/>
  <path d="M85 30 H120 L150 50 M85 60 H120 L150 50" stroke="#ff8a50" fill="none"/>
  <rect x="155" y="30" width="90" height="40" rx="6" fill="#e65100"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Flink src</text>
</svg>`,

  ratelimit: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <path d="M40 50 H110" stroke="#42a5f5" stroke-width="6"/>
  <rect x="120" y="30" width="40" height="40" rx="4" fill="#ff8a50"/><text x="140" y="54" text-anchor="middle" fill="#000" font-size="8" font-family="sans-serif">valve</text>
  <path d="M165 50 H240" stroke="#42a5f5" stroke-width="2"/>
</svg>`,

  cdcsnap: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="80" height="40" rx="4" fill="#1565c0"/><text x="70" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">snapshot</text>
  <path d="M120 50 H160" stroke="#ff8a50" stroke-width="2"/>
  <rect x="165" y="30" width="80" height="40" rx="4" fill="#e65100"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">binlog</text>
</svg>`,

  cdcddl: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="90" height="50" rx="4" fill="#455a64"/><text x="85" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">table v1</text>
  <path d="M140 50 H170" stroke="#ef5350" stroke-width="2"/>
  <rect x="175" y="25" width="70" height="50" rx="4" fill="#c62828"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">ALTER</text>
</svg>`,

  debezium: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="20" width="200" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="60" y="45" fill="#ff7b72" font-size="11" font-family="ui-monospace,monospace">op before after</text>
  <text x="60" y="65" fill="#8b949e" font-size="10" font-family="ui-monospace,monospace">debezium envelope</text>
</svg>`,

  cdcsink: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="30" width="55" height="40" rx="4" fill="#0d47a1"/><text x="52" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">CDC</text>
  <path d="M85 50 H120" stroke="#ff8a50" stroke-width="2"/>
  <rect x="125" y="30" width="55" height="40" rx="4" fill="#e65100"/><text x="152" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Flink</text>
  <path d="M185 50 H215" stroke="#ff8a50" stroke-width="2"/>
  <rect x="220" y="30" width="40" height="40" rx="4" fill="#2e7d32"/><text x="240" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">PK</text>
</svg>`,

  binpos: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="200" height="50" rx="6" fill="#37474f"/>
  <text x="140" y="48" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">binlog.000123</text>
  <text x="140" y="64" text-anchor="middle" fill="#ffcc80" font-size="9" font-family="sans-serif">pos = 456789</text>
</svg>`,

  multicdc: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="25" y="20" width="50" height="18" rx="2" fill="#1565c0"/>
  <rect x="25" y="42" width="50" height="18" rx="2" fill="#1565c0"/>
  <rect x="25" y="64" width="50" height="18" rx="2" fill="#1565c0"/>
  <path d="M80 50 H130" stroke="#ff8a50" stroke-width="2"/>
  <rect x="135" y="30" width="110" height="40" rx="6" fill="#e65100"/><text x="190" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">CDC job</text>
</svg>`,

  tztrap: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <text x="70" y="40" text-anchor="middle" fill="#90caf9" font-size="10" font-family="sans-serif">DB TZ</text>
  <text x="140" y="40" text-anchor="middle" fill="#ffcc80" font-size="10" font-family="sans-serif">JDBC</text>
  <text x="210" y="40" text-anchor="middle" fill="#ef9a9a" font-size="10" font-family="sans-serif">Flink</text>
  <text x="140" y="70" text-anchor="middle" fill="#ef5350" font-size="12" font-family="sans-serif">≠ mismatch</text>
</svg>`,

  lake: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <ellipse cx="140" cy="55" rx="100" ry="30" fill="#0d47a1" opacity=".7"/>
  <rect x="90" y="25" width="100" height="25" rx="4" fill="#e65100"/><text x="140" y="42" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">table format</text>
</svg>`,

  iceberg: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <polygon points="140,15 200,80 80,80" fill="#b3e5fc" stroke="#4fc3f7"/>
  <text x="140" y="70" text-anchor="middle" fill="#0277bd" font-size="11" font-family="sans-serif">Iceberg</text>
</svg>`,

  iceupsert: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="70" height="40" rx="4" fill="#e65100"/><text x="75" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">CDC</text>
  <path d="M120 50 H160" stroke="#ff8a50" stroke-width="2"/>
  <rect x="165" y="25" width="90" height="50" rx="6" fill="#0277bd"/><text x="210" y="48" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Iceberg</text><text x="210" y="64" text-anchor="middle" fill="#b3e5fc" font-size="8" font-family="sans-serif">eq-delete</text>
</svg>`,

  paimon: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="20" width="180" height="60" rx="8" fill="#1b5e20" stroke="#66bb6a"/>
  <text x="140" y="48" text-anchor="middle" fill="#c8e6c9" font-size="14" font-family="sans-serif">Paimon</text>
  <text x="140" y="66" text-anchor="middle" fill="#a5d6a7" font-size="9" font-family="sans-serif">PK table · buckets</text>
</svg>`,

  bucket: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="40" height="45" rx="4" fill="#6a1b9a"/><rect x="85" y="30" width="40" height="45" rx="4" fill="#6a1b9a"/><rect x="140" y="30" width="40" height="45" rx="4" fill="#e65100"/><rect x="195" y="30" width="40" height="45" rx="4" fill="#6a1b9a"/>
  <text x="140" y="90" text-anchor="middle" fill="#8b9bb8" font-size="8" font-family="sans-serif">buckets</text>
</svg>`,

  smallfiles: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="40" width="12" height="20" fill="#ef5350"/><rect x="58" y="45" width="10" height="15" fill="#ef5350"/><rect x="74" y="38" width="14" height="22" fill="#ef5350"/><rect x="94" y="42" width="11" height="18" fill="#ef5350"/><rect x="112" y="40" width="13" height="20" fill="#ef5350"/>
  <path d="M140 50 H175" stroke="#ff8a50" stroke-width="2"/>
  <rect x="185" y="30" width="55" height="40" rx="4" fill="#2e7d32"/><text x="212" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">compact</text>
</svg>`,

  snapexp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="40" height="40" rx="3" fill="#455a64" opacity=".4"/>
  <rect x="95" y="30" width="40" height="40" rx="3" fill="#455a64" opacity=".7"/>
  <rect x="150" y="30" width="40" height="40" rx="3" fill="#e65100"/>
  <text x="220" y="54" fill="#8b9bb8" font-size="9" font-family="sans-serif">expire</text>
</svg>`,

  multiengine: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="35" width="55" height="30" rx="4" fill="#e65100"/><text x="57" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Flink</text>
  <rect x="110" y="25" width="60" height="50" rx="4" fill="#1565c0"/><text x="140" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Table</text>
  <rect x="195" y="35" width="55" height="30" rx="4" fill="#6a1b9a"/><text x="222" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Spark</text>
</svg>`,

  partevo: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="80" height="40" rx="4" fill="#455a64"/><text x="80" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">part by day</text>
  <path d="M130 50 H160" stroke="#ff8a50" stroke-width="2"/>
  <rect x="165" y="30" width="85" height="40" rx="4" fill="#e65100"/><text x="207" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">+ hour</text>
</svg>`,

  lakecp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="70" height="40" rx="4" fill="#e65100"/><text x="65" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">CP ok</text>
  <path d="M110 50 H150" stroke="#66bb6a" stroke-width="2"/>
  <rect x="155" y="30" width="95" height="40" rx="4" fill="#1b5e20"/><text x="202" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">lake commit</text>
</svg>`,

  tswm: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <line x1="40" y1="70" x2="240" y2="70" stroke="#455a64"/>
  <line x1="40" y1="40" x2="200" y2="40" stroke="#ef5350" stroke-width="3"/>
  <text x="140" y="30" text-anchor="middle" fill="#ef9a9a" font-size="10" font-family="sans-serif">watermark stuck</text>
</svg>`,

  tscp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="25" width="180" height="50" rx="8" fill="#b71c1c"/>
  <text x="140" y="48" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">CHECKPOINT FAIL</text>
  <text x="140" y="64" text-anchor="middle" fill="#ffcdd2" font-size="9" font-family="sans-serif">loop</text>
</svg>`,

  stateboom: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="60" y="55" width="40" height="20" fill="#42a5f5"/>
  <rect x="110" y="35" width="50" height="40" fill="#ff8a50"/>
  <rect x="170" y="15" width="60" height="60" fill="#ef5350"/>
  <text x="140" y="95" text-anchor="middle" fill="#ef9a9a" font-size="8" font-family="sans-serif">state size</text>
</svg>`,

  dbstorm: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="60" height="40" rx="4" fill="#e65100"/><text x="60" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">Flink</text>
  <path d="M95 40 H140" stroke="#ef5350" stroke-width="3"/><path d="M95 50 H140" stroke="#ef5350" stroke-width="3"/><path d="M95 60 H140" stroke="#ef5350" stroke-width="3"/>
  <rect x="150" y="25" width="100" height="50" rx="6" fill="#c62828"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif">DB 🔥</text>
</svg>`,

  restorm: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <path d="M80 30 A30 30 0 1 1 70 70" fill="none" stroke="#ef5350" stroke-width="4"/>
  <polygon points="68,65 60,80 80,72" fill="#ef5350"/>
  <text x="170" y="54" fill="#ef9a9a" font-size="11" font-family="sans-serif">restart storm</text>
</svg>`,

  sprestore: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="70" height="40" rx="4" fill="#1565c0"/><text x="65" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">savepoint</text>
  <path d="M110 50 H150" stroke="#ef5350" stroke-width="2"/>
  <rect x="155" y="30" width="90" height="40" rx="4" fill="#c62828"/><text x="200" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">uid fail</text>
</svg>`,

  latespike: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <path d="M40 70 L100 65 L140 20 L180 60 L240 55" fill="none" stroke="#ef5350" stroke-width="3"/>
  <text x="140" y="90" text-anchor="middle" fill="#ef9a9a" font-size="9" font-family="sans-serif">late event spike</text>
</svg>`,

  sqldup: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="80" height="25" rx="3" fill="#42a5f5"/><text x="80" y="42" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">agg v1</text>
  <rect x="40" y="55" width="80" height="25" rx="3" fill="#42a5f5"/><text x="80" y="72" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">agg v2</text>
  <text x="180" y="54" fill="#ef9a9a" font-size="10" font-family="sans-serif">append sink = dup</text>
</svg>`,

  slowcp: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="35" width="200" height="30" rx="4" fill="#37474f"/>
  <rect x="40" y="35" width="50" height="30" rx="4" fill="#ff8a50"/>
  <text x="140" y="80" text-anchor="middle" fill="#8b9bb8" font-size="9" font-family="sans-serif">CP duration long</text>
</svg>`,

  oom: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="60" y="20" width="160" height="60" rx="8" fill="#b71c1c"/>
  <text x="140" y="55" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">OOM</text>
</svg>`,

  clockskew: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="80" cy="50" r="25" fill="none" stroke="#42a5f5" stroke-width="2"/>
  <circle cx="180" cy="50" r="25" fill="none" stroke="#ef5350" stroke-width="2"/>
  <text x="80" y="54" text-anchor="middle" fill="#90caf9" font-size="9" font-family="sans-serif">now</text>
  <text x="180" y="54" text-anchor="middle" fill="#ef9a9a" font-size="9" font-family="sans-serif">future</text>
</svg>`,

  cdclag: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="70" height="40" rx="4" fill="#0d47a1"/><text x="75" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">DB</text>
  <path d="M120 50 H170" stroke="#ef5350" stroke-width="3" stroke-dasharray="6 3"/>
  <rect x="175" y="30" width="70" height="40" rx="4" fill="#e65100"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">lag</text>
</svg>`,

  compactlag: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="40" width="20" height="25" fill="#ef5350"/><rect x="55" y="35" width="20" height="30" fill="#ef5350"/><rect x="80" y="30" width="20" height="35" fill="#ef5350"/>
  <text x="180" y="54" fill="#ffcc80" font-size="10" font-family="sans-serif">compaction lag</text>
</svg>`,

  joinskeew: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="50" width="30" height="25" fill="#42a5f5"/>
  <rect x="100" y="30" width="30" height="45" fill="#42a5f5"/>
  <rect x="150" y="10" width="40" height="65" fill="#ef5350"/>
  <text x="170" y="90" text-anchor="middle" fill="#ef9a9a" font-size="8" font-family="sans-serif">join state skew</text>
</svg>`,

  jsoncpu: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="200" height="50" rx="8" fill="#0d1117" stroke="#ef5350"/>
  <text x="140" y="55" text-anchor="middle" fill="#ef9a9a" font-size="12" font-family="ui-monospace,monospace">{ ... } CPU</text>
</svg>`,

  timeattr: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="30" y="30" width="90" height="40" rx="4" fill="#c62828"/><text x="75" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">proctime</text>
  <rect x="160" y="30" width="90" height="40" rx="4" fill="#2e7d32"/><text x="205" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">event time</text>
</svg>`,

  vermis: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="30" width="70" height="40" rx="4" fill="#1565c0"/><text x="75" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">Flink a.b</text>
  <text x="140" y="54" fill="#ef5350" font-size="16" font-family="sans-serif">≠</text>
  <rect x="170" y="30" width="80" height="40" rx="4" fill="#c62828"/><text x="210" y="54" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif">conn x.y</text>
</svg>`,

  dataloss: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <circle cx="70" cy="50" r="12" fill="#42a5f5"/><circle cx="110" cy="50" r="12" fill="#42a5f5"/><circle cx="150" cy="50" r="12" fill="none" stroke="#ef5350" stroke-width="2" stroke-dasharray="3 2"/>
  <circle cx="190" cy="50" r="12" fill="#42a5f5"/>
  <text x="140" y="85" text-anchor="middle" fill="#ef9a9a" font-size="9" font-family="sans-serif">missing record</text>
</svg>`,

  joinmatrix: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="15" y="25" width="50" height="50" rx="4" fill="#1565c0"/><text x="40" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">lookup</text>
  <rect x="75" y="25" width="50" height="50" rx="4" fill="#6a1b9a"/><text x="100" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">temporal</text>
  <rect x="135" y="25" width="50" height="50" rx="4" fill="#e65100"/><text x="160" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">interval</text>
  <rect x="195" y="25" width="60" height="50" rx="4" fill="#c62828"/><text x="225" y="54" text-anchor="middle" fill="#fff" font-size="7" font-family="sans-serif">regular!</text>
</svg>`,

  cdcord: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="40" y="25" width="50" height="25" rx="3" fill="#66bb6a"/><text x="65" y="42" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">v2</text>
  <rect x="40" y="55" width="50" height="25" rx="3" fill="#ef5350"/><text x="65" y="72" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">v1 late</text>
  <text x="160" y="54" fill="#ffcc80" font-size="10" font-family="sans-serif">version guard</text>
</svg>`,

  lakeauth: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="50" y="25" width="180" height="50" rx="8" fill="#37474f" stroke="#ffcc80"/>
  <text x="140" y="48" text-anchor="middle" fill="#ffcc80" font-size="12" font-family="sans-serif">🔑 IAM / ACL</text>
  <text x="140" y="64" text-anchor="middle" fill="#b0bec5" font-size="9" font-family="sans-serif">least privilege</text>
</svg>`,

  sqle2e: `
<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" class="viz">
  <rect x="20" y="35" width="50" height="30" rx="4" fill="#1565c0"/><text x="45" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">in</text>
  <path d="M75 50 H105" stroke="#ff8a50" stroke-width="2"/>
  <rect x="110" y="30" width="60" height="40" rx="4" fill="#e65100"/><text x="140" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">SQL</text>
  <path d="M175 50 H205" stroke="#ff8a50" stroke-width="2"/>
  <rect x="210" y="35" width="50" height="30" rx="4" fill="#2e7d32"/><text x="235" y="54" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif">assert</text>
</svg>`,
};
