import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getZIndexes } from '../../utils/zIndexesManager';

type LogsCanvasProps = {
  show: boolean;
  handleClose?: () => void;
  lastLines: string;
};

export default function LogsCanvas({ show, handleClose, lastLines }: LogsCanvasProps) {

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
