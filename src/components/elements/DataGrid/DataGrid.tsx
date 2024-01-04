'use client';

import { Grid } from '@mantine/core';
import { GridItem } from '@/components/commons';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib';
import { GridItem as GridItemType } from '@/types';
import { EditItemModal } from '@/components/modals';
import { utils } from '@/utils';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

type Props = {
  searchField: string;
};

const DataGrid = ({ searchField }: Props) => {
  const [state, setState] = useState({
    selectedItem: undefined
  });

  const [opened, { open, close }] = useDisclosure(false);
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ['getGridItems'],
    queryFn: () => api.getGridItems()
  });

  const handleFilterItems = (list: GridItemType[]) => {
    if (searchField.length > 0)
      return list.filter((item) => {
        return item.name?.toLowerCase().includes(searchField.toLowerCase());
      });
    return list;
  };

  const handleSelectItem = (id: string) => {
    const selectedItem = data?.data.find((item: GridItemType) => item.id === id);
    utils.handleStateChange(selectedItem, 'selectedItem', setState);
    open();
  };
  const handleDeselectItem = () => {
    utils.handleStateChange(undefined, 'selectedItem', setState);
    close();
  };

  return (
    <>
      {isFetching && <span>updating...</span>}
      {isLoading && !isFetching && <span>loading...</span>}
      {!isFetching && !isLoading && !data && <span>No data found!</span>}
      {data?.data && data.data.length > 0 && (
        <Grid>
          {handleFilterItems(data.data).map((item, i) => (
            <GridItem key={i} text={item.name} onClick={() => handleSelectItem(item.id)} />
          ))}
        </Grid>
      )}
      <EditItemModal onClose={handleDeselectItem} opened={opened} item={state.selectedItem} />
    </>
  );
};

export { DataGrid };
