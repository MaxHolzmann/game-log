const fetchUsersList = async (userId) => {
    try {
      const response = await fetch("/api/list/loadlist?id=" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  export default fetchUsersList;