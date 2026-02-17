import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Skill data with colors
const skills = [
  { name: 'Python', color: '#3776AB' },
  { name: 'Java', color: '#007396' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#339933' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'SQL', color: '#4479A1' },
  { name: 'Git', color: '#F05032' },
  { name: 'JS', color: '#F7DF1E' },
  { name: 'Kotlin', color: '#7F52FF' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'PHP', color: '#777BB4' },
  { name: 'Ruby', color: '#CC342D' },
];

// Floating particle component
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00F0FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Central glowing sphere
const CoreSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial
        color="#00F0FF"
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

// Orbiting skill nodes
const SkillOrbit = () => {
  const innerGroupRef = useRef<THREE.Group>(null);
  const outerGroupRef = useRef<THREE.Group>(null);
  
  // Split skills for inner and outer wheels
  const innerWheelSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const outerWheelSkills = skills.slice(Math.ceil(skills.length / 2));

  useFrame((state) => {
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.y = state.clock.elapsedTime * 0.05; // Inner wheel revolves slowly
      innerGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (outerGroupRef.current) {
      outerGroupRef.current.rotation.y = -state.clock.elapsedTime * 0.05; // Outer wheel revolves slowly in opposite direction
      outerGroupRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const generateSkillNodes = (skillArray: typeof skills, radius: number) => {
    return skillArray.map((skill, index) => {
      const angle = (index / skillArray.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.3; // Slight y-axis variation for 3D effect
      const z = Math.sin(angle) * radius;
      
      return { ...skill, position: [x, y, z] as [number, number, number], key: `${skill.name}-${index}` };
    });
  }

  const innerSkillNodes = useMemo(() => generateSkillNodes(innerWheelSkills, 2), [innerWheelSkills]);
  const outerSkillNodes = useMemo(() => generateSkillNodes(outerWheelSkills, 4), [outerWheelSkills]); // Larger radius for outer wheel

  // Create connection lines for inner wheel
  const innerLinePositions = useMemo(() => {
    const positions: number[] = [];
    innerSkillNodes.forEach((skill) => {
      positions.push(0, 0, 0, ...skill.position);
    });
    return new Float32Array(positions);
  }, [innerSkillNodes]);

  // Create connection lines for outer wheel
  const outerLinePositions = useMemo(() => {
    const positions: number[] = [];
    outerSkillNodes.forEach((skill) => {
      positions.push(0, 0, 0, ...skill.position);
    });
    return new Float32Array(positions);
  }, [outerSkillNodes]);

  return (
    <>
      {/* Inner Orbit Group */}
      <group ref={innerGroupRef}>
        {/* Inner Orbit ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} />
        </mesh>
        
        {/* Inner Skill nodes */}
        {innerSkillNodes.map((skill) => (
          <mesh key={skill.key} position={skill.position}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={skill.color} />
          </mesh>
        ))}
        
        {/* Inner Connection lines */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[innerLinePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00F0FF" transparent opacity={0.2} />
        </lineSegments>
      </group>

      {/* Outer Orbit Group */}
      <group ref={outerGroupRef}>
        {/* Outer Orbit ring */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[4, 0.015, 16, 100]} /> {/* Slightly thinner outer ring */}
          <meshBasicMaterial color="#7000FF" transparent opacity={0.2} />
        </mesh>
        
        {/* Outer Skill nodes */}
        {outerSkillNodes.map((skill) => (
          <mesh key={skill.key} position={skill.position}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={skill.color} />
          </mesh>
        ))}
        
        {/* Outer Connection lines */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[outerLinePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#7000FF" transparent opacity={0.15} /> {/* Slightly less opaque outer lines */}
        </lineSegments>
      </group>
    </>
  );
};

// Main TechOrbit component
const TechOrbit = () => {
  return (
    <div className="w-full h-full opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000FF" />
        
        <ParticleField />
        <CoreSphere />
        <SkillOrbit />
        
        <Stars
          radius={50}
          depth={50}
          count={500}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.10}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default TechOrbit;