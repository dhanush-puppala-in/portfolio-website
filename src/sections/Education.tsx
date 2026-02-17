import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    id: 1,
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering',
    duration: 'Aug 2023 - Present',
    grade: 'CGPA: 8.05',
    icon: GraduationCap,
    color: '#00F0FF',
    highlights: [
      'Core CS subjects: Data Structures, Algorithms, DBMS',
      'Programming in Java, Python, C++',
      'Web Development and Software Engineering',
    ],
  },
  {
    id: 2,
    institution: 'Sri Saradha College',
    location: 'Maruthi Nagar, Vijayawada',
    degree: 'Intermediate',
    field: 'Science Stream',
    duration: 'Apr 2021 - Mar 2023',
    grade: 'Percentage: 83%',
    icon: BookOpen,
    color: '#7000FF',
    highlights: [
      'Physics, Chemistry, Mathematics',
      'Strong foundation in analytical thinking',
      'Active participation in science exhibitions',
    ],
  },
  {
    id: 3,
    institution: 'N.St.Mathews Public School',
    location: 'Patamata, Vijayawada',
    degree: 'Matriculation',
    field: 'General Education',
    duration: 'Apr 2011 - Mar 2020',
    grade: 'Percentage: 79%',
    icon: Award,
    color: '#00FF88',
    highlights: [
      'Strong academic foundation',
      'Participation in extracurricular activities',
      'Developed interest in technology and computing',
    ],
  },
];

const Education = () => {
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

      // Education cards animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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
      id="education"
      ref={sectionRef}
      className="relative min-h-screen py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#00FF88]/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title text-gradient-green">
            EDUCATION
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            My academic journey from school to university, building a strong
            foundation in computer science and technology.
          </p>
        </div>

        {/* Education Cards */}
        <div ref={cardsRef} className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="glass rounded-2xl p-6 md:p-8 card-hover group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${edu.color}20` }}
                >
                  <edu.icon className="w-8 h-8" style={{ color: edu.color }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                        {edu.institution}
                      </h3>
                      <p className="text-gray-400 flex items-center gap-2 mt-1">
                        <MapPin size={14} />
                        {edu.location}
                      </p>
                    </div>
                    <span
                      className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: `${edu.color}20`,
                        color: edu.color,
                      }}
                    >
                      {edu.grade}
                    </span>
                  </div>

                  <p className="text-lg text-white font-medium">
                    {edu.degree} - {edu.field}
                  </p>
                  <p className="text-gray-500 flex items-center gap-2 mt-1">
                    <Calendar size={14} />
                    {edu.duration}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {edu.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-400"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
