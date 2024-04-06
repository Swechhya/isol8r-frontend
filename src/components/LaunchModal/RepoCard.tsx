import {
  UnstyledButton,
  Checkbox,
  Text,
  Title,
  Box,
  Group,
  Stack,
  Select,
  Grid,
} from "@mantine/core";
import { useClickOutside, useUncontrolled } from "@mantine/hooks";
import classes from "./repoCard.module.css";
import React from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { GET_BRANCHES } from "../../constants/endpoints";
import { Resource } from "../table/Table";

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  name: string;
  handleRepoSelected: (repo: Resource) => void;
}

interface RepoCardProps {
  handleRepoSelected: (repo: Resource) => void;
}

export function RepoCard({
  checked,
  defaultChecked,
  onChange,
  name,
  id,
  className,
  handleRepoSelected,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) {
  const [branches, setBranches] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + GET_BRANCHES + `/${id}`)
      .then((response) => {
        setBranches(response.data.data);
      });
  }, []);

  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  const [repoChecked, setRepoChecked] = React.useState<Boolean>(false);

  const ref = useClickOutside(() => {
    console.log("clicked outside");
  });

  const handleCheckBoxChange = (e: any) => {
    setRepoChecked(e.target.checked);
  };

  const handleBranchChange = (branch: string | null, repoId: string) => {
    // if (!repoChecked) {
    //   return;
    // }
    const repo: Resource = { isAutoUpdate: true, branch: branch ?? "", repoId };

    handleRepoSelected(repo);
  };

  return (
    <UnstyledButton
      {...others}
      onClick={(e) => {
        const isTargetDropdown = e.target === ref?.current;
        !isTargetDropdown && handleChange(!value);
      }}
      data-checked={value || undefined}
      className={classes.button}
    >
      <Stack w="100%" p={0} m={0}>
        <Group>
          <div className={classes.body}>
            <Text fw={500} size="sm" lh={1}>
              {name}
            </Text>
          </div>

          <Checkbox
            checked={value}
            onChange={(e) => {
              handleCheckBoxChange(e);
            }}
            tabIndex={-1}
            styles={{ input: { cursor: "pointer" } }}
          />
        </Group>

        <Select
          ref={ref}
          label="Branch"
          placeholder="Select branch"
          data={branches.map(({ name, commit: { sha } }) => ({
            label: `${name} (${sha})`,
            value: name,
          }))}
          onChange={(value) => {
            handleBranchChange(value, id!);
          }}
        />
      </Stack>
    </UnstyledButton>
  );
}

export const RepoCards: React.FC<RepoCardProps> = ({ handleRepoSelected }) => {
  const { repos } = React.useContext(AppContext);

  console.log("Repos", repos);

  return (
    <Box mt={42}>
      <Title order={3}>Select repos to deploy</Title>
      <Grid grow mt={16}>
        {repos.map((item) => (
          <Grid.Col key={item.id} span={{ base: 1, sm: 6 }}>
            <RepoCard
              key={item.name}
              handleRepoSelected={handleRepoSelected}
              {...item}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
