import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const email = req.headers.get('x-user-email');

    if (!email) {
      return NextResponse.json(
        { message: 'Missing user email.' },
        { status: 400 }
      );
    }

    const user = await Prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    const {
      title,
      company,
      location,
      type,
      salaryMin,
      salaryMax,
      description,
      requirements,
      applicationUrl,
    } = await req.json();

    if (
      !title ||
      !company ||
      !location ||
      !type ||
      !salaryMin ||
      !salaryMax ||
      !description ||
      !requirements ||
      !applicationUrl
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const newJob = await Prisma.job.create({
      data: {
        title,
        company,
        location,
        type,
        minimumSalary: Number(salaryMin),
        maximumSalary: Number(salaryMax),
        description,
        requirements,
        url: applicationUrl,
        email,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json(
      { message: 'Job posted.', data: newJob },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
