import React, { useRef } from 'react';
import { useFrame, useUpdate } from 'react-three-fiber';
import { Box, Sphere } from 'drei';
import Trees from './trees/Trees';
import Clouds from './clouds/Clouds';
import Rocks from './rocks/Rocks';

const Terrain = ({
  args,
  getHeightAt,
  createMap,
  colors,
  colorThresholds,
  rockColors,
  cloudColors,
  treeLeafColors,
  treeTrunkColors,
  rockRange,
  rockNumber,
  cloudNumber,
  treeNumber,
  cloudRange,
  treeRange,
}) => {
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
    //if really want to make more general could use functions instead...mightbe overkill
    geometry.faces.forEach((face) => {
      const maxHeight = Math.max(
        geometry.vertices[face.a].y,
        geometry.vertices[face.b].y,
        geometry.vertices[face.c].y
      );
      colors.every((color, i) => {
        if (maxHeight > colorThresholds[i]) {
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

  return (
    <group>
      <Rocks
        rockNumber={rockNumber}
        getHeightAt={getHeightAt}
        sideLength={args[0]}
        colors={rockColors}
        minHeight={rockRange[0]}
        maxHeight={rockRange[1]}
      />
      <Clouds
        cloudnumber={cloudNumber}
        getHeightAt={getHeightAt}
        side_length={args[0]}
        minHeight={cloudRange[0]}
        maxHeight={cloudRange[1]}
        colors={cloudColors}
      />
      <Trees
        treeNumber={treeNumber}
        getHeightAt={getHeightAt}
        sideLength={args[0]}
        maxHeight={treeRange[1]}
        minHeight={treeRange[0]}
        trunkColors={treeTrunkColors}
        leafColors={treeLeafColors}
      />
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
    </group>
  );
};

export default Terrain;
