import { useSession, signIn, signOut } from "next-auth/react";

export default function Hero() {
  const { data: session, status } = useSession();

  return (
    <>
      <div class='flex h-screen justify-center items-center flex-col'>
        <div class="w-full h-screen bg-[url('/background-img.jpg')] bg-cover bg-center">
          <div class='w-full h-full flex flex-col gap-10  justify-center items-center backdrop-brightness-50'>
            <span class='text-white font-semibold text-6xl w-1/2 text-center'>
              Game Log
            </span>
            <span class='text-white text-4xl w-1/2 text-center'>
              Always unsure of what to play next? Let Game Log take out the
              stress of picking your next game.
            </span>
            {status === "authenticated" ? (
              <a
                href='/profile'
                className='rounded-md bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
              >
                View your profile
              </a>
            ) : (
              <a
                href='/auth/login'
                className='rounded-md bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
              >
                Get started
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
