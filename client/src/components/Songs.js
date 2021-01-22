import React from 'react';

import { Box } from 'drei';

const Songs = ({ songs, getHeightAt }) => {
  const positions = songs.map((song) => {
    return song.position;
  });
  console.log(songs);
  return (
    <>
      {positions.map((position) => {
        return (
          <Box
            args={[50, 50, 50]}
            position={[
              position[0],
              getHeightAt(position[0], position[1]),
              position[1],
            ]}
            // key={position[0]}
          >
            <meshStandardMaterial attach='material' color='lightblue' />
          </Box>
        );
      })}
    </>
  );
};

export default Songs;
