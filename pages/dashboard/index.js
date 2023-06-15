import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from '../../app/components/Navbar'

export default function Dashboard() {
  return (
    <>
    <Navbar></Navbar>
    <div className='text-center'>
     <h1>Dashboard</h1>
    </div>
    </>
  );
}
