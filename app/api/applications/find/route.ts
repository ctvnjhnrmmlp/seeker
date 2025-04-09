import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const email = req.headers.get('x-user-email');

    if (!email) {
      return NextResponse.json(
        { error: 'Missing user email.' },
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

    if (body.recent === 'true') {
      const applications = await Prisma.application.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json(
        { message: 'Recent applications found.', data: applications },
        { status: 200 }
      );
    }

    const searchParams = new URLSearchParams(body);

    const filters: Record<string, any> = {};

    searchParams.forEach((value, key) => {
      filters[key] = {
        contains: value,
        mode: 'insensitive',
      };
    });

    const applications = await Prisma.application.findMany({
      where: {
        ...filters,
      },
      include: {
        job: true,
        user: true,
      },
    });

    return NextResponse.json(
      { message: 'Applications found.', data: applications },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
