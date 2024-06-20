import { Provider } from 'jotai';
import { Router } from '@/routes';

import './globals.css';

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
