import { auth } from '@/auth';
import ApplicantJob from '@/components/compounds/ApplicantJob/ApplicantJob';
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
    <>
      <ApplicantJob id={(await params).id} />
    </>
  );
}
