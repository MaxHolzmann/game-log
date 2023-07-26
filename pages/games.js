import React from "react";
import { useSession, getSession } from "next-auth/react";
import Navbar from "../app/components/Navbar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GameCard from "../app/components/GameCard";
import { v4 as uuidv4 } from "uuid";
import { all } from "axios";

const fetchUsersGames = async (userId) => {
  try {
    const response = await fetch("/api/usersgames?id=" + userId, {
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

const saveUsersList = async (userId, list) => {
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
    console.log(response);
  } catch (err) {
    console.log(error);
  }
};

const DragDropList = ({ initialGamesData }) => {
  const { data: session, status } = useSession();
  const [lists, setLists] = React.useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceListIndex = result.source.droppableId;
    const destinationListIndex = result.destination.droppableId;
    const sourceList = lists.find((list) => list.id === sourceListIndex);
    const destinationList = lists.find(
      (list) => list.id === destinationListIndex
    );

    if (sourceList === destinationList) {
      // Reorder within the same list
      const reorderedItems = Array.from(sourceList.items);
      const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, reorderedItem);
      const updatedLists = lists.map((list) =>
        list.id === sourceList.id ? { ...list, items: reorderedItems } : list
      );
      setLists(updatedLists);
    } else {
      // Move from one list to another
      const sourceItems = Array.from(sourceList.items);
      const destinationItems = Array.from(destinationList.items);
      const [movedItem] = sourceItems.splice(result.source.index, 1);
      destinationItems.splice(result.destination.index, 0, movedItem);
      const updatedLists = lists.map((list) => {
        if (list.id === sourceList.id) {
          return { ...list, items: sourceItems };
        } else if (list.id === destinationList.id) {
          return { ...list, items: destinationItems };
        }
        return list;
      });

      setLists(updatedLists);
      saveUsersList(session.user.id, updatedLists);
    }
  };

  const removeGame = async (e) => {
    const gameName = e.target.parentElement.dataset.name;

    for (let i = 0; i < lists.length; i++) {
      for (let j = 0; j < lists[i].items.length; j++) {
        if (gameName === lists[i].items[j].name) {
          lists[i].items.splice(j, 1);
          console.log(gameName);
          console.log(lists[i].items);

          try {
            const response = await fetch("/api/removegame", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: gameName }),
            });
            console.log(response);
          } catch (err) {
            console.log(err);
          }

          setLists(lists);
          saveUsersList(session.user.id, lists);
          forceUpdate();
        }
      }
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        const initialGamesData = await fetchUsersGames(session.user.id);

        // Generate unique IDs for each item
        const itemsWithUniqueIds = initialGamesData.map((item) => ({
          ...item,
          _id: uuidv4(),
        }));

        const initialListData = await fetchUsersList(session.user.id);

        if (initialListData.length !== 0) {
          // compare items with unique ids to inital list, when no match, add to the first items array

          console.log(itemsWithUniqueIds);

          const allListItems = [];

          for (let i = 0; i < initialListData[0].list.length; i++) {
            for (let j = 0; j < initialListData[0].list[i].items.length; j++) {
              let list = initialListData[0].list[i].items[j];
              allListItems.push(list);
            }
          }

          console.log(allListItems);

          const results = itemsWithUniqueIds.filter((item) => {
            // Check if an item with the same name exists in allListItems
            const itemExists = allListItems.some(
              (listItem) => listItem.name === item.name
            );

            // If the item with the same name does not exist in allListItems, keep it in the results array
            return !itemExists;
          });

          // Display the results
          results.forEach((item) => {
            console.log("match!", item);
            initialListData[0].list[0].items.push(item);
          });

          console.log(initialListData[0].list);

          setLists(initialListData[0].list);
        } else {
          setLists([
            {
              id: "list-1",
              title: "To Do",
              items: itemsWithUniqueIds, // Use the items with unique IDs
            },
            { id: "list-2", title: "In Progress", items: [] },
            { id: "list-3", title: "Done", items: [] },
          ]);
        }
      }
    };

    fetchData();
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading!</p>;
  }

  return (
    <>
      <Navbar></Navbar>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // Three columns with equal width
            gap: "20px", // Add some spacing between the lists
          }}
        >
          {lists.map((list, index) => (
            <div key={list.id}>
              <h2>{list.title}</h2>
              <Droppable droppableId={list.id} index={index}>
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ listStyleType: "none", padding: 0 }}
                  >
                    {list.items.map((item, itemIndex) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={itemIndex}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: "none",
                              padding: 16,
                              margin: "0 0 8px 0",
                              minHeight: "50px",
                              backgroundColor: "#fff",
                              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <GameCard
                              onClick={removeGame}
                              result={item}
                              onList={true}
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

// Implement getServerSideProps to fetch the data on the server side
export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);

    if (!session) {
      // Handle the case when the session is not available
      return {
        props: {
          initialGamesData: [],
        },
      };
    }

    const initialGamesData = await fetchUsersGames(session.user.id);

    // Return the data as props so that it can be used in the component
    return {
      props: {
        initialGamesData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        initialGamesData: [],
      },
    };
  }
}

export default DragDropList;
