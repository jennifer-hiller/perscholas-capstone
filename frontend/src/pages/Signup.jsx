/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ onLogin }) {
  const navigation = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    delete data.password2;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const user = await axios.post("http://localhost:3000/api/user", {
        ...data,
      });
      if (user) {
        onLogin(user.data._id);
        navigation("/");
      }
    } catch (e) {
      setError(e.response.data);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className="form-control" />
        </p>
        <p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
          />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
        </p>
        <p>
          <label htmlFor="password2">Retype Password</label>
          <input
            type="password"
            name="password2"
            id="password2"
            className="form-control"
          />
        </p>
        <p>
          {loading ? (
            <button disabled className="btn btn-primary">
              Sign Up
            </button>
          ) : (
            <button className="btn btn-primary">Sign Up</button>
          )}
        </p>
      </form>
      {error && <p>{error}</p>}
      <p>
        <Link to="/login">Already have an account? Log in here!</Link>
      </p>
    </>
  );
}
