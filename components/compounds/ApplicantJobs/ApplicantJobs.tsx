'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import JobService from '@/services/seeker/jobs';
import { convertToDateFormat } from '@/utilities/functions';
import { useQuery } from '@tanstack/react-query';
import {
  BookmarkIcon,
  Briefcase,
  Building,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ApplicantJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const jobsPerPage = 10;

  const { data: jobsServer = [] } = useQuery({
    queryKey: ['getJobsApplicants'],
    queryFn: async () => await JobService.readJobs(),
  });

  const locations = [
    'all',
    ...Array.from(new Set(jobsServer.map((job) => job.location))),
  ];

  const jobTypes = [
    'all',
    ...Array.from(new Set(jobsServer.map((job) => job.type))),
  ];

  // const categories = [
  //   'all',
  //   ...Array.from(
  //     new Set(jobsServer.map((job) => job.category ?? 'uncategorized'))
  //   ),
  // ];

  // const experienceLevels = [
  //   'all',
  //   ...Array.from(
  //     new Set(jobsServer.map((job) => job.experience ?? 'unspecified'))
  //   ),
  // ];

  const filteredJobs = jobsServer.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      locationFilter === 'all' || job.location === locationFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    // const matchesCategory =
    //   categoryFilter === 'all' ||
    //   (job.category ?? 'uncategorized') === categoryFilter;
    // const matchesExperience =
    //   experienceFilter === 'all' ||
    //   (job.experience ?? 'unspecified') === experienceFilter;

    return (
      matchesSearch && matchesLocation && matchesType
      // &&
      // matchesCategory &&
      // matchesExperience
    );
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'salary') {
      return (b.minimumSalary ?? 0) - (a.minimumSalary ?? 0);
    }
    return a.title.localeCompare(b.title);
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setTypeFilter('all');
    setCategoryFilter('all');
    setExperienceFilter('all');
    setSortBy('relevance');
    setCurrentPage(1);
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-gradient-to-b from-primary/10 to-background py-12 md:py-20'>
        <div className='container'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-3xl md:text-4xl font-bold mb-4'>
              Find Your Dream Job
            </h1>
            <p className='text-muted-foreground mb-8 md:text-lg'>
              Discover opportunities that match your skills and career goals.
              Browse through our curated list of job openings from top
              companies.
            </p>
            <div className='relative max-w-2xl mx-auto'>
              <Search className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search jobs by title, company, or keywords...'
                className='pl-10 h-12 rounded-full'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <Button
                className='absolute right-1 top-1 rounded-full'
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className='h-4 w-4 mr-2' />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='container py-8'>
        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
            <SheetHeader>
              <SheetTitle>Filter Jobs</SheetTitle>
              <SheetDescription>
                Narrow down your job search with these filters.
              </SheetDescription>
            </SheetHeader>
            <div className='py-4 space-y-6'>
              <div className='space-y-2'>
                <h3 className='text-sm font-medium'>Location</h3>
                <Select
                  value={locationFilter}
                  onValueChange={(value) => {
                    setLocationFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select location' />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location === 'all' ? 'All Locations' : location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <h3 className='text-sm font-medium'>Job Type</h3>
                <Select
                  value={typeFilter}
                  onValueChange={(value) => {
                    setTypeFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select job type' />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div className='space-y-2'>
                <h3 className='text-sm font-medium'>Category</h3>
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => {
                    setcategoryFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
              {/* <div className='space-y-2'>
                <h3 className='text-sm font-medium'>Experience Level</h3>
                <Select
                  value={experienceFilter}
                  onValueChange={(value) => {
                    setExperienceFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select experience level' />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
              <div className='space-y-2'>
                <h3 className='text-sm font-medium'>Sort By</h3>
                <RadioGroup
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='relevance' id='relevance' />
                    <Label htmlFor='relevance'>Relevance</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='newest' id='newest' />
                    <Label htmlFor='newest'>Most Recent</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='salary' id='salary' />
                    <Label htmlFor='salary'>Highest Salary</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className='pt-4 flex justify-between'>
                <Button variant='outline' onClick={clearAllFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='hidden md:block w-64 space-y-6'>
            <Card>
              <CardHeader className='pb-3'>
                <h2 className='font-semibold'>Filters</h2>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Location</h3>
                  <Select
                    value={locationFilter}
                    onValueChange={(value) => {
                      setLocationFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select location' />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location === 'all' ? 'All Locations' : location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Job Type</h3>
                  <div className='space-y-2'>
                    {jobTypes
                      .filter((type) => type !== 'all')
                      .map((type) => (
                        <div key={type} className='flex items-center space-x-2'>
                          <Checkbox
                            id={`type-${type}`}
                            checked={
                              typeFilter === type || typeFilter === 'all'
                            }
                            onCheckedChange={() => {
                              setTypeFilter(typeFilter === type ? 'all' : type);
                              setCurrentPage(1);
                            }}
                          />
                          <Label htmlFor={`type-${type}`}>{type}</Label>
                        </div>
                      ))}
                  </div>
                </div>
                {/* <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Category</h3>
                  <Select
                    value={categoryFilter}
                    onValueChange={(value) => {
                      setcategoryFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
                {/* <Separator /> */}
                {/* <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Experience Level</h3>
                  <div className='space-y-2'>
                    {experienceLevels
                      .filter((level) => level !== 'all')
                      .map((level) => (
                        <div
                          key={level}
                          className='flex items-center space-x-2'
                        >
                          <Checkbox
                            id={`level-${level}`}
                            checked={
                              experienceFilter === level ||
                              experienceFilter === 'all'
                            }
                            onCheckedChange={() => {
                              setExperienceFilter(
                                experienceFilter === level ? 'all' : level
                              );
                              setCurrentPage(1);
                            }}
                          />
                          <Label htmlFor={`level-${level}`}>{level}</Label>
                        </div>
                      ))}
                  </div>
                </div> */}
                <Separator />
                <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Sort By</h3>
                  <RadioGroup
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value)}
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='relevance'
                        id='relevance-desktop'
                      />
                      <Label htmlFor='relevance-desktop'>Relevance</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='newest' id='newest-desktop' />
                      <Label htmlFor='newest-desktop'>Most Recent</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='salary' id='salary-desktop' />
                      <Label htmlFor='salary-desktop'>Highest Salary</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className='flex-1'>
            <div className='flex justify-between items-center mb-4'>
              <p className='text-sm text-muted-foreground'>
                Showing{' '}
                <span className='font-medium text-foreground'>
                  {currentJobs.length}
                </span>{' '}
                of{' '}
                <span className='font-medium text-foreground'>
                  {filteredJobs.length}
                </span>{' '}
                jobs
              </p>
              <div className='md:hidden'>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className='w-[130px]'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='relevance'>Relevance</SelectItem>
                    <SelectItem value='newest'>Most Recent</SelectItem>
                    <SelectItem value='salary'>Highest Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {currentJobs.length === 0 ? (
              <div className='text-center py-16 bg-muted/30 rounded-lg'>
                <Briefcase className='mx-auto h-12 w-12 text-muted-foreground/50 mb-4' />
                <h3 className='text-lg font-medium mb-2'>No jobs found</h3>
                <p className='text-muted-foreground mb-6'>
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <Button variant='outline' onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className='space-y-4'>
                {currentJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`overflow-hidden transition-all hover:shadow-md`}
                  >
                    <CardContent className='p-6'>
                      <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                        <div className='space-y-3'>
                          <div className='flex items-center gap-3'>
                            <div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
                              <Building className='h-5 w-5 text-muted-foreground' />
                            </div>
                            <div>
                              <h3 className='font-semibold text-lg'>
                                <Link
                                  href={`/users/applicants/jobs/${job.id}`}
                                  className='hover:text-primary'
                                >
                                  {job.title}
                                </Link>
                              </h3>
                              <p className='text-sm text-muted-foreground'>
                                {job.company}
                              </p>
                            </div>
                          </div>
                          <p className='text-sm line-clamp-2'>
                            {job.description}
                          </p>
                          <div className='flex flex-wrap gap-2 text-sm'>
                            <div className='flex items-center gap-1 text-muted-foreground bg-muted px-2 py-1 rounded-md'>
                              <MapPin className='h-3.5 w-3.5' />
                              <span>{job.location}</span>
                            </div>
                            <div className='flex items-center gap-1 text-muted-foreground bg-muted px-2 py-1 rounded-md'>
                              <Briefcase className='h-3.5 w-3.5' />
                              <span>{job.type}</span>
                            </div>
                            <div className='flex items-center gap-1 text-muted-foreground bg-muted px-2 py-1 rounded-md'>
                              <DollarSign className='h-3.5 w-3.5' />
                              <span>
                                ${job.minimumSalary} - ${job.maximumSalary}
                              </span>
                            </div>
                            <div className='flex items-center gap-1 text-muted-foreground bg-muted px-2 py-1 rounded-md'>
                              <Clock className='h-3.5 w-3.5' />
                              <span>
                                {convertToDateFormat(job.createdAt.toString())}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-row md:flex-col gap-2 mt-2 md:mt-0 md:min-w-[120px] md:items-end'>
                          <Button asChild className='flex-1 md:w-full'>
                            <Link href={`/users/applicants/jobs/${job.id}`}>
                              Apply Now
                            </Link>
                          </Button>
                          <Button
                            variant='outline'
                            size='icon'
                            className='h-9 w-9'
                            onClick={() => toggleSaveJob(job.id)}
                          >
                            <BookmarkIcon
                              className={`h-4 w-4 ${
                                savedJobs.includes(job.id)
                                  ? 'fill-primary text-primary'
                                  : ''
                              }`}
                            />
                            <span className='sr-only'>Save job</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className='flex justify-center mt-8'>
                <div className='flex items-center gap-1'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className='h-4 w-4' />
                    <span className='sr-only'>Previous page</span>
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => {
                      // Show limited page numbers with ellipsis for better UX
                      if (
                        number === 1 ||
                        number === totalPages ||
                        (number >= currentPage - 1 && number <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={number}
                            variant={
                              currentPage === number ? 'default' : 'outline'
                            }
                            size='icon'
                            onClick={() => paginate(number)}
                            className='h-8 w-8'
                          >
                            {number}
                          </Button>
                        );
                      } else if (
                        number === currentPage - 2 ||
                        number === currentPage + 2
                      ) {
                        return (
                          <Button
                            key={number}
                            variant='outline'
                            size='icon'
                            disabled
                            className='h-8 w-8'
                          >
                            ...
                          </Button>
                        );
                      }
                      return null;
                    }
                  )}
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className='h-4 w-4' />
                    <span className='sr-only'>Next page</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='bg-muted py-12 mt-12'>
        <div className='container'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-2xl font-bold mb-4'>
              Ready to take the next step in your career?
            </h2>
            <p className='text-muted-foreground mb-6'>
              Create a profile to get personalized job recommendations, save
              your favorite jobs, and apply with just one click.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg'>Create Your Profile</Button>
              <Button variant='outline' size='lg'>
                Upload Your Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const JOBS = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Acme Inc',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description:
      "We're looking for an experienced frontend developer to join our team. You'll be responsible for building user interfaces, implementing features, and collaborating with designers and backend developers.",
    requirements:
      '5+ years of experience with React, TypeScript, and modern frontend development practices.',
    posted: '2 days ago',
    featured: true,
    category: 'Engineering',
    experience: 'Senior',
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    description:
      "Join our design team to create beautiful and intuitive user experiences. You'll work on product design, user research, and collaborate with developers to implement your designs.",
    requirements:
      '3+ years of experience in UX/UI design, proficiency with Figma, and a strong portfolio.',
    posted: '5 days ago',
    featured: true,
    category: 'Design',
    experience: 'Mid-level',
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'DataSystems',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$100,000 - $130,000',
    description:
      "Help us build scalable backend systems using Node.js and PostgreSQL. You'll be working on API development, database design, and system architecture.",
    requirements:
      'Experience with Node.js, Express, PostgreSQL, and RESTful API design.',
    posted: '1 week ago',
    featured: false,
    category: 'Engineering',
    experience: 'Mid-level',
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description:
      "Lead product development and work closely with engineering and design teams. You'll be responsible for product strategy, roadmap planning, and feature prioritization.",
    requirements:
      '3+ years of product management experience, preferably in SaaS products.',
    posted: '2 weeks ago',
    featured: false,
    category: 'Product',
    experience: 'Mid-level',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    description:
      "Manage our cloud infrastructure and CI/CD pipelines. You'll be responsible for deployment automation, monitoring, and infrastructure as code.",
    requirements:
      'Experience with AWS, Kubernetes, Docker, and CI/CD tools like Jenkins or GitHub Actions.',
    posted: '3 weeks ago',
    featured: false,
    category: 'Engineering',
    experience: 'Senior',
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    company: 'GrowthLabs',
    location: 'Chicago, IL',
    type: 'Part-time',
    salary: '$60,000 - $80,000',
    description:
      "Help us grow our brand through digital marketing campaigns. You'll be responsible for social media management, content creation, and campaign analysis.",
    requirements:
      'Experience with digital marketing, social media platforms, and analytics tools.',
    posted: '3 weeks ago',
    featured: false,
    category: 'Marketing',
    experience: 'Entry-level',
  },
  {
    id: '7',
    title: 'Customer Support Representative',
    company: 'ServiceFirst',
    location: 'Remote',
    type: 'Full-time',
    salary: '$50,000 - $65,000',
    description:
      "Provide excellent customer service and support to our users. You'll be handling customer inquiries, troubleshooting issues, and collecting feedback.",
    requirements:
      'Strong communication skills, problem-solving abilities, and customer service experience.',
    posted: '1 month ago',
    featured: false,
    category: 'Customer Support',
    experience: 'Entry-level',
  },
  {
    id: '8',
    title: 'Data Analyst',
    company: 'InsightData',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$85,000 - $110,000',
    description:
      "Analyze user data and provide insights to improve our product. You'll be working with large datasets, creating visualizations, and presenting findings to stakeholders.",
    requirements:
      'Experience with SQL, data visualization tools, and statistical analysis.',
    posted: '1 month ago',
    featured: false,
    category: 'Data',
    experience: 'Mid-level',
  },
  {
    id: '9',
    title: 'Mobile Developer (iOS)',
    company: 'AppWorks',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description:
      "Build and maintain our iOS applications. You'll be responsible for implementing new features, fixing bugs, and improving app performance.",
    requirements:
      'Experience with Swift, iOS SDK, and mobile app development best practices.',
    posted: '1 month ago',
    featured: false,
    category: 'Engineering',
    experience: 'Mid-level',
  },
  {
    id: '10',
    title: 'HR Manager',
    company: 'PeopleFirst',
    location: 'Denver, CO',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    description:
      "Lead our HR department and manage all aspects of human resources. You'll be responsible for recruitment, employee relations, benefits administration, and policy development.",
    requirements:
      '5+ years of HR experience, knowledge of employment laws, and strong interpersonal skills.',
    posted: '1 month ago',
    featured: false,
    category: 'Human Resources',
    experience: 'Senior',
  },
  {
    id: '11',
    title: 'Junior Web Developer',
    company: 'WebSolutions',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60,000 - $80,000',
    description:
      "Join our web development team to build responsive websites and web applications. You'll be working with HTML, CSS, JavaScript, and modern frameworks.",
    requirements:
      'Knowledge of HTML, CSS, JavaScript, and at least one modern framework like React or Vue.',
    posted: '2 weeks ago',
    featured: false,
    category: 'Engineering',
    experience: 'Entry-level',
  },
  {
    id: '12',
    title: 'Content Writer',
    company: 'ContentHub',
    location: 'Remote',
    type: 'Contract',
    salary: '$40 - $60 per hour',
    description:
      "Create engaging content for our blog, social media, and marketing materials. You'll be responsible for researching topics, writing articles, and editing content.",
    requirements:
      'Strong writing skills, attention to detail, and experience with content creation.',
    posted: '3 weeks ago',
    featured: false,
    category: 'Marketing',
    experience: 'Mid-level',
  },
];
