
import { useState, useEffect } from 'react';
import { 
  subscribeToNodes, 
  subscribeToAlerts, 
  subscribeToConnections, 
  subscribeToNetworkStatus,
  subscribeToSpecificNode,
  addNewNode,
  addConnection,
  updateNodeAlert,
  seedInitialData
} from '@/lib/firebase';
import { Node, Alert, NetworkConnection, NetworkStatus, AlertType } from '@/lib/types';
import { useNodeProcessor } from './useNodeProcessor';
import { UseFirebaseOptions, UseFirebaseReturn } from './types';

export function useFirebase(options: UseFirebaseOptions = {}): UseFirebaseReturn {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]); 
  const [connections, setConnections] = useState<NetworkConnection[]>([]);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    activeNodes: 0,
    totalNodes: 0,
    networkHealth: 0
  });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { 
    processNodesWithAlerts, 
    shouldPlayAlertSound, 
    alertSeverity, 
    handleSoundPlayed 
  } = useNodeProcessor();
  
  // Subscribe to data changes
  useEffect(() => {
    let unsubscribeNodes: (() => void) | undefined;
    let unsubscribeAlerts: (() => void) | undefined;
    let unsubscribeConnections: (() => void) | undefined;
    let unsubscribeNetworkStatus: (() => void) | undefined;

    try {
      unsubscribeNodes = subscribeToNodes((nodesList) => {
        const { nodesList: processedNodes, activeAlertsList } = processNodesWithAlerts(nodesList);
        setNodes(processedNodes);
        
        // Merge new alerts with existing alerts without removing older alerts
        if (activeAlertsList.length > 0) {
          setAlerts(prev => {
            // Create a map of existing alerts by their unique type+nodeId combination
            const existingAlertMap = new Map<string, Alert>();
            prev.forEach(alert => {
              existingAlertMap.set(`${alert.nodeId}-${alert.type}`, alert);
            });
            
            // Add new alerts, replacing any existing alerts of the same type and nodeId with newer ones
            activeAlertsList.forEach(newAlert => {
              const key = `${newAlert.nodeId}-${newAlert.type}`;
              const existing = existingAlertMap.get(key);
              
              if (!existing || newAlert.timestamp > existing.timestamp) {
                existingAlertMap.set(key, newAlert);
              }
            });
            
            // Convert back to an array and sort
            const combined = Array.from(existingAlertMap.values())
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              // Limit to last 100 alerts to prevent memory issues
              .slice(0, 100); 
              
            return combined;
          });
        }
      });
      
      // We still subscribe but don't use alerts from Firebase history
      unsubscribeAlerts = subscribeToAlerts(() => {
        // No longer process alerts from Firebase history
      });
      
      unsubscribeConnections = subscribeToConnections(setConnections);
      unsubscribeNetworkStatus = subscribeToNetworkStatus(setNetworkStatus);
      
      // Set loading to false after initial data is loaded
      setTimeout(() => setLoading(false), 1000);
      
      // If no data and seedDataIfEmpty is true, seed initial data
      if (options.seedDataIfEmpty) {
        setTimeout(() => {
          if (nodes.length === 0) {
            seedInitialData().catch((err) => console.error("Error seeding data:", err));
          }
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
    }
    
    // Cleanup subscriptions
    return () => {
      if (unsubscribeNodes) unsubscribeNodes();
      if (unsubscribeAlerts) unsubscribeAlerts();
      if (unsubscribeConnections) unsubscribeConnections();
      if (unsubscribeNetworkStatus) unsubscribeNetworkStatus();
    };
  }, [options.seedDataIfEmpty, processNodesWithAlerts, nodes.length]);
  
  // Subscribe to specific node if nodeId is provided
  useEffect(() => {
    let unsubscribeNode: (() => void) | undefined;
    
    if (!options.nodeId) return;
    
    try {
      unsubscribeNode = subscribeToSpecificNode(options.nodeId, setSelectedNode);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    }
    
    // Cleanup subscription
    return () => {
      if (unsubscribeNode) unsubscribeNode();
    };
  }, [options.nodeId]);

  // Handle node addition
  const handleAddNode = async (newNode: Node) => {
    try {
      await addNewNode(newNode);
      
      // Add connections to nearby nodes
      const nearbyNodes = [...nodes]
        .filter(n => n.id !== newNode.id);
      
      const newConnections = nearbyNodes.map(node => ({
        source: newNode.id,
        target: node.id,
        strength: 80 + Math.floor(Math.random() * 15) // 80-95% strength
      }));
      
      // Add connections to database
      for (const connection of newConnections) {
        await addConnection(connection);
      }
      
      return newNode;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add node'));
      throw err;
    }
  };
  
  // Handle updating node alerts
  const handleUpdateNodeAlert = async (nodeId: string, alertType: AlertType, isActive: boolean) => {
    try {
      // Send alert type status to Firebase
      await updateNodeAlert(nodeId, alertType, isActive);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update node alert'));
      return false;
    }
  };

  return {
    nodes,
    alerts,
    connections,
    networkStatus,
    selectedNode,
    loading,
    error,
    handleAddNode,
    handleUpdateNodeAlert,
    shouldPlayAlertSound,
    alertSeverity,
    handleSoundPlayed
  };
}
