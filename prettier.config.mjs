/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
export default {
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  printWidth: 80,
  arrowParens: 'avoid',
  trailingComma: 'none',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^(@supabase|@navigation|@schemas|@utils|@types|@siteConfig|@metadata|@discord|@osu)$',
    '',
    '^~/lib/(.*)$',
    '^~/components/ui/(.*)$',
    '^~/components/(.*)$',
    '^~/(.*)$',
    '^[./]',
    '',
    '<TYPES>',
    '<TYPES>^[.]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy']
}
