import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginWithRedirect, error } = useAuth0();

  useEffect(() => {
    // Perform login when component mounts
    loginWithRedirect().catch((e) => {
      console.error('Authentication error:', e);
    });
  }, [loginWithRedirect]);

  // const handleLogin = () => {
  //   loginWithRedirect().catch((e) => {
  //     console.log(e);
  //   });
  // };

  // const onSubmit = (event: React.SyntheticEvent) => handleLogin();

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // return (
  //   <div>
  //     <Loading />
  //   </div>
    // <div className={cn('grid gap-6', className)} {...props}>
    //   <form onSubmit={onSubmit}>
    //     <div className="grid gap-2">
    //       <Button disabled={isLoading}>
    //         {isLoading && (
    //           <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    //         )}
    //         Entrar
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  //);
}
