import { auth } from '@/auth';
import SelectRole from '@/components/compounds/SelectRole/SelectRole';
import { redirect } from 'next/navigation';

export default async function UserTypeSelection() {
  const session = auth();

  if (!session) {
    return redirect('/signin');
  }

  return (
    <main>
      <section className='flex justify-center w-full'>
        <SelectRole />
      </section>
    </main>
  );
}
