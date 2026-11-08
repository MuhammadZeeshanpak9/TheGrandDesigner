"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function subscribeWindow(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getWindowWidth() {
  return typeof window !== "undefined" ? window.innerWidth : 1440;
}

function getServerWindowWidth() {
  return 1440;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotion() {
  return false;
}

interface BrainPointsData {
  count: number;
  scatterPos: Float32Array;
  targetPos: Float32Array;
  scatterRot: Float32Array;
  targetRot: Float32Array;
  delays: Float32Array;
  phases: Float32Array;
  scales: Float32Array;
  colorIndices: Uint8Array;
}

const PALETTE_COLORS = [
  new THREE.Color("#c9a227"), // gold
  new THREE.Color("#c9a227"), // gold
  new THREE.Color("#e0bc3f"), // bright gold sparkle
  new THREE.Color("#faf9f6"), // paper / white
  new THREE.Color("#faf9f6"), // paper / white
  new THREE.Color("#1a7a7a"), // teal-light
  new THREE.Color("#1a7a7a"), // teal-light
  new THREE.Color("#6b5b95"), // muted violet
  new THREE.Color("#7b6ba8"), // soft violet
];

function generateBrainModel(count: number): BrainPointsData {
  const scatterPos = new Float32Array(count * 3);
  const targetPos = new Float32Array(count * 3);
  const scatterRot = new Float32Array(count * 3);
  const targetRot = new Float32Array(count * 3);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);
  const scales = new Float32Array(count);
  const colorIndices = new Uint8Array(count);

  const cerebrumCount = Math.floor(count * 0.8);
  const cerebellumCount = Math.floor(count * 0.12);
  const stemCount = count - cerebrumCount - cerebellumCount;

  let idx = 0;

  // 1. Dual-lobed cerebrum
  for (let i = 0; i < cerebrumCount; i++) {
    const hemi = i % 2 === 0 ? -1 : 1;

    // Sample spherical distribution
    const u = Math.random();
    const v = Math.random();
    const theta = Math.acos(2 * u - 1);
    const phi = v * 2 * Math.PI;

    const x0 = Math.sin(theta) * Math.cos(phi);
    const y0 = Math.cos(theta);
    const z0 = Math.sin(theta) * Math.sin(phi);

    // Anatomical ellipsoid semi-axes
    const rx = 0.72;
    const ry = 0.88;
    const rz = 1.18;

    let px = x0 * rx + hemi * 0.72;
    let py = y0 * ry + 0.22;
    let pz = z0 * rz;

    // Frontal lobe elevation and curve
    if (pz > 0) {
      py += 0.14 * pz * (1.0 - Math.abs(x0) * 0.25);
      px *= 0.98;
    }

    // Occipital lobe taper
    if (pz < 0) {
      py -= 0.1 * Math.abs(pz);
      px *= 1.0 - 0.14 * Math.abs(pz);
    }

    // Temporal lobe lateral inferior expansion
    if (py < 0.15 && py > -0.55 && pz > -0.35 && pz < 0.5) {
      const tf =
        Math.cos((py + 0.2) * Math.PI) * Math.cos((pz - 0.08) * Math.PI * 1.5);
      if (tf > 0) {
        px += hemi * 0.2 * tf;
      }
    }

    // Longitudinal fissure constraint
    if (hemi === -1 && px > -0.07) {
      px = -0.07 - Math.abs(px + 0.07) * 0.55;
    }
    if (hemi === 1 && px < 0.07) {
      px = 0.07 + Math.abs(px - 0.07) * 0.55;
    }

    // Subtle asymmetry (Yakovlevian torque)
    if (hemi === 1 && pz > 0) px += 0.02;
    if (hemi === -1 && pz < 0) pz -= 0.03;

    // Sulci & gyri 3D sinusoidal noise
    const g1 =
      Math.sin(px * 4.3) * Math.cos(py * 4.3) * Math.sin(pz * 4.3);
    const g2 =
      Math.sin(px * 8.6 + 1.2) * Math.cos(pz * 8.6 + 0.8);
    const disp = 1.0 + (g1 * 0.12 + g2 * 0.05);

    // 82% surface shell, 18% interior depth
    const depth = Math.random() > 0.18 ? 1.0 : 0.82 + 0.18 * Math.random();

    px *= disp * depth;
    py *= disp * depth;
    pz *= disp * depth;

    targetPos[idx * 3] = px;
    targetPos[idx * 3 + 1] = py;
    targetPos[idx * 3 + 2] = pz;

    idx++;
  }

  // 2. Cerebellum (posterior-inferior)
  for (let i = 0; i < cerebellumCount; i++) {
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;
    const hemi = i % 2 === 0 ? -1 : 1;

    let cx = 0.65 * Math.sin(theta) * Math.cos(phi) + hemi * 0.05;
    let cy = -0.85 + 0.28 * Math.cos(theta);
    let cz = -0.8 + 0.38 * Math.sin(theta) * Math.sin(phi);

    // Horizontal folia texture
    const folia = 1.0 + 0.05 * Math.sin(cy * 24.0);
    cx *= folia;
    cy *= folia;
    cz *= folia;

    targetPos[idx * 3] = cx;
    targetPos[idx * 3 + 1] = cy;
    targetPos[idx * 3 + 2] = cz;

    idx++;
  }

  // 3. Brainstem (tapering stalk)
  for (let i = 0; i < stemCount; i++) {
    const t = Math.random(); // 0 at bottom, 1 at top
    const sy = -1.6 + t * 0.85;
    const r = (0.13 + 0.14 * t) * Math.sqrt(Math.random());
    const angle = Math.random() * 2 * Math.PI;

    targetPos[idx * 3] = r * Math.cos(angle);
    targetPos[idx * 3 + 1] = sy;
    targetPos[idx * 3 + 2] = -0.3 + r * Math.sin(angle);

    idx++;
  }

  // Generate initial scattered positions in outer sphere (radius 15-20 units)
  for (let i = 0; i < count; i++) {
    const radius = 15.0 + Math.random() * 5.5;
    const u = Math.random();
    const v = Math.random();
    const theta = Math.acos(2 * u - 1);
    const phi = v * 2 * Math.PI;

    scatterPos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
    scatterPos[i * 3 + 1] = radius * Math.cos(theta);
    scatterPos[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi);

    // Random tumble rotations
    scatterRot[i * 3] = Math.random() * Math.PI * 2;
    scatterRot[i * 3 + 1] = Math.random() * Math.PI * 2;
    scatterRot[i * 3 + 2] = Math.random() * Math.PI * 2;

    // Normal aligned target rotation with slight random perturbation
    const tx = targetPos[i * 3];
    const ty = targetPos[i * 3 + 1];
    const tz = targetPos[i * 3 + 2];
    targetRot[i * 3] = Math.atan2(ty, Math.hypot(tx, tz)) + (Math.random() - 0.5) * 0.4;
    targetRot[i * 3 + 1] = Math.atan2(tx, tz) + (Math.random() - 0.5) * 0.4;
    targetRot[i * 3 + 2] = Math.random() * Math.PI * 2;

    // Stagger delay keyed off 3D position (wave-like propagation)
    const wave = Math.sin(tx * 2.8 + ty * 2.4 + tz * 1.8);
    delays[i] = 0.4 * (0.5 + 0.5 * wave);

    // Idle shimmer parameters
    phases[i] = Math.random() * Math.PI * 2;
    scales[i] = 0.75 + Math.random() * 0.5; // ~2-4px variation
    colorIndices[i] = Math.floor(Math.random() * PALETTE_COLORS.length);
  }

  return {
    count,
    scatterPos,
    targetPos,
    scatterRot,
    targetRot,
    delays,
    phases,
    scales,
    colorIndices,
  };
}

