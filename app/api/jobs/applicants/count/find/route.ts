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

    const jobs = await Prisma.job.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        title: true,
        application: {
          select: {
            id: true,
          },
        },
      },
    });

    const jobWithApplicantCounts = jobs.map((job) => ({
      jobId: job.id,
      title: job.title,
      applicantCount: job.application.length,
    }));

    return NextResponse.json(
      { message: 'Applicant counts found.', data: jobWithApplicantCounts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
