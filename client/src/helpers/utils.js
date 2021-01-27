import colorSchemes from './colorSchemes';
import * as THREE from 'three'

const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
const randRange = (max, min) => Math.random() * (max - min) + min

const randVal = (arr) => arr[randInt(0, arr.length - 1)]

const getEulerAngles = (vector, targetVector) => {
  // Normalize vectors to make sure they have a length of 1
  vector.normalize();
  targetVector.normalize();

  // Create a quaternion, and apply starting, then ending vectors
  let quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(vector, targetVector);

  // Quaternion now has rotation data within it. 
  // We'll need to get it out with a THREE.Euler()
  let euler = new THREE.Euler();
  euler.setFromQuaternion(quaternion);
  euler = euler.toArray();
  console.log(euler)
  return euler
}

const generateSettings = (mood) => {
  let colors, ambLight, dirLight, fog, stars, timeOfDay, cloudColors;
  const happyColors = [
    'yellow',
    'lightyellow',
    'orange',
    'white',
    'papyawhip',
  ];
  const sadColors = ['white', 'lightpurple', 'lightblue'];
  if (mood === 'happy') {
    const ambientColor = randVal(happyColors);
    const directionalColor = randVal(happyColors);
    colors = randVal(colorSchemes.happy);
    ambLight = { ambientColor, ambientIntensity: 0.2 };
    dirLight = { directionalColor, directionalIntensity: 0.5 };
    fog = { isFog: true, fogColor: 0xadbfc7, fogNear: 1, fogFar: 190 };
    stars = false;
    timeOfDay = 'day';
    cloudColors = ['white', 'papayawhip'];
  } else if (mood === 'sad') {
    const ambientColor = randVal(sadColors);
    const directionalColor = randVal(sadColors);
    colors = randVal(colorSchemes.sad);
    ambLight = { ambientColor, ambientIntensity: 0.2 };
    dirLight = { directionalColor, directionalIntensity: 0.5 };
    fog = { isFog: true, fogColor: 'black', fogNear: 1, fogFar: 190 };
    stars = true;
    timeOfDay = 'night';
    cloudColors = ['lightgrey', 'grey'];
    //change this
  } else {
    colors = randVal(colorSchemes.happy);
    ambLight = { ambientColor: 'lightpink', ambientIntensity: 0.2 };
    dirLight = { directionalColor: 'lightblue', directionalIntensity: 0.5 };
    fog = { isFog: true, fogColor: 0x422e34, fogNear: 1, fogFar: 190 };
    //0x57363b
    stars = true;
    timeOfDay = 'sunset';
    cloudColors = ['white', 'lightpink'];
  }
  const rockColors = ['grey', 'darkgrey'];
  const treeTrunkColor = [0x654321];
  const treeLeafColor = [0x006400, 0x90ee90, 0x9fee90];

  const greenMountains = {
    colors: colors,
    colorThresholds: [28, 5, 2, -Infinity],
    freqs: [randRange(1 / 120, 1 / 80), randRange(1 / 40, 1 / 30)],
    amps: [randRange(4, 5), 2.5],
    sqThresh: [1, Infinity],
    finalScaleAndThresh: [4, 1.5, 2],
    fog: fog,
    ambientLight: ambLight,
    directionalLight: dirLight,
    rockInfo: { rockNumber: 100, rockColors, rockRange: [1, 7] },
    cloudInfo: { cloudNumber: 30, cloudRange: [30, 50], cloudColors },
    treeInfo: {
      treeNumber: 75,
      treeRange: [5, 15],
      treeTrunkColor,
      treeLeafColor,
    },
    skyInfo: {
      stars,
      timeOfDay,
    },
  };
  const whiteMountains = {
    colors: colors.slice(0, 4).concat([colors.slice(3, 5)]),
    colorThresholds: [28, 23, 18, 6, -Infinity],
    freqs: [randRange(1 / 60, 1 / 40), randRange(1 / 30, 1 / 20)],
    amps: [randRange(4, 5), 3],
    sqThresh: [0, 3],
    finalScaleAndThresh: [2, 1.7, 7],
    fog: fog,
    ambientLight: ambLight,
    directionalLight: dirLight,
    rockInfo: { rockNumber: 100, rockColors, rockRange: [-Infinity, 6] },
    cloudInfo: { cloudNumber: 30, cloudRange: [30, 50], cloudColors },
    treeInfo: {
      treeNumber: 75,
      treeRange: [-Infinity, 9],
      treeTrunkColor,
      treeLeafColor,
    },
    skyInfo: {
      stars,
      timeOfDay,
    },
  };
  const mesa = {
    colors: colors,
    colorThresholds: [14, 8, 2, -2, -Infinity],
    freqs: [randRange(1 / 200, 1 / 150), randRange(1 / 110, 1 / 90)],
    amps: [4, 8],
    sqThresh: [6, Infinity],
    finalScaleAndThresh: [5, 3, 3],
    fog: fog,
    ambientLight: ambLight,
    directionalLight: dirLight,
    rockInfo: { rockNumber: 70, rockColors, rockRange: [-1, 7] },
    cloudInfo: { cloudNumber: 30, cloudRange: [30, 50], cloudColors },
    treeInfo: {
      treeNumber: 75,
      treeRange: [0, 7],
      treeTrunkColor,
      treeLeafColor,
    },
    skyInfo: {
      stars,
      timeOfDay,
    },
  };
  const beach = {
    colors: colors,
    colorThresholds: [5.5, 3, 1, -2, -Infinity],
    freqs: [randRange(1 / 150, 1 / 100), randRange(1 / 60, 1 / 40)],
    amps: [3, 4],
    sqThresh: [1, Infinity],
    finalScaleAndThresh: [0, 1.5, 0],
    fog: fog,
    ambientLight: ambLight,
    directionalLight: dirLight,
    rockInfo: { rockNumber: 50, rockColors, rockRange: [3, Infinity] },
    cloudInfo: { cloudNumber: 30, cloudRange: [20, 30], cloudColors },
    treeInfo: {
      treeNumber: 50,
      treeRange: [4, Infinity],
      treeTrunkColor,
      treeLeafColor,
    },
    skyInfo: {
      stars,
      timeOfDay,
    },
  };
  return randVal([whiteMountains, greenMountains, mesa]);
};

export { randVal, randRange, randInt, generateSettings, getEulerAngles}