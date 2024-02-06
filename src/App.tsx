import { CssBaseline, CssVarsProvider } from '@mui/joy';
import * as Sentry from '@sentry/browser';
import { RecoilRoot } from 'recoil';

import { Router } from '@/routes';

export function App() {
  Sentry.init({
    dsn: 'http://localhost:5173', // Substitua pelo seu DSN
    // Outras configurações opcionais, como release, environment, etc.
  });

  return (
    <RecoilRoot>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Router />
      </CssVarsProvider>
    </RecoilRoot>
  );
}

export default App;
