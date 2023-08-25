// import fetchUsersGames from "../app/utils/fetchUsersGames";
// import fetchUsersList from "../app/utils/fetchUsersList";

//modularizing removeGame to be used in multiple files
const removeGame = async (e, listDisplay, session) => {

    // const userList = await fetchUsersList(session.user.id);
    const gameName = e.target?.parentElement.dataset.name;

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
                } catch (err) { }

                //check if on games page somehow..? perhaps a prop
                if (listDisplay) {
                    setLists(lists);
                } else {
                    console.log("not display lists here, no need.")
                }
                saveUsersList(session.user.id, lists);
            }
        }
    }
};

export default removeGame;