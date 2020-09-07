import styled, { DefaultTheme } from "styled-components/macro";
import { Accent } from "./themes";

const lineMap: Record<Accent, keyof DefaultTheme["colours"]> = {
  alpha: "alphaLine",
  beta: "betaLine",
  gamma: "gammaLine",
};

const NavButton = styled.button<{
  accent: Accent;
}>`
  appearance: none;
  color: ${(props) => props.theme.colours.fg};
  border: none;
  margin: 0;
  padding: 0;
  background: none;
  text-decoration: underline;
  //text-decoration-style: wavy;
  text-decoration-thickness: 2px;
  text-decoration-color: ${(props) =>
    props.theme.colours[lineMap[props.accent]]};
  font: inherit;
  position: relative;
  transition: 250ms all;
  &:hover {
    text-decoration-thickness: 3px;
    text-decoration-color: ${(props) => props.theme.colours.fg};
  }
  &:active {
    top: 1px;
  }
`;

export default NavButton;
