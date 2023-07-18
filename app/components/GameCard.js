// create screenshots slider!?const addGame = async (e) => {

// take the logic of this out of the component
//move to seperate component or proper page. 
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react"



export default function GameCard({ onClick, result, onList }) {
  const { data: session, status } = useSession();

  const [usersGames, setGames] = useState([]);
    //check if user already has game in My Games, if not continue
  // add game to User in database.
  // Potentially find a way to update the User's array of games with a reference.

  return (
    <>
      <div
        data-img={result.background_image}
        data-name={result.name}
        className='max-w-sm rounded-lg overflow-hidden shadow-xl hover:scale-105'
      >
        <div className='text-white bg-orange-500'>{result.name}</div>
        <img
          className='w-full h-48 object-cover'
          src={result.background_image}
        />
        { onList ? (
        <button onClick={onClick}>Remove Game</button>) 
        : 
        <button onClick={onClick}>Add Game</button>
        }
      </div>
    </>
  );
}

