import React from 'react';

const Lights = ({
  directionalColor,
  directionalIntensity,
  ambientColor,
  ambientIntensity,
}) => {
  return (
    <>
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
