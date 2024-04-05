import {
  AppShell,
  Box,
  Burger,
  Container,
  Group,
  MantineProvider,
  Stack,
} from "@mantine/core";
import { theme } from "../theme";
import { useDisclosure } from "@mantine/hooks";
import { NavbarSegmented } from "../components/navbar/Navbar";
import { TableSort } from "../components/table/Table";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme}>
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
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Stack>
        </AppShell.Header>

        <AppShell.Navbar>
          <NavbarSegmented />
        </AppShell.Navbar>

        <AppShell.Main>
          <Box>
            <h1>Deployed Environments 🚀</h1>
            <TableSort />
          </Box>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
