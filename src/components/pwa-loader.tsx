"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const SW_REGISTRATION_KEY = "sw-registered";

export default function PwaLoader() {
  const { toast } = useToast();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
            const isFirstTime = !localStorage.getItem(SW_REGISTRATION_KEY);
            if (isFirstTime) {
              toast({
                title: "App is ready for offline use",
                description: "Content is now available without a connection.",
              });
              localStorage.setItem(SW_REGISTRATION_KEY, "true");
            }
          },
          function (err) {
            console.error("Service Worker registration failed: ", err);
            toast({
              variant: "destructive",
              title: "Offline mode failed",
              description: "Could not initialize offline capabilities.",
            });
          }
        );
      });
    }
  }, [toast]);

  return null;
}
