import React, { useState } from "react";

export function Select({ children, defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue || "");
  const [open, setOpen] = useState(false);

  const handleSelect = (val) => {
    setValue(val);
    setOpen(false);
    if (onChange) onChange(val);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border rounded-lg px-3 py-2 bg-white shadow-sm"
      >
        <span>{value || "Select..."}</span>
        <span className="ml-2 text-gray-500">▼</span>
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onSelect: handleSelect })
          )}
        </div>
      )}
    </div>
  );
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue({ children }) {
  return <>{children}</>;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}

export function SelectItem({ children, value, onSelect }) {
  return (
    <div
      onClick={() => onSelect(value)}
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
}
