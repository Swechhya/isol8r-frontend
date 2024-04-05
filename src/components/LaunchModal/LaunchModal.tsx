import React from "react";
import { Modal, Button } from "@mantine/core";

type LaunchModalProps = {
  opened: boolean;
  open: () => void;
  close: () => void;
};

const LaunchModal: React.FC<LaunchModalProps> = ({ opened, open, close }) => {
  return (
    <Modal opened={opened} onClose={close} title="Authentication" centered>
      something
    </Modal>
  );
};

export default LaunchModal;
