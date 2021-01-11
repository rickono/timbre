import React, { useRef } from "react";
import { useFrame, useUpdate } from "react-three-fiber";

import { Box, Sphere } from "drei";

// import Trees from './trees/Trees';
import Water from './Water';
import StackedTree from './trees/StackedTree';
import SimpleTree from './trees/SimpleTree';
import Bush from './trees/Bush';

const Terrain = ({ args, getHeightAt, createMap, colors, colorThresholds }) => {
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
        if (colorThresholds[i] === "else" || maxHeight > colorThresholds[i]) {
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

  // const createMap = (x, z) => {
  //   let height = 0;
  //   freqs.forEach((freq, i) => {
  //     height +=
  //       simplex.current.noise2D(x * freq, z * freq) * amps[i] > sqThresh[i]
  //         ? Math.pow(simplex.current.noise2D(x * freq, z * freq) * amps[i], 2)
  //         : simplex.current.noise2D(x * freq, z * freq) * amps[i];
  //   });
  //   return height > finalScaleAndThresh[0]
  //     ? height * finalScaleAndThresh[1] + finalScaleAndThresh[2]
  //     : height + finalScaleAndThresh[2];
  // };

  const x = (Math.random() - 0.5) * 160;
  const z = (Math.random() - 0.5) * 160;
  const y = getHeightAt(x, z);
  const t = getHeightAt(1,2)
  const t2 = getHeightAt(5,5)
  console.log(t)

  // const testPoints = getHeightAt(x, z);

  return (
    <group>
      <Bush position={[10, getHeightAt(10,10), 10]}/>
      <StackedTree position={[1, t, 2]}/>
      <SimpleTree position={[5, t2, 5]}/>
      <Box args={[1, 1, 1]} position={[x, y, z]}>
        <meshStandardMaterial attach="material" color="red" />
      </Box>
      {/* {testPoints.map((point) => {
        console.log(point);
        return (
          <Box color='black' args={[1, 1, 1]} position={point} key={point[1]}>
            <meshStandardMaterial attach='material' color='black' />
          </Box>
        );
      })} */}
      <mesh ref={mesh} rotation={[0, 0, 0]} receiveShadow>
        <planeGeometry
          attach="geometry"
          args={args}
          computeFaceNormals
          computeVertexNormals
          needsUpdate
          verticesNeedUpdate
          elementsNeedUpdate
        />
        <meshStandardMaterial attach="material" vertexColors flatShading />
      </mesh>
      <Sphere args={[20, 30, 30]} position={[-100, 50, -100]}>
        <meshStandardMaterial attach='material' color='white' />
      </Sphere>
      {/* <Trees positions={[[30, 30, createMap(30, 30)]]} /> */}
    </group>
  );
};

export default Terrain;
