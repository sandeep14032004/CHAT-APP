import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await signup(formData);
    if (res?.success !== false) {
      navigate("/otp");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white overflow-hidden ">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-cyan-500/10 shadow-[0_8px_32px_0_rgba(0,210,255,0.37)] transition-all duration-300">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="size-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-cyan-400/30 shadow-md transition-all"
              >
                <MessageSquare className="size-6 text-cyan-400" />
              </motion.div>
              <h1 className="text-3xl font-bold tracking-wider text-cyan-300">
                Create Account
              </h1>
              <p className="text-white/50 text-sm">
                Join us and experience the future ✨
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text text-white/80">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-white/40 size-5" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 bg-transparent border border-cyan-400/30 focus:border-cyan-400 text-white placeholder-white/50 transition-all duration-200"
                  placeholder="Enter Your Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text text-white/80">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-white/40 size-5" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 bg-transparent border border-cyan-400/30 focus:border-cyan-400 text-white placeholder-white/50 transition-all duration-200"
                  placeholder="Enter your E-mail"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text text-white/80">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-white/40 size-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-10 bg-transparent border border-cyan-400/30 focus:border-cyan-400 text-white placeholder-white/50 transition-all duration-200"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-white/40 hover:text-cyan-300 transition-all"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-white font-semibold w-full shadow-md transition-all duration-200"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Signing up...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <div className="text-center mt-6 text-white/60 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right Side Image/Pattern */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
