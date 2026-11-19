import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import PartMesh from './PartMesh';

export default function MachineModel({
  parts,
  selectedModel,
  explodeProgress,
  isMobile,
  activeTappedPart,
  setActiveTappedPart,
  onOpenModal
}) {
  const groupRef = useRef();

  // Load central machine texture
  const machineTexture = useLoader(
    THREE.TextureLoader,
    selectedModel?.imageUrl || '/images/machine-full-configured.png'
  );
  machineTexture.generateMipmaps = true;

  // Gentle ambient rotation when not exploded
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (explodeProgress < 0.15) {
        // Idle gentle turntable rotation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      } else {
        // Smoothly return to frontal orientation for clear exploded view
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          0,
          delta * 4
        );
      }
    }
  });

  // Filter parts compatible with the active selected model
  const activeParts = useMemo(() => {
    if (!parts) return [];
    if (!selectedModel) return parts;
    const modelNumber = selectedModel.slug.replace('e-studio', '').toUpperCase();
    return parts.filter(
      (p) =>
        !p.compatibleModels ||
        p.compatibleModels.length === 0 ||
        p.compatibleModels.some(
          (m) =>
            m.includes(modelNumber) ||
            selectedModel.name.includes(m) ||
            selectedModel.slug.includes(m.toLowerCase())
        )
    );
  }, [parts, selectedModel]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Base Photocopy Chassis (Core Engine Body) */}
      <group position={[0, -0.1, 0]}>
        {/* Core textured body */}
        <mesh castShadow receiveShadow>
          <planeGeometry args={[2.2, 2.6]} />
          <meshStandardMaterial
            map={machineTexture}
            transparent={true}
            side={THREE.DoubleSide}
            roughness={0.25}
            metalness={0.1}
          />
        </mesh>

        {/* 3D Chassis Depth Enclosure */}
        <mesh position={[0, 0, -0.06]} castShadow receiveShadow>
          <boxGeometry args={[2.25, 2.65, 0.1]} />
          <meshStandardMaterial
            color="#0b1120"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Status / Toshiba Red Badge Accent */}
        <mesh position={[0.75, 1.15, 0.01]}>
          <planeGeometry args={[0.3, 0.08]} />
          <meshBasicMaterial color="#e11d48" />
        </mesh>
      </group>

      {/* Render all separated parts */}
      {activeParts.map((part) => (
        <PartMesh
          key={part.slug}
          part={part}
          explodeProgress={explodeProgress}
          isMobile={isMobile}
          activeTappedPart={activeTappedPart}
          setActiveTappedPart={setActiveTappedPart}
          onOpenModal={onOpenModal}
          selectedModel={selectedModel}
        />
      ))}
    </group>
  );
}
