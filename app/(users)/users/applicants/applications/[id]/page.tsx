import { auth } from '@/auth';
import ApplicantApplication from '@/components/compounds/ApplicantApplication/ApplicantApplication';
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
        <ApplicantApplication
          email={session.user.email}
          id={(await params).id}
        />
      </section>
    </main>
  );
}
