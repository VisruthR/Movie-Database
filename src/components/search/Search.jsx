import LoginBtn from "../../features/Auth/LoginBtn";
import "./Search.css";

function Search({ query, handleInput, handleSearch, showWatchlist }) {
  return (
    <section className="input-wrap">
      <input
        value={query}
        onChange={handleInput}
        onKeyDown={handleSearch}
        type="text"
        className="search-box"
        placeholder="Search your movies here..."
      />

      <LoginBtn showWatchlist={showWatchlist} />
    </section>
  );
}

export default Search;
