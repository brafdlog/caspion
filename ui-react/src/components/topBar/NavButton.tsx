import React from 'react';
import { Button } from 'react-bootstrap';
import navEllipseIcon from "../../assets/navEllipse.svg"

function NavButton({onClick, text}) {
  return (
    <div>
     <img src={navEllipseIcon} alt='navEllipse' />
      <Button variant="light" onClick={onClick} style={{backgroundColor:"transparent", borderWidth:0}}>{text}</Button> 
    </div>
  )
}

export default NavButton;