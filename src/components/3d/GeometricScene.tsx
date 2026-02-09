import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { BlendFunction } from 'postprocessing';

const GOLD_COLOR = new THREE.Color("#D4AF37");
const AMBER_COLOR = new THREE.Color("#F5D061");
const OBSIDIAN_COLOR = new THREE.Color("#050505");
const CONNECTION_DISTANCE = 3.5;

interface GeometricSceneProps {
  reducedMotion?: boolean;
}

function GoldenNodes({ count = 60, reducedMotion = false }: { count?: number, reducedMotion?: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
      const scale = Math.random() * 0.3 + 0.1;
      const speed = Math.random() * 0.2 + 0.1;
      temp.push({ position: new THREE.Vector3(x, y, z), scale, speed, id: i });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      const t = state.clock.getElapsedTime();
      
      if (!reducedMotion) {
        particle.position.y += Math.sin(t * particle.speed + particle.id) * 0.005;
        particle.position.x += Math.cos(t * particle.speed * 0.5 + particle.id) * 0.005;
      }

      dummy.position.copy(particle.position);
      
      dummy.rotation.x = t * 0.1 * particle.speed;
      dummy.rotation.y = t * 0.2 * particle.speed;
      
      const s = particle.scale + Math.sin(t * 2 + particle.id) * 0.05;
      dummy.scale.set(s, s, s);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      const isAmber = i % 3 === 0;
      meshRef.current.setColorAt(i, color.set(isAmber ? AMBER_COLOR : GOLD_COLOR));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={GOLD_COLOR}
        emissive={AMBER_COLOR}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={1}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function Connections({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null!);
  
  const points = useMemo(() => {
    return new Array(40).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      )
    }));
  }, []);

  useFrame(() => {
    if (reducedMotion) return;

    points.forEach(p => {
      p.position.add(p.velocity);
      if (Math.abs(p.position.x) > 8) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > 8) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > 6) p.velocity.z *= -1;
    });

    const linePositions: number[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].position.distanceTo(points[j].position);
        if (dist < CONNECTION_DISTANCE) {
          linePositions.push(
            points[i].position.x, points[i].position.y, points[i].position.z,
            points[j].position.x, points[j].position.y, points[j].position.z
          );
        }
      }
    }
    
    if (linesGeometryRef.current) {
      linesGeometryRef.current.setAttribute(
        'position', 
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
    }
  });

  return (
    <lineSegments>
      <bufferGeometry ref={linesGeometryRef} />
      <lineBasicMaterial 
        color={GOLD_COLOR} 
        transparent 
        opacity={0.15} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
      />
    </lineSegments>
  );
}

function FloatingDust({ reducedMotion }: { reducedMotion: boolean }) {
  const count = 150;
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (reducedMotion || !mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color={AMBER_COLOR} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

function SceneRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { mouse } = useThree();
  const group = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (reducedMotion || !group.current) return;
    
    const x = (mouse.x * window.innerWidth) / 2000;
    const y = (mouse.y * window.innerHeight) / 2000;
    
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y, 0.02);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.02);
  });

  return (
    <group ref={group}>
      <GoldenNodes count={50} reducedMotion={reducedMotion} />
      <Connections reducedMotion={reducedMotion} />
      <FloatingDust reducedMotion={reducedMotion} />
    </group>
  );
}

export default function GeometricScene({ reducedMotion = false }: GeometricSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
        dpr={[1, isMobile ? 1.5 : 2]}
      >
        <color attach="background" args={[OBSIDIAN_COLOR.getStyle()]} />
        <fog attach="fog" args={[OBSIDIAN_COLOR.getStyle(), 10, 30]} />

        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.5} 
          penumbra={1} 
          intensity={2} 
          color={GOLD_COLOR} 
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color={AMBER_COLOR} />

        <SceneRig reducedMotion={reducedMotion} />

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={0.8} 
            radius={0.4}
            levels={8}
          />
          <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.002, 0.002)}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
