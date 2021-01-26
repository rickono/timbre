import React, { useMemo } from 'react';
import * as THREE from 'three';

import { randRange, randInt } from '../../helpers/utils';

const Cloud = ({
  position,
  color,
  numPuffs,
  radius,
  widthSegments,
  heightSegments,
}) => {
  const geom = useMemo(() => {
    const geo = new THREE.Geometry();
    const chopBottom = (geo, bottom) =>
      geo.vertices.forEach((v) => (v.y = Math.max(v.y, bottom)));

    let shift = 0;
    for (let i = 0; i < randInt(...numPuffs); i++) {
      const newRadius = randRange(...radius);
      let offset = newRadius / 2;
      const tuft1 = new THREE.SphereGeometry(
        newRadius,
        randInt(...widthSegments),
        randInt(...heightSegments)
      );
      const r = Math.random();
      if (r < 0.33) {
        tuft1.translate(shift, 0, 0);
      } else if (r < 0.67) {
        tuft1.translate(0, 0, shift);
      } else {
        tuft1.translate(shift / 2, 0, shift / 2);
      }
      geo.merge(tuft1);
      shift += offset;
    }
    const map = (val, smin, smax, emin, emax) =>
      ((emax - emin) * (val - smin)) / (smax - smin) + emin;
    const jitter = (geo, per) =>
      geo.vertices.forEach((v) => {
        v.x += map(Math.random(), 0, 1, -per, per);
        v.y += map(Math.random(), 0, 1, -per, per);
        v.z += map(Math.random(), 0, 1, -per, per);
      });
    jitter(geo, 0.2);
    chopBottom(geo, randRange(-0.75, -0.1));
    return geo;
  });

  return (
    <mesh needsUpdate={true} position={position} geometry={geom} receiveShadow>
      <meshStandardMaterial
        needsUpdate={true}
        attach='material'
        color={color}
        transparent
        opacity={1}
        flatshading
      />
    </mesh>
  );
};

export default Cloud;
