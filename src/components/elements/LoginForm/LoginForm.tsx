'use client';

import { TextInput, Button, Box } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginForm = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    isValid: false
  });
  const { push } = useRouter();

  const handleStateChange = (v: string | boolean, key: string) => {
    setState((prev) => ({
      ...prev,
      [key]: v
    }));
  };

  const handleSubmit = () => {
    axios
      .post(
        'api/auth/login',
        {
          username: state.username,
          password: state.password
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        alert(`welcome ${res.data.data.name}`);
        push('/');
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  useEffect(() => {
    if (state.username.length < 4 || state.password.length < 4) handleStateChange(false, 'isValid');
    else if (state.username.length > 3 && state.password.length > 3)
      handleStateChange(true, 'isValid');
  }, [state.username, state.password]);

  return (
    <Box maw={340} mx="auto">
      <form className="flex flex-col justify-center">
        <div className="flex flex-col gap-4">
          <TextInput
            label="Username"
            placeholder="username"
            name="username"
            value={state.username}
            required
            type="email"
            onChange={({ target: { value } }) => handleStateChange(value, 'username')}
          />
          <TextInput
            label="Password"
            placeholder="password"
            name="password"
            type="password"
            required
            value={state.password}
            onChange={({ target: { value } }) => handleStateChange(value, 'password')}
          />
        </div>
        <Button
          disabled={!state.isValid}
          variant="outline"
          color="white"
          size="md"
          radius="lg"
          onClick={handleSubmit}
          className="relative mx-auto mt-6 mb-4">
          Login
        </Button>
      </form>
    </Box>
  );
};

export { LoginForm };
