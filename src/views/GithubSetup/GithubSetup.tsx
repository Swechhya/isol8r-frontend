import React from "react";
import {
  TextInput,
  Container,
  Box,
  Button,
  Title,
  Text,
  Paper,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../constants/routes";
import { notifications } from "@mantine/notifications";

import classes from "./githubSetup.module.css";

export default function GithubSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm({
    initialValues: {
      clientID: "Iv1.3484a5cbceec7189",
      clientSecret: "12d77149d9c0c525894462db85891771a4eb71b9",
      installID: "870502",
      appID: "49284279",
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome to setup!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Please provide your github details to begin
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              setLoading(true);
              const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/gh/setup",
                values,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (res.status === 200) {
                notifications.show({
                  title: "Success",
                  message: "Github setup successfully",
                });
                navigate(HOME);
              }
            } catch (error) {
              notifications.show({
                title: "Error",
                message: "Failed to setup github",
                color: "red",
              });
              console.log(error);
            } finally {
              setLoading(false);
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
            loading={loading}
            disabled={loading}
            type="submit"
            fullWidth
            mt="xl"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
