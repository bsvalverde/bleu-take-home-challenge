"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { Moon } from "lucide-react";
import { Button } from "../ui/button";

export function ThemeToggleButton() {
  const { toggleTheme } = useThemeStore();
  return (
    <Button
      variant="ghost"
      className="flex items-center justify-center rounded-full bg-primary/10 p-1 w-8 h-8 "
      onClick={() => toggleTheme()}
    >
      <Moon size={18} className="text-primary" />
    </Button>
  );
}
