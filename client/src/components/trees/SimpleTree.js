import React, { useMemo } from 'react';
import * as THREE from 'three';

const SimpleTree = ({ position, height, width, sides, leafColor, trunkColor}) => {
  const geom = useMemo(() => {
    const geo = new THREE.Geometry();

    // const width = 2
    // const height = 6
    // const sides = 4
    const level1 = new THREE.ConeGeometry(width, height, sides);
    //0x006400
    level1.faces.forEach((f) => f.color.set(leafColor));
    level1.translate(0, height/1.5, 0);
    geo.merge(level1);
    const trunk = new THREE.CylinderGeometry(width / 6, width / 6, height * 2/3, 6);
    //0x006400
    trunk.faces.forEach((f) => f.color.set(trunkColor));
    trunk.translate(0, 0, 0);
    geo.merge(trunk);
    return geo;
  });

  return (
    <mesh needsUpdate={true} position={position} geometry={geom} receiveShadow>
      {/* <coneGeometry attach='geometry' args={[3, 10, 4]} /> */}
      <meshStandardMaterial
        needsUpdate={true}
        attach='material'
        vertexColors={true}
        transparent
        flatShading
      />
    </mesh>
  );
};

export default SimpleTree;
