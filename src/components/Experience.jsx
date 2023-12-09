import { Center } from "@react-three/drei";
import ClapTrap from "./ClapTrap";
import Monkey from "./Monkey";
import { Suzanne } from "./Suzanne"
import DarthVader from "./DarthVader";


export const Experience = () => 
{
  return (
    <>

        {/* <Suzanne /> */}
        {/* <Monkey /> */}
        <Center>
          <ClapTrap
            scale={ 1.2 }
          />
          {/* <DarthVader
            scale={ 1.3 }
          /> */}
        </Center>
  
    </>
  );
};
