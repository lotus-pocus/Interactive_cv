import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shell/shell.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
