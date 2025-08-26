"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

// Sizing / positioning knobs
const MODEL_SCALE = 0.7;
const BASE_Y_OFFSET = -0.35;
const Y_MIN = -0.55;
const Y_MAX = 0.02;
// Disable vertical parallax during the pin to avoid clipping
const PARALLAX_K = 0.0;

// Rotation knobs (same axis = Y)
const BASE_Y_ROT = -0.35; // initial slight twist toward viewer
const ROT_TURNS = 0.85; // 0..N turns (0.85 ~ 306°)
const ROT_LERP = 0.12; // smoothing for rotation

function GallonModel() {
  const group = useRef<THREE.Group>(null!);
  const gltf = useGLTF("/Assets/3D/milk_gallon.glb") as { scene: THREE.Group };

  const scrollY = useRef(0);
  const heroP = useRef(0); // progress from PinnedHero (0..1)

  // Track page scroll for (optional) vertical parallax
  useEffect(() => {
    const onScroll = () => (scrollY.current = window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen to pinned hero progress to drive rotation
  useEffect(() => {
    const onHero = (e: Event) => {
      const detail = (e as CustomEvent<{ p: number }>).detail;
      if (detail && typeof detail.p === "number") heroP.current = detail.p;
    };
    window.addEventListener("heroProgress", onHero as EventListener);
    return () =>
      window.removeEventListener("heroProgress", onHero as EventListener);
  }, []);

  useFrame(() => {
    if (!group.current) return;

    // Vertical position (kept stable unless you want slight parallax)
    const parallax = -scrollY.current * PARALLAX_K;
    const targetY = THREE.MathUtils.clamp(
      BASE_Y_OFFSET + parallax,
      Y_MIN,
      Y_MAX
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.08
    );

    // Scroll-driven rotation around Y (same axis)
    const targetAngleY = BASE_Y_ROT + Math.PI * 2 * ROT_TURNS * heroP.current;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetAngleY,
      ROT_LERP
    );

    // Keep slight tilt in X/Z for depth
    group.current.rotation.x = 0.05;
    group.current.rotation.z = 0.08;
  });

  return (
    <group ref={group} position={[0, BASE_Y_OFFSET, 0]} dispose={null}>
      <Center>
        <primitive object={gltf.scene} scale={MODEL_SCALE} />
      </Center>
    </group>
  );
}
useGLTF.preload("/Assets/3D/milk_gallon.glb");

export default function GallonCanvas() {
  return (
    <div className="w-full h-[80vh] lg:h-[90vh]">
      <Canvas
        camera={{ position: [0, 0.7, 5.4], fov: 45, near: 0.1, far: 100 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={1.1} />
        <Suspense fallback={null}>
          <GallonModel />
          <Environment preset="studio" />
        </Suspense>

        {/* Y-axis rotation only; zoom disabled */}
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={0.7}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          target={[0, -0.05, 0]}
        />
      </Canvas>
    </div>
  );
}
