import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState = {
  tasks: loadTasksFromLocalStorage(),
};

const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.tasks.push(todo);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    removeTodo: (state, action) => {
      state.tasks = state.tasks.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },

    toggleCompleted: (state, action) => {
      const task = state.tasks.find((todo) => todo.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTodo, removeTodo, toggleCompleted } = todoSlice.actions;
export default todoSlice.reducer;
