import styled from "styled-components";
import { Accent } from "./themes";

const NavButton = styled.button<{
  accent: Accent;
}>`
  appearance: none;
  border: none;
  margin: 0;
  padding: 0;
  background: none;
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-thickness: from-font;
  text-decoration-color: ${(props) => props.theme.colours[props.accent]};
  font: inherit;
`;

export default NavButton;
