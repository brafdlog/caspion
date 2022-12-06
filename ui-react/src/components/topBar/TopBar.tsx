import React, { useState } from "react";
import NavBar from "react-bootstrap/Navbar";
import {
  Button,
  Container,
  Form,
  Modal,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import logo from "../../assets/logoFishOnly.svg";
import { openExternal } from "../../eventsBridge";
import { repository } from "../../../package.json";
import { discordchannel } from "../../../package.json";
import NavButton from "./NavButton";
import styles from "./TopBar.module.css";
import os from "os";

function TopBar() {
  const [showReportModal, setShowReportModal] = useState(false);

  const handleCloseModal = () => setShowReportModal(false);

  const handleOpenGithub = () => {
    openExternal(repository);
  };

  const handleDiscord = () => {
    openExternal(discordchannel);
  };

  const handleReportProblem = () => {
    setShowReportModal(true);
  };

  const openGithub = () => {
    //this.validateEmail = false;
    //if (this.$refs.form.validate()) {
    const url = createGithubIssueLink(
      this.formData.title,
      this.formData.details,
      this.formData.attachLogs ? this.raw : ""
    );
    console.info(`Open bug report url with title: ${this.formData.title}`);
    openExternal(url);
  };

  // SOURCE_COMMIT_SHORT should be taken from env file
  const createGithubIssueLink = (
    title: string | number | boolean,
    details: any,
    log: any
  ) => {
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

  const sendReport = () => {
    this.validateEmail = true;
    // if (this.$refs.form.validate()) {
    //   const eventId = Sentry.userReportProblem(
    //     this.formData.title,
    //     this.formData.details,
    //     this.formData.attachLogs ? this.raw : '',
    //     this.formData.email,
    //   );

    //   logger.info(`Problem reported. Event ${eventId}`);
    //   this.dialog = false;
    // }
  };

  return (
    <>
      <NavBar
        className={styles.topNavBar}
        style={{ borderBottom: "1px solid #C4C4C4" }}
      >
        <Container fluid>
          <NavBar.Brand>
            <img src={logo} alt="כספיון" width={50} height={50} /> כספיון
          </NavBar.Brand>
          <Stack direction="horizontal" gap={5}>
            <NavButton onClick={handleReportProblem} text="דיווח על בעיה" />
            <NavButton onClick={handleDiscord} text="ערוץ הדיסקורד שלנו" />
            <NavButton onClick={handleOpenGithub} text="לפתוח ב-Github" />
          </Stack>
        </Container>
      </NavBar>
      <Modal
        show={showReportModal}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centereddescribe
        the
      >
        <Modal.Header closeButton>
          <Modal.Title>דיווח על תקלה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              controlId="title"
              className="position-relative"
            >
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control type="text" id="title" aria-describedby="title" />
              <Form.Text id="title" muted>
                Describe the bug in one sentence
              </Form.Text>
            </Form.Group>

            <Form.Group
              as={Col}
              md="6"
              controlId="email"
              className="position-relative"
            >
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="text" id="email" aria-describedby="email" />
              <Form.Text id="email" muted>
                We need your mail to contact you if you send a report
              </Form.Text>
            </Form.Group>
          </Row>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Bug Details (אפשר לכתוב בעברית)"
          />
          <div>*indicates required field</div>
          <div>You can find the logs here: C:\git\caspion\userData\logs</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={openGithub}>
            OPEN GITHUB ISSUE
          </Button>
          <Button variant="primary" onClick={sendReport}>
            SEND REPORT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TopBar;
