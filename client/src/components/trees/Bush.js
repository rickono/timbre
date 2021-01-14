import React, { useMemo } from 'react';
import * as THREE from 'three';

const Bush = ({ position, radius, widthSegment, heightSegment, color}) => {
  const geom = useMemo(() => {
    const geo = new THREE.Geometry();
    let shift = 0
    for (let i = 0; i < 3; i++){
      const tuft = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
      tuft.translate(shift, 0, 0);
      geo.merge(tuft);
      shift += radius / 2
    }
    const map = (val, smin, smax, emin, emax) =>
      ((emax - emin) * (val - smin)) / (smax - smin) + emin;
    //randomly displace the x,y,z coords by the `per` value
    const jitter = (geo, per) =>
      geo.vertices.forEach((v) => {
        v.x += map(Math.random(), 0, 1, -per, per);
        v.y += map(Math.random(), 0, 1, -per, per);
        v.z += map(Math.random(), 0, 1, -per, per);
      });
    jitter(geo, 0.2);
    return geo;
  });
  return (
    <mesh needsUpdate={true} position={position} geometry={geom} receiveShadow>
      <meshStandardMaterial
        needsUpdate={true}
        attach='material'
        color={color}
        transparent
        flatshading
      />
    </mesh>
  );
};

export default Bush;
