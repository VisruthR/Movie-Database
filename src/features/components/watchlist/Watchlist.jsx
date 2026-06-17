import { useState } from "react";
import Movies from "../../../components/movies/Movies";
import "./Watchlist.css";

function Watchlist({ savedMovies, openPopup }) {
  const [currentTab, setCurrentTab] = useState("Watchlist");

  const handleWatch = () => {
    setCurrentTab(currentTab === "Watchlist" ? "Seen" : "Watchlist");
  };

  const displayedMovies = savedMovies.filter(
    (movie) => movie.sect === currentTab,
  );

  return (
    <main className="watchlist-container">
      <header>
        <h1>{currentTab === "Watchlist" ? "Watchlist" : "Seen"}</h1>
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
