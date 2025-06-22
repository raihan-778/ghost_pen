// import { Button } from "@/components/ui/button";
// import { ArrowRight, Ghost, Shield, Zap } from "lucide-react";
// import { useEffect, useState } from "react";

// const Hero = () => {
//   const [currentText, setCurrentText] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   const heroTexts = [
//     "Send messages without revealing your identity",
//     "Share thoughts anonymously with anyone",
//     "Express yourself freely, stay invisible",
//   ];

//   useEffect(() => {
//     setIsVisible(true);
//     const interval = setInterval(() => {
//       setCurrentText((prev) => (prev + 1) % heroTexts.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const features = [
//     { icon: Ghost, text: "100% Anonymous" },
//     { icon: Shield, text: "Secure & Private" },
//     { icon: Zap, text: "AI-Powered Suggestions" },
//   ];

//   return (
//     <div className="w-full">
//       {/* Hero Section */}
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
//         {/* Animated background particles */}
//         <div className="absolute inset-0">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${2 + Math.random() * 3}s`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 container mx-auto px-6 py-20">
//           {/* Hero Content */}
//           <div className="text-center max-w-4xl mx-auto">
//             <div
//               className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
//             >
//               <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
//                 <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//                   Anonymous
//                 </span>
//                 <br />
//                 <span className="text-white">Messages</span>
//                 <br />
//                 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   Redefined
//                 </span>
//               </h1>
//             </div>

//             {/* Rotating subtitle */}
//             <div
//               className={`h-16 mb-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
//             >
//               <p className="text-xl md:text-2xl text-gray-300 transition-all duration-500">
//                 {heroTexts[currentText]}
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div
//               className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
//             >
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg group"
//               >
//                 Start Messaging
//                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               {/* <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
//               >
//                 <MessageCircle className="mr-2 h-5 w-5" />
//                 See Demo
//               </Button> */}
//             </div>

//             {/* Feature highlights */}
//             <div
//               className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
//             >
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center group cursor-pointer"
//                 >
//                   <div className="bg-purple-800/30 p-4 rounded-full mb-3 group-hover:bg-purple-700/40 transition-colors">
//                     <feature.icon className="h-6 w-6 text-purple-400" />
//                   </div>
//                   <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
//                     {feature.text}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Floating message preview */}
//           {/* <div
//             className={`absolute bottom-20 right-10 bg-white/10 backdrop-blur-md rounded-lg p-4 max-w-xs border border-white/20 transition-all duration-1000 delay-1200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
//           >
//             <div className="flex items-center mb-2">
//               <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
//               <p className="text-sm text-gray-300">Anonymous message</p>
//             </div>
//             <p className="text-white text-sm italic">
//               Your app idea is brilliant! 🚀
//             </p>
//             <p className="text-xs text-gray-400 mt-2">Just now</p>
//           </div> */}

//           {/* Scroll indicator */}
//           <div
//             className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1500 ${isVisible ? "opacity-100" : "opacity-0"}`}
//           >
//             <div className="animate-bounce">
//               <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
//                 <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
import {
  ArrowRight,
  Lock,
  MessageCircle,
  Play,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { number: "10M+", label: "Messages Sent", icon: MessageCircle },
    { number: "500K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Privacy Secured", icon: Lock },
  ];

  const floatingElements = [
    { icon: MessageCircle, delay: 0, x: 10, y: 20 },
    { icon: Shield, delay: 1000, x: 80, y: 15 },
    { icon: Zap, delay: 2000, x: 15, y: 70 },
    { icon: Sparkles, delay: 1500, x: 85, y: 75 },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}%`,
            top: `${mousePosition.y * 0.02}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${mousePosition.x * 0.03}%`,
            bottom: `${mousePosition.y * 0.03}%`,
            transform: "translate(50%, 50%)",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${50 + mousePosition.x * 0.01}%`,
            top: `${30 + mousePosition.y * 0.01}%`,
            transform: "translate(-50%, -50%)",
            animationDelay: "2s",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className="absolute animate-bounce opacity-30"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                animationDelay: `${element.delay}ms`,
                animationDuration: "3s",
              }}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 mb-8 group hover:scale-105 transition-transform cursor-pointer">
            <Sparkles
              className="w-4 h-4 text-purple-400 mr-2 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <span className="text-sm text-purple-200 font-medium">
              ✨ 100% Anonymous Messaging Platform
            </span>
            <ArrowRight className="w-4 h-4 text-purple-400 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
              Send Messages
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Stay Anonymous
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            Experience true freedom of expression with our secure, anonymous
            messaging platform.
            <span className="text-purple-400 font-semibold">
              {" "}
              No identity revealed, no traces left.
            </span>
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="relative z-10 flex items-center justify-center">
                Start Messaging
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            <button className="group flex items-center justify-center px-8 py-4 border-2 border-purple-500/50 text-white rounded-2xl font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300 hover:border-purple-400">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
