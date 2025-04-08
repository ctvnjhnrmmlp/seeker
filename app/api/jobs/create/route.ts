import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

type JobRequestBody = {
  title: string;
  company: string;
  location: string;
  type: string;
  salaryMin: string | number;
  salaryMax: string | number;
  description: string;
  requirements: string;
  applicationUrl: string;
};

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

    const body: JobRequestBody = await req.json();

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
    } = body;

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
      { message: 'Job posted successfully.', job: newJob },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
