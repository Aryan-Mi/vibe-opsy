import { useGLTF, Html, Center } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
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
  const groupRef = useRef<THREE.Group>(null)
  
  // Start tilted up, animate to final position
  const [targetRotation] = useState(0.05)
  const [currentRotation, setCurrentRotation] = useState(-0.15) // Start tilted up
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // After a short delay, trigger the animation to final position
    const timeout = setTimeout(() => {
      setIsAnimating(true)
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  // Animate the rotation smoothly
  useFrame(() => {
    if (isAnimating && groupRef.current) {
      const diff = targetRotation - currentRotation
      if (Math.abs(diff) > 0.001) {
        const newRotation = currentRotation + diff * 0.05
        setCurrentRotation(newRotation)
        groupRef.current.rotation.x = newRotation
      } else {
        setCurrentRotation(targetRotation)
        groupRef.current.rotation.x = targetRotation
        setIsAnimating(false)
      }
    }
  })

  return (
    <Center>
      <group 
        ref={groupRef}
        scale={2.4} 
        rotation={[currentRotation, 0, 0]} 
        position={[0, -0.15, 0]}
      >
        {/* The Macintosh model */}
        <primitive object={scene} />

        {/* Screen overlay group - positioned at the CRT location */}
        <group ref={screenRef} position={[0, 0.115, 0.135]}>
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
