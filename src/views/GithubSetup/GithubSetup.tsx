import {
  Grid,
  TextInput,
  Container,
  Box,
  Button,
  Title,
  Text,
  Stack,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../constants/routes";

export default function GithubSetup() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      clientID: "",
      clientSecret: "",
      installID: "",
      appID: "",
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
              <form
                onSubmit={form.onSubmit(async (values) => {
                  try {
                    const res = await axios.post(
                      "http://localhost:8080/gh/setup",
                      values,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    if (res.status === 200) {
                      navigate(HOME);
                    }
                  } catch (error) {
                    // TODO: handle notifications error
                    console.log(error);
                  }
                })}
              >
                <Box mb={8}>
                  <TextInput
                    label="Client ID"
                    radius="md"
                    placeholder="Client Id"
                    required
                    autoComplete="on"
                    {...form.getInputProps("clientID")}
                  />
                </Box>
                <div>
                  <TextInput
                    label="Client Secret"
                    radius="md"
                    placeholder="Client Secret"
                    autoComplete="on"
                    required
                    {...form.getInputProps("clientSecret")}
                  />
                </div>
                <div>
                  <TextInput
                    label="Install ID"
                    radius="md"
                    placeholder="Install Id"
                    autoComplete="on"
                    required
                    {...form.getInputProps("installID")}
                  />
                </div>
                <div>
                  <TextInput
                    label="App ID"
                    radius="md"
                    placeholder="App Id"
                    autoComplete="on"
                    required
                    {...form.getInputProps("appID")}
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
