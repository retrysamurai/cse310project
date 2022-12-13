export function Signup() {
  return (
    <div className="container">
      <form>
        <p className="title">Signup</p>
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Phone no." />
        <input type="text" placeholder="NID" />
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <span>
          <input type="radio" /> Are you an agent?
        </span>
        <input type="submit" value="Signup" />
      </form>
      <div className="links">
        <a href="Login">Login</a>
        <a href="/">Homepage</a>
      </div>
    </div>
  );
}
