import axios from 'axios';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_MOCK_SERVER}/gridItems/${searchParams.get('id')}`
  );

  if (!data) NextResponse.json({ error: 'Item was not deleted!' }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
}
