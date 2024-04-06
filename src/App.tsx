import { AppShell, Burger, Stack } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import { NavbarSegmented } from "./components/navbar/Navbar";
import { useDisclosure } from "@mantine/hooks";

import Home from "./views/Home";
import Repo from "./components/Repo/Repo";

const router = [
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/repo/{name}",
    element: Repo,
  },
];

const App: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  let match: null | boolean | Object = null;

  const MatchedComponent = router.find(({ path }) => {
    // extract param from path and location
    const pathParts = path.split("/");
    const locationParts = location.pathname.split("/");
    const params: Record<string, string> = {};

    match = true;
    for (let i = 0; i < pathParts.length; i++) {
      if (pathParts[i].startsWith("{")) {
        params[pathParts[i].replace("{", "").replace("}", "")] =
          locationParts[i];
      }
    }

    // check if any path pattern matches the current location
    if (pathParts.length !== locationParts.length) {
      match = false;
      return false;
    }

    for (let i = 0; i < pathParts.length; i++) {
      if (pathParts[i] !== locationParts[i] && !pathParts[i].startsWith("{")) {
        match = false;
        return false;
      }
    }

    match = { path, params };
    return true;
  })?.element;

  console.log({ match });

  if (!match) {
    return <Navigate to="/404" replace />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Stack px={8} justify="center" h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Stack>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSegmented />
      </AppShell.Navbar>

      <AppShell.Main>
        {MatchedComponent && <MatchedComponent {...(match as { params: Record<string, string> }).params} />}
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
