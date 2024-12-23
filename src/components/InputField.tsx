import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  leftIcon,
  isPassword = false,
  isError = false,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative mb-8">
      {leftIcon && (
        <span
          className={`absolute inset-y-0 left-4 flex items-center ${
            isError ? "text-red-500" : "text-gray-400"
          }`}
        >
          {leftIcon}
        </span>
      )}
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`px-4 py-3 w-full border ${
          isError ? "border-red-500" : "border-gray-300"
        } placeholder:${
          isError ? "text-red-500" : "text-gray-400"
        } rounded-md ${leftIcon ? "pl-10" : ""} ${
          isPassword ? "pr-10" : ""
        } ${className}`}
      />
      {isPassword && (
        <span
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </span>
      )}
      {/* Display error message if any */}
      {isError && errorMessage && (
        <p className="text-red-500 text-xs absolute right-0 mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
