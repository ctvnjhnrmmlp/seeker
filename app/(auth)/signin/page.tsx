import { auth } from '@/auth';
import { SignInButton } from '@/components/auth/signin-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GalleryVerticalEnd } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return redirect('/');
  }

  return (
    <main>
      <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <a
            href='#'
            className='flex items-center gap-2 self-center font-medium'
          >
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Seeker
          </a>
          <div className='flex flex-col gap-6'>
            <Card>
              <CardHeader className='text-center'>
                <CardTitle className='text-xl'>Welcome back</CardTitle>
                <CardDescription>
                  Login with your Apple or Google account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='flex flex-col gap-4'>
                    <SignInButton />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
              By clicking continue, you agree to our{' '}
              <a href='#'>Terms of Service</a> and{' '}
              <a href='#'>Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
