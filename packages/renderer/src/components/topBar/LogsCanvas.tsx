import { openLogsFolder } from '#preload';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup, Stack } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getZIndexes } from '../../utils/zIndexesManager';

interface LogsCanvasProps {
  show: boolean;
  handleClose?: () => void;
  lastLines?: string;
  logsFolder?: string;
}

export default function LogsCanvas({ show, handleClose, lastLines, logsFolder }: LogsCanvasProps) {
  const [filter, setFilter] = useState('');
  const [copied, setCopied] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const lines = lastLines?.split('\n') ?? [];
  const filteredLines = filter ? lines.filter((line) => line.toLowerCase().includes(filter.toLowerCase())) : lines;

  // Scroll to bottom when logs change or panel opens
  useEffect(() => {
    if (show && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [show, lastLines]);

  const copyToClipboard = async () => {
    const textToCopy = filter ? filteredLines.join('\n') : lastLines;
    await navigator.clipboard.writeText(textToCopy ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLogsFolder = () => {
    openLogsFolder();
  };

  // Highlight matching text in filtered mode
  const highlightMatch = (line: string) => {
    if (!filter) return line;
    const regex = new RegExp(`(${filter})`, 'gi');
    const parts = line.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: '#fff3cd', padding: 0 }}>
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ zIndex: getZIndexes().offcanvas, height: '60vh' }}
    >
      <Offcanvas.Header closeButton>
        <Stack direction="horizontal" gap={3} className="w-100">
          <Offcanvas.Title>לוגים</Offcanvas.Title>
          <InputGroup style={{ width: '300px' }}>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="חיפוש בלוגים..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              dir="ltr"
            />
            {filter && (
              <Button variant="outline-secondary" onClick={() => setFilter('')}>
                ✕
              </Button>
            )}
          </InputGroup>
          <div className="ms-auto d-flex gap-2">
            <Button variant="outline-primary" size="sm" onClick={copyToClipboard}>
              {copied ? '✓ הועתק!' : '📋 העתק לוגים'}
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={handleOpenLogsFolder}>
              📂 פתח תיקיית לוגים
            </Button>
          </div>
        </Stack>
      </Offcanvas.Header>
      <Offcanvas.Body dir="ltr" style={{ padding: 0 }}>
        <div
          style={{
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: '12px',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            padding: '12px',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          {filteredLines.length === 0 && filter && (
            <div style={{ color: '#888', textAlign: 'center', padding: '20px' }}>לא נמצאו תוצאות עבור "{filter}"</div>
          )}
          {filteredLines.map((line, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                borderBottom: '1px solid #333',
                padding: '2px 0',
              }}
            >
              <span
                style={{
                  color: '#858585',
                  minWidth: '45px',
                  paddingRight: '12px',
                  textAlign: 'right',
                  userSelect: 'none',
                  borderRight: '1px solid #333',
                  marginRight: '12px',
                }}
              >
                {lines.indexOf(line) + 1}
              </span>
              <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{highlightMatch(line)}</span>
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>
        {logsFolder && (
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #dee2e6',
              fontSize: '12px',
              color: '#6c757d',
            }}
          >
            📁 מיקום הלוגים: <code style={{ color: '#495057' }}>{logsFolder}</code>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
