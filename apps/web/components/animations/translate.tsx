"use client";

import { motion } from "framer-motion";

export default function TranslateBox() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-500 h-20 w-20 duration-700 ease-out hover:translate-x-[50px]">
        With CSS
      </div>

      <motion.div
        className="bg-blue-500 h-20 w-20"
        initial={{ x: 0 }}
        whileHover={{ x: 50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
