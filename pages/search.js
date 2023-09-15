import { useSession, signIn, signOut, getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../app/components/Navbar";
import GameCard from "../app/components/GameCard";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const RAWG_KEY = process.env.NEXT_PUBLIC_RAWG_KEY;
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState([]);
  const [usersGames, setGames] = useState([]);
  const [notUserGame, setNotUserGame] = useState([]);

  const gameCall = async () => {
    if (search == null || search == undefined || search == "") {
      console.log("Search is null, undefined, or empty. Not calling API.");
    } else {
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

          //map through games already on users list to see if any results are on their list already
          const usersGamesNames = usersGames.map((game) => game.name);
          for (let i = 0; i < data.results.length; i++) {
            if (usersGamesNames.includes(data.results[i].name)) {
              data.results[i].match = true;
            } else {
              data.results[i].match = false;
            }
          }
          console.log("gamecall ending", data.results);
          setResults(data.results);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    setSearch(document.getElementById("search").value);
  };

  const addGameNotification = (e) => {
    const gameName = e.target.parentElement.dataset.name;
    if (e.target.tagName === "BUTTON") {
      if (e.target.textContent === "Remove Game") {
        Store.addNotification({
          title: "Game Removed",
          message: gameName + " was removed from your list.",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });

      } else if (e.target.textContent === "Add Game") {
        Store.addNotification({
          title: "Game Added",
          message: gameName + " was added to your list!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    }
  }

  const fetchUsersGames = async () => {
    if (status === "authenticated") {
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
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchUsersGames();
    gameCall();
  }, [session, search]);

  useEffect(() => {
    fetchUsersGames();
    updateSearch();
  }, [results]);

  if (status === "loading") {
    return <p>Loading!</p>;
  }

  return (
    <>
      <ReactNotifications />
      <Navbar></Navbar>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div className='text-center'>
          <h1 className='text-5xl pt-3'>Search for games!</h1>
          <form className='p-7'>
            <input
              id='search'
              name='search'
              placeholder='Enter a game'
              className='border focus:outline-1 rounded-xl shadow-md text-xl p-2 focus:border-blue-500 focus:ring-0 focus:outline-none'
            ></input>

            <button
              onClick={updateSearch}
              type='submit'
              className='mx-4 shadow-md text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </form>

          <div onClick={addGameNotification} className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 content-center m-5'>
            {results.map((result) =>
              result.match === true ? (
                <GameCard
                  key={result.id}
                  onList={true}
                  add={false}
                  list={usersGames}
                  session={session}
                  result={result}
                  fromSearch={true}
                ></GameCard>
              ) : (
                <GameCard
                  key={result.id}
                  onList={false}
                  session={session}
                  add={true}
                  usersGames={usersGames}
                  result={result}
                ></GameCard>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
