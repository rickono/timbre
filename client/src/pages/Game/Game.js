import './game.scss';
import React, { useEffect, useState, useRef } from 'react';
import MusicPlayer from '../../components/MusicPlayer';
import Introduction from '../../components/ui/Introduction';
import Biome from "../../components/biomes/Biome"

const SIDE_LENGTH = 320;
const DIVISIONS = SIDE_LENGTH / 4;

function Game({ cookies, setCookie, removeCookie }) {
  
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
        (norm[0] * (points[0][0] - x) + norm[2] * (points[0][2] - z)) / norm[1] +
        points[0][1]
      );
    };
  }
  
  const wrapCreateMap = (freqs, amps, sqThresh, finalScaleAndThresh, simplex) => {
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
  }
  return (
    <>
      <Biome wrapCreateMap={wrapCreateMap} 
             wrapGetHeightAt={wrapGetHeightAt}
             DIVISIONS={DIVISIONS}
             SIDE_LENGTH={SIDE_LENGTH}
             biome={"beach"}
      />
      {/* <MusicPlayer cookies={cookies} player={player} /> */}
      {/* <Introduction /> */}
    </>
  );
}

export default Game;
