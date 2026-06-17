import { useRef } from "react";
import "./Popup.css";

function Popup({ selected, closePopup, onAddSeen, onAddWatchlist }) {
  const containerRef = useRef(null);

  if (!selected) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <section className="popup" onClick={handleBackdropClick}>
      <div className="content" ref={containerRef}>
        <h2>
          {selected.Title} <span>({selected.Year})</span>
        </h2>
        <p className="rating">IMDb Rating: {selected.imdbRating}</p>

        <div className="plot">
          <img src={selected.Poster} alt={`${selected.Title} Poster`} />
          <p>{selected.Plot}</p>
        </div>

        <section className="popup-buttons">
          <button className="close" onClick={closePopup}>
            Close
          </button>
          <button className="seen" onClick={onAddSeen}>
            Add to Seen
          </button>
          <button className="watchlist" onClick={onAddWatchlist}>
            Add to Watchlist
          </button>
        </section>
      </div>
    </section>
  );
}

export default Popup;
