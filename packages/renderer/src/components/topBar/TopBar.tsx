import { openExternal } from '#preload';
import { useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import NavBar from 'react-bootstrap/Navbar';
import logo from '../../assets/logoFishOnly.svg';

import NavButton from './NavButton';
import ReportProblemModal from './ReportProblemModal';
import styles from './TopBar.module.css';
import { useAppInfoStore } from '/@/store';

function TopBar() {
  const [show, setShow] = useState(false);
  const appInfoStore = useAppInfoStore();

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
              onClick={() => openExternal(appInfoStore.appInfo?.discordChanel)}
              text="ערוץ הדיסקורד שלנו"
            />
            <NavButton
              onClick={() => openExternal(appInfoStore.appInfo?.repository)}
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
