import { defineConfig } from "oxlint"
import core from "ultracite/oxlint/core"
import next from "ultracite/oxlint/next"
import react from "ultracite/oxlint/react"

export default defineConfig({
  extends: [core, react, next],
  ignorePatterns: [...(core.ignorePatterns ?? []), "env.d.ts"],
  rules: {
    "promise/spec-only": "off",
    "eslint/curly": "off",
    "eslint/func-style": "off",
    "eslint/sort-keys": "off",
    "unicorn/no-await-expression-member": "off",
    "react/function-component-definition": "off"
  }
})
