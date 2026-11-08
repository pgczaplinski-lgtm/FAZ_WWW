import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router.tsx";
import { setContentSource } from "./lib/content/index.ts";
import { loadPanelContentSource } from "./lib/content/panel/index.ts";

loadPanelContentSource()
  .then(setContentSource, (error: unknown) => {
    console.warn("PanelORG content unavailable, using local content", error);
  })
  .finally(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  });
