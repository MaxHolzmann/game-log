export default function Navbar() {
  return (
    <div className='bg-slate-100 flex justify-start gap-6 text-black text-xl p-1 px-3'>
      <h1>
        <a className='hover:text-slate-500' href='/dashboard'>
          Search Games
        </a>
      </h1>
      <h1>
        <a className='hover:text-slate-500' href='/games'>
          My Games
        </a>
      </h1>
      <h1>
        <a className='hover:text-slate-500' href='/profile'>
          Profile
        </a>
      </h1>
    </div>
  );
}
