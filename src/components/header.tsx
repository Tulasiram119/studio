import { Moon, Plus, Sun } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
const Header = ({ isDarkMode, toggleDarkMode }: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-300">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => router.push("/")}
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

        <div className="w-10 h-10 bg-gradient-to-br from-indigo-800 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">U</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
