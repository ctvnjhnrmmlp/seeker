import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
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

    const { id: jobId, data: updatedJobData } = body;

    if (!jobId || !updatedJobData) {
      return NextResponse.json(
        { error: 'Missing job ID or job data.' },
        { status: 400 }
      );
    }

    const job = await Prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    }

    const updatedJob = await Prisma.job.update({
      where: { id: jobId },
      data: {
        title: updatedJobData.title,
        company: updatedJobData.company,
        location: updatedJobData.location,
        type: updatedJobData.type,
        minimumSalary: Number(updatedJobData.salaryMin),
        maximumSalary: Number(updatedJobData.salaryMax),
        description: updatedJobData.description,
        requirements: updatedJobData.requirements,
        url: updatedJobData.applicationUrl,
        email: updatedJobData.contactEmail,
      },
    });

    return NextResponse.json({ data: updatedJob }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
