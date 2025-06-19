import { Button } from "@/components/ui/button";
import { ArrowRight, Ghost, MessageCircle, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const GhostPenHero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroTexts = [
    "Send messages without revealing your identity",
    "Share thoughts anonymously with anyone",
    "Express yourself freely, stay invisible",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Ghost, text: "100% Anonymous" },
    { icon: Shield, text: "Secure & Private" },
    { icon: Zap, text: "AI-Powered Suggestions" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Navigation */}
          <nav
            className={`flex justify-between items-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          >
            <div className="flex items-center space-x-2">
              <Ghost className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ghost Pen
              </span>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:text-purple-300"
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-300"
              >
                Features
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Anonymous
                </span>
                <br />
                <span className="text-white">Messages</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Redefined
                </span>
              </h1>
            </div>

            {/* Rotating subtitle */}
            <div
              className={`h-16 mb-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <p className="text-xl md:text-2xl text-gray-300 transition-all duration-500">
                {heroTexts[currentText]}
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg group"
              >
                Start Messaging
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                See Demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="bg-purple-800/30 p-4 rounded-full mb-3 group-hover:bg-purple-700/40 transition-colors">
                    <feature.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating message preview */}
          <div
            className={`absolute bottom-20 right-10 bg-white/10 backdrop-blur-md rounded-lg p-4 max-w-xs border border-white/20 transition-all duration-1000 delay-1200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <p className="text-sm text-gray-300">Anonymous message</p>
            </div>
            <p className="text-white text-sm italic">
              Your app idea is brilliant! 🚀
            </p>
            <p className="text-xs text-gray-400 mt-2">Just now</p>
          </div>

          {/* Scroll indicator */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1500 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorks />
    </div>
  );
};

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("how-it-works");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: 1,
      title: "Share Your Link",
      description:
        "Create your unique Ghost Pen profile and share your anonymous message link with friends, followers, or anyone.",
      icon: "🔗",
      color: "from-blue-500 to-cyan-500",
      preview: "ghostpen.com/u/yourname",
    },
    {
      id: 2,
      title: "Receive Messages",
      description:
        "People can send you honest feedback, compliments, questions, or thoughts without revealing their identity.",
      icon: "👻",
      color: "from-purple-500 to-pink-500",
      preview: "Anonymous message received!",
    },
    {
      id: 3,
      title: "Engage & Respond",
      description:
        "Read all messages in your dashboard. Use AI suggestions to spark conversations and get more meaningful interactions.",
      icon: "💬",
      color: "from-green-500 to-emerald-500",
      preview: "AI suggests: 'What's your biggest dream?'",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get started with Ghost Pen in just three simple steps. It's designed
            to be intuitive and powerful.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative group cursor-pointer transition-all duration-700 ${
                  sectionVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent z-10"></div>
                )}

                <div
                  className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 ${
                    activeStep === index
                      ? "border-purple-500 shadow-2xl shadow-purple-500/20 scale-105"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                >
                  {/* Step number */}
                  <div
                    className={`absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Preview */}
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-sm text-purple-300 font-mono">
                      {step.preview}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Demo */}
          <div
            className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 transition-all duration-1000 ${
              sectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Ready to Experience Anonymous Communication?
              </h3>
              <p className="text-gray-400 mb-6">
                Join thousands of users who are already sharing and receiving
                honest, anonymous feedback.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4"
                >
                  Create Your Profile
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-4"
                >
                  Try Demo
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: "10K+", label: "Active Users" },
                { number: "50K+", label: "Messages Sent" },
                { number: "100%", label: "Anonymous" },
                { number: "24/7", label: "Available" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GhostPenHero;
