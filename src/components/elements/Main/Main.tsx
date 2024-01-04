'use client';

import { useState } from 'react';
import { DataGrid, SearchBar } from '..';
import { utils } from '@/utils';

type StateType = {
  search: string;
};

const Main = () => {
  const [state, setState] = useState<StateType>({
    search: ''
  });
  // const handleSubmitEditItem = () => {
  //   axios
  //     .put('/api/grid/update', state.selectedItem)
  //     .then(() => {
  //       const itemIndex = state.items.findIndex((item) => item.id === state.selectedItem?.id);
  //       const newItems1 = state.items.slice(0, itemIndex);
  //       const newItems2 = state.items.slice(itemIndex + 1);
  //       const newItems = [...newItems1, state.selectedItem, ...newItems2];
  //       handleStateChange(newItems as GridItemType[], 'items');
  //       alert('The item was edited successfully!');
  //       close();
  //       // handleFetchData();
  //     })
  //     .catch(() => {
  //       alert('Error occured while editing the item! Please try again.');
  //     });
  // };

  return (
    <div className="w-full p-8">
      <SearchBar
        searchField={state.search}
        onChange={(v: string) => utils.handleStateChange(v, 'search', setState)}
      />
      <DataGrid searchField={state.search} />
    </div>
  );
};

export { Main };
