import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { API } from "./api/api.ts";
import App from "./App.tsx";
import "./index.css";

try {
  const data = await API.get("/test");
  console.log(data);
} catch (error) {
  console.error("Failed to connect to the server:", error);
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
