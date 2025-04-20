// utils/localStorage.js
export const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  export const getTodos = () => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  };
  