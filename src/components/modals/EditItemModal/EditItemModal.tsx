import { GridItem } from '@/types';
import { Button, Modal, TextInput } from '@mantine/core';

type Props = {
  onClose: () => void;
  opened: boolean;
  item?: GridItem;
  handleEditItem: (v: string) => void;
  handleDeleteItem: () => void;
  handleSubmitEditItem: () => void;
};

const EditItemModal = ({
  onClose,
  opened,
  item,
  handleEditItem,
  handleDeleteItem,
  handleSubmitEditItem
}: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="md"
      className="p-3">
      <TextInput
        value={item?.name}
        name="name"
        onChange={({ target: { value } }) => handleEditItem(value)}
      />
      <div className="flex justify-center gap-4 mt-6">
        <Button color="green" onClick={() => handleSubmitEditItem()} variant="outline">
          Submit Edit
        </Button>
        <Button color="red" onClick={handleDeleteItem} variant="outline">
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
