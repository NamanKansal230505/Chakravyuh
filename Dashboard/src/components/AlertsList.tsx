import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/lib/types";
import { AlertTriangle, Volume2, MapPin, HelpCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AlertsListProps {
  alerts: Alert[];
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  // Get the 5 most recent unacknowledged alerts
  // Use a Set to track unique alert types per node to avoid duplicates
  const uniqueAlerts = new Map<string, Alert>();
  
  // Process alerts to keep only the most recent of each type per node
  alerts.forEach(alert => {
    if (!alert.acknowledged) {
      const key = `${alert.nodeId}-${alert.type}`;
      if (!uniqueAlerts.has(key) || 
          uniqueAlerts.get(key)!.timestamp < alert.timestamp) {
        uniqueAlerts.set(key, alert);
      }
    }
  });
  
  // Convert back to array and sort
  const recentAlerts = Array.from(uniqueAlerts.values())
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "gun":
        return <AlertTriangle className="h-4 w-4 text-alert-critical" />;
      case "footsteps":
        return <MapPin className="h-4 w-4 text-alert-warning" />;
      case "whisper":
        return <Volume2 className="h-4 w-4 text-alert-warning" />;
      case "motion":
        return <MapPin className="h-4 w-4 text-alert-info" />;
      case "suspicious_activity":
        return <AlertTriangle className="h-4 w-4 text-alert-critical" />;
      case "drone":
        return <MapPin className="h-4 w-4 text-alert-warning" />; // Using MapPin for drone as well
      case "help":
        return <HelpCircle className="h-4 w-4 text-alert-critical" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-alert-info" />;
    }
  };

  const formatAlertType = (type: string) => {
    switch (type) {
      case "gun":
        return "Gunshots Detected";
      case "footsteps":
        return "Footsteps Detected";
      case "whisper":
        return "Whispers Detected";
      case "motion":
        return "Motion Detected";
      case "suspicious_activity":
        return "Suspicious Activity";
      case "drone":
        return "Drone Detected";
      case "help":
        return "Help Call Detected";
      default:
        return type.replace(/_/g, " ");
    }
  };

  return (
    <Card className="h-full border-army-khaki/30 bg-card/90">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-2">
          {recentAlerts.map((alert) => {
            const nodeNumber = alert.nodeId.includes("node") ? alert.nodeId.replace("node", "") : alert.nodeId;
            return (
              <div
                key={alert.id}
                className={`flex items-center gap-3 rounded-md px-3 py-2 ${
                  alert.severity === "critical"
                    ? "bg-alert-critical/10 animate-pulse-alert"
                    : alert.severity === "warning"
                    ? "bg-alert-warning/10"
                    : "bg-alert-info/10"
                }`}
              >
                <div
                  className={`flex-shrink-0 ${
                    alert.severity === "critical" ? "animate-pulse" : ""
                  }`}
                >
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-grow truncate">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {formatAlertType(alert.type)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(alert.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    Node {nodeNumber}
                  </div>
                </div>
              </div>
            );
          })}
          {recentAlerts.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-4">
              No active alerts
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsList;
