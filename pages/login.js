import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "../app/components/Navbar";

export default function Login() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar></Navbar>

      {session ? (
        <div>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </>
  );
}
