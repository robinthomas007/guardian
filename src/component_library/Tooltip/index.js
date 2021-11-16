import React, { useState, useRef } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import './index.css';

export default ({ message }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button
        className="tooltip-btn"
        ref={target}
        onMouseOver={() => setShow(!show)}
        onMouseOut={() => setShow(false)}
      >
        ?
      </Button>
      <Overlay target={target.current} show={show} placement="top">
        <Tooltip tabIndex={-1} id="overlay-example">
          {message}
        </Tooltip>
      </Overlay>
    </>
  );
};
