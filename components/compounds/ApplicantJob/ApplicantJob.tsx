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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApplicationService from '@/services/seeker/applications';
import JobService from '@/services/seeker/jobs';
import { convertToDateFormat } from '@/utilities/functions';
import { useMutation, useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import {
  ArrowLeft,
  BookmarkIcon,
  Briefcase,
  Building,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

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
    responsibilities: [
      'Develop and maintain frontend applications using React, TypeScript, and Next.js',
      'Collaborate with designers to implement UI/UX designs',
      'Write clean, maintainable, and efficient code',
      'Optimize applications for maximum speed and scalability',
      'Participate in code reviews and provide constructive feedback',
    ],
    qualifications: [
      '5+ years of experience with React and modern JavaScript',
      'Strong knowledge of TypeScript and state management libraries',
      'Experience with responsive design and CSS frameworks',
      'Familiarity with testing frameworks like Jest and React Testing Library',
      'Good understanding of web performance optimization',
      'Excellent problem-solving and communication skills',
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote work options',
      'Professional development budget',
      'Home office stipend',
      'Unlimited PTO policy',
    ],
    posted: '2 days ago',
    featured: true,
    category: 'Engineering',
    experience: 'Senior',
    companyDescription:
      "Acme Inc is a leading technology company specializing in developer tools and productivity software. We're on a mission to make developers' lives easier with innovative solutions.",
    applicationUrl: 'https://example.com/apply',
    contactEmail: 'careers@acmeinc.com',
    companySize: '50-100 employees',
    companyIndustry: 'Software Development',
    companyWebsite: 'https://example.com',
    companyLogo: '/placeholder.svg?height=80&width=80',
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
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with product managers and developers',
      'Maintain and evolve our design system',
      'Stay up-to-date with design trends and best practices',
    ],
    qualifications: [
      '3+ years of experience in UX/UI design',
      'Proficiency with design tools like Figma or Sketch',
      'Strong portfolio demonstrating your design process',
      'Experience with user research and usability testing',
      'Understanding of accessibility standards',
      'Excellent communication and collaboration skills',
    ],
    benefits: [
      'Competitive salary and bonus structure',
      'Comprehensive health benefits',
      '401(k) matching',
      'Flexible work arrangements',
      'Professional development opportunities',
      'Modern office in downtown New York',
    ],
    posted: '5 days ago',
    featured: true,
    category: 'Design',
    experience: 'Mid-level',
    companyDescription:
      'TechCorp is a fast-growing startup focused on creating innovative solutions for the financial industry. We combine cutting-edge technology with beautiful design to transform how people manage their finances.',
    applicationUrl: 'https://example.com/apply',
    contactEmail: 'jobs@techcorp.com',
    companySize: '100-250 employees',
    companyIndustry: 'Financial Technology',
    companyWebsite: 'https://example.com',
    companyLogo: '/placeholder.svg?height=80&width=80',
  },
  // Add more detailed job listings as needed
];

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
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData({
        ...applicationData,
        resume: e.target.files[0],
      });
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();

    setIsApplying(true);

    setTimeout(() => {
      setIsApplying(false);
      toast('Application Submitted', {
        description: 'Your application has been successfully submitted.',
      });
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
      });
    }, 1500);
  };

  const createApplicationMutation = useMutation({
    mutationFn: async ({
      email,
      userId,
      jobId,
    }: {
      email: string;
      userId: string;
      jobId: string;
    }) => {
      setIsApplying(true);
      return await ApplicationService.createApplication({
        email,
        userId,
        jobId,
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
              <CardHeader className='pb-4'>
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
                  {/* {job.featured && (
                    <div className='bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full'>
                      Featured
                    </div>
                  )} */}
                </div>
              </CardHeader>
              <CardContent className='pb-6'>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-6'>
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
                        {convertToDateFormat(jobServer?.createdAt.toString()!)}
                      </span>
                    </div>
                  </div>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className='grid w-full grid-cols-3'>
                    <TabsTrigger value='description'>Description</TabsTrigger>
                    <TabsTrigger value='company'>Company</TabsTrigger>
                    <TabsTrigger value='benefits'>Benefits</TabsTrigger>
                  </TabsList>
                  <TabsContent value='description' className='space-y-6 pt-4'>
                    <div>
                      <h3 className='font-semibold text-lg mb-3'>
                        Description
                      </h3>
                      <p className='text-muted-foreground whitespace-pre-line'>
                        {jobServer?.description}
                      </p>
                    </div>
                    <div>
                      <h3 className='font-semibold text-lg mb-3'>
                        Requirements
                      </h3>
                      <p className='text-muted-foreground whitespace-pre-line'>
                        {jobServer?.requirements}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value='company' className='space-y-6 pt-4'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='h-16 w-16 rounded-md bg-muted flex items-center justify-center'>
                        <Building className='h-8 w-8 text-muted-foreground' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-lg'>
                          {jobServer?.company}
                        </h3>
                        {/* <p className='text-muted-foreground'>
                          {job.companyIndustry}
                        </p> */}
                      </div>
                    </div>
                    {/* <p className='text-muted-foreground'>
                      {job.companyDescription}
                    </p>
                    <div className='grid grid-cols-2 gap-4 text-sm'>
                      <div className='flex flex-col gap-1'>
                        <span className='text-muted-foreground'>
                          Company Size
                        </span>
                        <span className='font-medium'>{job.companySize}</span>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span className='text-muted-foreground'>Industry</span>
                        <span className='font-medium'>
                          {job.companyIndustry}
                        </span>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span className='text-muted-foreground'>Website</span>
                        <a
                          href={job.companyWebsite}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='font-medium text-primary hover:underline flex items-center'
                        >
                          {job.companyWebsite.replace('https://', '')}
                          <ExternalLink className='ml-1 h-3 w-3' />
                        </a>
                      </div>
                    </div> */}
                  </TabsContent>
                  {/* <TabsContent value='benefits' className='space-y-6 pt-4'>
                    <h3 className='font-semibold text-lg mb-3'>
                      Benefits & Perks
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className='flex items-start gap-2'>
                          <div className='mt-0.5 bg-primary/10 rounded-full p-1'>
                            <Check className='h-4 w-4 text-primary' />
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent> */}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div className='space-y-6'>
            <Card>
              <CardContent className='space-y-4'>
                {/* <Button
                  className='w-full'
                  size='lg'
                  onClick={() =>
                    createApplicationMutation.mutate({ email, userId, jobId })
                  }
                >
                  Apply Now
                </Button> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='w-full' size='lg'>
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[500px]'>
                    <DialogHeader>
                      <DialogTitle>Apply for {jobServer?.title}</DialogTitle>
                      <DialogDescription>
                        {/* Complete the form below to submit your application to{' '} */}
                        {jobServer?.company}.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitApplication}>
                      {/* <div className='grid gap-4 py-4'>
                        <div className='grid gap-2'>
                          <Label htmlFor='name'>Full Name</Label>
                          <Input
                            id='name'
                            value={applicationData.name}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className='grid gap-2'>
                          <Label htmlFor='email'>Email</Label>
                          <Input
                            id='email'
                            type='email'
                            value={applicationData.email}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className='grid gap-2'>
                          <Label htmlFor='phone'>Phone Number</Label>
                          <Input
                            id='phone'
                            type='tel'
                            value={applicationData.phone}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                phone: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className='grid gap-2'>
                          <Label htmlFor='resume'>Resume</Label>
                          <div className='flex items-center gap-2'>
                            <Input
                              id='resume'
                              type='file'
                              className='hidden'
                              accept='.pdf,.doc,.docx'
                              onChange={handleFileChange}
                              required
                            />
                            <Button
                              type='button'
                              variant='outline'
                              onClick={() =>
                                document.getElementById('resume')?.click()
                              }
                              className='w-full justify-start'
                            >
                              <Upload className='mr-2 h-4 w-4' />
                              {applicationData.resume
                                ? applicationData.resume.name
                                : 'Upload Resume'}
                            </Button>
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Accepted formats: PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </div>
                        <div className='grid gap-2'>
                          <Label htmlFor='coverLetter'>
                            Cover Letter (Optional)
                          </Label>
                          <Textarea
                            id='coverLetter'
                            placeholder="Tell us why you're a good fit for this position..."
                            value={applicationData.coverLetter}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                coverLetter: e.target.value,
                              })
                            }
                            className='min-h-[100px]'
                          />
                        </div>
                      </div> */}
                      <DialogFooter>
                        <Button
                          disabled={isApplying}
                          onClick={() =>
                            createApplicationMutation.mutate({
                              email,
                              userId,
                              jobId,
                            })
                          }
                        >
                          {isApplying ? 'Submitting...' : 'Submit Application'}
                        </Button>
                        {/* <Button type='submit' disabled={isApplying}>
                          {isApplying ? 'Submitting...' : 'Submit Application'}
                        </Button> */}
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <div className='flex justify-between'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <BookmarkIcon
                      className={`mr-2 h-4 w-4 ${
                        isSaved ? 'fill-primary text-primary' : ''
                      }`}
                    />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant='outline' size='sm'>
                    <Share2 className='mr-2 h-4 w-4' /> Share
                  </Button>
                </div>
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-2 border-t pt-6'>
                <p className='text-sm text-muted-foreground'>
                  {jobServer?.company}
                </p>
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
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* {similarJobs.map((similarJob) => (
                  <div
                    key={similarJob.id}
                    className='border-b pb-4 last:border-0 last:pb-0'
                  >
                    <h4 className='font-medium hover:text-primary'>
                      <a href={`/careers/${similarJob.id}`}>
                        {similarJob.title}
                      </a>
                    </h4>
                    <div className='flex items-center gap-2 mt-1 text-xs text-muted-foreground'>
                      <span>{similarJob.company}</span>
                      <span>•</span>
                      <span>{similarJob.location}</span>
                    </div>
                  </div>
                ))} */}
              </CardContent>
              <CardFooter>
                <Button variant='outline' className='w-full' asChild>
                  <Link href='/users/applicants/jobs'>View All Jobs</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
