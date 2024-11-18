import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskError, setTaskError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const params = useParams();
  const id = params.id;

  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      try {
        await axios.put(`http://localhost:3000/api/task/${id}`, task);
        navigate(`/task/${id}`);
      } catch (e) {
        console.error(e);
        setSubmitError(e);
      }
    } else {
      setTask({ ...task, createdBy: localStorage.getItem("user") });
      try {
        const newTask = await axios.post(
          "http://localhost:3000/api/task/",
          task
        );
        navigate(`/task/${newTask._id}`);
      } catch (e) {
        console.error(e);
        setSubmitError(e);
      }
    }
  }

  useEffect(() => {
    async function getUsers() {
      setUsersLoading(true);
      try {
        const data = await axios.get("http://localhost:3000/api/user");
        setUsers(data.data);
      } catch (e) {
        console.error(e);
        setUsersError(e);
      } finally {
        setUsersLoading(false);
      }
    }
    async function getTask() {
      try {
        setTaskLoading(true);
        const data = await axios.get(`http://localhost:3000/api/task/${id}`);
        setTask(data.data);
      } catch (e) {
        console.error(e);
        setTaskError(e);
      } finally {
        setTaskLoading(false);
      }
    }
    getUsers();
    if (id) {
      getTask();
    }
  }, [id]);
  if (taskLoading || usersLoading) return <div>Loading...</div>;
  if (taskError) return <div>Couldn&apos;t load Task: {taskError.message}</div>;
  if (usersError)
    return <div>Couldn&apos;t load Users: {usersError.message}</div>;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          ></textarea>
        </p>
        <p>
          <label htmlFor="assignedTo">Assigned To</label>
          <select
            className="form-control"
            name="assignedTo"
            id="assignedTo"
            onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
            defaultValue={task.assignedTo}
          >
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="severity">Severity</label>
          <select
            className="form-control"
            name="severity"
            id="severity"
            onChange={(e) => setTask({ ...task, severity: e.target.value })}
            defaultValue={task.severity}
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Showstopper">Showstopper</option>
          </select>
        </p>
        <p>
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            name="status"
            id="status"
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            defaultValue={task.status}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </p>
        <p>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </p>
      </form>
      {submitError && <p>Couldn&apos;t save Task: {submitError.message}</p>}
    </>
  );
}
