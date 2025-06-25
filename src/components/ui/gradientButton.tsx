import React from "react";

type ButtonVariant = "primary" | "secondary" | "success" | "danger";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = "primary",
  icon,
  onClick,
  type,
  disabled = false,
  className = "",
}) => {
  const variants = {
    primary: {
      gradient: "bg-gradient-to-r from-blue-600 to-purple-600",
      hoverGradient: "hover:from-blue-500/90 hover:to-purple-500/90 ",
      shadow: "hover:shadow-blue-500/50",
      border: "border-blue-200/20 hover:border-blue-200/40",
    },
    secondary: {
      gradient: "bg-gradient-to-r from-purple-600 to-pink-600",
      hoverGradient: "hover:from-purple-500/90 hover:to-pink-500/90",
      shadow: "hover:shadow-purple-500/50",
      border: "border-purple-200/20 hover:border-purple-200/40",
    },
    success: {
      gradient: "bg-gradient-to-r from-emerald-600 to-teal-600",
      hoverGradient: "hover:from-emerald-500/90 hover:to-teal-500/90",
      shadow: "hover:shadow-emerald-500/50",
      border: "border-emerald-200/20 hover:border-emerald-200/40",
    },
    danger: {
      gradient: "bg-gradient-to-r from-red-600 to-orange-600",
      hoverGradient: "hover:from-red-500/90 hover:to-orange-500/90",
      shadow: "hover:shadow-red-500/50",
      border: "border-red-200/20 hover:border-red-200/40",
    },
  };

  const currentVariant = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className={`group px-8 py-4 ${currentVariant.gradient} ${currentVariant.hoverGradient} text-white rounded-2xl font-semibold text-lg hover:shadow-2xl ${currentVariant.shadow} hover:shadow-2xl hover:shadow-blue-500/50       transform hover:scale-105 transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none backdrop-blur-sm border ${currentVariant.border} ${className}`}
    >
      <span className="relative z-10 flex justify-center w-full items-center">
        {children}
        {icon}
      </span>
      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/30 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </button>
  );
};

export default GradientButton;
