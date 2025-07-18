"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

export default function BackgroundSync() {
  const { toast } = useToast();

  const handleSync = async () => {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      try {
        const swRegistration = await navigator.serviceWorker.ready;
        await swRegistration.sync.register("background-sync-example");
        toast({
          title: "Sync Requested",
          description: "Content will be updated in the background shortly.",
        });
      } catch (err) {
        console.error("Background sync registration failed:", err);
        toast({
          variant: "destructive",
          title: "Sync Failed",
          description: "Could not request background sync.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Unsupported Browser",
        description: "Your browser does not support background sync.",
      });
    }
  };

  return (
    <Button onClick={handleSync} variant="outline" size="sm" className="w-full">
      <RefreshCw className="mr-2 h-4 w-4" />
      Trigger Background Sync
    </Button>
  );
}
