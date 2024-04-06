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

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
}

export function RepoCard({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  ...others
}: ImageCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof ImageCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  const ref = useClickOutside(() => {
    console.log("clicked outside");
  });

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
            onChange={() => {}}
            tabIndex={-1}
            styles={{ input: { cursor: "pointer" } }}
          />
        </Group>

        <Select
          ref={ref}
          label="Your favorite library"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
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

export function RepoCards() {
  const items = mockdata.map((item) => <RepoCard {...item} key={item.title} />);
  return (
    <Box mt={42}>
      <Title order={3}>Select repos to deploy</Title>
      <SimpleGrid mt={16} cols={{ base: 1, sm: 2, md: 4 }}>
        {items}
      </SimpleGrid>
    </Box>
  );
}
