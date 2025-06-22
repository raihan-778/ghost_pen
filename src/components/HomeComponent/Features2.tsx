// import React, { useState, useEffect, useRef } from "react";
// import {
//   Shield,
//   MessageCircle,
//   Zap,
//   Lock,
//   Users,
//   Globe,
//   Eye,
//   Clock,
//   Smartphone,
//   ArrowRight,
//   CheckCircle,
//   Sparkles,
// } from "lucide-react";

// const FeaturesSection = () => {
//   const [visibleCards, setVisibleCards] = useState<number[]>([]);
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const features = [
//     {
//       id: 1,
//       icon: Shield,
//       title: "100% Anonymous",
//       description:
//         "Complete privacy protection with zero identity tracking. Your messages remain completely untraceable.",
//       color: "from-purple-500 to-indigo-600",
//       bgColor: "from-purple-500/10 to-indigo-500/10",
//       highlights: [
//         "No registration required",
//         "Zero data collection",
//         "IP address protection",
//       ],
//     },
//     {
//       id: 2,
//       icon: Lock,
//       title: "End-to-End Encryption",
//       description:
//         "Military-grade encryption ensures your messages are secure from sender to recipient.",
//       color: "from-green-500 to-emerald-600",
//       bgColor: "from-green-500/10 to-emerald-500/10",
//       highlights: [
//         "AES-256 encryption",
//         "Perfect forward secrecy",
//         "Quantum-resistant",
//       ],
//     },
//     {
//       id: 3,
//       icon: Zap,
//       title: "Instant Delivery",
//       description:
//         "Lightning-fast message delivery with real-time notifications and status updates.",
//       color: "from-yellow-500 to-orange-600",
//       bgColor: "from-yellow-500/10 to-orange-500/10",
//       highlights: [
//         "Sub-second delivery",
//         "Real-time status",
//         "Global CDN network",
//       ],
//     },
//     {
//       id: 4,
//       icon: Eye,
//       title: "Self-Destructing Messages",
//       description:
//         "Set expiration times for your messages. They automatically delete after being read.",
//       color: "from-red-500 to-pink-600",
//       bgColor: "from-red-500/10 to-pink-500/10",
//       highlights: ["Custom timers", "Auto-deletion", "No trace left behind"],
//     },
//     {
//       id: 5,
//       icon: Globe,
//       title: "Global Accessibility",
//       description:
//         "Access from anywhere in the world with multi-language support and local servers.",
//       color: "from-blue-500 to-cyan-600",
//       bgColor: "from-blue-500/10 to-cyan-500/10",
//       highlights: ["50+ languages", "Worldwide servers", "24/7 availability"],
//     },
//     {
//       id: 6,
//       icon: Smartphone,
//       title: "Cross-Platform",
//       description:
//         "Seamlessly works across all devices - web, mobile, and desktop applications.",
//       color: "from-teal-500 to-green-600",
//       bgColor: "from-teal-500/10 to-green-500/10",
//       highlights: ["Web app", "Mobile apps", "Desktop clients"],
//     },
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const cardId = parseInt((entry.target as HTMLElement).dataset.cardId!);
//             setTimeout(() => {
//               setVisibleCards((prev) => [...prev, cardId]);
//             }, cardId * 150);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const cards = sectionRef.current?.querySelectorAll("[data-card-id]");
//     cards?.forEach((card) => observer.observe(card));

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "2s" }}
//         ></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 mb-6">
//             <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
//             <span className="text-sm text-purple-200 font-medium">
//               Powerful Features
//             </span>
//           </div>

//           <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             Why Choose Our Platform?
//           </h2>

//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Experience the most advanced anonymous messaging platform with
//             cutting-edge security, blazing-fast delivery, and unmatched privacy
//             protection.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             const isVisible = visibleCards.includes(feature.id);
//             const isHovered = hoveredCard === feature.id;

//             return (
//               <div
//                 key={feature.id}
//                 data-card-id={feature.id}
//                 className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-700 cursor-pointer ${
//                   isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-8"
//                 } ${
//                   isHovered
//                     ? "transform -translate-y-4 border-purple-500/50 bg-white/10"
//                     : "hover:-translate-y-2 hover:border-white/20 hover:bg-white/8"
//                 }`}
//                 onMouseEnter={() => setHoveredCard(feature.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 style={{
//                   animationDelay: `${index * 100}ms`,
//                   background: isHovered
//                     ? `linear-gradient(135deg, ${feature.bgColor.split(" ")[1]}, ${feature.bgColor.split(" ")[3]})`
//                     : undefined,
//                 }}
//               >
//                 {/* Glow Effect */}
//                 <div
//                   className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r ${feature.color}`}
//                 ></div>

