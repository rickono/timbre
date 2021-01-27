import React, { useRef, useEffect, useState } from 'react';
import { MeshWobbleMaterial, Text } from 'drei';
import { useFrame, useThree } from 'react-three-fiber';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as THREE from 'three';

const SongText = ({ song, position, color }) => {
  const { camera } = useThree();

  const mesh = useRef();
  useFrame(() => {
    const distance = Math.sqrt(
      (mesh.current.position.x - camera.position.x) ** 2 +
        (mesh.current.position.z - camera.position.z) ** 2
    );
    if (distance < 15) {
      mesh.current.visible = true;
      const lookingAt = new THREE.Vector3();
      camera.getWorldDirection(lookingAt);
      const toRotateY = Math.atan(lookingAt.x / lookingAt.z);
      mesh.current.rotation.y =
        lookingAt.z > 0 ? -Math.PI + toRotateY : toRotateY;
    } else {
      mesh.current.visible = false;
    }
  });
  return (
    <Text
      fontSize={1.5}
      maxWidth={20}
      lineHeight={1.5}
      letterSpacing={0}
      textAlign='center'
      font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
      anchorX='center'
      anchorY='bottom'
      position={[position[0], position[1] - 2, position[2]]}
      ref={mesh}
    >
      <meshStandardMaterial
        attach='material'
        color='white'
        emissive={color}
        emissiveIntensity={1}
      />
      {song.name}
      {'\nby ' + song.artists[0]['name']}
    </Text>
  );
};

const Song = ({
  position,
  args,
  color,
  speed,
  getHeightAt,
  song,
  selectedSong,
}) => {
  const mesh = useRef(null);
  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    mesh.current.position.y =
      getHeightAt(mesh.current.position.x, mesh.current.position.z) +
      10 +
      Math.sin(state.clock.elapsedTime + position[1]) * 5 +
      3;
  });
  return (
    <group>
      <mesh castShadow position={position} ref={mesh}>
        <boxBufferGeometry attach='geometry' args={args} />
        <MeshWobbleMaterial
          emissive={song === selectedSong ? 'aqua' : 'papayawhip'}
          emissiveIntensity={1}
          attach='material'
          color={color}
          speed={speed}
          factor={0.3}
        />
      </mesh>
      <SongText
        song={song}
        position={position}
        color={song === selectedSong ? 'aqua' : 'papayawhip'}
      />
    </group>
  );
};

const DisplayCurrentSong = ({ color, currentSong }) => {
  const { camera } = useThree();
  const mesh = useRef(null);
  const lookingAt = new THREE.Vector3();
  camera.getWorldDirection(lookingAt);
  useFrame((state, delta) => {
    const toRotateY = Math.atan(lookingAt.x / lookingAt.z);
    mesh.current.rotation.y =
      lookingAt.z > 0 ? -Math.PI + toRotateY : toRotateY;
  });
  return (
    <Text
      ref={mesh}
      color={color}
      fontSize={10}
      maxWidth={200}
      lineHeight={1.5}
      letterSpacing={0}
      textAlign='center'
      font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
      anchorX='center'
      anchorY='bottom'
      position={[
        camera.position.x + lookingAt.x * 120,
        60,
        camera.position.z + lookingAt.z * 120,
      ]}
    >
      <MeshWobbleMaterial
        emissive={color}
        emissiveIntensity={1}
        attach='material'
        color={color}
        speed={2}
        factor={0.03}
      />
      {'Last Added Song: ' + currentSong}
    </Text>
  );
};

const DisplayCurrentArtist = ({ color, currentArtist }) => {
  const { camera } = useThree();
  const mesh = useRef(null);
  const lookingAt = new THREE.Vector3();
  camera.getWorldDirection(lookingAt);
  useFrame((state, delta) => {
    const toRotateY = Math.atan(lookingAt.x / lookingAt.z);
    mesh.current.rotation.y =
      lookingAt.z > 0 ? -Math.PI + toRotateY : toRotateY;
  });
  return (
    <Text
      ref={mesh}
      color={color}
      fontSize={10}
      maxWidth={200}
      lineHeight={1.5}
      letterSpacing={0}
      textAlign='center'
      font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
      anchorX='center'
      anchorY='bottom'
      position={[
        camera.position.x + lookingAt.x * 120,
        40,
        camera.position.z + lookingAt.z * 120,
      ]}
    >
      <MeshWobbleMaterial
        emissive={color}
        emissiveIntensity={1}
        attach='material'
        color={color}
        speed={2}
        factor={0.03}
      />
      {'Artist: ' + currentArtist}
    </Text>
  );
};

