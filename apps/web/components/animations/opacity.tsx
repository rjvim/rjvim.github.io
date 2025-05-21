"use client";

import { motion } from "framer-motion";

export default function Opacity() {
  return (
    <div className="flex gap-4">
      <div className="bg-blue-500 h-20 w-20 opacity-100 transition-opacity duration-700 ease-out hover:opacity-50">
        With CSS
      </div>

      <motion.div
        className="bg-blue-500 h-20 w-20" // Tailwind for styling
        initial={{ opacity: 0 }} // Start transparent
        animate={{ opacity: 1 }} // Fade to opaque
        whileHover={{ opacity: 0.5 }} // 50% opacity on hover
        transition={{ duration: 2, ease: "easeOut" }} // Match CSS timing
      >
        With Motion
      </motion.div>
    </div>
  );
}
