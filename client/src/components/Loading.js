import React, { useRef } from 'react';
import { MeshWobbleMaterial } from 'drei';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import Montserrat from '../helpers/Montserrat_Regular.json';
import Cloud from "./clouds/Cloud"
import clouds from "./clouds/Clouds"

const Loading = () => {
  const mesh = useRef(null);

  return (
    <>
      <mesh position={[-20, 60, -20]} ref={mesh}>
        <boxBufferGeometry attach='geometry' args={[10, 10, 10]} />
        <MeshWobbleMaterial
          attach='material'
          color='#1db954'
          speed={2}
          factor={0.6}
        />
      </mesh>
      <pointLight position={[-20, 65, -10]} intensity={0.8} color={"blue"}/>
      <pointLight position={[-16, 62, -14]} intensity={1} color={"papayawhip"}/>
      <ambientLight intensity={1} />
    </>
  );
};

export default Loading;
