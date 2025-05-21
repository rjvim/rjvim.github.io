"use client";

import { motion } from "framer-motion";

export default function TransformOriginBox() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-500 h-20 w-20 transition-transform duration-300 ease-out hover:scale-150 origin-top-left">
        With CSS
      </div>

      <motion.div
        className="bg-blue-500 h-20 w-20"
        initial={{ scale: 1, originX: 0, originY: 0 }}
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
