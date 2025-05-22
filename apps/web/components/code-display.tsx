"use client";

import React from "react";

interface CodeDisplayProps {
  component: React.ReactNode;
  children: React.ReactNode;
}

export default function CodeDisplay({ component, children }: CodeDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="w-full overflow-hidden">{children}</div>
      <div className="w-full flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        {component}
      </div>
    </div>
  );
}
