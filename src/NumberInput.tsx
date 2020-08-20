import styled from "styled-components/macro";

const NumberInput = styled.input.attrs({
  type: "number",
})`
  font: inherit;
  border: 1px solid ${(props) => props.theme.colours.fg};
  padding: 4px;

  color: ${(props) => props.theme.colours.fg};
  background: ${(props) => props.theme.colours.inputBg};
`;

export default NumberInput;
