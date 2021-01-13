const biomes = {
  greenMountains: {
    colors: [0xffffff, 0x167d0b, 0x55c949, 0x14a8e3],
    colorThresholds: [26, 3, 0, -Infinity],
    freqs: [1 / 100, 1 / 50],
    amps: [5, 2.5],
    sqThresh: [1, Infinity],
    finalScaleAndThresh: [4, 1.5, 0],
  },
  beach: {
    colors: [
      0x4a7c59,
      0xf2d16b,
      0x90e0ef,
      0x48cae4,
      0x0096c7,
      0x023e8a,
      0x03045e,
    ],
    colorThresholds: [5.5, 3, 2, 1, -1, -2, -Infinity],
    freqs: [1 / 100, 1 / 50],
    amps: [3, 4],
    sqThresh: [1, Infinity],
    finalScaleAndThresh: [0, 1.5, 1.5],
  },
  mesa: {
    colors: [
      0x652914,
      0xa31e1e,
      0xce3b3b,
      0xc14829,
      0x0096c7,
      0x023e8a,
      0x03045e,
    ],
    colorThresholds: [14, 8, 2, 1, -1, -2, -Infinity],
    freqs: [1 / 200, 1 / 100],
    amps: [4, 8],
    sqThresh: [6, Infinity],
    finalScaleAndThresh: [5, 3, 3],
  },
  whiteMountains: {
    colors: [0xffffff, 0xcaf0f8, 0xade8f4, 0x2b2d42, [0x264653, 0x2b2d42]],
    colorThresholds: [30, 25, 17, -1, -Infinity],
    freqs: [1 / 50, 1 / 20],
    amps: [5, 3],
    sqThresh: [0, 3],
    finalScaleAndThresh: [2, 1.7, 0],
  },
};

export default biomes;
