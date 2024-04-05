import React from "react";
import {
  Grid,
  Input,
  Container,
  Box,
  Button,
  Title,
  Text,
} from "@mantine/core";

import classes from "./GithubSetup.module.css";

export default function GithubSetup() {
  return (
    <Grid>
      <Grid.Col span="auto">
        <Container
          h="100%"
          size="responsive"
          bg="var(--mantine-color-gray-light)"
        >
          Default Container
        </Container>
      </Grid.Col>
      <Grid.Col span="auto">
        <Container>
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
          <div>
            <h2>Client ID:</h2>
            <div>
              <Input radius="md" placeholder="Input component" />
            </div>
          </div>
          <div>
            <h2>Client Secret:</h2>
            <div>
              <Input radius="md" placeholder="Input component" />
            </div>
          </div>
          <Button variant="default" color="teal" size="md" radius="md">
            Submit
          </Button>
        </Container>
      </Grid.Col>
    </Grid>
  );
}
