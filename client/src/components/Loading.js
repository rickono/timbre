import React, { useRef } from 'react';
import { MeshWobbleMaterial } from 'drei';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import Montserrat from '../helpers/Montserrat_Regular.json';

const Loading = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <>
      <mesh position={[0, 0, 0]} ref={mesh}>
        {/* We create a cube here, and we have to define geometry and material */}
        {/* <circleBufferGeometry attach='geometry' args={[1,20]} /> */}
        <boxBufferGeometry attach='geometry' args={[5, 5, 5]} />
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
