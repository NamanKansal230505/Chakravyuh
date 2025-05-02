
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Node, NetworkConnection } from "@/lib/types";

interface DeploymentMapProps {
  nodes: Node[];
  connections: NetworkConnection[];
  onSelectNode: (node: Node) => void;
  selectedNodeId: string | null;
}

const DeploymentMap: React.FC<DeploymentMapProps> = ({ 
  nodes, 
  connections, 
  onSelectNode,
  selectedNodeId 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Map boundaries (these would ideally be calculated from your real data)
  const mapBounds = {
    minLat: 20.9,
    maxLat: 21.3,
    minLng: 78.9,
    maxLng: 79.3
  };

  // Convert lat/lng to canvas x/y coordinates
  const latLngToXY = (lat: number, lng: number, width: number, height: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * width;
    const y = height - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * height;
    return { x, y };
  };

  // Draw the map
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set canvas dimensions to match container
    const { width, height } = container.getBoundingClientRect();
    setDimensions({ width, height });
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Create a rendering function to avoid flickering
    const renderCanvas = () => {
      // Create gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, 'rgba(43, 46, 37, 0.95)');
      bgGradient.addColorStop(1, 'rgba(33, 36, 27, 0.9)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw a subtle network grid pattern with gradient
      const gridGradient = ctx.createLinearGradient(0, 0, width, height);
      gridGradient.addColorStop(0, 'rgba(235, 241, 222, 0.1)');
      gridGradient.addColorStop(1, 'rgba(235, 241, 222, 0.2)');
      ctx.strokeStyle = gridGradient;
      ctx.lineWidth = 0.5;
      
      // Draw grid lines
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw network connections with gradient
      connections.forEach(connection => {
        const sourceNode = nodes.find(n => n.id === connection.source);
        const targetNode = nodes.find(n => n.id === connection.target);
        
        if (sourceNode && targetNode) {
          const sourcePos = latLngToXY(
            sourceNode.location.lat, 
            sourceNode.location.lng, 
            width, 
            height
          );
          const targetPos = latLngToXY(
            targetNode.location.lat, 
            targetNode.location.lng, 
            width, 
            height
          );
          
          // Create gradient for connection line
          const connectionGradient = ctx.createLinearGradient(
            sourcePos.x, sourcePos.y, targetPos.x, targetPos.y
          );
          connectionGradient.addColorStop(0, `rgba(139, 125, 57, ${connection.strength / 100})`);
          connectionGradient.addColorStop(1, `rgba(16, 185, 129, ${connection.strength / 100})`);
          
          // Draw connection line with glow effect
          ctx.beginPath();
          ctx.moveTo(sourcePos.x, sourcePos.y);
          ctx.lineTo(targetPos.x, targetPos.y);
          
          // Draw outer glow
          ctx.strokeStyle = connectionGradient;
          ctx.lineWidth = 6;
          ctx.stroke();
          
          // Draw inner line
          ctx.beginPath();
          ctx.moveTo(sourcePos.x, sourcePos.y);
          ctx.lineTo(targetPos.x, targetPos.y);
          ctx.strokeStyle = `rgba(210, 180, 140, ${connection.strength / 100})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const { x, y } = latLngToXY(node.location.lat, node.location.lng, width, height);
        
        // Node status color with gradients
        let nodeGradient;
        switch (node.status) {
          case "online":
            nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
            nodeGradient.addColorStop(0, "#4B5320"); // Army olive center
            nodeGradient.addColorStop(1, "#10B981"); // Green edge
            break;
          case "warning":
            nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
            nodeGradient.addColorStop(0, "#8B7D39"); // Army khaki center
            nodeGradient.addColorStop(1, "#F97316"); // Orange edge
            break;
          case "offline":
            nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
            nodeGradient.addColorStop(0, "#654321"); // Army brown center
            nodeGradient.addColorStop(1, "#EF4444"); // Red edge
            break;
          default:
            nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
            nodeGradient.addColorStop(0, "#4B5320");
            nodeGradient.addColorStop(1, "#10B981");
        }
        
        // Node size based on type
        const nodeSize = node.type === "gateway" ? 10 : 
                          node.type === "advanced" ? 8 : 6;
        
        // Draw node highlight/selection effect
        if (node.id === selectedNodeId) {
          // Outer glow for selected node
          const glowGradient = ctx.createRadialGradient(x, y, nodeSize, x, y, nodeSize + 8);
          glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
          glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          
          ctx.beginPath();
          ctx.arc(x, y, nodeSize + 8, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
        
        // Draw node with subtle shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Main node circle with gradient
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = nodeGradient;
        ctx.fill();
        
        // Remove shadow for border
        ctx.shadowColor = 'transparent';
        
        // Node border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add a small label for node ID
        ctx.font = "10px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.textAlign = "center";
        const nodeNumber = node.id.replace("node", "");
        ctx.fillText(nodeNumber, x, y + nodeSize + 12);
      });
    };
    
    // Initial render
    renderCanvas();
    
    // Set up animation frame to smoothly render
    let animationFrameId: number;
    const animate = () => {
      renderCanvas();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes, connections, dimensions, selectedNodeId, mapBounds]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle node selection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Find the node that was clicked (within a certain radius)
    const clickedNode = nodes.find(node => {
      const { x, y } = latLngToXY(
        node.location.lat, 
        node.location.lng, 
        dimensions.width, 
        dimensions.height
      );
      const distance = Math.sqrt(Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2));
      return distance <= 15; // Detection radius in pixels
    });

    if (clickedNode) {
      onSelectNode(clickedNode);
    }
  };

  return (
    <Card className="h-full border-army-khaki/30 bg-gradient-to-b from-army-olive/80 to-army-green/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Deployment Map</CardTitle>
      </CardHeader>
      <CardContent className="p-1" ref={containerRef}>
        <canvas 
          ref={canvasRef} 
          onClick={handleCanvasClick}
          className="w-full h-[400px] rounded-md cursor-pointer"
        />
      </CardContent>
    </Card>
  );
};

export default DeploymentMap;
