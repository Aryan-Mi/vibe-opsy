import '../styles/crt.css';

interface CRTEffectProps {
  children: React.ReactNode;
  showTurnOn?: boolean;
}

export function CRTEffect({ children, showTurnOn = false }: CRTEffectProps) {
  return (
    <div className="crt-container">
      <div className={`crt-screen ${showTurnOn ? 'crt-turn-on' : ''}`}>
        {children}
      </div>
      <div className="crt-scanlines" />
      <div className="crt-grain" />
      <div className="crt-rgb" />
    </div>
  );
}
