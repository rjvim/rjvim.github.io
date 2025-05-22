"use client";

import { motion, useAnimate, useInView } from "framer-motion";
import { cn } from "@repo/shadverse/lib/utils";
import { useEffect } from "react";

const boxClasses =
  "h-20 w-20 flex items-center justify-center text-xs rounded-lg border text-white text-center";

export default function KeyframesBox() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { x: 0 }, { type: "spring", duration: 1 });
    }
  }, [isInView]);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(boxClasses, "bg-blue-500 animate-move")}
        style={{ transform: "translateX(-100px)" }}
      >
        With CSS
      </div>

      <motion.div
        className={cn(boxClasses, "bg-yellow-500")}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 2 }}
      >
        With Motion (Page Load)
      </motion.div>

      <motion.div
        className={cn(boxClasses, "bg-green-500")}
        ref={scope}
        initial={{ x: -100 }}
      >
        With Motion (On View)
      </motion.div>
    </div>
  );
}
