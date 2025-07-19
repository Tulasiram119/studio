"use client";
import React, { useState } from "react";
import { LogOut, Trash2, LogIn, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useModeStore } from "@/store/mode"; // Import useModeStore

const UserMenuPopover = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const isDarkMode = useModeStore((state) => state.isDarkMode); // Get dark mode state

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDelete = () => {
    // Add your delete account logic here
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className={`font-inter`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-12 w-12 rounded-full p-0 hover:scale-105 transition-all duration-200 bg-gradient-to-br from-[#4B0082] to-[#BF00FF] hover:from-[#5B1090] hover:to-[#CF10FF]"
          >
            <Avatar className="h-12 w-12 border-2 border-white/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-transparent text-white font-medium">
                U
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={`w-64 p-2 rounded-xl shadow-2xl border ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
          align="end"
        >
          {isLoggedIn ? (
            <>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 p-3">
                  <Avatar className="h-10 w-10 border border-[#BF00FF]/20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-[#4B0082] to-[#BF00FF] text-sm">
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p
                      className={`font-medium text-sm ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      John Doe
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      john.doe@example.com
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator
                className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
              />

              <DropdownMenuItem
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-700 focus:bg-gray-700"
                    : "hover:bg-gray-50 focus:bg-gray-50"
                }`}
                onClick={() => console.log("Settings clicked")}
              >
                <Settings size={18} className="text-[#BF00FF]" />
                <div>
                  <p
                    className={`font-medium text-sm ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Settings
                  </p>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Manage preferences
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator
                className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
              />

              <DropdownMenuItem
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-700 focus:bg-gray-700"
                    : "hover:bg-gray-50 focus:bg-gray-50"
                }`}
                onClick={handleLogout}
              >
                <LogOut
                  size={18}
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <div>
                  <p
                    className={`font-medium text-sm ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Logout
                  </p>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Sign out of account
                  </p>
                </div>
              </DropdownMenuItem>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      isDarkMode
                        ? "hover:bg-red-900/20 focus:bg-red-900/20 text-red-400"
                        : "hover:bg-red-50 focus:bg-red-50 text-red-600"
                    }`}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 size={18} className="text-current" />
                    <div>
                      <p className="font-medium text-sm">Delete Account</p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Permanently remove account
                      </p>
                    </div>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent
                  className={`${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle
                      className={`${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Delete Account
                    </AlertDialogTitle>
                    <AlertDialogDescription
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className={`${
                        isDarkMode
                          ? "text-gray-100 border-gray-600 hover:bg-gray-600"
                          : "text-gray-900 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <DropdownMenuLabel className="p-3 text-center">
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Welcome! Please sign in to continue.
                </p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator
                className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}
              />

              <DropdownMenuItem
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-blue-900/20 focus:bg-blue-900/20 text-[#BF00FF]"
                    : "hover:bg-blue-50 focus:bg-blue-50 text-[#4B0082]"
                }`}
                onClick={handleLogin}
              >
                <LogIn size={18} className="text-[#BF00FF]" />
                <div>
                  <p className="font-medium text-sm">Login</p>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Sign in to your account
                  </p>
                </div>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenuPopover;
