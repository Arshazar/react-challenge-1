import axios from 'axios';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const { id, name } = await req.json();
  const { data } = await axios.put(`${process.env.NEXT_PUBLIC_MOCK_SERVER}/gridItems/${id}`, {
    name
  });

  if (!data) NextResponse.json({ error: 'Item was not edited' }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
}
