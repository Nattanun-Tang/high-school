---
name: educational-app-builder-pro
description: Build or modify polished interactive educational web apps from the bundled professional starter. Use when the user explicitly wants an educational web app, interactive learning experience, simulation, explorer, diagram, practice tool, quiz, timeline, game, or digital learning activity implemented as web files. Preserve the full-width shell (capped at 1920 px, no 16:9 letterbox), series visual system (landing type/image sizes, red app header, shared colors), protected content shell, and file architecture while allowing topic-specific creative layouts inside #appLayout. For mathematics, render notation with KaTeX. Do not trigger for requests that only ask for lesson ideas, question writing, explanations, or non-web educational content.
---

# Educational App Builder Pro

Build complete educational web apps from the bundled starter without asking a preliminary requirements questionnaire. Infer subject, level, language, and format from the user's request and conversation context. If a genuinely blocking implementation detail is absent, choose a sensible educational default and proceed; ask only when proceeding would create a materially different product or an unsafe/invalid result.

## Core Workflow

1. **Plan internally** — determine learning purpose, interaction model, information hierarchy, required states, and files before coding. Do not require a user-facing Ask step.
2. **Start from the bundled starter** — copy `assets/starter/` into the target project. Preserve the starter architecture and protected shell.
3. **Build** — edit `index.html` and `content.js`; create or replace `styles.css` and `script.js` for topic-specific presentation and behavior. Keep `base.css` as the shared foundation unless fixing a starter defect.
4. **Localize when requested** — Thai is the default. Add English or other languages only when the user asks or the project context requires them.
5. **Verify** — inspect layout, interaction states, keyboard use, mathematical rendering, overflow, responsive scaling, and console errors before handoff.

## File Structure

Use this structure for every generated app:

```text
project/
├── index.html      # edit: semantic structure, landing page, app shell
├── base.css        # preserve: shared starter foundation
├── content.js      # edit: user-visible learning content and localized strings
├── styles.css      # create/edit: app-specific layout and visual design
└── script.js       # create/edit: app-specific state and interaction logic
```

Keep reusable framework rules in `base.css`; keep topic-specific styling in `styles.css`; keep user-visible copy in `content.js`; keep interaction logic in `script.js`.

## Professional Starter

Always use `assets/starter/` as the starting point for a new app, then align shell styling with the **Series Visual System** in this skill (canonical values are those in project `base.css` after series customization: red accent, 72px landing titles, red app header, 56px white header title).

The series contains two views:

- **Landing page** — white background; red eyebrow + title (72px); one Start button; one right-side **image slot** (~660×720) that stays empty until the user names the image.
  - Line 1 (`.eyebrow` / `#landingEyebrow`): always **`INTERACTIVE MATHEMATICS`**
  - Line 2 (`.landing__title` / `#landingTitle`): the piece title (ชื่อชิ้นงาน)
  - Start CTA (`.landing__start` / `#startButton`): label **`เริ่ม`**
  - Cover image: **do not** pick, invent, generate, or wire a `src` unless the user explicitly says which file/path to use; keep the visual column reserved empty.
- **App page** — full-width white card on gray stage (width `min(1920px, 100vw)`, height fills the viewport); red header with white title only (**no** หน้าหลัก / `#homeButton`); protected content shell. Topic-specific learning UI belongs inside `#appLayout`.

Preserve the series visual hierarchy and accessibility behavior while adapting text and app content. Do not invent a second brand palette for sibling apps in the set.

Read `references/starter-contract.md` before modifying the starter architecture. Read the Series Visual System section before designing a new sibling app.

## Width Budget — Critical Layout Constraint

The design width is **1920 px** (`--canvas-w`). The shell is **full viewport width, capped at 1920** — do **not** letterbox to 16:9. That old aspect lock caused side gutters on non-16:9 screens.

| Shell property | Spec |
|---|---|
| Width | `min(calc(var(--canvas-w) * 1px), 100vw)` (= `min(1920px, 100vw)`) |
| Max width | `100%` |
| Height (default) | `100vh` / `100dvh` — fill the viewport so one-screen lessons still stretch via flex |
| Aspect ratio | `auto` — **never** lock to 1920/1080 |
| Centering | `margin: 0 auto` (side gutters only appear on ultrawide > 1920) |
| Overflow | `hidden` by default; tall lessons may unlock to `height: auto` + page scroll in their own `styles.css` |

