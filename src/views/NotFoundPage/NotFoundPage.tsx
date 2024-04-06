import { Link } from "react-router-dom";
import { Container, Title, Text, Button, Group } from "@mantine/core";
import classes from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title style={{ marginBottom: "10px" }} className={classes.title}>
            404
          </Title>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <Link to="/github-setup">
              <Button size="md">Take me back to home page</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}
