import React, { useMemo } from 'react';
import * as THREE from 'three';

const StackedTree = ({ position, baseWidth , height, leafColor, trunkColor, sides }) => {
  const geom = useMemo(() => {
    const geo = new THREE.Geometry();
    const level1 = new THREE.ConeGeometry(baseWidth/2.25, height/3, sides);
    level1.faces.forEach((f) => f.color.set(leafColor));
    level1.translate(0, height * 2 / 3, 0);
    geo.merge(level1);
    const level2 = new THREE.ConeGeometry(baseWidth/1.5, height/3, sides);
    level2.faces.forEach((f) => f.color.set(leafColor));
    level2.translate(0, height / 2, 0);
    geo.merge(level2);
    const level3 = new THREE.ConeGeometry(baseWidth, height/3, sides);
    level3.faces.forEach((f) => f.color.set(leafColor));
    level3.translate(0, height / 3, 0);
    geo.merge(level3);
    const trunk = new THREE.CylinderGeometry(baseWidth / 6, baseWidth / 6, height * 2 / 3, 6);
    trunk.faces.forEach((f) => f.color.set(trunkColor));
    trunk.translate(0, 0, 0);
    geo.merge(trunk);
    return geo;
  });

  return (
    <mesh needsUpdate={true} position={position} geometry={geom} receiveShadow>
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

export default StackedTree;
