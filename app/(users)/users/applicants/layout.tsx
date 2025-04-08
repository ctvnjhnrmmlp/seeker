import ApplicantLayout from '@/components/layouts/ApplicantLayout/ApplicantLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ApplicantLayout>{children}</ApplicantLayout>
    </>
  );
}
