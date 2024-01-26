import { FormControl, FormLabel, Input, Stack, Button } from '@mui/joy';
import { SignUpData } from '@types/SignUpData';
import { useForm } from 'react-hook-form';

export const SignupForm = () => {
  const { register, handleSubmit } = useForm();

  const handleSignUp = async (data: SignUpData) => {};

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
        <Button type="submit" fullWidth>
          Cadastrar
        </Button>
      </Stack>
    </form>
  );
};
