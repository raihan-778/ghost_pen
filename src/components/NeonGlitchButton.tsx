"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { forwardRef, useState } from "react";

// Button variants with different neon color schemes
const neonGlitchButtonVariants = cva(
  [
    // Base styles
    "relative inline-flex items-center justify-center overflow-hidden",
    "font-bold transition-all duration-300 ease-out",
    "border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95 backdrop-blur-sm",
  ],
  {
    variants: {
      variant: {
        electric: [
          "bg-gray-900/80 text-electric-blue border-electric-blue",
          "hover:bg-electric-blue hover:text-gray-900 hover:border-electric-light",
          "hover:shadow-electric focus:ring-electric-blue",
          "shadow-lg shadow-electric-blue/20",
        ],
        plasma: [
          "bg-gray-900/80 text-plasma-pink border-plasma-pink",
          "hover:bg-plasma-pink hover:text-gray-900 hover:border-plasma-light",
          "hover:shadow-plasma focus:ring-plasma-pink",
          "shadow-lg shadow-plasma-pink/20",
        ],
        toxic: [
          "bg-gray-900/80 text-toxic-green border-toxic-green",
          "hover:bg-toxic-green hover:text-gray-900 hover:border-toxic-light",
          "hover:shadow-toxic focus:ring-toxic-green",
          "shadow-lg shadow-toxic-green/20",
        ],
        quantum: [
          "bg-gray-900/80 text-quantum-purple border-quantum-purple",
          "hover:bg-quantum-purple hover:text-gray-900 hover:border-quantum-light",
          "hover:shadow-quantum focus:ring-quantum-purple",
          "shadow-lg shadow-quantum-purple/20",
        ],
        solar: [
          "bg-gray-900/80 text-solar-orange border-solar-orange",
          "hover:bg-solar-orange hover:text-gray-900 hover:border-solar-light",
          "hover:shadow-solar focus:ring-solar-orange",
          "shadow-lg shadow-solar-orange/20",
        ],
        arctic: [
          "bg-gray-900/80 text-arctic-cyan border-arctic-cyan",
          "hover:bg-arctic-cyan hover:text-gray-900 hover:border-arctic-light",
          "hover:shadow-arctic focus:ring-arctic-cyan",
          "shadow-lg shadow-arctic-cyan/20",
        ],
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-md",
        md: "px-6 py-3 text-base rounded-lg",
        lg: "px-8 py-4 text-lg rounded-xl",
        xl: "px-10 py-5 text-xl rounded-2xl",
      },
      glitchIntensity: {
        subtle: "data-[glitch=true]:animate-pulse",
        moderate: "data-[glitch=true]:animate-pulse",
        intense: "data-[glitch=true]:animate-pulse",
      },
      glowEffect: {
        none: "",
        soft: "hover:drop-shadow-glow-soft",
        medium: "hover:drop-shadow-glow-medium",
        strong: "hover:drop-shadow-glow-strong",
      },
    },
    defaultVariants: {
      variant: "electric",
      size: "md",
      glitchIntensity: "moderate",
      glowEffect: "medium",
    },
  }
);

// Props interface
export interface NeonGlitchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonGlitchButtonVariants> {
  children: React.ReactNode;
  className?: string;
  glitchDuration?: number;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onGlitchStart?: () => void;
  onGlitchEnd?: () => void;
  /** Enable pulsing glow effect */
  pulseGlow?: boolean;
  variant?: keyof typeof colorConfigs;
}

// Color configurations for different variants
const colorConfigs = {
  electric: {
    primary: "#00D4FF",
    secondary: "#0099CC",
    glitch1: "#FF0080",
    glitch2: "#8000FF",
    scanline: "#00D4FF",
  },
  plasma: {
    primary: "#FF1493",
    secondary: "#FF69B4",
    glitch1: "#00FFFF",
    glitch2: "#FFFF00",
    scanline: "#FF1493",
  },
  toxic: {
    primary: "#39ff14",
    secondary: "#7FFF00",
    glitch1: "#FF4500",
    glitch2: "#FF1493",
    scanline: "#39ff14",
  },
  quantum: {
    primary: "#9D4EDD",
    secondary: "#C77DFF",
    glitch1: "#06FFA5",
    glitch2: "#FFBE0B",
    scanline: "#9D4EDD",
  },
  solar: {
    primary: "#FF6B35",
    secondary: "#FF8E53",
    glitch1: "#00F5FF",
    glitch2: "#7FFF00",
    scanline: "#FF6B35",
  },
  arctic: {
    primary: "#00CED1",
    secondary: "#48CAE4",
    glitch1: "#FF6B6B",
    glitch2: "#FFD93D",
    scanline: "#00CED1",
  },
};

// Glitch intensity configurations
const glitchConfigs = {
  subtle: {
    duration: 300,
    opacity: 15,
    scanlineOpacity: 20,
  },
  moderate: {
    duration: 500,
    opacity: 25,
    scanlineOpacity: 35,
  },
  intense: {
    duration: 700,
    opacity: 40,
    scanlineOpacity: 50,
  },
};

