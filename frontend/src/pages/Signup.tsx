import { useRef } from "react";
const URL = "http://127.0.0.1:4400/users/create";

export function Signup() {
  const fullnameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const nidRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // console.log(fullnameRef.current?.value);
    // console.log(phoneRef.current?.value);
    // console.log(nidRef.current?.value);
    // console.log(emailRef.current?.value);
    // console.log(passwordRef.current?.value);
    // console.log(usernameRef.current?.value);
    // console.log(roleRef.current?.checked ? "agent" : "non-agent");

    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: fullnameRef.current?.value,
        phone: phoneRef.current?.value,
        nid: nidRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        username: usernameRef.current?.value,
        role: roleRef.current?.checked ? "agent" : "non-agent",
      }),
    })
      .then(() => {
        console.log("New user added");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(`Error occured: ${err}`);
      });
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <p className="title">Signup</p>
          <input type="text" placeholder="Full Name" ref={fullnameRef} />
          <input type="text" placeholder="Phone no." ref={phoneRef} />
          <input type="text" placeholder="NID" ref={nidRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input type="text" placeholder="Username" ref={usernameRef} />
          <span>
            <input type="checkbox" ref={roleRef} /> Are you an agent?
          </span>
          <input type="submit" value="Signup" />
        </form>
      </div>
      <div className="links">
        <a href="Login">Login</a>
        <a href="/">Homepage</a>
      </div>
    </div>
  );
}