Anything wider than 1920 px can be clipped by `.app-main-card { overflow: hidden }`. Design within these zones at the 1920 design width:

| Zone | x-range (design px) | Width |
|---|---:|---:|
| `.app-main-card` | 0 → 1920 | up to **1920 px** (or full `100vw` when narrower) |
| `.app-content` | 72 → 1848 | **1776 px** at full design width |
| Utility / floating-tool zone | 1759 → 1896 | reserve when a tall floating tool is present |

Rules:

1. Keep `.app-content#contentGrid` as the protected shell.
2. Never put topic-specific classes on `#contentGrid`; place them on `#appLayout` or descendants.
3. Never set `width: 100%` on `.app-content`. Its margins already define the 1776 px content budget.
4. `#appLayout` and descendants may use `width: 100%`; keep `#appLayout` at `max-width: 100%` and `box-sizing: border-box`.
5. Do not override `.app-content` margins unless the full inner-width budget is recalculated.
6. Put true edge-to-edge banners as siblings of `.app-content` inside `.app-main-card`, not as children.
7. When a floating utility is used, avoid placing tall right-aligned content in its reserved zone.
8. Do not reintroduce `aspect-ratio: 1920/1080` or a height formula of `100vw * 1080/1920` on `.app-main-card` — that recreates the side-gutter letterbox.
9. Prefer `width: min(calc(var(--canvas-w) * 1px), 100vw)` over bare `width: 100%` when overriding the shell, so ultrawide screens stay capped and centered.

## Protected Shell

Treat these as framework-owned unless fixing a starter defect:

- `.app-main-card`
- `#contentGrid.app-content`
- core view switching (`#landingPage`, `#appPage`)
- base responsive scaling behavior

Place generated learning content inside:

```html
<main id="contentGrid" class="app-content">
  <div id="appLayout" class="app-layout">
    <!-- topic-specific experience -->
  </div>
</main>
```

Do not attach topic classes to `#contentGrid`.

## Creative Freedom

There is **no required topic layout inside `#appLayout`**. Choose the interaction and composition that best supports the learning goal. Appropriate formats include practice, quiz, interactive diagram, explorer, timeline, simulator, builder, card explorer, game, challenge, visualization, or reference tool.

Prefer a learning sequence that makes the digital medium useful: expose relationships, allow meaningful manipulation, show immediate consequences, and provide feedback or progressive disclosure where it improves understanding. Do not add interaction merely for decoration.

## Learning-Experience Design

Before implementation, determine:

- the concept or skill the learner should understand or perform;
- the most important representation to make visible;
- what the learner can manipulate and what should remain fixed;
- likely misconceptions or failure states relevant to the requested topic;
- the shortest useful progression from orientation → interaction → feedback → consolidation.

Use these decisions to shape the interface. Do not force every app into quiz mechanics.

## Series Visual System — Keep Every App in the Same Family

When building a new piece in this series, **reuse the layout, type scale, colors, and image rules below**. Topic-specific UI may change inside `#appLayout`, but shell chrome (landing + app frame) must stay consistent so learners recognize the same product family.

Canonical tokens live in `base.css` (`:root` + landing/app shell). App-specific overrides go only in `styles.css`.

### Shared design tokens

| Token | Value | Role |
|---|---|---|
| Canvas width | **1920** (`--canvas-w`) | Max card width; height fills viewport (not a fixed 1080 lock) |
| `--font-ui` | `"TH Sarabun New", "Sarabun", Arial, sans-serif` | All UI / content text |
| `--ink` | `#18202a` | Primary body text |
| `--muted` | `#66717f` | Secondary / supporting text |
| `--line` | `#e4e8ed` | Dividers, light borders |
| `--surface` | `#ffffff` | Main card / panels |
| `--surface-soft` | `#f5f7f9` | Soft panel fill |
| `--accent` | `#e71312` | Brand / CTA (series red) |
| `--accent-hover` | `#c40f0e` | CTA hover |
| `--focus` | `#0b57d0` | Focus ring only |
| Body base | **36px** / line-height **1.45** | Default Thai UI / description / content text on canvas |
| Page backdrop (outside card) | `#eef1f4` (body), `#e9edf1` (`.app-page`) | Gray stage behind the white card |

