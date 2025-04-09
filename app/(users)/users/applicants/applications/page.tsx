import { auth } from '@/auth';
import ApplicantApplications from '@/components/compounds/ApplicantApplications/ApplicantApplications';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <ApplicantApplications
          email={session.user.email}
          id={session.user.id}
        />
      </section>
    </main>
  );
}
