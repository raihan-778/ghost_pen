import {
  ArrowRight,
  Bot,
  EyeOff,
  Globe,
  Lock,
  Pause,
  Play,
  RotateCcw,
  Shield,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const FeaturesShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [messageCount, setMessageCount] = useState(1247);
  const [isPlaying, setIsPlaying] = useState(true);

  const features = [
    {
      id: "ai-suggestions",
      title: "AI-Powered Suggestions",
      subtitle: "Smart message recommendations",
      description:
        "Our advanced AI analyzes context and suggests meaningful messages that resonate with your intent.",
      icon: Bot,
      color: "from-purple-500 to-purple-700",
      demo: "ai",
    },
    {
      id: "anonymous-secure",
      title: "Complete Anonymity",
      subtitle: "Your identity stays hidden",
      description:
        "Military-grade encryption ensures your identity remains completely anonymous throughout the conversation.",
      icon: Shield,
      color: "from-blue-500 to-blue-700",
      demo: "security",
    },
    {
      id: "instant-delivery",
      title: "Instant Delivery",
      subtitle: "Real-time messaging",
      description:
        "Messages are delivered instantly with real-time notifications and read receipts.",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      demo: "delivery",
    },
    {
      id: "cross-platform",
      title: "Cross-Platform",
      subtitle: "Works everywhere",
      description:
        "Access Ghost Pen from any device - mobile, desktop, or tablet with seamless synchronization.",
      icon: Globe,
      color: "from-green-500 to-teal-600",
      demo: "platform",
    },
  ];

  const suggestions = [
    "I've been thinking about what you said...",
    "There's something I want to share with you",
    "Your friendship means everything to me",
    "I hope you're having a wonderful day",
    "Thank you for always being there",
    "I wanted to reach out and check on you",
    "You inspire me more than you know",
    "I'm grateful for our connection",
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, features.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const generateSuggestions = () => {
    setIsGenerating(true);
    setAiSuggestions([]);

    setTimeout(() => {
      const randomSuggestions = suggestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setAiSuggestions(randomSuggestions);
      setIsGenerating(false);
    }, 1500);
  };

  const currentFeature = features[activeFeature];

  return (
    <div className=" mx-auto py-20 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden  rounded-3xl shadow-2xl border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500">
        <div className=" container mx-auto py-8 lg:py-12 px-8 lg:px-12 ">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Powerful{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of anonymous communication with cutting-edge
              technology
            </p>
          </div>

          {/* Feature Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => {
                    setActiveFeature(index);
                    setIsPlaying(false);
                    setTimeout(() => setIsPlaying(true), 5000);
                  }}
                  className={`group w-76 flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeFeature === index
                      ? `bg-gradient-to-r ${feature.color} text-white shadow-lg scale-105`
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      activeFeature === index
                        ? "bg-white/20"
                        : "bg-white/10 group-hover:bg-white/20"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="font-semibold">{feature.title}</div>
                    <div className="text-sm opacity-75">{feature.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Feature Display */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Feature Info */}
            <div className="space-y-8">
              <div className="relative">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className={`transition-all duration-500 ${
                        activeFeature === index
                          ? "opacity-100 transform translate-x-0"
                          : "opacity-0 transform translate-x-4 absolute inset-0"
                      }`}
                    >
                      <div
                        className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-2xl`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      <h3 className="text-4xl font-bold text-white mb-4">
                        {feature.title}
                      </h3>

                      <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Feature Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                          <div className="text-2xl font-bold text-white">
                            99.9%
                          </div>
                          <div className="text-sm text-gray-400">Uptime</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                          <div className="text-2xl font-bold text-white">
                            {messageCount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-400">
                            Messages Sent
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Interactive Demo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Demo Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveFeature(0)}
                      className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Demo Content */}
                <div className="bg-slate-800 rounded-2xl p-6 min-h-[400px] relative overflow-hidden">
                  {/* AI Suggestions Demo */}
                  <div
                    className={`transition-all duration-500 ${
                      currentFeature.demo === "ai"
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4 absolute inset-0"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Bot className="w-6 h-6 text-purple-400" />
                          <span className="text-purple-400 font-medium">
                            AI Message Suggestions
                          </span>
                        </div>
                        <button
                          onClick={generateSuggestions}
                          disabled={isGenerating}
                          className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          {isGenerating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              Generate
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-3">
                        {aiSuggestions.length > 0 ? (
                          aiSuggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30 cursor-pointer hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
                            >
                              <p className="text-white">{suggestion}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-pulse" />
                            <p className="text-gray-400">
                              Click &quot;Generate&quot; to see AI suggestions
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Security Demo */}
                  <div
                    className={`transition-all duration-500 ${
                      currentFeature.demo === "security"
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4 absolute inset-0"
                    }`}
                  >
                    <div className="text-center space-y-6">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto relative">
                        <Shield className="w-16 h-16 text-white" />
                        <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping"></div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30 flex items-center gap-3">
                          <Lock className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">
                            End-to-End Encryption Active
                          </span>
                        </div>

                        <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30 flex items-center gap-3">
                          <EyeOff className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">
                            Identity Completely Hidden
                          </span>
                        </div>

                        <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30 flex items-center gap-3">
                          <Shield className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">
                            Zero Data Logging
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Demo */}
                  <div
                    className={`transition-all duration-500 ${
                      currentFeature.demo === "delivery"
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4 absolute inset-0"
                    }`}
                  >
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-yellow-400 font-medium">
                            Message Status
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span className="text-yellow-400 text-sm">
                              Processing...
                            </span>
                          </div>
                        </div>
                        <p className="text-white">
                          Hey, I&apos;ve been thinking about you...
                        </p>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center animate-bounce">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-green-400 font-medium">
                            Delivered
                          </span>
                          <span className="text-green-400 text-sm">
                            0.3 seconds
                          </span>
                        </div>
                        <p className="text-white">
                          Message delivered instantly
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Platform Demo */}
                  <div
                    className={`transition-all duration-500 ${
                      currentFeature.demo === "platform"
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4 absolute inset-0"
                    }`}
                  >
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">
                          Available Everywhere
                        </h4>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                            <Smartphone className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-300">Mobile</p>
                          </div>

                          <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                            <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-300">Web</p>
                          </div>

                          <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-300">Desktop</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 font-medium">
                            Synchronized across all devices
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Your conversations stay in sync wherever you are
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">1M+</div>
              <div className="text-gray-400">Messages Sent</div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
              Try Ghost Pen Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesShowcase;
