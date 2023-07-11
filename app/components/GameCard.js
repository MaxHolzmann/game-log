// create screenshots slider!?const addGame = async (e) => {

// take the logic of this out of the component
//move to seperate component or proper page. 
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react"



export default function GameCard({ onClick, result }) {
  const { data: session, status } = useSession();

  const [usersGames, setGames] = useState([])
  //component this code
 

  const addGame = async (e) => {
    console.log("clicked game");
    console.log(e.target.parentElement.dataset.name);
    const newGame = {
      name: e.target.parentElement.dataset.name,
      background_image: e.target.parentElement.dataset.img,
      position: 1,
      category: "test",
      user: session.user.id,
    };

    //check if user already has game in My Games, if not continue


    try {
      const response = await fetch("/api/game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
      });
      console.log(response);
    } catch (err) {
      console.log(error);
    }
  };

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
        <button onClick={onClick}>Add Game</button>
      </div>
    </>
  );
}

