
import { Node, Alert, NetworkConnection, AlertType } from "./types";

// Mock node data (limited to just 3 nodes)
export const mockNodes: Node[] = [
  {
    id: "node1",
    name: "Node #01",
    sector: "Sector A",
    status: "online",
    battery: 85,
    signalStrength: 92,
    lastActivity: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    location: { lat: 21.152, lng: 79.088 },
    type: "gateway"
  },
  {
    id: "node2",
    name: "Node #02",
    sector: "Sector B",
    status: "online",
    battery: 72,
    signalStrength: 88,
    lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    location: { lat: 21.155, lng: 79.091 },
    type: "advanced"
  },
  {
    id: "node3",
    name: "Node #03",
    sector: "Sector C",
    status: "online",
    battery: 95,
    signalStrength: 90,
    lastActivity: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    location: { lat: 21.148, lng: 79.095 },
    type: "standard"
  }
];

// Alert descriptions by type
const alertDescriptions: Record<AlertType, string[]> = {
  gun: ["Gun Reload Detected", "Gunshot Detected", "Multiple Gunshots Detected"],
  footsteps: ["Footsteps Detected", "Multiple Footsteps", "Heavy Footsteps Detected"],
  motion: ["Movement Detected", "Fast Movement Detected", "Motion Alert"],
  whisper: ["Whispers Detected", "Quiet Speech Detected", "Low Voice Conversation"],
  suspicious_activity: ["Suspicious Activity", "Unusual Pattern Detected", "Unidentified Activity"],
  drone: ["Drone Detected", "UAV Activity", "Aerial Vehicle Detected"],
  help: ["Help Call Detected", "Distress Signal", "Emergency Request"]
};

// Alert severities by type
const alertSeverities: Record<AlertType, "critical" | "warning" | "info"> = {
  gun: "critical",
  footsteps: "warning",
  motion: "info",
  whisper: "warning",
  suspicious_activity: "critical",
  drone: "warning",
  help: "critical"
};

// Generate mock alerts (limited to our 3 nodes)
export const mockAlerts: Alert[] = [
  // Recent alerts for node1
  {
    id: "alert1",
    type: "gun",
    nodeId: "node1",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    description: "Gun Reload Detected",
    severity: "critical",
    acknowledged: false
  },
  // Recent alerts for node2
  {
    id: "alert2",
    type: "footsteps",
    nodeId: "node2",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    description: "Multiple Footsteps",
    severity: "warning",
    acknowledged: false
  },
  // Recent alerts for node3
  {
    id: "alert3",
    type: "motion",
    nodeId: "node3",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    description: "Motion Alert",
    severity: "info",
    acknowledged: false
  }
];

// Mock network connections between the 3 nodes
export const mockConnections: NetworkConnection[] = [
  { source: "node1", target: "node2", strength: 88 },
  { source: "node2", target: "node3", strength: 92 },
  { source: "node1", target: "node3", strength: 82 }
];

// Mock network status
export const mockNetworkStatus = {
  activeNodes: 3,
  totalNodes: 3,
  networkHealth: 95
};

// Function to generate a new mock alert
export function generateMockAlert(): Alert {
  const alertTypeKeys = Object.keys(alertDescriptions) as AlertType[];
  const randomType = alertTypeKeys[Math.floor(Math.random() * alertTypeKeys.length)];
  
  const nodeIndex = Math.floor(Math.random() * mockNodes.length);
  const node = mockNodes[nodeIndex];
  
  const descriptionsForType = alertDescriptions[randomType];
  const randomDescription = descriptionsForType[Math.floor(Math.random() * descriptionsForType.length)];
  
  return {
    id: `alert${Date.now()}`,
    type: randomType,
    nodeId: node.id,
    timestamp: new Date(),
    description: randomDescription,
    severity: alertSeverities[randomType],
    acknowledged: false
  };
}

// Function to generate a new node
export function generateNewNode(name: string, sector: string, location: { lat: number; lng: number }): Node {
  return {
    id: `node${Date.now()}`,
    name,
    sector,
    status: "online",
    battery: 100,
    signalStrength: 95,
    lastActivity: new Date(),
    location,
    type: "standard"
  };
}
