"use client";

import React, { useState, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Button variants using class-variance-authority for consistent styling
const glitchButtonVariants = cva(
  [
    // Base styles
    "relative inline-flex items-center justify-center overflow-hidden",
    "font-bold text-white transition-all duration-300 ease-out",
    "border-2 focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-black border-cyan-400 hover:bg-cyan-400 hover:text-black",
          "hover:border-white focus:ring-cyan-400",
        ],
        destructive: [
          "bg-black border-red-400 hover:bg-red-400 hover:text-black",
          "hover:border-white focus:ring-red-400",
        ],
        success: [
          "bg-black border-green-400 hover:bg-green-400 hover:text-black",
          "hover:border-white focus:ring-green-400",
        ],
        warning: [
          "bg-black border-yellow-400 hover:bg-yellow-400 hover:text-black",
          "hover:border-white focus:ring-yellow-400",
        ],
        ghost: [
          "bg-transparent border-gray-400 hover:bg-gray-400 hover:text-black",
          "hover:border-white focus:ring-gray-400",
        ],
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-md",
        md: "px-6 py-3 text-base rounded-lg",
        lg: "px-8 py-4 text-lg rounded-xl",
        xl: "px-10 py-5 text-xl rounded-2xl",
      },
      glitchIntensity: {
        low: "data-[glitch=true]:animate-pulse",
        medium: "data-[glitch=true]:animate-pulse",
        high: "data-[glitch=true]:animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      glitchIntensity: "medium",
    },
  }
);

// Props interface extending HTML button attributes
export interface GlitchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glitchButtonVariants> {
  /** Content to display inside the button */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Duration of glitch effect in milliseconds */
  glitchDuration?: number;
  /** Whether to show loading state */
  loading?: boolean;
  /** Loading text to display */
  loadingText?: string;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Callback fired when glitch animation starts */
  onGlitchStart?: () => void;
  /** Callback fired when glitch animation ends */
  onGlitchEnd?: () => void;
}

// Glitch effect configuration based on intensity
const glitchConfigs = {
  low: {
    redOpacity: "opacity-10",
    blueOpacity: "opacity-10",
    scanlineOpacity: "opacity-20",
    duration: 400,
  },
  medium: {
    redOpacity: "opacity-20",
    blueOpacity: "opacity-20",
    scanlineOpacity: "opacity-30",
    duration: 600,
  },
  high: {
    redOpacity: "opacity-30",
    blueOpacity: "opacity-30",
    scanlineOpacity: "opacity-40",
    duration: 800,
  },
};

/**
 * GlitchButton - A cyberpunk-style button with glitch effects
 *
 * Features:
 * - Multiple variants and sizes
 * - Configurable glitch intensity
 * - Loading states
 * - Icon support
 * - Full TypeScript support
 * - Accessibility compliant
 *
 * @example
 * ```tsx
 * <GlitchButton
 *   variant="destructive"
 *   size="lg"
 *   onClick={handleClick}
 *   leftIcon={<PlayIcon />}
 * >
 *   Launch System
 * </GlitchButton>
 * ```
 */
