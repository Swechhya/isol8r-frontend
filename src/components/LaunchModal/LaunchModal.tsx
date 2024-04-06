import React from "react";
import { Modal, TextInput } from "@mantine/core";
import { RepoCards } from "./RepoCard";

type LaunchModalProps = {
  opened: boolean;
  close: () => void;
};

const LaunchModal: React.FC<LaunchModalProps> = ({ opened, close }) => {
  return (
    <Modal
      size='50%'
      opened={opened}
      onClose={close}
      title="Launch an environment"
      centered
    >
      <TextInput
        label="Environment name"
        placeholder="Enter environment name"
        required
      />
      <RepoCards />
    </Modal>
  );
};

export default LaunchModal;
