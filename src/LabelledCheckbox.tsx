import React from "react";
import { css } from "styled-components/macro";

type LabelledCheckboxProps = {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

const LabelledCheckbox: React.FC<LabelledCheckboxProps> = ({
  isChecked,
  onChange,
  children,
}) => {
  return (
    <label
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <input
        css={css`
          appearance: none;
          width: 20px;
          height: 20px;
          font-size: 18px;
          position: relative;
          margin-right: 6px;
          background: ${(props) => props.theme.colours.inputBg};
          border: 1px solid ${(props) => props.theme.colours.fg};
          &:active {
            top: 1px;
            left: 1px;
          }
          &:checked:after {
            content: "✓";
            position: absolute;
            left: 2px;
            top: -2px;
          }
        `}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {children}
    </label>
  );
};

export default LabelledCheckbox;
