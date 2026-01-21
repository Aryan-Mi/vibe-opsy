import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import Scene from './components/Scene'
import Receipt from './components/Receipt'

// Component to force initial render
function InitialRender() {
  const { invalidate } = useThree()
  useEffect(() => {
    // Force a render after mount
    invalidate()
    // Also schedule a delayed invalidate to ensure everything is loaded
    const timeout = setTimeout(() => invalidate(), 100)
    return () => clearTimeout(timeout)
  }, [invalidate])
  return null
}

export type AppState = 'IDLE' | 'ANALYZING' | 'RESULT'

export interface AnalysisResult {
  image: string | null
  diagnosis: string
  confidence: number
}

function App() {
  const [appState, setAppState] = useState<AppState>('IDLE')
  const [result, setResult] = useState<AnalysisResult>({
    image: null,
    diagnosis: 'Benign',
    confidence: 98,
  })

  const handleFileUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    setResult((prev) => ({ ...prev, image: imageUrl }))
    setAppState('ANALYZING')

    // Play dial-up sound effect
    const audio = new Audio('/dial-up-effect.mp3')
    audio.play().catch(error => {
      console.log('Audio playback failed:', error)
    })

    // Mock analysis - minimum 8 seconds to match sound effect duration
    setTimeout(() => {
      const diagnoses = ['Benign', 'Melanoma', 'Basal Cell Carcinoma', 'Seborrheic Keratosis']
      const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)]
      const randomConfidence = Math.floor(Math.random() * 15) + 85

      setResult((prev) => ({
        ...prev,
        diagnosis: randomDiagnosis,
        confidence: randomConfidence,
      }))
      setAppState('RESULT')
    }, 8000)
  }

  const handleDismissReceipt = () => {
    setAppState('IDLE')
    if (result.image) {
      URL.revokeObjectURL(result.image)
    }
    setResult({ image: null, diagnosis: 'Benign', confidence: 98 })
  }

  return (
    <div className="app-container">
      {/* Retro Brutalist Background */}
      <div className="background-layer">
        {/* Grid pattern */}
        <div className="grid-pattern" />
        
        {/* Decorative elements */}
        <div className="brutalist-shape shape-1" />
        <div className="brutalist-shape shape-2" />
        <div className="brutalist-shape shape-3" />
        <div className="brutalist-shape shape-4" />
        
        {/* Corner accents */}
        <div className="corner-accent top-left" />
        <div className="corner-accent top-right" />
        <div className="corner-accent bottom-left" />
        <div className="corner-accent bottom-right" />
        
        {/* Scan lines overlay */}
        <div className="scanlines-bg" />
      </div>

      {/* Title */}
      <header className="app-header">
        <h1 className="app-title">VIBE-OPSY</h1>
        <p className="app-subtitle">SKIN LESION ANALYSIS SYSTEM</p>
      </header>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        className="canvas-3d"
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <InitialRender />
          <Scene appState={appState} onFileUpload={handleFileUpload} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* Footer */}
      <footer className="app-footer">
        <span className="footer-text">SYS.VERSION.1.0</span>
        <span className="footer-divider">|</span>
        <span className="footer-text">STATUS: ONLINE</span>
        <span className="footer-divider">|</span>
        <span className="footer-text">AI.READY</span>
      </footer>

      {/* Receipt overlay */}
      {appState === 'RESULT' && (
        <Receipt result={result} onDismiss={handleDismissReceipt} />
      )}
    </div>
  )
}

export default App
