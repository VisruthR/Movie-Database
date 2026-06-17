import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/search/Search.jsx";
import Movies from "./components/movies/Movies.jsx";
import Popup from "./components/popup/Popup.jsx";
import Watchlist from "./features/components/watchlist/Watchlist.jsx";

function App() {
  const [state, setState] = useState({
    query: "",
    movies: [],
    selected: {},
  });

  const [savedMovies, setSavedMovies] = useState(() => {
    const localData = localStorage.getItem("savedMovies");
    return localData ? JSON.parse(localData) : [];
  });

  const [currentView, setCurrentView] = useState("search");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  const showWatchlist = () => setCurrentView("watchlist");
  const showSearch = () => {
    setCurrentView("search");
    setState((prev) => ({
      ...prev,
      query: "",
      movies: [],
      selected: {},
    }));
  };

  const API = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

  const search = (e) => {
    if (e.key === "Enter") {
      showSearch();
      setLoading(true);
      setLoadingText("Loading movies...");

      axios(API + "&s=" + state.query)
        .then(({ data }) => {
          const movies = data.Search;

          if (movies) {
            setState((prev) => ({ ...prev, movies: movies }));
          } else {
            alert("No movies found");
            setState((prev) => ({ ...prev, movies: [] }));
          }
        })
        .catch((err) => {
          console.log(err);
          setState((prev) => ({ ...prev, movies: [] }));
        })
        .finally(() => {
          setLoading(false);
          setLoadingText("");
        });
    }
  };

  const handleInput = (e) => {
    const query = e.target.value;
    setState((prev) => ({ ...prev, query }));
  };

  const openPopup = (movie) => {
    setLoading(true);
    setLoadingText("Loading movie details...");
    setState((prev) => ({ ...prev, selected: {} }));

    axios(API + "&i=" + movie)
      .then(({ data }) => {
        const selected = data;
        setState((prev) => ({ ...prev, selected }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setLoadingText("");
      });
  };

  const closePopup = () => {
    setState((prev) => {
      return { ...prev, selected: {} };
    });
  };

  const handleAddMovie = (section) => {
    const { selected } = state;

    setSavedMovies((prevMovies) => {
      // Check if this specific movie is already in
      const existingMovie = prevMovies.find(
        (m) => m.imdbID === selected.imdbID,
      );

      if (existingMovie) {
        return prevMovies.map((m) =>
          m.imdbID === selected.imdbID ? { ...m, sect: section } : m,
        );
      }

      // If it doesn't exist append it to the end of the array
      return [
        ...prevMovies,
        {
          Title: selected.Title,
          Year: selected.Year,
          imdbID: selected.imdbID,
          Type: selected.Type,
          Poster: selected.Poster,
          sect: section,
        },
      ];
    });

    closePopup();
  };

  const onAddSeen = () => handleAddMovie("Seen");
  const onAddWatchlist = () => handleAddMovie("Watchlist");

  return (
    <div className="app">
      <header>
        <h1 onClick={showSearch} style={{ cursor: "pointer" }}>
          Movie Database
        </h1>
      </header>
      <main>
        <Search
          query={state.query}
          handleInput={handleInput}
          handleSearch={search}
          showWatchlist={showWatchlist}
        />
        {currentView === "watchlist" ? (
          <Watchlist savedMovies={savedMovies} openPopup={openPopup} />
        ) : (
          state.movies.length > 0 && (
            <Movies movies={state.movies} openPopup={openPopup} />
          )
        )}
        {state.selected.Title && (
          <Popup
            selected={state.selected}
            closePopup={closePopup}
            onAddSeen={onAddSeen}
            onAddWatchlist={onAddWatchlist}
          />
        )}
        {loading && (
          <div className="loading-screen">
            <div className="loader" />
            <p>{loadingText || "Loading..."}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
