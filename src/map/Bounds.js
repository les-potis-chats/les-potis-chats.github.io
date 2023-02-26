import { ColliderBox } from "../objs/ColliderBox";
import { useEffect } from "react";
import { useImmer } from "use-immer";

export function Bounds() {
  const [border, setBorder] = useImmer([]);

  useEffect(() => {

    let pos = [];
    let index = 0;

    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 16) {
      const angle = i;
      let radius =  6.5;
      let opposite = Math.cos(angle) * radius;
      let adjacent = Math.sin(angle) * radius;
      pos.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rot : Math.atan(opposite / adjacent),
      })    
    }

    setBorder(pos);
  }, [])

  return <>

    {/* Border */}
    
    {border.map((box, index) =>
      <mesh key={index}>
        <ColliderBox position={[box.x, 0.5, box.y]} scale={[1, 1, 1]} dpos={[0.0, 0.0, 0.0]} rotation={[0.0, box.rot, 0.0]}/>
      </mesh>
    )}
  </>
}
