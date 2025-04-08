import { auth } from '@/auth';
import EmployerJob from '@/components/compounds/EmployerJob/EmployerJob';
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
        <EmployerJob email={session.user.email} id={(await params).id} />
      </section>
    </main>
  );
}
