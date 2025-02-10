import { OrbitControls, Sphere, Plane, Stats, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";
// import { MeshStandardMaterial } from "three";

const App = () => {
  const dirLight = useRef(null);
  const sphereRef = useRef(null);
  useHelper(dirLight, DirectionalLightHelper, 1, "red");

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    const sphere = sphereRef.current;

    sphere.position.x = Math.cos(elapsedTime) * 1.5;
    sphere.position.z = Math.sin(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  });

  return (
    <>
      <ambientLight 
        color={"#D70654"}
        // intensity={} 
      />
      <directionalLight
        ref={dirLight}
        color={"#DCD7C9"}
        position={[2, 2, -1]}
        intensity={.9}
        shadow-mapSize={[1024, 1024]} 
        castShadow={true}
       />
      <Sphere 
        ref={sphereRef}
        args={[0.5, 32, 32]}
        position-y={0.5}
        castShadow={true}
      >
        <meshStandardMaterial />
      </Sphere>
      <Plane 
        args={[5, 5]} 
        receiveShadow
        position={[0, -.5, 0]}
        rotation-x={-Math.PI / 2} // часто исплользуются в проектах число Пи
      >
        <meshStandardMaterial color={"#DCD7C9"} />
      </Plane>
      {/* <axesHelper args={[5]} /> */}
      {/* <gridHelper /> */}
      <OrbitControls />
      <Stats />
    </>
  )
};

export default App;