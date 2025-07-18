"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
      setIsOnline(window.navigator.onLine);
    }
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
            <Badge variant={isOnline ? "outline" : "destructive"} className="flex items-center gap-1.5 border-primary/50 text-primary">
              {isOnline ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4" />
              )}
            </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isOnline ? "You are online" : "You are offline"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
