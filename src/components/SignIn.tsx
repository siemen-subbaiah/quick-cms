import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export function SignIn() {
  return (
    <Button
      className='z-50'
      onClick={() => signIn('google', { redirectTo: '/app' })}
    >
      Sign In with Google
    </Button>
  );
}
