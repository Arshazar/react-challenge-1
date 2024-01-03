'use client';

import { GridItem } from '@/types';
import { Grid, TextInput } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DataGrid = () => {
  const [state, setState] = useState({
    search: '',
    items: []
  });

  const handleStateChange = (value: string, key: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFetchData = () => {
    axios
      .get('/api/grid')
      .then((res) => handleStateChange(res.data.data, 'items'))
      .catch(() => console.log('Error: fetching data failed!'));
  };

  const handleFilterItems = (list: GridItem[]) => {
    if (state.search.length > 0)
      return list.filter((item) => {
        return item.name?.toLowerCase().includes(state.search.toLowerCase());
      });
    return list;
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="w-full p-8">
      <div className="flex w-full">
        <TextInput
          className="w-96 mb-6 mx-auto"
          placeholder="Search"
          name="search"
          value={state.search}
          onChange={({ target: { value } }) => handleStateChange(value, 'search')}
        />
      </div>
      <>
        {state.items.length > 0 ? (
          <Grid>
            {handleFilterItems(state.items).map((item, i) => (
              <Grid.Col key={i} span={3}>
                <div className="w-full h-20 aspect-square rounded-lg bg-teal-600 shadow-md flex justify-center items-center text-white hover:scale-105 transition-all">
                  {item.name}
                </div>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <span className="mx-auto">No data found!</span>
        )}
      </>
    </div>
  );
};

export { DataGrid };
