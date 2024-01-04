import { SetStateAction } from 'react';

class Utils {
  handleStateChange = (value: any, key: string, setState: SetStateAction<any>) => {
    setState((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };
}

const utils = new Utils();
export { utils };
