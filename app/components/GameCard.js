import { useState, useEffect } from "react";
import removeGame from "../utils/removeGame";
import addGame from "../utils/addGame";
import fetchUsersList from "../utils/fetchUsersList";
import fetchUsersGames from "../utils/fetchUsersGames";

//GameCard does not need to handle List State.

export default function GameCard({
  session,
  listFunction,
  result,
  onList,
  add,
  remove,
  usersGames,
  list,
  fromSearch,
}) {
  let [match, setMatch] = useState(result.match);

  if (!remove) {
    onList = match;
  } else {
    onList = true;
  }

  const addGameClick = async (e) => {
    const usersVideoGames = await fetchUsersGames(session.user.id);
    addGame(e, usersVideoGames, session);
    setMatch(true);
    console.log("add logic is running");
  };

  const removeGameClick = async (e) => {
    const newList = await removeGame(e, list, session, fromSearch);
    setMatch(false);
    console.log("new List", newList);
  };

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
            {onList === true ? (
              <button
                className='py-1 px-2 rounded-lg bg-red-600 text-white text-lg hover:scale-105 duration-100'
                onClick={removeGameClick}
              >
                Remove Game
              </button>
            ) : (
              <button
                className='py-1 px-2 rounded-lg bg-green-600 text-white text-lg hover:scale-105 duration-100'
                onClick={addGameClick}
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
