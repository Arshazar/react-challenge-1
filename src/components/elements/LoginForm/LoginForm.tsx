'use client';

import { TextInput, Button, Box } from '@mantine/core';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  const { push } = useRouter();

  const handleStateChange = (v: string, key: string) => {
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
        alert(`welcome ${res.data.data.name}`);
        push('/');
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <Box maw={340} mx="auto">
      <div className="flex flex-col justify-center">
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
          variant="outline"
          color="white"
          size="md"
          radius="lg"
          onClick={handleSubmit}
          className="relative mx-auto mt-6 mb-4">
          Login
        </Button>
      </div>
    </Box>
  );
};

export { LoginForm };
