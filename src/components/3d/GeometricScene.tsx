import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";

// Match CSS token --color-primary exactly
const PRIMARY_COLOR = new THREE.Color("#ff2d00");
const SECONDARY_COLOR = new THREE.Color("#00F0FF");
const VOID_COLOR = new THREE.Color("#050505");
const CONNECTION_DISTANCE = 4.5;

interface GeometricSceneProps {
  reducedMotion?: boolean;
}

function CyberNodes({
  count = 60,
  reducedMotion = false,
}: {
  count?: number;
  reducedMotion?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const seed = i * 1337;
      const r = (n: number) => {
        const x = Math.sin(seed + n) * 10000;
        return x - Math.floor(x);
      };
      const x = (r(1) - 0.5) * 18;
      const y = (r(2) - 0.5) * 18;
      const z = (r(3) - 0.5) * 12;
      const scale = r(4) * 0.2 + 0.05;
      const speed = r(5) * 0.3 + 0.1;
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
        particle.position.y +=
          Math.sin(t * particle.speed + particle.id) * 0.005;
        particle.position.x +=
          Math.cos(t * particle.speed * 0.5 + particle.id) * 0.005;
      }

      dummy.position.copy(particle.position);
      dummy.rotation.x = t * 0.2 * particle.speed;
      dummy.rotation.y = t * 0.3 * particle.speed;

      const s = particle.scale + Math.sin(t * 3 + particle.id) * 0.02;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const isSecondary = i % 4 === 0;
      meshRef.current.setColorAt(
        i,
        color.set(isSecondary ? SECONDARY_COLOR : PRIMARY_COLOR),
      );
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={PRIMARY_COLOR}
        emissive={PRIMARY_COLOR}
        emissiveIntensity={1.5}
        roughness={0.2}
        metalness={0.8}
        toneMapped={false}
        wireframe={true}
      />
    </instancedMesh>
  );
}

function DataStreams({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null!);

  const points = useMemo(() => {
    return new Array(50).fill(0).map((_, i) => {
      const seed = i * 7331;
      const r = (n: number) => {
        const x = Math.sin(seed + n) * 10000;
        return x - Math.floor(x);
      };
      return {
        position: new THREE.Vector3(
          (r(1) - 0.5) * 15,
          (r(2) - 0.5) * 15,
          (r(3) - 0.5) * 10,
        ),
        velocity: new THREE.Vector3(
          (r(4) - 0.5) * 0.05,
          (r(5) - 0.5) * 0.05,
          (r(6) - 0.5) * 0.05,
        ),
      };
    });
  }, []);

  const maxLineSegments = useMemo(
    () => (points.length * (points.length - 1)) / 2,
    [points.length],
  );

  useEffect(() => {
    const geometry = linesGeometryRef.current;
    if (!geometry) return;
    const positions = new Float32Array(maxLineSegments * 6);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setDrawRange(0, 0);
    return () => {
      geometry.deleteAttribute("position");
    };
  }, [maxLineSegments]);

  useFrame(() => {
    if (reducedMotion) return;

    points.forEach((p) => {
      p.position.add(p.velocity);
      if (Math.abs(p.position.x) > 10) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > 10) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > 8) p.velocity.z *= -1;
    });

    if (linesGeometryRef.current) {
      const attribute = linesGeometryRef.current.getAttribute("position") as
        | THREE.BufferAttribute
        | undefined;
      if (attribute) {
        const linePositions = attribute.array as Float32Array;
        linePositions.fill(0);
        let lineIndex = 0;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dist = points[i].position.distanceTo(points[j].position);
            if (dist < CONNECTION_DISTANCE) {
              linePositions[lineIndex++] = points[i].position.x;
              linePositions[lineIndex++] = points[i].position.y;
              linePositions[lineIndex++] = points[i].position.z;
              linePositions[lineIndex++] = points[j].position.x;
              linePositions[lineIndex++] = points[j].position.y;
              linePositions[lineIndex++] = points[j].position.z;
            }
          }
        }
        attribute.needsUpdate = true;
        linesGeometryRef.current.setDrawRange(0, lineIndex / 3);
      }
    }
  });

  return (
    <lineSegments>
      <bufferGeometry ref={linesGeometryRef} />
      <lineBasicMaterial
        color={SECONDARY_COLOR}
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function SceneRig({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  // Use R3F's reactive size instead of window.innerWidth/Height every frame
  const { mouse, size } = useThree();
  const group = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (reducedMotion || !group.current) return;
    const x = (mouse.x * size.width) / 1500;
    const y = (mouse.y * size.height) / 1500;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y,
      0.05,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x,
      0.05,
    );
  });

  // Mobile: 30 nodes, no DataStreams. Desktop: 80 nodes + DataStreams.
  return (
    <group ref={group}>
      <CyberNodes count={isMobile ? 30 : 80} reducedMotion={reducedMotion} />
      {!isMobile && <DataStreams reducedMotion={reducedMotion} />}
    </group>
  );
}

export default function GeometricScene({
  reducedMotion = false,
}: GeometricSceneProps) {
  // Read synchronously to avoid 1-frame flash of wrong state
  const [isMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const enablePostProcessing = !reducedMotion && !isMobile;

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 40 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        dpr={[1, isMobile ? 1.5 : 2]}
      >
        <color attach="background" args={[VOID_COLOR.getStyle()]} />
        <fog attach="fog" args={[VOID_COLOR.getStyle(), 10, 40]} />

        <ambientLight intensity={0.1} />
        {/* castShadow removed — no shadow receivers in scene */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.5}
          penumbra={1}
          intensity={3}
          color={PRIMARY_COLOR}
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={2}
          color={SECONDARY_COLOR}
        />

        <SceneRig reducedMotion={reducedMotion} isMobile={isMobile} />

        {enablePostProcessing ? (
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              mipmapBlur
              intensity={1.2}
              radius={0.5}
              levels={8}
            />
            <Noise opacity={0.08} blendFunction={BlendFunction.OVERLAY} />
            <Vignette eskil={false} offset={0.1} darkness={0.9} />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.003, 0.003)}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        ) : null}
      </Canvas>
    </div>
  );
}
