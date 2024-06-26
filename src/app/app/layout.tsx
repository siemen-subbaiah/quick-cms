import MyToast from '@/components/MyToast';
import SideBar from '@/components/SideBar';
import { PageBuilderStoreProvider } from '@/store/pagebuilder-store-provider';
import { Toaster } from 'react-hot-toast';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageBuilderStoreProvider>
      <section className='grid grid-cols-12'>
        <div className='col-span-2'>
          <SideBar />
        </div>
        <main className='px-4 col-span-10 h-screen overflow-y-scroll overflow-x-hidden'>
          {children}
          <MyToast />
        </main>
      </section>
    </PageBuilderStoreProvider>
  );
}
