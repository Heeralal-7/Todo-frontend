// components/TodoList.js
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, deleteTodo, editTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoList; 
