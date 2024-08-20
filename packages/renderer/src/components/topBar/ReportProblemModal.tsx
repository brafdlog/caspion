import {
  getLogsInfo,
  openExternal,
  sentryUserReportProblem,
} from '#preload';
import os from 'os';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { isValidEmail } from '../../utils/validations';
import { getZIndexes } from '../../utils/zIndexesManager';
import LogsCanvas from './LogsCanvas';
import { useAppInfoStore } from '/@/store';

const NUM_OF_LAST_LINES = 10;

interface ReportProblemForm {
  title?: string;
  email?: string;
  details?: string;
  attachedLogs: boolean;
}

interface ReportProblemModalProps {
  show: boolean;
  onClose: () => void;
}

interface ValidationError {
  title?: string;
  email?: string;
}

function ReportProblemModal({ show, onClose }: ReportProblemModalProps) {
  const [logsFolder, setLogsFolder] = useState<string>();
  const appInfoStore = useAppInfoStore();

  useEffect(() => {
    const fetchData = async () => {
      const logInfo = await getLogsInfo(NUM_OF_LAST_LINES);
      setLogsFolder(logInfo.logsFolder);
      setLastLines(logInfo.lastLines);
    };

    fetchData();
  }, []);

  const [lastLines, setLastLines] = useState<string>();

  const [form, setForm] = useState<ReportProblemForm>({
    title: '',
    email: '',
    details: '',
    attachedLogs: true,
  });

  const [errors, setErrors] = useState<ValidationError>({});
  const [showLogs, setShowLogs] = useState(false);

  const setField = (field: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));

    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validateForm = (validateEmail = true) => {
    const newErrors: ValidationError = {};

    if (!form.title || form.title === '') newErrors.title = 'שדה חובה';

    if (validateEmail) {
      if (!form.email || !isValidEmail(form.email)) {
        newErrors.email = 'שדה מייל לא חוקי';
      }
    }

    return newErrors;
  };

  const openGithub = (e) => {
    e.preventDefault();

    const formErrors = validateForm(false);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const url = createGithubIssueLink(
      form.title ?? '',
      form.details ?? '',
      form.attachedLogs ? lastLines ?? '' : '',
    );
    openExternal(url);
  };

  const createGithubIssueLink = (
    title: string,
    details: string,
    log: string,
  ) => {
    const formattedDetails = details
      ? `
## Details
        
${details}`
      : '';

    // if the log too big it makes an error
    const formattedLog = log
      ? `
        ## Log
        \`\`\`
        ${log} 
        \`\`\``
      : '';

    const sysInfo = `
        ## System Info
        
         - Source Version: \`${appInfoStore.appInfo.sourceCommitShort || 'unknown'}\`
         - OS: \`${os.platform()}${os.arch()}\`
         - OS Version: \`${os.release()}\`
        `;

    return `${
      `${appInfoStore.appInfo.repository}/issues/new?` +
      `title=${encodeURIComponent(title)}` +
      '&body='
    }${encodeURIComponent(formattedDetails + formattedLog + sysInfo)}`;
  };

  const sendReport = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(true);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    sentryUserReportProblem({
      title: form.title,
      body: form.details,
      logs: form.attachedLogs ?? '',
      email: form.email,
    });
  };

  const seeLogs = () => {
    setShowLogs(true);
  };

  const onHide = () => {
    onClose();

    setForm({
      title: '',
      email: '',
      details: '',
      attachedLogs: false,
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
        style={{ zIndex: getZIndexes().modal }}
      >
        <Modal.Header closeButton>
          <div className="row justify-content-center">
            <Modal.Title>דיווח על באג</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                className="position-relative"
                controlId="title"
              >
                <Form.Label>כותרת</Form.Label>
                <Form.Control
                  type="text"
                  aria-describedby="title"
                  required
                  value={form.title}
                  isInvalid={!!errors.title}
                  onChange={(e) => setField('title', e.target.value)}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
                <Form.Text muted>נא לתאר את הבאג במשפט אחד</Form.Text>
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="position-relative"
                controlId="email"
              >
                <Form.Label>דוא&quot;ל</Form.Label>
                <Form.Control
                  type="text"
                  value={form.email}
                  isInvalid={!!errors.email}
                  aria-describedby="email"
                  onChange={(e) => setField('email', e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
                <Form.Text muted>
                  אנחנו זקוקים לכתובת המייל שלך על מנת ליצור איתך קשר במידה
                  ונשלח דוח
                </Form.Text>
              </Form.Group>
            </Row>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="פרטי הבאג"
              className="mb-4"
              value={form.details}
              onChange={(e) => setField('details', e.target.value)}
            />
            <Form.Group className="mb-4" as={Col} md="2">
              <Form.Check
                value={form.attachedLogs}
                type="checkbox"
                label="צירוף קבצי לוג"
                checked={form.attachedLogs === true}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    attachedLogs: e.target.checked,
                  }))
                }
              />
              (
              <Button variant="link" onClick={seeLogs}>
                צפיה בלוגים
              </Button>
              )
            </Form.Group>

            <div className="mb-4">אפשר למצוא את הלוגים פה: {logsFolder}</div>
            <Stack direction="horizontal" gap={3}>
              <Button variant="light" onClick={onClose}>
                סגור
              </Button>
              <Button
                variant="dark"
                name="open-github"
                type="submit"
                onClick={openGithub}
              >
                פתיחת תקלה ב-Github{' '}
              </Button>
              <Button
                variant="dark"
                name="send-report"
                type="submit"
                onClick={sendReport}
              >
                שליחת דוח
              </Button>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
      <LogsCanvas
        show={showLogs}
        handleClose={() => setShowLogs(false)}
        lastLines={lastLines}
      />
    </>
  );
}

export default ReportProblemModal;
