"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import * as stylex from "@stylexjs/stylex"

import { colors } from "../../styles/tokens.stylex"

const styles = stylex.create({
  base: {
    position: "relative",
    display: "flex",
    userSelect: "none",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: "0.75rem",
    lineHeight: "1rem",
    transitionProperty: "all",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-in-out",
    outline: { default: null, ":focus": "none" }
  },
  size_default: {
    height: "2rem",
    width: "10rem"
  },
  default: {
    backgroundColor: {
      default: colors.milkyWhite,
      ":hover": colors.mediumBlue
    },
    color: { default: colors.blue, ":hover": colors.milkyWhite }
  },
  invertedDefault: {
    backgroundColor: {
      default: colors.mediumBlue,
      ":hover": colors.milkyWhite
    },
    color: { default: colors.milkyWhite, ":hover": colors.mediumBlue },
    borderWidth: { default: 0, ":hover": "2px" },
    borderStyle: "solid",
    borderColor: { default: "transparent", ":hover": colors.mediumBlue }
  },
  outline: {
    boxSizing: "border-box",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.milkyWhite,
    backgroundColor: { default: "transparent", ":hover": colors.milkyWhite },
    color: { default: colors.milkyWhite, ":hover": colors.mediumBlue }
  },
  invertedOutline: {
    boxSizing: "border-box",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.lightBlue,
    backgroundColor: { default: colors.lightBlue, ":hover": "transparent" },
    color: { default: colors.milkyWhite, ":hover": colors.lightBlue }
  },
  primary: {
    color: colors.milkyWhite
  },
  disabledFade: {
    pointerEvents: { default: null, ":disabled": "none" },
    opacity: { default: null, ":disabled": 0.8 }
  },
  disabledOutline: {
    pointerEvents: { default: null, ":disabled": "none" },
    borderColor: { default: colors.milkyWhite, ":disabled": "#cbd5e1" },
    color: { default: colors.milkyWhite, ":disabled": "#cbd5e1" }
  }
})

type Variant =
  | "default"
  | "invertedDefault"
  | "outline"
  | "invertedOutline"
  | "primary"

interface ButtonStyleXProps extends Omit<ButtonPrimitive.Props, "style"> {
  variant?: Variant
  size?: "default"
  sx?: stylex.StyleXStyles
}

export function ButtonStyleX({
  variant = "default",
  size = "default",
  sx,
  ...props
}: ButtonStyleXProps) {
  return (
    <ButtonPrimitive
      data-slot="button-stylex"
      {...props}
      {...stylex.props(
        styles.base,
        size === "default" && styles.size_default,
        styles[variant],
        variant === "outline" ? styles.disabledOutline : styles.disabledFade,
        sx
      )}
    />
  )
}
