import React from "react";
import Navbar from "./components/ui/Navbar";
import TodoList from "./components/todoList/TodoList";
import AddTaskForm from "./components/ui/AddTaskForm";

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <TodoList />
      <AddTaskForm />
    </div>
  );
}

export default App;
