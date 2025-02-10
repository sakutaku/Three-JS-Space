import {
  OrbitControls,
  Sphere,
  Plane,
  Stats,
  useHelper,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { DirectionalLightHelper } from "three";
import { Environment } from "@react-three/drei";
import Space from "./assets/stars.jpg";
// import { MeshStandardMaterial } from "three";

const App = () => {
  const dirLight = useRef(null);
  const sphereRef = useRef(null);
  useHelper(dirLight, DirectionalLightHelper, 2, "FFD65A");

  const [velocity, setVelocity] = useState(0);
  const gravity = -0.01; // Gravity effect
  const bounce = 0.7; 
  const minVelocity = 0.5;

  // useFrame(({ clock }) => {
  //   const elapsedTime = clock.getElapsedTime();
  //   const sphere = sphereRef.current;

  //   sphere.position.x = Math.cos(elapsedTime) * 1.5;
  //   sphere.position.z = Math.sin(elapsedTime) * 1.5;
  //   sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));
  // });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const sphere = sphereRef.current;
    if (!sphere) return;

    // Maintain circular movement
    sphere.position.x = Math.cos(elapsedTime) * 1.5;
    sphere.position.z = Math.sin(elapsedTime) * 1.5;
    // sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

    // Apply bouncing logic
    sphere.position.y += velocity;
    setVelocity((prev) => prev + gravity); // Apply gravity effect

    // Ground collision check
    if (sphere.position.y <= 0.5) {
      sphere.position.y = 0.5;

      // Prevent infinite shaking by stopping very small velocity values
      if (Math.abs(velocity) > minVelocity) {
        setVelocity(-velocity * bounce); // Bounce with reduced speed
      } else {
        setVelocity(0); // Stop movement if the bounce is too weak
      }
    }
  });

  const handleClick = () => {
    setVelocity(0.2); // Give an initial upward boost
  };

  return (
    <>
    <Environment background files={Space} />
      <ambientLight
        color={"#FF9D23"}
        // intensity={}
      />
      <directionalLight
        ref={dirLight}
        color={"#DCD7C9"}
        position={[2, 2, -1]}
        intensity={0.9}
        shadow-mapSize={[1024, 1024]}
        castShadow={true}
      />
      <Sphere
        ref={sphereRef}
        args={[0.5, 32, 32]}
        position-y={0.5}
        castShadow={true}
        onClick={handleClick}
      >
        <meshStandardMaterial />
      </Sphere>
      <Plane
        args={[5, 5]}
        receiveShadow
        position={[0, -0.5, 0]}
        rotation-x={-Math.PI / 2} // часто исплользуются в проектах число Пи
      >
        <meshStandardMaterial color={"#DCD7C9"} />
      </Plane>
      {/* <axesHelper args={[5]} /> */}
      {/* <gridHelper /> */}
      <OrbitControls />
      <Stats />
    </>
  );
};

export default App;
