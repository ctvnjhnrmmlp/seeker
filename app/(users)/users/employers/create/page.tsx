import { auth } from '@/auth';
import CreateJob from '@/components/compounds/CreateJob/CreateJob';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <CreateJob />
      </section>
    </main>
  );
}
