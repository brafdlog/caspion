import React, { useState } from "react";
import NavBar from "react-bootstrap/Navbar";
import {
  Container,
  Stack,
} from "react-bootstrap";
import logo from "../../assets/logoFishOnly.svg";
import { openExternal } from "../../eventsBridge";
import { repository } from "../../../package.json";
import { discordchannel } from "../../../package.json";
import NavButton from "./NavButton";
import styles from "./TopBar.module.css";
import ReportProblemModal from "./ReportProblemModal";
import Image from 'react-bootstrap/Image'

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

  return (
    <>
      <NavBar
        className={styles.topNavBar}
        style={{ borderBottom: "1px solid #C4C4C4" }}
      >
        <Container fluid>
          <NavBar.Brand>
            <Image src={logo} alt="כספיון" width={50} height={50} roundedCircle /> כספיון
          </NavBar.Brand>
          <Stack direction="horizontal" gap={5}>
            <NavButton onClick={handleReportProblem} text="דיווח על בעיה" />
            <NavButton onClick={handleDiscord} text="ערוץ הדיסקורד שלנו" />
            <NavButton onClick={handleOpenGithub} text="לפתוח ב-Github" />
          </Stack>
        </Container>
      </NavBar>
      <ReportProblemModal show={showReportModal} handleCloseModal={handleCloseModal}/>
    </>
  );
}

export default TopBar;
