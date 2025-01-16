import { useState, useEffect } from "react";

export default function Homepage() {
  const [service, setService] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState([]);

// Fetches entries from db when page loads
useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("http://localhost:5000/entry/all", {
          method: "GET", 
          credentials: "include",
        });
        if (!response.ok) {
          console.log("Error")
        }
        const data = await response.json();
        setEntries(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
}, []);

const handleAddEntry = async () => {
    if (!service || !username || !password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/entry/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ service, username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to save entry");
      }

      const savedEntry = await response.json();
      setEntries([...entries, savedEntry]); 
      setService("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error saving entry:", error);
    }
};


return (
    <div className="homepage-container">
      <h1 className="homepage-title">Homepage</h1>
      <div className="homepage-form">
        <h2>Add New Entry</h2>
        <div className="homepage-input-container">
          <input
            type="text"
            placeholder="Service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
        </div>
        <div className="homepage-input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="homepage-input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit" onClick={handleAddEntry}>
          Add Entry
        </button>
      </div>

      <div className="entries-list">
        <h2>Saved Entries</h2>
        <ul>
          {entries.map((entry, index) => (
            <li key={index} className="entry">
              <strong>Service:</strong> {entry.service} <br />
              <strong>Username:</strong> {entry.username} <br />
              <strong>Password:</strong> {entry.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
