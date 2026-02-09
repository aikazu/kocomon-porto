import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls, ContactShadows } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const GoldMaterial = new THREE.MeshStandardMaterial({
  color: '#FFD700',
  metalness: 0.8,
  roughness: 0.2,
  emissive: '#B8860B',
  emissiveIntensity: 0.1,
});

function Shape({ type, position, rotation, scale = 1 }: { type: 'icosahedron' | 'octahedron' | 'torus'; position: [number, number, number]; rotation: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = rotation[0] + time * 0.1;
    meshRef.current.rotation.y = rotation[1] + time * 0.15;
  });

  let geometry: React.ReactNode;
  switch (type) {
    case 'icosahedron':
      geometry = <icosahedronGeometry args={[1, 0]} />;
      break;
    case 'octahedron':
      geometry = <octahedronGeometry args={[1, 0]} />;
      break;
    case 'torus':
      geometry = <torusGeometry args={[0.8, 0.2, 16, 32]} />;
      break;
    default:
        geometry = <boxGeometry />
  }

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale} material={GoldMaterial}>
        {geometry}
      </mesh>
    </Float>
  );
}

export default function GeometricScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={isMobile ? [1, 1.5] : [1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFD700" />

        <group position={[0, 0, 0]}>
          <Shape type="icosahedron" position={isMobile ? [-1.5, 2, -2] : [-3, 2, -2]} rotation={[0, 0, 0]} scale={isMobile ? 1 : 1.2} />
          <Shape type="octahedron" position={isMobile ? [1.5, -1, -1] : [3, -1, -1]} rotation={[Math.PI / 4, 0, 0]} scale={isMobile ? 1.2 : 1.5} />
          <Shape type="torus" position={isMobile ? [-1, -3, 0] : [-2, -3, 0]} rotation={[0, Math.PI / 2, 0]} scale={isMobile ? 0.8 : 1} />
          
          {!isMobile && (
            <>
              <Shape type="icosahedron" position={[4, 3, -4]} rotation={[0, 0, 0]} scale={0.8} />
              <Shape type="octahedron" position={[0, 4, -5]} rotation={[0, 0, Math.PI / 4]} scale={0.6} />
            </>
          )}
        </group>

        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
        
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
