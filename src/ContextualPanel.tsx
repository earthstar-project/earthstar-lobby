import React from "react";
import { css } from "styled-components/macro";
import { Accent } from "./themes";
import MaxWidth from "./MaxWidth";

type ContextPanelProps = {
  accentColour: Accent;
  pointsToRef?: React.RefObject<HTMLElement>;
};

function getCenterXOfElement(el: HTMLElement) {
  return el.offsetLeft + el.clientWidth / 2;
}

const ContextualPanel: React.FC<ContextPanelProps> = ({
  accentColour,
  pointsToRef,
  children,
}) => {
  return (
    <div
      css={css`
        background: ${(props) => props.theme.colours[accentColour]};
        color: ${(props) => props.theme.colours.fg};
        padding: 12px 8px;
        position: relative;
        box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.06);
      `}
    >
      <MaxWidth>{children}</MaxWidth>
      {pointsToRef && pointsToRef.current ? (
        <div
          css={css`
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid
              ${(props) => props.theme.colours[accentColour]};
            position: absolute;
            bottom: -10px;
            left: ${getCenterXOfElement(pointsToRef.current) - 10}px;
          `}
        ></div>
      ) : null}
    </div>
  );
};

export default ContextualPanel;
