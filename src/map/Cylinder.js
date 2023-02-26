import { useCylinder } from "@react-three/cannon";
import { useRef } from "react";

export function Cylinder() {

  const args = [1, 1, 0.5, 4]

  const [ref] = useCylinder(
    () => ({
      args,
      mass: 10000,
      position: [0, 0.25, 0],
    }),
    useRef(null),
  )

  return (
    <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
}
