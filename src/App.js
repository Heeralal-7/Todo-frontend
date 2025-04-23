import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Clock from "./components/Clock";
import "./App.css";

const LOCAL_KEY = "todos_cache";

const App = () => {
  const [todos, setTodos] = useState([]);

  // Load from localStorage first for instant UI
  useEffect(() => {
    const local = localStorage.getItem(LOCAL_KEY);
    if (local) {
      setTodos(JSON.parse(local));
    }
    fetchTodos(); // then sync from backend
  }, []);

  // Save to localStorage when todos change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  // Fetch from MongoDB
  const fetchTodos = async () => {
    try {
      const res = await axios.get("https://todotask-zumn.onrender.com/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(" Error fetching todos:", err);
    }
  };

  // Add todo
  const addTodo = async (text) => {
    try {
      const res = await axios.post("https://todotask-zumn.onrender.com/api/todos", { text });
      setTodos((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(" Error adding todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(" Error deleting todo:", err);
    }
  };

  // Edit todo
  const editTodo = async (id, newText) => {
    try {
      const res = await axios.put(`https://todotask-zumn.onrender.com/api/todos/${id}`, { text: newText });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data : todo))
      );
    } catch (err) {
      console.error(" Error editing todo:", err);
    }
  };

  return (
    <div className="app">
    <h1>📝 Todo List</h1>
    <Clock /> 
    <TodoForm addTodo={addTodo} />
    <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
  </div>
  );
};

export default App;
