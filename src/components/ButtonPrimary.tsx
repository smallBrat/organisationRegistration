import React from 'react';

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ButtonPrimary({ children, onClick, className = '' }: ButtonPrimaryProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#007bff] text-white px-8 py-4 rounded-lg hover:bg-[#0066e6] transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
    >
      {children}
    </button>
  );
}
