import {
  UnstyledButton,
  Text,
  Title,
  Box,
  Group,
  Stack,
  Select,
  Grid,
  NumberInput,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import classes from "./repoCard.module.css";
import React from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { GET_BRANCHES } from "../../constants/endpoints";
import { Resource } from "../table/Table";
import { LaunchModalContext } from "./LaunchModal";
import { HomeContext } from "../../views/Home";

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  name: string;
  handleRepoSelected: (repo: Resource) => void;
  id: string;
  form: any;
}

interface RepoCardProps {
  handleRepoSelected: (repo: Resource) => void;
  form: any;
}

export function RepoCard({
  checked,
  defaultChecked,
  onChange,
  name,
  id,
  handleRepoSelected,
  form,
  ...others
}: ImageCheckboxProps) {
  const [branches, setBranches] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [port, setPort] = React.useState<number>();
  const [selectedBranch, setSelectedBranch] = React.useState<string | null>(
    null
  );

  const { reposSelected, handlePortChange } =
    React.useContext(LaunchModalContext);

  const { row } = React.useContext(HomeContext);

  React.useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + GET_BRANCHES + `/${id}`)
      .then((response) => {
        setBranches(response.data.data);
      });
  }, []);

  React.useEffect(() => {
    if (row?.resources) {
      const selectedRepos = row.resources.filter(
        (repo) => repo.repoId === id && repo.branch !== ""
      );

      const unselectedRepos = row.resources.filter(
        (repo) => repo.repoId === id && repo.branch === ""
      );

      console.log({ selectedRepos, unselectedRepos, row });

      if (selectedRepos.length) {
        setIsActive(true);
        setPort(selectedRepos[0].port);
        setSelectedBranch(selectedRepos[0].branch);
      }
    }
  }, [row]);

  const ref = useClickOutside(() => {});

  const handleBranchChange = (branch: string | null, repoId: string) => {
    const repo: Resource = {
      isAutoUpdate: false,
      branch: branch ?? "",
      repoId,
    };

    handleRepoSelected(repo);
  };

  return (
    <UnstyledButton
      data-checked={isActive || undefined}
      className={classes.button}
      {...others}
    >
      <Stack w="100%" p={0} m={0}>
        <Group>
          <div className={classes.body}>
            <Text fw={500} size="sm" lh={1}>
              {name}
            </Text>
          </div>
        </Group>

        <Select
          ref={ref}
          label="Branch"
          placeholder="Select branch"
          value={selectedBranch}
          data={branches.map(({ name, commit: { sha } }) => ({
            label: `${name} (${sha})`,
            value: name,
          }))}
          onChange={(value) => {
            setSelectedBranch(value);
            setIsActive(value ? true : false);
            handleBranchChange(value, id);
          }}
        />
        <NumberInput
          label="Port"
          placeholder="Enter port to expose"
          value={port}
          required={isActive}
          disabled={!isActive}
          onChange={(value) => {
            setPort(value as number);
            handlePortChange(value as number, id, reposSelected);
          }}
        />
      </Stack>
    </UnstyledButton>
  );
}

export const RepoCards: React.FC<RepoCardProps> = ({
  form,
  handleRepoSelected,
}) => {
  const { repos } = React.useContext(AppContext);

  return (
    <Box mt={32}>
      <Title order={4}>Select repos to deploy</Title>
      <Grid grow mt={16}>
        {repos.map((item) => (
          <Grid.Col key={item.id} span={{ base: 1, sm: 6 }}>
            <RepoCard
              key={item.name}
              form={form}
              handleRepoSelected={handleRepoSelected}
              {...item}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
