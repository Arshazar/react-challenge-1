'use client';

import { GridItem } from '@/components/commons';
import { EditItemModal } from '@/components/modals';
import { GridItem as GridItemType } from '@/types';
import { Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from '..';

type StateType = {
  search: string;
  isLoading: boolean;
  items: GridItemType[] | [];
  selectedItem: GridItemType | undefined;
};

const DataGrid = () => {
  const [state, setState] = useState<StateType>({
    search: '',
    isLoading: true,
    items: [],
    selectedItem: undefined
  });
  const [opened, { open, close }] = useDisclosure(false);

  const handleStateChange = (
    value: string | boolean | GridItemType[] | GridItemType | undefined,
    key: string
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFetchData = () => {
    axios
      .get('/api/grid')
      .then((res) => {
        handleStateChange(res.data.data, 'items');
        handleStateChange(false, 'isLoading');
      })
      .catch(() => alert('Error: fetching data failed!'));
  };

  const handleFilterItems = (list: GridItemType[]) => {
    if (state.search.length > 0)
      return list.filter((item) => {
        return item.name?.toLowerCase().includes(state.search.toLowerCase());
      });
    return list;
  };

  const handleSelectItem = (id: string) => {
    const selectedItem = state.items.find((item) => item.id === id);
    handleStateChange(selectedItem, 'selectedItem');
    open();
  };
  const handleDeselectItem = () => {
    handleStateChange(undefined, 'selectedItem');
    close();
  };
  const handleEditItem = (v: string) => {
    handleStateChange({ id: state.selectedItem?.id, name: v } as GridItemType, 'selectedItem');
  };
  const handleSubmitEditItem = () => {
    axios
      .put('/api/grid/update', state.selectedItem)
      .then(() => {
        const itemIndex = state.items.findIndex((item) => item.id === state.selectedItem?.id);
        const newItems1 = state.items.slice(0, itemIndex);
        const newItems2 = state.items.slice(itemIndex + 1);
        const newItems = [...newItems1, state.selectedItem, ...newItems2];
        handleStateChange(newItems as GridItemType[], 'items');
        alert('The item was edited successfully!');
        close();
        // handleFetchData();
      })
      .catch(() => {
        alert('Error occured while editing the item! Please try again.');
      });
  };
  const handleDeleteItem = () => {
    axios
      .delete(`/api/grid/delete/?id=${state.selectedItem?.id}`)
      .then(() => {
        const itemIndex = state.items.findIndex((item) => item.id === state.selectedItem?.id);
        const newItems1 = state.items.slice(0, itemIndex);
        const newItems2 = state.items.slice(itemIndex + 1);
        const newItems = [...newItems1, ...newItems2];
        handleStateChange(newItems as GridItemType[], 'items');
        alert('The item was deleted successfully!');
        close();
        // handleFetchData();
      })
      .catch(() => alert('Error occured while deleting the item, Please try again!'));
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <div className="w-full p-8">
        <SearchBar
          searchField={state.search}
          onChange={(v: string) => handleStateChange(v, 'search')}
          addItemCb={() => {
            handleStateChange(true, 'isLoading');
            handleFetchData();
          }}
        />
        <>
          {state.isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              {state.items.length > 0 ? (
                <Grid>
                  {handleFilterItems(state.items).map((item, i) => (
                    <GridItem key={i} text={item.name} onClick={() => handleSelectItem(item.id)} />
                  ))}
                </Grid>
              ) : (
                <span className="mx-auto">No data found!</span>
              )}
            </>
          )}
        </>
      </div>
      <EditItemModal
        onClose={handleDeselectItem}
        opened={opened}
        item={state.selectedItem}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
        handleSubmitEditItem={handleSubmitEditItem}
      />
    </>
  );
};

export { DataGrid };