Do not switch the series to blue accent, cream/serif themes, or dark mode unless the user explicitly requests a different brand system.

### 1) Landing page — layout, type, image

**Layout**

| Element | Spec |
|---|---|
| `.landing` | Full viewport, centered; padding **48px**; background **`#ffffff`** (flat white — no gradient wash) |
| `.landing__frame` | Width `min(1660px, 100%)`; min-height `min(820px, calc(100vh - 96px))`; **2 columns**: `minmax(0, 1fr) minmax(280px, 0.95fr)`; gap `clamp(32px, 5vw, 88px)`; align center |
| Copy column | Max-width **820px**; title block centered within the copy column |
| Visual column | Flex-centered; **always reserve** this column at the landing image size even with no `src` yet; add `.landing__visual--empty` only when the user has not assigned an image, or when a chosen image fails to load |

**Typography & color**

| Element | Size | Weight | Color |
|---|---:|---:|---|
| `.eyebrow` | **72px** | 700 | `--accent` `#e71312` |
| `.landing__title` | **72px** | 700 | `--accent` `#e71312` |
| `.landing__start` (Start CTA) | **36px** | 700 | white on `--accent` |

Eyebrow + title share the same size/color so the brand line and lesson title read as one lockup. Keep eyebrow `white-space: nowrap` on desktop; allow wrap under 1100px.

**Landing copy contract (required)**

| Line | Element | Copy |
|---|---|---|
| 1 | `#landingEyebrow` / `.eyebrow` | Fixed: **`INTERACTIVE MATHEMATICS`** |
| 2 | `#landingTitle` / `.landing__title` | Piece title (ชื่อชิ้นงาน) from the brief |
| CTA | `#startButton` | Fixed: **`เริ่ม`** |

Do not put subject/level meta chips, a description paragraph, or alternate CTA wording on the landing unless the user explicitly asks. Mirror these strings in `content.js` (`landing.eyebrow`, `landing.title`, `landing.start`).

**CTA button**

- Class: `.primary-button.landing__start`
- Label: **`เริ่ม`**
- Min size: **158×58**; padding `10px 36px`; radius **12px**
- Margin-top under title block: **42px**

**Landing image (cover) — reserve first; fill only on user order**

Default: leave the right-side cover slot **empty but sized**. Do not choose, invent, generate, download, or hard-code a cover image while building. Wait until the user explicitly names the file (e.g. `assets/picture/foo.png`) or otherwise instructs which image to use.

| Rule | Value |
|---|---|
| Markup | Keep `<img class="landing__visual-image" width="660" height="720" alt="…">` in the visual column |
| Before user assigns an image | Omit `src` (or leave blank); keep the visual column present and sized; mark `.landing__visual--empty` so layout still holds the ~660×720 slot |
| After user assigns an image | Set `src` to the path they gave; remove `.landing__visual--empty` once it loads |
| Intrinsic / authoring size | Prefer **~660×720** (or same aspect) under `assets/picture/` when a file is provided |
| Display | `width: 100%`; `height: auto`; `object-fit: contain` |
| Max height | `min(900px, calc((100vh - 96px) * 1.25))` |
| ≤1100px | Max height **525px**; stack to single column |
| Behavior | `user-select: none`; `pointer-events: none`; on load error → hide image and mark visual empty (slot still reserved) |

Do **not** auto-pick a starter/default cover, stock photo, or AI-generated image to “fill the gap.” Keep one reserved visual slot on the right; do not add card stacks, floating badges, or decorative gradient blobs on the landing.

### 2) App / working page — frame, header, content chrome

**Outer frame**

