import { Button } from "@/components/ui/button";
import { ArrowRight, Ghost, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
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
              {/* <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                See Demo
              </Button> */}
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
          {/* <div
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
          </div> */}

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
    </div>
  );
};

export default Hero;
