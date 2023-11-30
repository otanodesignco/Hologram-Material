import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Experience } from "./components/Experience";
import { SRGBColorSpace } from "three";
import { Leva } from "leva";

function App() {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 0, 5], fov: 30 }}
      gl={{ outputColorSpace: SRGBColorSpace }}
    >
      <OrbitControls makeDefault />
      {/* <Leva hidden /> */}
      <color attach="background" args={["#353640"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
