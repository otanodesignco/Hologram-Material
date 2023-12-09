import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Experience } from "./components/Experience";
import { SRGBColorSpace } from "three";
import { Leva } from "leva";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function App() {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 0, 5], fov: 30 }}
      gl={{ outputColorSpace: SRGBColorSpace }}
    >
      <OrbitControls makeDefault />
      {/* <Leva hidden /> */}
      <color attach="background" args={["#000000"]} />
      <Experience />
      <EffectComposer>
        <Bloom
          luminanceThreshold={15}
          luminanceSmoothing={ 0.9 }
        />
      </EffectComposer>
    </Canvas>
  );
}

export default App;
