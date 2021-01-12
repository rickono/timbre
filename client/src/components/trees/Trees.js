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
const Trees = ({treeNumber, getHeightAt, sideLength, minHeight, maxHeight}) => {
    const randInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    const randRange = (max, min) => Math.random() * (max - min) + min
    let positions = []
    //so the positions are bounded not in water or on mountains
    for (let i = 0; i < treeNumber; i++){
        let x = Math.random() * sideLength - sideLength / 2
        let z = Math.random() * sideLength - sideLength / 2
        let height = getHeightAt(x, z)
        while (height > maxHeight || height < minHeight) {
            x = Math.random() * sideLength - sideLength / 2
            z = Math.random() * sideLength - sideLength / 2
            height = getHeightAt(x, z)
        }
        positions.push([x, height, z])
    }
    //logic so that you don thave tall trees up high...
    //logiuc so trees are not in the water
    return positions.map((p) => {
        const r = Math.random()
        return r < 0.33 ? <StackedTree position={p} 
                                       baseWidth={randRange(2, 5)} 
                                       height={randRange(3, 10)} 
                                       leafColor={0x006400} 
                                       trunkColor={0x654321} 
                                       sides={randInt(3, 5)} /> : 
        (r < 0.66 ? <SimpleTree position={p} 
                                width={randRange(1.5, 3)} 
                                height={randRange(3, 10)} 
                                leafColor={0x006400} 
                                trunkColor={0x654321} 
                                sides={randInt(3, 5)}
                            />: <Bush position={p} 
                                      widthSegment={3} 
                                      heightSegement={5} 
                                      radius={randRange(1, 3)}
                                />
        )
    });
};
export default Trees;