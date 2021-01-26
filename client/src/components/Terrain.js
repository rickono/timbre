import React, { useState } from 'react';
import { useUpdate } from 'react-three-fiber';
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
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);

  const mesh = useUpdate(
    ({ geometry }) => {
      if (isFirstUpdate) {
        geometry.vertices.forEach((vertex) => {
          vertex.set(-vertex.x, createMap(-vertex.x, vertex.y), vertex.y);
        });
        setIsFirstUpdate(false);
      } else {
        geometry.vertices.forEach((vertex) => {
          vertex.set(vertex.x, createMap(vertex.x, vertex.z), vertex.z);
        });
      }
      geometry.verticesNeedUpdate = true;
      // ===== Colors =====
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
      geometry.colorsNeedUpdate = true;
    },
    [colors]
  );

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
