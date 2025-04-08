import Prisma from '@/database/database';

export async function POST(req: Request) {
  try {
    const request = await req.json();

    console.log(request);
  } catch (error) {
    console.error(error);
  }
}
