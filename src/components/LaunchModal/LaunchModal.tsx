import React, { useState } from "react";
import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RepoCards } from "./RepoCard";
import { Resource } from "../table/Table";
import axios from "axios";
import { CREATE_ENV, UPDATE_ENV } from "../../constants/endpoints";
import { HomeContext } from "../../views/Home";

type LaunchModalProps = {};

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

const LaunchModal: React.FC<LaunchModalProps> = () => {
  const [reposSelected, setReposSelected] = useState<Resource[]>([]);
  const { opened, close, row } = React.useContext(HomeContext);

  React.useEffect(() => {
    form.setValues({
      identifier: row?.identifier ?? "",
      name: row?.name ?? "",
      resources: row?.resources?.length ? row.resources : ([] as Resource[]),
    });

    setReposSelected(row?.resources ?? []);
  }, [row]);

  const form = useForm({
    initialValues: {
      name: "",
      identifier: "",
      resources: [] as Resource[],
    },
  });

  const handleSetReposSelected = (resource: Resource) => {
    let removed = false;
    if (resource.branch === "") {
      removed = true;
    }

    if (removed) {
      const selected = reposSelected.filter(
        (repo) => repo.repoId !== resource.repoId
      );
      setReposSelected([...selected]);
    } else {
      setReposSelected((p) => [...p, resource]);
    }
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
        opened={opened!}
        onClose={close!}
        title={`${row ? "Edit" : "Launch"} an environment`}
        centered
      >
        <form
          onSubmit={form.onSubmit(async (values) => {
            values.resources = reposSelected;

            try {
              const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL +
                  (row ? UPDATE_ENV + `/${row?.id}` : CREATE_ENV),
                values
              );

              if (response.status === 200) {
                close!();
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
