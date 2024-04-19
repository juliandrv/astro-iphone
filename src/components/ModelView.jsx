import { Suspense } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera, View } from '@react-three/drei';
import { OrbitControls } from 'three-stdlib';

extend({ OrbitControls });

import Lights from './Lights';
import IPhone from './IPhone';
import Loader from './Loader';
import { extend, useThree } from '@react-three/fiber';

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  function Controls() {
    const {
      camera,
      gl: { domElement },
    } = useThree();

    return (
      <orbitControls
        args={[camera, domElement]}
        makeDefault
        ref={controlRef}
        target={new THREE.Vector3(0, 0, 0)}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        onEnd={() =>
          setRotationState(controlRef.current.getAzimuthalAngle())
        }
      />
    );
  }

  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${
        index === 2 ? 'right-[-100%]' : ''
      }`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <Controls />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
