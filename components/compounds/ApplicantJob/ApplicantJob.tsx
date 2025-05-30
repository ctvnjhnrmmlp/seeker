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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { UploadButton } from '@/lib/uploadthing';
import ApplicationService from '@/services/seeker/applications';
import JobService from '@/services/seeker/jobs';
import { convertToDateFormat } from '@/utilities/functions';
import { useMutation, useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export default function ApplicantJob({
  email,
  userId,
  jobId,
}: {
  email: string;
  userId: string;
  jobId: string;
}) {
  const router = useRouter();
  const [isApplying, setIsApplying] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const resumeUrlRef = useRef<{
    name: string;
    ufsUrl: string;
  }>({
    name: '',
    ufsUrl: '',
  });

  const createApplicationMutation = useMutation({
    mutationFn: async ({
      email,
      userId,
      jobId,
      resumeUrl,
    }: {
      email: string;
      userId: string;
      jobId: string;
      resumeUrl: string;
    }) => {
      setIsApplying(true);
      return await ApplicationService.createApplication({
        email,
        userId,
        jobId,
        resumeUrl,
      });
    },
    onSuccess: () => {
      toast('Application created.', {
        description: 'Your application has been created.',
      });
      router.push('/users/applicants');
    },
    onError: () => {
      toast('Application failed.', {
        description: 'There was a problem creaeting your application.',
      });
    },
    onSettled: () => {
      setIsApplying(false);
    },
  });

  const { data: jobServer } = useQuery({
    queryKey: ['getJobApplicant'],
    queryFn: async () => await JobService.findJobById({ email, id: jobId }),
  });

  return (
    <div className='min-h-screen bg-background'>
      <div className='container py-10'>
        <Button
          variant='ghost'
          className='mb-6'
          onClick={() => router.push('/users/applicants/jobs')}
        >
          <ArrowLeft className='mr-2 h-4 w-4' /> Back to Jobs
        </Button>
        <div className='grid gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2 space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex gap-4'>
                    <div className='h-12 w-12 rounded-md bg-muted flex items-center justify-center'>
                      <Building className='h-6 w-6 text-muted-foreground' />
                    </div>
                    <div>
                      <CardTitle className='text-2xl'>
                        {jobServer?.title}
                      </CardTitle>
                      <CardDescription className='flex items-center mt-1'>
                        <span className='font-medium'>
                          {jobServer?.company}
                        </span>
                        <span className='mx-2'>•</span>
                        <span>{jobServer?.location}</span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-8'>
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm'>
                    <div className='flex flex-col gap-1'>
                      <span className='text-muted-foreground'>Job Type</span>
                      <div className='flex items-center gap-1 font-medium'>
                        <Briefcase className='h-4 w-4' />
                        <span>{_.capitalize(jobServer?.type)}</span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <span className='text-muted-foreground'>Salary</span>
                      <div className='flex items-center gap-1 font-medium'>
                        <DollarSign className='h-4 w-4' />
                        <span>
                          ${jobServer?.minimumSalary} - $
                          {jobServer?.maximumSalary}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <span className='text-muted-foreground'>Posted</span>
                      <div className='flex items-center gap-1 font-medium'>
                        <Clock className='h-4 w-4' />
                        <span>
                          {convertToDateFormat(
                            jobServer?.createdAt.toString()!
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg mb-3'>Description</h3>
                    <p className='text-muted-foreground whitespace-pre-line'>
                      {jobServer?.description}
                    </p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg mb-3'>Requirements</h3>
                    <p className='text-muted-foreground whitespace-pre-line'>
                      {jobServer?.requirements}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='space-y-6'>
            <Card>
              <CardContent className='space-y-4'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='w-full' size='lg'>
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[500px]'>
                    <DialogHeader>
                      <DialogTitle>
                        Apply for {jobServer?.title} position
                      </DialogTitle>
                      <DialogDescription>
                        Complete the form below to submit your application to{' '}
                        {jobServer?.company}
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid gap-2'>
                        <Label htmlFor='resume'>Resume</Label>
                        <div className='flex flex-col gap-2'>
                          <UploadButton
                            config={{ cn: twMerge }}
                            endpoint='fileUploader'
                            appearance={{
                              button: 'w-full bg-black rounded-md',
                              allowedContent:
                                'text-muted-foreground text-[0.65rem]',
                              container: 'w-full',
                            }}
                            content={{
                              allowedContent:
                                '.pdf, .doc, .docx (max 4MB) Tip: Click the button during upload to cancel.',
                            }}
                            onUploadBegin={() => {
                              setResumeUploaded(false);
                            }}
                            onClientUploadComplete={(res) => {
                              resumeUrlRef.current = res[0];
                              setResumeUploaded(() => true);
                            }}
                            onUploadError={(error: Error) => {
                              alert(`Error. ${error.message}`);
                            }}
                          />
                          {resumeUploaded && (
                            <p className='text-xs text-muted-foreground'>
                              {resumeUrlRef.current.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        disabled={isApplying}
                        onClick={() =>
                          createApplicationMutation.mutate({
                            email,
                            userId,
                            jobId,
                            resumeUrl: resumeUrlRef.current
                              ? resumeUrlRef?.current?.ufsUrl
                              : '',
                          })
                        }
                      >
                        {isApplying ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-2 border-t pt-6'>
                <p className='text-sm'>{jobServer?.company}</p>
                <a
                  href={jobServer?.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-primary hover:underline flex items-center'
                >
                  {jobServer?.url.replace('https://', '')}
                  <ExternalLink className='ml-1 h-3 w-3' />
                </a>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex flex-col gap-1'>
                  <Link
                    href={`mailto:${jobServer?.email}`}
                    className='text-sm text-primary hover:underline'
                  >
                    {jobServer?.email}
                  </Link>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Calendar className='h-4 w-4' />
                    <span>Open until filled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='space-y-4'>
                <Button variant='outline' className='w-full' asChild>
                  <Link href='/users/applicants/jobs'>View All Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
