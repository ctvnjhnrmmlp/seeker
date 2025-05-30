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

    const id = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID are required.' },
        { status: 400 }
      );
    }

    const job = await Prisma.job.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: 'Job found successfully.', data: job },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
