import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const initialTasks = [
  { id: 1, text: "Visit Ujjain Mahakal Temple", done: true },
  { id: 2, text: "make a project", done: false },
  { id: 3, text: "Watch a show", done: false },
];

export default function TodoApp() {
  const [tasks, setTasks] = useState(initialTasks);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:4000/api/tasks");
    console.log(res);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleAddTask(text) {
    if (text.trim() === "") return;
    return setTasks([...tasks, { id: tasks.length + 1, text, done: false }]);
  }

  function handleChangeTask(updatedTask) {
    setTasks(
      tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task;
        }
      })
    );
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
