import {
  ArrowRight,
  Check,
  Menu,
  MessageCircle,
  Play,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const Homepage2 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
  };
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  // Initialize particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
      });
    }
    particlesRef.current = particles;
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.02;
          particle.y -= dy * force * 0.02;
        }

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  // Add mouse move listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Testimonials data
  const testimonials = [
    {
      content:
        "This platform enabled our leadership team to receive genuine, unfiltered insights that completely transformed our company culture.",
      author: "Fortune 500 CEO",
      company: "Technology Sector",
    },
    {
      content:
        "The anonymity feature allowed for honest peer review that significantly improved our research methodology.",
      author: "Research Director",
      company: "Leading University",
    },
    {
      content:
        "Artists finally have a space to give and receive authentic critique without personal bias affecting the creative process.",
      author: "Creative Director",
      company: "Design Studio",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const features = [
    {
      icon: Shield,
      title: "Complete Anonymity",
      description:
        "Advanced encryption ensures absolute privacy for all feedback submissions.",
    },
    {
      icon: MessageCircle,
      title: "Real-time Insights",
      description:
        "Instant delivery and organization of feedback for immediate action.",
    },
    {
      icon: Zap,
      title: "Smart Analytics",
      description: "AI-powered sentiment analysis and trend identification.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 overflow-hidden">
      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePos.x * 0.03}px, ${-mousePos.y * 0.03}px)`,
            transition: "transform 0.1s ease-out",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-72 h-72 bg-teal-500 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePos.x * 0.025}px, ${mousePos.y * 0.025}px)`,
            transition: "transform 0.1s ease-out",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              TrueFeedback
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-white/80 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-white/80 hover:text-white transition-colors"
              >
                Stories
              </a>
              <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-4 pt-4">
                <a
                  href="#features"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Stories
                </a>
                <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-full w-fit">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center backdrop-blur-md bg-white/10 rounded-full px-6 py-3 mb-8 border border-white/20">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
            <span className="text-white text-sm font-medium">
              Live feedback streaming now
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Anonymous
            </span>
            <br />
            <span className="text-white/70 font-light">Feedback</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
              Reimagined
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
            Transform your organization with{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
              revolutionary honest insights.
            </span>
            <br />
            Where authentic voices shape extraordinary futures.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            <button className="group backdrop-blur-md bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20 hover:border-white/40">
              <span className="flex items-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6">
              Built for Modern Teams
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Enterprise-grade security meets{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                intuitive design excellence
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 transform rotate-3 hover:rotate-0 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-6">
              Trusted by Leaders
            </h2>
            <p className="text-xl text-white/70">
              Real stories from organizations that{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                transformed with honest feedback
              </span>
            </p>
          </div>

          <div className="relative">
            <div className="backdrop-blur-md bg-white/5 rounded-2xl p-12 border border-white/10">
              <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-8">
                `{testimonials[currentTestimonial].content}`
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-lg">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-white/60">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "w-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Your Organization?
            </span>
          </h2>

          <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
            Join thousands of teams already using{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
              anonymous feedback
            </span>{" "}
            to drive meaningful change.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center">
                Start Your Journey
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </div>
            </button>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/70">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                TrueFeedback
              </div>
              <p className="text-white/60">
                Empowering authentic communication worldwide
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Support
              </a>
              <div className="text-white/40">© 2025 TrueFeedback</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage2;
