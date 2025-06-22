import {
  ArrowRight,
  Check,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GlitchButton } from "../GlitchButton";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  badgeText?: string;
  onButtonClick?: () => void;
  stats?: { number: string; label: string; icon: React.ElementType }[];
  benefits?: string[];
  trustText?: string;
}

const CTASection = ({
  title = "Ready to Transform Your Organization?",
  subtitle = "Join thousands of teams already using anonymous feedback to drive meaningful change.",
  buttonText = "Start Your Journey",
  badgeText = "Trusted by Industry Leaders",
  onButtonClick,
  stats = [
    { number: "10,000+", label: "Teams Using Our Platform", icon: Users },
    { number: "95%", label: "Report Improved Culture", icon: TrendingUp },
    { number: "50M+", label: "Anonymous Insights Shared", icon: MessageCircle },
  ],
  benefits = ["Free 14-day trial", "No credit card required"],
  trustText = "Trusted by Fortune 500 companies • SOC 2 compliant • GDPR ready",
}: CTASectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const [activeStats, setActiveStats] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger animations for better performance
            stats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleElements((prev) => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [stats, stats.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStats((prev) => (prev + 1) % stats.length);
    }, 5000); // Slower rotation for better UX

    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div
      ref={sectionRef}
      className=" max-w-7xl mx-auto mb-16 px-4 sm:px-6 py-8 lg:py-12 lg:px-8 from-black via-gray-900 to-black relative overflow-hidden rounded-3xl  shadow-2xl  border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Elements - Reduced count for performance */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-5 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Trust Badge */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-200 font-medium">
              {badgeText}
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div
          className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-6xl md:text-8xl font-light bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-8">
            {title.split("\n").map((line, index) => (
              <span key={index}>
                {index === 1 ? (
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
                    {line}
                  </span>
                ) : (
                  line
                )}
                {index === 0 && <br />}
              </span>
            ))}
          </h2>

          <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {subtitle.split("anonymous feedback").map((part, index) => (
              <span key={index}>
                {part}
                {index === 0 && (
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                    anonymous feedback
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Stats Section */}
        <div
          className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = index === activeStats;
              const isElementVisible = visibleElements.includes(index);

              return (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-700 hover:bg-white/8 hover:border-blue-500/30 cursor-pointer ${
                    isActive
                      ? "scale-105 bg-white/8 border-blue-500/30 shadow-2xl shadow-blue-500/20"
                      : ""
                  } ${isElementVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300 ${isActive ? "animate-pulse" : ""}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>

                  {isActive && (
                    <div className="absolute top-4 right-4 flex items-center text-blue-400 animate-pulse">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            <GlitchButton variant="success" onClick={onButtonClick}>
              <div className="flex justify-center space-x-2">
                <span>{buttonText}</span>
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </div>
            </GlitchButton>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-300">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 group hover:text-blue-300 transition-colors"
                >
                  <Check className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Trust Elements */}
          <p className="text-gray-400 text-sm">{trustText}</p>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
