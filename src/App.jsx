import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
const Flights = React.lazy(() => import("./pages/Flights"));
const Saved = React.lazy(() => import("./pages/Saved"));

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/flights" />} />
            <Route path="flights" element={<Flights />} />
            <Route path="*" element={<Flights />} />
            <Route path="saved" element={<Saved />} />
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App;
