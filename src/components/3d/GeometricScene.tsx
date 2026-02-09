import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Line } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface GeometricSceneProps {
  reducedMotion?: boolean;
}

interface NetworkNode {
  id: number;
  position: THREE.Vector3;
  connections: number[];
  size: number;
  isPrimary: boolean;
}

function generateNetworkNodes(isMobile: boolean): NetworkNode[] {
  const nodes: NetworkNode[] = [];
  
  const leftNodes = [
    { x: -4.2, y: 1.5, z: -1.5, primary: true },
    { x: -3.8, y: 0.5, z: -2.2, primary: false },
    { x: -4.5, y: -0.3, z: -1.8, primary: false },
    { x: -3.6, y: -1.0, z: -2.5, primary: true },
  ];
  
  const rightNodes = [
    { x: 4.0, y: 1.6, z: -2.0, primary: true },
    { x: 4.4, y: 0.7, z: -1.6, primary: false },
    { x: 3.7, y: -0.1, z: -2.4, primary: false },
    { x: 4.2, y: -0.8, z: -1.9, primary: true },
  ];
  
  const topNodes = [
    { x: -1.5, y: 1.9, z: -2.0, primary: false },
    { x: 0.8, y: 2.1, z: -1.8, primary: true },
    { x: 2.2, y: 1.7, z: -2.3, primary: false },
  ];
  
  const bottomNodes = [
    { x: -1.8, y: -1.4, z: -1.6, primary: false },
    { x: 0.5, y: -1.2, z: -2.1, primary: false },
    { x: 2.0, y: -1.5, z: -1.9, primary: false },
  ];

  const allNodeData = [...leftNodes, ...rightNodes, ...topNodes, ...bottomNodes];
  const scale = isMobile ? 0.65 : 1;
  
  allNodeData.forEach((node, index) => {
    nodes.push({
      id: index,
      position: new THREE.Vector3(node.x * scale, node.y * scale, node.z),
      connections: [],
      size: node.primary ? 0.12 : 0.07,
      isPrimary: node.primary,
    });
  });
  
  nodes[0].connections = [1, 6];
  nodes[1].connections = [0, 2];
  nodes[2].connections = [1, 3, 10];
  nodes[3].connections = [2, 12];
  
  nodes[4].connections = [5, 8];
  nodes[5].connections = [4, 6];
  nodes[6].connections = [5, 7, 0];
  nodes[7].connections = [6, 13];
  
  nodes[8].connections = [9, 4];
  nodes[9].connections = [8, 10];
  nodes[10].connections = [9, 2];
  
  nodes[11].connections = [12, 3];
  nodes[12].connections = [11, 13];
  nodes[13].connections = [12, 7];
  
  return nodes;
}

interface NodeMeshProps {
  node: NetworkNode;
  reducedMotion: boolean;
}

