import { defineConfig } from "oxfmt"

export default defineConfig({
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  objectWrap: "preserve",
  sortTailwindcss: {
    functions: ["clsx", "cn"],
    preserveWhitespace: true
  },
  sortPackageJson: true,
  sortImports: {
    customGroups: [
      {
        elementNamePattern: ["next", "next/*"],
        groupName: "value-next",
        modifiers: ["value"]
      },
      {
        elementNamePattern: ["next", "next/*"],
        groupName: "type-next",
        modifiers: ["type"]
      },
      {
        elementNamePattern: ["react", "react/*"],
        groupName: "value-react",
        modifiers: ["value"]
      },
      {
        elementNamePattern: ["react", "react/*"],
        groupName: "type-react",
        modifiers: ["type"]
      }
    ],
    groups: [
      ["side_effect", "side_effect_style"],
      { newlinesBetween: true },
      "value-builtin",
      { newlinesBetween: true },
      ["value-next", "value-react"],
      ["type-next", "type-react"],
      { newlinesBetween: true },
      "value-external",
      "type-external",
      { newlinesBetween: true },
      ["value-internal", "value-parent", "value-sibling", "value-index"],
      ["type-internal", "type-parent", "type-sibling", "type-index"],
      { newlinesBetween: true },
      "unknown"
    ],
    newlinesBetween: false,
    sortSideEffects: true
  }
})
