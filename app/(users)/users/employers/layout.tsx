import EmployersLayout from '@/components/layouts/EmployersLayout/EmployersLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EmployersLayout>{children}</EmployersLayout>;
}
