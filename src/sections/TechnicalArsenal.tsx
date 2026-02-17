import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// All skills organized by category
const skillCategories = {
  languages: [
    { name: 'Java', color: '#007396', icon: '☕' },
    { name: 'Python', color: '#3776AB', icon: '🐍' },
    { name: 'Kotlin', color: '#7F52FF', icon: '📱' },
    { name: 'C', color: '#A8B9CC', icon: '🔧' },
    { name: 'C++', color: '#00599C', icon: '⚙️' },
    { name: 'JavaScript', color: '#F7DF1E', icon: '📜' },
    { name: 'TypeScript', color: '#3178C6', icon: '📘' },
    { name: 'PHP', color: '#777BB4', icon: '🐘' },
    { name: 'Ruby', color: '#CC342D', icon: '💎' },
    { name: 'HTML', color: '#E34F26', icon: '🌐' },
    { name: 'CSS', color: '#1572B6', icon: '🎨' },
  ],
  frameworks: [
    { name: 'React', color: '#61DAFB', icon: '⚛️' },
    { name: 'Node.js', color: '#339933', icon: '🟢' },
    { name: 'Angular', color: '#DD0031', icon: '🅰️' },
    { name: 'Swing', color: '#5382A1', icon: '🖥️' },
    { name: 'Tailwind', color: '#06B6D4', icon: '🌊' },
    { name: 'MERN Stack', color: '#47A248', icon: '🥞' },
  ],
  data: [
    { name: 'Pandas', color: '#150458', icon: '🐼' },
    { name: 'NumPy', color: '#013243', icon: '🔢' },
    { name: 'Matplotlib', color: '#11557C', icon: '📊' },
    { name: 'Seaborn', color: '#4C72B0', icon: '🌊' },
    { name: 'Scikit-learn', color: '#F7931E', icon: '🤖' },
    { name: 'SciPy', color: '#8CAAE6', icon: '🔬' },
    { name: 'PyTorch', color: '#EE4C2C', icon: '🔥' },
  ],
  databases: [
    { name: 'MongoDB', color: '#47A248', icon: '🍃' },
    { name: 'SQL', color: '#4479A1', icon: '🗄️' },
    { name: 'MySQL', color: '#4479A1', icon: '🐬' },
  ],
  tools: [
    { name: 'Git', color: '#F05032', icon: '🌿' },
    { name: 'GitHub', color: '#181717', icon: '🐙' },
    { name: 'Power BI', color: '#F2C811', icon: '📈' },
    { name: 'Tableau', color: '#E97627', icon: '📊' },
    { name: 'IBM Cloud', color: '#054ADA', icon: '☁️' },
  ],
};

const allSkills = Object.values(skillCategories).flat();

// Split skills into two groups for inner and outer wheels
const innerWheelSkills = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const outerWheelSkills = allSkills.slice(Math.ceil(allSkills.length / 2));

const TechnicalArsenal = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const innerWheelRef = useRef(null);
  const outerWheelRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

      // Wheel animation
      gsap.fromTo(
        [innerWheelRef.current, outerWheelRef.current],
        { scale: 0.5, opacity: 0, rotateY: -180 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current, // Use sectionRef for trigger
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous slow revolution for inner wheel
      gsap.to(innerWheelRef.current, {
        rotation: 360,
        duration: 40, // Very slow revolution
        ease: 'none',
        repeat: -1,
        overwrite: 'auto',
      });

      // Continuous slow revolution for outer wheel in opposite direction
      gsap.to(outerWheelRef.current, {
        rotation: -360,
        duration: 60, // Slower revolution for the outer wheel
        ease: 'none',
        repeat: -1,
        overwrite: 'auto',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate position for each skill on the wheel - INCREASED RADIUS for more spacing
  const getSkillPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 360;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y, angle };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 flex items-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F0FF]/5 rounded-full blur-[200px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="section-title text-gradient inline-block"
          >
            TECHNICAL
            <br />
            ARSENAL
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A comprehensive collection of technologies I work with, organized by category.
            Hover over the wheel to explore my skills.
          </p>
        </div>

        {/* Skills Wheel Container */}
        <div className="relative flex items-center justify-center min-h-[750px]">
          {/* Central Hub */}
          <div className="absolute z-20 w-44 h-44 rounded-full glass-strong flex items-center justify-center glow-cyan">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{allSkills.length}+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Skills</div>
            </div>
          </div>

          {/* Outer Rotating Wheel */}
          <div
            ref={outerWheelRef}
            className="absolute inset-0 transition-all duration-500"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              setHoveredSkill(null);
            }}
            style={{
                animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-[#00F0FF]/20" />
            <div className="absolute inset-10 rounded-full border border-[#7000FF]/20" />
            <div className="absolute inset-20 rounded-full border border-[#00F0FF]/10" />

            {outerWheelSkills.map((skill, index) => {
              const { x, y } = getSkillPosition(index, outerWheelSkills.length, 320); // Outer wheel radius
              const isHovered = hoveredSkill === skill.name;

              return (
                <div
                  key={skill.name}
                  className="skill-item"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    className={`
                      relative px-5 py-3 rounded-xl cursor-pointer
                      transition-all duration-300
                      ${isHovered ? 'scale-125 z-30' : 'scale-100'}
                    `}
                    style={{
                      backgroundColor: `${skill.color}15`,
                      border: `1px solid ${isHovered ? skill.color : `${skill.color}40`}`,
                      boxShadow: isHovered
                        ? `0 0 30px ${skill.color}50, 0 0 60px ${skill.color}30`
                        : 'none',
                      margin: '8px', // Added margin for extra spacing
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{skill.icon}</span>
                      <span
                        className="text-sm font-medium whitespace-nowrap"
                        style={{ color: skill.color }}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inner Rotating Wheel */}
          <div
            ref={innerWheelRef}
            className="absolute inset-0 transition-all duration-500"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              setHoveredSkill(null);
            }}
            style={{
                animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {innerWheelSkills.map((skill, index) => {
              const { x, y } = getSkillPosition(index, innerWheelSkills.length, 180); // Inner wheel radius
              const isHovered = hoveredSkill === skill.name;

              return (
                <div
                  key={skill.name}
                  className="skill-item"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    className={`
                      relative px-5 py-3 rounded-xl cursor-pointer
                      transition-all duration-300
                      ${isHovered ? 'scale-125 z-30' : 'scale-100'}
                    `}
                    style={{
                      backgroundColor: `${skill.color}15`,
                      border: `1px solid ${isHovered ? skill.color : `${skill.color}40`}`,
                      boxShadow: isHovered
                        ? `0 0 30px ${skill.color}50, 0 0 60px ${skill.color}30`
                        : 'none',
                      margin: '8px', // Added margin for extra spacing
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{skill.icon}</span>
                      <span
                        className="text-sm font-medium whitespace-nowrap"
                        style={{ color: skill.color }}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative orbital dots */}
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * 360;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#00F0FF]/30"
                style={{
                  left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 330}px)`,
                  top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 330}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>

        {/* Category Pills */}
        <div className="mt-20 flex flex-wrap justify-center gap-4">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div
              key={category}
              className="px-6 py-3 rounded-full glass hover:border-[#00F0FF]/50 transition-all cursor-default"
            >
              <span className="text-sm text-gray-300 capitalize">{category}</span>
              <span className="ml-2 text-[#00F0FF]">{skills.length}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalArsenal;