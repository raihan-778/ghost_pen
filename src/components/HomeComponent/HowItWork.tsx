import {
  ArrowRight,
  Bot,
  CheckCircle,
  MessageSquare,
  Send,
  Shield,
  User,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { GlitchButton } from "../GlitchButton";

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const steps = [
    {
      id: 1,
      title: "Choose Your Message",
      description:
        "Select from AI-generated suggestions or write your own anonymous message",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-700",
      details:
        "Our AI suggests contextual messages, or you can craft your own thoughts freely",
    },
    {
      id: 2,
      title: "Stay Anonymous",
      description:
        "Your identity is completely hidden - no traces, no logs, no reveals",
      icon: Shield,
      color: "from-blue-500 to-blue-700",
      details:
        "Advanced encryption ensures your anonymity is never compromised",
    },
    {
      id: 3,
      title: "Send Instantly",
      description: "Messages are delivered instantly to your chosen recipient",
      icon: Send,
      color: "from-pink-500 to-pink-700",
      details: "Lightning-fast delivery with real-time notifications",
    },
    {
      id: 4,
      title: "Connect Authentically",
      description:
        "Experience genuine conversations without the fear of judgment",
      icon: Zap,
      color: "from-green-500 to-green-700",
      details: "Build real connections through honest, anonymous communication",
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, steps.length]);

  const handleStepClick = (index: React.SetStateAction<number>) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto lg:px-8 ">
      <div className="bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden  rounded-3xl shadow-2xl border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500">
        <div className="container mx-auto py-8 lg:py-12 px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How It{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Four simple steps to anonymous, authentic communication
            </p>
          </div>

          {/* Steps Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeStep === index
                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-105`
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep === index ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  {activeStep === index ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-bold">{step.id}</span>
                  )}
                </div>
                <span className="font-medium hidden sm:inline">
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Step Details */}
            <div className="space-y-8">
              <div className="relative">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.id}
                      className={`transition-all duration-500 ${
                        activeStep === index
                          ? "opacity-100 transform translate-x-0"
                          : "opacity-0 transform translate-x-4 absolute inset-0"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-xl`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-4">
                        {step.title}
                      </h3>

                      <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <p className="text-lg text-gray-400 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Interactive Demo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Demo Screen */}
                <div className="bg-slate-800 rounded-2xl p-6 mb-6 min-h-[400px] relative overflow-hidden">
                  {/* Step 1 Demo */}
                  <div
                    className={`transition-all duration-500 ${
                      activeStep === 0
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4 absolute inset-0"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Bot className="w-6 h-6 text-purple-400" />
                        <span className="text-purple-400 font-medium">
                          AI Suggestions
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-500/30 cursor-pointer hover:bg-purple-500/30 transition-colors">
                          <p className="text-white">
                            Hey, I&apos;ve been thinking about you...
                          </p>
                        </div>
                        <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-500/30 cursor-pointer hover:bg-purple-500/30 transition-colors">
                          <p className="text-white">
                            I have something important to share...
                          </p>
                        </div>
                        <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-500/30 cursor-pointer hover:bg-purple-500/30 transition-colors">
                          <p className="text-white">
                            Thanks for being such a great friend
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Demo */}
                  <div
                    className={`transition-all duration-500 ${
                      activeStep === 1
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4 absolute inset-0"
                    }`}
                  >
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Shield className="w-12 h-12 text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-green-400 font-medium">
                          ✓ Identity Encrypted
                        </p>
                        <p className="text-green-400 font-medium">
                          ✓ No IP Tracking
                        </p>
                        <p className="text-green-400 font-medium">
                          ✓ Zero Data Logs
                        </p>
                      </div>
                      <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                        <p className="text-white">
                          Your anonymity is 100% guaranteed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 Demo */}
                  <div
                    className={`transition-all duration-500 ${
                      activeStep === 2
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4 absolute inset-0"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400">
                          Sending to: Anonymous User
                        </span>
                        <div className="flex items-center gap-2 text-pink-400">
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                          <span className="text-sm">Sending...</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 rounded-lg border border-pink-500/30">
                        <p className="text-white mb-2">
                          Hey, I&apos;ve been thinking about you...
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Send className="w-4 h-4" />
                          <span>Delivered instantly</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">
                            Message Delivered
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 Demo */}
                  <div
                    className={`transition-all duration-500 ${
                      activeStep === 3
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4 absolute inset-0"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <User className="w-6 h-6 text-green-400" />
                        <span className="text-green-400 font-medium">
                          Anonymous Chat
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30 ml-8">
                          <p className="text-white text-sm">
                            Hey, I&apos;ve been thinking about you...
                          </p>
                        </div>
                        <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30 mr-8">
                          <p className="text-white text-sm">
                            Really? That&apos;s so sweet to hear!
                          </p>
                        </div>
                        <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30 ml-8">
                          <p className="text-white text-sm">
                            I wanted to tell you but was nervous...
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-sm">
                          Authentic conversations without judgment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeStep
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 flex-1"
                          : "bg-white/20 w-8"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <GlitchButton variant="default">
              <div className="flex items-center space-x-3">
                Ready to Start?
                <ArrowRight className="w-5 h-5" />
              </div>
            </GlitchButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
