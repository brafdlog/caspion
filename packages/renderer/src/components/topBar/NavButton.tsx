import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import navEllipseIcon from '../../assets/navEllipse.svg';

interface NavButtonProps {
  text: string;
  onClick: () => void;
}

function NavButton({ onClick, text }: NavButtonProps) {
  return (
    <Button
      variant="light"
      onClick={onClick}
      style={{ backgroundColor: 'transparent', borderWidth: 0 }}
    >
      <Stack direction="horizontal">
        <div
          style={{
            cursor: 'pointer',
            backgroundImage: `url(${navEllipseIcon})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: 50,
            height: 50,
          }}
        />
        {text}
      </Stack>
    </Button>
  );
}

export default NavButton;
