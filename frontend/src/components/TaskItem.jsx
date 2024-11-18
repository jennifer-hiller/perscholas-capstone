import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function TaskItem({ task }) {
  return (
    <li>
      <h3>
        <Link to={`/detail/${task._id}`}>{task.title}</Link>
      </h3>
      <p>Assigned To: {task.assignedTo.name}</p>
      <p>{task.description.substring(0, 100)}...</p>
      <p>Severity: {task.severity}</p>
      <p>Status: {task.status}</p>
    </li>
  );
}
