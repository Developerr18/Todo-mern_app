import Task from "./Task";

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onChangeTask={onChangeTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
