import React, { useRef } from 'react';
import { MeshWobbleMaterial } from 'drei';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import Montserrat from '../helpers/Montserrat_Regular.json';

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
      <pointLight position={[0, 5, 10]} intensity={0.8} />
      <pointLight position={[4, 2, 6]} intensity={1} />
      <ambientLight intensity={1} />
    </>
  );
};

export default Loading;
