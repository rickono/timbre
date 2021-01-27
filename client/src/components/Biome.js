import React, { useState } from 'react';
import Terrain from './Terrain';
import { PointerLockControls, Stars, Sky } from 'drei';
import SimplexNoise from 'simplex-noise';
import Lights from './Lights';
import { generateSettings } from '../helpers/utils';
import Player from './Player';
import Effects from './Effects';
import Songs from './Songs';

// This component contains all of the information for making the landscape, including terrain, colors, and light.
const Biome = ({ DIVISIONS, SIDE_LENGTH, mood, seed, songs, playerId }) => {
  const [simplex, setSimplex] = useState(new SimplexNoise(seed));
  const [glitch, setGlitch] = useState(false);
  const [settings, setSettings] = useState(generateSettings(mood));

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
  } = settings;

  const { directionalColor, directionalIntensity } = directionalLight;
  const { isFog, fogColor, fogNear, fogFar } = fog;
  console.log(fogColor)
  const { ambientColor, ambientIntensity } = ambientLight;
  const { cloudNumber, cloudColors, cloudRange } = cloudInfo;
  const { treeNumber, treeLeafColor, treeTrunkColor, treeRange } = treeInfo;
  const { rockNumber, rockColors, rockRange } = rockInfo;

  const changeScene = () => {
    setGlitch(true);
    setTimeout(() => {
      const randMood = Math.random() < 0.5 ? 'happy' : 'chill';
      setSimplex(new SimplexNoise(Math.random()));
      setSettings(generateSettings(randMood));
    }, 1000);
    setTimeout(() => {
      setGlitch(false);
    }, 1000);
  };

  const createMap = (x, z) => {
    let height = 0;
    freqs.forEach((freq, i) => {
      height +=
        simplex.noise2D(x * freq, z * freq) * amps[i] > sqThresh[i]
          ? Math.pow(simplex.noise2D(x * freq, z * freq) * amps[i], 2)
          : simplex.noise2D(x * freq, z * freq) * amps[i];
    });
    return height > finalScaleAndThresh[0]
      ? height * finalScaleAndThresh[1] + finalScaleAndThresh[2]
      : height + finalScaleAndThresh[2];
  };

  const getHeightAt = (x, z) => {
    // This function gets the y value of the terrain at a certain (x,z) position.

    const length = SIDE_LENGTH / DIVISIONS;
    const floorX = Math.floor(x / length) * length;
    const floorZ = Math.floor(z / length) * length;
    const ceilX = Math.ceil(x / length) * length;
    const ceilZ = Math.ceil(z / length) * length;
    const distFloors = Math.sqrt(
      Math.pow(floorX - x, 2) + Math.pow(floorZ - z, 2)
    );
    const distCeils = Math.sqrt(
      Math.pow(ceilX - x, 2) + Math.pow(ceilZ - z, 2)
    );

    const points = [
      [ceilX, createMap(ceilX, floorZ), floorZ],
      [floorX, createMap(floorX, ceilZ), ceilZ],

      //distance between these vectos and choose the smaller
      distFloors > distCeils
        ? [ceilX, createMap(ceilX, ceilZ), ceilZ]
        : [floorX, createMap(floorX, floorZ), floorZ],
    ];

    // Get two vectors on the plane
    const v1 = [
      points[0][0] - points[1][0],
      points[0][1] - points[1][1],
      points[0][2] - points[1][2],
    ];
    const v2 = [
      points[0][0] - points[2][0],
      points[0][1] - points[2][1],
      points[0][2] - points[2][2],
    ];

    // Get cross product of two vectors
    const norm = [
      [v1[1] * v2[2] - v1[2] * v2[1]],
      [v1[2] * v2[0] - v1[0] * v2[2]],
      [v1[0] * v2[1] - v1[1] * v2[0]],
    ];

    // Dot product of normal and vector to the point should be 0, so
    // norm[0]*(points[0][0]-x) + norm[1]*(points[0][1]-y) + norm[2]*(points[0][2]-z) = 0

    return (
      (norm[0] * (points[0][0] - x) + norm[2] * (points[0][2] - z)) / norm[1] +
      points[0][1]
    );
  };

  return (
    <>
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
      <Effects glitch={glitch} />
      <Player getHeightAt={getHeightAt} SIDE_LENGTH={SIDE_LENGTH} />
      <Songs
        songs={songs}
        getHeightAt={getHeightAt}
        playerId={playerId}
        changeScene={changeScene}
      />
    </>
  );
};

export default Biome;
