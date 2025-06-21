import {
  ChevronUp,
  Code,
  ExternalLink,
  Github,
  Globe,
  Heart,
  Instagram,
  Lock,
  MessageCircle,
  Monitor,
  Send,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FooterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const footerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const typingTexts = [
    "End-to-end encryption",
    "Zero data retention",
    "Complete privacy",
    "Secure messaging",
  ];

  // Typing animation effect
  useEffect(() => {
    const currentText = typingTexts[currentTextIndex];
    let timeoutId;

    if (typedText.length < currentText.length) {
      timeoutId = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeoutId = setTimeout(() => {
        setTypedText("");
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [typedText, currentTextIndex]);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  type FooterLink = {
    name: string;
    href: string;
    icon?: React.ComponentType<any>;
  };

  const footerLinks: {
    product: FooterLink[];
    company: FooterLink[];
    support: FooterLink[];
    legal: FooterLink[];
  } = {
    product: [
      { name: "Features", href: "#features", icon: Star },
      { name: "Security", href: "#security", icon: Lock },
      { name: "Pricing", href: "#pricing", icon: Zap },
      { name: "Downloads", href: "#downloads", icon: Globe },
      { name: "API", href: "#api", icon: Code },
      { name: "Integrations", href: "#integrations", icon: Users },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Press Kit", href: "#press" },
      { name: "Contact", href: "#contact" },
      { name: "Partners", href: "#partners" },
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Documentation", href: "#docs" },
      { name: "Community", href: "#community" },
      { name: "Status", href: "#status" },
      { name: "Bug Reports", href: "#bugs" },
      { name: "Feature Requests", href: "#features" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
      { name: "Security", href: "#security" },
      { name: "Compliance", href: "#compliance" },
    ],
  };

  const socialLinks = [
    {
      icon: Instagram,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
      bgGradient: "from-blue-500 to-blue-600",
      count: "12.5K",
    },
    {
      icon: Github,
      href: "#",
      label: "GitHub",
      color: "hover:text-gray-300",
      bgGradient: "from-gray-600 to-gray-700",
      count: "8.2K",
    },
    {
      icon: <i className="fa fa-linkedin" aria-hidden="true"></i>,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-500",
      bgGradient: "from-blue-600 to-blue-700",
      count: "5.8K",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-400",
      bgGradient: "from-pink-500 to-purple-600",
      count: "15.3K",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter signup with animation
      console.log("Newsletter signup:", email);
      setEmail("");
      // Add success animation here
    }
  };

  return (
    <div className="bg-black">
      {/* Footer Section */}
      <footer
        id="footer"
        ref={footerRef}
        className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl animate-spin-slow"></div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-10 animate-float-random"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 6}s`,
                }}
              >
                {i % 4 === 0 && <Star className="w-3 h-3 text-purple-400" />}
                {i % 4 === 1 && <Sparkles className="w-4 h-4 text-blue-400" />}
                {i % 4 === 2 && (
                  <MessageCircle className="w-3 h-3 text-purple-300" />
                )}
                {i % 4 === 3 && <Lock className="w-3 h-3 text-blue-300" />}
              </div>
            ))}
          </div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-purple-500/10 to-transparent animate-grid-slide"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
              {/* Brand Section with Enhanced Animations */}
              <div
                className={`lg:col-span-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex items-center mb-6 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-purple-500/25">
                    <Shield className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    SecureChat
                  </span>
                </div>

                <div className="mb-8">
                  <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
                    The world&apos;s most secure messaging platform with{" "}
                    <span className="text-purple-400 font-medium">
                      {typedText}
                      <span className="animate-blink">|</span>
                    </span>
                  </p>

                  {/* Animated Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="text-2xl font-bold text-white animate-count-up">
                        1M+
                      </div>
                      <div className="text-xs text-gray-400">Users</div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="text-2xl font-bold text-white animate-count-up">
                        99.9%
                      </div>
                      <div className="text-xs text-gray-400">Uptime</div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="text-2xl font-bold text-white animate-count-up">
                        256-bit
                      </div>
                      <div className="text-xs text-gray-400">Encryption</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Newsletter Signup */}
                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-4 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-400 animate-sparkle" />
                    Stay Updated
                  </h4>
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="relative group"
                  >
                    <div className="flex relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-l-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/10"
                        required
                      />
                      <button
                        type="submit"
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-r-2xl hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center group-hover:scale-105 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Send className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Enhanced Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    const isHovered = hoveredSocial === index;

                    return (
                      <div key={index} className="relative group">
                        <a
                          href={social.href}
                          aria-label={social.label}
                          className={`relative w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-500 hover:scale-125 hover:rotate-12 hover:bg-gradient-to-br ${social.bgGradient} hover:text-white hover:shadow-xl overflow-hidden group`}
                          onMouseEnter={() => setHoveredSocial(index)}
                          onMouseLeave={() => setHoveredSocial(null)}
                        >
                          {/* Animated background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {typeof IconComponent === "function" ? (
                            <IconComponent className="w-6 h-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                          ) : (
                            IconComponent
                          )}

                          {/* Follower count tooltip */}
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-700 shadow-xl">
                            <div className="text-center">
                              <div className="font-semibold">
                                {social.count}
                              </div>
                              <div className="text-gray-400">
                                {social.label}
                              </div>
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Links Sections */}
              {Object.entries(footerLinks).map(
                ([category, links], categoryIndex) => (
                  <div
                    key={category}
                    className={`transition-all duration-1000 delay-${(categoryIndex + 1) * 150} ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    <h4 className="text-white font-semibold mb-6 capitalize text-lg relative">
                      {category === "legal" ? "Legal" : category}
                      <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    </h4>
                    <ul className="space-y-4">
                      {links.map((link, index) => {
                        const IconComponent = link.icon;
                        return (
                          <li key={index}>
                            <a
                              href={link.href}
                              className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group hover:translate-x-2"
                            >
                              {IconComponent && (
                                <IconComponent className="w-4 h-4 mr-3 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:text-purple-400" />
                              )}
                              <span className="relative">
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                              </span>
                              <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Enhanced Download Section */}
          <div
            className={`py-12 border-t border-gray-800 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Download SecureChat
              </h3>
              <p className="text-gray-400 mb-8">
                Experience secure messaging on all your devices
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                {[
                  {
                    icon: Smartphone,
                    label: "Mobile App",
                    users: "500K+",
                    gradient: "from-green-500 to-emerald-600",
                  },
                  {
                    icon: Monitor,
                    label: "Desktop App",
                    users: "200K+",
                    gradient: "from-blue-500 to-cyan-600",
                  },
                  {
                    icon: Globe,
                    label: "Web App",
                    users: "300K+",
                    gradient: "from-purple-500 to-pink-600",
                  },
                ].map((app, index) => {
                  const IconComponent = app.icon;
                  return (
                    <button
                      key={index}
                      className="group relative flex flex-col items-center px-8 py-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-gray-600/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden min-w-[160px]"
                    >
                      {/* Animated background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      ></div>

                      <div
                        className={`w-16 h-16 mb-4 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      <div className="relative z-10">
                        <div className="text-white font-semibold mb-1">
                          {app.label}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {app.users} downloads
                        </div>
                      </div>

                      {/* Hover effect particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-particle"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${30 + i * 20}%`,
                              animationDelay: `${i * 0.2}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div
            className={`py-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center text-gray-400 mb-4 md:mb-0 group">
              <span>© 2025 SecureChat. Made with</span>
              <Heart className="w-4 h-4 mx-2 text-red-500 animate-heartbeat group-hover:scale-125 transition-transform duration-300" />
              <span>for privacy.</span>
            </div>

            <div className="flex items-center space-x-8 text-sm">
              {[
                {
                  emoji: "🔒",
                  text: "End-to-End Encrypted",
                  color: "hover:text-green-400",
                },
                {
                  emoji: "🚫",
                  text: "Zero Data Retention",
                  color: "hover:text-blue-400",
                },
                {
                  emoji: "🌍",
                  text: "Global Infrastructure",
                  color: "hover:text-purple-400",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center text-gray-400 ${item.color} transition-all duration-300 hover:scale-105 cursor-default group`}
                >
                  <span className="mr-2 text-base group-hover:animate-bounce">
                    {item.emoji}
                  </span>
                  <span className="relative">
                    {item.text}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-110 hover:rotate-12 z-50 flex items-center justify-center group overflow-hidden animate-bounce-subtle"
            aria-label="Scroll to top"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <ChevronUp className="w-7 h-7 relative z-10 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></div>
          </button>
        )}

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes float-random {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            25% {
              transform: translateY(-20px) rotate(90deg) scale(1.1);
            }
            50% {
              transform: translateY(-10px) rotate(180deg) scale(0.9);
            }
            75% {
              transform: translateY(-30px) rotate(270deg) scale(1.05);
            }
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.05);
            }
          }

          @keyframes spin-slow {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          @keyframes grid-slide {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes blink {
            0%,
            50% {
              opacity: 1;
            }
            51%,
            100% {
              opacity: 0;
            }
          }

          @keyframes sparkle {
            0%,
            100% {
              transform: rotate(0deg) scale(1);
            }
            25% {
              transform: rotate(90deg) scale(1.2);
            }
            50% {
              transform: rotate(180deg) scale(0.8);
            }
            75% {
              transform: rotate(270deg) scale(1.1);
            }
          }

          @keyframes heartbeat {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }

          @keyframes bounce-subtle {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes particle {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            50% {
              opacity: 1;
              transform: translateY(-10px);
            }
            100% {
              opacity: 0;
              transform: translateY(-20px);
            }
          }

          @keyframes count-up {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-float-random {
            animation: float-random 8s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }

          .animate-grid-slide {
            animation: grid-slide 15s linear infinite;
          }

          .animate-blink {
            animation: blink 1.5s infinite;
          }

          .animate-sparkle {
            animation: sparkle 2s ease-in-out infinite;
          }

          .animate-heartbeat {
            animation: heartbeat 2s ease-in-out infinite;
          }

          .animate-bounce-subtle {
            animation: bounce-subtle 3s ease-in-out infinite;
          }

          .animate-particle {
            animation: particle 2s ease-out infinite;
          }

          .animate-count-up {
            animation: count-up 1s ease-out;
          }
        `}</style>
      </footer>
    </div>
  );
};

export default FooterSection;
