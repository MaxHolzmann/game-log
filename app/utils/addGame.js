import fetchUsersGames from "./fetchUsersGames"; //is this needed?

const addGame = async (e, usersGames, session) => {
    const newGame = {
        name: e.target.parentElement.dataset.name,
        background_image: e.target.parentElement.dataset.img,
        position: 1,
        category: "test",
        user: session.user.id,
    };
    //is this the most efficient way I can do this? look into
    for (let i = 0; i < usersGames.length; i++) {

        //must pass in usersGames variable? 
        if (usersGames[i].name === newGame.name) {
            console.log('already on list')
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
        console.log("added game:", response);
    } catch (err) {
        console.log(err);
    }
};

export default addGame;