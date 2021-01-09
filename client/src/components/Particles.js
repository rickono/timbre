import { Icosahedron } from 'drei';
import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

const Particle = ({ pos }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.position.x += Math.random() * 0.1;
    mesh.current.position.y += Math.random() * 0.1;
    mesh.current.position.z += Math.random() * 0.1;
  });

  return (
    <group>
      <Icosahedron ref={mesh} position={pos} args={[0.5, 1]}>
        <meshLambertMaterial
          color={'white'}
          opacity={0.5}
          depthTest={false}
          transparent
        />
      </Icosahedron>
      {/* <pointLight intensity={0.1} position={pos} /> */}
    </group>
  );
};

const Particles = () => {
  const pos = [20, 20, 20];
  return (
    <group>
      <Particle pos={pos} />
    </group>
  );
};

export default Particles;
