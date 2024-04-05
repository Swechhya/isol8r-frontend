import React from "react";
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css";

import App from "./App";
import GithubSetup from "./views/GithubSetup/GithubSetup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

const rootRouter = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/github-setup",
    element: <GithubSetup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={rootRouter} />
    </MantineProvider>
  </React.StrictMode>
);
