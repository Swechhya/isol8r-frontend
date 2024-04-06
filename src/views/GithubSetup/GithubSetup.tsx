import {
  Grid,
  TextInput,
  Container,
  Box,
  Button,
  Title,
  Text,
  Stack,
  FileInput,
  rem,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { IconFile } from "@tabler/icons-react";
import axios from "axios";
import fs from "fs";

export default function GithubSetup() {
  const form = useForm({
    initialValues: {
      clientID: "",
      clientSecret: "",
      installID: "",
      privateKey: undefined as unknown as File,
    },
  });

  return (
    <Box>
      <Grid gutter={0} h={"100%"} align="center" justify="center">
        <Grid.Col
          visibleFrom="lg"
          h={"100vh"}
          mah={"100%"}
          span={{ base: 12, sm: 4 }}
        >
          <Container
            h="100%"
            size="responsive"
            bg="var(--mantine-color-gray-light)"
            p={50}
          >
            Default Container
          </Container>
        </Grid.Col>
        <Grid.Col h="100vh" mah="100%" span={{ base: 13, sm: 8 }}>
          <Container h="100vh" mah="100%" w="100%">
            <Stack justify="center" w="100%" maw="100%">
              <Box mt={40}>
                <Title order={1} ta={"center"}>
                  Github Details
                </Title>
                <Text ta="center" lh="md">
                  Please provide your github details
                </Text>
              </Box>
              import fs from 'fs';
              <form
                onSubmit={form.onSubmit(async (values) => {
                  console.log("Values", values);

                  const formData = new FormData();

                  formData.append("clientID", values.clientID);
                  formData.append("clientSecret", values.clientSecret);
                  formData.append("installID", values.installID);
                  formData.append("privateKey", values.privateKey);

                  const res = await axios.post(
                    "http://localhost:8080/gh/setup",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );

                  console.log({ res });
                })}
              >
                <Box mb={8}>
                  <TextInput
                    label="Client ID"
                    radius="md"
                    placeholder="Client Id"
                    required
                    {...form.getInputProps("clientID")}
                  />
                </Box>
                <div>
                  <TextInput
                    label="Client Secret"
                    radius="md"
                    placeholder="Client Secret"
                    required
                    {...form.getInputProps("clientSecret")}
                  />
                </div>
                <div>
                  <TextInput
                    label="Install ID"
                    radius="md"
                    placeholder="Install Id"
                    required
                    {...form.getInputProps("installID")}
                  />
                </div>
                <div>
                  <FileInput
                    leftSection={
                      <IconFile
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                      />
                    }
                    label="Attach your CV"
                    placeholder="Your CV"
                    leftSectionPointerEvents="none"
                    required
                    {...form.getInputProps("privateKey")}
                  />
                </div>
                <Button
                  color="black"
                  size="md"
                  radius="md"
                  type="submit"
                  mt={16}
                >
                  Submit
                </Button>
              </form>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
