"use client";

import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? 95 : prev + 7));
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Progress value={progress} className="h-1 w-full" />
    </div>
  );
}
