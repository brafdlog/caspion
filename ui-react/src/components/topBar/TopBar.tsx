import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import { Container, Stack } from 'react-bootstrap';
import logo from '../../assets/logoFishOnly.svg';
import { openExternal } from '../../eventsBridge';
import { repository } from '../../../package.json';
import { discordchannel } from '../../../package.json';
import NavButton from './NavButton';
import styles from './TopBar.module.css';

function TopBar() {

const handleOpenGithub = ()=>{
  openExternal(repository)
}

const handleDiscord = ()=>{
  openExternal(discordchannel);
}

const handleReportProblem = ()=>{
  
}

  return (
    <NavBar className={styles.navBar}>
        <Container fluid>
            <NavBar.Brand><img src={logo} alt="כספיון" width={50} height={50} /> כספיון</NavBar.Brand>
            <Stack direction="horizontal" gap={5}>
            {/* <NavButton onClick={handleReportProblem} text="דיווח על בעיה"/> */}
            <NavButton onClick={handleDiscord} text="ערוץ הדיסקורד שלנו"/>
            <NavButton onClick={handleOpenGithub} text="לפתוח ב-Github"/>
            </Stack>
         </Container>
    </NavBar>
  );
}

export default TopBar;
