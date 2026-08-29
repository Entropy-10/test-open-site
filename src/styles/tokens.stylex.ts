import * as stylex from "@stylexjs/stylex"

export const colors = stylex.defineVars({
  milkyWhite: "#fffefa",
  lightBlue: "#5e72eb",
  blue: "#120c6e",
  mediumBlue: "#0b0742",
  darkBlue: "#070427",
  lavender: "#807ee1",
  salmon: "#ff9190",
  transparent: "transparent"
})

export const gradients = stylex.defineVars({
  feature2: "linear-gradient(270deg, #807ee1 -9.09%, #5e72eb 108.5%)",
  feature4: "linear-gradient(90deg, #807ee1 -8.67%, #ff9190 118.61%)",
  footer: "linear-gradient(90deg, #120c6e -30.19%, #807ee1 107.81%)"
})

export const breakpoints = {
  xs: "@media (min-width: 500px)",
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)"
} as const
