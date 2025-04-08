import { auth } from '@/auth';
import ApplicantJobs from '@/components/compounds/ApplicantJobs/ApplicantJobs';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <ApplicantJobs />
      </section>
    </main>
  );
}
