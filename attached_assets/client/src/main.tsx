import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/parallax.css";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
