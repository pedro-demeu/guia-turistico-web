import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import Routes from "./Routes.tsx";

export const appConfig = {
  title: "Guia Turístico Web",
  description: "A simple React + TypeScript + Vite template",
}
async function enableMocking() {
  if (!import.meta.env.VITE_ENABLE_MSW) {
    return;
  }

  const { serviceWorker } = await import("./msw/worker.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return serviceWorker.start();
}
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CssBaseline />
        <Routes />
    </StrictMode>
  );
});
