// import fetchUsersGames from "../app/utils/fetchUsersGames";
import fetchUsersList from "./fetchUsersList";
import saveUsersLists from "./saveUsersLists";

//modularizing removeGame to be used in multiple files
const removeGame = async (e, listDisplay, session, fromSearch) => {
  console.log("removeGame is running");
  const gameName = e.target?.parentElement.dataset.name;
  console.log(gameName, "gameName");

  console.log(fromSearch, "fromSearch");
  if (fromSearch === true) {
    let fromSearchList = await fetchUsersList(session.user.id);
    fromSearchList = fromSearchList[0].list;
    console.log(fromSearchList);

    for (let i = 0; i < fromSearchList.length; i++) {
      for (let j = 0; j < fromSearchList[i].items.length; j++) {
        if (gameName === fromSearchList[i].items[j].name) {
          fromSearchList[i].items.splice(j, 1);
          console.log(j, "j");
          console.log(
            fromSearchList[i].items[j].name,
            "fromSearchList[i].items[j].name"
          );
        }
      }
    }

    console.log(fromSearchList, "fromSearchList updated");

    try {
      const response = await fetch("/api/removegame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: gameName }),
      });
      console.log(gameName, "gameName");
      console.log(response, "response");
      const newListFromSearch = await saveUsersLists(
        session.user.id,
        fromSearchList
      );
      console.log(newListFromSearch, "newListFromSearch");
    } catch (err) {
      console.log(err);
    }
  } else {
    // lets check if coming from search page and treat it slightly different if it is. we don't need to loop through lists, just use the fetchUserGames similar to how the search finds matches for the GameCard state.

    for (let i = 0; i < listDisplay.length; i++) {
      for (let j = 0; j < listDisplay[i].items.length; j++) {
        if (gameName === listDisplay[i].items[j].name) {
          listDisplay[i].items.splice(j, 1);
          try {
            const response = await fetch("/api/removegame", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: gameName }),
            });
          } catch (err) {
            console.log(err);
          }
          console.log(listDisplay, "listDisplay");
          saveUsersLists(session.user.id, listDisplay);
          return listDisplay;
        }
      }
    }
  }
};

export default removeGame;
