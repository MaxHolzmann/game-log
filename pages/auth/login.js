import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({ providers }) {
  return (
    <>
      <div className='flex justify-center my-40 mx-5'>
        <div className='shadow-md border rounded-xl flex flex-col justify-items-center text-center p-8'>
          <h1 className='text-3xl mb-4'>Login</h1>

          <form>
            <label className='block text-left mb-2' htmlFor='email'>
              Email
            </label>
            <input
              className='shadow border rounded-lg p-2 mb-4 w-full'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
            />
            <label className='block text-left mb-2' htmlFor='password'>
              Password
            </label>
            <input
              className='shadow border rounded-lg p-2 mb-4 w-full'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
            />
            <button
              className='shadow border p-2 rounded-lg my-3 mx-2'
              type='submit'
            >
              Login
            </button>
          </form>

          <hr className='m-3'></hr>

          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {provider.name === "Google" ? (
                <>
                  <div className='px-6 sm:px-0 max-w-sm'>
                    <button
                      onClick={() => signIn(provider.id)}
                      type='button'
                      className='text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2'
                    >
                      <svg
                        className='mr-2 -ml-1 w-4 h-4'
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fab'
                        data-icon='google'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 488 512'
                      >
                        <path
                          fill='currentColor'
                          d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                        ></path>
                      </svg>
                      Login with Google<div></div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className='shadow border p-2 rounded-lg my-3 mx-2'
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </>
              )}
            </div>
          ))}

          <p className='text-sm mt-4'>
            Don't have an account?{" "}
            <a className='text-blue-600' href='/auth/signup'>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  console.log(providers);

  return {
    props: { providers: providers ?? [] },
  };
}
