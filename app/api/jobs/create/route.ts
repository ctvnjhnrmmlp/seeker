import { Prisma } from '@/database/database';

export async function POST(req: Request) {
  try {
    const request = await req.json();

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
      contactEmail: email,
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
      },
    });
  } catch (error) {
    console.error(error);
  }
}
