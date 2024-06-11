import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section className='flex items-center flex-col my-5'>
      <Image src='/not-found.svg' alt='landing' width={500} height={500} />
      <h1 className='text-2xl'>Oops! Page not found.</h1>
      <Button asChild className='mt-5'>
        <Link href='/app'>Home</Link>
      </Button>
    </section>
  );
};

export default NotFoundPage;