/**
 * NeonGlitchButton - A futuristic button with neon colors and glitch effects
 *
 * Features:
 * - 6 neon color variants
 * - Configurable glow effects
 * - Customizable glitch intensity
 * - Pulse animation option
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <NeonGlitchButton
 *   variant="plasma"
 *   size="lg"
 *   glowEffect="strong"
 *   pulseGlow
 *   leftIcon={<ZapIcon />}
 * >
 *   Activate Plasma Core
 * </NeonGlitchButton>
 * ```
 */
export const NeonGlitchButton = forwardRef<
  HTMLButtonElement,
  NeonGlitchButtonProps
>(
  (
    {
      children,
      variant = "toxic",
      size,
      glitchIntensity = "moderate",
      glowEffect,
      glitchDuration,
      loading = false,
      loadingText = "Processing...",
      leftIcon,
      rightIcon,
      pulseGlow = false,
      onGlitchStart,
      onGlitchEnd,
      onMouseEnter,
      disabled,
      style,
      className,
      ...props
    }: NeonGlitchButtonProps,
    ref
  ) => {
    const [isGlitching, setIsGlitching] = useState<boolean>(false);
    const [glitchTimeoutId, setGlitchTimeoutId] =
      useState<NodeJS.Timeout | null>(null);

    const colorConfig = colorConfigs[variant as keyof typeof colorConfigs];
    const safeGlitchIntensity = glitchIntensity ?? "moderate";
    const intensityConfig = glitchConfigs[safeGlitchIntensity];
    const effectDuration = glitchDuration || intensityConfig.duration;

    const triggerGlitch = () => {
      if (isGlitching || loading || disabled) return;

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

    React.useEffect(() => {
      return () => {
        if (glitchTimeoutId) {
          clearTimeout(glitchTimeoutId);
        }
      };
    }, [glitchTimeoutId]);

    const isDisabled = disabled || loading;

    // Custom CSS properties for dynamic colors
    const customStyle: React.CSSProperties & {
      [key: `--${string}`]: string | undefined;
    } = {
      "--primary-color": colorConfig.primary,
      "--secondary-color": colorConfig.secondary,
      "--glitch-color-1": colorConfig.glitch1,
      "--glitch-color-2": colorConfig.glitch2,
      "--scanline-color": colorConfig.scanline,
      ...style,
    };

    return (
      <>
        {/* Custom CSS for dynamic colors */}
        <style jsx>{`
          .neon-button {
            --electric-blue: #00d4ff;
            --electric-light: #33e0ff;
            --plasma-pink: #ff1493;
            --plasma-light: #ff69b4;
            --toxic-green: #39ff14;
            --toxic-light: #7fff00;
            --quantum-purple: #9d4edd;
            --quantum-light: #c77dff;
            --solar-orange: #ff6b35;
            --solar-light: #ff8e53;
            --arctic-cyan: #00ced1;
            --arctic-light: #48cae4;
          }

          .shadow-electric {
            box-shadow:
              0 0 20px #00d4ff40,
              0 0 40px #00d4ff20;
          }
          .shadow-plasma {
            box-shadow:
              0 0 20px #ff149340,
              0 0 40px #ff149320;
          }
          .shadow-toxic {
            box-shadow:
              0 0 20px #39ff1440,
              0 0 40px #39ff1420;
          }
          .shadow-quantum {
            box-shadow:
              0 0 20px #9d4edd40,
              0 0 40px #9d4edd20;
          }
          .shadow-solar {
            box-shadow:
              0 0 20px #ff6b3540,
              0 0 40px #ff6b3520;
          }
          .shadow-arctic {
            box-shadow:
              0 0 20px #00ced140,
              0 0 40px #00ced120;
          }

          .drop-shadow-glow-soft {
            filter: drop-shadow(0 0 8px currentColor);
          }
          .drop-shadow-glow-medium {
            filter: drop-shadow(0 0 12px currentColor);
          }
          .drop-shadow-glow-strong {
            filter: drop-shadow(0 0 16px currentColor);
          }

          .pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite alternate;
          }

          @keyframes pulseGlow {
            from {
              filter: drop-shadow(0 0 8px currentColor);
            }
            to {
              filter: drop-shadow(0 0 20px currentColor);
            }
          }
        `}</style>

        <button
          ref={ref}
          className={cn(
            neonGlitchButtonVariants({
              variant,
              size,
              glitchIntensity,
              glowEffect,
            }),
            "neon-button",
            pulseGlow && "pulse-glow",
            className
          )}
          onMouseEnter={handleMouseEnter}
          disabled={isDisabled}
          data-glitch={isGlitching}
          aria-label={loading ? loadingText : undefined}
          style={customStyle}
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
              {/* Primary Glitch Layer */}
              <div
                className="absolute inset-0 transition-opacity duration-150 animate-pulse"
                style={{
                  backgroundColor: colorConfig.glitch1,
                  opacity: intensityConfig.opacity / 100,
                }}
                aria-hidden="true"
              />

              {/* Secondary Glitch Layer */}
              <div
                className="absolute inset-0 transition-opacity duration-150 animate-pulse"
                style={{
                  backgroundColor: colorConfig.glitch2,
                  opacity: intensityConfig.opacity / 100,
                  animationDelay: "0.1s",
                }}
                aria-hidden="true"
              />

              {/* Scanline Effect */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-current to-transparent transition-opacity duration-300 animate-pulse"
                style={{
                  opacity: intensityConfig.scanlineOpacity / 100,
                }}
                aria-hidden="true"
              />

              {/* Data Stream Effect */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${colorConfig.primary} 50%, transparent 100%)`,
                  animation: "dataStream 0.3s ease-in-out",
                }}
                aria-hidden="true"
              />
            </>
          )}

          {/* Inner Glow Effect */}
          <div
            className="absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${colorConfig.primary}10 0%, transparent 70%)`,
              opacity: isGlitching ? 1 : 0,
            }}
            aria-hidden="true"
          />
        </button>

        {/* Keyframes for data stream effect */}
        <style jsx>{`
          @keyframes dataStream {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </>
    );
  }
);

NeonGlitchButton.displayName = "NeonGlitchButton";

// Export types and variants
export { neonGlitchButtonVariants };

// Usage examples
export const NeonGlitchButtonExamples: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
            Neon Glitch Buttons
          </h1>
          <p className="text-gray-400 text-lg">
            Futuristic buttons with customizable neon colors and glitch effects
          </p>
        </div>

        {/* Color Variants */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Color Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <NeonGlitchButton variant="electric" size="lg">
                ⚡ Electric
              </NeonGlitchButton>
              <p className="text-sm text-gray-400">Electric Blue</p>
            </div>

            <div className="text-center space-y-3">
              <NeonGlitchButton variant="plasma" size="lg">
                🔥 Plasma
              </NeonGlitchButton>
              <p className="text-sm text-gray-400">Hot Pink</p>
            </div>

            <div className="text-center space-y-3">
              <NeonGlitchButton variant="toxic" size="lg">
                ☢️ Toxic
              </NeonGlitchButton>
              <p className="text-sm text-gray-400">Neon Green</p>
            </div>

            <div className="text-center space-y-3">
              <NeonGlitchButton variant="quantum" size="lg">
                🌌 Quantum
              </NeonGlitchButton>
              <p className="text-sm text-gray-400">Deep Purple</p>
            </div>

            <div className="text-center space-y-3">
              <NeonGlitchButton variant="solar" size="lg">
                ☀️ Solar
              </NeonGlitchButton>
              <p className="text-sm text-gray-400">Bright Orange</p>
            </div>

            <div className="text-center space-y-3">
              <NeonGlitchButton variant="arctic" size="lg">
                ❄️ Arctic
              </NeonGlitchButton>
              <p className="text-sm text-gray-400">Ice Cyan</p>
            </div>
          </div>
        </div>

        {/* Glow Effects */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Glow Effects</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <NeonGlitchButton variant="plasma" glowEffect="soft">
              Soft Glow
            </NeonGlitchButton>
            <NeonGlitchButton variant="toxic" glowEffect="medium">
              Medium Glow
            </NeonGlitchButton>
            <NeonGlitchButton variant="quantum" glowEffect="strong">
              Strong Glow
            </NeonGlitchButton>
            <NeonGlitchButton variant="electric" pulseGlow>
              Pulsing Glow
            </NeonGlitchButton>
          </div>
        </div>

        {/* Glitch Intensity */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Glitch Intensity
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <NeonGlitchButton variant="solar" glitchIntensity="subtle">
              Subtle Glitch
            </NeonGlitchButton>
            <NeonGlitchButton variant="arctic" glitchIntensity="moderate">
              Moderate Glitch
            </NeonGlitchButton>
            <NeonGlitchButton variant="plasma" glitchIntensity="intense">
              Intense Glitch
            </NeonGlitchButton>
          </div>
        </div>

        {/* Special Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Special Features
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <NeonGlitchButton
              variant="quantum"
              loading={loading}
              loadingText="Initializing..."
              onClick={handleAsyncAction}
              leftIcon={<span>🚀</span>}
            >
              {loading ? "Loading..." : "Launch Sequence"}
            </NeonGlitchButton>

            <NeonGlitchButton
              variant="toxic"
              rightIcon={<span>→</span>}
              glowEffect="strong"
              pulseGlow
            >
              Enter System
            </NeonGlitchButton>

            <NeonGlitchButton variant="electric" disabled>
              Disabled State
            </NeonGlitchButton>
          </div>
        </div>
      </div>
    </div>
  );
};
