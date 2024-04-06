import React, { useState } from "react";
import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RepoCards } from "./RepoCard";

type LaunchModalProps = {
  opened: boolean;
  close: () => void;
};

const LaunchModal: React.FC<LaunchModalProps> = ({ opened, close }) => {
  const [reposSelected, setReposSelected] = useState<Resource[]>([]);
  const form = useForm({
    initialValues: {
      name: "",
      dbType: "dev",
      createdBy: "Sailesh",
      resource: [] as Resource[],
    },
  });

  const handleSetReposSelected = (repo: Resource) => {
    let valueReplaced = false;
    for (let i = 0; i < reposSelected.length; i++) {
      if (reposSelected[i].appName == repo.appName) {
        reposSelected[i] = repo;
        valueReplaced = true;
      }
    }

    if (!valueReplaced) {
      reposSelected.push(repo);
    }

    setReposSelected(reposSelected);
  };

  return (
    <Modal
      size="50%"
      opened={opened}
      onClose={close}
      title="Launch an environment"
      centered
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          values.resource = reposSelected;
          console.log("Values", values);
        })}
      >
        <TextInput
          label="Environment name"
          placeholder="Enter environment name"
          required
          {...form.getInputProps("name")}
        />
        <RepoCards handleRepoSelected={handleSetReposSelected} />
        <Button
          mt={20}
          size="md"
          radius="xl"
          color="rgba(138, 140, 132, 1)"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default LaunchModal;
