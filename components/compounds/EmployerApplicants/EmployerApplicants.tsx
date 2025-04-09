'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import JobService from '@/services/seeker/jobs';
import { convertToDateFormat } from '@/utilities/functions';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function EmployerApplicants({ email }: { email: string }) {
  const statusFilter = 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const { data: applicantionsServer = [] } = useQuery({
    queryKey: ['getApplicationsEmployerApplicants'],
    queryFn: async () =>
      await JobService.findJobApplicantsByQuery({
        email,
        query: {},
      }),
  });

  const normalizeType = (type: string) =>
    type.toLowerCase().replace(/[-\s]/g, '');

  const filteredApplicantions = applicantionsServer.filter((application) => {
    const matchesSearch =
      application?.job?.user?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application?.job?.user?.email
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.job.company
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.job.minimumSalary
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.maximumSalary
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.requirements
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.job.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.job.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || application.job.type === statusFilter;

    const matchesType =
      typeFilter === 'all' ||
      normalizeType(application.job.type) === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className='flex-1 space-y-6 p-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h1 className='text-2xl font-bold tracking-tight'>View Applications</h1>
        <Link href='/users/employers/create'>
          <Button className='gap-2'>
            <PlusCircle className='h-4 w-4' />
            Post New Job
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle>Candidate Applications</CardTitle>
          <CardDescription>
            Review and manage applications for your job listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search applications...'
                className='pl-8'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='flex gap-4'>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className='w-[140px]'>
                  <SelectValue placeholder='Job Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Types</SelectItem>
                  <SelectItem value='fulltime'>Full-time</SelectItem>
                  <SelectItem value='parttime'>Part-time</SelectItem>
                  <SelectItem value='contract'>Contract</SelectItem>
                  <SelectItem value='freelance'>Freelance</SelectItem>
                  <SelectItem value='internship'>Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {filteredApplicantions.length === 0 ? (
            <div className='text-center py-10'>
              <p className='text-muted-foreground'>No applications found.</p>
            </div>
          ) : (
            <div className='rounded-md border'>
              <div className='grid grid-cols-12 gap-2 p-4 text-sm font-medium border-b'>
                <div className='col-span-2'>Candidate</div>
                <div className='col-span-2'>Email</div>
                <div className='col-span-2'>Position</div>
                <div className='col-span-2'>Company</div>
                <div className='col-span-2'>Location</div>
                <div className='col-span-1'>Type</div>
                <div className='col-span-1'>Applied</div>
              </div>
              {filteredApplicantions?.map((application) => (
                <div
                  key={application.job.id}
                  className='grid grid-cols-12 gap-2 p-4 text-sm items-center hover:bg-muted/50'
                >
                  <div className='col-span-2 text-muted-foreground'>
                    {application.job.user.name}
                  </div>
                  <div className='col-span-2 text-muted-foreground'>
                    {application.job.email}
                  </div>
                  <div className='col-span-2 text-muted-foreground'>
                    {application.job.title}
                  </div>
                  <div className='col-span-2 text-muted-foreground'>
                    {application.job.company}
                  </div>
                  <div className='col-span-2 text-muted-foreground'>
                    {application.job.location}
                  </div>
                  <div className='col-span-1 text-muted-foreground'>
                    {_.capitalize(application.job.type)}
                  </div>
                  <div className='col-span-1 text-muted-foreground'>
                    {convertToDateFormat(application.job.createdAt.toString())}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
