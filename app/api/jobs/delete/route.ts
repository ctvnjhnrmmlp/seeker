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
        { error: 'Missing job ID in request body.' },
        { status: 400 }
      );
    }

    const job = await Prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    }

    if (job.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized: You do not own this job.' },
        { status: 403 }
      );
    }

    await Prisma.application.deleteMany({
      where: {
        jobId: id,
      },
    });

    const deletedJob = await Prisma.job.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Job deleted.', data: deletedJob },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message || error },
      { status: 500 }
    );
  }
}
