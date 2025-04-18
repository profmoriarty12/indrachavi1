
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-epitone-softPurple/50 backdrop-blur-sm z-50">
      <div className="text-center">
        <motion.div
          className="w-24 h-24 mb-4 mx-auto"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full border-4 border-t-epitone-purple border-r-epitone-blue border-b-epitone-orange border-l-epitone-softPeach"></div>
        </motion.div>
        <motion.h2 
          className="text-2xl font-bold text-epitone-darkPurple"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading
        </motion.h2>
        <p className="text-epitone-darkPurple/70">
          Preparing EpiTone experience...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
