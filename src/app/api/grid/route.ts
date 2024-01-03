import { api } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await api.getGrid();

  if (!items) NextResponse.json({ error: 'No items found!' }, { status: 500 });
  return NextResponse.json({ data: items }, { status: 200 });
}
