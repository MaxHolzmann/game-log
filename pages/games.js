import React from "react";
import { useState, useEffect, useReducer } from "react";
import { useSession, getSession } from "next-auth/react";
import Navbar from "../app/components/Navbar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GameCard from "../app/components/GameCard";
import { v4 as uuidv4 } from "uuid";
import fetchUsersGames from "../app/utils/fetchUsersGames";
import fetchUsersList from "../app/utils/fetchUsersList";
import saveUsersLists from "../app/utils/saveUsersLists";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import Loading from "../app/components/Loading";

/* FEATURE / NOTES / IDEAS FOR GAMES PAGE
Get rid of forceUpdate. It's a hacky solution.
Custom lists, more than 3 lists
Set default list for new games
Add games to lists from search page (search page feature)
*/

const DragDropList = ({ initialGamesData }) => {
  const { data: session, status } = useSession();
  const [lists, setLists] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

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
      saveUsersLists(session.user.id, updatedLists);
    }
  };

  const removeGameUpdateList = async (e) => {
    const gameName = e.target.parentElement.dataset.name;
    for (let i = 0; i < lists.length; i++) {
      for (let j = 0; j < lists[i].items.length; j++) {
        if (gameName === lists[i].items[j].name) {
          lists[i].items.splice(j, 1);
          setLists(lists);
          saveUsersLists(lists);
        }
      }
    }

    fetchData();
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
    forceUpdate();
  };

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
        const allListItems = [];

        for (let i = 0; i < initialListData[0].list.length; i++) {
          for (let j = 0; j < initialListData[0].list[i].items.length; j++) {
            let list = initialListData[0].list[i].items[j];
            allListItems.push(list);
          }
        }
        const results = itemsWithUniqueIds.filter((item) => {
          // Check if an item with the same name exists in allListItems
          const itemExists = allListItems.some(
            (listItem) => listItem.name === item.name
          );
          return !itemExists;
        });

        // Display the results
        results.forEach((item) => {
          initialListData[0].list[0].items.push(item);
        });
        setLists(initialListData[0].list);
      } else {
        //default list.
        setLists([
          {
            id: "list-1",
            title: "Back Log 📖",
            items: itemsWithUniqueIds,
          },
          { id: "list-2", title: "Currently Playing 🎮", items: [] },
          { id: "list-3", title: "Completed 🏆", items: [] },
        ]);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session, status, ignored]);

  if (status === "loading") {
    return <Loading></Loading>
  }

  return (
    <>
      <ReactNotifications />
      <Navbar></Navbar>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center bg-slate-100 rounded-2xl m-10'>
          {lists.map((list, index) => (
            <div key={list.id}>
              <h2 className='text-2xl mt-5'>{list.title}</h2>
              <Droppable droppableId={list.id} index={index}>
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-slate-200 m-3 rounded-2xl flex flex-col justify-center xl:grid xl:grid-cols-2"
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
                              ...provided.draggableProps.style,
                            }}
                            className='flex justify-center p-3'
                            onClick={removeGameUpdateList}
                          >
                            <GameCard
                              session={session}
                              list={lists}
                              setLists={setLists}
                              result={item}
                              onList={true}
                              remove={true}
                              fromSearch={false}
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

// grab session data on server side, and fetch the users' games to compare to the "list" data that matches the users'
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
