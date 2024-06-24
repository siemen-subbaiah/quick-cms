'use client';

import Logo from '@/components/Logo';
import MyToast from '@/components/MyToast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowBackIos } from 'react-icons/md';

const TestUserPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await signIn('credentials', {
      email,
      password,
    });

    if (result?.error) {
      toast('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/app');
      setLoading(false);
    }
  };

  return (
    <>
      <section className='h-screen flex items-center justify-center'>
        <Card className='w-1/4'>
          <CardHeader>
            <section className='flex justify-center'>
              <Logo width={120} height={120} />
            </section>
            <p className='text-xl text-center'>Login as test user</p>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className='mt-3 grid w-full items-center gap-4'
            >
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  name='email'
                  type='email'
                  id='email'
                  defaultValue='johndoe@gmail.com'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  name='password'
                  type='password'
                  id='password'
                  defaultValue='Admin@123'
                />
              </div>
              <Button disabled={loading}>Login</Button>
              <Link href='/' className='flex justify-center'>
                <Button variant='link'>
                  <MdArrowBackIos className='w-4 h-4' />
                  Go Back
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </section>
      <MyToast />
    </>
  );
};

export default TestUserPage;
