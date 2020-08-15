import styled from "styled-components/macro";

const TextInput = styled.input`
  border: 1px solid ${(props) => props.theme.colours.fg};
  background: ${(props) => props.theme.colours.bgHint};
  font: ${(props) => `${props.theme.font.size}px ${props.theme.font.family}`};
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
`;

export default TextInput;