const Instruction = ({ rotation, position, text, color }) => {
  const mesh = useRef(null);
  useFrame((state, delta) => {
    mesh.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime) * 5;
  });
  return (
    <Text
      ref={mesh}
      color={color}
      fontSize={10}
      maxWidth={80}
      lineHeight={1.5}
      letterSpacing={0}
      textAlign='center'
      font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
      anchorX='center'
      anchorY='bottom'
      rotation={rotation}
      position={position}
    >
      <MeshWobbleMaterial
        emissive='white'
        emissiveIntensity={1}
        attach='material'
        color={color}
        speed={3}
        factor={0.03}
      />
      {text}
    </Text>
  );
};

const Songs = ({ songs, getHeightAt, playerId, changeScene }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentArtist, setCurrentArtist] = useState(null);
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
          const closeSongs = songs.filter((song) => {
            return (
              Math.sqrt(
                (song.position[0] - camera.position.x) ** 2 +
                  (song.position[1] - camera.position.z) ** 2
              ) < 15
            );
          });

          closeSongs.sort((a, b) => {
            const distA = Math.sqrt(
              (a.position[0] - camera.position.x) ** 2 +
                (a.position[1] - camera.position.z) ** 2
            );
            const distB = Math.sqrt(
              (b.position[0] - camera.position.x) ** 2 +
                (b.position[1] - camera.position.z) ** 2
            );

            if (distA < distB) {
              return -1;
            } else if (distA > distB) {
              return 1;
            } else {
              return 0;
            }
          });

          if (closeSongs.length > 0) {
            await axios.get(
              `${process.env.REACT_APP_API_URL}/api/v1/play?id=${playerId}&uris=${closeSongs[0].uri}`,
              config
            );
            setSelectedSong(closeSongs[0]);
            if (e.key === 'e') {
              changeScene();
              setCurrentSelection(currentSelection + 1);
              setCurrentSong(closeSongs[0].name);
              setCurrentArtist(closeSongs[0].artists[0]['name']);
              playlist.current = [...playlist.current, closeSongs[0].id];
              await axios.get(
                `${
                  process.env.REACT_APP_API_URL
                }/api/v1/addtoplaylist?playlist=${Cookies.get(
                  'playlist-id'
                )}&uri=${closeSongs[0].uri}`,
                config
              );
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
      {songs.map((song) => {
        return (
          <Song
            position={[
              song.position[0],
              getHeightAt(song.position[0], song.position[1]) + 5,
              song.position[1],
            ]}
            args={[3, 3, 3]}
            color='red'
            speed={2}
            key={song.id + song.position[0]}
            getHeightAt={getHeightAt}
            song={song}
            selectedSong={selectedSong}
          />
        );
      })}
      {currentSelection === 0 ? (
        <>
          <Instruction
            color='pink'
            rotation={[0, Math.PI / 4, 0]}
            position={[-20, 30, -20]}
            text={'MOVE AROUND USING WASD AND SPACE'}
          />
          <Instruction
            color='pink'
            rotation={[0, (3 * Math.PI) / 4, 0]}
            position={[-20, 30, 80]}
            text={'PRESS E NEXT TO A SONG TO ADD TO PLAYLIST'}
          />
          <Instruction
            color='pink'
            rotation={[0, (5 * Math.PI) / 4, 0]}
            position={[80, 30, 80]}
            text={'PRESS SHIFT NEXT TO A SONG TO PREVIEW'}
          />
          <Instruction
            color='pink'
            rotation={[0, (7 * Math.PI) / 4, 0]}
            position={[80, 30, -20]}
            text={'THE FLOATING BOXES ARE SONGS'}
          />
        </>
      ) : (
        <>
          <DisplayCurrentSong color='white' currentSong={currentSong} />
          <DisplayCurrentArtist color='white' currentArtist={currentArtist} />
        </>
      )}
    </>
  );
};

export default Songs;
