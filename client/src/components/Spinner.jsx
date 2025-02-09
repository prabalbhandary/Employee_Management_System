import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin sm:w-12 sm:h-12"></div>
    </div>
  );
};

export default Spinner;
