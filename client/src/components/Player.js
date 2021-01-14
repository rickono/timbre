import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';

import axios from 'axios';
const SPEED = 0.2;

const Player = ({ getHeightAt, cookies }) => {
  const { camera } = useThree();
  const [moveUp, setMoveUp] = useState(false);
  const [moveBack, setMoveBack] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [height, setHeight] = useState(0);
  const [offset, setOffset] = useState(0);
  const [time, setTime] = useState(0);

  const GRAVITY = 0.05;

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
        case ' ':
          jump();
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

  const jump = () => {
    if (height === 0) {
      setVelocity(0.8);
    }
  };

  useFrame((state, delta) => {
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

    setOffset(Math.sin(time * 14) / 4);
    setTime(time + delta);

    setHeight(height + velocity > 0 ? height + velocity : 0);
    setVelocity(velocity - GRAVITY);
    camera.position.y =
      getHeightAt(camera.position.x, camera.position.z) +
      5 +
      height +
      (moveUp || moveBack || moveLeft || moveRight ? offset : 0);
  });

  return <mesh />;
};

export default Player;
