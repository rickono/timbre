import React, { useRef, useEffect } from 'react';
import { MeshWobbleMaterial } from 'drei';
import { useFrame, useThree } from 'react-three-fiber';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as THREE from 'three';

const Song = ({ position, args, color, speed }) => {
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

const Songs = ({ songs, getHeightAt, playerId }) => {
  const positions = songs.map((song) => {
    return song.position;
  });

  const { camera } = useThree();

  const getClosestIndex = (songs) => {
    const distances = songs.map((song) => {
      return Math.sqrt(song.position[0] ** 2 + song.position[1] ** 2);
    });
    console.log(distances);
    return distances.indexOf(Math.min(...distances));
  };

  useEffect(() => {
    window.addEventListener('keydown', async (e) => {
      const config = {
        headers: {
          'access-token': Cookies.get('access-token'),
          'refresh-token': Cookies.get('refresh-token'),
        },
      };
      if (e.key === 'Shift') {
        const closeSongs = songs.filter((song) => {
          return (
            Math.sqrt(
              (song.position[0] - camera.position.x) ** 2 +
                (song.position[1] - camera.position.z) ** 2
            ) < 5
          );
        });

        if (closeSongs.length > 0) {
          console.log(closeSongs);
          console.log(getClosestIndex(closeSongs));
          const toPlay = songs[getClosestIndex(closeSongs)];
          await axios.get(
            `http://localhost:8888/api/v1/play?id=${playerId}&uris=${toPlay.uri}`,
            config
          );
        }
      }
    });
  });

  return (
    <>
      {positions.map((position) => {
        return (
          <Song
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
