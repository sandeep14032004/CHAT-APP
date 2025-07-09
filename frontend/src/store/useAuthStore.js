import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://nexchat-backend-ski0.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  otpEmail: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  // ✅ Check Auth
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log("Error in checkAuth:", err);
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
      await axiosInstance.post("/auth/login", data);
      const userRes = await axiosInstance.get("/auth/check");

      set({ authUser: userRes.data });
      toast.success("Login successful!");
      get().connectSocket();
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
      get().disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  // ✅ Profile Update
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

  // ✅ Connect Socket
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // Optional: Handle disconnection
    socket.on("disconnect", () => {
      set({ onlineUsers: [] });
    });
  },

  // ✅ Disconnect Socket
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
    set({ socket: null, onlineUsers: [] });
  },
}));
