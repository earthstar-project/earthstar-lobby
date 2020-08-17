import "styled-components/macro";
import {} from "styled-components/cssprop";

// Tell TS what the shape of themes are
declare module "styled-components/macro" {
  export interface DefaultTheme {
    font: {
      family: string;
      size: number;
    };
    colours: {
      // The background colour
      bg: string;
      // A version of the BG colour slightly closer to the foreground colour
      bgHint: string;
      // The foreground colour, e.g. for text
      fg: string;
      // A version of the foreground colour closer to the background colour
      fgHint: string;
      // A colour associated with workspaces
      alpha: string;
      // A colour associated with authors
      beta: string;
      // A colour associated with documents
      gamma: string;
      // A colur associated with workspaces to be used on small elements e.g. underlines
      alphaLine: string;
      // A colur associated with authors to be used on small elements e.g. underlines
      betaLine: string;
      // A colur associated with documents to be used on small elements e.g. underlines
      gammaLine: string;
      // Background colour of inputs, should be closer to the bg colour
      inputBg: string;
    };
  }
}
