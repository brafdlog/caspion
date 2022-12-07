import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

function LogsCanvas({ show, handleClose }) {
  return (
    <Offcanvas
      
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ zIndex: 9999 }}
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

export default LogsCanvas;
