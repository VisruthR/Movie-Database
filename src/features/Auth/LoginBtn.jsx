import { User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import UserCard from "./UserCard";
import LoginCard from "./LoginCard";
import "./LoginCard.css";

function LoginBtn({ showWatchlist }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleUser = (username) => {
    setUser(username);
    localStorage.setItem("user", JSON.stringify(username));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleShowWatchlist = () => {
    setIsOpen(false);
    showWatchlist();
  };

  return (
    <div className="login-container" ref={containerRef}>
      <button
        className="user-avatar-btn"
        aria-label="User Profile"
        onClick={toggleMenu}
      >
        <User size={24} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {user ? (
            <UserCard
              user={user}
              handleUser={handleUser}
              handleLogout={handleLogout}
              showWatchlist={handleShowWatchlist}
            />
          ) : (
            <LoginCard handleLogin={handleUser} />
          )}
        </div>
      )}
    </div>
  );
}

export default LoginBtn;
