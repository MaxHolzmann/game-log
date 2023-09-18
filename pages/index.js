import { useSession, signIn, signOut } from "next-auth/react";
import Hero from '../app/components/Hero'
import Description from "../app/components/Description";
import Future from "../app/components/Future";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Description></Description>
      <Future></Future>
    </>
  );
}