| Element | Spec |
|---|---|
| `.app-page` | Centered grid; background **`#e9edf1`**; min-height 100vh / 100dvh |
| `.app-main-card` | Full-width shell capped at 1920; `overflow: hidden`; background `--surface` `#ffffff` |
| Width formula | `min(calc(var(--canvas-w) * 1px), 100vw)` — **no** 16:9 / aspect letterbox |
| Height formula | `100vh` / `100dvh` by default; tall lessons may set `height: auto` + scroll in `styles.css` |

**Header bar**

| Property | Value |
|---|---|
| Min height | **104px** |
| Padding | **18px 72px** |
| Background | **`rgba(220, 53, 69, 0.96)`** (series red header) |
| Border | Bottom `1px solid var(--line)` |
| Title `.app-header__title` | **56px**, weight inherited/bold, color **`#ffffff`**, line-height **1.1** |
| Header actions | **None** — omit `#homeButton` / หน้าหลัก and any secondary header buttons |

Do not revert the header to white/neutral unless the user asks; the red header is part of the series identity. The app header shows the title only; do not add a home/back button unless the user explicitly requests one.

**Content shell (protected)**

| Zone | Spec |
|---|---|
| `.app-content` margins | **16px 72px 24px** → usable width **1776px** inside 1920 |
| `#appLayout` | `width/max-width: 100%`; `height: 100%`; flex column; `box-sizing: border-box` |
| Topic UI | Only inside `#appLayout` — never classes on `#contentGrid` |

**In-app type scale (recommended defaults for series tools)**

Use CSS variables on the app root so sizes stay consistent across topics:

| Role | Token / size | Typical color |
|---|---|---|
| Thai UI labels, instructions, descriptions, body content | `--ui-size: 36px` | `#2f3b4a` or `--ink` |
| Math letters / symbols (KaTeX) | `--math-size: 33.88px` | `#2f3b4a` / `--ink` |
| Drag tokens / chips | `--token-size: 56px` (font = UI size) | `--ink` on white |
| Panel titles (Thai) | **36px** / 700 | `#2f3b4a` |
| Soft instruction callout (Thai) | **36px** / 700 | `#000` on white panel |

**Default content sizing (required unless the user specifies otherwise)**

| Kind of text | Default size | Notes |
|---|---:|---|
| Thai descriptions, labels, hints, buttons, and other non-math content | **36px** | Use `--ui-size` / body base; do not default to 32px |
| Mathematical letters, symbols, and formulas | **33.88px** (KaTeX) | Use `--math-size`; render with KaTeX, not plain Unicode |

**In-app surfaces (neutral tool chrome — reuse across series)**

| Surface | Background | Border |
|---|---|---|
| Sidebar / control rail | `#e9eef2` | `#c8d0d8` |
| Nested white panels (banks, inputs) | `#fff` | `#9aa6b4` or `#c8d0d8` |
| Diagram / stage area | `#f4f6f8` | `#7f8b99` |
| Feedback strip | `#f3f6ff` | `#d7e1ff` |
| Active segmented control | `#b7d4f5` | inherits segment border |
| Control radius | **8px** (tools); tokens **10px** | — |

Topic colors for diagrams may vary, but keep borders/fills in this cool-neutral family so apps feel like one series.

**Standard refresh / reset icon button (reuse across series)**

Use this whenever a diagram, canvas, or stage needs a clear/reset control in the corner (typically top-right of the stage). Keep hit target and icon size identical so tools feel consistent.

| Part | Spec |
|---|---|
| Button size | **48×48px** (`width` / `height`) |
| Icon (SVG) size | **24×24px** |
| SVG `viewBox` | `0 0 24 24` |
| Placement | Absolute; **top 14px**, **right 14px** of the stage/frame |
| Padding | **0** |
| Border | `1px solid #9aa6b4` |
| Radius | **8px** |
| Background | `#fff` |
| Icon / text color | `#2f3b4a` (`currentColor`) |
| Hover | border `#5e6b78`; background `#f5f7f9` |
| Stroke (glyph) | **2.2**; `round` caps/joins |
| Accessibility | `aria-label` + `title` (Thai); SVG `aria-hidden="true"` |

Suggested markup pattern:

