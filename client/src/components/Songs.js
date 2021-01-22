import React, { useRef } from 'react';
import { MeshWobbleMaterial } from 'drei';
import { useFrame } from 'react-three-fiber';

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    mesh.current.position.y =
      mesh.current.position.y +
      Math.sin(state.clock.elapsedTime + position[1]) / 12;
  });

  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        attach='material'
        color={color}
        speed={speed}
        factor={0.3}
      />
    </mesh>
  );
};

const Songs = ({ songs, getHeightAt }) => {
  const positions = songs.map((song) => {
    return song.position;
  });
  return (
    <>
      {positions.map((position) => {
        return (
          <SpinningMesh
            position={[
              position[0],
              getHeightAt(position[0], position[1]) + 4,
              position[1],
            ]}
            args={[3, 3, 3]}
            color='red'
            speed={2}
            key={position[1] / position[0]}
          />
        );
      })}
    </>
  );
};

export default Songs;
