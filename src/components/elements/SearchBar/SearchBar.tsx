'use client';

import { Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AddItemModal } from '@/components/modals';

type Props = {
  onChange: (v: string) => void;
  searchField: string;
  addItemCb: () => void;
};

const SearchBar = ({ onChange, searchField, addItemCb }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="flex w-full gap-2 justify-center">
        <TextInput
          className="w-96 mb-6"
          placeholder="Search"
          name="search"
          value={searchField}
          onChange={({ target: { value } }) => onChange(value)}
        />
        <Button color="orange" onClick={open}>
          Add
        </Button>
      </div>
      <AddItemModal opened={opened} onClose={close} cb={addItemCb} />
    </>
  );
};

export { SearchBar };
