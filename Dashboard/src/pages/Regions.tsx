
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Flag, ChevronRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Region {
  id: string;
  name: string;
  description: string;
  locations: string[];
  isActive: boolean;
}

const Regions = () => {
  const navigate = useNavigate();
  
  const [regions] = useState<Region[]>([
    {
      id: "jk",
      name: "Jammu & Kashmir",
      description: "Border surveillance network in the northern region",
      locations: ["Pahalgam", "Doda", "Patnitop", "Gulmarg", "Sonamarg"],
      isActive: true
    },
    {
      id: "punjab",
      name: "Punjab",
      description: "Western border surveillance network",
      locations: ["Amritsar", "Pathankot", "Firozpur", "Gurdaspur", "Fazilka"],
      isActive: false
    },
    {
      id: "rajasthan",
      name: "Rajasthan",
      description: "Desert surveillance network",
      locations: ["Jaisalmer", "Bikaner", "Barmer", "Sri Ganganagar", "Jodhpur"],
      isActive: false
    },
    {
      id: "ne",
      name: "North East",
      description: "Eastern surveillance network",
      locations: ["Tawang", "Walong", "Kibithu", "Nathu La", "Bumla"],
      isActive: false
    }
  ]);
  
  const handleRegionSelect = (regionId: string, isActive: boolean) => {
    if (isActive) {
      navigate(`/dashboard`);
    } else {
      toast({
        title: "Region unavailable",
        description: "This region is not available in the current version",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleLogout = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 bg-secondary">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="h-6 w-6 text-army-red" />
            <h1 className="text-xl font-bold">Chakravyuh</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container py-8">
        <h2 className="text-2xl font-bold mb-6">Select Region</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region) => (
            <Card 
              key={region.id} 
              className={`army-card overflow-hidden transition-colors cursor-pointer ${
                region.isActive ? "hover:border-army-khaki/70" : "opacity-60"
              }`} 
              onClick={() => handleRegionSelect(region.id, region.isActive)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{region.name}</CardTitle>
                    <CardDescription>
                      {region.description}
                      {!region.isActive && (
                        <span className="block text-army-red mt-1">
                          Coming soon
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <MapPin className="h-5 w-5 text-army-red" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Key Locations:</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {region.locations.map((location) => (
                    <span key={location} className="text-xs px-2 py-1 bg-muted rounded-full">
                      {location}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-between items-center">
                <span className="text-sm">
                  {region.isActive ? "View network" : "Not available"}
                </span>
                {region.isActive && <ChevronRight className="h-4 w-4" />}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Regions;
