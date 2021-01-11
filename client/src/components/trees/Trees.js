import React, { useEffect, useMemo } from 'react';
import * as THREE from "three";
import Bush from './Bush';
import SimpleTree from './SimpleTree';
import StackedTree from './StackedTree';

// const Trees = ({ positions }) => {
//   return positions.map((position) => {
//     return <Tree position={position} />;
//   });
// }
// export default Trees;
// NOTE: generate trees of different sizes and posisions
//some prob thing where lwess probable the higher it is and it will become shorter..also bushes should only be on the ground
const Trees = ({treeNumber, getHeightAt}) => {
    let positions = []
    for (let i =0; i < treeNumber; i++){
        const x = Math.random() * 160 - 80
        const z = Math.random() * 160 - 80 
        positions.push([x, getHeightAt(x,z), z])
    }
    //logic so that you don thave tall trees up high...
    //logiuc so trees are not in the water
    return positions.map((p) => {
        const r = Math.random()
        return r < 0.33 ? <StackedTree position={p} /> : 
        (r < 0.66 ? <SimpleTree position={p}/>: <Bush position={p}/>)
    });
};
export default Trees;