import React from 'react';
import { Provider } from 'jotai';
import { Router } from '@/routes';

import './App.css';

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
