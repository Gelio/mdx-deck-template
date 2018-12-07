import React from 'react';
import styled from 'styled-components';

const Label = styled.div([], {
  fontSize: '0.8em',
});

/**
 * An image with a label underneath
 */
export default ({ children, label }) => (
  <React.Fragment>
    {React.cloneElement(children, { alt: children.alt || label })}

    <Label>{label}</Label>
  </React.Fragment>
);
