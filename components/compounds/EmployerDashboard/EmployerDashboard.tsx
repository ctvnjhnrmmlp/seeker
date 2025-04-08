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
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Clock, FileText, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function EmployerDashboard() {
  const stats = [
    {
      title: 'Active Jobs',
      value: '12',
      icon: Briefcase,
      change: '+2 this month',
      trend: 'up',
    },
    {
      title: 'Total Applications',
      value: '342',
      icon: FileText,
      change: '+86 this month',
      trend: 'up',
    },
  ];

  const recentJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      location: 'Remote',
      type: 'Full-time',
      applications: 24,
      views: 342,
      posted: '2 days ago',
      status: 'active',
    },
    {
      id: '2',
      title: 'UX Designer',
      location: 'New York, NY',
      type: 'Full-time',
      applications: 18,
      views: 256,
      posted: '5 days ago',
      status: 'active',
    },
    {
      id: '3',
      title: 'Backend Developer',
      location: 'San Francisco, CA',
      type: 'Contract',
      applications: 12,
      views: 198,
      posted: '1 week ago',
      status: 'active',
    },
    {
      id: '4',
      title: 'Product Manager',
      location: 'Remote',
      type: 'Full-time',
      applications: 8,
      views: 145,
      posted: '2 weeks ago',
      status: 'active',
    },
  ];

  const recentApplications = [
    {
      id: '1',
      name: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      applied: 'Today',
      status: 'New',
      match: 92,
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'UX Designer',
      applied: 'Yesterday',
      status: 'Reviewed',
      match: 85,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      position: 'Backend Developer',
      applied: '2 days ago',
      status: 'Interviewing',
      match: 78,
    },
    {
      id: '4',
      name: 'David Kim',
      position: 'Product Manager',
      applied: '3 days ago',
      status: 'New',
      match: 65,
    },
  ];

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
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <stat.icon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue='jobs' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='jobs'>Recent Jobs</TabsTrigger>
          <TabsTrigger value='applications'>Recent Applications</TabsTrigger>
        </TabsList>
        <TabsContent value='jobs' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {recentJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-base'>{job.title}</CardTitle>
                  <CardDescription className='flex items-center gap-1'>
                    {job.location} • {job.type}
                  </CardDescription>
                </CardHeader>
                <CardContent className='pb-2'>
                  <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div className='flex flex-col'>
                      <span className='text-muted-foreground'>
                        Applications
                      </span>
                      <span className='font-medium'>{job.applications}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-muted-foreground'>Views</span>
                      <span className='font-medium'>{job.views}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex items-center justify-between pt-0'>
                  <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                    <Clock className='h-3 w-3' />
                    <span>Posted {job.posted}</span>
                  </div>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      job.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {job.status === 'active' ? 'Active' : 'Draft'}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className='flex justify-center'>
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
            {recentApplications.map((application) => (
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
            ))}
          </div>
          <div className='flex justify-center'>
            <Link href='/dashboard/applications'>
              <Button variant='outline'>View All Applications</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
