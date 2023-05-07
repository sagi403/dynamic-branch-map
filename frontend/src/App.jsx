import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage.jsx";
import MapPage from "./screens/MapPage.jsx";
import { useInitScript } from "./utils/useInitScript.js";

const queryClient = new QueryClient();

const App = () => {
  const isLoaded = useInitScript();

  if (!isLoaded) return;

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
