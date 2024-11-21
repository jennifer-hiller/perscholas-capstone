import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import { formatDate } from "../../utils/utils";

export default function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await axios.get(
          `https://perscholas-capstone-4dzy.onrender.com/api/user/${id}`
        );
        setUser(data.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <h2>Created</h2>
      <div className="homeTasks">
        <div>
          <h3>To Do</h3>
          <ul>
            {user.created
              .filter((task) => task.status === "To Do")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>

        <div>
          <h3>In Progress</h3>
          <ul>
            {user.created
              .filter((task) => task.status === "In Progress")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>

        <div>
          <h3>Completed</h3>
          <ul>
            {user.created
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>
      </div>
      <hr />
      <h2>Assigned</h2>
      <div className="homeTasks">
        <div>
          <h3>To Do</h3>
          <ul>
            {user.assigned
              .filter((task) => task.status === "To Do")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>

        <div>
          <h3>In Progress</h3>
          <ul>
            {user.assigned
              .filter((task) => task.status === "In Progress")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>

        <div>
          <h3>Completed</h3>
          <ul>
            {user.assigned
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
          </ul>
        </div>
      </div>
      <hr />
      <div className="comments">
        <h2>Comments</h2>
        <ul>
          {user.comments.map((comment) => (
            <li key={comment._id}>
              <h4>
                <Link to={`/detail/${comment.task._id}`}>
                  {comment.task.title}
                </Link>
              </h4>
              <p>{formatDate(comment.date)}</p>
              <p>{comment.content}</p>
              <p>{comment.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
