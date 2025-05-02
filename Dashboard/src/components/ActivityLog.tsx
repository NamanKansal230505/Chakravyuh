
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface ActivityLogProps {
  alerts: Alert[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ alerts }) => {
  // Sort alerts by timestamp (newest first)
  const sortedAlerts = [...alerts].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  ).slice(0, 10); // Show only the 10 most recent alerts

  const getAlertColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-alert-critical";
      case "warning":
        return "text-alert-warning";
      default:
        return "text-alert-info";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="space-y-0 divide-y divide-border">
          {sortedAlerts.map((alert) => {
            const timeAgo = formatDistanceToNow(new Date(alert.timestamp), {
              addSuffix: true,
            });
            
            // Format timestamp as HH:MM:SS
            const formattedTime = new Date(alert.timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });
            
            // Get the node name from the alert
            const nodeInfo = alert.nodeId.replace("node", "Node #");

            return (
              <div
                key={alert.id}
                className="flex items-center justify-between px-6 py-3 hover:bg-secondary/50"
              >
                <div>
                  <div className={`font-medium ${getAlertColor(alert.severity)}`}>
                    {alert.description}
                  </div>
                  <div className="text-xs text-muted-foreground">{nodeInfo} - {alert.nodeId.includes("node") ? alert.nodeId.replace("node", "Sector ") : "Unknown"}</div>
                </div>
                <div className="text-xs text-right text-muted-foreground">
                  {formattedTime}
                </div>
              </div>
            );
          })}
          {sortedAlerts.length === 0 && (
            <div className="px-6 py-3 text-center text-muted-foreground">
              No recent activity
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
