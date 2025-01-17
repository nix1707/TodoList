import React from "react";

const Dropdown = ({ options, value, onSelect }) => {
  return (
    <select
      value={value}
      required
      onChange={onSelect}
      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {options.map((o, idx) => (
        <option key={idx} value={o}>{o}</option>
      ))}
    </select>
  );
};

export default Dropdown;