```html
<button class="stage-reset" type="button" aria-label="ล้าง" title="ล้าง">
  <svg class="stage-reset__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M21 12a9 9 0 1 1-3-6.7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 3v6h-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>
```

```css
.stage-reset {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1px solid #9aa6b4;
  border-radius: 8px;
  background: #fff;
  color: #2f3b4a;
}
.stage-reset:hover {
  border-color: #5e6b78;
  background: #f5f7f9;
}
.stage-reset__icon {
  width: 24px;
  height: 24px;
  display: block;
}
```

Do not invent alternate refresh-button sizes (e.g. 32/40/56) unless the user explicitly requests a different control scale.

**Standard info / meaning icon button (reuse across series)**

Use this whenever the toolbar or app chrome needs an info control that opens definitions, meaning, or help (typically labeled **ความหมาย**). Prefer a filled circular **i** glyph — not an SVG outline circle — so the control reads as the series info affordance.

| Part | Spec |
|---|---|
| Button size | **48×48px** (`width` / `height`) |
| Padding | **0** |
| Border | **none** |
| Radius | **50%** (circle) |
| Background | `#1f1f1f` |
| Hover background | `#333` |
| Glyph color | `#fff` |
| Glyph character | lowercase **`i`** inside `.info-btn__glyph` |
| Glyph font | `Georgia, "Times New Roman", serif` |
| Glyph size | **28px**; weight **700**; style **italic**; `line-height: 1` |
| Layout | `display: grid; place-items: center`; `flex: 0 0 auto` when in a toolbar row |
| Accessibility | `aria-label` + `title` (Thai, e.g. ความหมาย); glyph `aria-hidden="true"` |

Suggested markup pattern:

```html
<button id="infoBtn" class="info-btn" type="button" aria-label="ความหมาย" title="ความหมาย">
  <span class="info-btn__glyph" aria-hidden="true">i</span>
</button>
```

```css
.info-btn {
  width: 48px;
  height: 48px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #1f1f1f;
  color: #fff;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}
.info-btn:hover {
  background: #333;
}
.info-btn__glyph {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
  font-weight: 700;
  font-style: italic;
  line-height: 1;
}
```

Do not replace this with a bordered white square, Lucide/`ⓘ` emoji, or alternate sizes unless the user explicitly requests a different control.

**Toolbar category / method `<select>` (no focus highlight border)**

When the toolbar uses a category, topic, or method dropdown (e.g. `#categorySelect` / `.category-select`, or equivalent `.method-select` / `.logic-select`), **do not show a focus highlight border** (no `outline`, no focus `box-shadow`, and no thicker/colored focus border from `base.css` `select:focus-visible`). Keep the control’s resting border on `:focus` / `:focus-visible`; hover may still change background or border color.

```css
.category-select:focus,
.category-select:focus-visible {
  outline: none;
  box-shadow: none;
}
```

**Standard modal / popup close button (reuse across series)**

Use this for every dialog, definition popup, formulas sheet, or overlay card that needs a dismiss control. Keep the red circular **×** identical so learners recognize the same close affordance in every piece. Prefer the shared rule in `base.css` (`.modal__close`) rather than redefining per app.

| Part | Spec |
|---|---|
| Class | `.modal__close` |
| Button size | **44×44px** (`width` / `height`) |
| Placement | Absolute on `.modal__card`; **top 14px**, **right 14px**; `z-index: 2` |
| Padding | **0** |
| Border | **none** |
| Radius | **50%** (circle) |
| Background | `--accent` `#e71312` |
| Hover background | `--accent-hover` `#c40f0e` |
| Glyph | **`×`** / `&times;` (not an SVG or emoji) |
| Glyph color | `#fff` |
| Glyph size | **32px**; weight **700**; `line-height: 1` |
| Layout | `display: grid; place-items: center` |
| Accessibility | `type="button"`; `aria-label="ปิด"` (or localized equivalent) |

Suggested markup pattern:

```html
<div class="modal__card" role="dialog" aria-modal="true" aria-labelledby="defModalTitle">
  <button id="defCloseBtn" class="modal__close" type="button" aria-label="ปิด">&times;</button>
  <!-- title + body -->
</div>
```

