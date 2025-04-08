'use client';

import JobService from '@/services/seeker/jobs';
import { useQuery } from '@tanstack/react-query';

export default function EmployerJob({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  const { data: jobServer, status: jobServerStatus } = useQuery({
    queryKey: ['getJob'],
    queryFn: async () => await JobService.findJobById({ email, id }),
  });

  if (jobServerStatus === 'success') {
    console.log(jobServer);
  }

  return <></>;
}
