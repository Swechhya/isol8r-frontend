import React, { useState } from "react";

import { Navigate } from "react-router-dom";

import { Box, Button, Group, Title } from "@mantine/core";
import { EnvironmentData, TableSort } from "../components/table/Table";
import { useDisclosure } from "@mantine/hooks";
import LaunchModal from "../components/LaunchModal/LaunchModal";
import axios from "axios";
import { LIST_ENV } from "../constants/endpoints";
import { AppContext } from "../App";
import { notifications } from "@mantine/notifications";

type HomeContextType = {
  opened: boolean;
  open: () => void;
  close: () => void;
  setSelectedRow: React.Dispatch<
    React.SetStateAction<EnvironmentData | undefined>
  >;
  row: EnvironmentData | undefined;
};

export const HomeContext = React.createContext<HomeContextType>({
  opened: false,
  open: () => {},
  close: () => {},
  setSelectedRow: () => {},
  row: {} as EnvironmentData,
});

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [delteSuccess, setDeleteSuccess] = useState(false);
  const [redeploySuccess, setRedeploySuccess] = useState(false);

  const handleDelete = () => {
    setDeleteSuccess(true);
  };

  const handleRedeploy = () => {
    setRedeploySuccess(true);
  };
  const [selectedRow, setSelectedRow] = React.useState<EnvironmentData>();

  const { setEnvironmentList } = React.useContext(AppContext);

  React.useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + LIST_ENV)
      .then((response) => {
        if (!response.data) {
          <Navigate to="/github-setup" replace={true} />;
        }

        setEnvironmentList(response?.data?.data ?? []);
      })
      .catch((e) => {
        notifications.show({
          title: "Error",
          message: "Error fetching environments",
          color: "red",
        });
        console.error(e);
      });
  }, [delteSuccess, redeploySuccess]);

  return (
    <HomeContext.Provider
      value={{ opened, open, close, setSelectedRow, row: selectedRow }}
    >
      <Box>
        <Group align="center" justify="space-between" mb={32}>
          <Title order={1}>Isolated Environments 🚀</Title>
          <Button
            size="md"
            radius="xl"
            color="teal"
            onClick={() => {
              setSelectedRow(undefined);
              open();
            }}
          >
            Deploy New Environment
          </Button>
        </Group>

        <TableSort
          handleDelete={handleDelete}
          handleRedeploy={handleRedeploy}
        />

        <LaunchModal />
      </Box>
    </HomeContext.Provider>
  );
}
