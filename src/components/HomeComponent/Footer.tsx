"use client";

import {
  AnimatePresence,
  easeInOut,
  easeOut,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  ChevronUp,
  Code,
  ExternalLink,
  Globe,
  Heart,
  Lock,
  MessageCircle,
  Monitor,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandTwitter,
} from "react-icons/tb";
// Using native HTML elements instead of shadcn for compatibility

// Type definitions
interface FooterLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  color: string;
  bgGradient: string;
  count: string;
}

interface AppDownload {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  users: string;
  gradient: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const floatingVariants = {
  float: {
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

const sparkleVariants = {
  sparkle: {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  const typingTexts = useMemo(
    () => [
      "End-to-end encryption",
      "Zero data retention",
      "Complete privacy",
      "Secure messaging",
    ],
    []
  );

  // Optimized typing animation with useCallback
  const typeText = useCallback(() => {
    const currentText = typingTexts[currentTextIndex];

    if (typedText.length < currentText.length) {
      setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
    } else {
      setTimeout(() => {
        setTypedText("");
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
      }, 2000);
    }
  }, [typedText, currentTextIndex, typingTexts]);

  useEffect(() => {
    typeText();
  }, [typeText]);

  // Scroll handling with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const footerLinks = {
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

  const socialLinks: SocialLink[] = [
    {
      icon: TbBrandTwitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
      bgGradient: "from-blue-500 to-blue-600",
      count: "12.5K",
    },
    {
      icon: TbBrandGithub,
      href: "#",
      label: "GitHub",
      color: "hover:text-gray-300",
      bgGradient: "from-gray-600 to-gray-700",
      count: "8.2K",
    },
    {
      icon: TbBrandLinkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-500",
      bgGradient: "from-blue-600 to-blue-700",
      count: "5.8K",
    },
    {
      icon: TbBrandInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-400",
      bgGradient: "from-pink-500 to-purple-600",
      count: "15.3K",
    },
  ];

  const appDownloads: AppDownload[] = [
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
  ];

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNewsletterSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (email) {
        console.log("Newsletter signup:", email);
        setEmail("");
      }
    },
    [email]
  );

  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }, (_, i) => {
        const icons = [Star, Sparkles, MessageCircle, Lock];
        const IconComponent = icons[i % 4];

        return (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="float"
            transition={{
              delay: Math.random() * 5,
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
            }}
          >
            <IconComponent className="w-3 h-3 text-purple-400" />
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className=" bg-gradient-to-b  mb-16  from-black via-gray-900 to-black relative overflow-hidden mx-auto py-10 max-w-7xl px-4 sm:px-6 lg:px-8 rounded-3xl  shadow-2xl  border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500 ">
      <div className="bg-black mx-auto ">
        <motion.footer
          ref={footerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 relative overflow-hidden rounded-3xl"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <FloatingParticles />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Main Footer Content */}
            <div className="py-16">
              <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
                {/* Brand Section */}
                <motion.div className="lg:col-span-2" variants={itemVariants}>
                  <motion.div
                    className="flex items-center mb-6 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl"
                      whileHover={{
                        rotate: 6,
                        scale: 1.1,
                        boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div variants={sparkleVariants} animate="sparkle">
                        <Shield className="w-7 h-7 text-white" />
                      </motion.div>
                    </motion.div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                      SecureChat
                    </span>
                  </motion.div>

                  <div className="mb-8">
                    <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
                      The world&apos;s most secure messaging platform with{" "}
                      <span className="text-purple-400 font-medium">
                        {typedText}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="ml-1"
                        >
                          |
                        </motion.span>
                      </span>
                    </p>

                    {/* Animated Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { value: "1M+", label: "Users", color: "purple" },
                        { value: "99.9%", label: "Uptime", color: "blue" },
                        {
                          value: "256-bit",
                          label: "Encryption",
                          color: "green",
                        },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          className={`text-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-${stat.color}-500/30 transition-all duration-300`}
                          whileHover={{
                            scale: 1.05,
                            borderColor: `rgb(147 51 234 / 0.3)`,
                          }}
                          variants={itemVariants}
                        >
                          <motion.div
                            className="text-2xl font-bold text-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2, type: "spring" }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="text-xs text-gray-400">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <motion.div variants={sparkleVariants} animate="sparkle">
                        <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                      </motion.div>
                      Stay Updated
                    </h4>
                    <div className="relative group">
                      <div className="flex relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="flex-1 px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-l-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-800/70 transition-all duration-300"
                          required
                        />
                        <button
                          type="button"
                          onClick={handleNewsletterSubmit}
                          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-r-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;

                      return (
                        <motion.div key={index} className="relative group">
                          <motion.a
                            href={social.href}
                            aria-label={social.label}
                            className={`relative w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-500 overflow-hidden group`}
                            whileHover={{
                              scale: 1.25,
                              rotate: 12,
                              backgroundColor: "rgb(147 51 234 / 0.2)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            onHoverStart={() => setHoveredSocial(index)}
                            onHoverEnd={() => setHoveredSocial(null)}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <IconComponent className="w-6 h-6 relative z-10" />
                            </motion.div>

                            <AnimatePresence>
                              {hoveredSocial === index && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: -48 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-gray-700 shadow-xl z-20"
                                >
                                  <div className="text-center">
                                    <div className="font-semibold">
                                      {social.count}
                                    </div>
                                    <div className="text-gray-400">
                                      {social.label}
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.a>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Links Sections */}
                {Object.entries(footerLinks).map(
                  ([category, links], categoryIndex) => (
                    <motion.div
                      key={category}
                      variants={itemVariants}
                      custom={categoryIndex}
                    >
                      <h4 className="text-white font-semibold mb-6 capitalize text-lg relative">
                        {category === "legal" ? "Legal" : category}
                        <motion.div
                          className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: 32 }}
                          transition={{
                            delay: categoryIndex * 0.2,
                            duration: 0.6,
                          }}
                        />
                      </h4>
                      <ul className="space-y-4">
                        {links.map((link, index) => {
                          const IconComponent = (link as FooterLink).icon;
                          return (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: categoryIndex * 0.1 + index * 0.05,
                              }}
                            >
                              <motion.a
                                href={link.href}
                                className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"
                                whileHover={{ x: 8 }}
                              >
                                {IconComponent ? (
                                  <IconComponent className="w-4 h-4 mr-3 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:text-purple-400" />
                                ) : null}
                                <span className="relative">
                                  {link.name}
                                  <motion.span
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </span>
                                <motion.div
                                  initial={{ opacity: 0, x: -5 }}
                                  whileHover={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ExternalLink className="w-3 h-3 ml-2" />
                                </motion.div>
                              </motion.a>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Download Section */}
            <motion.div
              className="py-12 border-t border-gray-800"
              variants={itemVariants}
            >
              <div className="text-center mb-8">
                <motion.h3
                  className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                  variants={itemVariants}
                >
                  Download SecureChat
                </motion.h3>
                <motion.p
                  className="text-gray-400 mb-8"
                  variants={itemVariants}
                >
                  Experience secure messaging on all your devices
                </motion.p>

                <div className="flex flex-wrap justify-center gap-6">
                  {appDownloads.map((app, index) => {
                    const IconComponent = app.icon;
                    return (
                      <motion.button
                        key={index}
                        className="group relative flex flex-col items-center px-8 py-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-gray-600/50 transition-all duration-500 overflow-hidden min-w-[160px]"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        variants={itemVariants}
                        custom={index}
                      >
                        <motion.div
                          className={`w-16 h-16 mb-4 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                          whileHover={{
                            scale: 1.1,
                            rotate: 6,
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>

                        <div className="relative z-10 text-center">
                          <div className="text-white font-semibold mb-1">
                            {app.label}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {app.users} downloads
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              className="py-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
              variants={itemVariants}
            >
              <div className="flex items-center text-gray-400 mb-4 md:mb-0 group">
                <span>© 2025 SecureChat. Made with</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-4 h-4 mx-2 text-red-500" />
                </motion.div>
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
                  <motion.div
                    key={index}
                    className={`flex items-center text-gray-400 ${item.color} transition-all duration-300 cursor-default group`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="mr-2 text-base"
                      whileHover={{
                        y: [0, -5, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {item.emoji}
                    </motion.span>
                    <span className="relative">
                      {item.text}
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-current"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll to Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 12,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-2xl z-50 flex items-center justify-center group overflow-hidden"
                aria-label="Scroll to top"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ChevronUp className="w-7 h-7 relative z-10" />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.footer>
      </div>
    </div>
  );
};

export default FooterSection;
