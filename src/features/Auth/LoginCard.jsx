import { useState } from "react";

function LoginCard({ handleLogin }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;
    handleLogin(inputValue);
  };

  return (
    <section className="login-card">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name..."
          className="login-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginCard;
