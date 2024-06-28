import { Brand } from './components/brand'
import { UserAuthForm } from "./components/user-auth-form"

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-full max flex-col items-center justify-center grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <a
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </a> */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 h-full flex items-center justify-center text-lg font-medium">
            <Brand className='w-96'/>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Bem vindo
              </h1>
              <p className="text-sm text-muted-foreground">
                Clique no botão para se conectar
              </p>
            </div>
            <UserAuthForm />
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  )
}
