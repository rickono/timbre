import React, { useMemo } from 'react';
import * as THREE from 'three';
import { randRange } from '../../helpers/utils';

const SimpleTree = ({ position, height, sides, leafColor, trunkColor}) => {
  const geom = useMemo(() => {
    const width = height / 3 + randRange(-height / (3 * 5), height / (3 * 5))
    const geo = new THREE.Geometry();
    const level1 = new THREE.ConeGeometry(width, height, sides);
    level1.faces.forEach((f) => f.color.set(leafColor));
    level1.translate(0, height/1.5, 0);
    geo.merge(level1);
    const trunk = new THREE.CylinderGeometry(width / 6, width / 6, height * 2/3, 6);
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

export default SimpleTree;
