import React from 'react';
import { Box } from 'drei';

const Lights = () => {
  return (
    <>
      {/* <pointLight
        position={[0, 200, 30]}
        intensity={30}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-near={1}
        shadow-camera-left={-10}
        shadow-camera-right={20}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        // shadow-radius={30}
        castShadow
      />
      <pointLight
        position={[0, 100, 200]}
        intensity={0.3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-near={1}
        shadow-camera-left={-10}
        shadow-camera-right={20}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        // shadow-radius={30}
        castShadow
      /> */}
      <directionalLight
        castShadow
        color={'orange'}
        position={[25, 0, 10]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight color={'papayawhip'} intensity={0.2} />
    </>
  );
};

export default Lights;
