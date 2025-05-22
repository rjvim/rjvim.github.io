"use client";

import { motion } from "framer-motion";
import { cn } from "@repo/shadverse/lib/utils";

const boxClasses =
  "h-20 w-20 flex items-center justify-center text-xs rounded-lg border text-white";

export default function RotateBox() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          boxClasses,
          "bg-blue-500 duration-300 ease-out hover:rotate-45"
        )}
      >
        With CSS
      </div>

      <motion.div
        className={cn(boxClasses, "bg-yellow-500")}
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 45 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
