
import React, { useRef, useEffect } from 'react';

interface AlertSoundProps {
  playSound: boolean;
  severity?: 'critical' | 'warning' | 'info';
  onSoundPlayed?: () => void;
}

const AlertSound: React.FC<AlertSoundProps> = ({ 
  playSound, 
  severity = 'critical',
  onSoundPlayed 
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (playSound && audioRef.current) {
      // Set the source based on severity
      const soundFile = severity === 'critical' 
        ? '/alert-critical.mp3' 
        : severity === 'warning'
        ? '/alert-warning.mp3'
        : '/alert-info.mp3';
        
      audioRef.current.src = soundFile;
      
      // Play the sound
      audioRef.current.play().catch(error => {
        console.error("Error playing sound:", error);
      });
      
      // Notify parent that sound has been played
      if (onSoundPlayed) {
        onSoundPlayed();
      }
    }
  }, [playSound, severity, onSoundPlayed]);

  return <audio ref={audioRef} className="hidden" />;
};

export default AlertSound;
