import React, { useMemo } from 'react';
import * as THREE from "three";
import Cloud from './Cloud';
//clouds wont work if tall enough
// add could rigns
//add different size clouds
// position, numPuffs, radius, widthSegments, heightSegments, offset
const Clouds = ({cloudnumber}) => {
    const randInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let positions = []
    for (let i =0; i < cloudnumber; i++){
        positions.push([Math.random() * 160 - 80, Math.random() * 5 + 17,Math.random() * 160 - 80])
    }
    return positions.map(p => <Cloud position={p} 
                                     numPuffs={randInt(1,10)} 
                                     radius={Math.random() * .5 + 0.7} 
                                     widthSegments={randInt(5, 9)} 
                                     heightSegments={randInt(5, 9)} 
                                     offset={Math.random() * (0.7- 0.3) + 0.5}
                                     />);
}
export default Clouds;