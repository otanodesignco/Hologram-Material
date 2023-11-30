import { Center } from "@react-three/drei";
import ClapTrap from "./ClapTrap";
import Monkey from "./Monkey";
import { Suzanne } from "./Suzanne"


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
        </Center>
  
    </>
  );
};
