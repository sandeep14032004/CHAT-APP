import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Navigate } from "react-router-dom";

import Otp from "./pages/Otp";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-blue-900 to-black">
        <div className="flex items-center justify-center mb-6">
          <Loader className="size-20 animate-spin text-blue-300 drop-shadow-2xl" />
        </div>
        <span className="text-2xl font-bold text-blue-200 animate-pulse tracking-wider shadow-md">
          Loading, please wait...
        </span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/otp" element={<Otp />} />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
