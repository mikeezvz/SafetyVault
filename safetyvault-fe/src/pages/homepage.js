import { useState } from "react";

export default function Homepage() {
  const [service, setService] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    if (!service || !username || !password) {
      alert("Please fill in all fields!");
      return;
    }

    const newEntry = { service, username, password };
    setEntries([...entries, newEntry]);
    setService("");
    setUsername("");
    setPassword("");
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
