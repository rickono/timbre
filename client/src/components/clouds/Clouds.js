import React, { useMemo } from 'react';
import * as THREE from "three";
import Cloud from './Cloud';
import {randVal, randInt} from "../../helpers/utils"

const Clouds = ({cloudnumber, getHeightAt, side_length, colors, minHeight, maxHeight}) => {
    let positions = []
    //maybe make thsi into some simplex noise thing
    for (let i =0; i < cloudnumber; i++){
        //check to make sure it is above mountains
        let pos = Math.random() * (maxHeight - minHeight) + minHeight 
        let x = Math.random() * side_length - side_length/2 
        let z = Math.random() * side_length - side_length/2 
        while (pos < getHeightAt(x, z) + 5){
            pos++
        }
        positions.push([x, pos, z])
    }
    return positions.map(p => <Cloud key={p[0]} 
                                     position={p} 
                                     numPuffs={[7, 10]} 
                                     radius={[1, 5]} 
                                     widthSegments={[5, 9]} 
                                     heightSegments={[5, 9]} 
                                     color={randVal(colors)}
                                     />);
}
export default Clouds;