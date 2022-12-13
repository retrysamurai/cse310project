export function Login() {
  return (
    <div className="container">
      <form>
        <p className="title">Login</p>
        <input type="text" name="" id="" placeholder="Email" />
        <input type="text" name="" id="" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
      <div className="links">
        <a href="/signup">Signup</a>
        <a href="/">Homepage</a>
      </div>
    </div>
  );
}
