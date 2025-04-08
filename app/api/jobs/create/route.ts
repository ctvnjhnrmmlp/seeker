import Prisma from '@/database/database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const request = await req.json();

    console.log(request);

    // await Prisma.job.create({

    // })
  } catch (error) {
    console.error(error);
  }
}
