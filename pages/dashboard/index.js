import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react"
import Navbar from "../../app/components/Navbar";
import GameCard from "../../app/components/GameCard";


export default function Dashboard() {

  const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_KEY;

  const [results, setResults] = useState([])

  const gameCall = async () => {
    console.log('Game Call!');
    const url = 'https://api.rawg.io/api/games?key=' + RAWG_KEY + '&search="paper mario"';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results)
        console.log(results)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    gameCall();
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <div className='text-center'>
        <h1>Dashboard</h1>
        <div className="grid grid-cols-3 gap-4 content-center">
        {results.map((result) => (
          <GameCard result={result}></GameCard>
        ))}
        </div>
      </div>
    </>
  );
}
