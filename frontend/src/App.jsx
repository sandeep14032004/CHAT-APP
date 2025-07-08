import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Otp from "./pages/Otp";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth, otpEmail } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300">
        <div className="flex items-center justify-center mb-6">
          <Loader className="size-20 animate-spin text-blue-400 dark:text-blue-300 drop-shadow-2xl" />
        </div>
        <span className="text-2xl font-bold text-blue-800 dark:text-blue-200 animate-pulse tracking-wider shadow-md">
          Loading, please wait...
        </span>
      </div>
    );
  }

  return (
    <div
      data-theme={theme}
      className="min-h-screen transition-all duration-300"
    >
      <Navbar />

      <main className="pt-16">
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
          <Route
            path="/otp"
            element={!authUser && otpEmail ? <Otp /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
