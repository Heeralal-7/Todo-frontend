// components/TodoItem.js
import React, { useState } from "react"; // ✅ Fixes the error

const TodoItem = ({ todo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      editTodo(todo._id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          className="edit-input"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        <button onClick={handleEdit} className="btn edit-btn">
          {isEditing ? "Save" : "Edit"}
        </button>
        <button onClick={() => deleteTodo(todo._id)} className="btn delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 
