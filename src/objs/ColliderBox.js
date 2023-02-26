import { useBox } from "@react-three/cannon";

const debug = true;

export function ColliderBox({ position, scale, dpos }) {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return (
    debug && (
      <mesh position={[position[0] + dpos[0], position[1] + dpos[1], position[2] + dpos[2]]}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
}
