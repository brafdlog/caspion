import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Credentials } from '../../../../../src/src/backend/commonTypes';
import { electronGoogleOAuth2Connector } from '../../../eventsBridge';

type LoginButtonProps = {
  onCredentialsChange: (credentials: Credentials) => void;
};
const LoginButton: React.FC<LoginButtonProps> = ({ onCredentialsChange }) => {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const credentials = await electronGoogleOAuth2Connector();
      onCredentialsChange(credentials);
      setLoading(false);
    } catch (ex) {
      console.error(ex);
      setLoading(false);
      onCredentialsChange(null);
    }
  };

  return (
    <Button onClick={login} disabled={loading}>
      Login to Google
    </Button>
  );
};

export default LoginButton;
