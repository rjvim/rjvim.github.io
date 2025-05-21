"use client";

import { motion } from "framer-motion";

export default function RotateBox() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-500 h-20 w-20 duration-300 ease-out hover:rotate-45">
        With CSS
      </div>

      <motion.div
        className="bg-blue-500 h-20 w-20"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 45 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
