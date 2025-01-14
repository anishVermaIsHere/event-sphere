import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      staleTime: 60 * 1000
    },
  },
});

const QueryProvider = ({ children }) => {
 return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
};

export default QueryProvider;
