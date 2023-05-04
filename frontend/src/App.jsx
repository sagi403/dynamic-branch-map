import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

export default App;
