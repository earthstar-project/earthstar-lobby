import { DefaultTheme } from "styled-components/macro";

type ThemeWithoutFont = Omit<DefaultTheme, "font">;

export type Accent = "alpha" | "beta" | "gamma";

export const lightTheme: ThemeWithoutFont = {
  colours: {
    fg: "black",
    fgHint: "#B9B78C",
    bgHint: "white",
    bg: "#FFFBEF",
    alpha: "#F0E5CE",
    beta: "#D0C3D1",
    gamma: "#B2CFB8",
    alphaLine: "#AE9D7B",
    betaLine: "#8F6493",
    gammaLine: "#3BAE54",
  },
};

export function makeThemeForFont(
  fontFamily: string,
  theme: ThemeWithoutFont
): DefaultTheme {
  return {
    ...theme,
    font: {
      family: fontFamily,
      size: 16,
    },
  };
}
