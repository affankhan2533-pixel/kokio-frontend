'use client';

import React, { useRef, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, PresentationControls } from '@react-three/drei';
import { use3DStore } from '@store/use3DStore';

// PBR Material Configurations for Luxury Finishes
const FINISH_CONFIGS = {
  titanium: {
    color: '#d1d5db',
    metalness: 0.96,
    roughness: 0.16,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08,
    reflectivity: 0.95,
  },
  onyx: {
    color: '#18181b',
    metalness: 0.92,
    roughness: 0.25,
    clearcoat: 0.8,
    clearcoatRoughness: 0.10,
    reflectivity: 0.90,
  },
  champagne: {
    color: '#c5a059',
    metalness: 0.94,
    roughness: 0.18,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08,
    reflectivity: 0.95,
  },
  emerald: {
    color: '#0d382c',
    metalness: 0.90,
    roughness: 0.20,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08,
    reflectivity: 0.92,
  },
};

function FlagshipLuggageModel() {
  const groupRef = useRef();
  const { activeVariant, autoRotate } = use3DStore();
  const finish = FINISH_CONFIGS[activeVariant] || FINISH_CONFIGS.titanium;

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.25, 1.25, 1.25]}>
      
      {/* Main Hard Shell Trunk Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.62, 2.32, 0.92, 16, 16, 16]} />
        <meshPhysicalMaterial
          color={finish.color}
          metalness={finish.metalness}
          roughness={finish.roughness}
          clearcoat={finish.clearcoat}
          clearcoatRoughness={finish.clearcoatRoughness}
          reflectivity={finish.reflectivity}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Embossed Brand Plaque Badge (KOKIO PARIS) */}
      <group position={[0, 0.85, 0.468]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.16, 0.02]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.98} roughness={0.08} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.46, 0.12, 0.005]} />
          <meshStandardMaterial color="#09090b" roughness={0.6} />
        </mesh>
      </group>

      {/* Vertical Rib Grooves */}
      {[-0.55, -0.28, 0, 0.28, 0.55].map((x, idx) => (
        <group key={idx}>
          <mesh position={[x, 0, 0.465]}>
            <boxGeometry args={[0.085, 2.24, 0.022]} />
            <meshStandardMaterial color={finish.color} metalness={0.99} roughness={0.1} />
          </mesh>
          <mesh position={[x, 0, -0.465]}>
            <boxGeometry args={[0.085, 2.24, 0.022]} />
            <meshStandardMaterial color={finish.color} metalness={0.99} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Corner Bumpers */}
      {[
        [-0.83, 1.18, 0.47],
        [0.83, 1.18, 0.47],
        [-0.83, -1.18, 0.47],
        [0.83, -1.18, 0.47],
        [-0.83, 1.18, -0.47],
        [0.83, 1.18, -0.47],
        [-0.83, -1.18, -0.47],
        [0.83, -1.18, -0.47],
      ].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshStandardMaterial color="#18181b" metalness={0.95} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Handle */}
      <group position={[0, 1.34, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.12, 0.16]} />
          <meshStandardMaterial color="#1c1917" roughness={0.88} metalness={0.08} />
        </mesh>
        <mesh position={[-0.26, -0.12, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
          <meshStandardMaterial color={finish.color} metalness={0.96} roughness={0.12} />
        </mesh>
        <mesh position={[0.26, -0.12, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
          <meshStandardMaterial color={finish.color} metalness={0.96} roughness={0.12} />
        </mesh>
      </group>

      {/* Wheels */}
      {[
        [-0.6, -1.27, 0.3],
        [0.6, -1.27, 0.3],
        [-0.6, -1.27, -0.3],
        [0.6, -1.27, -0.3],
      ].map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.135, 0.135, 0.09, 20]} />
            <meshStandardMaterial color="#09090b" roughness={0.9} />
          </mesh>
        </group>
      ))}

    </group>
  );
}

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("WebGL error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function StaticFallbackImage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#EFEAE2]/30 rounded-3xl border border-black/10 p-8">
      <img
        src="/images/monolith.png"
        alt="The Monolith Carry-On 35L"
        className="max-h-[80%] object-contain transition-transform duration-500 hover:scale-[1.03]"
      />
      <span className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#B8892D] uppercase mt-4">
        3D PREVIEW ACTIVE (STATIC FALLBACK LOADED)
      </span>
    </div>
  );
}

function CanvasLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-10 h-10 border-2 border-neutral-400 border-t-neutral-950 rounded-full animate-spin mb-2" />
      <span className="text-[10px] tracking-[0.3em] font-light text-neutral-500 uppercase">
        LOADING 3D PREVIEW
      </span>
    </div>
  );
}

export default function HeroLuggageCanvas() {
  return (
    <div className="w-full h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] relative pointer-events-auto cursor-grab active:cursor-grabbing">
      <WebGLErrorBoundary fallback={<StaticFallbackImage />}>
        <Suspense fallback={<CanvasLoader />}>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.45, 5.2], fov: 39 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.85} />
            <directionalLight position={[8, 12, 10]} intensity={2.0} castShadow shadow-mapSize={1024} />
            <directionalLight position={[-10, 6, -5]} intensity={1.0} color="#c5a059" />

            <PresentationControls
              global={false}
              config={{ mass: 2, tension: 350 }}
              snap={{ mass: 4, tension: 250 }}
              rotation={[0.12, 0.35, 0]}
              polar={[-Math.PI / 6, Math.PI / 6]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.3}>
                <FlagshipLuggageModel />
              </Float>
            </PresentationControls>

            <ContactShadows
              position={[0, -1.68, 0]}
              opacity={0.65}
              scale={7}
              blur={2.2}
              far={4}
              color="#000000"
            />

            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
}
