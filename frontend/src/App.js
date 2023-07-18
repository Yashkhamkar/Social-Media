import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Auth/Auth";
import VerifyUser from "./Auth/VerifyUser";
import Home from "./components/Home";
import ResetPassword from "./Auth/ResetPassword";
import ForgotPassword from "./Auth/ForgotPassword";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./components/NewProfile/ProfilePage";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/verify/:id" element={<VerifyUser />} />
        <Route path="/reset/:id" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
