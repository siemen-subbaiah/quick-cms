import React from 'react';
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from '../ui/glowing-stars';

const Features = () => {
  return (
    <div className='mt-5'>
      <h1 className='text-4xl text-center relative top-10'>Features</h1>
      <section className='grid grid-cols-3'>
        <div className='flex py-10 items-center justify-center antialiased'>
          <GlowingStarsBackgroundCard>
            <GlowingStarsTitle>API Generation</GlowingStarsTitle>
            <div className='flex justify-between items-end'>
              <GlowingStarsDescription>
                Generate REST APIs for your pages
              </GlowingStarsDescription>
            </div>
          </GlowingStarsBackgroundCard>
        </div>
        <div className='flex py-10 items-center justify-center antialiased'>
          <GlowingStarsBackgroundCard>
            <GlowingStarsTitle>Webhook support</GlowingStarsTitle>
            <div className='flex justify-between items-end'>
              <GlowingStarsDescription>
                Integrate Netlify or Vercel using build hook URLs
              </GlowingStarsDescription>
            </div>
          </GlowingStarsBackgroundCard>
        </div>
        <div className='flex py-10 items-center justify-center antialiased'>
          <GlowingStarsBackgroundCard>
            <GlowingStarsTitle>AI Content Generation</GlowingStarsTitle>
            <div className='flex justify-between items-end'>
              <GlowingStarsDescription>
                Make your content more spicy using AI
              </GlowingStarsDescription>
            </div>
          </GlowingStarsBackgroundCard>
        </div>
      </section>
    </div>
  );
};

export default Features;
