import React from 'react';

const Footer = () => {
  return (
    <footer className='h-16 bg-primary-foreground p-3 flex items-center justify-center'>
      <p>
        {new Date().getFullYear()} Made by{' '}
        <a
          className='hover:underline'
          href='https://www.linkedin.com/in/siemen-subbaiah'
        >
          Siemen Subbaiah
        </a>{' '}
        and{' '}
        <a
          className='hover:underline'
          href='https://www.linkedin.com/in/raghul-m-873351163/'
        >
          Raghul M
        </a>
      </p>
    </footer>
  );
};

export default Footer;
