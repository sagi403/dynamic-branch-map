import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage.jsx";
import MapPage from "./screens/MapPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
};

export default App;
