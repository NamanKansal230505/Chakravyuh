
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NetworkStatus as NetworkStatusType } from "@/lib/types";

interface NetworkStatusProps {
  status: NetworkStatusType;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ status }) => {
  const networkHealthColor = 
    status.networkHealth > 90 
      ? "bg-alert-success" 
      : status.networkHealth > 70 
        ? "bg-alert-info" 
        : status.networkHealth > 50 
          ? "bg-alert-warning" 
          : "bg-alert-critical";

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Network Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Active Nodes</span>
          <span className="font-mono text-right text-sm">
            <span className="text-green-400">{status.activeNodes}</span>
            <span className="text-muted-foreground">/{status.totalNodes}</span>
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Network Health</span>
            <span className="font-mono text-right text-sm">
              {status.networkHealth}%
            </span>
          </div>
          <Progress
            value={status.networkHealth}
            className={`h-1.5 ${networkHealthColor}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;
