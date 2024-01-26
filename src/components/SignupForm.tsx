// eslint-disable-next-line import/no-unresolved
import { useSignUp } from '@hooks/useSignUp';
import { FormControl, FormLabel, Input, Stack, Button } from '@mui/joy';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved, import/order
import { SignUpData } from '@types/SignUpData';

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const { signUp, loading } = useSignUp();

  const handleSignUp = async (formData: SignUpData) => {
    await signUp(formData);
  };

  return (
    <form
      onSubmit={
        // @ts-ignore
        handleSubmit(handleSignUp)
      }
    >
      <FormControl required>
        <FormLabel>Nome</FormLabel>
        <Input {...register('name')} type="text" name="name" />
      </FormControl>
      <FormControl required>
        <FormLabel>Telefone</FormLabel>
        <Input {...register('phone')} type="tel" name="phone" />
      </FormControl>
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input {...register('email')} type="email" name="email" />
      </FormControl>
      <FormControl required>
        <FormLabel>Password</FormLabel>
        <Input {...register('password')} type="password" name="password" />
      </FormControl>
      <Stack gap={4} sx={{ mt: 2 }}>
        <Button type="submit" fullWidth loading={loading} disabled={loading}>
          Cadastrar
        </Button>
      </Stack>
    </form>
  );
};

export default SignupForm;
