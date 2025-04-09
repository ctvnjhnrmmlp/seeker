import { auth } from '@/auth';
import EmployerApplicants from '@/components/compounds/EmployerApplicants/EmployerApplicants';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <EmployerApplicants email={session.user.email} />
      </section>
    </main>
  );
}
