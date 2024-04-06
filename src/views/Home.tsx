import React from "react";

import { Navigate } from "react-router-dom";

import { Box, Button, Group, Title } from "@mantine/core";
import { TableSort } from "../components/table/Table";
import { useDisclosure } from "@mantine/hooks";
import LaunchModal from "../components/LaunchModal/LaunchModal";
import axios from "axios";
import { LIST_ENV } from "../constants/endpoints";
import { AppContext } from "../App";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  const { setEnvironmentList } = React.useContext(AppContext);

  React.useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + LIST_ENV)
      .then((response) => {
        if (!response.data) {
          <Navigate to="/github-setup" replace={true} />;
        }

        setEnvironmentList(response.data.data);
      })
      .catch((e) => {
        // TODO: handle error with notifications system
        console.error(e);
      });
  }, []);

  return (
    <Box>
      <Group align="center" justify="space-between" mb={32}>
        <Title order={1}>Environments 🚀</Title>
        <Button size="md" radius="xl" color="teal" onClick={open}>
          Deploy New Environment
        </Button>
      </Group>

      <TableSort />

      <LaunchModal opened={opened} close={close} />
    </Box>
  );
}
