import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getLastLines } from '../../eventsBridge';
import { getZIndexes } from '../../utils/zIndexesManager';

type LogsCanvasProps = {
  show: boolean;
  handleClose?: () => void;
};

export default function LogsCanvas({ show, handleClose }: LogsCanvasProps) {

  const [lastLines, setLastLines] = useState<string>();

  useEffect(async () => {
    const lines = await getLastLines(3);
    setLastLines(lines);
  }, []);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ zIndex: getZIndexes().offcanvas }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>לוגים:</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body dir="ltr">
        {lastLines}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
