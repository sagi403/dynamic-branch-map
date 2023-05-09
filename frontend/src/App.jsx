import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import MapPage from "./screens/MapPage";
import { useInitScript } from "./hooks/useInitScript";

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
