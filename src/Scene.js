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
import { CatUp } from "./objs/CatUp";
import { CatDown } from "./objs/CatDown";
import { Objs } from "./objs/Objs";
import { Ground } from "./map/Ground";
import { Bounds } from "./map/Bounds";
import { Stats } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { objsManager } from "./objsManager";
import { useImmer } from "use-immer";
import { StateManager } from "./stateManager";
import { Cylinder } from "./map/Cylinder";
import { Cheese } from "./objs/Cheese";
import { Portal } from "./objs/Portal";
import { Ball } from "./objs/Ball";
import { Rake } from "./objs/Rake";
import { StickLong } from "./objs/StickLong";
import { StickShort } from "./objs/StickShort";
import { Rock1 } from "./objs/Rock1";
import { Rock2 } from "./objs/Rock2";
import { Pot1 } from "./objs/Pot1";
import { Pot2 } from "./objs/Pot2";
import { Pot3 } from "./objs/Pot3";
import { Pot4 } from "./objs/Pot4";

export function Scene() {

  const fontProps = { font: '/fonts/PaytoneOne-Regular.ttf', fontSize: 0.5 }

  const [objs, setObjs] = useImmer([]);
  const [timer, setTimer] = useImmer(-1);
  const [text, setText] = useImmer('Jouer !');

  const [catDown, setCatDown] = useImmer(true);

  const [catR, setCatR] = useImmer(Math.PI / 2);
  const [catFollow, setCatFollow] = useImmer(false);

  const [gameMode, setGameMode] = useImmer('intro');

  const textRef = useRef();
  const catRef = useRef();

  useEffect(() => {
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

  function launchCat() {
    let rand = (Math.floor(Math.random() * 10) + 5); // 5 - 15
    if(timer - rand < 0) {
      setTimeout(() => triggerCat(), rand * 1000);
    }
  }

  function triggerCat() {
    setText('!');
    setTimeout(() =>  {
      StateManager.gameMode = 'pause';
      WatchCat();
    }, 2000)
  }

  function WatchCat() {

    //anim cat
    setCatDown(false);

    let trigger = false;

    console.log(StateManager.deltaPosition.x, StateManager.deltaPosition.z);

    if(StateManager.deltaPosition.x > 0.005 || StateManager.deltaPosition.z > 0.005) {
      trigger = true;
    }

    if(!trigger) {
      setTimeout(() =>  {
        setCatDown(true);
        StateManager.gameMode = 'play';
        setText('');
        launchCat();
      }, 2000)
    }else {
      setCatFollow(true);
      gameover();
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
    objsManager.generateLevel(StateManager.level);
    objsManager.triggerCallback();
    setText('Niveau ' + StateManager.level);
    StateManager.gameMode = 'play';
    setTimeout(() => setText(''), 2000);
    if(StateManager.level === 17) {
      StateManager.level = 1;
    }else {
      StateManager.level = StateManager.level + 1;
    }
    launchCat();
    setCatFollow(false);
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

    if(catRef.current) {
      if(catFollow) {
        let angle = Math.atan(StateManager.carPosition.x / StateManager.carPosition.z);
        angle += StateManager.carPosition.z > 0 ? Math.PI : 0;
        angle -= Math.PI / 2;
        catRef.current.rotation.y = angle; 
      }else {
        catRef.current.rotation.y = Math.PI / 2;
      }
    }    

  })

  return (
    <Suspense fallback={null}>
      {/* <OrbitControls position={[-2.34, 3.15, -4.07]} enablePan={false} /> */}
      <OrbitControls position={[-2.34, 3.15, -4.07]} />
      {/* <PerspectiveCamera makeDefault position={cameraPosition} fov={40} /> */}
      {/* <Stats /> */}
      {/* <axesHelper args={[0.5]} position={[0, 0.5, 0]} /> */}

      {/* <arrowHelper position={[0, 0.1, -5]} ref={ref} /> */}
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <Bounds />

      <Ground />
      {/* <Track /> */}
      <Car />

      <Objs />


      {/* cat */}
      <mesh ref={catRef}>
        <CatUp visible={!catDown} position={[0, 0.7, 0]} rotation-y={catR} scale={0.3} />
        <CatDown visible={catDown} position={[0, 0.7, 0]} rotation-y={catR} scale={0.3} />
      </mesh>

      {/* <Cheese castShadow receiveShadow position={[0, 0, 5]} />
      <Portal castShadow receiveShadow position={[0, 0, 5]} /> */}

      {/* Cheese */}
      {objs.map((obj, index) =>
        <mesh key={index}>
          {(obj.type === 'food') && <Cheese castShadow receiveShadow position={obj.position} /> }

          {(obj.type === 'portal') && <Portal castShadow receiveShadow position={obj.position} /> }

          {(obj.type === 'block' && obj.blockId === 0) && <Rock1 position={obj.position} /> }
          {(obj.type === 'block' && obj.blockId === 1) && <Rock2 position={obj.position} /> }
          {(obj.type === 'block' && obj.blockId === 2) && <Pot1 position={obj.position} /> }
          {(obj.type === 'block' && obj.blockId === 3) && <Pot2 position={obj.position} /> }
          {(obj.type === 'block' && obj.blockId === 4) && <Pot3 position={obj.position} /> }
          {(obj.type === 'block' && obj.blockId === 5) && <Pot4 position={obj.position} /> }
          {(obj.type === 'block' && obj.blockId === 6) && <Rake position={obj.position} /> }
          {(obj.type === 'block' && obj.blockId === 7) && <StickLong position={obj.position} /> }
          {(obj.type === 'block' && obj.blockId === 8) && <StickShort position={obj.position} /> }

        </mesh>
      )}
      <Cylinder />

      <Ball position={objsManager.randomBall()} />

      {(timer > -1) && <>
        <Text color={timer > 5 ? 'black' : 'red'} rotation-y={Math.PI / 4} position={[0.52, 0.3, 0.52]} anchorX="center" anchorY="middle" {...fontProps}>{timer}</Text>
        <Text color={timer > 5 ? 'black' : 'red'} rotation-y={5 * Math.PI / 4} position={[-0.52, 0.3, -0.52]} anchorX="center" anchorY="middle" {...fontProps}>{timer}</Text>
        <Text color={timer > 5 ? 'black' : 'red'} rotation-y={3 * Math.PI / 4} position={[0.52, 0.3, -0.52]} anchorX="center" anchorY="middle" {...fontProps}>{timer}</Text>
        <Text color={timer > 5 ? 'black' : 'red'} rotation-y={7 * Math.PI / 4} position={[-0.52, 0.3, 0.52]} anchorX="center" anchorY="middle" {...fontProps}>{timer}</Text>
      </> }

      {(text !== '') && 
        <mesh ref={textRef} onClick={(e) => handleClick()}>
          <Center position={[0, 2, 0]}>
            <Text3D position={[0, 2, 0]} scale={0.5} rotation={[0.1, 0, 0]} font={'/fonts/Paytone One_Regular.json'} bevelEnabled bevelSize={0.05}>
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
