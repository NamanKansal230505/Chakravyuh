
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Node } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle } from "lucide-react";

interface NodeDetailsProps {
  node: Node | null;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node }) => {
  if (!node) {
    return (
      <Card className="bg-card/50 h-full border-army-khaki/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Node Details</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          Select a node to view details
        </CardContent>
      </Card>
    );
  }

  const lastActivityTime = formatDistanceToNow(new Date(node.lastActivity), {
    addSuffix: true,
  });

  const batteryColor =
    node.battery > 70
      ? "bg-alert-success"
      : node.battery > 30
      ? "bg-alert-warning"
      : "bg-alert-critical";

  const signalColor =
    node.signalStrength > 70
      ? "bg-alert-success"
      : node.signalStrength > 30
      ? "bg-alert-warning"
      : "bg-alert-critical";

  const statusBadge =
    node.status === "online"
      ? "status-badge status-badge-success"
      : node.status === "warning"
      ? "status-badge status-badge-warning"
      : "status-badge status-badge-critical";

  // Check if any alerts are active
  const hasActiveAlerts = node.alerts && Object.values(node.alerts).some(alert => alert);

  // Format alert name
  const formatAlertName = (alertKey: string) => {
    switch (alertKey) {
      case "gun": return "Gunshots";
      case "footsteps": return "Footsteps";
      case "motion": return "Motion";
      case "whisper": return "Whispers";
      case "suspicious_activity": return "Suspicious Activity";
      case "drone": return "Drone";
      case "help": return "Help Call";
      default: return alertKey.replace('_', ' ');
    }
  };

  return (
    <Card className="h-full border-army-khaki/30 bg-card/90">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {node.name || `Node #${node.id.replace("node", "")}`}
          </CardTitle>
          <span className={statusBadge}>{node.status}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Battery</span>
            <span className="text-xs font-mono">{node.battery}%</span>
          </div>
          <Progress
            value={node.battery}
            className={`h-1.5 ${batteryColor}`}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Signal Strength</span>
            <span className="text-xs font-mono">{node.signalStrength}%</span>
          </div>
          <Progress
            value={node.signalStrength}
            className={`h-1.5 ${signalColor}`}
          />
        </div>

        {hasActiveAlerts && (
          <div className="bg-alert-critical/10 p-2 rounded-md border border-alert-critical/20">
            <div className="flex items-center gap-2 text-xs text-alert-critical">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Active Alerts</span>
            </div>
            <ul className="mt-2 text-xs space-y-1">
              {node.alerts && Object.entries(node.alerts).map(([alertType, isActive]) => (
                isActive && (
                  <li key={alertType} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-alert-critical"></span>
                    {formatAlertName(alertType)}
                  </li>
                )
              ))}
            </ul>
          </div>
        )}

        <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-muted-foreground">Location</div>
            <div className="font-mono">
              {node.location.lat.toFixed(3)}, {node.location.lng.toFixed(3)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Last Activity</div>
            <div>{lastActivityTime}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Sector</div>
            <div>{node.sector}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Type</div>
            <div className="capitalize">{node.type}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeDetails;
