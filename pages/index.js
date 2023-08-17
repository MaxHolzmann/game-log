import { useSession, signIn, signOut } from "next-auth/react";
import Hero from '../app/components/Hero'

export default function Home() {
  return (
    <>
      <Hero></Hero>
    </>
  );
}
