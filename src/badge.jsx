import React from "react";

export function Badge({ children, variant = "default", className = "" }) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium";
  const variants = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    outline: "border border-gray-400 text-gray-700",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
