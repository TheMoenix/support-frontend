import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#15514F",
          colorSuccess: "#4ea64e",
          colorWarning: "#c5871f",
          colorError: "#9c3b3b",
          colorLink: "#27918D",
          colorInfo: "#27918D",

          fontSize: 16,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
);
