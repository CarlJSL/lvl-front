import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './providers/QueryProvider';
import { AppRouter } from './router';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}
