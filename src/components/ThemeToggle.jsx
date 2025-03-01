import React, { useContext, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme !== null) {
      setDarkMode(JSON.parse(storedTheme));
    }
  }, [setDarkMode]);

  const handleToggle = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <IconButton
      onClick={handleToggle}
      color="inherit"
      sx={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: 1000, // Ensures it's always above other elements
      }}
    >
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeToggle;