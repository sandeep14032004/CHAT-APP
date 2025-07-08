import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }

    const res = await login(formData, navigate);
    if (res?.success !== false) {
      toast.success("Welcome back!");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#000000] text-white">
      {/* Left Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-cyan-400/10 shadow-[0_8px_32px_0_rgba(0,210,255,0.25)]">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="size-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-cyan-400/30 shadow-md transition-all"
              >
                <LogIn className="size-6 text-cyan-400" />
              </motion.div>
              <h1 className="text-3xl font-bold tracking-wider text-cyan-300">
                Welcome Back
              </h1>
              <p className="text-white/60 text-sm">
                Login to continue the journey 🚀
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="you@example.com"
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
                  placeholder="••••••••"
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
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-white font-semibold w-full shadow-md transition-all duration-200"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </motion.button>
          </form>

          <div className="text-center mt-6 text-white/60 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-300 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Auth Image */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Let’s pick up where you left off."
      />
    </div>
  );
};

export default LoginPage;
