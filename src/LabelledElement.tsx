import React from "react";
import { css } from "styled-components/macro";

type LabelledElementProps = {
  label: React.ReactNode;
};

const LabelledElement: React.FC<LabelledElementProps> = ({
  children,
  label,
}) => {
  return (
    <label
      css={css`
        color: ${(props) => props.theme.colours.fgHint};
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      `}
    >
      <span
        css={css`
          margin-bottom: 0.2em;
        `}
      >
        {label}
      </span>
      {children}
    </label>
  );
};

export default LabelledElement;
