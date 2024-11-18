import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import TaskForm from "./pages/TaskForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import Users from "./pages/Users";
import User from "./pages/User";
import axios from "axios";
function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [joke, setJoke] = useState(null);
  function logoutUser() {
    localStorage.removeItem("user");
    setUser(null);
  }
  function loginUser(userData) {
    localStorage.setItem("user", userData);
    setUser(userData);
  }
  useEffect(() => {
    async function getJoke() {
      const data = await axios.get("https://api.chucknorris.io/jokes/random");
      setJoke(data.data.value);
    }
    getJoke();
  }, []);
  return (
    <>
      <h6>{joke}</h6>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li className="logoutLinkContainer">
            {user ? (
              <button className="btn btn-primary" onClick={logoutUser}>
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/detail/:id/edit" element={<TaskForm />} />
        <Route path="/task/new" element={<TaskForm />} />
        <Route path="/login" element={<Login onLogin={loginUser} />} />
        <Route path="/signup" element={<Signup onLogin={loginUser} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
