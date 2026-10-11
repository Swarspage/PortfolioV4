import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteShell } from "./components/layout/SiteShell";

export function App() {
  return (
    <ThemeProvider>
      <SiteShell />
    </ThemeProvider>);

}