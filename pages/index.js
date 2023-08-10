import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <div className='grid grid-cols-2'>
        <h1 className='text-center text-4xl mt-20'>Game Log</h1>
      </div>
    </>
  );
}
