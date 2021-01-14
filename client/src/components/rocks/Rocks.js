import React from 'react';
import Rock from './Rock';
import {randVal, randInt} from "../../helpers/utils"

const Rocks = ({rockNumber, getHeightAt, sideLength, colors, minHeight, maxHeight}) => {
    let positions = []

    for (let i = 0; i < rockNumber; i++){
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
    
    return positions.map(p => <Rock key={p[0]}
                                    position={p} 
                                    radius={randInt(0.5, 3)} 
                                    color={randVal(colors)} 
                                    detail={0}/>);
}
export default Rocks
     