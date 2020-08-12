import styled from "styled-components";

const TextArea = styled.textarea`
  display: block;
  width: calc(100% - 2px);
  border: 1px solid ${(props) => props.theme.colours.fg};
  background: ${(props) => props.theme.colours.bgHint};
  font: ${(props) => `${props.theme.font.size}px ${props.theme.font.family}`};
  margin: 0;
  padding: 12px 8px;
  box-sizing: border-box;
`;

export default TextArea;
