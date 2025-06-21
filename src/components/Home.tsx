import {
  ArrowRight,
  Check,
  LucideIcon,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";
import React, { JSX, ReactNode, useEffect, useState } from "react";
import FAQSection from "./FAQ";
import FeaturesShowcase from "./FeaturesShowcase";
import FooterSection2 from "./Footer2";
import { GlitchButton } from "./GlitchButton";
import HowItWorksSection from "./HowItWork";
import SecuritySection from "./SecuritySection";
import TestimonialsSection from "./Testimonial";

// TypeScript interfaces
interface Testimonial {
  title: string;
  content: string;
  author: string;
  company: string;
  received: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface MotionProps {
  children: ReactNode;
  variants?: unknown;
  initial?: string;
  animate?: string;
  transition?: unknown;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

interface MotionSectionProps {
  children: ReactNode;
  variants?: unknown;
  initial?: string;
  animate?: string;
  className?: string;
  [key: string]: unknown;
}

// Mock messages data
const testimonials: Testimonial[] = [
  {
    title: "Executive Transformation",
    content:
      "This platform enabled our leadership team to receive genuine, unfiltered insights that completely transformed our company culture and decision-making process.",
    author: "Fortune 500 CEO",
    company: "Technology Sector",
    received: "2 hours ago",
  },
  {
    title: "Academic Excellence",
    content:
      "The anonymity feature allowed for honest peer review that significantly improved our research methodology and publication quality.",
    author: "Research Director",
    company: "Leading University",
    received: "5 hours ago",
  },
  {
    title: "Creative Breakthrough",
    content:
      "Artists finally have a space to give and receive authentic critique without personal bias affecting the creative process.",
    author: "Creative Director",
    company: "Design Studio",
    received: "1 day ago",
  },
];

const features: Feature[] = [
  {
    icon: Shield,
    title: "Complete Anonymity",
    description:
      "Advanced encryption ensures absolute privacy for all feedback submissions.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Insights",
    description:
      "Instant delivery and organization of feedback for immediate action.",
  },
  {
    icon: Zap,
    title: "Smart Analytics",
    description: "AI-powered sentiment analysis and trend identification.",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Framer Motion simulation (simplified)
const Motion = {
  Div: ({
    children,
    variants,
    initial,
    animate,
    transition,
    className = "",
    style,
    ...props
  }: MotionProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }, []);

    const animationClass = isVisible
      ? "animate-fade-in-up"
      : "opacity-0 translate-y-8";

    return (
      <div
        className={`${className} ${animationClass} transition-all duration-800 ease-out`}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  },

  Section: ({
    children,
    variants,
    initial,
    animate,
    className = "",
    ...props
  }: MotionSectionProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    }, []);

    const animationClass = isVisible ? "animate-fade-in" : "opacity-0";

    return (
      <section
        className={`${className} ${animationClass} transition-all duration-1000`}
        {...props}
      >
        {children}
      </section>
    );
  },
};

const HomeComponent: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev: number) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleTestimonialClick = (index: number): void => {
    setCurrentTestimonial(index);
  };

  const generateParticles = (): JSX.Element[] => {
    return [...Array(30)].map((_, i: number) => (
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
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(32px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

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

        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow:
              0 0 20px rgba(139, 92, 246, 0.3),
              0 0 40px rgba(139, 92, 246, 0.1);
          }
          50% {
            box-shadow:
              0 0 30px rgba(139, 92, 246, 0.5),
              0 0 60px rgba(139, 92, 246, 0.2);
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

        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
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

        .animate-shimmer {
          background-size: 200% 100%;
          animation: text-shimmer 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-liquid {
          animation: liquid-morph 8s ease-in-out infinite;
        }

        .glass-morphism {
          background: rgba(24, 44, 97, 0.15);
          backdrop-filter: blur(25px) saturate(180%);
          border: 1px solid rgba(59, 59, 152, 0.3);
          box-shadow: 0 8px 32px rgba(24, 44, 97, 0.4);
        }

        .glass-morphism-strong {
          background: rgba(59, 59, 152, 0.2);
          backdrop-filter: blur(30px) saturate(200%);
          border: 1px solid rgba(59, 59, 152, 0.4);
          box-shadow: 0 8px 32px rgba(24, 44, 97, 0.3);
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.8) 0%,
            rgba(236, 72, 153, 0.8) 25%,
            rgba(59, 130, 246, 0.8) 50%,
            rgba(16, 185, 129, 0.8) 75%,
            rgba(139, 92, 246, 0.8) 100%
          );
          background-size: 400% 400%;
          animation: gradient-shift 6s ease infinite;
          padding: 2px;
          border-radius: 9999px;
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f8fafc 15%,
            #e2e8f0 30%,
            #ffffff 45%,
            #f1f5f9 60%,
            #ffffff 75%,
            #e2e8f0 90%,
            #ffffff 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: text-shimmer 4s ease-in-out infinite;
          filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.1));
        }

        .accent-gradient {
          background: linear-gradient(
            135deg,
            #8b5cf6 0%,
            #a855f7 15%,
            #ec4899 30%,
            #f472b6 45%,
            #3b82f6 60%,
            #06b6d4 75%,
            #10b981 90%,
            #8b5cf6 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: text-shimmer 5s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
        }

        .neon-gradient {
          background: linear-gradient(
            135deg,
            #ff0080 0%,
            #7928ca 25%,
            #4c1d95 50%,
            #0f172a 75%,
            #ff0080 100%
          );
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
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

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow:
            0 25px 50px rgba(24, 44, 97, 0.3),
            0 0 0 1px rgba(59, 59, 152, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .bg-grid {
          background-image:
            linear-gradient(rgba(59, 59, 152, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 59, 152, 0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .text-glow {
          text-shadow:
            0 0 10px rgba(139, 92, 246, 0.5),
            0 0 20px rgba(139, 92, 246, 0.3),
            0 0 30px rgba(139, 92, 246, 0.1);
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
      `}</style>

      {/* Enhanced Background */}
      <div className="fixed inset-0 aurora-bg">
        <div className="absolute inset-0 styles.bg-grid bg-grid opacity-30"></div>

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

        {/* Subtle Particle Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {generateParticles()}
        </div>
      </div>

      {/* Enhanced Hero Section */}

      <Motion.Section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Motion.Div className="mb-6">
            <div className="inline-flex items-center glass-morphism-strong rounded-full px-6 py-3 mb-12 animate-pulse-glow">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-4 animate-pulse"></div>
              <span className="text-sm text-gray-200 font-medium">
                Live feedback streaming now
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-light leading-tight mb-8">
              <span className="gradient-text text-glow">Anonymous</span>
              <br />
              <span className="text-gray-300 font-extralight">Feedback</span>
              <br />
              <span className="accent-gradient font-bold animate-shimmer">
                Reimagined
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-16">
              Transform your organization with
              <span className="accent-gradient font-semibold animate-shimmer">
                {" "}
                revolutionary honest insights.
              </span>
              <br />
              Where authentic voices shape extraordinary futures.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <GlitchButton>
                <span>Start Free Trial</span>
              </GlitchButton>
              <GlitchButton variant="ghost">
                <div className="flex items-center space-x-3">
                  {" "}
                  <span>Watch Demo</span>
                  <div className="w-6 h-6 glass-morphism-strong rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-300">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[5px] border-y-transparent ml-1"></div>
                  </div>
                </div>
              </GlitchButton>
            </div>
          </Motion.Div>
        </div>
      </Motion.Section>

      {/* How it Work Section */}
      <Motion.Section className="relative py-8 mb-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Motion.Div>
            <HowItWorksSection />
          </Motion.Div>
        </div>
      </Motion.Section>

      {/* Features Showcase Section */}
      <Motion.Section className="relative py-8 mb-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Motion.Div>
            <FeaturesShowcase />
          </Motion.Div>
        </div>
      </Motion.Section>

      {/* Enhanced Features Section */}
      <Motion.Section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Motion.Div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-light gradient-text text-glow mb-6">
              Built for Modern Teams
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Enterprise-grade security meets
              <span className="accent-gradient font-semibold">
                {" "}
                intuitive design excellence
              </span>
            </p>
          </Motion.Div>

          <Motion.Div className="grid md:grid-cols-3 gap-12">
            {features.map((feature: Feature, index: number) => {
              const Icon = feature.icon;
              return (
                <Motion.Div
                  key={index}
                  className="glass-morphism-strong rounded-3xl p-10 hover-lift group animate-pulse-glow"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div className="glass-morphism w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-125 transition-all duration-500 bg-gradient-to-br from-blue-800/30 to-indigo-700/30">
                    <Icon className="w-10 h-10 text-blue-400 group-hover:text-indigo-300 transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-semibold gradient-text mb-6 text-glow">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    {feature.description}
                  </p>
                </Motion.Div>
              );
            })}
          </Motion.Div>
        </div>
      </Motion.Section>

      {/* Enhanced Testimonials Section */}
      <Motion.Section id="testimonials" className="relative my-1 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <TestimonialsSection />
        </div>
      </Motion.Section>

      <Motion.Section id="testimonials" className="relative my-1 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Motion.Div className="text-center mb-20">
            <h2 className="text-3xl md:text-7xl font-light gradient-text text-glow mb-6">
              Trusted by Leaders
            </h2>
            <p className="text-2xl text-gray-300 font-light">
              Real stories from organizations that
              <span className="accent-gradient font-semibold">
                {" "}
                transformed with honest feedback
              </span>
            </p>
          </Motion.Div>

          <Motion.Div className="relative">
            <div className="glass-morphism-strong rounded-3xl p-4 md:p-6 hover-lift animate-pulse-glow">
              <div className="mb-4">
                <blockquote className="text-xl md:text-2xl font-light gradient-text leading-relaxed mb-12 text-glow">
                  &quot;{testimonials[currentTestimonial].content}&quot;
                </blockquote>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white mb-2 text-xl gradient-text">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-gray-300 font-light">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-400 uppercase tracking-wider mb-2 font-semibold">
                      {testimonials[currentTestimonial].title}
                    </div>
                    <div className="text-sm text-gray-400 font-light">
                      {testimonials[currentTestimonial].received}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Testimonial Indicators */}
            <div className="flex justify-center space-x-3 mt-12">
              {testimonials.map((_: Testimonial, index: number) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialClick(index)}
                  className={`h-2 rounded-full transition-all duration-700 ${
                    index === currentTestimonial
                      ? "w-12 bg-gradient-to-r from-blue-500 to-indigo-600"
                      : "w-3 bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </Motion.Div>
        </div>
      </Motion.Section>

      <Motion.Section className="relative py-8 mb-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Motion.Div>
            <h2 className="text-6xl md:text-8xl font-light gradient-text text-glow mb-8">
              Ready to Transform
              <br />
              <span className="accent-gradient font-bold animate-shimmer">
                Your Organization?
              </span>
            </h2>

            <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Join thousands of teams already using
              <span className="accent-gradient font-semibold">
                {" "}
                anonymous feedback
              </span>{" "}
              to drive meaningful change.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <GlitchButton variant="success">
                <div className="flex justify-center space-x-2">
                  {" "}
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </div>
              </GlitchButton>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium">Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium">No credit card required</span>
                </div>
              </div>
            </div>
          </Motion.Div>
        </div>
      </Motion.Section>

      {/* Enhanced Footer */}

      <Motion.Section className="relative border-t border-violet-900/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="text-3xl font-bold accent-gradient text-glow mb-3">
                TrueFeedback
              </div>
              <p className="text-gray-300 font-light">
                Empowering authentic communication worldwide
              </p>
            </div>

            <div className="flex items-center space-x-10">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:text-glow font-medium"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:text-glow font-medium"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:text-glow font-medium"
              >
                Support
              </a>
              <div className="text-gray-400 font-light">
                © 2025 TrueFeedback
              </div>
            </div>
          </div>
        </div>
      </Motion.Section>
      <Motion.Section>
        <SecuritySection />
      </Motion.Section>
      <Motion.Section>
        <FAQSection />
      </Motion.Section>
      <Motion.Section className="relative border-t border-violet-900/30">
        <FooterSection2 />
      </Motion.Section>
    </>
  );
};

export default HomeComponent;
