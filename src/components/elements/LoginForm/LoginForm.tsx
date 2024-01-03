'use client';

import { FormEvent } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Box } from '@mantine/core';

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className="flex flex-col gap-4">
          <TextInput label="Username" placeholder="username" name="username" />
          <TextInput label="Password" placeholder="password" name="password" />
        </div>
        <Button variant="filled" color="red" size="md" radius="lg" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export { LoginForm };