function NodeMesh({ node, reducedMotion }: NodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const pulseOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame((state) => {
    if (reducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    const pulse = Math.sin(time * 1.5 + pulseOffset) * 0.15 + 1;
    
    if (node.isPrimary) {
      meshRef.current.scale.setScalar(pulse);
      glowRef.current.scale.setScalar(pulse * 1.8);
    }
  });
  
  return (
    <group position={node.position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[node.size, 16, 16]} />
        <meshStandardMaterial
          color={node.isPrimary ? '#f5d061' : '#d4af37'}
          metalness={0.8}
          roughness={0.2}
          emissive={node.isPrimary ? '#d4af37' : '#8b7020'}
          emissiveIntensity={node.isPrimary ? 0.6 : 0.3}
        />
      </mesh>
      
      {node.isPrimary && (
        <mesh ref={glowRef}>
          <sphereGeometry args={[node.size * 1.6, 16, 16]} />
          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={0.15}
          />
        </mesh>
      )}
    </group>
  );
}

interface NetworkEdgesProps {
  nodes: NetworkNode[];
  reducedMotion: boolean;
}

function NetworkEdges({ nodes, reducedMotion }: NetworkEdgesProps) {
  const linesRef = useRef<THREE.Group>(null!);
  
  const edges = useMemo(() => {
    const edgeSet = new Set<string>();
    const result: { key: string; start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    
    nodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const edgeKey = `${Math.min(node.id, targetId)}-${Math.max(node.id, targetId)}`;
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          const targetNode = nodes.find((n) => n.id === targetId);
          if (targetNode) {
            result.push({
              key: edgeKey,
              start: node.position,
              end: targetNode.position,
            });
          }
        }
      });
    });
    
    return result;
  }, [nodes]);
  
  useFrame((state) => {
    if (reducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    linesRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Line) {
        const material = child.material as THREE.LineBasicMaterial;
        const pulse = Math.sin(time * 0.8 + index * 0.5) * 0.15 + 0.35;
        material.opacity = pulse;
      }
    });
  });
  
  return (
    <group ref={linesRef}>
      {edges.map((edge) => (
        <Line
          key={edge.key}
          points={[edge.start, edge.end]}
          color="#d4af37"
          transparent
          opacity={0.35}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

interface DataFlowParticlesProps {
  nodes: NetworkNode[];
  reducedMotion: boolean;
}

function DataFlowParticles({ nodes, reducedMotion }: DataFlowParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null!);
  
  const { positions, edges } = useMemo(() => {
    const edgeList: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const edgeSet = new Set<string>();
    
    nodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const edgeKey = [Math.min(node.id, targetId), Math.max(node.id, targetId)].join('-');
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          const targetNode = nodes.find((n) => n.id === targetId);
          if (targetNode) {
            edgeList.push({ start: node.position, end: targetNode.position });
          }
        }
      });
    });
    
    const particleCount = edgeList.length * 2;
    const pos = new Float32Array(particleCount * 3);
    
    edgeList.forEach((edge, i) => {
      const t = Math.random();
      const x = edge.start.x + (edge.end.x - edge.start.x) * t;
      const y = edge.start.y + (edge.end.y - edge.start.y) * t;
      const z = edge.start.z + (edge.end.z - edge.start.z) * t;
      
      pos[i * 6] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;
      
      const t2 = Math.random();
      pos[i * 6 + 3] = edge.start.x + (edge.end.x - edge.start.x) * t2;
      pos[i * 6 + 4] = edge.start.y + (edge.end.y - edge.start.y) * t2;
      pos[i * 6 + 5] = edge.start.z + (edge.end.z - edge.start.z) * t2;
    });
    
    return { positions: pos, edges: edgeList };
  }, [nodes]);
  
  useFrame((state) => {
    if (reducedMotion || !particlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionAttribute = particlesRef.current.geometry.attributes.position;
    
    edges.forEach((edge, i) => {
      const t1 = ((time * 0.3 + i * 0.2) % 1);
      const t2 = ((time * 0.3 + i * 0.2 + 0.5) % 1);
      
      positionAttribute.setXYZ(
        i * 2,
        edge.start.x + (edge.end.x - edge.start.x) * t1,
        edge.start.y + (edge.end.y - edge.start.y) * t1,
        edge.start.z + (edge.end.z - edge.start.z) * t1
      );
      
      positionAttribute.setXYZ(
        i * 2 + 1,
        edge.start.x + (edge.end.x - edge.start.x) * t2,
        edge.start.y + (edge.end.y - edge.start.y) * t2,
        edge.start.z + (edge.end.z - edge.start.z) * t2
      );
    });
    
    positionAttribute.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f5d061"
        size={0.05}
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function NetworkRig({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const rigRef = useRef<THREE.Group>(null!);
  const nodes = useMemo(() => generateNetworkNodes(isMobile), [isMobile]);
  
  useFrame((state) => {
    if (reducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Subtle rotation
    rigRef.current.rotation.y = Math.sin(time * 0.1) * 0.03;
    rigRef.current.rotation.x = Math.sin(time * 0.08) * 0.02;
    
    // Pointer parallax
    const targetX = state.pointer.x * (isMobile ? 0.15 : 0.25);
    const targetY = state.pointer.y * (isMobile ? 0.1 : 0.18);
    
    rigRef.current.position.x = THREE.MathUtils.lerp(rigRef.current.position.x, targetX, 0.04);
    rigRef.current.position.y = THREE.MathUtils.lerp(rigRef.current.position.y, targetY, 0.04);
  });
  
  return (
    <group ref={rigRef}>
      {/* Network edges (lines connecting nodes) */}
      <NetworkEdges nodes={nodes} reducedMotion={reducedMotion} />
      
      {/* Data flow particles */}
      {!reducedMotion && <DataFlowParticles nodes={nodes} reducedMotion={reducedMotion} />}
      
      {/* Network nodes */}
      {nodes.map((node) => (
        <NodeMesh key={node.id} node={node} reducedMotion={reducedMotion} />
      ))}
    </group>
  );
}

export default function GeometricScene({ reducedMotion = false }: GeometricSceneProps) {
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
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 8, 16]} />
        
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={0.8} />
        <pointLight position={[-5, -3, 2]} intensity={0.4} color="#d4af37" />
        <pointLight position={[3, 3, -2]} intensity={0.3} color="#f5d061" />

        <NetworkRig isMobile={isMobile} reducedMotion={reducedMotion} />

        <Environment preset="studio" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
