import { Loader2 } from "lucide-react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-row h-full justify-center items-center">
      <Loader2 size={40} className="animate-spin mr-2" />
      <span className="flex items-center">
        Optimizing software
        <span className="ml-2 flex space-x-1">
          <span className="dot dot1" />
          <span className="dot dot2" />
          <span className="dot dot3" />
        </span>
      </span>
    </div>
  );
};

export default Loading;
