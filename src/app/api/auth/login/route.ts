import { api } from '@/lib';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const cookieStore = cookies();
  const token = cookieStore.set('token', process.env.AUTH_SECRET as string);

  const { data, error } = await api.login(username, password);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data }, { status: 200, headers: { 'Set-Cookie': `token=${token}` } });
}
