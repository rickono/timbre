import React from 'react';
import Rock from './Rock';

const Rocks = ({rockNumber, getHeightAt, sideLength, colors, minHeight, maxHeight}) => {
    const randInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    const randVal = (arr) => arr[randInt(0, arr.length - 1)]
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
    
    return positions.map(p => <Rock position={p} radius={randInt(0.5, 3)} color={randVal(colors)} detail={0}/>);
}
export default Rocks
     