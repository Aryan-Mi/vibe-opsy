import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef } from 'react'
import { AnalysisResult } from '../App'

interface ReceiptProps {
  result: AnalysisResult
  onDismiss: () => void
}

export default function Receipt({ result, onDismiss }: ReceiptProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0])
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15])

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (Math.abs(info.offset.x) > 150 || Math.abs(info.velocity.x) > 500) {
      // Animate off screen
      const direction = info.offset.x > 0 ? 1 : -1
      animate(x, direction * 1000, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        onComplete: onDismiss,
      })
    }
  }

  // Generate current date/time
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  // Generate random transaction ID
  const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase()

  // Handle backdrop click to dismiss, but don't interfere with drag
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only dismiss if clicking directly on the backdrop
    if (e.target === e.currentTarget) {
      onDismiss()
    }
  }

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="receipt-paper cursor-grab active:cursor-grabbing touch-none"
        style={{ x, opacity, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        initial={{ y: 500, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Torn top edge */}
        <div className="receipt-torn-edge top" />
        
        <div className="receipt-content">
          {/* Receipt Header */}
          <div className="receipt-header pb-5 mb-5 text-center">
            <h1 className="dot-matrix text-2xl font-bold tracking-widest text-gray-900">
              VIBE-OPSY
            </h1>
            <p className="text-sm mt-2 text-gray-700">Skin Lesion Analysis</p>
            <p className="text-sm text-gray-500 mt-1">════════════════════</p>
          </div>

          {/* Transaction Info */}
          <div className="text-sm mb-5 space-y-2 font-mono text-gray-800">
            <div className="flex justify-between">
              <span className="text-gray-600">DATE:</span>
              <span className="font-semibold">{dateStr}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">TIME:</span>
              <span className="font-semibold">{timeStr}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">TXN ID:</span>
              <span className="font-semibold">{transactionId}</span>
            </div>
          </div>

          {/* Image */}
          {result.image && (
            <div className="my-6 border-2 border-gray-800 p-2 bg-white shadow-inner">
              <img
                src={result.image}
                alt="Analyzed lesion"
                className="w-full h-44 object-cover dithered"
              />
              <p className="text-[12px] text-center mt-2 text-gray-500 tracking-wider">
                SUBJECT IMAGE
              </p>
            </div>
          )}

          {/* Results */}
          <div className="border-t-2 border-b-2 border-dashed border-gray-600 py-6 my-6">
            <div className="text-center mb-3">
              <p className="text-sm text-gray-600 tracking-widest">ANALYSIS RESULT</p>
            </div>
            <div className="text-center py-2">
              <p className="text-2xl font-black dot-matrix tracking-wider text-gray-900 leading-tight">
                {result.diagnosis.toUpperCase()}
              </p>
              {result.is_cancer !== undefined && (
                <p
                  className={`text-xs font-bold mt-2 tracking-widest uppercase border inline-block px-2 py-1 ${
                    result.is_cancer ? 'text-red-700 border-red-700' : 'text-green-700 border-green-700'
                  }`}
                >
                  {result.is_cancer ? '⚠️ MALIGNANT DETECTED' : '✓ BENIGN'}
                </p>
              )}
            </div>
            <div className="mt-5 flex justify-between items-center text-base text-gray-800">
              <span className="font-medium">Confidence:</span>
              <span className="font-black text-lg">{result.confidence}%</span>
            </div>
            <div className="mt-3 h-3 bg-gray-300 border-2 border-gray-700 rounded-sm">
              <div
                className="h-full bg-gray-800"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="receipt-footer pt-6 text-center">
            <p className="text-xs text-gray-700 font-semibold mb-3 tracking-wider">
              ★ FOR REFERENCE ONLY ★
            </p>
            <p className="text-xs text-gray-600 mb-2 leading-relaxed">
              CONSULT A HEALTHCARE PROFESSIONAL
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">FOR ACCURATE DIAGNOSIS</p>

            {/* Barcode-like decoration */}
            <div className="mt-6 flex justify-center gap-[2px]">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800"
                  style={{
                    width: Math.random() > 0.5 ? '3px' : '1px',
                    height: '24px',
                  }}
                />
              ))}
            </div>

            <p className="text-[10px] mt-4 text-gray-500 tracking-wider">
              THANK YOU FOR USING VIBE-OPSY
            </p>
          </div>

          {/* Swipe hint */}
          <motion.p
            className="text-center text-xl text-gray-500 mt-10 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ← Swipe to dismiss →
          </motion.p>
        </div>
        
        {/* Torn bottom edge */}
        <div className="receipt-torn-edge bottom" />
      </motion.div>
    </div>
  )
}
