import React, { useRef } from 'react'
import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { Vector2, Color } from 'three'

export default function HologramMaterial({
    fresnelColor = 0x02FEFF, // rim light color
    fresnelAmt = 1.0, // amount of fresnel
    scanlineDirection = 'up', // animation direction
    baseColor = 0xFF88FE, // base object color
    scanLines = '/textures/HologramLines_Cool.png', // texture for scanlines
    animateSpeed = 20, // speed of the animation
    fresnelAlpha = 1, // number between 0 - 1 to control alpha
    blinking = false, // enables blinking
    flashLine = false, // enables the flash line,
    blinkingSpeed = 8, // blinking speed
    blinkAlpha = 8, // alpha of blilnking between 1 - 10
    flashSize = 1, // size of the flash
    flashingDirection = 'down', // direction of flashing animation
    flashingSpeed = 2, // flashing speed
    flashAlpha = 0.2, // alpha of flash between 0 - 1
    colorIntensity = 1, // fake bloom for cheaper draw calls
    colorAlpha = 1 // optional alpha for color
})
{
    // shader uniforms
    const uniforms =
    {
        uFresnelColor: new Color( fresnelColor ),
        uFresnelAmt : fresnelAmt,
        uBaseColor: new Color( baseColor ),
        uScanTexture: useTexture( scanLines ),
        uTime: 0,
        uResolution: new Vector2( window.innerWidth, window.innerHeight ),
        uAnimateSpeed: animateSpeed,
        uFresnelAlpha: fresnelAlpha,
        uBlinkingSpeed: blinkingSpeed,
        uFlashSize: flashSize,
        uFlashSpeed: flashingSpeed,
        uBlinkAlpha: blinkAlpha,
        uFlashAlpha: flashAlpha,
        uIntensity: colorIntensity,
        uAlpha: colorAlpha
    }

    // handle direction logic for scanlines here

    let ScanDirection = 1

    if( scanlineDirection === 'up' || scanlineDirection === 'UP' || scanlineDirection === 'Up' )
    {
        // scanline direction will be up or 2
        ScanDirection = 1
    }
    else if( scanlineDirection === 'down' || scanlineDirection === 'DOWN' || scanlineDirection === 'Down' )
    {
        // 2 but we only test for one
        ScanDirection = 2
    }
    else
    {
        // default direction
        ScanDirection = 1
    }

    // flashing direction
    let FlashlineDirection = 1

    if( flashingDirection === 'up' || flashingDirection === 'UP' || flashingDirection === 'Up' )
    {
        // scanline direction will be up or 2
        FlashlineDirection = 1
    }
    else if( flashingDirection === 'down' || flashingDirection === 'DOWN' || flashingDirection === 'Down' )
    {
        // 2 but we only test for one
        FlashlineDirection = 2
    }
    else
    {
        // default direction
        FlashlineDirection = 1
    }

    // vertex shader code
    const vertexShader = /*glsl*/`

    out vec3 vObjectPosition;
    out vec2 vUv;
    out vec3 vView;
    out vec3 vNormal;


    void main()
    {

    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vec4 worldNormal = modelMatrix * vec4( normal, 0.0 );

    vObjectPosition = worldPosition.xyz * 0.5 + 0.5;

    vUv = uv;
    vView = normalize( cameraPosition - worldPosition.xyz );
    vNormal = normalize( worldNormal.xyz );

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }

    `

    // fragment shader code
    const fragmentShader = /*glsl*/`

    uniform vec3 uFresnelColor;
    uniform float uFresnelAmt;
    uniform vec3 uBaseColor;
    uniform sampler2D uScanTexture;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uAnimateSpeed;
    uniform float uFresnelAlpha;
    uniform float uBlinkAlpha;
    uniform float uFlashAlpha;
    uniform float uBlinkingSpeed;
    uniform float uFlashSize;
    uniform float uFlashSpeed;
    uniform float uIntensity;
    uniform float uAlpha;

    in vec3 vObjectPosition;
    in vec2 vUv;
    in vec3 vView;
    in vec3 vNormal;

    // fresnel function without bias
    float fresnelFunc( float amount, vec3 normal, vec3 view)
    {
        return pow( ( 1.0 - clamp( dot( normalize( normal ), normalize( view ) ), 0.0, 1.0 ) ), amount );
    }

    // blinking function
    float blinking( float speed, float time )
    {
        return 0.5 * 0.5 + sin( uTime * speed );
    }

    // animated shine function
    float flashing( float shineSize, float direction, float speed, float time )
    {
        return step( 1.0 - shineSize * 0.5, 0.5 + 0.5 * sin( direction + time * speed ) );
    }

    float lambertLighting( vec3 normal, vec3 viewDirection )
    {
        return dot( normal, viewDirection );
    }

    void main()
    {

        vec2 uv = gl_FragCoord.xy / uResolution;

        float colorAlpha = clamp( uAlpha, 0., 1. );

        // create animated seamless repeating uv based on animate speed and time
        float time = uTime;
        float animateOffset = mod( time * ( uAnimateSpeed * 0.01 ), 1.0 );

        uv.y = ${ ScanDirection === 1 ? 'uv.y - animateOffset;': 'uv.y + animateOffset;' }
        uv = fract( uv );

        // create lambert lighting
        float diffuse = lambertLighting( vNormal, vView );
        vec3 diffuseColor = ( uBaseColor * 2.) * diffuse;

        // create hologram scanlines
        vec4 holoTexture = texture( uScanTexture, uv );
        float scanlines = holoTexture.r;
        float scanlinesAlpha = scanlines;

        // create fresnel rim light
        float fresnel = fresnelFunc( uFresnelAmt, vNormal, vView );
        vec3 fresnelColor = uFresnelColor * fresnel;

        // create blinking
        float blink = blinking( uBlinkingSpeed, time );
        vec3 blinkColor = vec3( 1.0 ) * blink;

        // create animated flashing
        float flashDirection = ${ FlashlineDirection === 1 ? '-vObjectPosition.y;' : 'vObjectPosition.y;'}
        float flash = flashing( 0.001 * uFlashSize, flashDirection, uFlashSpeed, time );
        vec3 flashColor = vec3( 1.0 ) * flash;


        vec3 finalColor = diffuseColor * scanlines;


        // mix layers for final color effect

        // fresnel layer
        finalColor = mix( finalColor, fresnelColor, fresnel * uFresnelAlpha );

        // blinking layer, hidden by default
        ${ !blinking ? '' : 'finalColor = mix( finalColor, blinkColor, blink * ( 0.01 * clamp( uBlinkAlpha, 0., 10.) ) );' }

        // flashing layer, hidden by default
        ${ !flashLine ? '': 'finalColor = mix( finalColor, flashColor, flash * clamp( uFlashAlpha, 0., 1. ) );' }

        gl_FragColor = vec4( finalColor * uIntensity, colorAlpha * scanlinesAlpha );
    }

    `

    // create a shader material from drei
    const HologramMaterial = shaderMaterial( uniforms, vertexShader, fragmentShader )

    // extend material for use in r3f
    extend({ HologramMaterial })

    // animate the time
    useFrame( ( { state }, delta  ) =>
    {
        // assign time uniform to the delta value
        holoRef.current.uniforms.uTime.value += delta
    } )

    const holoRef = useRef()

    return (

        <hologramMaterial
            key={ HologramMaterial.key }
            transparent={ true }
            ref={ holoRef }
        />
    )

}