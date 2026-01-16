import { useState } from 'react';
import { CRTEffect } from './components/CRTEffect';
import { SplashScreen } from './components/SplashScreen';
import { ResultsPage } from './components/ResultsPage';

type AppState = 'splash' | 'results';

function App() {
  const [state, setState] = useState<AppState>('splash');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showTurnOn, setShowTurnOn] = useState(true);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setState('results');
  };

  const handleBack = () => {
    setSelectedFile(null);
    setState('splash');
    setShowTurnOn(false); // Don't replay turn-on animation
  };

  return (
    <CRTEffect showTurnOn={showTurnOn}>
      {state === 'splash' && (
        <SplashScreen onFileSelect={handleFileSelect} />
      )}
      {state === 'results' && selectedFile && (
        <ResultsPage 
          imageFile={selectedFile} 
          onBack={handleBack}
        />
      )}
    </CRTEffect>
  );
}

export default App;
