import {
  Center,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Text,
  Text3D
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Car } from "./mouse/Car";
import { Cat } from "./objs/Cat";
import { Ground } from "./map/Ground";
import { Stats } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { objsManager } from "./objsManager";
import { useImmer } from "use-immer";
import { StateManager } from "./stateManager";

export function Scene() {

  const fontProps = { font: '/fonts/Inter-Medium.ttf', fontSize: 0.5 }

  const [objs, setObjs] = useImmer([]);
  const [timer, setTimer] = useImmer(-1);
  const [text, setText] = useImmer('Jouer !');

  const [gameMode, setGameMode] = useImmer('intro');

  const textRef = useRef();

  useEffect(() => {
    objsManager.generateLevel();
    objsManager.addCallback(updateObjs);
    setObjs(objsManager.objs);
    setInterval(updateTimer, 1000);
  }, [])

  function updateObjs() { // hit objects
    setObjs(objsManager.objs);
    let objs = objsManager.objs.filter((e) => {
      return e.type === 'food'
    });
    if(StateManager.gameMode === 'play') {
      if(objs.length === 0) {
        resetTimer();
        StateManager.gameMode = 'success';
        objsManager.clear();
        setText('Bravo');
        setTimeout(() => playLevel(), 2000);
      }
    }
  }

  function updateTimer() {
    if(StateManager.gameMode === 'play') {
      setTimer((timer) => {
        let re = timer - 1;
        if(timer === -1) {gameover()}
        return re;
      });
    }
  }

  function gameover() {
    StateManager.gameMode = 'gameover';
    setText('Game over ! Retry ?');
    StateManager.level = 1;
  }

  function handleClick() {
    if(StateManager.gameMode === 'intro') {
      resetTimer();
      playLevel();
    }else if(StateManager.gameMode === 'gameover') {
      resetTimer()
      playLevel();
    }
  }

  function resetTimer() {
    setTimer(60);
  }

  function playLevel() {
    setText('Niveau ' + StateManager.level);
    StateManager.gameMode = 'play';
    setTimeout(() => setText(''), 2000);
    StateManager.level = StateManager.level + 1;
  }

  useFrame((state, delta) => {
    if(textRef.current) {
      textRef.current.rotation.x = state.camera.rotation.x;
      textRef.current.rotation.y = state.camera.rotation.y;
      textRef.current.rotation.z = state.camera.rotation.z;
    }

    if(state.camera.position.y < 1.45) {
      state.camera.position.y = 1.45;
    }

    console.log(state.camera.position);

  })

  return (
    <Suspense fallback={null}>
      <OrbitControls position={[-2.34, 3.15, -4.07]} enablePan={false} />
      {/* <PerspectiveCamera makeDefault position={cameraPosition} fov={40} /> */}
      <Stats />
      {/* <axesHelper args={[0.5]} position={[0, 0.5, 0]} /> */}

      {/* <arrowHelper position={[0, 0.1, -5]} ref={ref} /> */}
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <Ground />
      {/* <Track /> */}
      <Car />

      <Cat position={[0, 0.7, 0]} rotation-y={Math.PI / 2} scale={0.3} />

      {/* cat */}

      {objs.map((obj, index) =>
        <mesh castShadow receiveShadow key={index} position={obj.position}>
          <boxGeometry args={obj.args} />
          <meshStandardMaterial color={obj.color} />
        </mesh>
      )}
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1, 1, 0.5, 4]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>

      {(timer > -1) && <>
        <Text color={timer > 5 ? 'black' : 'red'} rotation-y={Math.PI / 4} position={[0.52, 0.25, 0.52]} anchorX="center" anchorY="middle" {...fontProps}>{timer}</Text>
        <Text color={timer > 5 ? 'black' : 'red'} rotation-y={5 * Math.PI / 4} position={[-0.52, 0.25, -0.52]} anchorX="center" anchorY="middle" {...fontProps}>{timer}</Text>
        <Text color={timer > 5 ? 'black' : 'red'} rotation-y={3 * Math.PI / 4} position={[0.52, 0.25, -0.52]} anchorX="center" anchorY="middle" {...fontProps}>{timer}</Text>
        <Text color={timer > 5 ? 'black' : 'red'} rotation-y={7 * Math.PI / 4} position={[-0.52, 0.25, 0.52]} anchorX="center" anchorY="middle" {...fontProps}>{timer}</Text>
      </> }

      {(text !== '') && 
        <mesh ref={textRef} onClick={(e) => handleClick()}>
          <Center position={[0, 2, 0]}>
            <Text3D position={[0, 2, 0]} scale={0.5} rotation={[0.1, 0, 0]} font={'/fonts/helvetiker_regular.typeface.json'} bevelEnabled bevelSize={0.05}>
              {text}
              <meshNormalMaterial />
            </Text3D>
          </Center>
        </mesh>
      }

      {/* shape */}
      {/* <mesh position={[0, 0.1, 0]} rotation-x={-Math.PI * 0.5}>
        <shapeGeometry args={[shape()]}/>
        <meshStandardMaterial color={'red'} />
      </mesh> */}

      {/* <pointLight position={[0, 1, -5]}/> */}


    </Suspense>
  );
}
