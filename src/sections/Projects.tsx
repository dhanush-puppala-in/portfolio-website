import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Cpu, BookOpen, Shield, Stethoscope } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Realtime Memory Allocation Tracker',
    description:
      'A sophisticated system monitoring tool that tracks real-time memory allocation across processes. Features intuitive dashboards with live charts, memory usage analytics, and alert systems for optimal system performance.',
    image: '/project-memory.jpg',
    tech: ['Python', 'System APIs', 'Data Visualization', 'Real-time Monitoring'],
    icon: Cpu,
    color: '#00F0FF',
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'Library Management System',
    description:
      'A comprehensive Java Swing application for managing library operations. Features include book cataloging, borrower management, due date tracking, and automated notifications for a seamless library experience.',
    image: '/project-library.jpg',
    tech: ['Java', 'Swing', 'MySQL', 'JDBC'],
    icon: BookOpen,
    color: '#7000FF',
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'Realtime Fraud Detection',
    description:
      'An AI-powered fraud detection system that analyzes transaction patterns in real-time. Utilizes machine learning algorithms to identify suspicious activities and prevent financial fraud before it occurs.',
    image: '/project-fraud.jpg',
    tech: ['Machine Learning', 'Python', 'TensorFlow', 'Data Analytics'],
    icon: Shield,
    color: '#FF3366',
    github: '#',
    demo: '#',
  },
  {
    id: 4,
    title: 'Medical Checking Bot',
    description:
      'An intelligent healthcare chatbot that assists users with symptom checking and medical guidance. Features natural language processing for understanding patient queries and providing relevant health information.',
    image: '/project-medical.jpg',
    tech: ['AI/ML', 'NLP', 'Python', 'Healthcare APIs'],
    icon: Stethoscope,
    color: '#00FF88',
    github: '#',
    demo: '#',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

      // Grid cards stagger animation
      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
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
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="section-title text-gradient"
          >
            PROJECTS
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical projects spanning system monitoring,
            application development, AI/ML, and healthcare technology.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`
                  relative overflow-hidden rounded-2xl glass
                  transition-all duration-500
                  ${hoveredProject === project.id ? 'scale-[1.02]' : 'scale-100'}
                `}
                style={{
                  boxShadow:
                    hoveredProject === project.id
                      ? `0 0 40px ${project.color}30, 0 20px 60px rgba(0,0,0,0.5)`
                      : 'none',
                }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F16] via-[#0F0F16]/50 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div
                    className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <project.icon className="w-6 h-6" style={{ color: project.color }} />
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center gap-4
                      transition-all duration-300
                      ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}
                    `}
                  >
                    <a
                      href={project.github}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.demo}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full border border-gray-700 text-gray-400 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Border Glow Effect */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl pointer-events-none
                    transition-opacity duration-300
                    ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{
                    boxShadow: `inset 0 0 0 1px ${project.color}50`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/dhanush-puppala-in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#00F0FF] text-[#00F0FF] rounded-lg hover:bg-[#00F0FF]/10 transition-all group"
          >
            <Github className="w-5 h-5" />
            View All Projects
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
