import React from "react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  CopyButton,
  FileButton,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";

import classes from "./repo.module.css";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type RepoProps = {
  name?: string;
};

const GeneralInformation: React.FC<RepoProps> = ({ name }) => {
  return (
    <Box mb={42}>
      <Title mb={32}>General Information</Title>

      <Card radius="md" className={classes.card}>
        <Group justify="space-between">
          <Group>
            <Box>
              <Avatar
                radius="md"
                size="xl"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
              />
            </Box>
            <Box>
              <Stack gap={4}>
                <Group>
                  <Badge variant="outline" color="green" radius={"sm"}>
                    PUBLIC APP
                  </Badge>
                </Group>
                <Title order={3} className={classes.title}>
                  {name?.toUpperCase()}
                </Title>
                <Text>Some description</Text>
              </Stack>
            </Box>
          </Group>
          <Box>
            <Button variant="outline" size="xs">
              Edit App details
            </Button>
          </Box>
        </Group>
      </Card>
    </Box>
  );
};

const ShareLink: React.FC<RepoProps> = ({ name }) => {
  const url = `https://capi.dev.phil.us/${name}`;

  return (
    <Card mb={42} radius="md" className={classes.card}>
      <Stack gap={16}>
        <Title order={3} lh={1}>
          Share link
        </Title>
        <Text>Share this link with other people.</Text>
        <TextInput
          disabled
          value={url}
          rightSectionPointerEvents="all"
          rightSection={
            <CopyButton value={url} timeout={2000}>
              {({ copied, copy }) => {
                return (
                  <Tooltip
                    label={copied ? "Copied" : "Copy"}
                    withArrow
                    position="top"
                  >
                    <ActionIcon color={copied ? "teal" : "blue"} onClick={copy}>
                      {copied ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                );
              }}
            </CopyButton>
          }
        ></TextInput>
      </Stack>
    </Card>
  );
};

const EnvFileUpload: React.FC<RepoProps> = ({ name }) => {
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <Card radius="md" className={classes.card}>
      <Stack gap={16}>
        <Title order={3} lh={1}>
          App configuration
        </Title>
        <Text>
          You can maintain you application configuration in a configuration
          file. this way you can save configuration and copy it at any time.
        </Text>
        <Box>
          <Group align="center">
            {file && (
              <Box>
                <Badge size="sm" ta="center">
                  {file.name}
                </Badge>
              </Box>
            )}
            <FileButton onChange={setFile}>
              {(props) => (
                <Button variant="outline" {...props}>Upload App Configuration (.env)</Button>
              )}
            </FileButton>
          </Group>
        </Box>
      </Stack>
    </Card>
  );
};

const Repo: React.FC<RepoProps> = ({ name }) => {
  return (
    <Container>
      <GeneralInformation name={name} />
      <ShareLink name={name} />
      <EnvFileUpload name={name} />
    </Container>
  );
};

export default Repo;
