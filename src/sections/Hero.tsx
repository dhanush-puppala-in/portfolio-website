import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import TechOrbit from '../components/TechOrbit';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        imageRef.current,
        { scale: 0, opacity: 0, rotateY: 180 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1, ease: 'back.out(1.7)' }
      )
        .fromTo(
          nameRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          socialsRef.current?.children || [],
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          scrollHintRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        );

      // Scroll-triggered fade out
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(nameRef.current, {
            opacity: 1 - progress * 1.5,
            y: -progress * 100,
            duration: 0.1,
          });
          gsap.to(subtitleRef.current, {
            opacity: 1 - progress * 1.5,
            duration: 0.1,
          });
          gsap.to(imageRef.current, {
            opacity: 1 - progress * 1.5,
            scale: 1 - progress * 0.3,
            duration: 0.1,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05050A]/50 to-[#05050A]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7000FF]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* 3D Tech Orbit */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <TechOrbit />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Profile Image - Mobile */}
            <div 
              ref={imageRef}
              className="lg:hidden w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#00F0FF] glow-cyan"
            >
              <img 
                src="/portfolio.jpg" 
                alt="Dhanush Puppala" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Greeting */}
            <p className="text-[#00F0FF] font-medium mb-4 tracking-wider uppercase text-sm">
              Welcome to my portfolio
            </p>

            {/* Main Name */}
            <h1
              ref={nameRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-['Space_Grotesk'] tracking-tighter"
            >
              <span className="text-white">DHANUSH</span>
              <br />
              <span className="text-stroke">PUPPALA</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0"
            >
              Computer Science Engineer | Data Analyst | JAVA Full-Stack Developer
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="px-8 py-3 bg-[#00F0FF] text-[#05050A] font-semibold rounded-full hover:bg-[#00F0FF]/90 transition-all hover:scale-105 glow-cyan flex items-center gap-2"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-[#00F0FF] text-[#00F0FF] font-semibold rounded-full hover:bg-[#00F0FF]/10 transition-all flex items-center gap-2"
              >
                <Mail size={18} />
                Get In Touch
              </a>
              <a
                href="#"
                className="px-8 py-3 border border-gray-700 text-gray-300 font-semibold rounded-full hover:border-[#00FF88] hover:text-[#00FF88] transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Resume
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image Desktop */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="relative">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#00FF88] blur-xl opacity-50 animate-pulse" />
              
              {/* Profile image container */}
              <div 
                ref={imageRef}
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-[#00F0FF]/50 glow-cyan"
              >
                <img 
                  src="/portfolio.jpg" 
                  alt="Dhanush Puppala" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/50 to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 glass rounded-full text-sm text-[#00F0FF] border border-[#00F0FF]/30 animate-bounce">
                Available for work
              </div>
              
              <div className="absolute -bottom-2 -left-4 px-4 py-2 glass rounded-full text-sm text-[#00FF88] border border-[#00FF88]/30">
                10+ Projects
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links - Right Side */}
      <div
        ref={socialsRef}
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6"
      >
        <a
          href="https://github.com/dhanush-puppala-in"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all hover:scale-110 border border-transparent"
        >
          <Github size={20} />
        </a>
        <a
          href="https://linkedin.com/in/dhanush-puppala-6318a"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all hover:scale-110 border border-transparent"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:dhanushpuppala01@gmail.com"
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all hover:scale-110 border border-transparent"
        >
          <Mail size={20} />
        </a>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="text-[#00F0FF] animate-bounce" size={20} />
      </div>
    </section>
  );
};

export default Hero;
