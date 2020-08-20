import styled from "styled-components/macro";

const Button = styled.button`
  border: 1px solid
    ${(props) =>
      props.disabled ? props.theme.colours.fgHint : props.theme.colours.fg};
  box-shadow: 2px 2px 0px 0px
    ${(props) =>
      props.disabled ? props.theme.colours.fgHint : props.theme.colours.fg};
  background: ${(props) => props.theme.colours.inputBg};
  appearance: none;
  font: inherit;
  padding: 0.4em 0.4em 0.3em 0.4em;
  position: relative;
  &:active {
    color: ${(props) => props.theme.colours.fgHint};
    top: 2px;
    left: 2px;
    box-shadow: 0px 0px 0px 0px;
  }
`;

export default Button;
