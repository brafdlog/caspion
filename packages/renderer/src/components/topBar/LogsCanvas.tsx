import Offcanvas from 'react-bootstrap/Offcanvas';
import { getZIndexes } from '../../utils/zIndexesManager';

interface LogsCanvasProps {
  show: boolean;
  handleClose?: () => void;
  lastLines?: string;
}

export default function LogsCanvas({ show, handleClose, lastLines }: LogsCanvasProps) {
  const splitted = lastLines?.split('\n');

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
        {splitted?.map((line, index) => <div key={index}>{line}</div>)}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
