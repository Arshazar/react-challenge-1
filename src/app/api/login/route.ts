import { api } from '@/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const { data, error } = await api.login(username, password);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data }, { status: 200 });
}
