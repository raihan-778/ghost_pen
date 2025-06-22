import {
  AlertCircle,
  Clock,
  Globe,
  HelpCircle,
  Info,
  Lock,
  MessageCircle,
  Minus,
  Plus,
  Search,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FAQ = {
  id: number;
  category: string;
  question: string;
  answer: string;
  icon: React.ElementType;
  tags: string[];
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const faqData = [
    {
      id: 1,
      category: "security",
      question: "How secure is the end-to-end encryption?",
      answer:
        "We use military-grade AES-256 encryption with Perfect Forward Secrecy. This means each message is encrypted with a unique key that changes constantly. Even if one key is compromised, all other messages remain completely secure. Not even our servers can decrypt your messages.",
      icon: Lock,
      tags: ["encryption", "security", "privacy"],
    },
    {
      id: 2,
      category: "privacy",
      question: "Do you store any of my personal data?",
      answer:
        "Absolutely not. We follow a strict zero-data retention policy. No messages, metadata, IP addresses, or personal information is stored on our servers. Once a message is delivered, it's permanently deleted from our systems.",
      icon: Shield,
      tags: ["privacy", "data", "storage"],
    },
    {
      id: 3,
      category: "features",
      question: "How do self-destructing messages work?",
      answer:
        "You can set custom timers from 5 seconds to 7 days. Once the recipient reads the message and the timer expires, the message is automatically deleted from all devices simultaneously. This includes any screenshots or copies - the message becomes completely inaccessible.",
      icon: Clock,
      tags: ["features", "self-destruct", "timer"],
    },
    {
      id: 4,
      category: "account",
      question: "Can I use the service without providing personal information?",
      answer:
        "Yes! No phone number, email, or personal details required. Simply choose a username and you're ready to start communicating anonymously. We never ask for verification or collect any identifying information.",
      icon: Users,
      tags: ["account", "anonymous", "registration"],
    },
    {
      id: 5,
      category: "technical",
      question: "What happens if my device is lost or stolen?",
      answer:
        "Your messages are protected by device-specific encryption keys. If your device is lost, the thief cannot access your messages without your authentication. You can also remotely wipe all data by logging in from another device.",
      icon: AlertCircle,
      tags: ["security", "device", "lost"],
    },
    {
      id: 6,
      category: "features",
      question: "Can I communicate with users on different platforms?",
      answer:
        "Yes! Our service works seamlessly across all devices and platforms. Whether you're on mobile, desktop, or web, you can communicate with anyone regardless of their device or operating system.",
      icon: Globe,
      tags: ["cross-platform", "compatibility", "devices"],
    },
    {
      id: 7,
      category: "security",
      question: "Are group chats as secure as individual conversations?",
      answer:
        "Absolutely. Group chats use the same end-to-end encryption with individual keys for each member. Messages are encrypted separately for each recipient, ensuring maximum security even in group settings.",
      icon: MessageCircle,
      tags: ["group chat", "encryption", "security"],
    },
    {
      id: 8,
      category: "technical",
      question: "How fast is message delivery?",
      answer:
        "Messages are typically delivered in under 100 milliseconds globally. Our distributed network ensures lightning-fast delivery while maintaining the highest security standards.",
      icon: Zap,
      tags: ["speed", "delivery", "performance"],
    },
    {
      id: 9,
      category: "privacy",
      question: "Can governments or authorities access my messages?",
      answer:
        "No. Due to our zero-knowledge architecture and end-to-end encryption, we cannot access your messages even if legally compelled. We don't store data that could be surrendered to any authority.",
      icon: Shield,
      tags: ["government", "legal", "privacy"],
    },
    {
      id: 10,
      category: "account",
      question: "How do I recover my account if I forget my credentials?",
      answer:
        "Since we don't store personal information, traditional account recovery isn't possible. However, you can use our secure backup phrase system to restore access. We recommend storing this phrase securely when you create your account.",
      icon: Info,
      tags: ["recovery", "backup", "credentials"],
    },
  ];

  const categories = [
    {
      id: "all",
      name: "All Questions",
      icon: HelpCircle,
      count: faqData.length,
    },
    {
      id: "security",
      name: "Security",
      icon: Lock,
      count: faqData.filter((faq) => faq.category === "security").length,
    },
    {
      id: "privacy",
      name: "Privacy",
      icon: Shield,
      count: faqData.filter((faq) => faq.category === "privacy").length,
    },
    {
      id: "features",
      name: "Features",
      icon: Star,
      count: faqData.filter((faq) => faq.category === "features").length,
    },
    {
      id: "account",
      name: "Account",
      icon: Users,
      count: faqData.filter((faq) => faq.category === "account").length,
    },
    {
      id: "technical",
      name: "Technical",
      icon: Zap,
      count: faqData.filter((faq) => faq.category === "technical").length,
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredFAQs(filtered);
  }, [selectedCategory, searchTerm]);

  interface ToggleFAQHandler {
    (index: number): void;
  }

  const toggleFAQ: ToggleFAQHandler = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden max-w-7xl rounded-3xl shadow-2xl mx-auto border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Question Marks */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-5 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <HelpCircle className="w-8 h-8 text-purple-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 mb-6">
            <HelpCircle className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm text-purple-200 font-medium">
              Get Your Answers
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our secure messaging platform.
            Can&apos;t find what you&apos;re looking for? Contact our support
            team.
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions, answers, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "bg-gray-800/30 text-gray-300 border-gray-700/30 hover:bg-gray-700/40 hover:border-gray-600/50"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-600/40 text-xs">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div
          className={`space-y-4 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No questions found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search terms or selecting a different
                category.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const IconComponent = faq.icon;
              const isActive = activeIndex === index;

              return (
                <div
                  key={faq.id}
                  className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-600/50 hover:shadow-lg hover:shadow-purple-500/5"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  >
                    <div className="flex items-center flex-1">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                          <IconComponent className="w-5 h-5 text-purple-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {faq.question}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-700/40 text-gray-300 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 flex items-center justify-center transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                      >
                        {isActive ? (
                          <Minus className="w-4 h-4 text-purple-400" />
                        ) : (
                          <Plus className="w-4 h-4 text-purple-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-700/20 pt-6">
                        <p className="text-gray-300 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any questions
              or concerns. Get in touch and we&apos;ll respond within minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                Contact Support
              </button>
              <button className="px-8 py-3 bg-gray-800/50 text-gray-300 rounded-xl font-semibold border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
