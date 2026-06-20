import { useState } from "react";
import Movies from "../../../components/movies/Movies";
import "./Watchlist.css";

function Watchlist({ savedMovies, openPopup }) {
  const [currentTab, setCurrentTab] = useState("Watchlist");
  const [localInput, setLocalInput] = useState("");

  const searchCode = /[^a-zA-Z0-9]/g;

  const handleWatch = () => {
    setCurrentTab(currentTab === "Watchlist" ? "Seen" : "Watchlist");
  };

  const displayedMovies = localInput
    ? savedMovies.filter(
        (movie) =>
          movie.sect === currentTab &&
          movie.Title.replace(searchCode, "")
            .toLowerCase()
            .includes(localInput.replace(searchCode, "").toLowerCase()),
      )
    : savedMovies.filter((movie) => movie.sect === currentTab);

  const handleLocalInput = (e) => {
    setLocalInput(e.target.value);
  };

  return (
    <main className="watchlist-container">
      <header>
        <div className="header-title-group">
          <h1>{currentTab === "Watchlist" ? "Watchlist" : "Seen"}</h1>
          <input
            type="text"
            placeholder="Filter movies..."
            className="localSearch"
            onChange={handleLocalInput}
            value={localInput}
          />
        </div>
        <button className="watch-seen" onClick={handleWatch}>
          Switch to {currentTab === "Watchlist" ? "Seen" : "Watchlist"}
        </button>
      </header>

      {displayedMovies.length === 0 ? (
        <p className="message">{currentTab} is empty. Add some movies/Shows!</p>
      ) : (
        <Movies movies={displayedMovies} openPopup={openPopup} />
      )}
    </main>
  );
}

export default Watchlist;
