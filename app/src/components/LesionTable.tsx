import { LESION_CATEGORIES } from '../types/lesions';
import type { ScanResult } from '../types/lesions';
import '../styles/results.css';

interface LesionTableProps {
  results: ScanResult[] | null;
  isScanning: boolean;
}

export function LesionTable({ results, isScanning }: LesionTableProps) {
  const getResultForLesion = (code: string): number | null => {
    if (!results) return null;
    const result = results.find(r => r.lesionCode === code);
    return result ? result.probability : null;
  };

  const formatResult = (probability: number | null): string => {
    if (probability === null) return '---';
    return `${(probability * 100).toFixed(1)}%`;
  };

  const highestResult = results?.reduce((max, r) => 
    r.probability > max.probability ? r : max
  , results[0]);

  return (
    <div className="lesion-table-container">
      <div className="lesion-table-header">
        <span>A:\SCAN\LESIONS</span>
        <span>{LESION_CATEGORIES.length} Categories</span>
      </div>
      
      <div className="lesion-table">
        {/* Header row */}
        <div className="lesion-row header">
          <span className="lesion-cell">LESION NAME</span>
          <span className="lesion-cell">CODE</span>
          <span className="lesion-cell">CANCEROUS</span>
          <span className="lesion-cell">RESULT</span>
        </div>
        
        {/* Data rows */}
        {LESION_CATEGORIES.map((lesion) => {
          const probability = getResultForLesion(lesion.code);
          const isHighest = highestResult?.lesionCode === lesion.code && probability !== null;
          
          return (
            <div 
              key={lesion.code} 
              className={`lesion-row ${isHighest ? 'highlighted' : ''}`}
            >
              <span className="lesion-cell">{lesion.name}</span>
              <span className="lesion-cell">{lesion.code}</span>
              <span className={`lesion-cell ${lesion.cancerous ? 'cancerous-yes' : 'cancerous-no'}`}>
                {lesion.cancerous ? 'YES' : 'NO'}
              </span>
              <span className={`lesion-cell result ${isHighest ? 'result-high' : ''}`}>
                {formatResult(probability)}
              </span>
            </div>
          );
        })}
      </div>
      
      {isScanning && (
        <div className="scanning-indicator">
          SCANNING IMAGE... PLEASE WAIT
        </div>
      )}
    </div>
  );
}
