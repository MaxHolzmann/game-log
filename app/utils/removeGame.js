// import fetchUsersGames from "../app/utils/fetchUsersGames";
import fetchUsersList from "./fetchUsersList";
import saveUsersLists from "./saveUsersLists";

//modularizing removeGame to be used in multiple files
const removeGame = async (e, listDisplay, session, fromSearch) => {
    const gameName = e.target?.parentElement.dataset.name;

    if (fromSearch === true) {
        let fromSearchList = await fetchUsersList(session.user.id);
        fromSearchList = fromSearchList[0].list;
        console.log(fromSearchList);

        for (let i = 0; i < fromSearchList.length; i++) {
            for (let j = 0; j < fromSearchList[i].items.length; j++) {
                if (gameName === fromSearchList[i].items[j].name) {
                    fromSearchList[i].items.splice(j, 1);
                }
            }
        }

        try {
            const response = await fetch("/api/removegame", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: gameName }),
            });
            const newListFromSearch = await saveUsersLists(
                session.user.id,
                fromSearchList
            );
        } catch (err) {
            console.log(err);
        }
    } else if (fromSearch === false) {
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
