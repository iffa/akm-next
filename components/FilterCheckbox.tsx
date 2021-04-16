import React from 'react';

export const FilterCheckbox: React.FC<{
  title: string;
  name: string;
  value: string;
  checked: boolean;
  onChecked: (checked) => unknown;
}> = ({ title, name, value, checked, onChecked }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChecked(e.target.checked)}
      />
      <span className="ml-2 text-gray-900">{title}</span>
    </label>
  );
};
