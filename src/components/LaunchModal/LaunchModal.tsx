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

type LaunchModalContextType = {
  reposSelected: Resource[];
  setReposSelected: React.Dispatch<React.SetStateAction<Resource[]>>;
  handlePortChange: (
    port: number,
    repoId: string,
    reposSelected: Resource[]
  ) => void;
};

export const LaunchModalContext = React.createContext<LaunchModalContextType>({
  reposSelected: [],
  setReposSelected: () => {},
  handlePortChange: () => {},
});

const LaunchModal: React.FC<LaunchModalProps> = ({ opened, close }) => {
  const [reposSelected, setReposSelected] = useState<Resource[]>([]);
  const form = useForm({
    initialValues: {
      name: "",
      identifier: "",
      resources: [] as Resource[],
    },
  });

  const handleSetReposSelected = (resource: Resource) => {
    const selectedRepos = reposSelected.filter(
      (repo) => repo.repoId === resource.repoId && resource.branch !== ""
    );

    if (resource.branch !== "") {
      selectedRepos.push(resource);
    }

    setReposSelected([...selectedRepos]);
  };

  const handlePortChange = (
    port: number,
    repoId: string,
    reposSelected: Resource[]
  ) => {
    const updatedRepos = reposSelected.map((repo) => {
      if (repo.repoId === repoId) {
        repo.port = port;
      }

      return repo;
    });

    setReposSelected(updatedRepos);
  };

  return (
    <LaunchModalContext.Provider
      value={{ reposSelected, setReposSelected, handlePortChange }}
    >
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
          <RepoCards form={form} handleRepoSelected={handleSetReposSelected} />
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
    </LaunchModalContext.Provider>
  );
};

export default LaunchModal;
