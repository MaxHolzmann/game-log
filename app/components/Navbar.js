export default function Navbar() {
  return (
    <div className='flex justify-end gap-6 text-black text-xl p-1 px-3'>
    <h1>
        <a className='hover:text-slate-500' href='/games'>
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
    </div>
  );
}
