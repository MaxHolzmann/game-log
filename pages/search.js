import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../app/components/Navbar";
import GameCard from "../app/components/GameCard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_KEY;
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState([]);
  const [usersGames, setGames] = useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

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
          const usersGamesNames = usersGames.map((game) => game.name);
          console.log(usersGamesNames);
          for (let i = 0; i < data.results.length; i++) {
            if (usersGamesNames.includes(data.results[i].name)) {
              console.log("match found!");
              data.results[i].match = true;
            } else {
              data.results[i].match = false;
              console.log("no match found");
            }
          }
          setResults(data.results);
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

  const addGame = async (e) => {
    const newGame = {
      name: e.target.parentElement.dataset.name,
      background_image: e.target.parentElement.dataset.img,
      position: 1,
      category: "test",
      user: session.user.id,
    };

    for (let i = 0; i < usersGames.length; i++) {
      if (usersGames[i].name === newGame.name) {
        console.log("you already have this");
        return;
      }
    }

    try {
      const response = await fetch("/api/game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
      });
      console.log(response);
      forceUpdate();
    } catch (err) {
      console.log(error);
    }
  };

  const fetchUsersGames = async () => {
    if (status === "authenticated") {
      try {
        console.log("go!");
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
    }
  };

  //TODO : Loading screen for results.
  // update to "remove game" when a game is added, update state??

  useEffect(() => {
    fetchUsersGames();
  }, [session, ignored]);

  useEffect(() => {
    gameCall();
  }, [search]);

  if (status === "loading") {
    return <p>Loading!</p>;
  }

  return (
    <>
      <Navbar></Navbar>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div className='text-center'>
          <h1 className='text-5xl pt-3'>Search for games!</h1>
          <form className='p-7'>
            <input
              name='search'
              placeholder='Enter a game'
              className='border rounded-xl shadow-md text-xl p-2'
            ></input>

            <button
              onClick={updateSearch}
              type='submit'
              class='mx-4 shadow-md text-orange-500 hover:text-white border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </form>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 content-center m-5 bg-gray-200'>
            {results.map((result) => (
              <GameCard
                key={result.id}
                onList={result.match}
                onClick={addGame}
                result={result}
              ></GameCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
