"use client";

import { motion } from "framer-motion";

export default function KeyframesBox() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-500 h-20 w-20 transition-transform duration-600 ease-out hover:animate-move">
        With CSS
      </div>

      <motion.div
        className="bg-blue-500 h-20 w-20"
        initial={{ x: 200 }}
        animate={{ x: [200, 0] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
