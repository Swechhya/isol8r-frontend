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
import axios from "axios";
import { SAVE_ENV } from "../../constants/endpoints";
import { AppContext, RepoData } from "../../App";

type RepoProps = {
  id?: string;
};

type RepoChildrenProps = {
  repo?: RepoData;
};

const GeneralInformation: React.FC<RepoChildrenProps> = ({ repo }) => {
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
                  {repo?.name?.toUpperCase()}
                </Title>
              </Stack>
            </Box>
          </Group>
        </Group>
      </Card>
    </Box>
  );
};

const ShareLink: React.FC<RepoChildrenProps> = ({ repo }) => {
  const url = `https://capi.dev.phil.us/${repo?.name}`;

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

const EnvFileUpload: React.FC<RepoChildrenProps> = (props) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  console.log(isProcessing);

  const { repo } = props;

  const handleFileChange = async (file: File | null) => {
    try {
      setFile(file);

      setIsProcessing((p) => !p);

      const formData = new FormData();
      formData.append("file", file as Blob);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + SAVE_ENV + `/${repo?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        // TODO: handle notifs system
        alert("File uploaded successfully");
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      // TODO: handle notifs system
      console.log(error);
    } finally {
      setIsProcessing((p) => !p);
    }
  };

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
            <FileButton onChange={handleFileChange}>
              {(props) => (
                <Button variant="outline" {...props}>
                  Upload App Configuration (.env)
                </Button>
              )}
            </FileButton>
          </Group>
        </Box>
      </Stack>
    </Card>
  );
};

const Repo: React.FC<RepoProps> = (props) => {
  const id = props.id;

  const { repos } = React.useContext(AppContext);

  const repo = repos.find((repo) => repo.id == id);

  console.log({ repo }, "real");

  return (
    <Container>
      <GeneralInformation repo={repo} />
      <ShareLink repo={repo} />
      <EnvFileUpload repo={repo} />
    </Container>
  );
};

export default Repo;
