import React, { useState } from "react";
import { Button, Form, Modal, Row, Col, Stack } from "react-bootstrap";
import { openExternal } from "../../eventsBridge";
import { repository } from "../../../package.json";
import os from "os";
import LogsCanvas from "./LogsCanvas";

interface ReportProblemForm {
  title?: string;
  email?: string;
  details?: string;
}

function ReportProblemModal({ show, handleCloseModal }) {
  const [form, setForm] = useState<ReportProblemForm>({
    title: "",
    email: "",
    details: "",
  });

  const [errors, setErrors] = useState({});
  const [showLogs, setShowLogs] = useState(false);

  const setField = (field: string, value: string) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validateForm = (validateEmail = true) => {
    const newErrors = {};

    if (!form.title || form.title === "") newErrors.title = "שדה חובה";

    if (validateEmail) {
      if (!form.email || !isValidEmail(form.email))
        newErrors.email = "שדה מייל לא חוקי";
    }

    return newErrors;
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const openGithub = (e) => {
    e.preventDefault();

    const formErrors = validateForm(false);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const url = createGithubIssueLink(
      form.title,
      form.details,
      form.attachedLogs ?? ""
    );
    console.info(`Open bug report url with title: ${form.title}`);
    openExternal(url);
  };

  //TODO: SOURCE_COMMIT_SHORT should be taken from env file
  const createGithubIssueLink = (title: string, details: string, log: any) => {
    const formattedDetails = details
      ? `
        ## Details
        
        ${details}`
      : "";

    const formattedLog = log
      ? `
        ## Log
        \`\`\`
        ${log}
        \`\`\``
      : "";

    const sysInfo = `
        ## System Info
        
         - Source Version: \`${"SOURCE_COMMIT_SHORT" || "unknown"}\`
         - OS: \`${os.platform()}${os.arch()}\`
         - OS Version: \`${os.release()}\`
        `;

    return `${`${repository}/issues/new?` +
      `title=${encodeURIComponent(title)}` +
      "&body="}${encodeURIComponent(
      formattedDetails + formattedLog + sysInfo
    )}`;
  };

  const sendReport = (e) => {
    e.preventDefault();

    const formErrors = validateForm(true);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // const eventId = Sentry.userReportProblem(
    //   form.title,
    //   form.details,
    //   form.attachedLogs ?? "",
    //   form.email
    // );

    //console.info(`Problem reported. Event ${eventId}`);
  };

  const seeLogs = () => {
    setShowLogs(true);
  };

  const onHide = () => {
    handleCloseModal();

    setForm({
      title: "",
      email: "",
      details: "",
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
      >
        <Modal.Header closeButton>
          <Modal.Title>דיווח על באג</Modal.Title>
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
                  onChange={(e) => setField("title", e.target.value)}
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
                <Form.Label>דוא"ל</Form.Label>
                <Form.Control
                  type="text"
                  value={form.email}
                  isInvalid={!!errors.email}
                  aria-describedby="email"
                  onChange={(e) => setField("email", e.target.value)}
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
              onChange={(e) => setField("details", e.target.value)}
            />
            <Form.Group className="mb-4" as={Col} md="2">
              <Form.Check type="checkbox" label="צירוף קבצי לוג" />(
              <Button variant="link" onClick={seeLogs}>
                צפיה בלוגים
              </Button>
              )
            </Form.Group>

            <div>*מורה על שדות חובה</div>
            <div className="mb-4">
              אפשר למצוא את הלוגים פה: C:\git\caspion\userData\logs
            </div>
            <Stack direction="horizontal" gap={3}>
              <Button variant="light" onClick={handleCloseModal}>
                סגור
              </Button>
              <Button
                variant="dark"
                name="open-github"
                type="submit"
                onClick={openGithub}
              >
                פתיחת תקלה ב-Github{" "}
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
      <LogsCanvas show={showLogs} handleClose={() => setShowLogs(false)} />
    </>
  );
}

export default ReportProblemModal;
