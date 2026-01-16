import { useRef, useEffect, useState } from 'react';
import '../styles/logo.css';

interface SplashScreenProps {
  onFileSelect: (file: File) => void;
}

export function SplashScreen({ onFileSelect }: SplashScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Delay before showing content (CRT turn on effect)
    const turnOnTimer = setTimeout(() => {
      setShowLogo(true);
    }, 1000);

    // Enable key press after logo animation
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 3000);

    return () => {
      clearTimeout(turnOnTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore modifier keys
      if (e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'Meta') {
        return;
      }
      fileInputRef.current?.click();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isReady]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (isReady) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="ibm-logo-container" onClick={handleClick}>
      {showLogo && (
        <>
          <div className="ibm-logo-wrapper logo-animate">
            <span className="ibm-logo-text">Vibe-Opsy</span>
            <div className="ibm-logo-stripes" />
          </div>
          
          <p className={`press-key-text ${isReady ? 'show' : ''}`}>
            Press any key to upload your image...
          </p>
        </>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden-input"
      />
    </div>
  );
}
