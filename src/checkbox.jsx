import React from "react";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 border-gray-300 rounded accent-blue-600"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;
