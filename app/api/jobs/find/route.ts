import { Prisma } from '@/database/database';
import { Prisma as PrismaClientType } from '@prisma/client';
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

    if (body.recent === 'true') {
      const jobs = await Prisma.job.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json(
        { message: 'Recent jobs fetched successfully.', data: jobs },
        { status: 200 }
      );
    }

    const searchParams = new URLSearchParams(body);

    const searchableFields: (keyof PrismaClientType.JobWhereInput)[] = [
      'title',
      'company',
      'location',
      'type',
      'description',
      'requirements',
      'url',
      'email',
    ];

    const filters: PrismaClientType.JobWhereInput = {};

    for (const key of Object.keys(body)) {
      if (
        searchableFields.includes(key as keyof PrismaClientType.JobWhereInput)
      ) {
        filters[key as keyof PrismaClientType.JobWhereInput] = {
          contains: body[key],
          mode: 'insensitive',
        } as any;
      }
    }

    const jobs = await Prisma.job.findMany({
      where: filters,
    });

    return NextResponse.json(
      { message: 'Jobs found successfully.', data: jobs },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
