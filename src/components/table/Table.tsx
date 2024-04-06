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
} from "@tabler/icons-react";
import classes from "./table.module.css";

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
    keys(data[0])
      .filter((item) => typeof item === "string")
      // @ts-ignore
      .some((key) => item[key].toLowerCase().includes(query))
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
        // @ts-ignore
        return b[sortBy].localeCompare(a[sortBy]);
      }

      // @ts-ignore
      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

type EnvironmentData = {
  name: string;
  dbType: "mongodb" | "mysql"; // Assuming these are the only two dbTypes you have, otherwise use string
  createdAt: string; // Assuming ISO 8601 format, otherwise you might want to use Date
  createdBy: string;
  resources: Resource[];
};

type Resource = {
  appName: string;
  isAutoUpdate: boolean;
};

// TODO: remove and add loaders
const data: EnvironmentData[] = [
  {
    name: "Environment 1",
    dbType: "mongodb",
    createdAt: "2024-04-05T23:06:59+05:45",
    createdBy: "User 1",
    resources: [
      { appName: "App 1", isAutoUpdate: true },
      { appName: "App 2", isAutoUpdate: false },
    ],
  },
  {
    name: "Environment 2",
    dbType: "mysql",
    createdAt: "2024-04-05T23:06:59+05:45",
    createdBy: "User 2",
    resources: [
      { appName: "App 3", isAutoUpdate: true },
      { appName: "App 4", isAutoUpdate: true },
    ],
  },
];

export function TableSort() {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof EnvironmentData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // React.useEffect(() => {
  //   axios
  //     .get(import.meta.env.VITE_BACKEND_URL + LIST_REPOS)
  //     .then((response) => {
  //       setSortedData(response.data.data);
  //     })
  //     .catch((e) => console.error(e));
  // }, []);

  const setSorting = (field: keyof EnvironmentData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.createdAt}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.createdBy}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon
            variant="filled"
            color="rgba(71, 59, 59, 1)"
            aria-label="Settings"
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
              <Table.Td colSpan={Object.keys(data[0]).length}>
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
