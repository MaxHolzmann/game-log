// create screenshots slider!?
export default function GameCard({ result }) {
  return (
    <>
      <div className='max-w-sm rounded-lg overflow-hidden shadow-xl'>
        <div className='text-white bg-orange-500'>{result.name}</div>
        <img
          className='w-full h-48 object-cover'
          src={result.background_image}
        />
      </div>
    </>
  );
}
