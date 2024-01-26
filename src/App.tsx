import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { RecoilRoot } from 'recoil';

import { Router } from '@/Routes';

export function App() {
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
