import Image from 'next/image';
import React from 'react';

const CodeEx = () => {
  return (
    <section className='my-5 flex justify-center items-center gap-5'>
      <p className='text-3xl w-1/3'>
        Generate REST APIs for pages and consume from any client
      </p>
      <Image src='/code.png' alt='code' height={800} width={800} />
    </section>
  );
};

export default CodeEx;
