import { auth } from '@/auth';
import ApplicantJob from '@/components/compounds/ApplicantJob/ApplicantJob';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <ApplicantJob
          email={session.user.email}
          userId={session.user.id}
          jobId={(await params).id}
        />
      </section>
    </main>
  );
}
