<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project Rules & Architecture Guardrails

- **Local Assets Integrity**: Keep bookstore cover images as local imported project assets in `src/assets/*.webp`, not Lovable-hosted CDN URLs, so they remain available in self-hosted builds and offline environments.
- **Mobile-First UX**: Design and test specifically for mobile viewports (minimum 390px iPhone viewport standard). Tap targets must be at least 44px × 44px.
- **Accessibility (A11y)**: Maintain focus traps, keyboard navigation (`Escape`, `Tab`), ARIA labeling, and color contrast standards (`#0c2b22` Deep Emerald, `#c9a35c` Artisan Gold, `#f4efe0` Warm Parchment).
- **Core Rules**: Refer to [CLAUDE.md](file:///home/rofeeq/Documents/LearnX/alfurqaan/CLAUDE.md) and [GEMINI.md](file:///home/rofeeq/Documents/LearnX/alfurqaan/GEMINI.md) for overarching engineering mindset, task sizing triage, and testing standards.
