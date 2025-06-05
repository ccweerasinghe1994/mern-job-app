import { useContext } from "react";
import { DashBoardContext } from "../context/DashBoardContext";

export const useDashBoardContext = () => {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error(
      "useDashBoardContext must be used within a DashboardProvider"
    );
  }
  return context;
};
