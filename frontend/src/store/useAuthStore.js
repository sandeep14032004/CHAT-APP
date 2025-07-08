import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  otpEmail: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isUpdatingProfile: false, // <-- this was missing

  // ✅ Check Auth
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/auth/signup", data);
      set({ otpEmail: data.email });
      toast.success("OTP sent to your email");
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      return { success: false };
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ✅ OTP Verify
  verifyOtp: async (otp, navigate) => {
    const email = get().otpEmail;
    if (!email) return toast.error("No OTP email context found");

    try {
      await axiosInstance.post("/auth/verify-otp", { email, otp });
      toast.success("Account verified! Please log in.");
      set({ otpEmail: null });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  },

  // ✅ Login + Fetch Updated User
  login: async (data, navigate) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);

      // After login, fetch latest user info (includes updated profilePic)
      const userRes = await axiosInstance.get("/auth/check");

      set({ authUser: userRes.data });
      toast.success("Login successful!");
      navigate("/");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return { success: false };
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.post("/auth/update-profile", data);

      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
