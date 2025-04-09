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

    const { userId, jobId } = await req.json();

    if (!userId || !jobId) {
      return NextResponse.json(
        { error: 'Missing user id and/or job id.' },
        { status: 400 }
      );
    }

    const applicant = await Prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!applicant) {
      return NextResponse.json(
        { error: 'Applicant not found.' },
        { status: 404 }
      );
    }

    const job = await Prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    }

    const newApplication = await Prisma.application.create({
      data: {
        userId,
        jobId,
      },
      include: {
        job: true,
        user: true,
      },
    });

    return NextResponse.json(
      { message: 'Application created.', data: newApplication },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
