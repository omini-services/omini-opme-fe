import { Router } from '@/routes';
import { Provider } from 'jotai';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
