import { useEffect, useState } from "react";
import axios from "axios";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:4000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    await axios.post("http://localhost:4000/api/tasks", newTask);
    fetchTasks();
  };

  const handleChangeTask = async (updatedTask) => {
    await axios.put(
      `http://localhost:4000/api/tasks/${updatedTask._id}`,
      updatedTask
    );
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <AddTask onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
