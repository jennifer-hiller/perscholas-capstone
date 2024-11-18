import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getTasks() {
      try {
        setLoading(true);
        const data = await axios.get("http://localhost:3000/api/task");
        setTasks(data.data);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getTasks();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="homeTasks">
      <ul>
        {tasks
          .filter((task) => task.status === "To Do")
          .map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
      </ul>
      <ul>
        {tasks
          .filter((task) => task.status === "In Progress")
          .map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
      </ul>
      <ul>
        {tasks
          .filter((task) => task.status === "Completed")
          .map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
      </ul>
    </div>
  );
}
