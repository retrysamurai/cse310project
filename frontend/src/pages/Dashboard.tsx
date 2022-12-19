import { useRef, useState } from "react";

const TRANSAC_PST_URL = "http://127.0.0.0:4400/transactions/create";
const TRANSAC_GET_URL = "http://127.0.0.0:4400/transactions/get";
const PAYBILL_PST_URL = "http://127.0.0.0:4400/paybills/create";
const PAYBILL_GET_URL = "http://127.0.0.0:4400/paybills/get";
const HISTORY_PST_URL = "http://127.0.0.0:4400/histories/create";
const HISTORY_GET_URL = "http://127.0.0.0:4400/histories/get";

interface History {
  dateTime: string;
  transactionId: string;
  user: string;
}

export function Dashboard() {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token") !== null
  );

  const [historyList, setHistoryList] = useState<History[]>([]);

  const smAmountRef = useRef<HTMLInputElement>(null);
  const smEmailRef = useRef<HTMLInputElement>(null);

  const coAmountRef = useRef<HTMLInputElement>(null);
  const coEmailRef = useRef<HTMLInputElement>(null);

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

  const processTransaction = (e: any, type: string) => {
    e.preventDefault();

    // console.log(smAmountRef.current?.value);
    // console.log(smEmailRef.current?.value);

    fetch(TRANSAC_PST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
      body: JSON.stringify({
        dateTime: new Date(),
        amount: smAmountRef.current?.value,
        senderEmail: localStorage.getItem("email"),
        receiverEmail: smEmailRef.current?.value,
        transactionType: type,
      }),
    });
  };

  const processPayBill = (e: any) => {
    e.preventDefault();

    console.log(pbAmountRef.current?.value);
    console.log(pbBankRef.current?.value);
    console.log(pbBillTypeRef.current?.value);

    fetch(PAYBILL_PST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        bankCode: pbBankRef.current?.value,
        billType: pbBillTypeRef.current?.value,
        payDate: new Date(),
        amount: pbAmountRef.current?.value,
      }),
    }).catch((error) => {
      console.log(error);
    });
  };

  return hasToken ? (
    <div className="container">
      <div className="dashboard">
        <div className="actions">
          <p>Welcome, {localStorage.getItem("fullname")}!</p>
          <p>Balance: {localStorage.getItem("balance")}</p>
          <div className="action">
            <p>Send Money</p>
            <form>
              <input type="text" ref={smAmountRef} placeholder="Amount" />
              <input
                type="text"
                ref={smEmailRef}
                placeholder="Receiver Email"
              />
              <button onClick={(e) => processTransaction(e, "send")}>
                Send Money
              </button>
            </form>
          </div>
          <div className="action">
            <p>Cash Out</p>
            <form>
              <input type="text" ref={coAmountRef} placeholder="Amount" />
              <input type="text" ref={coEmailRef} placeholder="Agent Email" />
              <button onClick={(e) => processTransaction(e, "cash")}>
                Cash Out
              </button>
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
      <div className="noauth">
        <h1>You are not authorized to access this page without logging in</h1>
      </div>
      <div className="links">
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
