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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JobService from '@/services/seeker/jobs';
import { convertToDateFormat } from '@/utilities/functions';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { Briefcase, Clock, FileText, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function EmployerDashboard({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  const { data: jobsServer } = useQuery({
    queryKey: ['getJobsEmployerDashboard'],
    queryFn: async () =>
      await JobService.findJobsByQuery({
        email,
        query: {
          userId: id,
        },
      }),
  });

  const { data: jobsRecentServer } = useQuery({
    queryKey: ['getJobsRecentEmployerDashboard'],
    queryFn: async () =>
      await JobService.findJobsByQuery({
        email: email,
        query: {
          recent: 'true',
        },
      }),
  });

  const { data: applicantCountServer } = useQuery({
    queryKey: ['getApplicationsEmployerDashboard'],
    queryFn: async () =>
      await JobService.findJobApplicants({
        email,
      }),
  });

  return (
    <div className='flex-1 space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        <Link href='/users/employers/create'>
          <Button className='gap-2'>
            <PlusCircle className='h-4 w-4' />
            Post New Job
          </Button>
        </Link>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Active Jobs</CardTitle>
            <Briefcase className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{jobsServer?.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Applications
            </CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {applicantCountServer?.reduce(
                (sum, job) => sum + job.applicants,
                0
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue='jobs' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='jobs'>Recent Jobs</TabsTrigger>
          <TabsTrigger value='applications'>Recent Applications</TabsTrigger>
        </TabsList>
        <TabsContent value='jobs' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {jobsRecentServer?.map((job) => (
              <Link key={job.id} href={`/users/employers/jobs/${job.id}`}>
                <Card className='h-full'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-base'>{job.title}</CardTitle>
                    <CardDescription className='flex items-center gap-1'>
                      {job.location} • {job.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='pb-2'>
                    <div className='grid grid-cols-2 gap-2 text-sm'>
                      <div className='flex flex-col'>
                        <span className='text-muted-foreground'>Salary</span>
                        <span className='font-medium'>
                          ${job.minimumSalary} - ${job.maximumSalary}
                        </span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-muted-foreground'>Type</span>
                        <span className='font-medium'>
                          {_.capitalize(job.type)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex items-center justify-between pt-0'>
                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                      <Clock className='h-3 w-3' />
                      <span>
                        {convertToDateFormat(job.createdAt.toString())}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className='flex'>
            <Link href='/users/employers/jobs'>
              <Button variant='outline'>View All Jobs</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value='applications' className='space-y-4'>
          <div className='rounded-md border'>
            <div className='grid grid-cols-12 gap-2 p-4 text-sm font-medium border-b'>
              <div className='col-span-4'>Candidate</div>
              <div className='col-span-3'>Position</div>
              <div className='col-span-2'>Applied</div>
              <div className='col-span-1'>Status</div>
              <div className='col-span-2'>Match</div>
            </div>
            {/* {recentApplications.map((application) => (
              <div
                key={application.id}
                className='grid grid-cols-12 gap-2 p-4 text-sm items-center hover:bg-muted/50'
              >
                <div className='col-span-4 font-medium'>{application.name}</div>
                <div className='col-span-3 text-muted-foreground'>
                  {application.position}
                </div>
                <div className='col-span-2 text-muted-foreground'>
                  {application.applied}
                </div>
                <div className='col-span-1'>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full text-center ${
                      application.status === 'New'
                        ? 'bg-blue-100 text-blue-700'
                        : application.status === 'Reviewed'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {application.status}
                  </div>
                </div>
                <div className='col-span-2 flex items-center gap-2'>
                  <Progress value={application.match} className='h-2' />
                  <span className='text-xs font-medium'>
                    {application.match}%
                  </span>
                </div>
              </div>
            ))} */}
          </div>
          <div className='flex'>
            <Link href='/dashboard/applications'>
              <Button variant='outline'>View All Applications</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
