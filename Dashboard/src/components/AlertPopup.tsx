
import React, { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Send, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AlertPopupProps {
  severity: 'critical' | 'warning' | 'info';
  onClose: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ severity, onClose }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  
  const handleDeployDrone = () => {
    setIsDeploying(true);
    
    // Simulate drone deployment
    setTimeout(() => {
      setIsDeploying(false);
      onClose();
      
      // Show success toast
      toast({
        title: "Drone Deployed",
        description: "Surveillance drone has been armed and dispatched",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent className={`
        border-2 
        ${severity === 'critical' 
          ? 'border-red-500 bg-red-950/20 animate-pulse-slow' 
          : severity === 'warning' 
          ? 'border-yellow-500 bg-yellow-950/20' 
          : 'border-blue-500 bg-blue-950/20'}
      `}>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className={`
              ${severity === 'critical' ? 'text-red-500' : 
                severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'}
            `} />
            {severity === 'critical' ? 'Critical Alert' : 
             severity === 'warning' ? 'Warning Alert' : 'Information'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Perimeter breach detected. Deploy surveillance drone for immediate assessment?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose}
            className="bg-muted/30 hover:bg-muted/50"
          >
            Dismiss
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeployDrone}
            disabled={isDeploying}
            className="bg-gradient-to-r from-army-red to-army-red/90 hover:from-army-red/90 hover:to-army-red flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {isDeploying ? "Deploying..." : "Arm Surveillance Drone"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPopup;
