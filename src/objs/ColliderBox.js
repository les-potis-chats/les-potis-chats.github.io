import { useBox } from "@react-three/cannon";

const debug = true;

export function ColliderBox({ position, scale, dpos, rotation }) {
  useBox(() => ({
    args: scale,
    position : [position[0] + dpos[0], position[1] + dpos[1], position[2] + dpos[2]],
    type: "Static",
    rotation,
  }));

  return (
    debug && (
      <mesh rotation={rotation} position={[position[0] + dpos[0], position[1] + dpos[1], position[2] + dpos[2]]}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
}
