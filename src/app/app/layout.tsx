import SideBar from '@/components/SideBar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='grid grid-cols-12'>
      <div className='col-span-2'>
        <SideBar />
      </div>
      <main className='px-4 col-span-10 h-screen overflow-y-scroll overflow-x-hidden'>
        {children}
      </main>
    </section>
  );
}
