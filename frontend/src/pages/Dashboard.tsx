import { useState } from "react";

export function Dashboard() {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token") !== null
  );
  return hasToken ? (
    <div className="container">
      <div className="dashboard">
        <div className="actions">
          <div className="action">
            <p>Send Money</p>
            <form>
              <input type="text" placeholder="Amount" />
              <input type="text" placeholder="Email" />
              <button type="submit">Send Money</button>
            </form>
          </div>
          <div className="action">
            <p>Cash Out</p>
            <form>
              <input type="text" placeholder="Amount" />
              <input type="text" placeholder="Agent Email" />
              <button type="submit">Cash Out</button>
            </form>
          </div>
          <div className="action">
            <p>Pay Bill</p>
            <form>
              <input type="text" placeholder="Amount" />
              <select>
                <option value="BRAC Bank">BRAC Bank</option>
                <option value="SIBL">SIBL</option>
                <option value="Prime Bank">Prime Bank</option>
                <option value="Arafah Bank">Arafah Bank</option>
                <option value="DBBL">DBBL</option>
              </select>
              <select>
                <option value="Water Bill">Water Bill</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Gas Bill">Gas Bill</option>
              </select>
              <button type="submit">Cash Out</button>
            </form>
          </div>
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
