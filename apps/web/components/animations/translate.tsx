"use client";

import { motion } from "framer-motion";
import { cn } from "@repo/shadverse/lib/utils";

const boxClasses =
  "h-20 w-20 flex items-center justify-center text-xs rounded-lg border text-white";

export default function TranslateBox() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          boxClasses,
          "bg-blue-500 duration-700 ease-out hover:translate-x-[50px]"
        )}
      >
        With CSS
      </div>

      <motion.div
        className={cn(boxClasses, "bg-yellow-500")}
        initial={{ x: 0 }}
        whileHover={{ x: 50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
