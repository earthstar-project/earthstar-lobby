import { DefaultTheme } from "styled-components";

type ThemeWithoutFont = Omit<DefaultTheme, "font">;

export type Accent = "alpha" | "beta" | "gamma";

export const lightTheme: ThemeWithoutFont = {
  colours: {
    fg: "black",
    fgHint: "rgb(200, 200, 200)",
    bgHint: "rgb(244, 244, 244)",
    bg: "#FFFBEF",
    alpha: "#F0E5CE",
    beta: "#D0C3D1",
    gamma: "#B2CFB8",
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
