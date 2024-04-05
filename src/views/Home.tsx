import { Box, Button, Group, Title } from "@mantine/core";
import { TableSort } from "../components/table/Table";
import { useDisclosure } from "@mantine/hooks";
import LaunchModal from "../components/LaunchModal/LaunchModal";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Group align="center" justify="space-between" mb={32}>
        <Title order={1}>Environments 🚀</Title>
        <Button size="md" radius="xl" color="teal" onClick={open}>
          Deploy New Environment
        </Button>
      </Group>

      <TableSort />

      <LaunchModal opened={opened} open={open} close={close} />
    </Box>
  );
}
