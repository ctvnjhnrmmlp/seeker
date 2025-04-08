import { auth } from '@/auth';
import EmployersLayout from '@/components/layouts/EmployersLayout/EmployersLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <EmployersLayout email={session?.user.email}>{children}</EmployersLayout>
  );
}