export const GlitchButton = forwardRef<HTMLButtonElement, GlitchButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      glitchIntensity = "medium",
      glitchDuration,
      loading = false,
      loadingText = "Loading...",
      leftIcon,
      rightIcon,
      onGlitchStart,
      onGlitchEnd,
      onMouseEnter,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isGlitching, setIsGlitching] = useState<boolean>(false);
    const [glitchTimeoutId, setGlitchTimeoutId] =
      useState<NodeJS.Timeout | null>(null);

    const config = glitchConfigs[glitchIntensity ?? "medium"];
    const effectDuration = glitchDuration || config.duration;

    const triggerGlitch = () => {
      if (isGlitching || loading || disabled) return;

      // Clear any existing timeout
      if (glitchTimeoutId) {
        clearTimeout(glitchTimeoutId);
      }

      setIsGlitching(true);
      onGlitchStart?.();

      const timeoutId = setTimeout(() => {
        setIsGlitching(false);
        onGlitchEnd?.();
        setGlitchTimeoutId(null);
      }, effectDuration);

      setGlitchTimeoutId(timeoutId);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      triggerGlitch();
      onMouseEnter?.(e);
    };

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (glitchTimeoutId) {
          clearTimeout(glitchTimeoutId);
        }
      };
    }, [glitchTimeoutId]);

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          glitchButtonVariants({ variant, size, glitchIntensity }),
          className
        )}
        onMouseEnter={handleMouseEnter}
        disabled={isDisabled}
        data-glitch={isGlitching}
        aria-label={loading ? loadingText : undefined}
        {...props}
      >
        {/* Content Container */}
        <span
          className={cn(
            "relative z-10 flex items-center gap-2 transition-all duration-300",
            loading && "opacity-80",
            isGlitching && "animate-pulse"
          )}
        >
          {/* Left Icon */}
          {leftIcon && !loading && (
            <span className="flex-shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )}

          {/* Loading Spinner */}
          {loading && (
            <svg
              className="animate-spin h-4 w-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}

          {/* Button Text */}
          <span className="font-inherit">
            {loading ? loadingText : children}
          </span>

          {/* Right Icon */}
          {rightIcon && !loading && (
            <span className="flex-shrink-0" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </span>

        {/* Glitch Effect Layers */}
        {isGlitching && (
          <>
            {/* Red Glitch Layer */}
            <div
              className={cn(
                "absolute inset-0 bg-red-500 transition-opacity duration-150 animate-pulse",
                config.redOpacity
              )}
              aria-hidden="true"
            />

            {/* Blue Glitch Layer */}
            <div
              className={cn(
                "absolute inset-0 bg-blue-500 transition-opacity duration-150 animate-pulse",
                config.blueOpacity
              )}
              style={{ animationDelay: "0.1s" }}
              aria-hidden="true"
            />

            {/* Scanline Effect */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-b from-transparent via-current to-transparent",
                "transition-opacity duration-300 animate-pulse",
                config.scanlineOpacity
              )}
              aria-hidden="true"
            />
          </>
        )}

        {/* Focus Ring */}
        <div
          className="absolute inset-0 rounded-[inherit] ring-2 ring-transparent group-focus-visible:ring-current"
          aria-hidden="true"
        />
      </button>
    );
  }
);

GlitchButton.displayName = "GlitchButton";

// Export the component and types
export { glitchButtonVariants };
export type { VariantProps };

// Usage examples for documentation
export const GlitchButtonExamples: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="space-y-8 p-8 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          GlitchButton Examples
        </h2>

        {/* Variants */}
        <div className="space-y-4">
          <h3 className="text-xl text-white">Variants</h3>
          <div className="flex flex-wrap gap-4">
            <GlitchButton variant="default">Default</GlitchButton>
            <GlitchButton variant="destructive">Destructive</GlitchButton>
            <GlitchButton variant="success">Success</GlitchButton>
            <GlitchButton variant="warning">Warning</GlitchButton>
            <GlitchButton variant="ghost">Ghost</GlitchButton>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="text-xl text-white">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <GlitchButton size="sm">Small</GlitchButton>
            <GlitchButton size="md">Medium</GlitchButton>
            <GlitchButton size="lg">Large</GlitchButton>
            <GlitchButton size="xl">Extra Large</GlitchButton>
          </div>
        </div>

        {/* Glitch Intensity */}
        <div className="space-y-4">
          <h3 className="text-xl text-white">Glitch Intensity</h3>
          <div className="flex flex-wrap gap-4">
            <GlitchButton glitchIntensity="low">Low Intensity</GlitchButton>
            <GlitchButton glitchIntensity="medium">
              Medium Intensity
            </GlitchButton>
            <GlitchButton glitchIntensity="high">High Intensity</GlitchButton>
          </div>
        </div>

        {/* With Icons */}
        <div className="space-y-4">
          <h3 className="text-xl text-white">With Icons</h3>
          <div className="flex flex-wrap gap-4">
            <GlitchButton leftIcon={<span>⚡</span>} variant="destructive">
              Power Up
            </GlitchButton>
            <GlitchButton rightIcon={<span>→</span>} variant="success">
              Continue
            </GlitchButton>
          </div>
        </div>

        {/* Loading State */}
        <div className="space-y-4">
          <h3 className="text-xl text-white">Loading State</h3>
          <div className="flex flex-wrap gap-4">
            <GlitchButton
              loading={loading}
              loadingText="Processing..."
              onClick={handleAsyncAction}
              variant="warning"
            >
              Start Process
            </GlitchButton>
            <GlitchButton disabled>Disabled</GlitchButton>
          </div>
        </div>
      </div>
    </div>
  );
};
