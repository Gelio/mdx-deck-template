import React from "react";

import styled from "@emotion/styled";

const Label = styled("div")({
  fontSize: "0.8rem",
});

/**
 * An image with a label underneath
 *
 * @param {{ children: import("react").ReactElement; label?: string }}
 */
export const ImageWithLabel = ({ children, label }) => (
  <React.Fragment>
    {React.cloneElement(children, { alt: children.alt ?? label })}

    <Label>{label}</Label>
  </React.Fragment>
);
