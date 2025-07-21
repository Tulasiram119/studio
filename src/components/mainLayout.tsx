"use client";
import Header from "@/components/header";
import { ProtectedRoute } from "@/components/protectedRoutes";
import { useModeStore } from "@/store/mode";
import React from "react";

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isDarkMode = useModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useModeStore((state) => state.toggleDarkMode);
  const themeClasses = isDarkMode
    ? "dark bg-gray-800 text-white"
    : "bg-gray-100 text-gray-900";
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {/* {children} */}
      <ProtectedRoute>{children}</ProtectedRoute>
    </div>
  );
};

export default ProtectedLayout;
