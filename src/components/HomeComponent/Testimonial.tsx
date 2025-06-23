import {
  Award,
  ChevronLeft,
  ChevronRight,
  Heart,
  Play,
  Quote,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Privacy Advocate",
      avatar: "SC",
      rating: 5,
      text: "This platform has revolutionized how I communicate. The complete anonymity gives me the freedom to express myself without fear of judgment or tracking.",
      highlight: "Complete anonymity",
      category: "Privacy",
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-500/10 to-indigo-500/10",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Cybersecurity Expert",
      avatar: "MR",
      rating: 5,
      text: "As a security professional, I'm impressed by the military-grade encryption. The technical implementation is flawless and the user experience is seamless.",
      highlight: "Military-grade encryption",
      category: "Security",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-500/10 to-teal-500/10",
    },
    {
      id: 3,
      name: "Elena Petrov",
      role: "Journalist",
      avatar: "EP",
      rating: 5,
      text: "Essential tool for my work. The self-destructing messages ensure sensitive communications remain private. Lightning-fast delivery is a bonus!",
      highlight: "Self-destructing messages",
      category: "Professional",
      color: "from-rose-500 to-pink-600",
      bgColor: "from-rose-500/10 to-pink-500/10",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Tech Entrepreneur",
      avatar: "DK",
      rating: 5,
      text: "The global accessibility is outstanding. I can communicate with my international team without worrying about regional restrictions or data sovereignty.",
      highlight: "Global accessibility",
      category: "Business",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-500/10 to-cyan-500/10",
    },
    {
      id: 5,
      name: "Amara Johnson",
      role: "Human Rights Activist",
      avatar: "AJ",
      rating: 5,
      text: "This platform protects vulnerable voices. The zero-data retention policy and untraceable messaging are crucial for activists in restrictive environments.",
      highlight: "Zero-data retention",
      category: "Activism",
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-500/10 to-orange-500/10",
    },
    {
      id: 6,
      name: "Thomas Weber",
      role: "Medical Professional",
      avatar: "TW",
      rating: 5,
      text: "HIPAA compliance concerns made me switch to this platform. The medical-grade privacy protection ensures patient confidentiality is never compromised.",
      highlight: "Medical-grade privacy",
      category: "Healthcare",
      color: "from-teal-500 to-green-600",
      bgColor: "from-teal-500/10 to-green-500/10",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Users", icon: Users },
    { number: "4.9/5", label: "Average Rating", icon: Star },
    { number: "99%", label: "Satisfaction Rate", icon: Heart },
    { number: "24/7", label: "Support Available", icon: Shield },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger card animations
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 200);
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
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % testimonials.length;
      visible.push({ ...testimonials[index], slideIndex: i });
    }
    return visible;
  };

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ">
      <section
        ref={sectionRef}
        className="py-10 bg-gradient-to-b rounded-3xl shadow-2xl mx-auto border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500  from-black via-gray-900 to-black relative overflow-hidden "
      >
        {/* Background Elements */}
        <div className="absolute inset-0 ">
          <div className="absolute  top-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating Elements */}
          <div
            className="absolute top-20 left-10 opacity-20 animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <Quote className="w-12 h-12 text-purple-400" />
          </div>
          <div
            className="absolute bottom-20 right-10 opacity-20 animate-bounce"
            style={{ animationDelay: "2s" }}
          >
            <Star className="w-10 h-10 text-yellow-400" />
          </div>
        </div>

        <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 mb-6">
              <Award className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-200 font-medium">
                Trusted by Thousands
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              What Our Users Say
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied users who trust our platform for
              secure, anonymous communication. Here&apos;s what they have to say
              about their experience.
            </p>
          </div>

          {/* Stats Bar */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="inline-flex p-3 bg-white/5 rounded-2xl border border-white/10 mb-3 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Testimonials Carousel */}
          <div
            className={`relative mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center justify-center space-x-8">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-full transition-all duration-300 hover:scale-110"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Testimonials Container */}
              <div className="flex-1 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getVisibleTestimonials().map((testimonial, index) => {
                    const isCenter = index === 1;
                    return (
                      <div
                        key={`${testimonial.id}-${currentSlide}`}
                        className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-700 hover:bg-white/8 hover:border-white/20 ${
                          isCenter
                            ? "scale-105 bg-white/8 border-purple-500/30 transform hover:scale-110"
                            : "hover:scale-105"
                        }`}
                        style={{
                          background: isCenter
                            ? `linear-gradient(135deg, ${testimonial.bgColor.split(" ")[1]}, ${testimonial.bgColor.split(" ")[3]})`
                            : undefined,
                        }}
                      >
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-4 opacity-20">
                          <Quote className="w-8 h-8 text-white" />
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="text-xs px-2 py-1 bg-black/30 text-gray-300 rounded-full">
                            {testimonial.category}
                          </span>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center mb-4 mt-8">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
                          &quot;{testimonial.text}&quot;
                        </p>

                        {/* Highlight Badge */}
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 bg-gradient-to-r ${testimonial.color} text-white`}
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          {testimonial.highlight}
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform`}
                          >
                            {testimonial.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="text-xs px-2 py-1 bg-black/30 text-gray-300 rounded-full">
                            {testimonial.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-full transition-all duration-300 hover:scale-110"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-purple-500 scale-125"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Auto-play Control */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-300"
              >
                {isAutoPlaying ? (
                  <>
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    Auto-playing
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Paused
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className={`text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-gray-400 mb-6">
              Ready to join our satisfied community?
            </p>
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <TrendingUp className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsSection;
