import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black relative overflow-hidden rounded-xl shadow-2xl"
    >
      {/* Decorative glowing background orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full -top-10 -left-10 animate-pulse"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-600/10 blur-2xl rounded-full -bottom-20 -right-20 animate-pulse"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Core Content */}
      <div className="relative z-10 max-w-md text-center">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className={`aspect-square rounded-2xl backdrop-blur-md border border-cyan-400/20 ${
                i % 2 === 0 ? "bg-cyan-400/10" : "bg-blue-400/10"
              } shadow-md`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <motion.h2
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-sm text-blue-100/70 leading-relaxed px-2 backdrop-blur-sm rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AuthImagePattern;
