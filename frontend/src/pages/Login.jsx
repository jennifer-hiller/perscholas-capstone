import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    setLoading(true);
    try {
      const user = await axios.post("http://localhost:3000/api/user/login", {
        username,
        password,
      });
      if (user) {
        localStorage.setItem("user", user.data._id);
      }
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </p>
        <p>
          {loading ? <button disabled>Login</button> : <button>Login</button>}
        </p>
      </form>
      {error && <p>{error.message}</p>}
      <h3>
        <Link to="/signup">No account? Click here to sign up!</Link>
      </h3>
    </>
  );
}
