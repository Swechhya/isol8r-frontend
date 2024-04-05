import React from "react";
import { SimpleGrid, Input, Center } from "@mantine/core";

export default function GithubSetup() {
  return (
    <SimpleGrid cols={2}>
      <div>
        <div>Zakio</div>
      </div>
      <div>
        <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
          <div>Github Details</div>
          <div>Please provide your github details</div>
        </Center>
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
      </div>
    </SimpleGrid>
  );
}
