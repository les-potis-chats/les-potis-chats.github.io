/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 pot4.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { ColliderBox } from './ColliderBox'

export function Pot4(props) {
  const { nodes, materials } = useGLTF('/models/pot4.glb')
  return <>
    <ColliderBox position={props.position} scale={[0.6, 0.9, 0.6]} dpos={[-0.15, 0, 0.11]} />
    <group {...props} scale={0.15} dispose={null}>
      <group position={[0, 1, 0]}>
        <mesh geometry={nodes.Cube_1.geometry} material={materials['Material.003']} />
        <mesh geometry={nodes.Cube_2.geometry} material={materials['Material.005']} />
      </group>
      <mesh geometry={nodes.Cube001.geometry} material={materials['Material.002']} position={[0.02, 1.72, -0.08]} />
      <mesh geometry={nodes.Icosphere.geometry} material={materials['Material.001']} position={[0.53, 3.47, 0.22]} rotation={[-0.14, -0.13, 0.22]} />
    </group>
  </>
}

useGLTF.preload('/models/pot4.glb')
