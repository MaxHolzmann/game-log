import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "../app/components/Navbar";
import Loading from "../app/components/Loading";

//cloudinary for profile pictures

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading></Loading>
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Navbar></Navbar>
        <h1 className='text-center text-3xl m-10'>
          Sign in to view your profile.
        </h1>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <div className='flex flex-col items-center mt-10'>
        <div className='flex shadow-lg flex-col items-center w-50 rounded-2xl bg-slate-200 p-4'>
          <img
            className='rounded-full h-40 w-40 m-1'
            src={session.user.image}
            alt='Profile Picture'
          />
          <h1 className='text-2xl text-gray-600'>{session.user.email}</h1>
          <h1 className='text-xl text-gray-600'>{session.user.name}</h1>
        </div>

        <h1 className='text-2xl mt-5'>
          At this time, you can not currently edit your profile information.
        </h1>
      </div>
    </>
  );
}
