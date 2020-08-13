import "styled-components";
import {} from "styled-components/cssprop";

// Tell TS what the shape of themes are
declare module "styled-components" {
  export interface DefaultTheme {
    font: {
      family: string;
      size: number;
    };
    colours: {
      bg: string;
      bgHint: string;
      fg: string;
      fgHint: string;
      alpha: string;
      beta: string;
      gamma: string;
      alphaLine: string;
      betaLine: string;
      gammaLine: string;
    };
  }
}
