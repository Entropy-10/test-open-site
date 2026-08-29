import { connection } from "next/server"

import * as stylex from "@stylexjs/stylex"

import { colors } from "../../../styles/tokens.stylex"
import { Button } from "~/components/ui/button"
import { ButtonStyleX } from "~/components/ui/button-stylex"
import { HpBar } from "~/components/ui/hp-bar"

const styles = stylex.create({
  page: {
    minHeight: "100vh",
    backgroundColor: colors.darkBlue,
    color: colors.milkyWhite,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  },
  row: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "center"
  },
  label: {
    fontSize: "0.875rem",
    opacity: 0.7,
    fontFamily: "monospace"
  },
  responsive: {
    fontSize: { default: "1rem", "@media (min-width: 768px)": "2rem" },
    color: {
      default: colors.salmon,
      "@media (min-width: 768px)": colors.lavender
    }
  }
})

const VARIANTS = [
  "default",
  "invertedDefault",
  "outline",
  "invertedOutline",
  "primary"
] as const

export default async function StyleXTestPage() {
  await connection()

  return (
    <div {...stylex.props(styles.page)}>
      <h1>StyleX vs Tailwind parity test</h1>

      <p {...stylex.props(styles.responsive)}>
        Responsive + token test (resize me)
      </p>

      <div>
        <p {...stylex.props(styles.label)}>dynamic styles (runtime values)</p>
        <HpBar pct={72} hue="#ff9190" />
        <HpBar pct={35} hue="#5e72eb" />
      </div>

      {VARIANTS.map((variant) => (
        <div key={variant}>
          <p {...stylex.props(styles.label)}>{variant}</p>
          <div {...stylex.props(styles.row)}>
            <Button variant={variant}>TW {variant}</Button>
            <ButtonStyleX variant={variant}>SX {variant}</ButtonStyleX>
            <Button disabled variant={variant}>
              TW disabled
            </Button>
            <ButtonStyleX disabled variant={variant}>
              SX disabled
            </ButtonStyleX>
          </div>
        </div>
      ))}
    </div>
  )
}
