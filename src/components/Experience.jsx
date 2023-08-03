import { Suzanne } from "./Suzanne"
import Torus from "./Torus";




export const Experience = () => 
{
  return (
    <>
      <Suzanne position-x={ -1 } scale={ 1.5 } />
      <Torus position-x={ 1 } />
    </>
  );
};
