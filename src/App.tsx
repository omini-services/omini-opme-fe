import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import React from 'react';
import { RecoilRoot } from 'recoil';

import { Router } from '@/routes';

const materialTheme = materialExtendTheme();

export function App() {
  return (
    <MaterialCssVarsProvider
      defaultMode="system"
      theme={{ [MATERIAL_THEME_ID]: materialTheme }}
    >
      <JoyCssVarsProvider defaultMode="system">
        <CssBaseline enableColorScheme />
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

export default App;
