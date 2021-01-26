import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';

const SPEED = 0.2;

const Player = ({ getHeightAt, cookies, SIDE_LENGTH }) => {
  const { camera } = useThree();
  const [moveUp, setMoveUp] = useState(false);
  const [moveBack, setMoveBack] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [height, setHeight] = useState(0);

  const GRAVITY = 0.05;

  useEffect(() => {
    // Listen for keydown events and check if they are movement keys
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

    // Listen for keyup events to toggle off movement
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

  // Jump function to set players velocity when space is pressed
  const jump = () => {
    setVelocity(0.8);
  };

  // Update loop for camera position
  useFrame((state, delta) => {
    const lookingAt = new THREE.Vector3();
    camera.getWorldDirection(lookingAt);
    const length = Math.sqrt(lookingAt.x ** 2 + lookingAt.z ** 2);

    // Figure out which way the player should be moving
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

    // Adjust camera position based on variables above and time since last update
    camera.position.x +=
      Math.abs(toMoveX + camera.position.x) < SIDE_LENGTH / 2
        ? toMoveX * 70 * delta
        : 0;
    camera.position.z +=
      Math.abs(toMoveZ + camera.position.z) < SIDE_LENGTH / 2
        ? toMoveZ * 70 * delta
        : 0;

    // Update height based on velocity
    setHeight(height + velocity > 0 ? height + velocity : 0);
    setVelocity(velocity - GRAVITY);
    camera.position.y =
      getHeightAt(camera.position.x, camera.position.z) +
      5 +
      height +
      (moveUp || moveBack || moveLeft || moveRight);
  });

  return <mesh />;
};

export default Player;
