import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, Users, TrendingUp, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: 'HR Position',
    company: 'Anicos Club',
    location: 'Remote',
    duration: 'Present',
    description:
      'Leading HR initiatives at Anicos Club, a creative community focused on building innovation and fostering creativity among members. Responsible for talent acquisition, team building, and organizing creative events.',
    highlights: [
      'Building creativity through innovative team activities',
      'Talent acquisition and member onboarding',
      'Event planning and community engagement',
    ],
    icon: Users,
    color: '#00FF88',
  },
  {
    id: 2,
    role: 'Data Analyst',
    company: 'MacBease',
    location: 'Remote',
    duration: 'Dec 2025 - Present',
    description:
      'Working with real-world datasets and analytics tools to extract meaningful insights and support data-driven decision-making. Gaining hands-on experience in data cleaning, visualization, and reporting.',
    highlights: [
      'Data cleaning and preprocessing',
      'Visualization and dashboard creation',
      'Statistical analysis and reporting',
    ],
    tech: ['Excel', 'SQL', 'Python', 'Tableau', 'Power BI', 'Pandas', 'NumPy'],
    icon: TrendingUp,
    color: '#00F0FF',
  },
  {
    id: 3,
    role: 'Data Analyst & Trainer',
    company: 'Care&Share',
    location: 'Remote',
    duration: 'Apr 2024 - Aug 2024',
    description:
      'Worked on collecting, cleaning, and analyzing structured datasets to extract actionable insights using statistical techniques and exploratory data analysis. Trained models on data and measured accuracy.',
    highlights: [
      'Exploratory data analysis',
      'Machine learning model training',
      'Data visualization and reporting',
    ],
    tech: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'SQL'],
    icon: Award,
    color: '#7000FF',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: -50, opacity: 0 },
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

      // Timeline cards animation
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Timeline line animation
      gsap.fromTo(
        '.timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7000FF]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <h2
            ref={titleRef}
            className="section-title text-gradient"
          >
            EXPERIENCE
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl">
            My professional journey includes internships in data analysis and a creative HR role
            that builds innovation and teamwork.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 md:-translate-x-1/2">
            <div className="timeline-progress absolute inset-0 timeline-line origin-top" />
          </div>

          {/* Experience Cards */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`experience-card relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-start md:items-center gap-8`}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-[#05050A] md:-translate-x-1/2 z-10"
                  style={{ backgroundColor: exp.color }}
                />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass rounded-2xl p-6 card-hover group">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${exp.color}20` }}
                      >
                        <exp.icon className="w-6 h-6" style={{ color: exp.color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-gray-400">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                        <Briefcase size={14} className="text-[#00F0FF]" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-500 flex items-start gap-2"
                          >
                            <span className="text-[#00F0FF] mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    {exp.tech && (
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
