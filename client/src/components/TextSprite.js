import * as THREE from 'three'
import React, { Suspense } from 'react'
import { Canvas, Dom, useLoader } from 'react-three-fiber'

const TextSprite = ({ url, ...props }) => {
  const texture = useLoader(THREE.TextureLoader, url)
  return (
    <sprite {...props}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  )
}
// need to check a--b or it will break
// ssc = @(v) [0 -v(3) v(2); v(3) 0 -v(1); -v(2) v(1) 0]
// RU = @(A,B) eye(3) + ssc(cross(A,B)) + \
//      ssc(cross(A,B))^2*(1-dot(A,B))/(norm(cross(A,B))^2)

// function R=fcn_RotationFromTwoVectors(A, B) v = cross(A,B); 
// ssc = [0 -v(3) v(2); v(3) 0 -v(1); -v(2) v(1) 0]; 
// R = eye(3) + ssc + ssc^2*(1-dot(A,B))/(norm(v))^2;

// const rotateVectors = (a, b) => {
//     const v = math.cross(a, b)
//     const temp = (1-dot(A,B))/(norm(v))^2 
//     const ssc = math.matrix([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]])
//     return math.add(math.identity([3, 3]), ssc, math.multiply(math.pow(ssc, 2), temp)
// }

// export default TextSprite