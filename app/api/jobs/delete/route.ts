import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
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

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing job ID or job data.' },
        { status: 400 }
      );
    }

    const job = await Prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    }

    const deletedJob = await Prisma.job.delete({
      where: { id },
      include: {
        application: true,
      },
    });

    return NextResponse.json({ data: deletedJob }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
