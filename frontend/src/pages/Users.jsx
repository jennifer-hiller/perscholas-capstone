import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await axios.get(
          "https://perscholas-capstone-4dzy.onrender.com/api/user"
        );
        setUsers(data.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <a href={`/user/${user._id}`}>{user.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
