
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Lock, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      // Check dummy credentials
      if (username === "admin" && password === "admin") {
        toast({
          title: "Login successful",
          description: "Welcome to Chakravyuh",
          duration: 3000,
        });
        navigate("/regions");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
          duration: 3000,
        });
      }
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center bg-[url('/lovable-uploads/6e0aff5c-acb9-4b64-bce6-2ff626040349.png')] bg-cover bg-center bg-no-repeat bg-opacity-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <Card className="w-[350px] z-10 army-card">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-army-red" />
          </div>
          <CardTitle className="text-2xl font-bold">Chakravyuh</CardTitle>
          <CardDescription>Indian Army Perimeter Defense System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <div className="relative">
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="army-input pl-10"
                />
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="army-input pl-10"
                />
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full army-button"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">
            Use credentials: admin / admin
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
