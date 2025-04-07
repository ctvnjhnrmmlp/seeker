import { auth, signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (session) {
    return redirect('/');
  }

  return (
    <main>
      <section>
        <div className='grid min-h-svh lg:grid-cols-2 bg-white/30 backdrop-blur-md'>
          <div className='relative hidden bg-muted lg:block'>
            {/* <Image
              unoptimized={true}
              src='https://pinnacle.pnc.edu.ph/img/pnc-bg-1.jpg'
              alt='Image'
              width={100}
              height={100}
              className='absolute inset-0 h-full w-full object-cover pointer-events-none'
            /> */}
          </div>
          <div className='flex flex-col gap-4 p-6 md:p-10'>
            <div className='flex justify-center gap-2 md:justify-end'>
              <Link
                href='/'
                className='flex items-center gap-2 font-extralight text-4xl'
              >
                Pinnacle{' '}
                <span className='uppercase font-bold text-emerald-600'>
                  Next
                </span>
              </Link>
            </div>
            <div className='flex flex-1 items-center justify-center'>
              <div className='w-full max-w-sm space-y-4'>
                <div className='flex flex-col items-center gap-2 text-center'>
                  <h1 className='text-3xl font-bold text-emerald-600'>
                    Continue to your account
                  </h1>
                  <p className='text-muted-foreground text-lg text-balance'>
                    Use your existing account below to continue
                  </p>
                </div>
                <div className='grid gap-6'>
                  <Button
                    className='w-full py-6 text-lg bg-emerald-600'
                    onClick={async () => {
                      'use server';
                      await signIn('google');
                    }}
                  >
                    Continue with Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
