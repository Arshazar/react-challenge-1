'use client';

import { queryClient } from '@/app/provider';
import { api } from '@/lib';
import { GridItem } from '@/types';
import { Button, Modal, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type Props = {
  onClose: () => void;
  opened: boolean;
  item?: GridItem;
};

const EditItemModal = ({ onClose, opened, item }: Props) => {
  const [name, setName] = useState('');

  const updateMutate = useMutation({
    mutationFn: () => api.updateGridItem(item?.id as string, name),
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ['getGridItems'],
        queryFn: () => api.getGridItems()
      });
      alert('Item edited successfully!');
      onClose();
    },
    onError: () => {
      alert('Editing item failed!');
    }
  });
  const deleteMutate = useMutation({
    mutationFn: () => api.deleteGridItem(item?.id as string),
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ['getGridItems'], queryFn: () => api.getGridItems() });
      alert('Item deleted successfully!');
      onClose();
    },
    onError: () => {
      alert('Deleting item failed!');
    }
  });

  const onUpdate = async () => {
    await updateMutate.mutateAsync();
  };
  const onDelete = async () => {
    await deleteMutate.mutateAsync();
  };

  useEffect(() => {
    if (item?.name) {
      setName(item?.name);
    }
  }, [item]);

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
        <Button color="green" onClick={onUpdate} variant="outline">
          Submit Edit
        </Button>
        <Button color="red" onClick={onDelete} variant="outline">
          Delete
        </Button>
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export { EditItemModal };
