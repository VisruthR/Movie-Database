import { useState } from "react";

function UserCard({ user, handleLogout, handleUser, showWatchlist }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(user);

  const handleEditName = () => {
    if (isEditing) {
      handleUser(inputValue);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <section className="user-section">
      <h2 className="user-greeting">
        Hello,{" "}
        {isEditing ? (
          <input
            type="text"
            autoFocus
            defaultValue={user}
            className="edit-input"
            size={user ? user.length - 1 : 1}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          user + "!"
        )}
      </h2>
      <button className="user-watch-list" onClick={showWatchlist}>
        Watch list
      </button>
      <button className="edit-name" onClick={handleEditName}>
        {isEditing ? "Save" : "Edit name"}
      </button>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}

export default UserCard;
