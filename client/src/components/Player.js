import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import axios from 'axios';

const SPEED = 0.2;

const Player = ({ getHeightAt }) => {
  const { camera } = useThree();
  const [moveUp, setMoveUp] = useState(false);
  const [moveBack, setMoveBack] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', async (e) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          setMoveUp(true);
          break;
        case 'd':
        case 'ArrowRight':
          setMoveRight(true);
          break;
        case 's':
        case 'ArrowDown':
          setMoveBack(true);
          break;
        case 'a':
        case 'ArrowLeft':
          setMoveLeft(true);
          break;
        case 'r':
          const apiresponse = await axios.get(
            'http://localhost:8888/api/v1/me/devices'
          );
          console.log(apiresponse);
          break;
        default:
          break;
      }
    });
    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          setMoveUp(false);
          break;
        case 'd':
        case 'ArrowRight':
          setMoveRight(false);
          break;
        case 's':
        case 'ArrowDown':
          setMoveBack(false);
          break;
        case 'a':
        case 'ArrowLeft':
          setMoveLeft(false);
          break;
        default:
          break;
      }
    });
  });

  useFrame(() => {
    const lookingAt = new THREE.Vector3();
    camera.getWorldDirection(lookingAt);
    const length = Math.sqrt(lookingAt.x ** 2 + lookingAt.z ** 2);

    let toMoveX = 0,
      toMoveZ = 0;

    if (moveUp) {
      toMoveX += (lookingAt.x / length) * SPEED;
      toMoveZ += (lookingAt.z / length) * SPEED;
    }
    if (moveBack) {
      toMoveX -= (lookingAt.x / length) * SPEED;
      toMoveZ -= (lookingAt.z / length) * SPEED;
    }
    if (moveRight) {
      toMoveX -= (lookingAt.z / length) * SPEED;
      toMoveZ += (lookingAt.x / length) * SPEED;
    }
    if (moveLeft) {
      toMoveX += (lookingAt.z / length) * SPEED;
      toMoveZ -= (lookingAt.x / length) * SPEED;
    }

    camera.position.x += toMoveX;
    camera.position.z += toMoveZ;
    camera.position.y = getHeightAt(camera.position.x, camera.position.z) + 5;
  });

  return <mesh />;
};

export default Player;
