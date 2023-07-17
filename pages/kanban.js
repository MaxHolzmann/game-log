import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "../app/components/Navbar";
import GameCard from "../app/components/GameCard";
import Column from "../app/components/Column";

export default function Kanban() {

 const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
      },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            tasksIds: ['task-1', 'task-2', 'task-3', 'task-4']
        }
    },
    columnOrder: ['column-1']
 }

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading!</p>;
  }

  // retrieve all games that match user, display here in position order and categorized.
  state = initialData;

  return (
    <>
     <Navbar></Navbar>
     {this.state.columnOrder.map((columnId) => {
        const column = this.state.columns[columnId]
        const tasks = column.tasksIds.map(taskId => this.state.tasks[taskId])

        return <Column key={column.id} column={column} tasks={column}></Column>
     })}
    </>
  );
}
