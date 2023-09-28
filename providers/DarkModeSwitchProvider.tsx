"use client";
import { useDarkModeStore } from "@/hooks/zustandUtils";
import React, { useEffect } from "react";

interface DarkModeSwitchProviderProps {
  children: React.ReactNode;
}

const DarkModeSwitchProvider: React.FC = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  // Use useEffect to apply the "dark" class when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <></>;
};

export default DarkModeSwitchProvider;
