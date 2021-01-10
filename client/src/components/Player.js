import React from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';

const SPEED = 0.2;

const Player = ({ getHeightAt }) => {
  const { camera } = useThree();
  useFrame(() => {
    const lookingAt = new THREE.Vector3();
    camera.getWorldDirection(lookingAt);

    const length = Math.sqrt(lookingAt.x ** 2 + lookingAt.z ** 2);

    camera.position.x += (lookingAt.x / length) * SPEED;
    camera.position.z += (lookingAt.z / length) * SPEED;
    camera.position.y = getHeightAt(camera.position.x, camera.position.z) + 5;
  });

  return <mesh />;
};

export default Player;
