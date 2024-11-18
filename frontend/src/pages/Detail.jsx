import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/utils";

export default function Detail() {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const params = useParams();
  const id = params.id;
  const getTask = useCallback(async () => {
    try {
      const data = await axios.get(`http://localhost:3000/api/task/${id}`);
      setTask(data.data);
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [id]);
  async function handleCommentSubmit(e) {
    e.preventDefault();
    setCommentLoading(true);
    const comment = e.target.comment.value;
    const author = localStorage.getItem("user");
    const content = {
      content: comment,
      author: author,
      task: id,
    };
    try {
      await axios.post(`http://localhost:3000/api/comment`, content);
      getTask();
      e.target.reset();
    } catch (e) {
      console.error(e);
      setCommentError(e);
    } finally {
      setCommentLoading(false);
    }
  }
  useEffect(() => {
    getTask();
  }, [getTask]);
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
      {localStorage.getItem("user") ? (
        <form onSubmit={handleCommentSubmit}>
          <p>
            <label htmlFor="comment">Comment:</label>
            <textarea
              name="comment"
              id="comment"
              className="form-control"
            ></textarea>
          </p>
          <p>
            {commentLoading ? (
              <button type="submit" className="btn btn-primary" disabled>
                Submit
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </p>
          {commentError && <p>Error: {commentError.message}</p>}
        </form>
      ) : (
        "You must be logged in to create a new task"
      )}
      <div className="comments">
        <h4>Comments:</h4>
        <ul>
          {task.comments.map((comment) => (
            <li key={comment._id}>
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
