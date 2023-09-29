"use client";
import { useDarkModeStore } from "@/hooks/zustandUtils";
import React from "react"; // Replace with the actual file path
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const DarkModeSwitch: React.FC = () => {
  // Use the useDarkModeStore hook to access the dark mode state and toggle function
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <div className='flex items-center space-x-2'>
      <Label htmlFor='dark-mode'>
        {!isDarkMode ? "Lights On" : "Lights Off"}
      </Label>
      <Switch
        className={`${isDarkMode ? "border border-slate-500" : ""} `}
        onClick={toggleDarkMode}
        id='dark-mode'
      />
    </div>
  );
};

export default DarkModeSwitch;
