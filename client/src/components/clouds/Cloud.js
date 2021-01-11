import React, { useMemo } from 'react';
import * as THREE from "three";
//potentially ring around mountain
const Cloud = ({ position, numPuffs, radius, widthSegments, heightSegments, offset}) => {

  const geom = useMemo(() => {
    const geo = new THREE.Geometry()
    //could cause out of bonds issues ont centered but this is easier
    let shift = 0 
    for (let i = 0; i < numPuffs; i++){
      const tuft1 = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
      const r = Math.random()
      if (r < 0.33){
        tuft1.translate(shift,0,0)
      }
      else if (r < 0.67) {
        tuft1.translate(0, 0, shift)
      }
      else{
        tuft1.translate(shift, 0, shift) 
      }
      geo.merge(tuft1)
      shift += offset
    }
    //     const tuft2 = new THREE.SphereGeometry(1.5,7,8)
    // tuft2.translate(1,0,0)
    // geo.merge(tuft2)

    // const tuft3 = new THREE.SphereGeometry(2.0,7,8)
    // tuft3.translate(0,0,0)
    // geo.merge(tuft3)
    const map = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin
//randomly displace the x,y,z coords by the `per` value
    const jitter = (geo,per) => geo.vertices.forEach(v => {
        v.x += map(Math.random(),0,1,-per,per)
        v.y += map(Math.random(),0,1,-per,per)
        v.z += map(Math.random(),0,1,-per,per)
    })
    jitter(geo, .2)
    return geo
  })

  return (
    <mesh needsUpdate={true} position={position} geometry={geom} receiveShadow>

      {/* <coneGeometry attach='geometry' args={[3, 10, 4]} /> */}
      <meshStandardMaterial needsUpdate={true} attach='material' color="white" transparent opacity={1} flatshading/>
    </mesh>
  );
};

export default Cloud