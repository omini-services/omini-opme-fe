import { CssVarsProvider } from '@mui/joy';
import { DefaultColorScheme } from '@mui/joy/styles/types';
import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ThemeModeToggle } from '@components/ThemeModeToggle';

const wrapper = (colorScheme: DefaultColorScheme) => (
  <CssVarsProvider defaultColorScheme={colorScheme}>
    <ThemeModeToggle />
  </CssVarsProvider>
);

describe('ThemeMode', () => {
  it.each<DefaultColorScheme>(['dark', 'light'])(
    'should switch theme to %s',
    (initialMode) => {
      const { getByText } = render(wrapper(initialMode));

      const button = getByText(/Turn (dark|light)/i);
      expect(button).toBeInTheDocument();

      act(() => {
        fireEvent.click(button);
      });

      if (initialMode === 'dark') {
        expect(button).toHaveTextContent('Turn light');
      }

      if (initialMode === 'light') {
        expect(button).toHaveTextContent('Turn dark');
      }
    },
  );
});
