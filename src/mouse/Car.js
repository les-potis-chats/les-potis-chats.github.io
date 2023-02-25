import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { objsManager } from "../objsManager";
import { useControls } from "../useControls";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";

export function Car() {
  // thanks to the_86_guy!
  // https://sketchfab.com/3d-models/low-poly-car-muscle-car-2-ac23acdb0bd54ab38ea72008f3312861
  let result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/car.glb"
  ).scene;

  const position = [0, 0.1, 0];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null),
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null),
  );

  useControls(vehicleApi, chassisApi);

  useFrame((state) => {

    let position = new Vector3(0,0,0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let hitobj = false;

    for (let i = 0; i < objsManager.objs.length; i++) {
      const obj = objsManager.objs[i];
      if(Math.abs(position.x - obj.position[0]) < 0.2 && Math.abs(position.z - obj.position[2]) < 0.2) {
        hitobj = obj;
      }      
    }

    if(hitobj !== false) {

      if(hitobj.type === 'portal') { // type portal
        let portal = objsManager.objs.filter((e) => { //find portal
          return e.type === 'portal' && e.id != hitobj.id;
        })
        if(portal.length) {
          chassisApi.position.set(portal[0].position[0], portal[0].position[1], portal[0].position[2]);
        }
      }

      objsManager.remove(hitobj.id);

    }

    // console.log(objsManager.objs);

  });

  useEffect(() => {
    if (!result) return;

    let mesh = result;
    mesh.scale.set(0.002, 0.002, 0.002);

    mesh.children[0].position.set(-365, -18, -67);
  }, [result]);

  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive object={result} rotation-y={Math.PI} position={[0, -0.09, 0]}/>
      </group>
      
      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}

      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
