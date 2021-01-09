import { MeshWobbleMaterial, Box } from 'drei';
import React from 'react';
import Terrain from './Terrain';

const Water = () => {
  const water = {
    colors: ['royalblue'],
    colorThresholds: ['else'],
    freqs: [1, 2],
    amps: [1, 0.5],
    sqThresh: [0, 3],
    finalScaleAndThresh: [0, 1, 1],
  };
  return <Terrain args={[160, 160, 80, 80]} biome={water} />;
};

export default Water;
