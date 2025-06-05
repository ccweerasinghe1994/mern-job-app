import { createContext, useState, type PropsWithChildren } from "react";
import { getDarkThemeFromLocalStorage } from "../App";

type Props = PropsWithChildren;

type DashBoardContextType = {
  logoutUser: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: { name: string; avatar: string } | null;
  showSidebar: boolean;
  toggleMenu: () => void;
};
const initialContext: DashBoardContextType = {
  logoutUser: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
  user: null,
  showSidebar: false,
  toggleMenu: () => {},
};

export const DashBoardContext = createContext(initialContext);

export default function DashBoardContextProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    getDarkThemeFromLocalStorage()
  );
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const user = { name: "John Doe", avatar: "" }; // Example user data
  function logoutUser() {
    console.log("Logging out user...");
  }
  function toggleMenu() {
    console.log("Toggling sidebar menu...");
    setShowSidebar((prev) => !prev);
  }

  function toggleDarkMode() {
    console.log("Toggling dark mode...");
    const newDarkTheme = !isDarkMode;
    setIsDarkMode(newDarkTheme);
    document.documentElement.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme ? "true" : "false");
    console.log("🚀 ~ toggleDarkMode ~ newDarkTheme:", newDarkTheme);
  }

  return (
    <DashBoardContext.Provider
      value={{
        logoutUser,
        isDarkMode,
        toggleDarkMode,
        user,
        showSidebar,
        toggleMenu,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
