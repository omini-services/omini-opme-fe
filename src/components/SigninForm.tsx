// eslint-disable-next-line import/no-unresolved
import { notificationState } from '@atoms/notification';
// eslint-disable-next-line import/no-unresolved
import { AuthContext, SignInData } from '@contexts/AuthContext';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Checkbox,
  Button,
} from '@mui/joy';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const SigninForm = () => {
  const setNotification = useSetRecoilState(notificationState);
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: SignInData) {
    await signIn(data);
    setNotification('Usuario logado com sucesso');
  }

  return (
    <form
      onSubmit={
        // @ts-ignore
        handleSubmit(handleSignIn)
      }
    >
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input {...register('email')} type="email" name="email" />
      </FormControl>
      <FormControl required>
        <FormLabel>Password</FormLabel>
        <Input {...register('password')} type="password" name="password" />
      </FormControl>
      <Stack gap={4} sx={{ mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Checkbox size="sm" label="Remember me" name="persistent" />
          {/* @ts-ignore */}
          <Link level="title-sm" href="#replace-with-a-link">
            Forgot your password?
          </Link>
        </Box>
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </Stack>
    </form>
  );
};

export default SigninForm;
