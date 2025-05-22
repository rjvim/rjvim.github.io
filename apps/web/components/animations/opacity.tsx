"use client";

import { motion } from "framer-motion";
import { cn } from "@repo/shadverse/lib/utils";

const boxClasses =
  "h-20 w-20 flex items-center justify-center text-xs rounded-lg border text-white";

export default function Opacity() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          boxClasses,
          "bg-blue-600 opacity-100 transition-opacity duration-700 ease-out hover:opacity-50"
        )}
      >
        With CSS
      </div>

      <motion.div
        className={cn(boxClasses, "bg-yellow-600")}
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
