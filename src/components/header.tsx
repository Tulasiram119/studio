"use client";
import { Moon, Plus, Sun } from "lucide-react";
import React, { use } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import UserMenuPopover from "./user-menu-popover";
import { useAuthStore } from "@/store/auth";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleHomeCLick = () => {
    if (!isAuthenticated) {
      router.push("/login");
    }
    router.push("/logHabit");
  };
  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-300">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={handleHomeCLick}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-800 to-purple-600 rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold">Habit Tracker</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="default"
          size="icon"
          onClick={() => router.push("/addhabit")}
          className="w-8 h-8 bg-gradient-to-br from-indigo-800 to-purple-600 rounded-lg flex items-center justify-center"
        >
          <Plus />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {isAuthenticated && <UserMenuPopover />}
      </div>
    </header>
  );
};

export default Header;
