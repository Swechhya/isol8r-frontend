import React from "react";
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';

import { Notifications } from "@mantine/notifications";

import App from "./App";
import GithubSetup from "./views/GithubSetup/GithubSetup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";

const rootRouter = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/github-setup",
    element: <GithubSetup />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications autoClose={2000}/>
      <RouterProvider router={rootRouter} />
    </MantineProvider>
  </React.StrictMode>
);
