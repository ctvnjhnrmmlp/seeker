'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Briefcase, Check, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UserType = 'employer' | 'applicant' | null;

export default function SelectRole() {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType) {
      router.push(`/users/${selectedType === 'employer' ? 'employers/' : ''}`);
    }
  };

  return (
    <div className='container max-w-4xl py-12 px-4'>
      <h1 className='text-3xl font-bold text-center mb-3'>Join Our Platform</h1>
      <p className='text-center text-muted-foreground mb-10'>
        Select how you want to use our platform
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-10'>
        <Card
          className={cn(
            'cursor-pointer transition-all hover:shadow-md border-2',
            selectedType === 'employer'
              ? 'border-primary shadow-md'
              : 'border-muted'
          )}
          onClick={() => setSelectedType('employer')}
        >
          <CardHeader className='pb-4'>
            <div className='flex justify-between items-start'>
              <div className='flex items-center'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
                  <Briefcase className='h-6 w-6 text-primary' />
                </div>
                <CardTitle className='text-2xl'>Employer</CardTitle>
              </div>
              {selectedType === 'employer' && (
                <div className='rounded-full bg-primary p-1'>
                  <Check className='h-5 w-5 text-primary-foreground' />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className='pb-6'>
            <ul className='space-y-2'>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Post job openings and opportunities</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Review applications from qualified candidates</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Manage your hiring pipeline efficiently</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Connect with potential employees</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card
          className={cn(
            'cursor-pointer transition-all hover:shadow-md border-2',
            selectedType === 'applicant'
              ? 'border-primary shadow-md'
              : 'border-muted'
          )}
          onClick={() => setSelectedType('applicant')}
        >
          <CardHeader className='pb-4'>
            <div className='flex justify-between items-start'>
              <div className='flex items-center'>
                <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
                  <UserRound className='h-6 w-6 text-primary' />
                </div>
                <CardTitle className='text-2xl'>Applicant</CardTitle>
              </div>
              {selectedType === 'applicant' && (
                <div className='rounded-full bg-primary p-1'>
                  <Check className='h-5 w-5 text-primary-foreground' />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className='pb-6'>
            <ul className='space-y-2'>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Create a professional profile</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Browse and apply to job listings</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Track your application status</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Connect with potential employers</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className='flex justify-center'>
        <Button
          size='lg'
          onClick={handleContinue}
          disabled={!selectedType}
          className='px-8'
        >
          Continue
          <ArrowRight className='ml-2 h-5 w-5' />
        </Button>
      </div>
    </div>
  );
}
