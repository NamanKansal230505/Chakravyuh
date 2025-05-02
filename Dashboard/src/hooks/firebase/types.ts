
import { Node, Alert, NetworkConnection, NetworkStatus, AlertType } from '@/lib/types';

export interface UseFirebaseOptions {
  seedDataIfEmpty?: boolean;
  nodeId?: string;
}

export interface UseFirebaseReturn {
  nodes: Node[];
  alerts: Alert[];
  connections: NetworkConnection[];
  networkStatus: NetworkStatus;
  selectedNode: Node | null;
  loading: boolean;
  error: Error | null;
  handleAddNode: (newNode: Node) => Promise<Node>;
  handleUpdateNodeAlert: (nodeId: string, alertType: AlertType, isActive: boolean) => Promise<boolean>;
  shouldPlayAlertSound: boolean;
  alertSeverity: 'critical' | 'warning' | 'info';
  handleSoundPlayed: () => void;
}
