'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ApplicationService from '@/services/seeker/applications';
import { convertToDateFormat } from '@/utilities/functions';
import { useMutation, useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { Clock, MoreHorizontal, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ApplicantApplications({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  const router = useRouter();
  const statusFilter = 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const { data: applicationsServer = [] } = useQuery({
    queryKey: ['findApplicationsApplicant'],
    queryFn: async () =>
      await ApplicationService.findApplicationsByQuery({
        email,
        query: {
          userId: id,
        },
      }),
  });

  const normalizeType = (type: string) =>
    type.toLowerCase().replace(/[-\s]/g, '');

  const filteredApplications = applicationsServer.filter((application) => {
    const matchesSearch =
      application.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.job.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.job.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || application.job.type === statusFilter;

    const matchesType =
      typeFilter === 'all' ||
      normalizeType(application.job.type) === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: async ({ email, id }: { email: string; id: string }) =>
      await ApplicationService.deleteApplication({ email, id }),
    onSuccess: () => {
      toast('Job deleted successfully', {
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
    <div className='flex-1 space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Applications</h1>
        <Link href='/users/applicants/jobs'>
          <Button className='gap-2'>
            <Search className='h-4 w-4' />
            Find More Jobs
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>
            Track and manage your job applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search jobs...'
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

          {filteredApplications.length === 0 ? (
            <div className='text-center py-10'>
              <p className='text-muted-foreground'>No jobs found.</p>
            </div>
          ) : (
            <div className='rounded-md border'>
              <div className='grid grid-cols-12 gap-2 p-4 text-sm font-medium border-b'>
                <div className='col-span-4'>Job Title</div>
                <div className='col-span-2'>Location</div>
                <div className='col-span-1'>Type</div>
                <div className='col-span-2'>Posted</div>
                <div className='col-span-1 text-right'>Actions</div>
              </div>
              {filteredApplications.map((application) => (
                <Link
                  key={application.job.id}
                  href={`/users/applicants/applications/${application.job.id}`}
                >
                  <div className='grid grid-cols-12 gap-2 p-4 text-sm items-center hover:bg-muted/50'>
                    <div className='col-span-4 font-medium'>
                      {application.job.title}
                    </div>
                    <div className='col-span-2 text-muted-foreground'>
                      {application.job.location}
                    </div>
                    <div className='col-span-1 text-muted-foreground'>
                      {_.capitalize(application.job.type)}
                    </div>
                    <div className='col-span-2 flex items-center gap-1 text-muted-foreground'>
                      <Clock className='h-3 w-3' />
                      <span>
                        {convertToDateFormat(
                          application.job.createdAt.toString()
                        )}
                      </span>
                    </div>
                    <div className='col-span-1 text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8'
                          >
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className='text-red-600'
                            onClick={() =>
                              deleteApplicationMutation.mutate({ email, id })
                            }
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
