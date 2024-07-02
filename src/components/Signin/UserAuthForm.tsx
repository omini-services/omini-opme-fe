import { Icons } from '@/components/shadcn/default/icons';
import { Button } from '@/components/shadcn/new-york/button';
import { cn } from '@/lib/utils';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect().catch((e) => {
      console.log(e);
    });
  };

  const onSubmit = (event: React.SyntheticEvent) => handleLogin();

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}
