import React, { useRef } from 'react';
import { useFrame, useUpdate } from 'react-three-fiber';
import { Box, Sphere } from 'drei';
import Trees from './trees/Trees';
import Clouds from './clouds/Clouds';
import Rocks from './rocks/Rocks';

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
    //if really want to make more general could use functions instead...mightbe overkill
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

  return (
    <group>
      <Rocks rockNumber={50}
             getHeightAt={getHeightAt} 
             sideLength={args[0]} 
             colors={["grey", "darkgrey"]} 
             minHeight={-1} 
             maxHeight={2}/>
      <Clouds cloudnumber={50} 
              getHeightAt={getHeightAt}
              side_length={args[0]} 
              minHeight={20} 
              maxHeight={30} 
              colors={["white", "lightgrey", "lightpink"]}
      />
      <Trees treeNumber={75} 
             getHeightAt={getHeightAt}
             sideLength={args[0]}
             maxHeight={9}
             minHeight={2}
             trunkColors={[0x654321]}
             leafColors={[0x006400,  0x90EE90, 0x9FEE90]}
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
      <Sphere args={[20, 30, 30]} position={[-100, 50, -100]}>
        <meshStandardMaterial attach='material' color='white' />
      </Sphere>
    </group>
  );
};

export default Terrain;
