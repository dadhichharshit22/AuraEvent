import React from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col w-full items-center">
    <label htmlFor={id} className="sr-only">{placeholder}</label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded-xl px-4 py-2 w-1/2"
    />
  </div>
);