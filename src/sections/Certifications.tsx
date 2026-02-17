import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Calendar, ExternalLink, CheckCircle2, FileSpreadsheet, Coffee, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    name: 'Decoding Data Science with Excel and Tableau',
    issuer: 'CSE Patashala',
    date: 'October 2023',
    description: 'Comprehensive training in data analysis, visualization, and dashboard creation using Excel and Tableau. Learned data cleaning, transformation, and storytelling techniques.',
    skills: ['Excel', 'Tableau', 'Data Visualization', 'Dashboard Design'],
    icon: FileSpreadsheet,
    color: '#00F0FF',
    credential: '#',
  },
  {
    id: 2,
    name: 'Java Maestro: Hands-On Training on Developing GUI Applications',
    issuer: 'Training Program',
    date: 'July 2024',
    description: 'Intensive hands-on training in Java Swing and GUI development. Built interactive desktop applications with event handling, layouts, and modern UI components.',
    skills: ['Java', 'Swing', 'GUI Development', 'Event Handling'],
    icon: Coffee,
    color: '#7000FF',
    credential: '#',
  },
  {
    id: 3,
    name: 'Business Intelligence',
    issuer: 'IBM',
    date: '2024',
    description: 'Professional certification in Business Intelligence from IBM. Covered data warehousing, ETL processes, reporting tools, and business analytics fundamentals.',
    skills: ['BI Tools', 'Data Warehousing', 'ETL', 'Reporting', 'Analytics'],
    icon: BarChart3,
    color: '#00FF88',
    credential: '#',
  },
  {
    id: 4,
    name: 'Cypher Schools Basics: Ethical Hacking and Laws',
    issuer: 'CipherSchools',
    date: 'January 2025',
    description: 'Foundation course in ethical hacking methodologies, cybersecurity principles, and legal frameworks governing information security.',
    skills: ['Ethical Hacking', 'Cybersecurity', 'Security Laws', 'Penetration Testing'],
    icon: CheckCircle2,
    color: '#FF3366',
    credential: '#',
  },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative min-h-screen py-24 flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7000FF]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00F0FF]/30 mb-6">
            <Award className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-sm text-[#00F0FF]">Professional Development</span>
          </div>
          <h2
            ref={titleRef}
            className="section-title text-gradient"
          >
            CERTIFICATIONS
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Industry-recognized certifications that validate my expertise in data science,
            software development, and business intelligence.
          </p>
        </div>

        {/* Certifications Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6"
        >
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group relative glass rounded-2xl p-6 card-hover overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${cert.color}20, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cert.color}20` }}
                  >
                    <cert.icon className="w-7 h-7" style={{ color: cert.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-1">
                      {cert.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="font-medium" style={{ color: cert.color }}>
                        {cert.issuer}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-full border border-gray-700 text-gray-400 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Credential Link */}
                <a
                  href={cert.credential}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: cert.color }}
                >
                  View Credential
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${cert.color}50, 0 0 30px ${cert.color}20`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Certifications', value: '4+' },
            { label: 'Organizations', value: '3' },
            { label: 'Skills Verified', value: '15+' },
            { label: 'Learning Hours', value: '200+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center glass rounded-xl p-6"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#00F0FF] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
