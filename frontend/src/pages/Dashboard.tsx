import { useState } from "react";

export function Dashboard() {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token") !== null
  );
  return hasToken ? (
    <div className="container">
      <div className="dashboard">
        <div className="actions">
          <h1>Actions</h1>
        </div>
        <div className="history">
          <h1>History</h1>
        </div>
      </div>
      <div className="links">
        <a href="/">Homepage</a>
      </div>
    </div>
  ) : (
    <div className="container">
      <h1>You are not authorized to access this page without logging in</h1>
      <a href="/login">Login</a>
    </div>
  );
}
