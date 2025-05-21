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
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
