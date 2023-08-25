const saveUsersLists = async (userId, list) => {
    const newList = {
        userId: userId,
        list: list,
    };
    try {
        const response = await fetch("/api/savelist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newList),
        });
        return response;
    } catch (err) {
        return err;
    }
};

export default saveUsersLists;