```css
.modal__close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}
.modal__close:hover {
  background: var(--accent-hover);
}
```

Do not use a transparent/ghost ×, a gray square close, or Lucide/`✕` icon variants unless the user explicitly requests a different control. Parent `.modal__card` must be `position: relative` so the close button anchors to the card corner.

**Step navigation buttons — Prev / Next (and All when present)**

Use this pattern whenever the app reveals a multi-step proof, worked example, or progressive disclosure with **ก่อนหน้า** / **ถัดไป** (and optional **ทั้งหมด**). Keep disable logic and colors consistent so learners can tell at a glance which actions are available.

**Disable rules (required)**

Drive `disabled` from app state on every render (e.g. `updateButtons()`). Do not leave buttons clickable when the action is a no-op.

| Button | Disable when |
|---|---|
| **ก่อนหน้า** (`#prevBtn`) | no property selected, **or** show-all mode is on, **or** `step <= 0` (at the start / nothing revealed yet) |
| **ถัดไป** (`#nextBtn`) | no property selected, **or** show-all mode is on, **or** `step >=` last step (all lines already shown) |
| **ทั้งหมด** (`#allBtn`, if used) | no property selected only — stays enabled while a property is selected so the learner can toggle show-all on/off |

Also guard click handlers (`goPrev` / `goNext`) with the same conditions so keyboard or race clicks cannot advance past bounds. Reset `step` to `0` and clear show-all when the learner changes category or property.

**Color / visual states (required)**

Prev and Next must share the same accent look as **ทั้งหมด** when enabled. Color is controlled by CSS via the native `:disabled` state — do not swap classes manually for gray vs red.

| State | Background | Border | Text | Notes |
|---|---|---|---|---|
| Enabled (`.proof-btn--accent`) | `--accent` `#e71312` | `--accent` | `#ffffff` | Red fill, white label — same as All |
| Hover (enabled only) | `--accent-hover` `#c40f0e` | `--accent-hover` | `#ffffff` | Use `:hover:not(:disabled)`; slight lift optional |
| Disabled (`:disabled`) | `--btn-disabled-bg` `#d7dde4` | `#b7c0c8` | `--btn-disabled-fg` `#7a8490` | Gray fill/label; `cursor: not-allowed`; no hover lift |

Suggested tokens (app-scoped):

```css
--btn-disabled-bg: #d7dde4;
--btn-disabled-fg: #7a8490;
```

```css
.proof-btn--accent {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.proof-btn--accent:hover:not(:disabled) {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}
.proof-btn:disabled {
  background: var(--btn-disabled-bg);
  border-color: #b7c0c8;
  color: var(--btn-disabled-fg);
  cursor: not-allowed;
}
```

Do not leave Prev/Next in the neutral gray “base” button style when they are enabled; enabled must read as the series red CTA. Do not invent a second disabled palette for these controls.

### Typography (font stack)

Use **TH Sarabun New** as the primary general-purpose font for Thai and Latin interface/content text:

```css
font-family: "TH Sarabun New", "Sarabun", Arial, sans-serif;
```

Load a web fallback when needed, e.g. Google Fonts `Sarabun` 400/700. Do not bundle or redistribute proprietary font files in this skill. Prefer the series sizes above over one-off per-element sizes; reuse roles (`eyebrow`, title, UI, math) instead of inventing new scales.

Default in-app Thai copy (คำอธิบาย ป้ายกำกับ คำใบ้ เนื้อหาในแอป) to **36px**. Default mathematical letters/symbols rendered with KaTeX to **33.88px**. Landing/header display sizes (72px / 56px) stay as specified in the landing and app-header tables.

## Mathematics — KaTeX

For mathematics, use **KaTeX** for mathematical notation. Use `$...$` for inline math and `$$...$$` for display math when using auto-render. After dynamically injecting content containing LaTeX, render the affected container again.

Default KaTeX size for letters, symbols, and formulas in app content is **33.88px** (`--math-size: 33.88px`). Apply that size to `.katex` / math containers so math sits optically next to 36px Thai text.

Keep mathematical semantics separate from presentation. Do not fake equations with plain-text Unicode when proper notation is needed. Provide accessible text context around formulas.

