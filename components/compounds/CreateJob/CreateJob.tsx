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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { JobSchema } from '@/lib/zod';
import JobService from '@/services/seeker/jobs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Briefcase, Building, DollarSign, Info, MapPin } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('edit');
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      salaryMin: '',
      salaryMax: '',
      description: '',
      requirements: '',
      applicationUrl: '',
      contactEmail: '',
    },
  });

  const formValues = form.watch();

  const createJobMutation = useMutation({
    mutationFn: async ({
      email,
      job,
    }: {
      email: string;
      job: z.infer<typeof JobSchema>;
    }) => await JobService.createJob({ email, job }),
    onSuccess: () => {
      toast('Job Posted Successfully', {
        description: 'Your job listing has been published.',
      });
      router.push('/users/employers');
    },
    onError: () => {
      toast('Error', {
        description: 'There was a problem posting your job.',
      });
    },
  });

  async function onSubmit(values: z.infer<typeof JobSchema>) {
    createJobMutation.mutateAsync({ email: session?.user.email, job: values });
  }

  return (
    <div className='container max-w-4xl py-10'>
      <h1 className='text-3xl font-bold mb-6'>Post a New Job</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='edit'>Edit Job</TabsTrigger>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
        </TabsList>

        <TabsContent value='edit' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Fill out the form below to create a new job listing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='e.g. Senior Frontend Developer'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='company'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name*</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g. Acme Inc.' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='location'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='e.g. New York, NY or Remote'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='type'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Type*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select job type' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='full-time'>
                                Full-time
                              </SelectItem>
                              <SelectItem value='part-time'>
                                Part-time
                              </SelectItem>
                              <SelectItem value='contract'>Contract</SelectItem>
                              <SelectItem value='freelance'>
                                Freelance
                              </SelectItem>
                              <SelectItem value='internship'>
                                Internship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='salaryMin'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Salary</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g. 50000' {...field} />
                          </FormControl>
                          <FormDescription>
                            Leave blank if you prefer not to disclose
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='salaryMax'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Salary</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g. 80000' {...field} />
                          </FormControl>
                          <FormDescription>
                            Leave blank if you prefer not to disclose
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Describe the role, responsibilities, and what a typical day looks like...'
                            className='min-h-[150px]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='requirements'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='List the skills, experience, and qualifications required...'
                            className='min-h-[150px]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name='applicationUrl'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='https://your-company.com/careers/apply'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            External link where candidates can apply
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='contactEmail'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='hiring@your-company.com'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Email for applicant inquiries
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='flex justify-end gap-4'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setActiveTab('preview')}
                    >
                      Preview
                    </Button>
                    <Button type='submit'>Post Job</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='preview' className='mt-6'>
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
                    {formValues.title || 'Job Title'}
                  </h2>
                  <div className='flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground'>
                    {formValues.company && (
                      <div className='flex items-center gap-1'>
                        <Building className='h-4 w-4' />
                        <span>{formValues.company}</span>
                      </div>
                    )}
                    {formValues.location && (
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>{formValues.location}</span>
                      </div>
                    )}
                    {formValues.type && (
                      <div className='flex items-center gap-1'>
                        <Briefcase className='h-4 w-4' />
                        <span className='capitalize'>
                          {formValues.type.replace('-', ' ')}
                        </span>
                      </div>
                    )}
                    {(formValues.salaryMin || formValues.salaryMax) && (
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        <span>
                          {formValues.salaryMin && formValues.salaryMax
                            ? `$${formValues.salaryMin} - $${formValues.salaryMax}`
                            : formValues.salaryMin
                            ? `From $${formValues.salaryMin}`
                            : `Up to $${formValues.salaryMax}`}
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
                      {formValues.description || 'No description provided.'}
                    </div>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold mb-2'>Requirements</h3>
                    <div className='whitespace-pre-line'>
                      {formValues.requirements || 'No requirements specified.'}
                    </div>
                  </div>
                </div>

                <div className='bg-muted p-4 rounded-lg'>
                  <div className='flex items-start gap-2'>
                    <Info className='h-5 w-5 mt-0.5 text-muted-foreground' />
                    <div>
                      <h4 className='font-medium'>How to Apply</h4>
                      {formValues.applicationUrl ? (
                        <p className='text-sm mt-1'>
                          Apply through our{' '}
                          <a
                            href={formValues.applicationUrl}
                            className='text-primary hover:underline'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            application portal
                          </a>{' '}
                          or contact{' '}
                          <a
                            href={`mailto:${formValues.contactEmail}`}
                            className='text-primary hover:underline'
                          >
                            {formValues.contactEmail}
                          </a>{' '}
                          for more information.
                        </p>
                      ) : (
                        <p className='text-sm mt-1'>
                          Contact{' '}
                          <a
                            href={`mailto:${formValues.contactEmail}`}
                            className='text-primary hover:underline'
                          >
                            {formValues.contactEmail || 'the employer'}
                          </a>{' '}
                          for more information about this position.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' onClick={() => setActiveTab('edit')}>
                Back to Edit
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)}>Post Job</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
