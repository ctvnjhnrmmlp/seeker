'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Briefcase,
  Building,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

export default function ApplicantLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const routes = [
    {
      label: 'Dashboard',
      href: '/users/applicants',
      icon: Home,
      active: pathname === '/users/applicants',
    },
    {
      label: 'Applications',
      href: '/users/applicants/applications',
      icon: Briefcase,
      active: pathname === '/users/applicants/applications',
    },
    {
      label: 'Saves',
      href: '/users/applicants/saves',
      icon: FileText,
      active: pathname === '/users/applicants/saves',
    },
  ];

  return (
    <div className='flex min-h-screen bg-background'>
      <aside className='hidden md:flex w-64 flex-col border-r bg-background'>
        <div className='flex h-14 items-center border-b px-4'>
          <Link
            href='/users/applicants'
            className='flex items-center gap-2 font-semibold'
          >
            <Building className='h-5 w-5' />
            <span>Applicant Portal</span>
          </Link>
        </div>
        <nav className='flex-1 overflow-auto py-4'>
          <div className='mt-6 px-3 space-y-1'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  route.active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <route.icon className='h-4 w-4' />
                {route.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className='border-t p-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='w-full justify-start gap-2'>
                <User className='h-4 w-4' />
                <span>Seeker</span>
                <ChevronDown className='ml-auto h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      <div className='md:hidden flex items-center h-14 border-b px-4 w-full'>
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='mr-2'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-64 p-0'>
            <div className='flex h-14 items-center border-b px-4'>
              <Link
                href='/dashboard'
                className='flex items-center gap-2 font-semibold'
              >
                <Building className='h-5 w-5' />
                <span>Applicant Portal</span>
              </Link>
            </div>
            <nav className='flex-1 overflow-auto py-4'>
              <div className='mt-6 px-3 space-y-1'>
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                      route.active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <route.icon className='h-4 w-4' />
                    {route.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className='border-t p-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='w-full justify-start gap-2'
                  >
                    <User className='h-4 w-4' />
                    <span>Seeker</span>
                    <ChevronDown className='ml-auto h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className='mr-2 h-4 w-4' />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href='/dashboard'
          className='flex items-center gap-2 font-semibold'
        >
          <Building className='h-5 w-5' />
          <span>Applicant Portal</span>
        </Link>
      </div>
      <main className='flex-1 overflow-auto'>{children}</main>
    </div>
  );
}
