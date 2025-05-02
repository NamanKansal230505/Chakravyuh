
export interface Node {
  id: string;
  name: string;
  sector: string;
  status: "online" | "offline" | "warning";
  battery: number;
  signalStrength: number;
  lastActivity: Date;
  location: {
    lat: number;
    lng: number;
  };
  type: "standard" | "advanced" | "gateway";
  alerts?: {
    gun: boolean;
    footsteps: boolean;
    motion: boolean;
    whisper: boolean;
    suspicious_activity: boolean;
    drone: boolean;
    help: boolean;
  };
}

export type AlertType = 
  | "gun" 
  | "footsteps" 
  | "motion" 
  | "whisper" 
  | "suspicious_activity"
  | "drone"
  | "help";

export interface Alert {
  id: string;
  type: AlertType;
  nodeId: string;
  timestamp: Date;
  description: string;
  severity: "critical" | "warning" | "info";
  acknowledged: boolean;
}

export interface NetworkConnection {
  source: string;
  target: string;
  strength: number; // 0-100
}

export interface NetworkStatus {
  activeNodes: number;
  totalNodes: number;
  networkHealth: number; // Percentage
}
