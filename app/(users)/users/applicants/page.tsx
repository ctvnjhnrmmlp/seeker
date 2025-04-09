import { auth } from '@/auth';
import ApplicantDashboard from '@/components/compounds/ApplicantDashboard/ApplicantDashboard';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <ApplicantDashboard email={session.user.email} id={session.user.id} />
      </section>
    </main>
  );
}
