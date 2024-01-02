import { createBrowserRouter } from "react-router-dom";

import { Home, Login } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export { router };
