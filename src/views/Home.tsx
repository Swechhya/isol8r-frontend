import { Box, Button, Group, Title } from "@mantine/core";
import { TableSort } from "../components/table/Table";

export default function Home() {
  return (
    <Box>
      <Group align="center" justify="space-between" mb={32}>
        <Title order={1}>Environments 🚀</Title>
        <Button size="md" radius="xl" color="teal">
          Deploy New Environment
        </Button>
      </Group>

      <TableSort />
    </Box>
  );
}
