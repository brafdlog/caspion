import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getZIndexes } from "../../utils/zIndexesManager";

type LogsCanvasProps = {
  show: boolean;
  handleClose?: () => void;
};

export default function LogsCanvas({ show, handleClose }: LogsCanvasProps) {
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
      <Offcanvas.Body>
        [2022-12-07 12:34:27.432] [info] Welcome to caspion log
      </Offcanvas.Body>
    </Offcanvas>
  );
}