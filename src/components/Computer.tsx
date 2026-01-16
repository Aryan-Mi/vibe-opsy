import { useGLTF, Html, Center } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { AppState } from '../App'
import ScreenUI from './ScreenUI'

interface ComputerProps {
  appState: AppState
  onFileUpload: (file: File) => void
}

export default function Computer({ appState, onFileUpload }: ComputerProps) {
  const { scene } = useGLTF('/macintosh.glb')
  const screenRef = useRef<THREE.Group>(null)

  return (
    <Center>
      <group scale={2.4} rotation={[0.05, 0, 0]} position={[0, -0.15, 0]}>
        {/* The Macintosh model */}
        <primitive object={scene} />

        {/* Screen overlay group - positioned at the CRT location */}
        <group ref={screenRef} position={[0, 0.085, 0.135]}>
          <Html
            transform
            distanceFactor={0.5}
            position={[0, 0, 0]}
            style={{
              width: '280px',
              height: '210px',
              pointerEvents: 'auto',
              userSelect: 'none',
            }}
            wrapperClass="screen-html-wrapper"
            occlude={false}
            zIndexRange={[100, 0]}
          >
            <ScreenUI appState={appState} onFileUpload={onFileUpload} />
          </Html>
        </group>
      </group>
    </Center>
  )
}

useGLTF.preload('/macintosh.glb')
