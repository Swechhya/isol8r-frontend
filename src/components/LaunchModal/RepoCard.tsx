import {
  UnstyledButton,
  Checkbox,
  Text,
  SimpleGrid,
  Title,
  Box,
  Group,
  Stack,
  Select,
} from "@mantine/core";
import { useClickOutside, useUncontrolled } from "@mantine/hooks";
import classes from "./repoCard.module.css";
import { useState } from "react";

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  handleRepoSelected: (repo: Resource) => void;
}

interface RepoCardProps {
  handleRepoSelected: (repo: Resource) => void;
}

export function RepoCard({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  handleRepoSelected,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  const [repoChecked, setRepoChecked] = useState<Boolean>(false);
  console.log(repoChecked);

  const ref = useClickOutside(() => {
    console.log("clicked outside");
  });

  const handleCheckBoxChange = (e: any) => {
    setRepoChecked(e.target.checked);
  };

  const handleBranchChange = (value: string | null, title: string) => {
    console.log(value);
    // if (!repoChecked) {
    //   return;
    // }
    const repo: Resource = { appName: "", isAutoUpdate: false, branchName: "" };
    repo.appName = title;
    repo.branchName = value ?? "";

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
            <Text c="dimmed" size="xs" lh={1} mb={5}>
              {description}
            </Text>
            <Text fw={500} size="sm" lh={1}>
              {title}
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
          label="Your favorite library"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
          onChange={(value) => {
            handleBranchChange(value, title);
          }}
        />
      </Stack>
    </UnstyledButton>
  );
}

const mockdata = [
  { description: "Frontend", title: "Thanos" },
  { description: "CAPI", title: "Core API" },
  { description: "Backend", title: "DATA-SVC" },
  { description: "Dashboard", title: "Dashboard" },
];

export const RepoCards: React.FC<RepoCardProps> = ({ handleRepoSelected }) => {
  const items = mockdata.map((item) => (
    <RepoCard
      handleRepoSelected={handleRepoSelected}
      {...item}
      key={item.title}
    />
  ));
  return (
    <Box mt={42}>
      <Title order={3}>Select repos to deploy</Title>
      <SimpleGrid mt={16} cols={{ base: 1, sm: 2, md: 4 }}>
        {items}
      </SimpleGrid>
    </Box>
  );
};
