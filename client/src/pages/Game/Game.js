import './game.scss';
import React, { useEffect, useState, useRef } from 'react';
import Biome from '../../components/Biome';
import colorSchemes from '../../helpers/colorSchemes';
import { randInt, randRange } from '../../helpers/utils';

import axios from 'axios';

const SIDE_LENGTH = 320;
const DIVISIONS = SIDE_LENGTH / 4;

function Game({ cookies, setCookie, removeCookie }) {
  let player = useRef();
  const songs = useRef();

  const playerCheckInterval = setInterval(() => checkForPlayer(), 1000);

  const checkForPlayer = () => {
    if (window.Spotify !== null && window.Spotify !== undefined) {
      player.current = new window.Spotify.Player({
        name: 'Weblab Player',
        getOAuthToken: (callback) => {
          callback(cookies['access_token']);
        },
        volume: 0.5,
      });
      player.current.connect();
      initEventListeners();
      clearInterval(playerCheckInterval);
    }
  };

  const initEventListeners = async () => {
    player.current.addListener('ready', ({ device_id }) => {
      console.log('Ready to play music!');
      console.log('Device ID: ', device_id);
    });
    const config = {
      headers: {
        'access-token': cookies['access_token'],
        'refresh-token': cookies['refresh_token'],
      },
    };

    const res = await axios.get(
      'http://localhost:8888/api/v1/me/toptracks',
      config
    );
    const data = res.data;
    songs.current = data;
    console.log(songs.current);
  };

  const wrapGetHeightAt = (createMap) => {
    return (x, z) => {
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
        (norm[0] * (points[0][0] - x) + norm[2] * (points[0][2] - z)) /
          norm[1] +
        points[0][1]
      );
    };
  };

  const wrapCreateMap = (
    freqs,
    amps,
    sqThresh,
    finalScaleAndThresh,
    simplex
  ) => {
    return (x, z) => {
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
  };
  //write some code ot generate an environments settign based on whether its happy or sad

  const randVal = (arr) => {
    const i = randInt(0, arr.length - 1);
    console.log(i);
    return arr[i];
  };

  const generateSettings = (mood) => {
    let colors, ambLight, dirLight, fog, stars, timeOfDay, cloudColors;
    if (mood === 'happy') {
      colors = randVal(colorSchemes.happy);
      ambLight = { ambientColor: 'papayawhip', ambientIntensity: 0.2 };
      dirLight = { directionalColor: 'orange', directionalIntensity: 0.5 };
      fog = { isFog: true, fogColor: 0xadbfc7, fogNear: 1, fogFar: 175 };
      stars = false;
      timeOfDay = 'day';
      cloudColors = ['white', 'papayawhip'] 
    } else if (mood === 'sad') {
      colors = randVal(colorSchemes.sad);
      ambLight = { ambientColor: 'lightblue', ambientIntensity: 0.2 };
      dirLight = { directionalColor: 'lightblue', directionalIntensity: 0.5 };
      fog = { isFog: true, fogColor: 'black', fogNear: 1, fogFar: 175 };
      stars = true;
      timeOfDay = 'night';
      cloudColors = ['lightgrey', 'grey']
      //change this
    } else {
      colors = randVal(colorSchemes.happy);
      ambLight = { ambientColor: 'lightpink', ambientIntensity: 0.2 };
      dirLight = { directionalColor: 'lightblue', directionalIntensity: 0.5 };
      fog = { isFog: true, fogColor: 0x422e34, fogNear: 1, fogFar: 175 };
      //0x57363b
      stars = true;
      timeOfDay = 'sunset';
      cloudColors = ['white', 'lightpink']
    }
    const rockColors = ['grey', 'darkgrey']
    const treeTrunkColor = [0x654321]
    const treeLeafColor = [0x006400, 0x90ee90, 0x9fee90] 

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
      rockInfo: { rockNumber: 100,
                  rockColors,
                  rockRange: [1, 7],
                },
      cloudInfo: { cloudNumber: 30,
                   cloudRange: [30, 50],
                   cloudColors,
                  },
      treeInfo: { treeNumber: 75,
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
      colorThresholds: [36, 31, 23, 6, -Infinity],
      freqs: [randRange(1 / 60, 1 / 40), randRange(1 / 30, 1 / 20)],
      amps: [randRange(4, 5), 3],
      sqThresh: [0, 3],
      finalScaleAndThresh: [2, 1.7, 7],
      fog: fog,
      ambientLight: ambLight,
      directionalLight: dirLight,
      rockInfo: { rockNumber: 100,
                  rockColors,
                  rockRange: [-Infinity, 6],
                },
      cloudInfo: { cloudNumber: 30,
                   cloudRange: [30, 50],
                   cloudColors,
                  },
      treeInfo: { treeNumber: 75,
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
      rockInfo: { rockNumber: 70,
                  rockColors,
                  rockRange: [-1, 7],
                },
      cloudInfo: { cloudNumber: 30,
                   cloudRange: [30, 50],
                   cloudColors, 
                  },
      treeInfo: { treeNumber: 75,
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
      finalScaleAndThresh: [0, 1.5, 1.5],
      fog: fog,
      ambientLight: ambLight,
      directionalLight: dirLight,
      rockInfo: { rockNumber: 50,
                  rockColors,
                  rockRange: [3, Infinity],
                },
      cloudInfo: {  cloudNumber: 30,
                    cloudRange: [20, 30],
                    cloudColors,
                  },
      treeInfo: { treeNumber: 50,
                  treeRange: [4, Infinity],
                  treeTrunkColor,
                  treeLeafColor,
                },
      skyInfo: {
        stars,
        timeOfDay,
      },
    };
    return randVal([beach, greenMountains, whiteMountains, mesa]);
  };
  return (
    <>
      <Biome
        wrapCreateMap={wrapCreateMap}
        wrapGetHeightAt={wrapGetHeightAt}
        DIVISIONS={DIVISIONS}
        SIDE_LENGTH={SIDE_LENGTH}
        biome={generateSettings('chill')}
      />
    </>
  );
}

export default Game;
