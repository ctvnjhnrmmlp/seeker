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

    const applicationId = await req.json();

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Missing application id.' },
        { status: 400 }
      );
    }

    const application = await Prisma.job.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Application found.', data: application },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
