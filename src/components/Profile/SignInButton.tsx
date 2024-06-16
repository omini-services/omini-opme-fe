import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/joy/Button';

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useAuth0] package
 */

export const SignInButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect().catch((e) => {
      console.log(e);
    });
  };

  return <Button onClick={handleLogin}>Signin</Button>;
};
