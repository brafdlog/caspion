import React, { useState } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import { Container, Stack } from 'react-bootstrap';
import logo from '../../assets/logoFishOnly.svg';
import { openExternal } from '../../eventsBridge';
import { repository, discordchannel } from '../../../package.json';

import NavButton from './NavButton';
import styles from './TopBar.module.css';
import ReportProblemModal from './ReportProblemModal';

function TopBar() {
  const [show, setShow] = useState(false);

  return (
    <>
      <NavBar
        className={styles.topNavBar}
        style={{ borderBottom: '1px solid #C4C4C4' }}
      >
        <Container fluid>
          <NavBar.Brand>
            <Stack direction="horizontal" gap={3}>
              <div
                style={{
                  backgroundImage: `url(${logo})`,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                }}
              ></div>
              כספיון
            </Stack>
          </NavBar.Brand>
          <Stack direction="horizontal" gap={5}>
            <NavButton onClick={() => setShow(true)} text="דיווח על בעיה" />
            <NavButton
              onClick={() => openExternal(discordchannel)}
              text="ערוץ הדיסקורד שלנו"
            />
            <NavButton
              onClick={() => openExternal(repository)}
              text="לפתוח ב-Github"
            />
          </Stack>
        </Container>
      </NavBar>
      <ReportProblemModal show={show} onClose={() => setShow(false)} />
    </>
  );
}

export default TopBar;