function BrainMesh({
  data,
  prefersReducedMotion,
  isDesktop,
  isTablet,
}: {
  data: BrainPointsData;
  prefersReducedMotion: boolean;
  isDesktop: boolean;
  isTablet: boolean;
}) {
  const instancedMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const elapsedRef = useRef(0);
  const initializedRef = useRef(false);
  const isVisibleRef = useRef(true);

  // Responsive scene positioning: center-to-right axis on desktop
  const groupPosition = useMemo<[number, number, number]>(() => {
    if (isDesktop) return [1.25, 0.05, 0];
    if (isTablet) return [0.75, 0.15, 0];
    return [0, 0.35, 0];
  }, [isDesktop, isTablet]);

  const groupScale = useMemo(() => {
    if (isDesktop) return 1.05;
    if (isTablet) return 0.9;
    return 0.72;
  }, [isDesktop, isTablet]);

  // Tiny flat triangle geometry (equilateral)
  const triangleGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const s = 0.046;
    const h = s * (Math.sqrt(3) / 2);
    const vertices = new Float32Array([
      -s / 2, -h / 3, 0,
       s / 2, -h / 3, 0,
       0,      (2 * h) / 3, 0,
    ]);
    const normals = new Float32Array([
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ]);
    geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geom.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    return geom;
  }, []);

  // Handle visibility change
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Initialize instance colors and initial positions
  useEffect(() => {
    const mesh = instancedMeshRef.current;
    if (!mesh) return;

    for (let i = 0; i < data.count; i++) {
      mesh.setColorAt(i, PALETTE_COLORS[data.colorIndices[i]]);
    }
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
    initializedRef.current = false;
  }, [data]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!isVisibleRef.current) return;
    const mesh = instancedMeshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    if (prefersReducedMotion) {
      // Reduced motion: settled static configuration, no rotation, no jitter
      if (!initializedRef.current) {
        for (let i = 0; i < data.count; i++) {
          const idx3 = i * 3;
          dummy.position.set(
            data.targetPos[idx3],
            data.targetPos[idx3 + 1],
            data.targetPos[idx3 + 2]
          );
          dummy.rotation.set(
            data.targetRot[idx3],
            data.targetRot[idx3 + 1],
            data.targetRot[idx3 + 2]
          );
          const s = data.scales[i];
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        group.rotation.y = 0;
        initializedRef.current = true;
      }
      return;
    }

    // Normal motion: Convergence animation (scatter -> brain) + slow rotation + idle shimmer
    elapsedRef.current += delta;
    const elapsed = elapsedRef.current;
    const convergenceDuration = 2.4; // 2.4s convergence

    for (let i = 0; i < data.count; i++) {
      const idx3 = i * 3;
      const t = Math.max(0, elapsed - data.delays[i]);

      if (t < convergenceDuration) {
        const progress = t / convergenceDuration;
        // Cubic ease out
        const ease = 1 - Math.pow(1 - progress, 3);

        const curX =
          data.scatterPos[idx3] +
          (data.targetPos[idx3] - data.scatterPos[idx3]) * ease;
        const curY =
          data.scatterPos[idx3 + 1] +
          (data.targetPos[idx3 + 1] - data.scatterPos[idx3 + 1]) * ease;
        const curZ =
          data.scatterPos[idx3 + 2] +
          (data.targetPos[idx3 + 2] - data.scatterPos[idx3 + 2]) * ease;

        const curRx =
          data.scatterRot[idx3] +
          (data.targetRot[idx3] - data.scatterRot[idx3]) * ease;
        const curRy =
          data.scatterRot[idx3 + 1] +
          (data.targetRot[idx3 + 1] - data.scatterRot[idx3 + 1]) * ease;
        const curRz =
          data.scatterRot[idx3 + 2] +
          (data.targetRot[idx3 + 2] - data.scatterRot[idx3 + 2]) * ease;

        dummy.position.set(curX, curY, curZ);
        dummy.rotation.set(curRx, curRy, curRz);
      } else {
        // Settled state: tiny alive idle shimmer
        const idleTime = elapsed - (data.delays[i] + convergenceDuration);
        const jX = Math.sin(idleTime * 2.1 + data.phases[i]) * 0.015;
        const jY = Math.cos(idleTime * 1.8 + data.phases[i] * 1.3) * 0.015;
        const jZ = Math.sin(idleTime * 2.5 + data.phases[i] * 0.7) * 0.015;

        dummy.position.set(
          data.targetPos[idx3] + jX,
          data.targetPos[idx3 + 1] + jY,
          data.targetPos[idx3 + 2] + jZ
        );
        dummy.rotation.set(
          data.targetRot[idx3] + jX * 2,
          data.targetRot[idx3 + 1] + jY * 2,
          data.targetRot[idx3 + 2]
        );
      }

      const s = data.scales[i];
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;

    // Slow continuous ambient rotation around Y axis (~52s full rotation)
    group.rotation.y += delta * 0.12;
  });

  return (
    <group
      ref={groupRef}
      position={groupPosition}
      scale={[groupScale, groupScale, groupScale]}
    >
      <instancedMesh
        ref={instancedMeshRef}
        args={[triangleGeometry, undefined, data.count]}
        frustumCulled={false}
      >
        <meshStandardMaterial
          roughness={0.35}
          metalness={0.65}
          side={THREE.DoubleSide}
        />
      </instancedMesh>
    </group>
  );
}

export function BrainParticles() {
  const windowWidth = useSyncExternalStore(
    subscribeWindow,
    getWindowWidth,
    getServerWindowWidth
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Adaptive particle count: ~4,000 on >=1024px, ~2,000 between 640-1023px, ~900 below 640px
  const particleCount = useMemo(() => {
    if (isDesktop) return 3800;
    if (isTablet) return 2000;
    return 950;
  }, [isDesktop, isTablet]);

  const brainData = useMemo(() => {
    return generateBrainModel(particleCount);
  }, [particleCount]);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 44 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
        className="w-full h-full pointer-events-none"
      >
        <ambientLight intensity={1.1} />
        <pointLight
          position={[10, 10, 10]}
          intensity={1.8}
          color="#faf9f6"
        />
        <pointLight
          position={[-10, -5, -5]}
          intensity={1.2}
          color="#c9a227"
        />
        <pointLight
          position={[5, -8, 8]}
          intensity={0.9}
          color="#1a7a7a"
        />
        <BrainMesh
          data={brainData}
          prefersReducedMotion={prefersReducedMotion}
          isDesktop={isDesktop}
          isTablet={isTablet}
        />
      </Canvas>
    </div>
  );
}
