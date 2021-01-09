import React from 'react';

const Tree = ({ position }) => {
  return (
    <mesh position={position}>
      <coneGeometry attach='geometry' args={[1, 5, 10]} />
      <meshStandardMaterial attach='material' color='green' transparent />
    </mesh>
  );
};

const Trees = ({ positions }) => {
  return positions.map((position) => {
    return <Tree position={position} />;
  });
};

export default Trees;
