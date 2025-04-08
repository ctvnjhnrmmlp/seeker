import { auth } from '@/auth';
import EmployerJobs from '@/components/compounds/EmployerJobs/EmployerJobs';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <EmployerJobs email={session.user.email} />
      </section>
    </main>
  );
}
