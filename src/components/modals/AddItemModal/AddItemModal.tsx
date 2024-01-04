'use client';

import { queryClient } from '@/app/provider';
import { api } from '@/lib';
import { Button, Modal, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  onClose: () => void;
  opened: boolean;
};

const AddItemModal = ({ onClose, opened }: Props) => {
  const [name, setName] = useState('');

  const addMutate = useMutation({
    mutationFn: () => api.addGridItem(name as string),
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ['getGridItems'], queryFn: () => api.getGridItems() });
      alert('Item added successfully!');
      onClose();
    },
    onError: () => {
      alert('Adding item failed!');
    }
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="md"
      className="p-3">
      <TextInput
        label="name"
        value={name}
        name="name"
        onChange={({ target: { value } }) => setName(value)}
      />
      <div className="flex justify-center gap-4 mt-6">
        <Button color="green" onClick={() => addMutate.mutateAsync()} variant="outline">
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
