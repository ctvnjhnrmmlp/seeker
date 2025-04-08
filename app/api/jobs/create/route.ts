import Prisma from '@/database/database';

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const email = req.headers.get('x-user-email') as string;

    console.log(email);
  } catch (error) {
    console.error(error);
  }
}
