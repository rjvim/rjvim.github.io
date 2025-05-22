"use client";

import { motion } from "framer-motion";
import { cn } from "@repo/shadverse/lib/utils";

const boxClasses = "h-20 w-20 flex items-center justify-center text-xs rounded-lg border text-white";

export default function Scale() {
  return (
    <div className="flex flex-col gap-4">
      <div className={cn(boxClasses, "bg-blue-500 duration-300 ease-out hover:scale-150")}>
        With CSS
      </div>

      <motion.div
        className={cn(boxClasses, "bg-blue-500")}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        With Motion
      </motion.div>
    </div>
  );
}
