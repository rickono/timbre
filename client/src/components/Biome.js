import React from 'react';
import Terrain from './Terrain';
import { PointerLockControls, Stars, Sky, OrbitControls } from 'drei';
import SimplexNoise from 'simplex-noise';
import Lights from './Lights';
import { Canvas } from 'react-three-fiber';
import biomes from '../helpers/biomes';
import Player from './Player';
const Biome = ({
  wrapGetHeightAt,
  wrapCreateMap,
  DIVISIONS,
  SIDE_LENGTH,
  biome,
}) => {
  //could provide a seed
  const simplex = new SimplexNoise();
  const {
    colors,
    colorThresholds,
    freqs,
    amps,
    sqThresh,
    finalScaleAndThresh,
    fog,
    ambientLight,
    directionalLight,
    treeInfo,
    cloudInfo,
    rockInfo,
    skyInfo: { stars, timeOfDay },
  } = biome;
  const { directionalColor, directionalIntensity } = directionalLight;
  const { isFog, fogColor, fogNear, fogFar } = fog;
  const { ambientColor, ambientIntensity } = ambientLight;
  const { cloudNumber, cloudColors, cloudRange } = cloudInfo;
  const { treeNumber, treeLeafColor, treeTrunkColor, treeRange } = treeInfo;
  const { rockNumber, rockColors, rockRange } = rockInfo;

  const createMap = wrapCreateMap(
    freqs,
    amps,
    sqThresh,
    finalScaleAndThresh,
    simplex
  );
  const getHeightAt = wrapGetHeightAt(createMap);
  return (
    <Canvas
      shadowMap
      colorManagement
      camera={{ position: [30, 30, 30], fov: 60 }}
    >
      {isFog && <fog attach='fog' args={[fogColor, fogNear, fogFar]} />}
      <Terrain
        args={[SIDE_LENGTH, SIDE_LENGTH, DIVISIONS, DIVISIONS]}
        createMap={createMap}
        getHeightAt={getHeightAt}
        colors={colors}
        colorThresholds={colorThresholds}
        rockColors={rockColors}
        rockNumber={rockNumber}
        rockRange={rockRange}
        treeLeafColors={treeLeafColor}
        treeTrunkColors={treeTrunkColor}
        treeNumber={treeNumber}
        treeRange={treeRange}
        cloudColors={cloudColors}
        cloudNumber={cloudNumber}
        cloudRange={cloudRange}
      />
      <PointerLockControls />
      {/* <OrbitControls /> */}
      <Lights
        directionalColor={directionalColor}
        directionalIntensity={directionalIntensity}
        ambientColor={ambientColor}
        ambientIntensity={ambientIntensity}
      />
      {stars && (
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={3000} // Amount of stars (default=5000)
          factor={12} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
      )}
      {/* <Water /> */}
      {timeOfDay === 'sunset' ? (
        <Sky
          distance={45000} // Camera distance (default=450000)
          azimuth={0.3719} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
          turbidity={6}
          rayleigh={3}
          mieCoefficient={0.01}
          mieDirectionalG={0.9999}
          inclination={0.5005}
          exposure={0.4}
        />
      ) : timeOfDay === 'day' ? (
        <Sky
          distance={45000} // Camera distance (default=450000)
          azimuth={0.3719} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
          turbidity={6}
          rayleigh={0.4}
          mieCoefficient={0.01}
          mieDirectionalG={0.9999}
          inclination={0.56}
          exposure={0.1}
        />
      ) : null}
      <Player getHeightAt={getHeightAt} SIDE_LENGTH={SIDE_LENGTH} />
    </Canvas>
  );
};

export default Biome;
