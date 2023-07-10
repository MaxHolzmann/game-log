import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../../app/components/Navbar";
import GameCard from "../../app/components/GameCard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_KEY;

  const [results, setResults] = useState([]);

  const [search, setSearch] = useState([]);

  const gameCall = async () => {
    if (search == null || search == undefined || search == "") {
      console.log("Search is null, undefined, or empty. Not calling API.");
    } else {
      console.log("Game Call! Search is: " + search);
      const url =
        "https://api.rawg.io/api/games?key=" +
        RAWG_KEY +
        '&search="' +
        search +
        '"';
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results);
          console.log(results);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.form.search.value);
    console.log("search updated! search is now: " + search);
  };

  // const addGame = async (e) => {
  //   console.log("clicked game");
  //   console.log(e.target);
  //   const newGame = {
  //     name: "test",
  //     image: "test",
  //     position: 1,
  //     category: "test",
  //   };
  //   try {
  //     const response = await fetch("/api/game", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newGame),
  //     });
  //     console.log(response);
  //   } catch (err) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    gameCall();
  }, [search]);

  //TODO : Loading screen for results.

  if (status === "loading") {
    return <p>Loading!</p>;
  }

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
          <button onClick={updateSearch} type='submit'>
            Search
          </button>
        </form>

        <div className='grid grid-cols-3 gap-4 content-center'>
          {results.map((result) => (
            <GameCard result={result}></GameCard>
          ))}
        </div>
      </div>
    </>
  );
}
