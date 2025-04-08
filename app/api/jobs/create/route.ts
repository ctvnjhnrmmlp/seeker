import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const email = req.headers.get('x-user-email') as string;

    const user = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !email) {
      return NextResponse.json(
        { error: 'Bad Request' },
        {
          status: 400,
        }
      );
    }

    const {
      title,
      company,
      location,
      jobType: type,
      salaryMin: minimumSalary,
      salaryMax: maximumSalary,
      description,
      requirements,
      applicationUrl: url,
    } = request;

    await Prisma.job.create({
      data: {
        title,
        company,
        location,
        type,
        minimumSalary,
        maximumSalary,
        description,
        requirements,
        url,
        email,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    console.log(email);
  } catch (error) {
    console.error(error);
  }
}
