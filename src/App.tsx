import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { ThemeProvider } from '@mui/styles';
import { RecoilRoot } from 'recoil';
import theme from "@/themes/theme"

import { Router } from '@/routes';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Router />
        </CssVarsProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
