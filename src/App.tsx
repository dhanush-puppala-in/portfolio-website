import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Navigation from './components/Navigation';
import DynamicBackground from './components/DynamicBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import TechnicalArsenal from './sections/TechnicalArsenal';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Contact from './sections/Contact';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05050A] overflow-x-hidden">
      <CustomCursor />
      <DynamicBackground />
      <Navigation />
      
      <main className="relative">
        <Hero />
        <About />
        <TechnicalArsenal />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

export default App;
