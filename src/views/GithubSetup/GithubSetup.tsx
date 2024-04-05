import React, { useState } from "react";
import {
  Grid,
  TextInput,
  Container,
  Box,
  Button,
  Title,
  Text,
  Textarea,
} from "@mantine/core";

import { useForm } from "@mantine/form";

import classes from "./GithubSetup.module.css";

export default function GithubSetup() {
  const form = useForm({
    initialValues: {
      clientID: "",
      clientSecret: "",
      installID: "",
      privateKey: "",
    },
  });

  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <Container
          h="100%"
          size="responsive"
          bg="var(--mantine-color-gray-light)"
          p="50px"
        >
          Default Container
        </Container>
      </Grid.Col>
      <Grid.Col span="auto">
        <Container className={classes.rightColumn}>
          <div className={classes.heading}>
            <Box>
              <Title fz={"xl"}>Github Details</Title>
            </Box>
            <Box>
              <Text fz="md" lh="md">
                Please provide your github details
              </Text>
            </Box>
          </div>
          <form
            onSubmit={form.onSubmit((values) => console.log("Values", values))}
          >
            <div>
              <h2>Client ID:</h2>
              <div>
                <TextInput
                  radius="md"
                  placeholder="Client Id"
                  {...form.getInputProps("clientID")}
                />
              </div>
            </div>
            <div>
              <h2>Client Secret:</h2>
              <div>
                <TextInput
                  radius="md"
                  placeholder="Client Secret"
                  {...form.getInputProps("clientSecret")}
                />
              </div>
            </div>
            <div>
              <h2>Install ID:</h2>
              <div>
                <TextInput
                  radius="md"
                  placeholder="Install Id"
                  {...form.getInputProps("installID")}
                />
              </div>
            </div>
            <div>
              <h2>Private Key:</h2>
              <div>
                <Textarea
                  placeholder="Private key"
                  rows={4}
                  {...form.getInputProps("privateKey")}
                />
              </div>
            </div>
            <Button
              variant="default"
              color="teal"
              size="md"
              radius="md"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Container>
      </Grid.Col>
    </Grid>
  );
}
