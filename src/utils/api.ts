import { LOGIN_CONST } from '@/constants';

class Api {
  login = async (username: string, password: string) => {
    const user = LOGIN_CONST.users.find((user) => user.username === username);
    if (!user) return { data: undefined, error: 'user not found' };
    if (user.password !== password) return { data: undefined, error: 'wrong password, try again!' };
    return { data: user, error: undefined };
  };
}

const api = new Api();
export { api };
