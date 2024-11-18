import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import TaskForm from "./pages/TaskForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  function logoutUser() {
    localStorage.removeItem("user");
    setUser(null);
  }
  function loginUser(userData) {
    localStorage.setItem("user", userData);
    setUser(userData);
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
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
      </Routes>
    </>
  );
}

export default App;
