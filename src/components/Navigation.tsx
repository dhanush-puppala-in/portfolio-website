import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Home, User, Code2, Briefcase, FolderGit2, GraduationCap, Award, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'Certifications', href: '#certifications', icon: Award },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Track active section
    const sections = navLinks.map(link => link.href.replace('#', ''));
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(sectionId),
          onEnterBack: () => setActiveSection(sectionId),
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 glass border-b border-[#00F0FF]/20'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00F0FF] glow-cyan">
              <img 
                src="/portfolio.jpg" 
                alt="Dhanush Puppala" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold font-['Space_Grotesk'] text-white group-hover:text-[#00F0FF] transition-colors">
              DP<span className="text-[#00F0FF]">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-[#0F0F16]/80 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'text-[#05050A] bg-[#00F0FF] font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <link.icon size={14} />
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#00F0FF] text-[#05050A] font-semibold rounded-full hover:bg-[#00F0FF]/90 transition-all hover:scale-105 glow-cyan"
          >
            <Mail size={16} />
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 rounded-full bg-[#0F0F16]/80 border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className="absolute inset-0 bg-[#05050A]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-4 p-8">
          {/* Profile in mobile menu */}
          <div className="mb-8 text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#00F0FF] glow-cyan mx-auto mb-4">
              <img 
                src="/portfolio.jpg" 
                alt="Dhanush Puppala" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-white">Dhanush Puppala</h3>
            <p className="text-gray-400 text-sm">Computer Science Engineer</p>
          </div>

          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`text-xl flex items-center gap-3 px-6 py-3 rounded-full transition-all ${
                  isActive
                    ? 'text-[#05050A] bg-[#00F0FF] font-medium'
                    : 'text-white hover:text-[#00F0FF]'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <link.icon size={20} />
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;
