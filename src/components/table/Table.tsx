import React, { useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  ActionIcon,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconRefresh,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./table.module.css";
import { AppContext } from "../../App";
import axios from "axios";
import { DELETE_ENV, REDEPLOY_ENV } from "../../constants/endpoints";

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: EnvironmentData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(item)
      // @ts-ignore
      .some((key) => {
        return (
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(query)
        );
      })
  );
}

function sortData(
  data: EnvironmentData[],
  payload: {
    sortBy: keyof EnvironmentData | null;
    reversed: boolean;
    search: string;
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        if (typeof a[sortBy] === "string" && typeof b[sortBy] === "string") {
          // @ts-ignore
          return b[sortBy].localeCompare(a[sortBy]);
        }
      }

      // @ts-ignore
      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export type EnvironmentData = {
  id: string;
  name: string;
  identifier: string;
  description: string;
  dbType: "MySQL" | "PostgreSQL";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  resources: Resource[];
};

export type Resource = {
  featureEnvironmentId?: number;
  repoId: string;
  isAutoUpdate: boolean;
  branch: string;
  link?: string;
};

export function TableSort() {
  const { environmentList } = React.useContext(AppContext);

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(environmentList);
  const [sortBy, setSortBy] = useState<keyof EnvironmentData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  React.useEffect(() => {
    setSortedData(
      sortData(environmentList, {
        sortBy,
        reversed: reverseSortDirection,
        search,
      })
    );
  }, [environmentList]);

  const handleDeleteFeatureEnvironment = async (id: string) => {
    console.log("Delete", id);
    console.log(
      "Delete",
      `${import.meta.env.VITE_BACKEND_URL}${DELETE_ENV}${id}`
    );

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}${DELETE_ENV}${id}`
    );

    console.log(res.data);
  };

  const handleRedeployFeatureEnvironment = async (id: string) => {
    console.log("Redeploy", id);

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}${REDEPLOY_ENV}${id}`
    );

    console.log(res.data);
  };

  const setSorting = (field: keyof EnvironmentData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(sortedData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);

    setSortedData(
      sortData(environmentList, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.createdAt}</Table.Td>
      <Table.Td>{row.identifier}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.createdBy}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon
            variant="filled"
            color="rgba(71, 59, 59, 1)"
            aria-label="Settings"
            onClick={() => {
              handleRedeployFeatureEnvironment(row.id);
            }}
          >
            <IconRefresh style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>{" "}
          <ActionIcon
            variant="filled"
            color="rgba(71, 59, 59, 1)"
            aria-label="Settings"
          >
            <IconSettings
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="rgba(71, 59, 59, 1)"
            aria-label="Settings"
            onClick={() => {
              handleDeleteFeatureEnvironment(row.id);
            }}
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "createdAt"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("createdAt")}
            >
              Created At
            </Th>
            <Th
              sorted={sortBy === "identifier"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("identifier")}
            >
              Identifier
            </Th>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === "createdBy"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("createdBy")}
            >
              Created By
            </Th>

            <Th>Actions</Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={0}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
