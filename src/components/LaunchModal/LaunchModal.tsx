import React, { useState } from "react";
import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RepoCards } from "./RepoCard";
import { Resource } from "../table/Table";
import axios from "axios";
import { CREATE_ENV } from "../../constants/endpoints";

type LaunchModalProps = {
  opened: boolean;
  close: () => void;
};

const LaunchModal: React.FC<LaunchModalProps> = ({ opened, close }) => {
  const [reposSelected, setReposSelected] = useState<Resource[]>([]);
  const form = useForm({
    initialValues: {
      name: "",
      identifier: "",
      resources: [] as Resource[],
    },
  });

  const handleSetReposSelected = (repo: Resource) => {
    let valueReplaced = false;
    for (let i = 0; i < reposSelected.length; i++) {
      if (reposSelected[i].repoId == repo.repoId) {
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
          values.resources = reposSelected;

          try {
            const response = await axios.post(
              import.meta.env.VITE_BACKEND_URL + CREATE_ENV,
              values
            );

            if (response.status === 200) {
              close();
            }
          } catch (error) {
            // TODO: handle notifs
            console.error(error);
          }
        })}
      >
        <TextInput
          label="Environment name"
          placeholder="Enter environment name"
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Identifier"
          placeholder="Enter Identifier"
          required
          {...form.getInputProps("identifier")}
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
