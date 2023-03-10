/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 stick_long_export.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import { ColliderBox } from './ColliderBox'

export function StickLong(props) {
  const { nodes, materials } = useGLTF('/models/stickLong.glb')
  return<>
    {<ColliderBox position={props.position} scale={[0.22, 0.9, 1.8]} dpos={[0.23, 0, -.8]} />}
    <mesh {...props}>
      <group scale={.08} dispose={null}>
        <mesh geometry={nodes.stick_long.geometry} material={materials['Material.001']} position={[2.68, 1.02, 0]} rotation={[0, Math.PI / 2, 0]} />
      </group>
    </mesh>
    </>
}

useGLTF.preload('models/stickLong.glb')
