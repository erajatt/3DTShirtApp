import { Canvas } from '@react-three/fiber';
import { Environment, Center, OrbitControls } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';


const CanvasModel = () => {
  return (
    <Canvas
    shadows
    camera={{ position:[-0.4, 0, 2], fov:25 }}
    gl={{ preserveDrawingBuffer:true }}
    className='w-full max-w-full h-full transition-all ease-in'
    >
      <OrbitControls enableZoom={false}/>
      <ambientLight intensity={0.5}/>
      <Environment preset='city' />

        <Backdrop/>
        <Center>
          <Shirt/>
        </Center>

    </Canvas>
  )
}

export default CanvasModel