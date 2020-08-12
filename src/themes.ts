import { DefaultTheme } from "styled-components";

type ThemeWithoutFont = Omit<DefaultTheme, "font">;

export const lightTheme: ThemeWithoutFont = {
  colours: {
    fg: "black",
    fgHint: "rgb(200, 200, 200)",
    bgHint: "rgb(244, 244, 244)",
    bg: "white",
  },
};

export const darkTheme: ThemeWithoutFont = {
  colours: {
    fg: "white",
    fgHint: "rgb(6, 6, 6)",
    bgHint: "rgb(244, 244, 244)",
    bg: "black",
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
