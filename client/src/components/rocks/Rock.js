import React, { useMemo } from 'react';
import * as THREE from 'three';

const Rock = ({ position, radius, detail, color}) => {
    const geom = useMemo(() => {
        const geo = new THREE.DodecahedronGeometry(radius, detail)
        return geo
    })
    return (
        <mesh needsUpdate={true} geometry={geom} position={position} receiveShadow>
            <meshStandardMaterial
                needsUpdate={true}
                attach='material'
                transparent
                color={color}
                flatShading
            />
        </mesh>
  );
};

export default Rock;