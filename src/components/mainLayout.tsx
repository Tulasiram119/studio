"use client";
import React, { useState } from "react";
import Header from "./header";
import { useModeStore } from "@/store/mode";

const MainLayout = ({
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
      {children}
    </div>
  );
};

export default MainLayout;
