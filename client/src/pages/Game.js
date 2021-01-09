import './game.scss';

import Terrain from '../components/Terrain';
import { Canvas } from 'react-three-fiber';
import {
  Box,
  FlyControls,
  OrbitControls,
  TransformControls,
  Stars,
} from 'drei';
import { useState } from 'react';

import Lights from '../components/Lights';
import Effects from '../components/Effects';
import Particles from '../components/Particles';
import Water from '../components/Water';

function Game() {
  const x = 5;
  const y = 0;
  const z = 100;

  const green_mountains = {
    colors: [0xffffff, 0x167d0b, 0x55c949, 0x14a8e3],
    colorThresholds: [26, 3, 0, 'else'],
    freqs: [1 / 100, 1 / 50],
    amps: [5, 2.5],
    sqThresh: [1, Infinity],
    finalScaleAndThresh: [4, 1.5, 0],
  };
  const beach = {
    colors: [
      0x4a7c59,
      0xf2d16b,
      0x90e0ef,
      0x48cae4,
      0x0096c7,
      0x023e8a,
      0x03045e,
    ],
    colorThresholds: [5.5, 3, 2, 1, -1, -2, 'else'],
    freqs: [1 / 100, 1 / 50],
    amps: [3, 4],
    sqThresh: [1, Infinity],
    finalScaleAndThresh: [0, 1.5, 1.5],
  };

  const mesa = {
    colors: [
      0x652914,
      0xa31e1e,
      0xce3b3b,
      0xc14829,
      0x0096c7,
      0x023e8a,
      0x03045e,
    ],
    colorThresholds: [14, 8, 2, 1, -1, -2, 'else'],
    freqs: [1 / 200, 1 / 100],
    amps: [4, 8],
    sqThresh: [6, Infinity],
    finalScaleAndThresh: [5, 3, 3],
  };

  const white_mountains = {
    colors: [0xffffff, 0xcaf0f8, 0xade8f4, 0x2b2d42, [0x264653, 0x2b2d42]],
    colorThresholds: [30, 25, 17, -1, 'else'],
    freqs: [1 / 50, 1 / 20],
    amps: [5, 3],
    sqThresh: [0, 3],
    finalScaleAndThresh: [2, 1.7, 0],
  };

  return (
    <>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [0, 30, 0], fov: 60 }}
      >
        {/* <fogExp2 attach='fog' args={['white', 0.003]} /> */}
        <fog attach='fog' args={['white', 1, 5000]} />
        <Terrain args={[160, 160, 40, 40]} biome={mesa} />
        <Lights />
        <OrbitControls movementSpeed={100} rollSpeed={1} />
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
      </Canvas>
    </>
  );
}

export default Game;
