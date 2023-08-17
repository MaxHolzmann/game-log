import { useSession, getSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  /* 
  IDEAS TO BETTER NAVBAR DESIGN
  logo in left corner to homepage?
  different font
  */

  return (
    <div className='text-center font-semibold flex justify-center gap-6 text-slate-600 text-lg p-2 px-3'>
      {session ? (
        <>
          <h1>
            <a className='' href='/games'>
              My Games
            </a>
          </h1>
          <h1>
            <a className='hover:text-slate-500' href='/search'>
              Search Games
            </a>
          </h1>
          <h1>
            <a className='hover:text-slate-500' href='/profile'>
              Profile
            </a>
          </h1>
          <h1>
            <a
              className='hover:text-slate-500'
              href='#'
              onClick={() => signOut()}
            >
              Sign Out
            </a>
          </h1>
        </>
      ) : (
        <>
          <h1>
            <a className='hover:text-slate-500' href='/auth/login'>
              Sign In
            </a>
          </h1>
        </>
      )}
    </div>
  );
}
