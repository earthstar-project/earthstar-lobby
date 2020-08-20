import styled from "styled-components/macro";

const NumberInput = styled.input.attrs({
  type: "number",
})`
  font: inherit;
  border: 1px solid ${(props) => props.theme.colours.fg};
  padding: 4px;
`;

export default NumberInput;
