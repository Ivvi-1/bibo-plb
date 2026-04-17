# BIBO PLB — v1 design backup (2026-04-17)

This folder preserves a snapshot of the first design iteration of the
BIBO PLB landing, captured right before it was replaced at the site
root by the v2 (neural-net constellation) design.

## What's here

- `src/components/` — the original Navbar / Hero / About / ValueProps /
  Models / Products / Process / Trust / ContactForm / Footer components
  used by the v1 page.
- `src/app/locale/page.tsx` — the original `/[locale]/page.tsx` that
  composed the v1 sections.
- `messages/en.json`, `messages/ru.json`, `messages/uk.json` — full
  localization files including the v1 keys (`nav`, `hero`, `about`,
  `value`, `models`, `products`, `process`, `trust`, `contact`,
  `footer`) alongside the v2 `p2.*` keys.

## Related git history

Last commit containing the v1 design at the site root:
see `git log -- src/app/[locale]/page.tsx` before the v2 migration
commit. Git history remains the authoritative source of truth — this
folder is a convenience snapshot.

## How to restore

1. Copy files back to their original locations (shown by `src/` layout
   inside this backup).
2. Re-add v1 imports in `src/app/[locale]/page.tsx`.
3. Make sure required i18n keys exist in `messages/*.json`.
4. `pnpm install && pnpm build` to verify.
