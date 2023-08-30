// import fetchUsersGames from "../app/utils/fetchUsersGames";
import saveUsersLists from "./saveUsersLists";

//modularizing removeGame to be used in multiple files
const removeGame = async (e, listDisplay, session) => {
    console.log('removeGame is running')
    const gameName = e.target?.parentElement.dataset.name;

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
                } catch (err) { console.log(err) }
                saveUsersLists(session.user.id, listDisplay);
                return listDisplay;
            }
        }
    }
};

export default removeGame;