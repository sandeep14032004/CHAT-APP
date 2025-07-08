import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { ArrowLeftCircle, ArrowRightCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-base-100 text-base-content"
    >
      <div className="min-h-screen px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 max-w-6xl mx-auto">
        <div className="space-y-10">
          {/* 🔙 Back Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-base-content bg-base-100 hover:bg-base-200 hover:text-primary px-5 py-2.5 rounded-lg transition-all duration-200 border border-primary/30 hover:border-primary shadow-glass hover:shadow-md"
            >
              <ArrowLeftCircle className="w-5 h-5 transition-colors duration-200" />
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm font-medium text-base-content bg-base-100 hover:bg-base-200 hover:text-secondary px-5 py-2.5 rounded-lg transition-all duration-200 border border-secondary/30 hover:border-secondary shadow-glass hover:shadow-md"
            >
              <ArrowRightCircle className="w-5 h-5 transition-colors duration-200" />
              Chat
            </motion.button>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-base-content">Theme</h2>
            <p className="text-sm text-base-content/70">
              Choose a theme for your chat interface
            </p>
          </div>

          {/* Theme Options */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  theme === t ? "bg-base-200" : "hover:bg-base-200/50"
                }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Preview Header */}
          <h3 className="text-xl font-semibold text-base-content">Preview</h3>

          {/* Chat Preview */}
          <div className="rounded-xl border border-base-300 bg-base-100 shadow-md overflow-hidden">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto space-y-4">
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200 text-base-content"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-[10px] mt-1.5 ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }`}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
