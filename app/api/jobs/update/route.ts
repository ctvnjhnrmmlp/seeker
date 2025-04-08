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

    const { id, data } = body;

    if (!id || !data) {
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

    const updatedJob = await Prisma.job.update({
      where: { id },
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        type: data.type,
        minimumSalary: Number(data.salaryMin),
        maximumSalary: Number(data.salaryMax),
        description: data.description,
        requirements: data.requirements,
        url: data.applicationUrl,
        email: data.contactEmail,
      },
    });

    return NextResponse.json({ data: updatedJob }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
