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
  DropdownMenuSeparator,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  PlusCircle,
  Search,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function EmployerJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data for jobs
  const jobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      location: 'Remote',
      type: 'Full-time',
      applications: 24,
      views: 342,
      posted: '2 days ago',
      status: 'active',
      description:
        "We're looking for an experienced frontend developer to join our team...",
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
      description:
        'Join our design team to create beautiful and intuitive user experiences...',
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
      description:
        'Help us build scalable backend systems using Node.js and PostgreSQL...',
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
      description:
        'Lead product development and work closely with engineering and design teams...',
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      location: 'Austin, TX',
      type: 'Full-time',
      applications: 6,
      views: 120,
      posted: '3 weeks ago',
      status: 'active',
      description: 'Manage our cloud infrastructure and CI/CD pipelines...',
    },
    {
      id: '6',
      title: 'Marketing Specialist',
      location: 'Chicago, IL',
      type: 'Part-time',
      applications: 15,
      views: 210,
      posted: '3 weeks ago',
      status: 'active',
      description:
        'Help us grow our brand through digital marketing campaigns...',
    },
    {
      id: '7',
      title: 'Customer Support Representative',
      location: 'Remote',
      type: 'Full-time',
      applications: 32,
      views: 280,
      posted: '1 month ago',
      status: 'active',
      description:
        'Provide excellent customer service and support to our users...',
    },
    {
      id: '8',
      title: 'Data Analyst',
      location: 'Boston, MA',
      type: 'Full-time',
      applications: 10,
      views: 175,
      posted: '1 month ago',
      status: 'draft',
      description:
        'Analyze user data and provide insights to improve our product...',
    },
  ];

  // Filter jobs based on search query and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesType =
      typeFilter === 'all' ||
      job.type.toLowerCase().replace('-', '') === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const activeJobs = filteredJobs.filter((job) => job.status === 'active');
  const draftJobs = filteredJobs.filter((job) => job.status === 'draft');

  return (
    <div className='flex-1 space-y-6 p-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h1 className='text-2xl font-bold tracking-tight'>Manage Jobs</h1>
        <Link href='/users/employers/create'>
          <Button className='gap-2'>
            <PlusCircle className='h-4 w-4' />
            Post New Job
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle>Job Listings</CardTitle>
          <CardDescription>
            Manage your job postings, edit details, and track applications.
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-[140px]'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='draft'>Draft</SelectItem>
                </SelectContent>
              </Select>
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

          <Tabs defaultValue='active' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='active'>
                Active Jobs ({activeJobs.length})
              </TabsTrigger>
              <TabsTrigger value='draft'>
                Drafts ({draftJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value='active' className='space-y-4'>
              {activeJobs.length === 0 ? (
                <div className='text-center py-10'>
                  <p className='text-muted-foreground'>No active jobs found.</p>
                </div>
              ) : (
                <div className='rounded-md border'>
                  <div className='grid grid-cols-12 gap-2 p-4 text-sm font-medium border-b'>
                    <div className='col-span-4'>Job Title</div>
                    <div className='col-span-2'>Location</div>
                    <div className='col-span-1'>Type</div>
                    <div className='col-span-1 text-center'>Apps</div>
                    <div className='col-span-1 text-center'>Views</div>
                    <div className='col-span-2'>Posted</div>
                    <div className='col-span-1 text-right'>Actions</div>
                  </div>
                  {activeJobs.map((job) => (
                    <div
                      key={job.id}
                      className='grid grid-cols-12 gap-2 p-4 text-sm items-center hover:bg-muted/50'
                    >
                      <div className='col-span-4 font-medium'>{job.title}</div>
                      <div className='col-span-2 text-muted-foreground'>
                        {job.location}
                      </div>
                      <div className='col-span-1 text-muted-foreground'>
                        {job.type}
                      </div>
                      <div className='col-span-1 text-center flex justify-center items-center gap-1'>
                        <FileText className='h-3 w-3 text-muted-foreground' />
                        <span>{job.applications}</span>
                      </div>
                      <div className='col-span-1 text-center flex justify-center items-center gap-1'>
                        <Eye className='h-3 w-3 text-muted-foreground' />
                        <span>{job.views}</span>
                      </div>
                      <div className='col-span-2 flex items-center gap-1 text-muted-foreground'>
                        <Clock className='h-3 w-3' />
                        <span>{job.posted}</span>
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
                              <span className='sr-only'>Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className='mr-2 h-4 w-4' />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className='mr-2 h-4 w-4' />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className='mr-2 h-4 w-4' />
                              <span>Applications</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-red-600'>
                              <Trash2 className='mr-2 h-4 w-4' />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value='draft' className='space-y-4'>
              {draftJobs.length === 0 ? (
                <div className='text-center py-10'>
                  <p className='text-muted-foreground'>No draft jobs found.</p>
                </div>
              ) : (
                <div className='rounded-md border'>
                  <div className='grid grid-cols-12 gap-2 p-4 text-sm font-medium border-b'>
                    <div className='col-span-4'>Job Title</div>
                    <div className='col-span-2'>Location</div>
                    <div className='col-span-1'>Type</div>
                    <div className='col-span-1 text-center'>Apps</div>
                    <div className='col-span-1 text-center'>Views</div>
                    <div className='col-span-2'>Created</div>
                    <div className='col-span-1 text-right'>Actions</div>
                  </div>
                  {draftJobs.map((job) => (
                    <div
                      key={job.id}
                      className='grid grid-cols-12 gap-2 p-4 text-sm items-center hover:bg-muted/50'
                    >
                      <div className='col-span-4 font-medium'>{job.title}</div>
                      <div className='col-span-2 text-muted-foreground'>
                        {job.location}
                      </div>
                      <div className='col-span-1 text-muted-foreground'>
                        {job.type}
                      </div>
                      <div className='col-span-1 text-center flex justify-center items-center gap-1'>
                        <FileText className='h-3 w-3 text-muted-foreground' />
                        <span>{job.applications}</span>
                      </div>
                      <div className='col-span-1 text-center flex justify-center items-center gap-1'>
                        <Eye className='h-3 w-3 text-muted-foreground' />
                        <span>{job.views}</span>
                      </div>
                      <div className='col-span-2 flex items-center gap-1 text-muted-foreground'>
                        <Clock className='h-3 w-3' />
                        <span>{job.posted}</span>
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
                              <span className='sr-only'>Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className='mr-2 h-4 w-4' />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className='mr-2 h-4 w-4' />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className='mr-2 h-4 w-4' />
                              <span>Publish</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-red-600'>
                              <Trash2 className='mr-2 h-4 w-4' />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
