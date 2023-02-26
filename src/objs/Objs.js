import { Rock1 } from "./Rock1";
import { Rock2 } from "./Rock2";
import { Pot1 } from "./Pot1";
import { Pot2 } from "./Pot2";
import { Pot3 } from "./Pot3";
import { Pot4 } from "./Pot4";
import { Tree1 } from "./Tree1";
import { Tree2 } from "./Tree2";
import { Tree3 } from "./Tree3";
import { Tree4 } from "./Tree4";
import { Tree5 } from "./Tree5";
import { Tree6 } from "./Tree6";
import { Ball } from "./Ball";
import { Rake } from "./Rake";
import { StickLong } from "./StickLong";
import { StickShort } from "./StickShort";
import { useEffect } from "react";
import { useImmer } from "use-immer";

export function Objs(props) {
  const [border, setBorder] = useImmer([]);

  useEffect(() => {
    let pos = [];
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 30) {
      const angle = i;
      let rand = Math.random();
      let index = Math.floor(Math.random() * 6);
      let radius = (Math.floor(Math.random() * 20) + 70) / 10; //return beetween 7 and 9
      if(rand < 0.7) {
        pos.push({
          x: Math.cos(angle) * radius + Math.random() * 2 - 1,
          y: Math.sin(angle) * radius + Math.random() * 2 - 1,
          rot : Math.random() * 2 * Math.PI,
          index : index
        })
      }      
    }
    setBorder(pos);
  }, []);

  return <>
    {/* <Rock1 position={[-1.5, 0.0, 1.5]} />
    <Rock2 position={[1.5, 0.0, 1.5]} />
    <Pot1 position={[3, 0.0, 1.5]} />
    <Pot2 position={[3, 0.0, 3]} />
    <Pot3 position={[3, 0.0, -1.5]} />
    <Pot4 position={[3, 0.0, -3]} />
    <Ball position={[2, 0.0, -2]} />
    <Rake position={[2, 0.0, 0.0]} />
    <StickLong position={[-2,0,-2]} />
    <StickShort position={[-3,0,3]} /> */}



    {/* Border */}
    {border.map((tree, index) =>
      <mesh key={index}>
        {(tree.index === 0) && <Tree1 position={[tree.x, 0.0, tree.y]} rotation-y={tree.rot} /> }
        {(tree.index === 1) && <Tree2 position={[tree.x, 0.0, tree.y]} rotation-y={tree.rot} /> }
        {(tree.index === 2) && <Tree3 position={[tree.x, 0.0, tree.y]} rotation-y={tree.rot} /> }
        {(tree.index === 3) && <Tree4 position={[tree.x, 0.0, tree.y]} rotation-y={tree.rot} /> }
        {(tree.index === 4) && <Tree5 position={[tree.x, 0.0, tree.y]} rotation-y={tree.rot} /> }
        {(tree.index === 5) && <Tree6 position={[tree.x, 0.0, tree.y]} rotation-y={tree.rot} /> }
      </mesh>
    )}
  </>
}
