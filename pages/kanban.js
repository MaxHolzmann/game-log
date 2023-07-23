import React from "react";
import { useSession, getSession } from "next-auth/react";
import Navbar from "../app/components/Navbar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GameCard from "../app/components/GameCard";

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

const DragDropList = ({ initialGamesData }) => {
  const { data: session, status } = useSession();

  const [lists, setLists] = React.useState([]);

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
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        const initialGamesData = await fetchUsersGames(session.user.id);

        // Set the initial data from the fetched games
        setLists([
          {
            id: "list-1",
            title: "To Do",
            items: initialGamesData,
          },
          { id: "list-2", title: "In Progress", items: [] },
          { id: "list-3", title: "Done", items: [] },
        ]);
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
                  {list.items.map(
                    (
                      item,
                      itemIndex // Use map instead of forEach
                    ) => (
                      <Draggable
                        key={item.id}
                        draggableId={item._id.toString()}
                        index={itemIndex} // Use itemIndex instead of index here
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
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
                            <div
                              {...provided.dragHandleProps}
                              data-rbd-drag-handle-draggable-id={item._id.toString()}
                            >
                              <GameCard result={item} onList={true}></GameCard>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
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
