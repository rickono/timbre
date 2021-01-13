import React from 'react'
import biomes from '../../helpers/biomes'

const GreenMountains = (getHeightAt , createMap, ) => {
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
        </div>
    )
}

export default GreenMountains
