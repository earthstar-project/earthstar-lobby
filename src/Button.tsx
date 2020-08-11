import styled from "styled-components";

const Button = styled.button`
  border: 1px solid ${(props) => props.theme.colours.fg};
  box-shadow: 2px 2px 0px 0px ${(props) => props.theme.colours.fg};
  background: ${(props) => props.theme.colours.bg};
  appearance: none;
  font: inherit;

  padding: 0.4em 0.4em 0.3em 0.4em;
`;

export default Button;
