import React from 'react';
import { Box } from 'drei';

const Lights = ({
  directionalColor,
  directionalIntensity,
  ambientColor,
  ambientIntensity,
}) => {
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
      /> */}
      {/* <Box args={[5, 5, 5]} position={[-100, 100, 200]} /> */}
      <directionalLight
        castShadow
        color={directionalColor}
        position={[-25, -10, 10]}
        intensity={directionalIntensity * 0.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        castShadow
        color={directionalColor}
        position={[25, 0, 10]}
        intensity={directionalIntensity}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight color={ambientColor} intensity={ambientIntensity * 0.8} />
    </>
  );
};

export default Lights;
