# Motion Specification: Tirumala Engineering College (TEC) Emblem

## Phase 1 — Brand Motion Brief

### 1. Motion Personality
- **Prestigious**: Institutional gravitas, academic dignity, and established excellence (AICTE approved, NAAC & NBA accredited).
- **Engineered**: Precision timing, calibrated mechanical rotation, and crisp alignment reflecting technical education and engineering discipline.
- **Fluid**: Seamless, de Casteljau cubic transitions, gentle light sweep, and natural ease-out settle with zero visual stutter or mechanical speed cliffs.

### 2. Usage Context
- **Primary Hero Loading Experience**: 1800ms orchestrated brand reveal on initial website entry.
- **Micro / Subpage Transition**: Lightweight circular emblem breath/sweep indicator for route transitions.
- **Final Frame Contract**: Lands seamlessly and with 100% geometric and chromatic accuracy on the official college emblem.
- **Reduced Motion Fallback**: Immediate static display with gentle fade-in for users with `prefers-reduced-motion: reduce`.

### 3. Semantic Actor Inventory
| Element ID | Role | Geometry / Asset |
|---|---|---|
| `#ambient-glow` | Subtle collegiate navy & warm gold ambient aura | Radial gradient overlay |
| `#outer-calibration-ring` | Technical precision guide ring (anticipation) | Vector circle `r="496"`, stroke `#C59B27`, `pathLength="1"` |
| `#outer-seal-ring` | Bold official crimson boundary seal | Vector circle `r="494"`, stroke `#D20057`, `pathLength="1"` |
| `#gear-assembly` | Red engineering gear & sacred Tirumala temple sanctum | Vector gear with mechanical teeth centered at `(502, 267)` |
| `#tec-monogram` | Sculptural royal sapphire "T E C" letters | Center monogram with bevel highlights centered at `(491, 559)` |
| `#college-name` | "TIRUMALA ENGINEERING COLLEGE" | Crimson arched upper typography |
| `#flourishes` | Classical filigree acanthus scrollwork | Symmetrical lower flourishes |
| `#college-motto` | "TECHNOLOGY • EXCELLENCE • COMMITMENT" | Crisp black lower arched motto |
| `#shimmer-sweep` | Soft specular light glint | Angled linear gradient mask |

---

## Phase 2 — Geometry & Vector Fidelity

- **Coordinate System**: SVG `viewBox="0 0 1024 1024"`.
- **Center**: Master circle center at `(512, 512)`.
- **Fidelity Gate**: The emblem artwork strictly preserves the authentic Tirumala Engineering College seal:
  - Intricate red gear containing the Tirumala Tirupati temple gopuram and arch.
  - Distinctive sculpted sapphire-blue "TEC" letterforms with inner scroll terminals.
  - Exact crimson (`#D20057`) and royal navy (`#0B2545`) collegiate color palette.
  - Crisp typographical alignment along concentric arc radii.

---

## Phase 3 — Choreography & Disney's 12 Principles

### Timeline Structure (Golden Ratio 20 : 50 : 30)
- **Total Duration**: 1800ms
- **Anticipation (0ms – 360ms = 20%)**:
  - Soft collegiate aura breathes outward.
  - Precision gold calibration ring sweeps 360° with draw-on stroke.
- **Action (360ms – 1260ms = 50%)**:
  - Crimson outer seal ring draws on (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Engineering gear rotates 25° clockwise into locked mesh alignment (`cubic-bezier(0.25, 1, 0.5, 1)`).
  - TEC Monogram lifts 10px and expands with subtle elastic overshoot (`cubic-bezier(0.34, 1.25, 0.64, 1)`).
  - Specular light-sweep glides diagonally across the monogram between 800ms and 1300ms.
  - College title and motto fade in with tracking settling from `0.06em` to normal.
- **Settle & Follow-Through (1260ms – 1800ms = 30%)**:
  - Delicate golden resonance pulse expands and dissolves into opacity 0.
  - All elements lock cleanly into the final resting geometry.
  - Zero residual motion; complete stillness achieved at 1800ms.

### Literal Easing Tokens Applied
```css
/* Note: Literal values used in keyframes to prevent Chromium var() degradation */
--ease-anticipation: cubic-bezier(0.4, 0, 0.2, 1);
--ease-seal-draw: cubic-bezier(0.16, 1, 0.3, 1);
--ease-gear-lock: cubic-bezier(0.22, 1, 0.36, 1);
--ease-monogram-lift: cubic-bezier(0.34, 1.2, 0.64, 1);
--ease-settle: cubic-bezier(0.25, 1, 0.5, 1);
```
