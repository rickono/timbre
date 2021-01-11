import React, { useMemo } from 'react';
import * as THREE from 'three';

const SimpleTree = ({ position }) => {
  return (
    <mesh needsUpdate={true} position={position} receiveShadow>
      <coneGeometry attach='geometry' args={[3, 10, 4]} />
      <meshStandardMaterial
        attach='material'
        color='green'
        transparent
        flatShading
      />
    </mesh>
  );
};

export default SimpleTree;
