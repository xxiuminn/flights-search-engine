import React, { Suspense } from "react";
import Display from "./components/Display";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
const Main = React.lazy(() => import("./pages/Main"));
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
            <Route path="/" element={<Navigate replace to="/main" />} />
            <Route path="main" element={<Main />} />
            <Route path="flights" element={<Flights />} />
            <Route path="*" element={<Main />} />
            <Route path="saved" element={<Saved />} />
          </Routes>
        </Suspense>
        {/* <Display /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
