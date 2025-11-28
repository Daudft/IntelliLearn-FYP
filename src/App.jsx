import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing Page
import LandingPage from "./pages/Landing/LandingPage";

// Auth Pages
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ResetPassword from "./pages/Auth/ResetPassword"; // <-- ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Must include token param */}
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* New Reset Password Route */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
