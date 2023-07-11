import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../app/components/Navbar";
import GameCard from "../app/components/GameCard";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [usersGames, setGames] = useState([]);

  useEffect(() => {
    const fetchUsersGames = async () => {
      try {
        const response = await fetch("/api/usersgames?id=" + session.user.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        const data = await response.json();
        setGames(data);
        console.log(usersGames);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsersGames();
  }, [session]);

  if (status === "loading") {
    return <p>Loading!</p>;
  }

  // retrieve all games that match user, display here in position order and categorized.

  return (
    <>
      <Navbar></Navbar>
      <div className='text-center'>
        <h1>Dashboard</h1>

        <h2>Search Games</h2>
        <form>
          <input
            name='search'
            placeholder='Search for a game'
            className='border'
          ></input>
        </form>

        <div className='grid grid-cols-3 gap-4 content-center'>
          {usersGames.map((game) => (
            <GameCard result={game}></GameCard>
          ))}
        </div>
      </div>
    </>
  );
}
