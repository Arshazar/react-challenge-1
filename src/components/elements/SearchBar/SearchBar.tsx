'use client';

import { Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AddItemModal } from '@/components/modals';

type Props = {
  onChange: (v: string) => void;
  searchField: string;
};

const SearchBar = ({ onChange, searchField }: Props) => {
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
        <Button color="orange" onClick={open} variant="outline">
          Add
        </Button>
      </div>
      <AddItemModal opened={opened} onClose={close} />
    </>
  );
};

export { SearchBar };
