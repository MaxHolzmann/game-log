import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../../app/components/Navbar";
import GameCard from "../../app/components/GameCard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  
  const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_KEY;

  const [results, setResults] = useState([]);

  const [search, setSearch] = useState([]);

  const [usersGames, setGames] = useState([]);

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
          const usersGamesNames = usersGames.map((game => game.name))
          console.log(usersGamesNames)
          for(let i = 0; i < data.results.length; i++) {
            if(usersGamesNames.includes(data.results[i].name)) {
              console.log('match found!')
              data.results[i].match = true;
            } else {
              data.results[i].match = false;
              console.log('no match found')
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

    for(let i = 0; i < usersGames.length; i++) {
      if(usersGames[i].name === newGame.name) {
        console.log('you already have this');
        return
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
    } catch (err) {
      console.log(error);
    }
  };

  const fetchUsersGames = async () => {
    if(status === "authenticated") {
    try {
      console.log('go!')
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
  }


  //TODO : Loading screen for results.

  useEffect(() => {
    fetchUsersGames();

  }, [session])

  useEffect(() => {
    gameCall();
  }, [search]);

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
            <GameCard key={result.id} onList={result.match} onClick={addGame} result={result}></GameCard>
          ))}
        </div>
      </div>
    </>
  );
}
