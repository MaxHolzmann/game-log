export default function Description() {
  return (
    <>
      <div className='text-center bg-slate-800 text-white pt-4'>
        <h1 className='m-10 text-5xl md:text-6xl font-semibold'>
          Future Developments
        </h1>
        <p className='font-medium text-2xl'>
          Game Log will continue to make the selection process easier for gamers
          by adding new features to the platform.
        </p>
        <h2 className='font-semibold text-3xl mt-10'>
          Some features currently in development
        </h2>
        <ul className='p-2'>
          <li>Custom List names / # of lists.</li>
          <li>Steam API integration for game library importing.</li>
          <li>Native login system.</li>
        </ul>
        <p className='text-lg pt-8 pb-2'>
          Created by Maximilian Holzmann, you can find my GitHub{" "}
          <a href='https://github.com/MaxHolzmann' target='_blank'>
            here
          </a>
        </p>
      </div>
    </>
  );
}
