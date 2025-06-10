import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";
import { AuthenticationProvider } from "./services/AuthenticationContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </Provider>
  </StrictMode>
);
