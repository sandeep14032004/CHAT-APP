import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern";
import { motion } from "framer-motion";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { verifyOtp } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error("Enter a valid 6-digit OTP");
    verifyOtp(otp, navigate);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#000000] text-white">
      {/* Left Side - Form */}
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
                className="size-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-cyan-400/30 shadow-md transition-all"
              >
                <ShieldCheck className="size-8 text-cyan-400" />
              </motion.div>
              <h1 className="text-3xl font-bold tracking-wider text-cyan-300">
                OTP Verification
              </h1>
              <p className="text-white/60 text-sm">
                Enter the code sent to your email
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text text-white/80">Enter OTP</span>
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="••••••"
                className="input input-bordered w-full text-center tracking-widest text-lg bg-transparent border border-cyan-400/30 focus:border-cyan-400 text-white placeholder-white/40 transition-all duration-200"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-white font-semibold w-full shadow-md transition-all duration-200"
            >
              Verify OTP
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Right Side - Image / Pattern */}
      <AuthImagePattern
        title="Secure your account"
        subtitle="We’ve sent you a code to verify it’s really you"
      />
    </div>
  );
};

export default Otp;
