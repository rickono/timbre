import React from 'react'
import Terrain from './Terrain';
import { PointerLockControls, Stars } from 'drei';
import SimplexNoise from 'simplex-noise';
import Lights from './Lights';
import { Canvas } from 'react-three-fiber';
import biomes from '../helpers/biomes';
import Player from './Player';
const Biome = ({wrapGetHeightAt , wrapCreateMap, DIVISIONS, SIDE_LENGTH, biome}) => {
    //could provide a seed
    const simplex = new SimplexNoise();
    const {
        colors,
        colorThresholds,
        freqs,
        amps,
        sqThresh,
        finalScaleAndThresh,
        fog,
        ambientLight,
        directionalLight,
        stars
    } = biome
    const [ directionalColor, directionalIntensity ] = directionalLight
    const [ isFog, fogColor, fogNear, fogFar ] = fog
    const [ ambientColor, ambientIntensity ] = ambientLight

    const createMap = wrapCreateMap(freqs, amps, sqThresh, finalScaleAndThresh, simplex)
    const getHeightAt = wrapGetHeightAt(createMap)
    return (
        <Canvas
            shadowMap
            colorManagement
            camera={{ position: [30, 30, 30], fov: 60}}
        >
        {isFog && <fog attach='fog' args={[fogColor, fogNear, fogFar]} />}
            <Terrain
                args={[SIDE_LENGTH, SIDE_LENGTH, DIVISIONS, DIVISIONS]}
                createMap={createMap}
                getHeightAt={getHeightAt}
                colors={colors}
                colorThresholds={colorThresholds}
                rockColors={["grey", "darkgrey"]}
                treeLeafColors={[0x006400, 0x90EE90, 0x9FEE90]}
                treeTrunkColors={[0x654321]}
                cloudColors={["white", "lightgrey", "lightpink"]}
            />
            <PointerLockControls />
            <Lights directionalColor={directionalColor}
                    directionalIntensity={directionalIntensity}
                    ambientColor={ambientColor}
                    ambientIntensity={ambientIntensity}
            /> 
            {stars && <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={3000} // Amount of stars (default=5000)
                factor={12} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade // Faded dots (default=false)
            />}
            {/* <Water /> */}
            <Player getHeightAt={getHeightAt} />
      </Canvas>
    )
}

export default Biome
