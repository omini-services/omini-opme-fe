import { UserAuthForm } from '@/components/Signin/UserAuthForm';

export default function AuthenticationPage() {
  return (
    // <div
    //   id="auth"
    //   className="container relative h-full max flex-col items-center justify-center grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
    // >
    //   <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
    //     <div className="absolute inset-0 bg-zinc-900" />
    //     <div className="relative z-20 h-full flex items-center justify-center text-lg font-medium">
    //       <Brand className="w-96" />
    //     </div>
    //   </div>
    //   <div className="lg:p-8">
    //     <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    //       <div className="flex flex-col space-y-2 text-center">
    //         <h1 className="text-2xl font-semibold tracking-tight">Bem vindo</h1>
    //       </div>
          <UserAuthForm />
    //     </div>
    //   </div>
    // </div>
  );
}