### Logic notation — even spacing around connectives (required for logic apps)

When rendering propositional / predicate logic with KaTeX, **normalize operator spacing** so binary connectives have equal left/right gaps and negation does not steal relation spacing.

**Why:** KaTeX treats bare `\sim` as a relation (`\mathrel`), so forms like `p \equiv \sim q` get uneven gaps. Binary connectives also need consistent bin spacing across proof lines, formula lists, and reasons.

**LaTeX rewrite (apply before KaTeX render; keep idempotent)**

| Symbol | Raw | Normalized | Role |
|---|---|---|---|
| biconditional | `\leftrightarrow` | `\mathbin{\leftrightarrow}` | binary |
| implication | `\rightarrow` | `\mathbin{\rightarrow}` | binary |
| conjunction | `\land` | `\mathbin{\land}` | binary |
| disjunction | `\lor` | `\mathbin{\lor}` | binary |
| equivalence | `\equiv` | `\mathbin{\equiv}` | binary |
| negation | `\sim` | `{\sim}` | ordinary (Ord), **not** relation |

Rules:

1. Replace **longer** command names first (`\leftrightarrow` before `\rightarrow`) so partial matches do not break.
2. Use negative lookbehind / word-boundary guards so re-running the formatter does not nest wrappers (`\mathbin{\mathbin{…}}` or `{{\sim}}`).
3. Apply the same formatter to **all** logic math surfaces: proof expressions, reasons, conclusions, formula modals, prompts — not only the main equation column.
4. For mixed Thai + `$...$` copy, rewrite each `$...$` fragment; leave Thai text untouched.
5. Author content may stay as bare `\land`, `\sim`, etc.; normalize at render time (or store already-normalized strings — either is fine if idempotent).

Suggested helper:

```javascript
/** Even spacing for logic connectives; treat \\sim as negation (not a relation). Idempotent. */
function formatLogicLatex(latex) {
  if (!latex) return "";
  return String(latex)
    .replace(/(?<!\\mathbin\{)\\leftrightarrow/g, "\\mathbin{\\leftrightarrow}")
    .replace(/(?<!\\mathbin\{)\\rightarrow/g, "\\mathbin{\\rightarrow}")
    .replace(/(?<!\\mathbin\{)\\land/g, "\\mathbin{\\land}")
    .replace(/(?<!\\mathbin\{)\\lor/g, "\\mathbin{\\lor}")
    .replace(/(?<!\\mathbin\{)\\equiv(?![a-zA-Z])/g, "\\mathbin{\\equiv}")
    .replace(/(?<!\{)\\sim(?![a-zA-Z])/g, "{\\sim}");
}

function formatInlineMathText(text) {
  return String(text || "").replace(/\$([^$]+)\$/g, (_, latex) => "$" + formatLogicLatex(latex) + "$");
}
```

**Optional CSS equalizer** (use when KaTeX still inserts asymmetric `\mspace` around bins):

```css
/* Equal left/right gaps on binary ops (∼ kept as Ord via {\sim}) */
.logic-math .katex .mspace {
  margin-right: 0 !important;
}
.logic-math .katex .base > .mbin {
  padding-left: 0.3em;
  padding-right: 0.3em;
}
```

Scope the CSS to the containers that show logic formulas (e.g. formula lists, proof reasons, conclusions). Do **not** force relation padding on nested `{\sim}` — wrapping as Ord already keeps negation tight to its operand.

Do not use plain Unicode `∧ ∨ → ↔ ≡ ∼` as the primary display when KaTeX is available; keep semantic LaTeX and normalize spacing as above.

Read `references/math-katex.md` when building a mathematics app.

## Interaction and State

Keep app state explicit and predictable. Prefer small named functions for state transitions and rendering. Separate data/content from DOM rendering. Avoid global mutation except for the intentionally shared `window.CONTENT` content object.

For custom controls, implement normal, hover, active/selected, disabled, and `:focus-visible` states. Support keyboard interaction wherever the control has a keyboard-equivalent semantic. Exception: toolbar category/method `<select>` controls must **not** show a focus highlight border (see **Toolbar category / method `<select>`** under Series Visual System).

