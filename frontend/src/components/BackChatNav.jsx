import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BackChatNav = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center mb-6">
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
  );
};

export default BackChatNav;
