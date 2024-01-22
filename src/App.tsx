import { CssBaseline, CssVarsProvider } from '@mui/joy';

import { Router } from './routes';

export function App() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Router />
    </CssVarsProvider>
  );
}

export default App;
