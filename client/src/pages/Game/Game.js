import './game.scss';

import Terrain from '../../components/Terrain';
import { Canvas } from 'react-three-fiber';
import { PointerLockControls, OrbitControls, Stars } from 'drei';
import SimplexNoise from 'simplex-noise';

import Lights from '../../components/Lights';
import Effects from '../../components/Effects';
import Particles from '../../components/Particles';
import Water from '../../components/Water';

import biomes from '../../helpers/biomes';
import Player from '../../components/Player';

const SIDE_LENGTH = 160;
const DIVISIONS = 40;

function Game() {
  const simplex = new SimplexNoise();

  const {
    colors,
    colorThresholds,
    freqs,
    amps,
    sqThresh,
    finalScaleAndThresh,
  } = biomes.whiteMountains;

  const getHeightAt = (x, z) => {
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

  return (
    <>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [30, 30, 30], fov: 60 }}
      >
        {/* <fogExp2 attach='fog' args={['white', 0.003]} /> */}
        <fog attach='fog' args={['white', 1, 5000]} />
        <Terrain
          args={[SIDE_LENGTH, SIDE_LENGTH, DIVISIONS, DIVISIONS]}
          createMap={createMap}
          getHeightAt={getHeightAt}
          colors={colors}
          colorThresholds={colorThresholds}
        />
        <Lights />
        {/* <OrbitControls  /> */}
        <PointerLockControls />
        {/* <TransformControls /> */}
        <Effects />
        <Particles />
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={3000} // Amount of stars (default=5000)
          factor={12} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        {/* <Water /> */}
        <Player getHeightAt={getHeightAt} />
      </Canvas>
    </>
  );
}

export default Game;
