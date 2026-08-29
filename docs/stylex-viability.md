# StyleX viability test

An experiment on the v2 stack to decide whether a ground-up UI rebuild on
StyleX is worth doing here, and whether the approach should carry over to
RoguAni.

**Verdict: technically viable, but not worth a full rebuild of this site.
Worth adopting incrementally as a proving ground.** Reasoning at the bottom.

## What was tested

A real port, not a toy: `Button` (the most style-heavy primitive — five
variants, hover, disabled, focus) was rebuilt in StyleX as
`src/components/ui/button-stylex.tsx` and rendered side by side with the
Tailwind original at `/[locale]/stylex-test`.

Verified on Next.js 16.3.3 / Turbopack / React Compiler / React 19.2 /
Base UI / Tailwind v4, all at the versions this repo pins.

| Check                              | Result                                                    |
| ---------------------------------- | --------------------------------------------------------- |
| Compiles under Turbopack           | Yes                                                       |
| CSS extracted and served           | Yes — `@layer priority1…5`                                |
| Coexists with Tailwind v4          | Yes, same stylesheet, no conflicts                        |
| Visual parity with Tailwind        | Near pixel-identical across all 5 variants incl. disabled |
| Hover / focus / disabled           | Yes                                                       |
| Media queries                      | Yes (via specificity doubling)                            |
| Design tokens (`defineVars`)       | Yes, compiled to CSS custom properties                    |
| Dynamic runtime styles             | Yes — shared classes + per-instance CSS vars              |
| Production `Compiled successfully` | Yes                                                       |
| `tsc` / oxlint / oxfmt             | Clean                                                     |
| Works with Base UI components      | Yes (via `className`)                                     |
| React Compiler interop             | No conflict observed                                      |

## Toolchain

StyleX's own transform is Babel-based, which Turbopack cannot run. The
official `@stylexjs/nextjs-plugin` is **webpack-only and frozen at 0.11.1
(Mar 2025)** while StyleX core is at 0.19.0 (Jun 2026) — the first-party
Next integration is effectively unmaintained.

The path that works is the community Rust/SWC port by Dwlad90
(`@stylexswc/*`, 0.18.4, tracking core 0.19.0). It needs **two** pieces,
because Turbopack does not support webpack plugins:

- `@stylexswc/turbopack-plugin` — compiles `stylex.create` calls (loader)
- `@stylexswc/postcss-plugin` — extracts the CSS (nothing else does this)

See `next.config.ts`, `postcss.config.mjs`, `src/styles/globals.css`
(`@stylex;`) and `src/styles/tokens.stylex.ts`.

## Gotchas found (all cost real time)

1. **`import.meta.dirname` in `next.config.ts` is `undefined`.** Next
   transpiles the config, so it silently vanishes, and StyleX then fails
   with a misleading "Could not resolve the path to the imported file"
   pointing at your component. Use `process.cwd()`.

2. **The `~/*` tsconfig alias cannot be used to import `*.stylex.ts` token
   files.** Doing so does not warn — it triggers a hard Turbopack panic
   (`FATAL`, panic log written) that poisons the cache and needs
   `rm -rf .next` to recover. Token imports must be relative. This is a
   sharp edge in a codebase that otherwise uses `~/` everywhere.

3. **Adding a new source file does not invalidate the extracted CSS.** The
   PostCSS plugin glob-scans; new files produce correct class names in the
   HTML but no CSS rules until the dev server is restarted. Silent
   "styles randomly missing" until you know to restart.

4. **`style` collides with component-library props.** `stylex.props()`
   returns `className` + `style`, so a `style?: StyleXStyles` prop clashes
   with Base UI's own `style` typing. Name the pass-through prop something
   else (`sx`) and `Omit<..., "style">`.

## Pre-existing issue (not StyleX)

`bun run build` fails at "Collecting page data" with a Bun CJS-wrapper
error and then segfaults, **on a clean checkout too** — StyleX is not
involved. Compilation and typecheck both pass; it breaks in the page-data
worker under `bun --bun`. Worth a look independently, since it means
`bun run build` cannot currently produce a production build locally.

## Recommendation

**For this site: don't rebuild.** The UI is ~2,400 LOC, 34 files, 167
`className` usages, and one `cva` component. Tailwind v4 is doing that job
fine. A ground-up rewrite spends real effort to arrive at the same pixels,
and takes on a build pipeline whose Next.js support rests on one community
maintainer while Meta's own integration sits stale. That is a poor trade
for a site this size.

**But it is a good proving ground, used incrementally.** Keep Tailwind,
add StyleX alongside it (proven above to work in the same stylesheet), and
port one or two components at a time. That is the cheap way to learn it
with a real escape hatch.

**For RoguAni, the interesting properties are:**

- **Dynamic styles.** Runtime values compile to shared atomic classes plus
  per-instance CSS custom properties — no class explosion for things like
  health bars, damage numbers, or per-entity theming. This is the single
  strongest argument for a game UI, and Tailwind has no clean equivalent.
- **Deterministic merging.** Styles applied later always win, regardless of
  import order or specificity. At design-system scale this removes a whole
  category of "why is this override not applying" bugs that Tailwind needs
  `tailwind-merge` to paper over.
- **Type-safe tokens and themes.** `defineVars` / `createTheme` are typed
  and statically checked, which beats stringly-typed theme keys.
- **CSS size scales with distinct properties, not with app size.**

**Caveats worth weighing before committing RoguAni to it:**

- The Next.js + Turbopack story depends on a community package. If it
  stalls, the fallback is webpack (slower, and the frozen official plugin).
- StyleX demands _more_ raw CSS knowledge than Tailwind, not less — real
  property names, cascade, and specificity, with no utility shorthand.
  Coming from Tailwind that is a genuine ramp, though arguably the useful
  kind.
- Verbosity is markedly higher than Tailwind for simple layout.

If RoguAni is the real target, the honest sequencing is: port a handful of
TEST Open components, live with the gotchas above for a couple of weeks,
and decide with that experience rather than on this document alone.

## Running it

```shell
bun install
bun run dev   # visit /en/stylex-test
```

The test route and `button-stylex.tsx` are throwaway — delete them if this
does not go forward.
