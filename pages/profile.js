import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "../app/components/Navbar";

//cloudinary for profile pictures

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <h1>Loading...</h1>;
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
      <h1>My Profile</h1>
    </>
  );
}
