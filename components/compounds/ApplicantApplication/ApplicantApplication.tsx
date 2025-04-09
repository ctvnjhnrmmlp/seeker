'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ApplicationService from '@/services/seeker/applications';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Briefcase, Building, DollarSign, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ApplicantApplication({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  const router = useRouter();

  const { data: applicationServer } = useQuery({
    queryKey: ['getApplication'],
    queryFn: async () =>
      await ApplicationService.findApplicationById({ email, id }),
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: async ({ email, id }: { email: string; id: string }) =>
      await ApplicationService.deleteApplication({ email, id }),
    onSuccess: () => {
      toast('Application deleted successfully', {
        description: 'Your job listing has been updated.',
      });
      router.push('/users/applicants');
    },
    onError: () => {
      toast('Error', {
        description: 'There was a problem deleting your job.',
      });
    },
  });

  return (
    <div className='container max-w-4xl py-10'>
      <h1 className='text-3xl font-bold mb-6'>{applicationServer?.title}</h1>
      <div className='w-full'>
        <div className='grid w-full '>
          <Card>
            <CardHeader>
              <CardTitle>Job Preview</CardTitle>
              <CardDescription>
                This is how your job listing will appear to candidates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div>
                  <h2 className='text-2xl font-bold'>
                    {applicationServer?.title || 'Job Title'}
                  </h2>
                  <div className='flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground'>
                    {applicationServer?.company && (
                      <div className='flex items-center gap-1'>
                        <Building className='h-4 w-4' />
                        <span>{applicationServer?.company}</span>
                      </div>
                    )}
                    {applicationServer?.location && (
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>{applicationServer?.location}</span>
                      </div>
                    )}
                    {applicationServer?.type && (
                      <div className='flex items-center gap-1'>
                        <Briefcase className='h-4 w-4' />
                        <span className='capitalize'>
                          {applicationServer?.type.replace('-', ' ')}
                        </span>
                      </div>
                    )}
                    {(applicationServer?.minimumSalary ||
                      applicationServer?.maximumSalary) && (
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        <span>
                          {applicationServer?.minimumSalary &&
                          applicationServer?.maximumSalary
                            ? `$${applicationServer?.minimumSalary} - $${applicationServer?.maximumSalary}`
                            : applicationServer?.minimumSalary
                            ? `From $${applicationServer?.minimumSalary}`
                            : `Up to $${applicationServer?.maximumSalary}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-lg font-semibold mb-2'>
                      Job Description
                    </h3>
                    <div className='whitespace-pre-line'>
                      {applicationServer?.description ||
                        'No description provided.'}
                    </div>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold mb-2'>Requirements</h3>
                    <div className='whitespace-pre-line'>
                      {applicationServer?.requirements ||
                        'No requirements specified.'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-end gap-4'>
              <Button
                className='bg-red-700'
                onClick={() => deleteApplicationMutation.mutate({ email, id })}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
