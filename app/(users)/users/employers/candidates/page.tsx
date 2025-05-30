import { auth } from '@/auth';
import EmployerCandidates from '@/components/compounds/EmployerCandidates/EmployerCandidates';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <EmployerCandidates email={session.user.email} />
      </section>
    </main>
  );
}
