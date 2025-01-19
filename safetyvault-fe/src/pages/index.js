import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
          const response = await fetch("http://localhost:5000/auth/checklogin", {
              method: "GET",
              credentials: "include", 
          });

          if (response.ok){

          const data = await response.json();  
          setIsLoggedIn(data.loggedIn); 
          }
          else{
            setIsLoggedIn(false);
          }
      } catch (error) {
          console.error("Error checking login status:", error);
          
      }
  };

    checkLoginStatus();
}, []);

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during registration.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        window.location.href = "/homepage"; 
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during login.");
    }
  };

  return (
    <>
    <div className="w-full mb-10"></div>
      {isLoggedIn ? (
        <>
        <Link href="/changepassword">
          <button className="bg-blue-800 hover:bg-blue-700 text-white place-self-start ml-10 p-4 rounded-lg">
            Change Password
          </button>
        </Link>
        <Link href="/homepage">
          <button className="bg-blue-800 hover:bg-blue-700 text-white place-self-start ml-10 p-4 rounded-lg">
            Entries page
          </button>
        </Link>
        </>
      ) : (
        <p>Please log in to change your password</p>
      )}

    <div className="m-7">
      <div className="index-form mx-auto">
        <div className="title">Welcome</div>
        <div className="subtitle">Create an account or log in!</div>
        <div className="index-input-container ic1">
          <input
            id="username"
            className="index-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="cut"></div>
          <label htmlFor="username" className="placeholder">
          </label>
        </div>

        <div className="index-input-container ic2">
          <input
            id="password"
            className="index-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="cut"></div>
          <label htmlFor="password" className="placeholder">
          </label>
        </div>

        <button type="button" className="submit" onClick={handleRegister}>
          Register
        </button>
        <button type="button" className="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="index-message">
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
    </>
  );
}
