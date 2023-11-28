/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 ./public/models/highpoly/suzanne.glb 
Author: robfaulkner549 (https://sketchfab.com/robfaulkner549)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/high-poly-blender-monkey-suzanne-396cc8d256514020b18dbf59d646294d
Title: High Poly Blender Monkey (Suzanne)
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { ShaderMaterial, Vector2, Color, BoxGeometry } from 'three'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'


export function Suzanne(props) 
{

  const alpha = props.alpha ? props.alpha : false

  const { speed, FresnelFactor, FresnelBias, FresnelIntensity, rimColor, bodyColor, cutProgress, cOpacity } = useControls(
    {
      speed:
      {
        value: 15,
        min: 1,
        max: 30,
        step: 0.001
      },
      FresnelFactor:
      {
        value: 3.0,
        min: 0,
        max: 30,
        step: 0.001
      },
      FresnelBias:
      {
        value: 0.10,
        min: -1,
        max: 1,
        step: 0.001
      },
      FresnelIntensity:
      {
        value: 1.50,
        min: 0,
        max: 50,
        step: 0.001
      },
      rimColor:
      {
        value: '#02FEFF'
      },
      bodyColor:
      {
        value: '#FF88FE'
      },
      cutProgress:
      {
        value: 0,
        min: 0,
        max: 1,
        step: 0.1
      },
      cOpacity:
      {
        value: 1,
        min: 0,
        max: 1,
        step: 0.01
      }
    }
  )

  const uniforms =
{

  uResolution: { value: new Vector2( window.innerWidth, window.innerHeight ) },
  uColor: { value: new Color( 0xFF88FE ) },
  uTime: { value: 0 },
  uTexture: { value: useTexture( '/textures/HologramLines_Cool.png' )},
  uAnimationSpeed: { value: speed },
  uRimColor: { value: new Color( 0x02FEFF ) },
  uFresnelFactor: { value: FresnelFactor },
  uFresnelBias: { value: FresnelBias },
  uIntensity: { value: FresnelIntensity },
  uCutProgress: { value: cutProgress },
  uOpacity: { value: cOpacity }

}

const vertex = /*glsl*/`
uniform float uTime;

out vec3 vObjectPosition;
out vec2 vUv;
out vec3 vView;
out vec3 vNormal;


void main()
{

  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vec4 worldNormal = modelMatrix * vec4( normal, 0.0 );

  vObjectPosition = worldPosition.xyz;

  vUv = uv;
  vView = normalize( cameraPosition - worldPosition.xyz );
  vNormal = normalize( worldNormal.xyz );

  // add wave to z axis for a wobble effect
  //vec3 wobblePos = position;

  //wobblePos.z += sin( position.x * 0.7 + uTime * 2. ) * 0.5;
  //wobblePos.x += cos( position.y * 0.03 + uTime * 5. ) * 0.1;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}

`

const fragment = /*glsl*/`

uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uTime;
uniform sampler2D uTexture;
uniform float uAnimationSpeed;
uniform float uFresnelFactor;
uniform float uFresnelBias;
uniform vec3 uRimColor;
uniform float uIntensity;
uniform float uCutProgress;
uniform float uOpacity;

in vec3 vObjectPosition;
in vec2 vUv;
in vec3 vNormal;
in vec3 vView;

/*
//
//  Fresnel function
//
*/

float fresnelBiasFunc( float factor, float fresnelBias, vec3 normal, vec3 view )
{

  return fresnelBias + ( 1.0 - fresnelBias ) * pow( 1.0 - dot( normal , view ), factor );

}

float fresnelFunc( float amount, vec3 normal, vec3 view)
{
  return pow((1.0 - clamp(dot(normalize(normal), normalize(view)), 0.0, 1.0 )), amount);
}

// random
float rand(vec2 co) 
{
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// flicker function

float flicker( float amt, float time )
{
    return clamp( fract( cos( time ) * 10. ), amt, 1.0 );
}

float flashing( float speed, float time )
{
  return 0.5 * 0.5 + sin( uTime * speed );
}

// random noise

float random(vec2 uv) 
{ 
  return fract(sin(dot(uv, vec2(12.9898,78.233)))* 43758.5453123);
}

// shine function

float shine( float shineSize, float direction, float speed, float time )
{
    return step( 1.0 - shineSize * 0.5, 0.5 + 0.5 * sin( direction + time * speed ) );
}


void main()
{

  float time = uTime;

  vec2 objectSpace = vObjectPosition.xy * 0.5 + 0.5;


  //float diffuse = clamp( clamp( normal, ), 0., 1. );

  vec2 uv = gl_FragCoord.xy / uResolution; // screen coordinates

  // vec2 uv = vObjectPosition.xy; // creates a line donw the middle, don't use world space position

  float animationOffset = mod( time * ( uAnimationSpeed * 0.01 ), 1.0 ); // animation calculation that repeats

  uv.y += animationOffset; // animate uv to repeat seamless 

  uv = fract( uv ); // split uv into 2 for tiling

  /* animate uv */


  /* get texture and alpha test */

  vec4 hologramTexture = texture( uTexture, uv); // set lines texture
  vec3 holoLines = 1.0 - hologramTexture.rbg; // get rid of alpha

  float fresnel = fresnelBiasFunc( uFresnelFactor, uFresnelBias, vNormal, vView );
  fresnel = fresnelFunc( uFresnelFactor, vNormal, vView );

  float alphaClip = holoLines.r; // determine what parts to show

  //if( alphaClip < 0.1 ) discard;

  /* 
  //
  // Flicker Effect
  //
  //
  */

  // flicker calculation
  float flash = flashing( 8., uTime );
  // flash = rand( vUv + uTime );
  // flicker color
  vec3 flashColor = vec3(1.0);
  // flicker effect with color
  flashColor *= flash;

  /**
   * 
   * Shine Calculations
   * 
   */

  // shining calculation
  float shining = shine( 0.001, objectSpace.y, 2.0, time );
  
  // shine color
  vec3 shineColor = vec3( 1.0 );

  shineColor += shining;


  vec3 modelSpace = vObjectPosition * 0.5 + 0.5;
  vec2 uv2 = objectSpace;
  float cut = 1.0 - step( uCutProgress, uv2.y );

  /* final color 
  //
  //
  //
  */

  // diffuse color
  float diffuse = dot(vNormal, vView );
  vec3 diffuseColor = ( uColor * 2. ) * diffuse;

  float alpha = ${ alpha ? 'fresnel' : 1.0.toFixed(1) };

  // fresnel color
  vec3 fresnelColor = uRimColor * fresnel * uIntensity;
  fresnelColor = uRimColor * fresnel;

  vec3 color = vec3(0.);
  color = (diffuseColor * holoLines + fresnelColor); // color lines
  //color = diffuseColor + fresnelColor;
  // mix between the color and the flash effect by an alpha value multipied by the flash calculation
  color = mix( color, flashColor, flash * 0.06);

  // mix between fresnel flashing and shine
  color = mix( color, shineColor, shining * 0.2 );


  gl_FragColor = vec4( color, alphaClip * cut * uOpacity  ); // output color



}


`

const hologramShader = new ShaderMaterial(
  {
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: uniforms,
    transparent: true,
  }
)

const model = useRef()

  const { nodes } = useGLTF('./models/highpoly/Monkey.glb')

  useFrame( ( state ) =>
  {

    model.current.material.uniforms.uTime.value = state.clock.elapsedTime
    model.current.material.uniforms.uFresnelFactor.value = FresnelFactor
    model.current.material.uniforms.uFresnelBias.value = FresnelBias
    model.current.material.uniforms.uIntensity.value = FresnelIntensity
    model.current.material.uniforms.uColor.value = new Color( bodyColor )
    model.current.material.uniforms.uRimColor.value = new Color( rimColor )
    model.current.material.uniforms.uCutProgress.value = cutProgress
    model.current.material.uniforms.uOpacity.value = cOpacity

    

  })

  return (
    <group { ...props } dispose={ null }>
      <mesh
        ref={ model }
        geometry={ nodes.Suzanne.geometry }
        material={ hologramShader }
        rotation-y={ 180 * Math.PI / 180 }
        
      />
    </group>
  )

}

useGLTF.preload('./models/highpoly/Monkey.glb')
