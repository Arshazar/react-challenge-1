import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MOCK_SERVER}/gridItems`);

  if (!data) NextResponse.json({ error: 'No items found!' }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
}