When the app uses step navigation (**ก่อนหน้า** / **ถัดไป**), follow the disable rules and accent/disabled colors in **Step navigation buttons** under Series Visual System. Sync `disabled` after every state change that affects `step` or show-all.

When the app uses a modal, definition popup, or formulas overlay, use the **Standard modal / popup close button** (`.modal__close` — red circular × from `base.css`). Do not invent a ghost or gray close control.

## Responsive Behavior

Treat **1920 px** as the design width (content budget), not a fixed TV-sized card. The shell fills the viewport width up to 1920 and the viewport height by default — no 16:9 letterboxing. Preserve the inner 1776 px content budget at desktop scale and adapt layouts for smaller screens. Allow multi-column learning layouts to collapse cleanly. Prevent horizontal clipping, text collisions, inaccessible controls, and off-screen dialogs. Tall content may unlock card height and use page scroll rather than forcing everything into 1080 px.

## Code Quality Contract

Deliver production-minded code:

- Complete working implementation; no placeholders, TODO comments, dead controls, or incomplete functions. Exception: the landing cover image may intentionally omit `src` and stay an empty reserved slot until the user names the image.
- Sanitize user-provided data; prefer `textContent` over `innerHTML` for user data.
- Use semantic HTML and meaningful ARIA labels.
- Ensure keyboard navigation and visible focus states.
- Maintain WCAG AA color contrast for essential text and controls.
- Keep controls comfortably targetable and responsive.
- Avoid browser-default-looking controls; style controls consistently with the starter's neutral visual language.
- Avoid unnecessary dependencies. Load external libraries only when they materially support the learning experience.
- Handle empty, invalid, boundary, and repeated-input states.
- Keep console free of uncaught errors and missing-resource failures.
- Verify layout at full design width (1920, or `100vw` when narrower) and at smaller responsive widths; confirm there are no false side gutters from an aspect lock.
- For dynamic visualizations, keep labels, legends, mathematical values, and interaction feedback synchronized with state.

## Verification Checklist

Before handoff, verify:

- landing page transitions to the app correctly;
- landing line 1 is `INTERACTIVE MATHEMATICS`, line 2 is the piece title, CTA is `เริ่ม`;
- landing uses series type (72px red eyebrow/title), white background, and image-slot sizing rules; cover `src` is set only when the user named an image, otherwise the right slot stays empty/reserved;
- app card is full-width up to 1920 (`min(1920px, 100vw)`), viewport-tall by default, with red header and white ~56px title — **not** a 16:9 letterboxed card;
- app header has no หน้าหลัก / `#homeButton`;
- shared color tokens (`--accent`, `--ink`, surfaces) match the series;
- `#contentGrid` remains only the protected `app-content` shell;
- topic-specific classes live inside `#appLayout`;
- the right edge is not clipped at full design width;
- smaller widths reflow without horizontal overflow;
- all controls have complete states and keyboard access;
- if step nav is present: Prev/Next are red+white when enabled and gray when disabled; Prev is disabled at step 0 / show-all, Next at last step / show-all;
- user input is validated;
- all visible text is final, not placeholder copy;
- in-app Thai description/content text defaults to **36px** and KaTeX math to **33.88px**;
- KaTeX renders all math correctly when mathematics is present;
- if logic notation is present: connectives use even bin spacing (`\mathbin{…}`), `\sim` is Ord (`{\sim}`), and gaps look equal on both sides of each operator;
- no console errors or missing assets remain.

## Optional Skill Composition

Use specialized reusable skills/components when the user explicitly needs them instead of rebuilding shared tools. For example, if a calculator skill is available and the user requests an on-screen calculator, integrate that reusable calculator rather than creating a new calculator implementation. Keep specialized tools independent from topic-specific `script.js` where practical.

## References

- `references/starter-contract.md` — starter architecture, landing page, protected shell, and responsive contract.
- `references/math-katex.md` — KaTeX loading and dynamic-rendering pattern for mathematics.
- `assets/starter/` — professional subject-neutral starter files to copy into new projects.
