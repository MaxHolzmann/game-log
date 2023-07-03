import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "../../app/components/Navbar";

const RAWG_KEY = process.env.RAWG_KEY;

const gameCall = async () => {
  const url = "https://api.rawg.io/api/games?key=" + RAWG_KEY;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};

gameCall();

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
