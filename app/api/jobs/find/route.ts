import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const email = req.headers.get('x-user-email');

    if (!email) {
      return NextResponse.json(
        { error: 'Missing user email in headers.' },
        { status: 400 }
      );
    }

    const user = await Prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const body = await req.json();

    const searchParams = new URLSearchParams(body);

    const filters: Record<string, any> = {};

    searchParams.forEach((value, key) => {
      filters[key] = {
        contains: value,
        mode: 'insensitive',
      };
    });

    const jobs = await Prisma.job.findMany({
      where: {
        ...filters,
      },
    });

    return NextResponse.json(
      { message: 'Jobs found successfully.', data: jobs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
