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

  function handleInputChange(e) {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("title") === "") {
      setSubmitError("Title is required");
      return;
    }
    if (formData.get("description") === "") {
      setSubmitError("Description is required");
      return;
    }
    const data = Object.fromEntries(formData);

    if (id) {
      data.createdBy = task.createdBy;
      try {
        await axios.put(
          `https://perscholas-capstone-4dzy.onrender.com/api/task/${id}`,
          data
        );
        navigate(`/detail/${id}`);
      } catch (e) {
        console.error(e);
        setSubmitError(e);
      }
    } else {
      data.createdBy = localStorage.getItem("user");
      try {
        const newTask = await axios.post(
          "https://perscholas-capstone-4dzy.onrender.com/api/task/",
          data
        );
        navigate(`/detail/${newTask.data._id}`);
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
        const data = await axios.get(
          "https://perscholas-capstone-4dzy.onrender.com/api/user"
        );
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
        const data = await axios.get(
          `https://perscholas-capstone-4dzy.onrender.com/api/task/${id}`
        );
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
  if (taskError) return <div>Could not load Task: {taskError.message}</div>;
  if (usersError) return <div>Could not load Users: {usersError.message}</div>;
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
            onChange={handleInputChange}
            required
            minLength={1}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={task.description}
            onChange={handleInputChange}
            required
            minLength={1}
          ></textarea>
        </p>
        <p>
          <label htmlFor="assignedTo">Assigned To</label>
          <select
            className="form-control"
            name="assignedTo"
            id="assignedTo"
            defaultValue={task.assignedTo}
            onChange={handleInputChange}
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
            defaultValue={task.severity}
            onChange={handleInputChange}
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
            defaultValue={task.status}
            onChange={handleInputChange}
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
      {submitError && <p>Could not save Task: {submitError.message}</p>}
    </>
  );
}
