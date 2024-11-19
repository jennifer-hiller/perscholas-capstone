/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (!username || !password) {
      setError(new Error("Please fill in all fields"));
      return;
    }
    setLoading(true);
    try {
      const user = await axios.post("http://localhost:3000/api/user/login", {
        username,
        password,
      });
      if (user) {
        onLogin(user.data._id);
        navigation("/");
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            required
            minLength={3}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            required
            minLength={8}
          />
        </p>
        <p>
          {loading ? (
            <button disabled className="btn btn-primary">
              Login
            </button>
          ) : (
            <button className="btn btn-primary">Login</button>
          )}
        </p>
      </form>
      {error && <p>{error.message}</p>}
      <h3>
        <Link to="/signup">No account? Click here to sign up!</Link>
      </h3>
    </>
  );
}
