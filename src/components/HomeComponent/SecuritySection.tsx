import {
  Activity,
  AlertTriangle,
  Award,
  CheckCircle,
  Clock,
  EyeOff,
  Fingerprint,
  Globe,
  Key,
  Lock,
  Shield,
  ShieldCheck,
  Sparkles,
  UserX,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SecuritySection = () => {
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const [activeFeature, setActiveFeature] = useState(0);
  const [encryptionDemo, setEncryptionDemo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const securityFeatures = [
    {
      id: 1,
      icon: Lock,
      title: "End-to-End Encryption",
      description:
        "Military-grade AES-256 encryption ensures your messages are completely secure from sender to recipient.",
      details:
        "Every message is encrypted with a unique key that only you and your recipient possess. Even we cannot read your messages.",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      badge: "AES-256",
      guarantee: "Unbreakable",
    },
    {
      id: 2,
      icon: EyeOff,
      title: "Zero Data Retention",
      description:
        "We don't store your messages, metadata, or personal information. What you send disappears forever.",
      details:
        "Our servers are designed to forget. No logs, no backups, no traces of your communications remain.",
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-500/10 to-indigo-500/10",
      badge: "Zero Logs",
      guarantee: "Complete Privacy",
    },
    {
      id: 3,
      icon: UserX,
      title: "Anonymous Registration",
      description:
        "No phone numbers, emails, or personal details required. Start communicating anonymously in seconds.",
      details:
        "Create your account with just a username. No verification, no tracking, no digital footprint.",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-500/10 to-teal-500/10",
      badge: "No KYC",
      guarantee: "True Anonymity",
    },
    {
      id: 4,
      icon: Clock,
      title: "Self-Destructing Messages",
      description:
        "Set custom timers for messages to automatically delete from all devices after reading.",
      details:
        "Choose from seconds to days. Messages vanish completely, leaving no digital trace behind.",
      color: "from-rose-500 to-pink-600",
      bgColor: "from-rose-500/10 to-pink-500/10",
      badge: "Auto-Delete",
      guarantee: "Temporal Security",
    },
    {
      id: 5,
      icon: Globe,
      title: "Decentralized Architecture",
      description:
        "Our distributed network ensures no single point of failure or government interference.",
      details:
        "Messages route through multiple secure nodes globally, making interception virtually impossible.",
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-500/10 to-orange-500/10",
      badge: "Distributed",
      guarantee: "Censorship Resistant",
    },
    {
      id: 6,
      icon: Fingerprint,
      title: "Perfect Forward Secrecy",
      description:
        "Each conversation uses unique encryption keys that change constantly for maximum security.",
      details:
        "Even if one key is compromised, all previous and future messages remain completely secure.",
      color: "from-teal-500 to-green-600",
      bgColor: "from-teal-500/10 to-green-500/10",
      badge: "PFS",
      guarantee: "Future-Proof",
    },
  ];

  const certifications = [
    { name: "SOC 2 Type II", icon: Award, status: "Certified" },
    { name: "ISO 27001", icon: ShieldCheck, status: "Compliant" },
    { name: "GDPR Ready", icon: CheckCircle, status: "Verified" },
    { name: "Zero Trust", icon: Shield, status: "Implemented" },
  ];

  const securityStats = [
    { number: "256-bit", label: "Encryption Strength", icon: Key },
    { number: "0", label: "Data Breaches", icon: AlertTriangle },
    { number: "99.99%", label: "Uptime SLA", icon: Activity },
    { number: "< 1ms", label: "Encryption Speed", icon: Zap },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger animations
            securityFeatures.forEach((_, index) => {
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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleEncryptionDemo = () => {
    setEncryptionDemo(!encryptionDemo);
  };

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ">
      <section
        ref={sectionRef}
        className="py-20 bg-gradient-to-b max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-8 from-black via-gray-900 to-black relative overflow-hidden rounded-3xl  shadow-2xl  border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Animated Security Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
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
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 mb-6">
              <ShieldCheck className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-200 font-medium">
                Military-Grade Security
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Unbreakable Security
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your privacy is our mission. Every message is protected by
              state-of-the-art encryption and zero-knowledge architecture that
              even we cannot breach.
            </p>
          </div>

          {/* Security Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {securityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 mb-4 group-hover:bg-blue-500/20 transition-all duration-300">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Security Features */}
          <div
            className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = index === activeFeature;
                const isElementVisible = visibleElements.includes(index);

                return (
                  <div
                    key={feature.id}
                    className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-700 hover:bg-white/8 hover:border-white/20 cursor-pointer ${
                      isActive
                        ? "scale-105 bg-white/8 border-blue-500/30 shadow-2xl shadow-blue-500/20"
                        : ""
                    } ${isElementVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    onClick={() => setActiveFeature(index)}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${feature.bgColor.split(" ")[1]}, ${feature.bgColor.split(" ")[3]})`
                        : undefined,
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Feature Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${feature.color} text-white`}
                      >
                        {feature.badge}
                      </div>
                    </div>

                    {/* Feature Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {feature.description}
                    </p>

                    <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                      {feature.details}
                    </p>

                    {/* Guarantee Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                        ✓ {feature.guarantee}
                      </span>
                      {isActive && (
                        <div className="flex items-center text-blue-400 animate-pulse">
                          <Sparkles className="w-4 h-4 mr-1" />
                          <span className="text-xs">Active</span>
                        </div>
                      )}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Encryption Demo */}
          <div
            className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Live Encryption Demo
                </h3>
                <p className="text-gray-300 mb-6">
                  See how your messages are protected in real-time
                </p>
                <button
                  onClick={toggleEncryptionDemo}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  {encryptionDemo ? "Hide Demo" : "Start Demo"}
                </button>
              </div>

              {encryptionDemo && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="text-center">
                    <div className="bg-white/5 border border-gray-600 rounded-xl p-4 mb-4">
                      <p className="text-white font-mono text-sm">
                        &quot;Hello, this is a secret message!&quot;
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">Original Message</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="animate-spin">
                        <Key className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                    <p className="text-blue-400 text-sm font-semibold">
                      AES-256 Encryption
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                      <p className="text-blue-300 font-mono text-xs break-all">
                        7aK9mX3nP8qW2eR5tY6uI1oP4sD7fG9hJ2kL5nM8xC3vB6nQ9wE2rT5yU8iO1pA4sD7fG
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">Encrypted Data</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`mb-16 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              Trusted & Certified
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div
                    key={index}
                    className="text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="bg-white/5 border border-gray-600 rounded-xl p-6 mb-4 group-hover:bg-white/10 group-hover:border-green-500/30 transition-all duration-300">
                      <Icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-white mb-2">
                        {cert.name}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                        {cert.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-gray-400 mb-6">
              Experience uncompromising security and privacy
            </p>
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Secure Messaging
                <Shield className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecuritySection;
