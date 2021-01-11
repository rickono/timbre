import React, { useMemo } from 'react';
import * as THREE from 'three';

const Bush = ({ position }) => {
  const geom = useMemo(() => {
    const geo = new THREE.Geometry();

    const tuft1 = new THREE.SphereGeometry(1.5, 3, 5);
    tuft1.translate(-1.2, 0, 0);
    geo.merge(tuft1);

    const tuft2 = new THREE.SphereGeometry(1.5, 3, 5);
    tuft2.translate(1, 0, 0);
    geo.merge(tuft2);

    const tuft3 = new THREE.SphereGeometry(2.0, 3, 5);
    tuft3.translate(0, 0, 0);
    geo.merge(tuft3);
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
      {/* <coneGeometry attach='geometry' args={[3, 10, 4]} /> */}
      <meshStandardMaterial
        needsUpdate={true}
        attach='material'
        color='green'
        transparent
        flatshading
      />
    </mesh>
  );
};

export default Bush;
