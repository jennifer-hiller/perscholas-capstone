/* eslint-disable react/prop-types */
export default function TaskItem(props) {
  return (
    <li>
      <h3>{props.title}</h3>
      <p>Assigned To: {props.assignedTo.name}</p>
      <p>{props.description.substring(0, 100)}...</p>
      <p>Severity: {props.severity}</p>
      <p>Status: {props.status}</p>
    </li>
  );
}
