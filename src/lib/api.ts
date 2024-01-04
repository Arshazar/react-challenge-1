import { LOGIN_CONST } from '@/constants';
import axios from 'axios';

class Api {
  login = async (username: string, password: string) => {
    const user = LOGIN_CONST.users.find((user) => user.username === username);
    if (!user) return { data: undefined, error: 'user not found' };
    if (user.password !== password) return { data: undefined, error: 'wrong password, try again!' };
    return { data: user, error: undefined };
  };
  getGridItems = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MOCK_SERVER}/gridItems`);

    if (!data) return { error: 'Error!' };
    return { data };
  };
  addGridItem = async (name: string) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_MOCK_SERVER}/gridItems`, { name });
    if (!data) return { error: 'Error!' };
    return { data };
  };
  updateGridItem = async (id: string, name: string) => {
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_MOCK_SERVER}/gridItems/${id}`, {
      name
    });
    if (!data) return { error: 'Error!' };
    return { data };
  };
  deleteGridItem = async (id: string) => {
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_MOCK_SERVER}/gridItems/${id}`);

    if (!data) return { error: 'Error!' };
    return { data };
  };
}

const api = new Api();
export { api };
