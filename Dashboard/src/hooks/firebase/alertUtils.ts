
import { useState } from 'react';
import { Node, Alert, AlertType } from '@/lib/types';

// Function to generate description based on alert type
const getAlertDescription = (alertType: AlertType): string => {
  switch (alertType) {
    case "gun": 
      return "Gunshot Detected";
    case "footsteps":
      return "Footsteps Detected";
    case "motion":
      return "Motion Detected";
    case "whisper":
      return "Whispers Detected";
    case "suspicious_activity":
      return "Suspicious Activity";
    case "drone":
      return "Drone Detected";
    case "help":
      return "Help Call Detected";
    default:
      return "Alert Detected";
  }
};

// Process node alerts
export const processNodeAlerts = (
  node: Node, 
  setAlertSeverity: React.Dispatch<React.SetStateAction<'critical' | 'warning' | 'info'>>,
  setShouldPlayAlertSound: React.Dispatch<React.SetStateAction<boolean>>,
  currentAlertSeverity: 'critical' | 'warning' | 'info'
): Alert[] => {
  const alerts: Alert[] = [];
  
  if (!node.alerts) return alerts;
  
  // Map alertType to severity
  const alertSeverity: Record<AlertType, 'critical' | 'warning' | 'info'> = {
    gun: 'critical',
    footsteps: 'warning',
    motion: 'info',
    whisper: 'warning',
    suspicious_activity: 'critical',
    drone: 'warning',
    help: 'critical'
  };
  
  // Process each alert type
  (Object.entries(node.alerts) as [AlertType, boolean][]).forEach(([alertType, isActive]) => {
    if (isActive) {
      // Get the proper description for this alert type
      const description = getAlertDescription(alertType);
      
      // Get severity for this alert type
      const severity = alertSeverity[alertType];
      
      // Create alert object
      const newAlert: Alert = {
        id: `${node.id}-${alertType}-${Date.now()}`,
        type: alertType,
        nodeId: node.id,
        timestamp: new Date(),
        description,
        severity,
        acknowledged: false
      };
      
      // Add to alerts list
      alerts.push(newAlert);
      
      // Set alert severity for sound (prioritize critical > warning > info)
      if (
        severity === 'critical' || 
        (severity === 'warning' && currentAlertSeverity !== 'critical') ||
        (severity === 'info' && currentAlertSeverity === 'info')
      ) {
        setAlertSeverity(severity);
        setShouldPlayAlertSound(true);
      }
    }
  });
  
  return alerts;
};
