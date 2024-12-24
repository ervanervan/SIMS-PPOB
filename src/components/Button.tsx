import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // Tambahkan properti disabled
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false, // Default disabled ke false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-3 rounded-md font-medium ${className} ${
        disabled ? "bg-gray-300 text-white cursor-not-allowed" : ""
      }`} // Tambahkan kelas untuk gaya disabled
      disabled={disabled} // Set properti disabled pada elemen button
    >
      {children}
    </button>
  );
};

export default Button;
