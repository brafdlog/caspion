import React, { useContext, useState } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import { Container, Stack } from 'react-bootstrap';
import logo from '../../assets/logoFishOnly.svg';
import { openExternal } from '../../eventsBridge';

import NavButton from './NavButton';
import styles from './TopBar.module.css';
import ReportProblemModal from './ReportProblemModal';
import { StoreContext } from '../../Store';

function TopBar() {
  const [show, setShow] = useState(false);
  const store = useContext(StoreContext);

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
              onClick={() => openExternal(store.appInfo?.discordChanel)}
              text="ערוץ הדיסקורד שלנו"
            />
            <NavButton
              onClick={() => openExternal(store.appInfo?.repository)}
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
