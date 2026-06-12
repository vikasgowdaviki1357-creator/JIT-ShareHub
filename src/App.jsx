import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellItem from "./pages/SellItem";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Resources from "./pages/Resources";
import MyProducts from "./pages/MyProducts";
import Profile from "./pages/Profile";
import AIAssistant from "./pages/AIAssistant";
import { Link } from "react-router-dom";
import Placements from "./pages/Placements";
import ResumeBuilder from "./pages/ResumeBuilder";
import Events from "./pages/Events";
import Leaderboard from "./pages/Leaderboard";
import UploadResource from "./pages/UploadResource";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/sell" element={<SellItem />} />
        <Route path="/my-products" element={<MyProducts />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/ai-assistant" element={<AIAssistant />}/>
        <Route path="/placements" element={<Placements />}/>
        <Route path="/resume-builder" element={<ResumeBuilder />}/>
        <Route path="/events" element={<Events />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/upload-resource" element={<UploadResource />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;