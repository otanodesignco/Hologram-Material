import { useGLTF } from "@react-three/drei"
import HologramMaterial from "./HologramMaterial.jsx"
import { useRef } from "react"
import { useControls } from "leva"


export default function Monkey( props )
{
    const { nodes } = useGLTF( './models/highpoly/Monkey.glb' )

    const { rimColor, fresnelAmount, rimAlpha, baseColor, animationSpeed, blinking, blinkSpeed, blinkingAlpha, flashing, flashSize, flashSpeed, flashingAlpha, scanlineDirection, flashlineDirection } = useControls(
      {
        rimColor:
        {
          value: '#02FEFF'
        },
        fresnelAmount:
        {
          value: 0.8,
          min: 0,
          max: 5,
          step: 0.1
        },
        rimAlpha:
        {
          value: 1.0,
          min: 0,
          max: 1
        },
        baseColor:
        {
          value: '#FF88FE'
        },
        animationSpeed:
        {
          value: 10,
          min: 1,
          max: 50,
          step: 1
        },
        blinking:
        {
          value: false
        },
        blinkSpeed:
        {
          value: 8,
          min: 1,
          max: 20,
          step: 0.1
        },
        blinkingAlpha:
        {
          value: 8,
          min: 0,
          max: 10,
          step: 0.1
        },
        flashing:
        {
          value: false
        },
        flashSize:
        {
          value: 1,
          min: 1,
          max: 10
        },
        flashSpeed:
        {
          value: 2,
          min: 1,
          max: 10,
          step: 0.1
        },
        flashingAlpha:
        {
          value: 0.2,
          min: 0,
          max: 1,
          step: 0.1
        },
        scanlineDirection:
        {
          options: ['up', 'down']
        },
        flashlineDirection:
        {
          options: ['up', 'down']
        }
      })

    const model = useRef()

    return (
        <group { ...props } dispose={ null }>
          <mesh
            ref={ model }
            geometry={ nodes.Suzanne.geometry }
            rotation-y={ 180 * Math.PI / 180 }
          >
            <HologramMaterial
              fresnelColor={ rimColor }
              scanLines='/textures/HologramLines_Cool.png'
              fresnelAmt={ fresnelAmount }
              baseColor={ baseColor }
              fresnelAlpha={ rimAlpha }
              animateSpeed={ animationSpeed }
              blinking={ blinking }
              blinkingSpeed={ blinkSpeed }
              blinkAlpha={ blinkingAlpha }
              flashLine={ flashing }
              flashSize={ flashSize }
              flashingSpeed={ flashSpeed }
              flashAlpha={ flashingAlpha }
              scanlineDirection={ scanlineDirection }
              flashingDirection={ flashlineDirection }
            />
            
          </mesh>
        </group>
      )
}