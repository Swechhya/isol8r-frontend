import { AppShell, Burger, Stack } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router";
import { NavbarSegmented } from "./components/navbar/Navbar";
import { useDisclosure } from "@mantine/hooks";

import Home from "./views/Home";

const router = [
  {
    path: "/home",
    element: <Home />,
  },
];

const App: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

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
        {router.find(({ path }) => location.pathname === path)?.element ?? (
          <>Not Found!</>
        )}
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
