"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

// Base sizing/position
const MODEL_SCALE_BASE = 0.7;
const BASE_Y_OFFSET = -0.35;
const Y_MIN = -0.55;
const Y_MAX = 0.02;
const PARALLAX_K = 0.0; // keep stable while pinned

// Rotation (Y-axis) driven by hero progress
const BASE_Y_ROT = -0.35;
const ROT_TURNS = 0.85;
const ROT_LERP = 0.12;

// Shrink after letters lift
const SHRINK_START = 0.86; // begin shrinking when benefits start
const SHRINK_MAX = 0.8; // scale multiplier at p=1 (80% of base)
const SCALE_LERP = 0.12;

function GallonModel() {
  const group = useRef<THREE.Group>(null!); // overall position/rotation
  const scaleGroup = useRef<THREE.Group>(null!); // separate scale control
  const gltf = useGLTF("/Assets/3D/milk_gallon.glb") as any;

  const scrollY = useRef(0);
  const heroP = useRef(0);

  useEffect(() => {
    const onScroll = () => (scrollY.current = window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    if (!group.current || !scaleGroup.current) return;

    // position (Y only)
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

    // rotation around Y
    const targetAngleY = BASE_Y_ROT + Math.PI * 2 * ROT_TURNS * heroP.current;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetAngleY,
      ROT_LERP
    );
    group.current.rotation.x = 0.05;
    group.current.rotation.z = 0.08;

    // scale down after letters are gone
    const t = THREE.MathUtils.clamp(
      (heroP.current - SHRINK_START) / (1 - SHRINK_START),
      0,
      1
    );
    const e = t * t * (3 - 2 * t); // smoothstep
    const targetScale = MODEL_SCALE_BASE * (1 - (1 - SHRINK_MAX) * e);
    const s = THREE.MathUtils.lerp(
      scaleGroup.current.scale.x,
      targetScale,
      SCALE_LERP
    );
    scaleGroup.current.scale.setScalar(s);
  });

  return (
    <group ref={group} position={[0, BASE_Y_OFFSET, 0]} dispose={null}>
      <group ref={scaleGroup}>
        <Center>
          <primitive object={gltf.scene} />
        </Center>
      </group>
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
