import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import { Link } from "react-router-dom";

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getTasks() {
      try {
        setLoading(true);
        const data = await axios.get(
          "https://perscholas-capstone-4dzy.onrender.com/api/task"
        );
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
    <>
      <p>
        {localStorage.getItem("user") ? (
          <Link to="/task/new" className="btn btn-secondary">
            New Task
          </Link>
        ) : (
          "You must be logged in to create a new task"
        )}
      </p>
      <div className="homeTasks">
        <div>
          <h2>To Do</h2>
          <ul>
            {tasks
              .filter((task) => task.status === "To Do")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>

        <div>
          <h2>In Progress</h2>
          <ul>
            {tasks
              .filter((task) => task.status === "In Progress")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>

        <div>
          <h2>Completed</h2>
          <ul>
            {tasks
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
