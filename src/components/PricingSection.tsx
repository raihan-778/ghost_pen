import {
  ArrowRight,
  Check,
  Crown,
  MessageCircle,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const pricingRef = useRef(null);

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

    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pricingPlans = [
    {
      id: "free",
      name: "Free",
      subtitle: "Perfect for personal use",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        "End-to-end encryption",
        "Up to 5 contacts",
        "Basic messaging",
        "7-day message history",
        "Web access only",
        "Community support",
      ],
      limitations: [
        "No file sharing",
        "No group chats",
        "Limited customization",
      ],
      icon: MessageCircle,
      gradient: "from-gray-600 to-gray-800",
      borderColor: "border-gray-700",
      buttonStyle: "bg-gray-700 hover:bg-gray-600 text-white",
    },
    {
      id: "pro",
      name: "Pro",
      subtitle: "For professionals & teams",
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      popular: true,
      features: [
        "Everything in Free",
        "Unlimited contacts",
        "Group chats (up to 50)",
        "File sharing (100MB)",
        "30-day message history",
        "All platforms access",
        "Priority support",
        "Advanced encryption",
        "Custom themes",
        "Message scheduling",
      ],
      limitations: [],
      icon: Zap,
      gradient: "from-purple-600 to-blue-600",
      borderColor: "border-purple-500",
      buttonStyle:
        "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/25 text-white",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      subtitle: "For large organizations",
      monthlyPrice: 29.99,
      annualPrice: 24.99,
      popular: false,
      features: [
        "Everything in Pro",
        "Unlimited group size",
        "Unlimited file sharing",
        "1-year message history",
        "Advanced admin controls",
        "SSO integration",
        "Dedicated support",
        "Custom branding",
        "Audit logs",
        "API access",
        "On-premise deployment",
        "24/7 phone support",
      ],
      limitations: [],
      icon: Crown,
      gradient: "from-yellow-500 to-orange-600",
      borderColor: "border-yellow-500",
      buttonStyle:
        "bg-gradient-to-r from-yellow-500 to-orange-600 hover:shadow-lg hover:shadow-yellow-500/25 text-black font-semibold",
    },
  ];

  return (
    <div className="bg-black ">
      {/* Pricing Section */}
      <section
        id="pricing"
        ref={pricingRef}
        className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-5 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              >
                <Star className="w-6 h-6 text-purple-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-200 font-medium">
                Choose Your Plan
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Choose the perfect plan for your secure communication needs. All
              plans include end-to-end encryption and zero data retention.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 bg-gray-800/30 rounded-full p-1 w-fit mx-auto border border-gray-700/50">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !isAnnual
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  isAnnual
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                  20% OFF
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.id}
                  className={`relative transition-all duration-500 delay-${index * 100} ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div
                    className={`relative h-full bg-gradient-to-b from-gray-800/40 to-gray-900/60 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 ${
                      isPopular
                        ? "border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105"
                        : "border-gray-700/50 hover:border-gray-600/50 hover:shadow-xl hover:shadow-purple-500/10"
                    } ${hoveredPlan === plan.id ? "transform scale-105" : ""}`}
                  >
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 mb-6">{plan.subtitle}</p>

                      <div className="mb-6">
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-white">
                            ${price}
                          </span>
                          {price > 0 && (
                            <span className="text-gray-400 ml-2">
                              /{isAnnual ? "month" : "month"}
                            </span>
                          )}
                        </div>
                        {isAnnual && price > 0 && (
                          <p className="text-sm text-green-400 mt-1">
                            Save $
                            {(
                              (plan.monthlyPrice - plan.annualPrice) *
                              12
                            ).toFixed(0)}
                            /year
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-center">
                          <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${plan.buttonStyle}`}
                    >
                      {plan.name === "Free"
                        ? "Get Started"
                        : "Start Free Trial"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need a custom solution?
              </h3>
              <p className="text-gray-300 mb-6">
                Contact our sales team for enterprise pricing and custom
                features tailored to your organization's needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  Contact Sales
                </button>
                <button className="px-8 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-semibold border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-10px) rotate(120deg);
            }
            66% {
              transform: translateY(5px) rotate(240deg);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </section>
    </div>
  );
};

export default PricingSection;
