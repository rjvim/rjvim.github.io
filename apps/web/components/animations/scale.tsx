"use client";

import { motion } from "framer-motion";

export default function Scale() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-500 h-20 w-20 duration-300 ease-out hover:scale-150">
        With CSS
      </div>

      <motion.div
        className="bg-blue-500 h-20 w-20"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
