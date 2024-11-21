import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, toggleCompleted } from "./components/todoList";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);

  const handleSubmition = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTodo(task)); 
      setTask(""); 
    }
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id)); 
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted(id)); 
  };

  return (
    <Provider store={store}>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-96">
          <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">
            To-Do List
          </h1>
          
          {/* Form to Add Task */}
          <form
            className="flex flex-col"
            onSubmit={handleSubmition}
          >
            <input
              type="text"
              className="border-2 border-gray-300 rounded-md p-3 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task"
              onChange={(e) => setTask(e.target.value)}
              value={task} // Bind the input to task state
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Task
            </button>
          </form>

          {/* Task List */}
          <div className="mt-8">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Your Tasks</h2>
            <ul className="space-y-4">
              {tasks.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex justify-between items-center p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm ${
                    todo.completed ? "bg-green-100" : ""
                  }`} // Change background color for completed tasks
                >
                  <div className="flex items-center">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleCompleted(todo.id)}
                      className="mr-3"
                    />
                    <span
                      className={`text-lg ${todo.completed ? "line-through text-gray-500" : "text-gray-700"}`} // Strike-through completed tasks
                    >
                      {todo.text}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemove(todo.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