//                 {/* Card Content */}
//                 <div className="relative z-10">
//                   {/* Icon */}
//                   <div
//                     className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
//                   >
//                     <Icon className="w-8 h-8 text-white" />
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
//                     {feature.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
//                     {feature.description}
//                   </p>

//                   {/* Highlights */}
//                   <div className="space-y-2 mb-6">
//                     {feature.highlights.map((highlight, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
//                         style={{
//                           animationDelay: `${index * 100 + idx * 50}ms`,
//                         }}
//                       >
//                         <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
//                         <span>{highlight}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Learn More Button */}
//                   <button
//                     className={`group/btn flex items-center text-sm font-medium transition-all duration-300 ${
//                       isHovered
//                         ? `bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`
//                         : "text-purple-400 hover:text-purple-300"
//                     }`}
//                   >
//                     Learn More
//                     <ArrowRight
//                       className={`w-4 h-4 ml-2 transition-transform duration-300 ${
//                         isHovered
//                           ? "translate-x-1"
//                           : "group-hover/btn:translate-x-1"
//                       }`}
//                     />
//                   </button>
//                 </div>

//                 {/* Floating Elements */}
//                 {isHovered && (
//                   <div className="absolute top-4 right-4 opacity-20">
//                     <div
//                       className="animate-bounce"
//                       style={{ animationDelay: "0.5s" }}
//                     >
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Bottom CTA */}
//         <div className="text-center mt-16">
//           <div
//             className={`transition-all duration-1000 delay-1000 ${
//               visibleCards.length > 3
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-4"
//             }`}
//           >
//             <p className="text-gray-400 mb-6">
//               Ready to experience anonymous messaging?
//             </p>
//             <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
//               <span className="relative z-10 flex items-center">
//                 Get Started Now
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </span>
//               <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;
import {
  ArrowRight,
  CheckCircle,
  Eye,
  Lock,
  MessageCircle,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const AlternativeFeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationStates, setAnimationStates] = useState({});
  const sectionRef = useRef(null);

  const features: Feature[] = [
    {
      id: "anonymous",
      title: "Complete Anonymity",
      subtitle: "Zero Identity Tracking",
      icon: Shield,
      color: "purple",
      gradient: "from-purple-600 via-purple-500 to-indigo-600",
      description:
        "Experience true anonymous messaging without revealing your identity. No registration, no tracking, no digital footprints.",
      benefits: [
        "No personal information required",
        "IP address masking technology",
        "Zero data retention policy",
        "Untraceable message routing",
      ],
      demoType: "shield-animation",
    },
    {
      id: "encryption",
      title: "Military-Grade Security",
      subtitle: "End-to-End Encryption",
      icon: Lock,
      color: "emerald",
      gradient: "from-emerald-600 via-green-500 to-teal-600",
      description:
        "Your messages are protected with AES-256 encryption, the same standard used by governments and military organizations worldwide.",
      benefits: [
        "AES-256 bit encryption",
        "Perfect forward secrecy",
        "Quantum-resistant algorithms",
        "Real-time key rotation",
      ],
      demoType: "encryption-demo",
    },
    {
      id: "instant",
      title: "Lightning Fast Delivery",
      subtitle: "Real-Time Messaging",
      icon: Zap,
      color: "amber",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      description:
        "Messages delivered instantly across the globe with our optimized network infrastructure and edge computing technology.",
      benefits: [
        "Sub-second delivery times",
        "Global CDN network",
        "Real-time status updates",
        "99.9% uptime guarantee",
      ],
      demoType: "speed-demo",
    },
    {
      id: "autodestruct",
      title: "Self-Destructing Messages",
      subtitle: "Temporary Communications",
      icon: Eye,
      color: "rose",
      gradient: "from-rose-500 via-pink-500 to-purple-500",
      description:
        "Set custom expiration times for your messages. They automatically disappear after being read or after a set duration.",
      benefits: [
        "Custom timer settings",
        "Read-once destruction",
        "Automatic cleanup",
        "No recovery possible",
      ],
      demoType: "destruct-demo",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  interface Feature {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    color: string;
    gradient: string;
    description: string;
    benefits: string[];
    demoType:
      | "shield-animation"
      | "encryption-demo"
      | "speed-demo"
      | "destruct-demo";
  }

  interface RenderDemoProps {
    feature: Feature;
  }

  const renderDemo = (feature: Feature): React.ReactNode => {
    switch (feature.demoType) {
      case "shield-animation":
        return (
          <div className="relative h-48 flex items-center justify-center">
            <div className="relative">
              {/* Pulsing Shield */}
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center animate-pulse">
                <Shield className="w-12 h-12 text-white" />
              </div>

              {/* Protective Rings */}
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-ping"
                  style={{
                    width: `${96 + ring * 24}px`,
                    height: `${96 + ring * 24}px`,
                    left: `${-12 * ring}px`,
                    top: `${-12 * ring}px`,
                    animationDelay: `${ring * 0.5}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}

              {/* Floating "PROTECTED" text */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-400 animate-bounce">
                PROTECTED
              </div>
            </div>
          </div>
        );

      case "encryption-demo":
        return (
          <div className="relative h-48 flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <span className="text-xs text-gray-400">Original</span>
            </div>

            <div className="flex-1 relative">
              <div className="h-0.5 bg-gradient-to-r from-gray-600 to-emerald-500 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                ENCRYPTING
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-2 animate-pulse">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-emerald-400">Encrypted</span>
            </div>
          </div>
        );

      case "speed-demo":
        return (
          <div className="relative h-48 flex items-center justify-center">
            <div className="relative w-full max-w-xs">
              <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-1">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Sender</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-1">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400">Receiver</span>
                </div>
              </div>

              <div className="relative h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"
                  style={{
                    width: "100%",
                    animation: "speedBar 2s ease-in-out infinite",
                  }}
                ></div>
              </div>

              <div className="text-center mt-2">
                <span className="text-xs font-bold text-amber-400 animate-pulse">
                  ⚡ DELIVERED IN 0.3s
                </span>
              </div>
            </div>
          </div>
        );

      case "destruct-demo":
        return (
          <div className="relative h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-32 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-600 flex items-center justify-center mb-4 overflow-hidden">
                <MessageCircle className="w-8 h-8 text-gray-400 animate-pulse" />

                {/* Timer overlay */}
                <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs px-2 py-1 rounded animate-bounce">
                  5s
                </div>

                {/* Destruction effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent opacity-0 animate-pulse"></div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-rose-400 font-bold animate-pulse">
                  AUTO-DESTRUCT ACTIVE
                </div>
                <div className="text-xs text-gray-500">
                  Message expires after reading
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-200 font-medium">
              Interactive Features Demo
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            See Our Platform in Action
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore each feature with interactive demonstrations that show
            exactly how our technology protects and empowers your
            communications.
          </p>
        </div>

        {/* Tabbed Interface */}
        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeTab === index;

              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(index)}
                  className={`group flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${feature.gradient} text-white shadow-lg scale-105`
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-2 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                  />
                  <span className="hidden sm:inline">{feature.title}</span>
                  <span className="sm:hidden">
                    {feature.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feature Content */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Feature Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${features[activeTab].gradient}`}
                  >
                    {React.createElement(features[activeTab].icon, {
                      className: "w-8 h-8 text-white",
                    })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {features[activeTab].title}
                    </h3>
                    <p
                      className={`text-lg font-medium bg-gradient-to-r ${features[activeTab].gradient} bg-clip-text text-transparent`}
                    >
                      {features[activeTab].subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  {features[activeTab].description}
                </p>

                <div className="space-y-3">
                  {features[activeTab].benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 text-gray-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 text-${features[activeTab].color}-400`}
                      />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`group px-8 py-4 bg-gradient-to-r ${features[activeTab].gradient} text-white rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden`}
                >
                  <span className="relative z-10 flex items-center">
                    Try This Feature
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>

              {/* Interactive Demo */}
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-white">
                    Live Demo
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>

                {renderDemo(features[activeTab])}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes speedBar {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default AlternativeFeaturesSection;
