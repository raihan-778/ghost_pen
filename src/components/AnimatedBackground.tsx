// components/AnimatedBackground.tsx
"use client";
import React, { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const generateParticles = () => {
    return [...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${8 + Math.random() * 4}s`,
        }}
      />
    ));
  };

  return (
    <>
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes aurora-flow {
          0% {
            background-position:
              0% 0%,
              100% 100%,
              50% 50%;
            filter: hue-rotate(0deg);
          }
          33% {
            background-position:
              100% 0%,
              0% 100%,
              100% 50%;
            filter: hue-rotate(120deg);
          }
          66% {
            background-position:
              50% 100%,
              50% 0%,
              0% 50%;
            filter: hue-rotate(240deg);
          }
          100% {
            background-position:
              0% 0%,
              100% 100%,
              50% 50%;
            filter: hue-rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        @keyframes liquid-morph {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }

        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
        }

        .animate-aurora {
          background-size:
            400% 400%,
            300% 300%,
            200% 200%;
          animation: aurora-flow 20s ease-in-out infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-liquid {
          animation: liquid-morph 8s ease-in-out infinite;
        }

        .aurora-bg {
          background:
            radial-gradient(
              ellipse at top left,
              rgba(15, 5, 35, 0.8) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at top right,
              rgba(35, 5, 65, 0.7) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at bottom left,
              rgba(5, 15, 45, 0.6) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at bottom right,
              rgba(25, 5, 55, 0.7) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at center,
              rgba(45, 15, 75, 0.3) 0%,
              transparent 70%
            ),
            linear-gradient(
              135deg,
              #020308 0%,
              #0f0520 25%,
              #1a0635 50%,
              #250845 75%,
              #0a0212 100%
            );
        }

        .bg-grid {
          background-image:
            linear-gradient(rgba(59, 59, 152, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 59, 152, 0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .liquid-blob {
          background: linear-gradient(
            45deg,
            rgba(24, 44, 97, 0.6) 0%,
            rgba(59, 59, 152, 0.4) 50%,
            rgba(24, 44, 97, 0.5) 100%
          );
          filter: blur(40px);
        }

        /* Ensure background covers full viewport */
        .animated-bg-container {
          min-height: 100vh;
          position: relative;
        }

        .animated-bg-fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }
      `}</style>

      {/* Fixed Background Layer */}
      <div className="animated-bg-fixed aurora-bg">
        <div className="absolute inset-0 bg-grid opacity-30"></div>

        {/* Animated Liquid Blobs */}
        <div className="absolute top-1/4 left-1/5 w-96 h-96 liquid-blob animate-float opacity-20"></div>
        <div
          className="absolute bottom-1/4 right-1/5 w-80 h-80 liquid-blob animate-float opacity-15"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 liquid-blob animate-float opacity-10"
          style={{ animationDelay: "8s" }}
        ></div>

        {/* Particle Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {generateParticles()}
        </div>
      </div>

      {/* Content Container */}
      <div className="animated-bg-container relative z-10">{children}</div>
    </>
  );
};

export default AnimatedBackground;
