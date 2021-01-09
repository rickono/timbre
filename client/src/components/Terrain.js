import React, { useRef } from 'react';
import { useFrame, useUpdate } from 'react-three-fiber';

import { Box, Sphere } from 'drei';

import SimplexNoise from 'simplex-noise';
import Trees from './Trees';
import { MeshStandardMaterial } from 'three';
import Water from './Water';

const Terrain = ({ args, biome }) => {
  const simplex = useRef(new SimplexNoise());
  const {
    colors,
    colorThresholds,
    freqs,
    amps,
    sqThresh,
    finalScaleAndThresh,
  } = biome;
  const plane = useRef(null);

  const mesh = useUpdate(({ geometry }) => {
    plane.current = geometry;
    // ===== If using planeGeometry =====

    geometry.vertices = geometry.vertices.map((vertex) => {
      return {
        x: -vertex.x,
        y: createMap(-vertex.x, vertex.y),
        z: vertex.y,
      };
    });
    // ===== Colors =====
    //if really want to make more general could functions instead...mightbe overkill
    geometry.faces.forEach((face) => {
      const maxHeight = Math.max(
        geometry.vertices[face.a].y,
        geometry.vertices[face.b].y,
        geometry.vertices[face.c].y
      );
      colors.every((color, i) => {
        if (colorThresholds[i] === 'else' || maxHeight > colorThresholds[i]) {
          const faceColor =
            color.constructor === Array
              ? color[Math.floor(Math.random() * color.length)]
              : color;
          face.color.set(faceColor);
          return false;
        }
        return true;
      });
    });
  });

  const createMap = (x, z) => {
    let height = 0;
    freqs.forEach((freq, i) => {
      height +=
        simplex.current.noise2D(x * freq, z * freq) * amps[i] > sqThresh[i]
          ? Math.pow(simplex.current.noise2D(x * freq, z * freq) * amps[i], 2)
          : simplex.current.noise2D(x * freq, z * freq) * amps[i];
    });
    return height > finalScaleAndThresh[0]
      ? height * finalScaleAndThresh[1] + finalScaleAndThresh[2]
      : height + finalScaleAndThresh[2];
  };

  const getHeightAt = (x, z) => {
    const length = args[0] / args[3];
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

    console.log(floorX);
    console.log(floorZ);
    console.log(ceilX);
    console.log(ceilZ);

    const points = [
      [ceilX, createMap(ceilX, floorZ), floorZ],
      [floorX, createMap(floorX, ceilZ), ceilZ],
      // [ceilX, ceilY, createMap(ceilX, ceilY)],
      // [roundX, createMap(roundX, roundZ), roundZ],
      //distance between these vectos and choose the smaller
      // x % length > z % length
      distFloors > distCeils
        ? [ceilX, createMap(ceilX, ceilZ), ceilZ]
        : [floorX, createMap(floorX, floorZ), floorZ],
    ];
    console.log(points);
    return points;
  };

  const x = (Math.random() - 0.5) * 160;
  const z = (Math.random() - 0.5) * 160;
  // const x = 30;
  // const z = 30;
  const y = createMap(x, z);

  console.log(x);
  console.log('simplex noise: ', y);
  console.log(z);

  const testPoints = getHeightAt(x, z);

  return (
    <group>
      <Box args={[1, 1, 1]} position={[x, y, z]}>
        <meshStandardMaterial attach='material' color='red' />
      </Box>
      {testPoints.map((point) => {
        console.log(point);
        return (
          <Box color='black' args={[1, 1, 1]} position={point} key={point[1]}>
            <meshStandardMaterial attach='material' color='black' />
          </Box>
        );
      })}
      <mesh ref={mesh} rotation={[0, 0, 0]} receiveShadow>
        <planeGeometry
          attach='geometry'
          args={args}
          computeFaceNormals
          computeVertexNormals
          needsUpdate
          verticesNeedUpdate
          elementsNeedUpdate
        />
        <meshStandardMaterial attach='material' vertexColors flatShading />
      </mesh>
      <Sphere args={[20, 30, 30]} position={[-100, 50, -100]}>
        <meshStandardMaterial attach='material' color='orange' />
      </Sphere>
      {/* <Trees positions={[[30, 30, createMap(30, 30)]]} /> */}
    </group>
  );
};

export default Terrain;
