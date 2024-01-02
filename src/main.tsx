import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';

import './styles/global.css';
import { router } from './router.tsx';
import { GlobalProvider } from './providers';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </GlobalProvider>
);
