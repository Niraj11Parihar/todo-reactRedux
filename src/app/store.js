import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/todoList";  

const store = configureStore({
  reducer: {
    tasks: todoReducer, 
  },
});

export default store;
