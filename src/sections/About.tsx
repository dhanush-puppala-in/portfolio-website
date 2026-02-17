import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Brain, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Code2, label: 'Projects', value: '10+' },
  { icon: Database, label: 'Data Analysis', value: '2+' },
  { icon: Brain, label: 'ML Models', value: '5+' },
  { icon: Globe, label: 'Technologies', value: '25+' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
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

      // Text animation
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 flex items-center"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#7000FF]/10 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Title */}
          <div>
            <h2
              ref={titleRef}
              className="section-title text-gradient"
            >
              ABOUT
              <br />
              ME
            </h2>
            
            {/* Decorative line */}
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#00F0FF] to-[#7000FF]" />
          </div>

          {/* Right Column - Content */}
          <div ref={textRef} className="space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed">
              I&apos;m <span className="text-[#00F0FF] font-semibold">Dhanush Puppala</span>,
              a Computer Science student at Lovely Professional University with a passion
              for building robust applications and extracting insights from data.
            </p>
            
            <p className="text-lg text-gray-400 leading-relaxed">
              My expertise lies at the intersection of software engineering and data science.
              I specialize in developing java full-stack applications, creating data visualization
              dashboards, and implementing machine learning solutions for real-world problems.
            </p>
            
            <p className="text-lg text-gray-400 leading-relaxed">
              With hands-on experience in data analysis, I&apos;ve worked with real-world datasets
              to extract meaningful insights and support data-driven decision-making. I&apos;m
              constantly learning and exploring new technologies to expand my skill set.
            </p>

            {/* Key highlights */}
            <div className="pt-4 flex flex-wrap gap-3">
              {['Problem Solver', 'Team Player', 'Quick Learner', 'Detail Oriented'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm text-[#00F0FF] border border-[#00F0FF]/30 rounded-full bg-[#00F0FF]/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center card-hover group"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#00F0FF] group-hover:scale-110 transition-transform" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
