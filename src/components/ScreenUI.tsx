import { useRef, useState, useEffect } from 'react'
import { AppState } from '../App'

interface ScreenUIProps {
  appState: AppState
  onFileUpload: (file: File) => void
}

export default function ScreenUI({ appState, onFileUpload }: ScreenUIProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="crt-screen crt-flicker">
      <div className="crt-scanline" />
      
      <div className="relative z-0 w-full h-full">
        {appState === 'IDLE' && (
          <IdleScreen
            onUploadClick={handleUploadClick}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
          />
        )}
        
        {appState === 'ANALYZING' && <AnalyzingScreen />}
        
        {appState === 'RESULT' && <ResultScreen />}
      </div>
    </div>
  )
}

// IDLE State - Mac OS System 7 style upload screen
interface IdleScreenProps {
  onUploadClick: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function IdleScreen({ onUploadClick, fileInputRef, onFileChange }: IdleScreenProps) {
  return (
    <div className="w-full h-full bg-[#c0c0c0] flex flex-col">
      {/* Mac OS Title Bar */}
      <div className="bg-white border-b-2 border-black px-2 py-1 flex items-center gap-2">
        <div className="w-3 h-3 border border-black bg-white" />
        <span className="text-xs font-bold tracking-wide">Vibe-Opsy v1.0</span>
      </div>

      {/* Menu Bar */}
      <div className="bg-white border-b border-black px-2 py-0.5 flex gap-4 text-xs">
        <span className="font-bold">File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Special</span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center bg-[#c0c0c0]">
        {/* Retro Window */}
        <div className="bg-white border-2 border-black shadow-[4px_4px_0_#000] p-4 w-64">
          <div className="bg-black text-white text-xs px-2 py-1 mb-4 flex items-center">
            <span className="flex-1 text-center">Skin Analysis</span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 border-2 border-black bg-[#ffffc0] flex items-center justify-center text-3xl">
              🔬
            </div>
          </div>

          <p className="text-center text-xs mb-4 font-mono">
            Upload an image of your skin lesion for AI-powered analysis
          </p>

          {/* Upload Button */}
          <button
            onClick={onUploadClick}
            className="retro-button w-full text-center font-bold"
          >
            📁 UPLOAD IMAGE
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        {/* Footer text */}
        <p className="text-[10px] mt-4 text-gray-600 font-mono">
          © {new Date().getFullYear()} Vibe-Opsy Labs
        </p>
      </div>
    </div>
  )
}

// ANALYZING State - Matrix/Hacker terminal
function AnalyzingScreen() {
  const [progress, setProgress] = useState(0)
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  useEffect(() => {
    const lines = [
      '> INITIALIZING NEURAL NETWORK...',
      '> LOADING DERMOSCOPY MODEL v2.3.1...',
      '> PREPROCESSING IMAGE DATA...',
      '> ANALYZING SUBJECT...',
      '> RUNNING CLASSIFICATION ALGORITHM...',
      '> COMPUTING CONFIDENCE METRICS...',
      '> GENERATING DIAGNOSIS REPORT...',
    ]

    let lineIndex = 0
    const lineInterval = setInterval(() => {
      if (lineIndex < lines.length) {
        setTerminalLines((prev) => [...prev, lines[lineIndex]])
        lineIndex++
      }
    }, 400)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 3
      })
    }, 80)

    return () => {
      clearInterval(lineInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const progressBlocks = Math.floor(progress / 5)
  const progressBar = '|'.repeat(progressBlocks) + '.'.repeat(20 - progressBlocks)

  return (
    <div className="w-full h-full bg-black p-4 font-mono overflow-hidden">
      {/* ASCII Art Header */}
      <pre className="terminal-text text-[8px] leading-tight mb-2">
{`
██╗   ██╗██╗██████╗ ███████╗
██║   ██║██║██╔══██╗██╔════╝
██║   ██║██║██████╔╝█████╗  
╚██╗ ██╔╝██║██╔══██╗██╔══╝  
 ╚████╔╝ ██║██████╔╝███████╗
  ╚═══╝  ╚═╝╚═════╝ ╚══════╝
`}
      </pre>

      {/* Terminal Output */}
      <div className="terminal-text text-[10px] space-y-1 mb-4">
        {terminalLines.map((line, i) => (
          <div key={i} className="animate-pulse">
            {line}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="terminal-text text-xs">
        <div className="mb-1">ANALYZING SUBJECT...</div>
        <div className="flex items-center gap-2">
          <span>[{progressBar}]</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>

      {/* Blinking cursor */}
      <div className="terminal-text mt-4">
        <span className="animate-pulse">█</span>
      </div>
    </div>
  )
}

// RESULT State - Shows on screen while receipt prints
function ResultScreen() {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div className="terminal-text text-center">
        <div className="text-lg mb-2">ANALYSIS COMPLETE</div>
        <div className="text-sm animate-pulse">PRINTING RESULTS...</div>
        <div className="mt-4 text-2xl">🖨️</div>
      </div>
    </div>
  )
}
