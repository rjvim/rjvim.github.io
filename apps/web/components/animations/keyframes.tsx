"use client";

import { motion } from "framer-motion";
import { cn } from "@repo/shadverse/lib/utils";

const boxClasses = "h-20 w-20 flex items-center justify-center text-xs rounded-lg border text-white";

export default function KeyframesBox() {
  return (
    <div className="flex flex-col gap-4">
      <div className={cn(boxClasses, "bg-blue-500 transition-transform duration-600 ease-out hover:animate-move")}>
        With CSS
      </div>

      <motion.div
        className={cn(boxClasses, "bg-blue-500")}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
