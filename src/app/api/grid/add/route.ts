import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name } = await req.json();

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_MOCK_SERVER}/gridItems`, { name });

  if (!data) NextResponse.json({ error: 'No items found!' }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
}
