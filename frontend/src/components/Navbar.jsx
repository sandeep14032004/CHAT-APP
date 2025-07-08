import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md shadow-lg border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              className="size-10 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 text-cyan-400 flex items-center justify-center shadow-cyan-500/10 shadow-inner"
            >
              <MessageSquare className="w-5 h-5" />
            </motion.div>
            <motion.h1
              className="text-xl font-extrabold tracking-wide text-white group-hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Nexchat
            </motion.h1>
          </Link>

          {/* Right: Nav Buttons */}
          <div className="flex items-center gap-3">
            {authUser && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/settings"
                  className="btn btn-sm bg-[#1e293b] text-slate-200 hover:bg-cyan-500/10 border border-cyan-500/20 shadow-md shadow-cyan-500/10 transition-all duration-300 gap-2"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>
              </motion.div>
            )}

            {authUser && (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/profile"
                    className="btn btn-sm bg-[#1e293b] text-slate-200 hover:bg-cyan-500/10 border border-cyan-500/20 shadow-md shadow-cyan-500/10 transition-all duration-300 gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <button
                    onClick={logout}
                    className="btn btn-sm bg-[#1e1b4b] text-red-400 hover:bg-red-600/10 border border-red-500/30 shadow-md shadow-red-500/10 transition-all duration-300 gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
