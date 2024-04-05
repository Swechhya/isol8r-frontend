import {
  Box,
} from "@mantine/core";
import { TableSort } from "../components/table/Table";

export default function Home() {

  return (
    <Box>
      <h1>Deployed Environments 🚀</h1>
      <TableSort />
    </Box>
  );
}
