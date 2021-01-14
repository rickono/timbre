import React, { useEffect, useMemo } from 'react';
import Bush from './Bush';
import SimpleTree from './SimpleTree';
import StackedTree from './StackedTree';
import {randRange, randInt, randVal} from "../../helpers/utils"

//some prob thing where lwess probable the higher it is and it will become shorter..also bushes should only be on the ground
const Trees = ({treeNumber, getHeightAt, sideLength, leafColors, trunkColors, minHeight, maxHeight}) => {
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
    //logic so that you dont have tall trees up high...
    //logic so trees are not in the water
    return positions.map((p) => {
        const r = Math.random()
                return r < 0.5 ? <StackedTree key={r} 
                                              position={p} 
                                              height={randRange(3, 10)} 
                                              leafColor={randVal(leafColors)} 
                                              trunkColor={randVal(trunkColors)} 
                                              sides={randInt(3, 5)} /> : 
                        <SimpleTree key={p[0]} 
                                    position={p} 
                                    height={randRange(3, 10)} 
                                    leafColor={randVal(leafColors)} 
                                    trunkColor={randVal(trunkColors)} 
                                    sides={randInt(3, 5)} />
        });
};
export default Trees;