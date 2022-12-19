import { useEffect, useRef, useState } from "react";

function Redirect(props: { to: string }) {
  useEffect(() => {
    window.location.href = props.to;
  });
  return <></>;
}

export function Login() {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token") !== null
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passRef.current?.value,
      }),
    };

    fetch("http://localhost:4400/users/login", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("id", response.id);
          localStorage.setItem("fullname", response.fullname);
          localStorage.setItem("phone", response.phone);
          localStorage.setItem("nid", response.nid);
          localStorage.setItem("balance", response.balance);
          localStorage.setItem("email", response.email);
          localStorage.setItem("username", response.username);
          localStorage.setItem("role", response.role);
          window.location.href = "/dashboard";
        } else {
          alert(response.error);
        }
      })
      .catch((err) => console.error(err));
  };

  return !hasToken ? (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <p className="title">Login</p>
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passRef} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="links">
        <a href="/signup">Signup</a>
        <a href="/">Homepage</a>
      </div>
    </div>
  ) : (
    <Redirect to="/dashboard" />
  );
}
