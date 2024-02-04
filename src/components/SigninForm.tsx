import { useMsal } from '@azure/msal-react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import MenuItem from '@mui/joy/MenuItem';
import Select from '@mui/joy/Select';
import InputLabel from '@mui/material/InputLabel';
import { SetStateAction, useEffect, useState } from 'react';

import { loginRequest } from '../configs/authConfig';

const SigninForm = () => {
  const [loginType, setLoginType] = useState('');
  const { instance } = useMsal();

  const handleLogin = (value: SetStateAction<string>) => {
    setLoginType(value);
  };

  useEffect(() => {
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  }, [loginType, instance]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="login-type-label">Login Type</InputLabel>
        <Select
          labelId="login-type-label"
          id="login-type-select"
          value={loginType}
          label="Login Type"
          onChange={handleLogin}
        >
          <MenuItem value="popup">Sign in using Popup</MenuItem>
          <MenuItem value="redirect">Sign in using Redirect</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SigninForm;
