import React, { useMemo } from 'react';
import * as THREE from "three";
import Cloud from './Cloud';
//clouds wont work if tall enough
// add could rigns
//add different size clouds
const Clouds = ({cloudnumber, side_length, color, minHeight, maxHeight}) => {
    let positions = []
    //maybe make thsi into some simplex noise thing
    for (let i =0; i < cloudnumber; i++){
        positions.push([Math.random() * side_length - side_length/2, 
                        Math.random() * (maxHeight - minHeight) + minHeight, 
                        Math.random() * side_length - side_length / 2])
    }
    return positions.map(p => <Cloud position={p} 
                                     numPuffs={[7, 10]} 
                                     radius={[1, 5]} 
                                     widthSegments={[5, 9]} 
                                     heightSegments={[5, 9]} 
                                     color={color}
                                     />);
}
export default Clouds;