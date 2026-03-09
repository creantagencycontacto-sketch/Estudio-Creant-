import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force dark mode for the bold modern look
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
