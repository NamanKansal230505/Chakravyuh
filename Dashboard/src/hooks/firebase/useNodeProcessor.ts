
import { useState, useCallback } from 'react';
import { Node, Alert } from '@/lib/types';
import { processNodeAlerts } from './alertUtils';
import { updateNodeAlert } from '@/lib/firebase';

export function useNodeProcessor() {
  const [shouldPlayAlertSound, setShouldPlayAlertSound] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'critical' | 'warning' | 'info'>('info');
  
  // Process nodes and create local alerts based on their alert status
  const processNodesWithAlerts = useCallback((nodesList: Node[]) => {
    let activeAlertsList: Alert[] = [];
    
    // Generate alerts from nodes with active alerts
    nodesList.forEach(node => {
      const nodeAlerts = processNodeAlerts(
        node, 
        setAlertSeverity, 
        setShouldPlayAlertSound, 
        alertSeverity
      );
      
      activeAlertsList = [...activeAlertsList, ...nodeAlerts];

      // Auto-reset the alert status in Firebase after a few seconds for each alert
      if (node.alerts) {
        Object.entries(node.alerts).forEach(([type, isActive]) => {
          if (isActive) {
            setTimeout(() => {
              updateNodeAlert(node.id, type as any, false)
                .catch(err => console.error(`Failed to reset alert ${type} for node ${node.id}:`, err));
            }, 15000); // 15 seconds
          }
        });
      }
    });
    
    return { nodesList, activeAlertsList };
  }, [alertSeverity]);
  
  // Reset sound play state after it's played
  const handleSoundPlayed = useCallback(() => {
    setShouldPlayAlertSound(false);
  }, []);
  
  return {
    processNodesWithAlerts,
    shouldPlayAlertSound,
    alertSeverity,
    setAlertSeverity,
    setShouldPlayAlertSound,
    handleSoundPlayed
  };
}
