import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import PartTooltip from './PartTooltip';
import { trackPartHover, trackPartClick } from '../../analytics';

export default function PartMesh({
  part,
  explodeProgress,
  isMobile,
  activeTappedPart,
  setActiveTappedPart,
  onOpenModal,
  selectedModel
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load high quality texture
  const texture = useLoader(THREE.TextureLoader, part.imageUrl);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  // Compute exploded target position
  const offset = part.explodeOffset || { x: 0, y: 0, z: 0 };
  
  // Separation factor: external options separate earlier (0.0 - 0.6), internal parts separate later (0.3 - 1.0)
  const factor = useMemo(() => {
    if (part.layer === 'external') {
      return Math.min(1, explodeProgress * 1.6);
    } else {
      return Math.max(0, (explodeProgress - 0.25) * 1.33);
    }
  }, [explodeProgress, part.layer]);

  // Position interpolation
  const currentPos = useMemo(() => {
    return new THREE.Vector3(
      offset.x * factor,
      offset.y * factor,
      offset.z * factor
    );
  }, [offset, factor]);

  const isTapped = activeTappedPart?.slug === part.slug;
  const isHighlighted = hovered || isTapped;

  // Smooth lerp to currentPos in frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.lerp(currentPos, Math.min(1, delta * 12));
      // Subtle float when exploded
      if (factor > 0.3) {
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + offset.x) * 0.001;
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    trackPartClick(part.slug, part.name, part.priceBDT);

    if (isMobile) {
      if (isTapped) {
        // Second tap opens modal
        onOpenModal(part);
      } else {
        // First tap highlights & shows card
        setActiveTappedPart(part);
      }
    } else {
      // Desktop directly opens modal
      onOpenModal(part);
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (!isMobile) {
      setHovered(true);
      document.body.style.cursor = 'pointer';
      trackPartHover(part.slug, part.name);
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    if (!isMobile) {
      setHovered(false);
      document.body.style.cursor = 'auto';
    }
  };

  // Dimensions based on category
  const isPanel = part.slug.includes('panel');
  const isFeeder = part.slug.includes('feeder') || part.slug.includes('dsdf') || part.slug.includes('radf');
  const isPedestal = part.slug.includes('pedestal');
  const isFinisher = part.slug.includes('finisher');
  const size = isFeeder ? [1.5, 0.9] : isPedestal ? [1.4, 0.8] : isFinisher ? [1.1, 1.2] : isPanel ? [0.9, 0.6] : [0.85, 0.65];

  return (
    <group ref={meshRef}>
      {/* 3D Container box with textured face */}
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          map={texture}
          transparent={true}
          side={THREE.DoubleSide}
          roughness={0.2}
          metalness={0.15}
          emissive={isHighlighted ? new THREE.Color(0x0284c7) : new THREE.Color(0x000000)}
          emissiveIntensity={isHighlighted ? 0.35 : 0}
        />
      </mesh>

      {/* Sleek metallic backing chassis plate for 3D depth */}
      <mesh position={[0, 0, -0.02]} castShadow>
        <boxGeometry args={[size[0] + 0.04, size[1] + 0.04, 0.03]} />
        <meshStandardMaterial
          color={isHighlighted ? '#0284c7' : '#1e293b'}
          metalness={0.7}
          roughness={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Visual laser leader/pin connecting part to center when separated */}
      {factor > 0.15 && (
        <line>
          <bufferGeometry
            attach="geometry"
            onUpdate={(self) => {
              const pts = [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(-currentPos.x * 0.9, -currentPos.y * 0.9, -currentPos.z * 0.9)
              ];
              self.setFromPoints(pts);
            }}
          />
          <lineDashedMaterial
            attach="material"
            color={isHighlighted ? '#38bdf8' : '#334155'}
            dashSize={0.08}
            gapSize={0.05}
            transparent={true}
            opacity={0.65}
          />
        </line>
      )}

      {/* Floating Glassmorphism Tooltip for Desktop hover & Mobile 1st tap */}
      {isHighlighted && (
        <Html
          position={[0, size[1] / 2 + 0.35, 0.1]}
          center
          distanceFactor={6}
          zIndexRange={[100, 0]}
        >
          <PartTooltip
            part={part}
            isMobile={isMobile}
            onOpenModal={onOpenModal}
          />
        </Html>
      )}
    </group>
  );
}
