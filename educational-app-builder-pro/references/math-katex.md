# Mathematics with KaTeX

Use KaTeX for mathematical notation in mathematics apps.

## Recommended head includes

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
```

Pin a tested version in production projects. If the target environment must work offline, vendor the approved KaTeX distribution in the project instead of relying on a CDN.

## Rendering helper

```javascript
function renderMath(root = document.body) {
  if (typeof renderMathInElement !== 'function') return;
  renderMathInElement(root, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ],
    throwOnError: false
  });
}
```

Call `renderMath(container)` after dynamic content containing LaTeX is inserted.

Prefer semantic surrounding text and labels. Do not use KaTeX as a substitute for accessible instructions or meaningful control labels.

## Logic connectives — even operator spacing

For propositional logic, normalize LaTeX **before** KaTeX render so binary connectives have equal left/right gaps and negation is not typeset as a relation.

| Raw | Normalized |
|---|---|
| `\leftrightarrow` | `\mathbin{\leftrightarrow}` |
| `\rightarrow` | `\mathbin{\rightarrow}` |
| `\land` | `\mathbin{\land}` |
| `\lor` | `\mathbin{\lor}` |
| `\equiv` | `\mathbin{\equiv}` |
| `\sim` | `{\sim}` |

- Replace `\leftrightarrow` before `\rightarrow`.
- Keep the rewrite idempotent (negative lookbehind / identifier guards).
- Apply to every logic math surface (expressions, reasons, conclusions, formula lists).
- Optional CSS: zero `.mspace` margin-right and set `.mbin` padding to `0.3em` left and right inside logic formula containers.

See **Logic notation — even spacing around connectives** in `SKILL.md` for the full helper and CSS pattern.
