import { NextResponse } from 'next/server';
import { getTasks } from '@/lib/tasks';

export async function GET() {
  try {
    const data = await getTasks();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}