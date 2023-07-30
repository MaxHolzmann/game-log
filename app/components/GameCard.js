// create screenshots slider!?const addGame = async (e) => {

// take the logic of this out of the component
//move to seperate component or proper page.
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function GameCard({ onClick, result, onList }) {
  const { data: session, status } = useSession();

  const [usersGames, setGames] = useState([]);
  //check if user already has game in My Games, if not continue
  // add game to User in database.
  // Potentially find a way to update the User's array of games with a reference.

  return (
    <>
      <div className='max-w-sm h-full overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl flex flex-col'>
        <img
          src={result.background_image}
          alt={result.name}
          className='h-36 w-full'
        />
        <div className='p-5 flex flex-col flex-grow'>
          <h1 className='text-lg py-2'>{result.name}</h1>
          <div className='flex-grow'></div>{" "}
          {/* This div pushes the buttons to the bottom */}
          <div
            data-img={result.background_image}
            data-name={result.name}
            className='mt-auto'
          >
            {onList ? (
              <button
                className='py-1 px-2 rounded-lg bg-red-600 text-white text-lg hover:scale-105 duration-100'
                onClick={onClick}
              >
                Remove Game
              </button>
            ) : (
              <button
                className='w-full rounded-lg bg-green-600 text-white text-lg hover:scale-105 duration-100'
                onClick={onClick}
              >
                Add Game
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <div
        data-img={result.background_image}
        data-name={result.name}
        className='w-sm rounded-lg overflow-hidden shadow-2xl w-4/5'
      >
        <div className='text-white bg-black p-1 text-lg'>{result.name}</div>
        <img className='w-full h-full' src={result.background_image} />
        {onList ? (
          <button
            className='w-full bg-black text-white text-lg hover:scale-105'
            onClick={onClick}
          >
            Remove Game
          </button>
        ) : (
          <button
            className='w-full bg-black text-white text-lg hover:scale-105'
            onClick={onClick}
          >
            Add Game
          </button>
        )}
      </div> */}
    </>
  );
}
