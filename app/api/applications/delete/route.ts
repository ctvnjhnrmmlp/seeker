import { Prisma } from '@/database/database';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
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

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing application id.' },
        { status: 400 }
      );
    }

    const application = await Prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found.' },
        { status: 404 }
      );
    }

    const deletedApplication = await Prisma.application.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Application deleted.', data: deletedApplication },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
