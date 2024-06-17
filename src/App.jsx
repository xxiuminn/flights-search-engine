import React from "react";
import Display from "./components/Display";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import FetchToken from "./components/FetchToken";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Display />
    </QueryClientProvider>
  );
}

export default App;
