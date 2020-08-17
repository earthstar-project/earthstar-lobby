import React, { useMemo } from "react";
import { getAuthorShortname, getAuthorHash, hexToRgb } from "./util/handy";
import Identicon from "identicon.js";
import { css, useTheme } from "styled-components/macro";

type AuthorIDProps = {
  address: string;
};

const AuthorIdenticon: React.FC<AuthorIDProps> = ({ address }) => {
  const theme = useTheme();

  const { r, g, b } = hexToRgb(theme.colours.fgHint);

  const identicon = useMemo(() => {
    return new Identicon(address, {
      format: "svg",
      foreground: [r, g, b, 255],
      background: [255, 255, 255, 0],
      size: 10,
      margin: 0,
      // @ts-ignore
    }).toString(true);
  }, [address, r, g, b]);

  return (
    <img
      src={`data:image/svg+xml;utf8,${identicon}`}
      alt={`An identicon represent the address ${address}`}
    />
  );
};

export default AuthorIdenticon;
