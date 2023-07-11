// create screenshots slider!?const addGame = async (e) => {
import { useSession, signIn, signOut } from "next-auth/react";

export default function GameCard({ result }) {
  const { data: session, status } = useSession();

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
        onClick={addGame}
        data-img={result.background_image}
        data-name={result.name}
        className='max-w-sm rounded-lg overflow-hidden shadow-xl'
      >
        <div className='text-white bg-orange-500'>{result.name}</div>
        <img
          className='w-full h-48 object-cover'
          src={result.background_image}
        />
        <button>Add Game</button>
      </div>
    </>
  );
}
