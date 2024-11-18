import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/utils";

export default function Detail() {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    async function getTask() {
      try {
        setLoading(true);
        const data = await axios.get(`http://localhost:3000/api/task/${id}`);
        setTask(data.data);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getTask();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>{task.title}</h1>
      <h2>Assigned to: {task.assignedTo.name}</h2>
      <h2>Created by: {task.createdBy.name}</h2>
      <h3>Created at: {formatDate(task.created)}</h3>
      <h3>Last modified: {formatDate(task.lastModified)}</h3>
      <p>{task.description}</p>
      <div className="comments">
        <h4>Comments:</h4>
        <ul>
          {task.comments.map((comment) => (
            <li key={comment.id}>
              <h5>{comment.author.name}</h5>
              <h6>{formatDate(comment.date)}</h6>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
