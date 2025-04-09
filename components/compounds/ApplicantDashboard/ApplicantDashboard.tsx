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
import ApplicationService from '@/services/seeker/applications';
import { convertToDateFormat } from '@/utilities/functions';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { Bookmark, Briefcase, Clock, Search } from 'lucide-react';
import Link from 'next/link';

export default function ApplicantDashboard({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  const { data: applicationsServer } = useQuery({
    queryKey: ['getApplications'],
    queryFn: async () =>
      await ApplicationService.findApplicationsByQuery({
        email,
        query: {
          userId: id,
        },
      }),
  });

  return (
    <div className='flex-1 space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        </div>
        <Link href='/users/applicants/jobs'>
          <Button className='gap-2'>
            <Search className='h-4 w-4' />
            Find Jobs
          </Button>
        </Link>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Applied Jobs</CardTitle>
            <Briefcase className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {applicationsServer?.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Saved Jobs</CardTitle>
            <Bookmark className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue='applied' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='applied'>Applied Jobs</TabsTrigger>
          <TabsTrigger value='saves'>Saved Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value='applied' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {applicationsServer?.map((application) => (
              <Link
                key={application.id}
                href={`/users/applicants/applications/${application.id}`}
              >
                <Card className='h-full'>
                  <CardHeader className='pb-2'>
                    <div className='flex justify-between items-start'>
                      <CardTitle className='text-base'>
                        {application?.job.title}
                      </CardTitle>
                      <div className='bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full'>
                        {_.capitalize(application?.job.type)}
                      </div>
                    </div>
                    <CardDescription className='flex items-center gap-1'>
                      {application.job.company} • {application.job.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='pb-2'>
                    <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                      <Clock className='h-3 w-3' />
                      <span>
                        Posted{' '}
                        {convertToDateFormat(
                          application.job.createdAt.toString()
                        )}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className='flex items-center justify-between pt-0'></CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className='flex'>
            <Link href='/users/applicants/jobs'>
              <Button variant='outline'>View More Jobs</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value='saves' className='space-y-4'></TabsContent>
      </Tabs>
    </div>
  );
}
