import { useEffect, useState } from 'react';
import { LesionTable } from './LesionTable';
import { ImagePreview } from './ImagePreview';
import { LESION_CATEGORIES } from '../types/lesions';
import type { ScanResult } from '../types/lesions';
import '../styles/results.css';

interface ResultsPageProps {
  imageFile: File;
  onBack: () => void;
}

// Simulate scan results with random probabilities
function generateMockResults(): ScanResult[] {
  const results: ScanResult[] = [];
  let remaining = 1;
  
  // Shuffle categories to pick a random "winner"
  const shuffled = [...LESION_CATEGORIES].sort(() => Math.random() - 0.5);
  
  shuffled.forEach((lesion, index) => {
    let probability: number;
    
    if (index === 0) {
      // Highest probability for the first (random) category
      probability = 0.4 + Math.random() * 0.35; // 40-75%
    } else if (index < 3) {
      // Medium probabilities for next few
      probability = Math.min(remaining * 0.5, Math.random() * 0.2);
    } else {
      // Small probabilities for rest
      probability = Math.min(remaining * 0.3, Math.random() * 0.08);
    }
    
    probability = Math.min(probability, remaining);
    remaining -= probability;
    
    results.push({
      lesionCode: lesion.code,
      probability,
    });
  });
  
  return results;
}

export function ResultsPage({ imageFile, onBack }: ResultsPageProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isScanning, setIsScanning] = useState(true);
  const [results, setResults] = useState<ScanResult[] | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Create object URL for the uploaded image
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);
    
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    // Simulate scanning with loading progress
    const duration = 3000; // 3 seconds
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      setLoadingProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setIsScanning(false);
        setResults(generateMockResults());
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        onBack();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  if (isScanning) {
    return (
      <div className="loading-container">
        <div className="loading-text">
          ANALYZING IMAGE...
        </div>
        <div className="loading-bar-container">
          <div 
            className="loading-bar" 
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <div className="loading-text" style={{ fontSize: '0.8rem' }}>
          {Math.round(loadingProgress)}% COMPLETE
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <LesionTable results={results} isScanning={isScanning} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ImagePreview imageUrl={imageUrl} fileName={imageFile.name} />
        <p className="back-instruction">
          Press Esc/Backspace to go back...
        </p>
      </div>
    </div>
  );
}
