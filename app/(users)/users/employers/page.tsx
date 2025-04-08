import { auth } from '@/auth';
import EmployerDashboard from '@/components/compounds/EmployerDashboard/EmployerDashboard';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <EmployerDashboard />
      </section>
    </main>
  );
}
