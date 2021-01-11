import React, { useMemo } from 'react';
import * as THREE from "three";

const StackedTree = ({ position }) => {

  const geom = useMemo(() => {
    const geo = new THREE.Geometry()
    const level1 = new THREE.ConeGeometry(1.5,2,4)
    level1.faces.forEach(f => f.color.set(0x006400))
    level1.translate(0,4,0)
    geo.merge(level1)
    const level2 = new THREE.ConeGeometry(2,2,4)
    level2.faces.forEach(f => f.color.set(0x006400))
    level2.translate(0,3,0)
    geo.merge(level2)
    const level3 = new THREE.ConeGeometry(3,2,4)
    level3.faces.forEach(f => f.color.set(0x006400))
    level3.translate(0,2,0)
    geo.merge(level3)
    // const trunk = new THREE.CylinderGeometry(0.5,0.5,2)
    const trunk = new THREE.BoxGeometry(0.5,2, 0.5)
    trunk.faces.forEach(f => f.color.set(0x654321))
    trunk.translate(0,0,0)
    geo.merge(trunk)
    return geo
  })

  return (
    <mesh needsUpdate={true} position={position} geometry={geom} receiveShadow>

      {/* <coneGeometry attach='geometry' args={[3, 10, 4]} /> */}
      <meshStandardMaterial flatshading needsUpdate={true} attach='material' vertexColors={true} transparent />
    </mesh>
  );
};

export default StackedTree
