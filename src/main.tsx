import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./styles/global.css";
import { router } from "./router.tsx";
import { GlobalProvider } from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalProvider>
    <RouterProvider router={router} />
  </GlobalProvider>
);
