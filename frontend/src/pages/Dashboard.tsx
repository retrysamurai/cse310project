import { useEffect, useRef, useState } from "react";

const TRANSAC_PST_URL = "http://127.0.0.0:4400/transactions/create";
// const TRANSAC_GET_URL = "http://127.0.0.0:4400/transactions/get";
const PAYBILL_PST_URL = "http://127.0.0.0:4400/paybills/create";
// const PAYBILL_GET_URL = "http://127.0.0.0:4400/paybills/get";
const HISTORY_GET_URL = "http://127.0.0.0:4400/histories/get";

interface History {
  _id: string | null;
  dateTime: string;
  transactionId: string;
  transactionType: string;
  userEmail: string;
}

export function Dashboard() {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token") !== null
  );

  const [currentBalance, setCurrentBalance] = useState(
    localStorage.getItem("balance")
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

    // console.log(amountRef.current?.value);
    // console.log(emailRef.current?.value);

    fetch(TRANSAC_PST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
      body: JSON.stringify({
        dateTime: new Date(),
        amount:
          type === "send"
            ? smAmountRef.current?.value
            : coAmountRef.current?.value,
        senderEmail: localStorage.getItem("email"),
        receiverEmail:
          type === "send"
            ? smEmailRef.current?.value
            : coEmailRef.current?.value,
        transactionType: type,
      }),
    }).then(async (response) => {
      const data = await response.json();
      const newEntry: History = {
        _id: null,
        dateTime: new Date().toISOString(),
        transactionId: data.transaction._id,
        transactionType: type,
        userEmail: localStorage.getItem("email") ?? "unknown",
      };
      setHistoryList([...historyList, newEntry]);
      localStorage.setItem(
        "balance",
        String(
          Number(localStorage.getItem("balance")) -
            Number(
              type === "send"
                ? smAmountRef.current?.value
                : coAmountRef.current?.value
            )
        )
      );
      setCurrentBalance(localStorage.getItem("balance"));
    });
  };

  const processPayBill = (e: any) => {
    e.preventDefault();

    // console.log(pbAmountRef.current?.value);
    // console.log(pbBankRef.current?.value);
    // console.log(pbBillTypeRef.current?.value);

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
    }).then(async (response) => {
      const data = await response.json();
      const newEntry: History = {
        _id: null,
        dateTime: new Date().toISOString(),
        transactionId: data.paybill._id,
        transactionType: "bill",
        userEmail: localStorage.getItem("email") ?? "unknown",
      };
      setHistoryList([...historyList, newEntry]);
      localStorage.setItem(
        "balance",
        String(
          Number(localStorage.getItem("balance")) -
            Number(pbAmountRef.current?.value)
        )
      );
      setCurrentBalance(localStorage.getItem("balance"));
    });
  };

  const fetchHistory = () => {
    const link = new URL(HISTORY_GET_URL);
    link.searchParams.append(
      "userEmail",
      localStorage.getItem("email") as string
    );

    fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setHistoryList(response.historys);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return hasToken ? (
    <div className="container">
      <div className="dashboard">
        <div className="actions">
          <div>
            <p>Welcome, {localStorage.getItem("fullname")}!</p>
            <p>Balance: {currentBalance}</p>
          </div>
          <div className="action">
            <p className="action-title">Send Money</p>
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
            <p className="action-title">Cash Out</p>
            <form>
              <input type="text" ref={coAmountRef} placeholder="Amount" />
              <input type="text" ref={coEmailRef} placeholder="Agent Email" />
              <button onClick={(e) => processTransaction(e, "cash")}>
                Cash Out
              </button>
            </form>
          </div>
          <div className="action">
            <p className="action-title">Pay Bill</p>
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
          <div className="cell">
            <p id="cell-date">Date</p>
            <p id="cell-id">Transaction ID</p>
            <p id="cell-type">Transaction Type</p>
          </div>
          {historyList.map((data) => (
            <div className="cell" key={data._id}>
              <p id="cell-date">{data.dateTime}</p>
              <p id="cell-id">{data.transactionId}</p>
              <p id="cell-type">{data.transactionType?.toUpperCase()}</p>
            </div>
          ))}
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
