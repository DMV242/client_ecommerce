import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Profile from "./pages/Profile";
import Player from "./pages/Player";
import Admin from "./pages/Admin";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
