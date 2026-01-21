import Computer from './Computer'
import { AppState } from '../App'

interface SceneProps {
  appState: AppState
  onFileUpload: (file: File) => void
}

export default function Scene({ appState, onFileUpload }: SceneProps) {
  return (
    <>
      {/* Studio Lighting - warm and stylized for beige plastic */}
      <ambientLight intensity={0.5} />
      
      {/* Main key light - front right */}
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.2}
      />
      
      {/* Fill light - front left */}
      <directionalLight 
        position={[-3, 2, 4]} 
        intensity={0.4} 
      />
      
      {/* Back rim lights for that retro plastic glow */}
      <pointLight 
        position={[-2, 1, -2]} 
        intensity={0.3} 
        color="#ffe4c4" 
      />
      <pointLight 
        position={[2, 1, -2]} 
        intensity={0.3} 
        color="#c4e4ff" 
      />

      {/* The Macintosh Computer */}
      <Computer appState={appState} onFileUpload={onFileUpload} />
    </>
  )
}
