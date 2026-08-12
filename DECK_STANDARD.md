# Pocket Deck Standard v1

다섯 덱은 학습 데이터 원본을 유지하고, `shared/deck-standard.js`의 런타임 정규화와
`shared/deck-standard.css`의 공통 모바일 표현 계층을 사용한다. 새 덱은 아래 정본을 직접 따른다.

## 카드 스키마

```js
{
  id, number,
  nameEn, nameKo,
  type, chapter,
  rank, rankKind,       // rankKind: "rarity" | "level"
  atk, def,
  effect, flavor,
  attrs, icon,
  visual, diagramNodes, snippet,
  detail, code, lang
}
```

- Kafka의 `titleEn/titleKo`, `category`, `stats`, `concept`, `quote`, `tags`는 앱 시작 시 위 필드로 변환한다.
- `rarity`와 `level`은 의미가 다르므로 억지로 한쪽에 맞추지 않고 `rank`로 읽는다. 원본 필드는 호환을 위해 보존한다.
- 렌더링 문자열은 `DeckStandard.escapeHtml()`을 거쳐야 한다.

## 화면과 UX

- 사용자에게 보이는 탭 이름은 `카드 / 목록 / 순서`로 통일한다.
- 내부의 기존 `viewer/dex/path`와 `card/library/path` ID는 데이터 손상 위험을 줄이기 위해 호환한다.
- 모든 덱은 카드 뒤집기, 이전/다음, 랜덤, 스와이프, 키보드, 진도 저장, 목록, 학습 순서를 제공한다.
- 키보드는 `←/→` 이동, `Space/Enter` 뒤집기, `R` 랜덤을 사용한다.
- 상세와 코드 영역을 스크롤하는 동작은 카드 뒤집기나 스와이프로 처리하지 않는다.

## 모바일 레이아웃

- 앱 최대 너비: `430px`
- 카드 너비: `340px` 이하
- 카드 높이: `400px`–`520px`
- 카드 모서리: `18px`
- 세로 공간이 짧거나 가로 화면이면 카드를 잘라내지 않고 문서 자체를 세로 스크롤한다.
- 긴 제목·통계·노드명은 줄바꿈하고, 목록 제목은 두 줄 말줄임을 적용한다.
- 상세 설명은 내부 세로 스크롤, 코드는 내부 가로·세로 스크롤을 허용한다.

## 테마

공통 구조색은 `--deck-bg`, `--deck-panel`, `--deck-panel-soft`, `--deck-text`,
`--deck-muted`를 사용한다. 덱별 차이는 `--deck-accent`, `--deck-accent-soft`,
`--deck-accent-rgb`로 제한한다.

| 덱 | 강조색 |
| --- | --- |
| Flink | `#e65100` |
| Kafka | `#2b7fff` |
| Kubernetes | `#326ce5` |
| PostgreSQL | `#52b4e8` |
| Redis | `#d82c20` |

## 다이어그램

표현 방식은 하나로 강제하지 않고 다음 우선순위를 사용한다.

1. 카드별 SVG/HTML 시각 자료
2. `diagramNodes` 데이터 기반 자동 렌더
3. 코드 또는 `snippet` fallback

이 방식이면 시각 자료가 많은 Flink·Redis의 자산을 잃지 않으면서 새 덱은 가벼운 데이터 기반 렌더를 사용할 수 있다.

## 저장과 캐시

- 저장 키: `tech-pocket-decks:<deck>:v1`
- 저장 값: `{ index, seen: string[] }`
- 예전 저장 키는 최초 로드 때 새 키로 자동 이관한다.
- 정적 자산 URL에는 배포 버전 쿼리를 붙여 GitHub Pages와 모바일 브라우저 캐시를 무효화한다.
