import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragDropList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists([
      {
        id: "list-1",
        title: "To Do",
        items: [
          { id: "item-1", content: "Default Item 1" },
          { id: "item-2", content: "Default Item 2" },
          { id: "item-3", content: "Default Item 3" },
        ],
      },
      { id: "list-2", title: "In Progress", items: [] },
      { id: "list-3", title: "Done", items: [] },
    ]);
  }, []);

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

  return (
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
                {list.items.map((item, itemIndex) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={itemIndex}
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
                          data-rbd-drag-handle-draggable-id={item.id}
                        >
                          {item.content}
                        </div>
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
    </DragDropContext>
  );
};

export default DragDropList;
