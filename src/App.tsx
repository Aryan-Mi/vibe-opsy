import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'

const CATEGORIES = [
  'Melanocytic nevi',
  'Melanoma',
  'Benign keratosis',
  'Basal cell carcinoma',
  'Actinic keratoses',
  'Vascular lesions',
  'Dermatofibroma'
] as const

type Stage = 'idle' | 'uploading' | 'scanning' | 'result'

type ResultSummary = {
  positiveIndex: number
  confidence: number
}

const SCAN_DELAY_MS = 2400

const formatTimestamp = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)

const hashString = (input: string) => {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const buildResult = (file: File): ResultSummary => {
  const hash = hashString(file.name)
  return {
    positiveIndex: hash % CATEGORIES.length,
    confidence: 72 + (hash % 21)
  }
}

const stageCopy: Record<Stage, { title: string; subtitle: string }> = {
  idle: {
    title: 'Load a sample to begin',
    subtitle: 'Drop an image or tap the button below.'
  },
  uploading: {
    title: 'Calibrating sensors',
    subtitle: 'Aligning the kiosk optics...'
  },
  scanning: {
    title: 'Scanning in progress',
    subtitle: 'Running a quick mock diagnostic.'
  },
  result: {
    title: 'Receipt ready',
    subtitle: 'Mock outcome generated for review.'
  }
}

export default function App() {
  const [stage, setStage] = useState<Stage>('idle')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [scanTime, setScanTime] = useState<Date | null>(null)
  const [progress, setProgress] = useState(0)

  const result = useMemo(() => (file ? buildResult(file) : null), [file])

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  useEffect(() => {
    if (stage === 'uploading') {
      const timer = window.setTimeout(() => setStage('scanning'), 500)
      return () => window.clearTimeout(timer)
    }

    if (stage === 'scanning') {
      setProgress(0)
      const tick = window.setInterval(() => {
        setProgress((prev) => Math.min(100, prev + 5))
      }, 120)
      const finish = window.setTimeout(() => {
        setProgress(100)
        setStage('result')
      }, SCAN_DELAY_MS)

      return () => {
        window.clearInterval(tick)
        window.clearTimeout(finish)
      }
    }
  }, [stage])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null
    if (!nextFile) return

    setFile(nextFile)
    setScanTime(new Date())
    setStage('uploading')
  }

  const handleReset = () => {
    setFile(null)
    setStage('idle')
    setScanTime(null)
    setProgress(0)
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Retro Medical Kiosk Mock</p>
          <h1>Vibe-Opsy</h1>
          <p className="lede">
            A lighthearted diagnostic booth for skin-lesion analysis. Built for
            vibes, not verdicts.
          </p>
          <div className="hero-actions">
            <label className="btn primary" htmlFor="upload-input">
              Upload scan
            </label>
            <button className="btn ghost" type="button">
              See how it works
            </button>
          </div>
          <p className="disclaimer">
            Mock demo only. Not medical advice or a real clinical tool.
          </p>
        </div>
        <div className="hero-card">
          <div className="card-label">System status</div>
          <div className="status-grid">
            <div>
              <span className="label">Firmware</span>
              <span className="value">v3.2.8</span>
            </div>
            <div>
              <span className="label">Scanner</span>
              <span className="value">Ready</span>
            </div>
            <div>
              <span className="label">Mode</span>
              <span className="value">Simulation</span>
            </div>
            <div>
              <span className="label">Queue</span>
              <span className="value">01</span>
            </div>
          </div>
        </div>
      </header>

      <main className="console">
        <section className="kiosk">
          <div className="kiosk-header">
            <div>
              <p className="kiosk-title">Diagnostic Console</p>
              <p className="kiosk-sub">Station 07 / Vibe-Opsy Labs</p>
            </div>
            <div className="kiosk-indicators">
              <span className="chip">Neutral light</span>
              <span className="chip">Sterile mode</span>
              <span className="chip">Mocked</span>
            </div>
          </div>

          <div className="kiosk-body">
            <div className="stage-info">
              <p className="stage-title">{stageCopy[stage].title}</p>
              <p className="stage-subtitle">{stageCopy[stage].subtitle}</p>
            </div>

            <AnimatePresence mode="wait">
              {stage === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45 }}
                  className="panel"
                >
                  <div className="upload-area">
                    <div className="upload-preview">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Uploaded preview" />
                      ) : (
                        <div className="placeholder">
                          <div className="pulse" />
                          <p>Image preview</p>
                        </div>
                      )}
                    </div>
                    <div className="upload-controls">
                      <input
                        id="upload-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <label className="btn primary" htmlFor="upload-input">
                        Choose file
                      </label>
                      <p className="hint">Any image works for this mock.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === 'uploading' && (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="panel"
                >
                  <div className="upload-area">
                    <div className="upload-preview">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Uploaded preview" />
                      ) : (
                        <div className="placeholder">
                          <div className="pulse" />
                          <p>Loading image</p>
                        </div>
                      )}
                    </div>
                    <div className="upload-controls">
                      <div className="progress">Preparing scanner...</div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '35%' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === 'scanning' && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="panel scan-panel"
                >
                  <div className="scan-screen">
                    <div className="scan-frame">
                      <div className="scan-grid" />
                      <div className="scan-line" />
                      {previewUrl ? (
                        <img src={previewUrl} alt="Scan target" />
                      ) : (
                        <div className="placeholder">Align target</div>
                      )}
                    </div>
                    <div className="scan-progress">
                      <span>Processing</span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="progress-meta">{progress}%</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === 'result' && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5 }}
                  className="panel result-panel"
                >
                  <div className="results-grid">
                    <div className="result-card">
                      <h3>Primary match</h3>
                      <p className="result-title">
                        {CATEGORIES[result.positiveIndex]}
                      </p>
                      <p className="result-confidence">
                        Confidence: {result.confidence}%
                      </p>
                      <p className="result-note">
                        Mock inference based on a staged pipeline.
                      </p>
                      <button className="btn ghost" type="button" onClick={handleReset}>
                        Scan another
                      </button>
                    </div>

                    <motion.div
                      className="receipt"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.15 }}
                    >
                      <div className="receipt-header">
                        <span className="receipt-title">Vibe-Opsy Results</span>
                        <span className="receipt-date">
                          {scanTime ? formatTimestamp(scanTime) : '---'}
                        </span>
                      </div>
                      <div className="receipt-warning">
                        <span>Mock demo only</span>
                        <span>Not medical advice</span>
                      </div>
                      <div className="receipt-main">
                        <p className="receipt-line">
                          Primary: {CATEGORIES[result.positiveIndex]}
                        </p>
                        <p className="receipt-line">
                          Confidence: {result.confidence}%
                        </p>
                      </div>
                      <div className="receipt-list">
                        {CATEGORIES.map((category, index) => (
                          <div className="receipt-row" key={category}>
                            <span className="receipt-item">{category}</span>
                            <span
                              className={`receipt-status ${
                                index === result.positiveIndex ? 'pos' : 'neg'
                              }`}
                            >
                              {index === result.positiveIndex ? 'POS' : 'NEG'}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="barcode" aria-hidden="true" />
                      <div className="receipt-footer">
                        Thank you for visiting the kiosk.
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  )
}
