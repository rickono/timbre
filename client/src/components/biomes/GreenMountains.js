import React from 'react'
import Terrain from '../Terrain';
import { PointerLockControls, OrbitControls, Stars } from 'drei';
import SimplexNoise from 'simplex-noise';
import Lights from '../../components/Lights';
import biomes from '../../helpers/biomes';
import Player from '../../components/Player';
const GreenMountains = ({wrapGetHeightAt , wrapCreateMap, DIVISIONS, SIDE_LENGTH}) => {
    //could provide a seed
    const simplex = new SimplexNoise();
    const {
        colors,
        colorThresholds,
        freqs,
        amps,
        sqThresh,
        finalScaleAndThresh,
    } = biomes.greenMountains
    console.log("here")
    console.log(typeof(wrapCreateMap))
    console.log("here2")
    console.log(typeof(wrapGetHeightAt))
    const createMap = wrapCreateMap(freqs, amps, sqThresh, finalScaleAndThresh, simplex)
    const getHeightAt = wrapGetHeightAt(createMap)
    return (
        <div>
            <fog attach='fog' args={['black', 1, 200]} />
            <Terrain
                args={[SIDE_LENGTH, SIDE_LENGTH, DIVISIONS, DIVISIONS]}
                createMap={createMap}
                getHeightAt={getHeightAt}
                colors={colors}
                colorThresholds={colorThresholds}
            />
            <Lights /> 
            <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={3000} // Amount of stars (default=5000)
                factor={12} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade // Faded dots (default=false)
            />
            {/* <Water /> */}
            <Player getHeightAt={getHeightAt} />
        </div>
    )
}

export default GreenMountains
