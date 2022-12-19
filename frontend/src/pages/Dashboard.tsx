import { useRef, useState } from "react";

export function Dashboard() {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token") !== null
  );

  const smAmountRef = useRef<HTMLInputElement>(null);
  const smPhoneRef = useRef<HTMLInputElement>(null);

  const coAmountRef = useRef<HTMLInputElement>(null);
  const coPhoneRef = useRef<HTMLInputElement>(null);

  const pbAmountRef = useRef<HTMLInputElement>(null);
  const pbBankRef = useRef<HTMLSelectElement>(null);
  const pbBillTypeRef = useRef<HTMLSelectElement>(null);

  const logout = (e: any) => {
    e.preventDefault();

    if (hasToken) {
      localStorage.removeItem("token");
      localStorage.removeItem("fullname");
      localStorage.removeItem("phone");
      localStorage.removeItem("nid");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
  };

  const processSendMoney = (e: any) => {
    e.preventDefault();

    console.log(smAmountRef.current?.value);
    console.log(smPhoneRef.current?.value);
  };

  const processCashOut = (e: any) => {
    e.preventDefault();

    console.log(coAmountRef.current?.value);
    console.log(coPhoneRef.current?.value);
  };

  const processPayBill = (e: any) => {
    e.preventDefault();

    console.log(pbAmountRef.current?.value);
    console.log(pbBankRef.current?.value);
    console.log(pbBillTypeRef.current?.value);
  };

  return hasToken ? (
    <div className="container">
      <div className="dashboard">
        <div className="actions">
          <div className="action">
            <p>Send Money</p>
            <form>
              <input type="text" ref={smAmountRef} placeholder="Amount" />
              <input
                type="text"
                ref={smPhoneRef}
                placeholder="Receiver Phone No."
              />
              <button onClick={processSendMoney}>Send Money</button>
            </form>
          </div>
          <div className="action">
            <p>Cash Out</p>
            <form>
              <input type="text" ref={coAmountRef} placeholder="Amount" />
              <input
                type="text"
                ref={coPhoneRef}
                placeholder="Agent Phone No."
              />
              <button onClick={processCashOut}>Cash Out</button>
            </form>
          </div>
          <div className="action">
            <p>Pay Bill</p>
            <form>
              <input type="text" ref={pbAmountRef} placeholder="Amount" />
              <select ref={pbBankRef}>
                <option value="BRAC Bank">BRAC Bank</option>
                <option value="SIBL">SIBL</option>
                <option value="Prime Bank">Prime Bank</option>
                <option value="Arafah Bank">Arafah Bank</option>
                <option value="DBBL">DBBL</option>
              </select>
              <select ref={pbBillTypeRef}>
                <option value="Water Bill">Water Bill</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Gas Bill">Gas Bill</option>
              </select>
              <button onClick={processPayBill}>Pay Bill</button>
            </form>
          </div>
        </div>
        <div className="history">
          <h1>History</h1>
        </div>
      </div>
      <div className="links">
        <a href="/">Homepage</a>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  ) : (
    <div className="container">
      <h1>You are not authorized to access this page without logging in</h1>
      <div className="links">
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
