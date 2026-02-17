import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Phone, Send, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Email glow pulse animation
      gsap.to(emailRef.current, {
        textShadow: '0 0 30px #00F0FF, 0 0 60px #00F0FF, 0 0 90px #00F0FF',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'dhanushpuppala01@gmail.com',
      href: 'mailto:dhanushpuppala01@gmail.com',
      color: '#00F0FF',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-9440647165',
      href: 'tel:+919440647165',
      color: '#00FF88',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/dhanush-puppala-in',
      href: 'https://github.com/dhanush-puppala-in',
      color: '#7000FF',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/dhanush-puppala-6318a',
      href: 'https://linkedin.com/in/dhanush-puppala-6318a',
      color: '#0077B5',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-24 flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F0FF]/10 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="section-title text-gradient"
          >
            LET&apos;S BUILD
            <br />
            THE FUTURE
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            Reach out and let&apos;s create something amazing together.
          </p>
        </div>

        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* Main Email CTA */}
          <div className="text-center mb-16">
            <p className="text-gray-400 mb-4">Drop me an email at</p>
            <a
              ref={emailRef}
              href="mailto:dhanushpuppala01@gmail.com"
              className="inline-flex items-center gap-3 text-2xl md:text-4xl font-bold text-[#00F0FF] hover:scale-105 transition-transform"
              style={{ textShadow: '0 0 20px #00F0FF' }}
            >
              <Mail className="w-8 h-8 md:w-10 md:h-10" />
              dhanushpuppala01@gmail.com
            </a>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-xl p-6 card-hover group flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${link.color}20` }}
                >
                  <link.icon className="w-6 h-6" style={{ color: link.color }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{link.label}</p>
                  <p className="text-white font-medium group-hover:text-[#00F0FF] transition-colors">
                    {link.value}
                  </p>
                </div>
                <Send
                  className="w-5 h-5 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                />
              </a>
            ))}
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-gray-500">
              <MapPin size={18} className="text-[#00F0FF]" />
              <span>Vijayawada, Andhra Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-bold font-['Space_Grotesk'] text-white">
              DP<span className="text-[#00F0FF]">.</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Dhanush Puppala. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/dhanush-puppala-in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#00F0FF] transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/dhanush-puppala-6318a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#00F0FF] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:dhanushpuppala01@gmail.com"
                className="text-gray-500 hover:text-[#00F0FF] transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
