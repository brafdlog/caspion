import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import logo from '../../assets/logoFishOnly.svg';

function TopBar() {

  return (
    <NavBar bg={'light'}>
      <Container>
        <NavBar.Brand><img src={logo} alt="כספיון" width={50} height={50} /></NavBar.Brand>
      </Container>
    </NavBar>
  );
}

export default TopBar;
