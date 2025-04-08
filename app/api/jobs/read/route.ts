import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const jobs = await Prisma.job.findMany();

    return NextResponse.json(
      { message: 'Jobs returned successfully.', data: jobs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
