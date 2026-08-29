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
| CSS extracted and served           | Yes                                                       |
| Coexists with Tailwind v4          | Yes, same stylesheet, no conflicts                        |
| Visual parity with Tailwind        | Near pixel-identical — but see the caveat below            |
| Hover / focus / disabled           | Yes                                                       |
| Media queries                      | Yes (via specificity doubling)                            |
| Design tokens (`defineVars`)       | Yes, compiled to CSS custom properties                    |
| Dynamic runtime styles             | Yes — shared classes + per-instance CSS vars              |
| Production `Compiled successfully` | Yes                                                       |
| `tsc` / oxlint / oxfmt             | Clean                                                     |
| Works with Base UI components      | Yes (via `className`)                                     |
| React Compiler interop             | Still active (verified in output)                         |

### Caveat on that parity

The ported button matches the original **partly because Tailwind is still
on the page.** Tailwind's preflight emits

```css
*, ::after, ::before, ::backdrop {
  box-sizing: border-box;
  border: 0 solid;
  margin: 0;
  padding: 0;
}
```

StyleX ships **no reset at all**. The `invertedDefault` variant never sets
`boxSizing`, yet stayed 160x32 when its 2px hover border appeared — because
preflight had already given it `border-box`. Without Tailwind it would be
`content-box` and grow to 164x36 on hover. Same story for `border: 0 solid`:
`borderStyle` is only implicit while preflight supplies it.

So a Tailwind-free rebuild is not just a translation of the styles — it also
means owning a reset. Worth knowing up front for RoguAni, which would be
StyleX-only from day one and would not inherit any of this.

## Toolchain

**The official, first-party path works.** Since Next.js 16.0.3 Turbopack
runs Babel, so StyleX's own Babel plugin is supported with no
`next.config.ts` changes at all — just `babel.config.js` +
`postcss.config.mjs`. That is what this branch uses.

One thing the docs' snippet omits: you **must** add
`presets: ["next/babel"]`. Without it Babel is applied to every file with
no TypeScript preset and the build dies on the first `.ts` file with an
opaque `invalid type: null, expected a string`. React Compiler still runs
with Babel in the chain (verified: `react-compiler-runtime` and
`useMemoCache` are present in the output).

There is also a community Rust/SWC port (`@stylexswc/*`, by Dwlad90),
which was tested here too and works identically — it needs a Turbopack
loader plus its own PostCSS plugin, configured in `next.config.ts`. Its
only advantage is speed, and its cost is depending on a single
community maintainer.

Note that the official `@stylexjs/nextjs-plugin` package is webpack-only
and frozen at 0.11.1; it is **not** part of the supported path above and
should be ignored. Core StyleX is actively maintained at 0.19.0.

### Build cost (clean production compile, this repo)

| Setup                         | Compile      |
| ----------------------------- | ------------ |
| No StyleX (baseline)          | 10.4s        |
| StyleX via community SWC port | 10.8s (+4%)  |
| StyleX via official Babel     | 15.4s (+48%) |

Babel replaces SWC for every file, so that gap widens with codebase size.
At TEST Open's scale it is irrelevant. On something the size of RoguAni it
would be worth re-measuring, and swapping to the SWC port is a
config-only change if it hurts.

## Gotchas found (all cost real time)

1. **`presets: ["next/babel"]` is mandatory** and is missing from the
   docs snippet — see above. The failure it causes names an unrelated
   file, so it is hard to trace back.

2. **`import.meta.dirname` works in `babel.config.js` but NOT in
   `next.config.ts`.** Next transpiles its own config, so it silently
   becomes `undefined` there and StyleX fails with a misleading "Could not
   resolve the path to the imported file" pointing at your component. Only
   relevant if you use the SWC port; use `process.cwd()` there.

3. **The `~/*` tsconfig alias cannot be used to import `*.stylex.ts` token
   files.** Confirmed on _both_ the official Babel path and the SWC port,
   so this is StyleX's own module resolution, not a bundler bug. It does
   not warn: on the SWC port it triggers a hard Turbopack panic (`FATAL`,
   panic log) that poisons the cache and needs `rm -rf .next`; on the
   official path the page 500s. Token imports must be relative. This is a
   sharp edge in a codebase that otherwise uses `~/` everywhere.

4. **Adding a new source file does not invalidate the extracted CSS.** The
   PostCSS plugin glob-scans; new files produce correct class names in the
   HTML but no CSS rules until the dev server is restarted. Silent
   "styles randomly missing" until you know to restart.

5. **`style` collides with component-library props.** `stylex.props()`
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
and re-learns the same design decisions in a more verbose syntax. That is a
poor trade for a site this size — but the pipeline itself is officially
supported and low-risk, so this is a cost-of-effort call, not a
technical-risk one.

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

- Babel-in-the-build costs ~48% compile time here; measure it at scale
  before committing, and keep the SWC port in mind as the escape hatch.
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
