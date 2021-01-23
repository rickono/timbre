import React, { useRef, useEffect, useState } from 'react';
import { MeshWobbleMaterial, Text } from 'drei';
import { useFrame, useThree } from 'react-three-fiber';
import axios from 'axios';
import Cookies from 'js-cookie';

const Song = ({ position, args, color, speed, getHeightAt }) => {
  const mesh = useRef(null);
  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    mesh.current.position.y =
      getHeightAt(mesh.current.position.x, mesh.current.position.z) +
      10 +
      Math.sin(state.clock.elapsedTime + position[1]) * 5;
  });

  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        emissive='white'
        emissiveIntensity={1}
        attach='material'
        color={color}
        speed={speed}
        factor={0.3}
      />
    </mesh>
  );
};

const Songs = ({ songs, getHeightAt, playerId, changeScene }) => {
  const positions = songs.map((song) => {
    return song.position;
  });

  const [currentSelection, setCurrentSelection] = useState(0);
  const playlist = useRef([]);
  const fired = useRef(false);

  const { camera } = useThree();
  const config = {
    headers: {
      'access-token': Cookies.get('access-token'),
      'refresh-token': Cookies.get('refresh-token'),
    },
  };

  useEffect(() => {
    fired.current = false;
    window.addEventListener('keydown', async (e) => {
      if (e.key === 'Shift' || e.key === 'e') {
        if (!fired.current) {
          fired.current = true;
          console.log('keydownnn');
          const closeSongs = songs.filter((song) => {
            // console.log(song);
            return (
              Math.sqrt(
                (song.position[0] - camera.position.x) ** 2 +
                  (song.position[1] - camera.position.z) ** 2
              ) < 15
            );
          });

          if (closeSongs.length > 0) {
            await axios.get(
              `http://localhost:8888/api/v1/play?id=${playerId}&uris=${closeSongs[0].uri}`,
              config
            );
            if (e.key === 'e') {
              changeScene();
              setCurrentSelection(currentSelection + 1);
              playlist.current = [...playlist.current, closeSongs[0].id];
              console.log(playlist.current);
            }
          }
        }
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift' || e.key === 'e') {
        fired.current = false;
      }
    });
  });

  return (
    <>
      {positions
        .slice(currentSelection * 10, currentSelection * 10 + 10)
        .map((position) => {
          return (
            <Song
              position={[
                position[0],
                getHeightAt(position[0], position[1]) + 20,
                position[1],
              ]}
              args={[3, 3, 3]}
              color='red'
              speed={2}
              key={position[1] / position[0]}
              getHeightAt={getHeightAt}
            />
          );
        })}
      <Text
        color='pink'
        fontSize={10}
        maxWidth={80}
        lineHeight={1.5}
        letterSpacing={0}
        textAlign='center'
        font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
        anchorX='center'
        anchorY='bottom'
        position={[0, 10, 0]}
      >
        MOVE AROUND USING WASD
      </Text>
    </>
  );
};

export default Songs;
