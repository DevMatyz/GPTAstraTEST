import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  reduced: boolean;
  interactive?: boolean;
  rotation?: number;
  onIngredient?: (name: string) => void;
};

const toppings = Array.from({ length: 12 }, (_, i) => {
  const angle = i * 2.39996;
  const radius = Math.sqrt((i + 1) / 13) * 1.35;
  return {
    x: Math.cos(angle) * radius,
    z: Math.sin(angle) * radius,
    angle,
  };
});

function Pizza({
  reduced,
  interactive,
  rotation = 0,
  onIngredient,
}: Props) {
  const root = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);
  const elapsed = useRef(0);

  useFrame(({ pointer, clock }, delta) => {
    if (!root.current) return;

    if (!reduced && !interactive) elapsed.current += delta * 0.065;

    const targetY =
      rotation + elapsed.current + (!reduced ? pointer.x * 0.13 : 0);

    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      targetY,
      4,
      delta,
    );

    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      !reduced ? pointer.y * 0.055 : 0,
      4,
      delta,
    );

    if (glow.current && !reduced) {
      glow.current.intensity = 28 + Math.sin(clock.elapsedTime * 1.7) * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#fff4dd", "#382313", 1.4]} />
      <directionalLight position={[3, 7, 3]} intensity={3.5} color="#ffdfaf" />
      <pointLight ref={glow} position={[-4, 2, -2]} color="#ff762e" intensity={28} />
      <pointLight position={[4, 4, 1]} color="#fff5da" intensity={16} />

      <group ref={root}>
        {/* Wooden pizza peel */}
        <mesh position={[0, -0.24, 0]}>
          <cylinderGeometry args={[2.25, 2.25, 0.12, 64]} />
          <meshStandardMaterial color="#5d3924" roughness={0.92} />
        </mesh>
        <mesh position={[0, -0.24, 2.65]} rotation={[0, 0, 0.025]}>
          <boxGeometry args={[0.55, 0.13, 2.4]} />
          <meshStandardMaterial color="#68402a" roughness={0.92} />
        </mesh>

        {/* The base and irregular hand-shaped cornicione */}
        <mesh>
          <cylinderGeometry args={[1.88, 1.83, 0.19, 80]} />
          <meshStandardMaterial color="#c98238" roughness={0.85} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
          <torusGeometry args={[1.73, 0.225, 14, 80]} />
          <meshStandardMaterial color="#d69b53" roughness={0.86} />
        </mesh>
        {Array.from({ length: 34 }, (_, i) => {
          const angle = (i / 34) * Math.PI * 2;
          const bump = 0.92 + Math.sin(i * 3.3) * 0.15;
          return (
            <mesh
              key={`crust-${i}`}
              position={[Math.cos(angle) * 1.72, 0.12, Math.sin(angle) * 1.72]}
              scale={[0.3 * bump, 0.2 * bump, 0.28]}
            >
              <sphereGeometry args={[1, 10, 8]} />
              <meshStandardMaterial color={i % 6 === 0 ? "#a4612b" : "#d49a51"} roughness={0.9} />
            </mesh>
          );
        })}

        <mesh position={[0, 0.105, 0]}>
          <cylinderGeometry args={[1.57, 1.57, 0.035, 64]} />
          <meshStandardMaterial color="#a72d18" roughness={0.46} />
        </mesh>

        {/* Melted mozzarella */}
        {toppings.map(({ x, z, angle }, i) => (
          <group key={`cheese-${i}`} position={[x, 0.15, z]} rotation={[0, angle, 0]}>
            <mesh
              scale={[0.35, 0.047, 0.25]}
              onPointerOver={(e) => {
                e.stopPropagation();
                onIngredient?.("Fior di Latte");
              }}
            >
              <sphereGeometry args={[1, 16, 10]} />
              <meshStandardMaterial color="#f3df9d" roughness={0.39} />
            </mesh>
            <mesh position={[0.09, 0.032, 0.035]} scale={[0.11, 0.009, 0.065]}>
              <sphereGeometry args={[1, 10, 6]} />
              <meshStandardMaterial color="#b77728" roughness={0.75} />
            </mesh>
          </group>
        ))}

        {/* Tomato pieces */}
        {toppings.filter((_, i) => i % 2 === 0).map(({ x, z, angle }, i) => (
          <mesh
            key={`tomato-${i}`}
            position={[x * 0.8 + 0.13, 0.17, z * 0.9 - 0.17]}
            rotation={[0, angle, 0]}
            scale={[0.21, 0.05, 0.13]}
            onPointerOver={(e) => {
              e.stopPropagation();
              onIngredient?.("San Marzano");
            }}
          >
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial color="#ca3e21" roughness={0.36} />
          </mesh>
        ))}

        {/* Basil leaves */}
        {toppings.filter((_, i) => i % 3 === 0).map(({ x, z, angle }, i) => (
          <group
            key={`basil-${i}`}
            position={[x * 0.87, 0.25, z * 0.87]}
            rotation={[0.1, angle, 0.12]}
          >
            <mesh
              scale={[0.14, 0.028, 0.3]}
              onPointerOver={(e) => {
                e.stopPropagation();
                onIngredient?.("Fresh basil");
              }}
            >
              <sphereGeometry args={[1, 14, 8]} />
              <meshStandardMaterial color="#3a612b" roughness={0.65} />
            </mesh>
            <mesh position={[0, 0.027, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.007, 0.009, 0.47, 5]} />
              <meshStandardMaterial color="#729044" />
            </mesh>
          </group>
        ))}

        {/* Leopard spotting */}
        {Array.from({ length: 58 }, (_, i) => {
          const angle = i * 2.39996;
          const radius = 1.68 + Math.sin(i * 9.1) * 0.16;
          return (
            <mesh
              key={`char-${i}`}
              position={[
                Math.cos(angle) * radius,
                0.3 + Math.cos(i * 3) * 0.027,
                Math.sin(angle) * radius,
              ]}
              scale={[0.027 + (i % 4) * 0.017, 0.007, 0.028 + (i % 3) * 0.014]}
            >
              <sphereGeometry args={[1, 7, 5]} />
              <meshStandardMaterial color={i % 3 === 0 ? "#322116" : "#73421f"} roughness={1} />
            </mesh>
          );
        })}
      </group>
    </>
  );
}

export default function Scene(props: Props) {
  return (
    <Canvas
      camera={{ position: [0, 5.4, 5.9], fov: 43 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={props.reduced ? "demand" : "always"}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      fallback={<div className="webgl-message">Handcrafted. From every angle.</div>}
      aria-hidden="true
