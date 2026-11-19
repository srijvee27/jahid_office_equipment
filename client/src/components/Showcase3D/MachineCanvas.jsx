import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Loader } from '@react-three/drei';
import MachineModel from './MachineModel';

function CanvasLoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 2, 0.5]} />
      <meshStandardMaterial color="#0369a1" wireframe={true} />
    </mesh>
  );
}

export default function MachineCanvas({
  parts,
  selectedModel,
  explodeProgress,
  isMobile,
  activeTappedPart,
  setActiveTappedPart,
  onOpenModal
}) {
  const controlsRef = useRef();

  return (
    <div
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[720px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      onClick={() => {
        // Tap on empty space clears selection
        if (activeTappedPart) setActiveTappedPart(null);
      }}
    >
      <Canvas
        shadows
        dpr={[1, isMobile ? 1.25 : 1.75]}
        camera={{
          position: [0, 0.4, isMobile ? 5.8 : 4.8],
          fov: isMobile ? 48 : 42,
          near: 0.1,
          far: 50
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true
        }}
      >
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 4, -4]} intensity={0.6} color="#38bdf8" />
        <directionalLight position={[0, -4, 4]} intensity={0.3} color="#94a3b8" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#e0f2fe" />

        {/* Orbit Controls with soft damping */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={2.8}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          dampingFactor={0.06}
          rotateSpeed={0.6}
        />

        {/* Photocopier 3D Exploded Assembly */}
        <Suspense fallback={<CanvasLoadingFallback />}>
          <MachineModel
            parts={parts}
            selectedModel={selectedModel}
            explodeProgress={explodeProgress}
            isMobile={isMobile}
            activeTappedPart={activeTappedPart}
            setActiveTappedPart={setActiveTappedPart}
            onOpenModal={onOpenModal}
          />

          {/* Clean Contact Ground Shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.65}
            scale={7}
            blur={2}
            far={3.5}
            color="#0284c7"
          />
        </Suspense>
      </Canvas>

      {/* Floating Canvas UI Controls & Helper */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Interactive 3D Stage
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-md">
        <span>Drag to rotate</span>
        <span>•</span>
        <span>Scroll to explode</span>
        <span>•</span>
        <span>Hover part for price</span>
      </div>
    </div>
  );
}
