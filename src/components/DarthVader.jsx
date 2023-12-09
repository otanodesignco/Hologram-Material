/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Konstantin Koretskyi (https://sketchfab.com/cgnoobmaster)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/darth-vader-62a4273131f949ed9559721f7fb9cf14
Title: Darth Vader
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import HologramMaterial from "./HologramMaterial";

export default function DarthVader(props) 
{
  const { nodes } = useGLTF("./models/highpoly/darth_vader.glb");

  const { rimColor, fresnelAmount, rimAlpha, baseColor, animationSpeed, blinking, blinkSpeed, blinkingAlpha, flashing, flashSize, flashSpeed, flashingAlpha, scanlineDirection, flashlineDirection, intensity, colorAlpha, fadeProgress } = useControls(
    {
      rimColor:
      {
        value: '#02FEFF'
      },
      fresnelAmount:
      {
        value: 0.9,
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
        value: true
      },
      blinkSpeed:
      {
        value: 5.8,
        min: 1,
        max: 20,
        step: 0.1
      },
      blinkingAlpha:
      {
        value: 6,
        min: 0,
        max: 10,
        step: 0.1
      },
      flashing:
      {
        value: true
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
        options: ['up', 'down'],
        value: 'down'
      },
      intensity:
      {
        value: 1.7,
        min: 1,
        max: 5,
        step: 0.1
      },
      colorAlpha:
      {
        value: 1,
        min: 0,
        max: 1,
        step: 0.1
      },
      fadeProgress:
      {
        value: 0,
        min: 0,
        max: 1,
        step: 0.01
      }
    })

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
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
                colorIntensity={ intensity }
                colorAlpha={ colorAlpha }
                fadeAmount={ fadeProgress }
            />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
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
                colorIntensity={ intensity }
                colorAlpha={ colorAlpha }
                fadeAmount={ fadeProgress }
            />

        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
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
                colorIntensity={ intensity }
                colorAlpha={ colorAlpha }
                fadeAmount={ fadeProgress }
            />
            
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
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
                colorIntensity={ intensity }
                colorAlpha={ colorAlpha }
                fadeAmount={ fadeProgress }
            />

        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
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
                colorIntensity={ intensity }
                colorAlpha={ colorAlpha }
                fadeAmount={ fadeProgress }
            />

        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("./models/highpoly/darth_vader.glb");