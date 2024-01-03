'use client';

import { Button, Modal, TextInput } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';

type Props = {
  onClose: () => void;
  opened: boolean;
  cb: () => void;
};

const AddItemModal = ({ onClose, opened, cb }: Props) => {
  const [name, setName] = useState('');

  const handleAddItem = () => {
    axios
      .post('/api/grid/add', { name })
      .then(() => {
        onClose();
        cb();
        alert('The item was successfully added!');
        setName('');
      })
      .catch(() => alert('Error occured while adding the Item!'));
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="md"
      className="p-3">
      <TextInput value={name} name="name" onChange={({ target: { value } }) => setName(value)} />
      <div className="flex justify-center gap-4 mt-6">
        <Button color="green" onClick={() => handleAddItem()}>
          Add
        </Button>
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export { AddItemModal };
