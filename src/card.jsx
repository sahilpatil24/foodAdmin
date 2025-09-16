import React from "react";

// Main Card wrapper
export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white text-gray-900 flex flex-col rounded-xl border shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

// Card header
export function CardHeader({ children, className = "" }) {
  return <div className={`px-6 pt-6 ${className}`}>{children}</div>;
}

// Card title
export function CardTitle({ children, className = "" }) {
  return (
    <h2 className={`text-lg font-semibold leading-none ${className}`}>
      {children}
    </h2>
  );
}

// Card description
export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-gray-600 text-sm mt-1 ${className}`}>{children}</p>
  );
}

// Card content
export function CardContent({ children, className = "" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

// Card footer
export function CardFooter({ children, className = "" }) {
  return (
    <div className={`px-6 pb-6 flex items-center ${className}`}>{children}</div>
  );
}
